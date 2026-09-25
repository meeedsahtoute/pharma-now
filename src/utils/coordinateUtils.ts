/**
 * Centralized Coordinate Validation & Parsing Utilities for PHARMA NOW
 * Strictly prevents NaN, undefined, or out-of-bounds coordinates from ever reaching Leaflet or distance engines.
 */

export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Validates whether latitude and longitude form a valid, finite geospatial point on Earth.
 */
export function isValidCoordinate(lat: any, lng: any): boolean {
  if (lat === null || lat === undefined || lng === null || lng === undefined) {
    return false;
  }
  if (lat === '' || lng === '' || lat === 'null' || lng === 'null' || lat === 'undefined' || lng === 'undefined') {
    return false;
  }

  const numLat = Number(lat);
  const numLng = Number(lng);

  if (!Number.isFinite(numLat) || !Number.isFinite(numLng)) {
    return false;
  }

  if (isNaN(numLat) || isNaN(numLng)) {
    return false;
  }

  return (
    numLat >= -90 &&
    numLat <= 90 &&
    numLng >= -180 &&
    numLng <= 180
  );
}

/**
 * Safely parses a coordinate to a finite number or returns null.
 * NEVER returns NaN, Infinity, or undefined.
 */
export function parseCoordinate(val: any): number | null {
  if (val === null || val === undefined || val === '' || val === 'null' || val === 'undefined') {
    return null;
  }
  const num = Number(val);
  if (!Number.isFinite(num) || isNaN(num)) {
    return null;
  }
  return num;
}
