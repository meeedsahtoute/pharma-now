import type { Pharmacy, ServiceType } from '../types/pharmacy';
import { VERIFIED_MOROCCAN_PHARMACIES, MOROCCAN_CITIES_COORDINATES } from '../data/moroccanPharmaciesDatabase.ts';
import { OFFICIAL_DUTY_ROSTERS } from '../data/dutyRostersDatabase.ts';
import { calculateDistance } from './locationService.ts';
import { isValidCoordinate, parseCoordinate } from '../utils/coordinateUtils';

export interface FetchPharmaciesResult {
  pharmacies: Pharmacy[];
  isFallback: boolean;
  errorMessage?: string;
  hasNoVerifiedData?: boolean;
}

/**
 * City Name Normalizer to handle alternate spellings (e.g., Fes vs Fès, Tangier vs Tanger)
 */
export function normalizeCityName(cityName: string): string {
  const c = cityName.trim().toLowerCase();
  if (c.includes('oujda')) return 'Oujda';
  if (c.includes('nador')) return 'Nador';
  if (c.includes('casa') || c.includes('dar el beida')) return 'Casablanca';
  if (c.includes('rabat')) return 'Rabat';
  if (c.includes('tanger') || c.includes('tangier')) return 'Tangier';
  if (c.includes('fes') || c.includes('fès')) return 'Fes';
  if (c.includes('marrakesh') || c.includes('marrakech')) return 'Marrakesh';
  if (c.includes('agadir')) return 'Agadir';
  if (c.includes('meknes') || c.includes('meknès')) return 'Meknes';
  if (c.includes('kenitra') || c.includes('kénitra')) return 'Kenitra';
  if (c.includes('tetouan') || c.includes('tétouan')) return 'Tetouan';
  if (c.includes('safi')) return 'Safi';
  if (c.includes('jadida')) return 'El Jadida';
  if (c.includes('beni mellal') || c.includes('béni mellal')) return 'Beni Mellal';
  if (c.includes('khouribga')) return 'Khouribga';
  if (c.includes('ouarzazate')) return 'Ouarzazate';
  if (c.includes('laayoune') || c.includes('laâyoune')) return 'Laayoune';
  if (c.includes('dakhla')) return 'Dakhla';
  return cityName.trim();
}

/**
 * Fetch verified, city-scoped pharmacies for a given user location and city name.
 * Strictly enforces that EVERY result returned belongs ONLY to the selected city.
 */
