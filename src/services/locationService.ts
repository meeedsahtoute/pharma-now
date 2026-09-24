import { MOROCCAN_CITIES_COORDINATES } from '../data/moroccanPharmaciesDatabase.ts';

export interface LocationResult {
  lat: number;
  lng: number;
  accuracy?: number;
  city?: string;
  region?: string;
  country?: string;
  countryCode?: string;
}

export interface StructuredLocationState {
  latitude: number | null;
  longitude: number | null;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  accuracy?: number;
  source: 'gps' | 'manual' | 'saved';
  isPermissionGranted: boolean;
  isPermissionDenied: boolean;
  isLocating: boolean;
  error?: string | null;
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): { meters: number; km: number; drivingMin: number; walkingMin: number } {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const meters = R * c;
  const km = Number((meters / 1000).toFixed(2));

  const drivingMin = Math.max(1, Math.round((km / 30) * 60));
  const walkingMin = Math.max(1, Math.round((km / 4.5) * 60));

  return { meters, km, drivingMin, walkingMin };
}

// Reverse Geocoding via OpenStreetMap Nominatim
export async function reverseGeocodeCoords(lat: number, lng: number): Promise<{
  city: string;
  region: string;
  country: string;
  countryCode: string;
}> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`;
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'Accept-Language': 'fr,ar,en' }
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const addr = data.address || {};

      const city = addr.city || addr.town || addr.village || addr.municipality || addr.county || 'Oujda';
      const region = addr.state || addr.region || 'Oriental';
      const country = addr.country || 'Morocco';
      const countryCode = (addr.country_code || 'MA').toUpperCase();

      return { city, region, country, countryCode };
    }
  } catch (err) {
    console.warn('[LocationService] Reverse geocoding error:', err);
  }

  return {
    city: 'Oujda',
    region: 'Oriental',
    country: 'Morocco',
    countryCode: 'MA'
  };
}

export function getCurrentUserPosition(timeoutMs = 8000): Promise<LocationResult> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error('Geolocation is not supported by your browser'));
    }

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: timeoutMs,
      maximumAge: 60000
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const geocoded = await reverseGeocodeCoords(lat, lng);

        resolve({
          lat,
          lng,
          accuracy: position.coords.accuracy,
          city: geocoded.city,
          region: geocoded.region,
          country: geocoded.country,
          countryCode: geocoded.countryCode
        });
      },
      (error) => {
        let message = 'Unable to retrieve location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Location permission was denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Location information is unavailable';
            break;
          case error.TIMEOUT:
            message = 'Location request timed out';
            break;
        }
        reject(new Error(message));
      },
      options
    );
  });
}

export function getDefaultCityLocation(cityName: string): { lat: number; lng: number } {
  const norm = cityName.trim();
  const foundKey = Object.keys(MOROCCAN_CITIES_COORDINATES).find(
    k => k.toLowerCase() === norm.toLowerCase()
  );
  if (foundKey) {
    return MOROCCAN_CITIES_COORDINATES[foundKey];
  }
  return MOROCCAN_CITIES_COORDINATES['Oujda'] || { lat: 34.6814, lng: -1.9086 };
}
