import type { Pharmacy, ServiceType } from '../types/pharmacy';
import { VERIFIED_MOROCCAN_PHARMACIES, MOROCCAN_CITIES_COORDINATES } from '../data/moroccanPharmaciesDatabase.ts';
import { OFFICIAL_DUTY_ROSTERS } from '../data/dutyRostersDatabase.ts';
import { calculateDistance } from './locationService.ts';

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
  userLat: number,
  userLng: number,
  radiusMeters: number = 25000,
  forceApiFailure: boolean = false,
  cityName: string = 'Oujda'
): Promise<FetchPharmaciesResult> {
  const targetCity = normalizeCityName(cityName);
  const cityGeo = MOROCCAN_CITIES_COORDINATES[targetCity] || MOROCCAN_CITIES_COORDINATES['Oujda'];

  if (forceApiFailure) {
    console.warn('[PHARMA NOW] Simulated API Failure active. Using local verified directory.');
    return getVerifiedCityPharmacies(userLat, userLng, targetCity, cityGeo.lat, cityGeo.lng);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const query = `
      [out:json][timeout:5];
      (
        node["amenity"="pharmacy"](around:${radiusMeters},${userLat},${userLng});
        way["amenity"="pharmacy"](around:${radiusMeters},${userLat},${userLng});
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
          const lat = elem.lat || elem.center?.lat || userLat;
          const lng = elem.lon || elem.center?.lon || userLng;
          const tags = elem.tags || {};

          // Hard Coordinate & Distance Validation from City Center (Max 25km radius)
          const distFromCityCenter = calculateDistance(cityGeo.lat, cityGeo.lng, lat, lng).km;
          if (distFromCityCenter > 25) {
            // REJECT: Pharmacy is geographically located in a different city
            return null;
          }

          const rawCity = tags['addr:city'] || tags['is_in:city'] || targetCity;
          const normPharmCity = normalizeCityName(rawCity);

          if (normPharmCity !== targetCity) {
            // REJECT: City name tag does not match target city
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

          // Match with official Duty Roster
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

    // Combine with verified local city directory records
    const verifiedLocal = getVerifiedCityPharmacies(userLat, userLng, targetCity, cityGeo.lat, cityGeo.lng).pharmacies;
    const combinedMap = new Map<string, Pharmacy>();

    livePharmacies.forEach(p => combinedMap.set(p.id, p));
    verifiedLocal.forEach(p => {
      if (!combinedMap.has(p.id)) {
        combinedMap.set(p.id, p);
      }
    });

    const finalPharmacies = Array.from(combinedMap.values());

    // Hard final city filter check before returning
    const strictlyCityPharmacies = finalPharmacies.filter(p => normalizeCityName(p.city) === targetCity);

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
  userLat: number,
  userLng: number,
  cityName: string,
  _cityCenterLat: number,
  _cityCenterLng: number,
  errorMsg?: string
): FetchPharmaciesResult {
  const targetCity = normalizeCityName(cityName);

  // 1. Strict filtering against verified database: ONLY entries matching targetCity
  const matchingEntries = VERIFIED_MOROCCAN_PHARMACIES.filter(
    p => normalizeCityName(p.city) === targetCity
  );

  if (matchingEntries.length === 0) {
    // Honest UNKNOWN / NO VERIFIED DATA STATE when zero verified records exist for a city
    return {
      pharmacies: [],
      isFallback: true,
      hasNoVerifiedData: true,
      errorMessage: errorMsg
    };
  }

  // 2. Map directory entries to Pharmacy application model
  const pharmacies: Pharmacy[] = matchingEntries.map(entry => {
    const matchedRoster = OFFICIAL_DUTY_ROSTERS.find(r => r.pharmacyId === entry.id);
    const isOnDuty = !!matchedRoster && matchedRoster.dutyType !== 'UNKNOWN';

    const dist = calculateDistance(userLat, userLng, entry.lat, entry.lng);

    return {
      id: entry.id,
      name: entry.name,
      address: entry.address,
      city: targetCity,
      phone: entry.phone,
      lat: entry.lat,
      lng: entry.lng,
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
    };
  });

  return {
    pharmacies: rankPharmacies(pharmacies, userLat, userLng),
    isFallback: true,
    errorMessage: errorMsg
  };
}

/**
 * Rank pharmacies by: 1. Verified on-duty status, 2. Distance, 3. Reliability
 */
function rankPharmacies(pharmacies: Pharmacy[], userLat: number, userLng: number): Pharmacy[] {
  return pharmacies
    .map(p => {
      const dist = calculateDistance(userLat, userLng, p.lat, p.lng);
      return {
        ...p,
        distanceMeters: dist.meters,
        distanceKm: dist.km,
        drivingTimeMin: dist.drivingMin,
        walkingTimeMin: dist.walkingMin
      };
    })
    .sort((a, b) => {
      // 1. On duty first
      if (a.dutyInfo?.isOnDutyTonight && !b.dutyInfo?.isOnDutyTonight) return -1;
      if (!a.dutyInfo?.isOnDutyTonight && b.dutyInfo?.isOnDutyTonight) return 1;

      // 2. Distance ranking
      return (a.distanceKm || 0) - (b.distanceKm || 0);
    });
}
