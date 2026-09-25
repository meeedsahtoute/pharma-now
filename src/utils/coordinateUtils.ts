/**
 * Centralized Coordinate Validation & Parsing Utilities for PHARMA NOW
 * Strictly prevents NaN, undefined, or out-of-bounds coordinates from ever reaching Leaflet or distance engines.
 */

export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Centralized Coordinate Validation Function for PHARMA NOW
 * Strictly prevents NaN, undefined, Infinity, or out-of-bounds coordinates from ever reaching Leaflet or distance engines.
 */
export function isValidCoordinate(lat: unknown, lng: unknown): boolean {
  if (lat === null || lat === undefined || lng === null || lng === undefined) {
    return false;
  }
  if (lat === '' || lng === '' || lat === 'null' || lng === 'null' || lat === 'undefined' || lng === 'undefined') {
    return false;
  }

  const latitude = Number(lat);
  const longitude = Number(lng);

  return (
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    !isNaN(latitude) &&
    !isNaN(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}

/**
 * Safely parses a coordinate to a finite number or returns null.
 * NEVER returns NaN, Infinity, or undefined.
 */
export function parseCoordinate(val: unknown): number | null {
  if (val === null || val === undefined || val === '' || val === 'null' || val === 'undefined') {
    return null;
  }
  const num = Number(val);
  if (!Number.isFinite(num) || isNaN(num)) {
    return null;
  }
  return num;
}