export async function fetchNearbyPharmacies(
  userLat: number | null,
  userLng: number | null,
  radiusMeters: number = 25000,
  forceApiFailure: boolean = false,
  cityName: string = 'Casablanca'
): Promise<FetchPharmaciesResult> {
  const targetCity = normalizeCityName(cityName);
  const cityGeo = MOROCCAN_CITIES_COORDINATES[targetCity] || MOROCCAN_CITIES_COORDINATES['Casablanca'];

  if (forceApiFailure) {
    console.warn('[PHARMA NOW] Simulated API Failure active. Using local verified directory.');
    return getVerifiedCityPharmacies(userLat, userLng, targetCity, cityGeo.lat, cityGeo.lng);
  }

  // Determine query center coordinates safely
  const queryLat = (isValidCoordinate(userLat, userLng) ? userLat : cityGeo.lat)!;
  const queryLng = (isValidCoordinate(userLat, userLng) ? userLng : cityGeo.lng)!;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const query = `
      [out:json][timeout:5];
      (
        node["amenity"="pharmacy"](around:${radiusMeters},${queryLat},${queryLng});
        way["amenity"="pharmacy"](around:${radiusMeters},${queryLat},${queryLng});
      );
      out center 50;
    `;

    const response = await fetch(
      `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`,
      { signal: controller.signal }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Overpass API responded with HTTP status ${response.status}`);
    }

    const data = await response.json();

    let livePharmacies: Pharmacy[] = [];

    if (data && Array.isArray(data.elements) && data.elements.length > 0) {
      livePharmacies = data.elements
        .map((elem: any, idx: number) => {
          const parsedLat = parseCoordinate(elem.lat ?? elem.center?.lat);
          const parsedLng = parseCoordinate(elem.lon ?? elem.center?.lon);

          const lat = (parsedLat !== null && isValidCoordinate(parsedLat, queryLng)) ? parsedLat : queryLat;
          const lng = (parsedLng !== null && isValidCoordinate(queryLat, parsedLng)) ? parsedLng : queryLng;

          if (!isValidCoordinate(lat, lng)) {
            return null;
          }

          const tags = elem.tags || {};

          // Distance check from city center
          const distFromCityCenter = calculateDistance(cityGeo.lat, cityGeo.lng, lat, lng).km;
          if (distFromCityCenter > 30) {
            return null;
          }

          const rawCity = tags['addr:city'] || tags['is_in:city'] || targetCity;
          const normPharmCity = normalizeCityName(rawCity);

          if (normPharmCity !== targetCity) {
            return null;
          }

          const name = tags.name || tags['name:fr'] || tags['name:en'] || `Pharmacie ${tags['addr:street'] || targetCity}`;
          const address = [
            tags['addr:housenumber'],
            tags['addr:street'],
            tags['addr:suburb'] || tags['addr:district']
          ].filter(Boolean).join(' ') || tags['addr:full'] || `${targetCity} Centre`;

          const phone = tags.phone || tags['contact:phone'] || tags['phone:mobile'] || null;
          const openingHoursRaw = tags.opening_hours || null;
          const isOpen247 = openingHoursRaw === '24/7' || tags['dispensing:24_7'] === 'yes';

          const matchedRoster = OFFICIAL_DUTY_ROSTERS.find(r => 
            normalizeCityName(r.city) === targetCity && 
            (r.pharmacyId.includes(elem.id) || name.toLowerCase().includes(r.city.toLowerCase()))
          );

          const isGarde = matchedRoster ? matchedRoster.dutyType !== 'UNKNOWN' : (tags.emergency === 'yes' || tags.night === 'yes');

          const services: ServiceType[] = ['prescription'];
          if (isOpen247) services.push('open_24_7');
          if (isGarde) services.push('night_bell');
          if (tags.wheelchair === 'yes') services.push('wheelchair');
          if (tags.delivery === 'yes') services.push('delivery');

          return {
            id: `osm-${elem.id || idx}`,
            name,
            address,
            city: targetCity,
            neighborhood: tags['addr:suburb'] || tags['addr:district'],
            phone,
            lat,
            lng,
            source: 'OpenStreetMap Live + AMMPS',
            confidenceLabel: openingHoursRaw ? 'HIGH CONFIDENCE' : 'MEDIUM',
            verifiedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            openingHours: openingHoursRaw ? { rawText: openingHoursRaw } : { hasMissingHours: true },
            dutyInfo: {
              isOnDutyTonight: isGarde,
              dutyType: isGarde ? (matchedRoster?.dutyType === '24H' ? '24h_duty' : 'night_shift') : 'none',
              shiftStart: matchedRoster?.startTime || '20:00',
              shiftEnd: matchedRoster?.endTime || '08:30',
              dutyNote: isGarde ? 'Verified on-duty roster' : undefined
            },
            services
          } as Pharmacy;
        })
        .filter((p: Pharmacy | null): p is Pharmacy => p !== null);
    }

    const verifiedLocal = getVerifiedCityPharmacies(userLat, userLng, targetCity, cityGeo.lat, cityGeo.lng).pharmacies;
    const combinedMap = new Map<string, Pharmacy>();

    livePharmacies.forEach(p => {
      if (isValidCoordinate(p.lat, p.lng)) {
        combinedMap.set(p.id, p);
      }
    });

    verifiedLocal.forEach(p => {
      if (!combinedMap.has(p.id) && isValidCoordinate(p.lat, p.lng)) {
        combinedMap.set(p.id, p);
      }
    });

    const finalPharmacies = Array.from(combinedMap.values());
    const strictlyCityPharmacies = finalPharmacies.filter(p => normalizeCityName(p.city) === targetCity && isValidCoordinate(p.lat, p.lng));

    if (strictlyCityPharmacies.length === 0) {
      return {
        pharmacies: [],
        isFallback: false,
        hasNoVerifiedData: true
      };
    }

    return {
      pharmacies: rankPharmacies(strictlyCityPharmacies, userLat, userLng),
      isFallback: false
    };

  } catch (error: any) {
    console.warn('[PHARMA NOW] Overpass API error, retrieving verified local city database:', error.message);
    return getVerifiedCityPharmacies(userLat, userLng, targetCity, cityGeo.lat, cityGeo.lng, `Live API Offline: ${error.message}`);
  }
}

/**
 * Retrieve verified pharmacies strictly belonging to the requested city from the verified database.
 */
function getVerifiedCityPharmacies(
  userLat: number | null,
  userLng: number | null,
  cityName: string,
  _cityCenterLat: number,
  _cityCenterLng: number,
  errorMsg?: string
): FetchPharmaciesResult {
  const targetCity = normalizeCityName(cityName);

  const matchingEntries = VERIFIED_MOROCCAN_PHARMACIES.filter(
    p => normalizeCityName(p.city) === targetCity && isValidCoordinate(p.lat, p.lng)
  );

  if (matchingEntries.length === 0) {
    return {
      pharmacies: [],
      isFallback: true,
      hasNoVerifiedData: true,
      errorMessage: errorMsg
    };
  }

  const pharmacies: Pharmacy[] = matchingEntries
    .map(entry => {
      const pLat = parseCoordinate(entry.lat);
      const pLng = parseCoordinate(entry.lng);

      if (pLat === null || pLng === null || !isValidCoordinate(pLat, pLng)) {
        return null;
      }

      const matchedRoster = OFFICIAL_DUTY_ROSTERS.find(r => r.pharmacyId === entry.id);
      const isOnDuty = !!matchedRoster && matchedRoster.dutyType !== 'UNKNOWN';

      const dist = (isValidCoordinate(userLat, userLng))
        ? calculateDistance(userLat!, userLng!, pLat, pLng)
        : { meters: 0, km: 0, drivingMin: 0, walkingMin: 0 };

      return {
        id: entry.id,
        name: entry.name,
        address: entry.address,
        city: targetCity,
        phone: entry.phone,
        lat: pLat,
        lng: pLng,
        source: entry.source,
        confidenceLabel: entry.dataConfidence === 'VERIFIED' ? 'HIGH CONFIDENCE' : 'MEDIUM',
        verifiedAt: entry.lastVerified,
        dutyInfo: {
          isOnDutyTonight: isOnDuty,
          dutyType: isOnDuty ? (matchedRoster?.dutyType === '24H' ? '24h_duty' : 'night_shift') : 'none',
          shiftStart: matchedRoster?.startTime || '20:00',
          shiftEnd: matchedRoster?.endTime || '08:30',
          dutyNote: matchedRoster ? `Roster: ${matchedRoster.source}` : undefined
        },
        openingHours: {
          monday: { open: '08:30', close: '20:00' },
          tuesday: { open: '08:30', close: '20:00' },
          wednesday: { open: '08:30', close: '20:00' },
          thursday: { open: '08:30', close: '20:00' },
          friday: { open: '08:30', close: '20:00' },
          saturday: { open: '09:00', close: '19:00' }
        },
        services: ['prescription', ...(isOnDuty ? ['night_bell' as ServiceType] : [])],
        distanceMeters: dist.meters,
        distanceKm: dist.km,
        drivingTimeMin: dist.drivingMin,
        walkingTimeMin: dist.walkingMin
      } as Pharmacy;
    })
    .filter((p: Pharmacy | null): p is Pharmacy => p !== null);

  return {
    pharmacies: rankPharmacies(pharmacies, userLat, userLng),
    isFallback: true,
    errorMessage: errorMsg
  };
}

/**
 * Rank pharmacies by: 1. Verified on-duty status, 2. Distance, 3. Reliability
 */
function rankPharmacies(pharmacies: Pharmacy[], userLat: number | null, userLng: number | null): Pharmacy[] {
  const hasUserCoords = isValidCoordinate(userLat, userLng);

  return pharmacies
    .filter(p => isValidCoordinate(p.lat, p.lng))
    .map(p => {
      const dist = hasUserCoords
        ? calculateDistance(userLat!, userLng!, p.lat, p.lng)
        : { meters: 0, km: 0, drivingMin: 0, walkingMin: 0 };
      return {
        ...p,
        distanceMeters: dist.meters,
        distanceKm: dist.km,
        drivingTimeMin: dist.drivingMin,
        walkingTimeMin: dist.walkingMin
      };
    })
    .sort((a, b) => {
      if (a.dutyInfo?.isOnDutyTonight && !b.dutyInfo?.isOnDutyTonight) return -1;
      if (!a.dutyInfo?.isOnDutyTonight && b.dutyInfo?.isOnDutyTonight) return 1;

      if (hasUserCoords) {
        return (a.distanceKm || 0) - (b.distanceKm || 0);
      }
      return a.name.localeCompare(b.name);
    });
}
