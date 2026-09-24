import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Pharmacy, FilterOptions } from '../types/pharmacy';
import { fetchNearbyPharmacies, normalizeCityName } from '../services/pharmacyService';
import { 
  getCurrentUserPosition, 
  getDefaultCityLocation, 
  type StructuredLocationState 
} from '../services/locationService';
import { calculatePharmacyStatus } from '../utils/timeUtils';
import { geocodeLocation, PRESET_CITIES } from '../services/geocodingService';
import { parseSearchQuery } from '../services/searchParser';

export interface TestOverrideOptions {
  forceLocationPermissionDenied?: boolean;
  forceLocationPermissionGranted?: boolean;
  forceApiFailure?: boolean;
  forceNoPharmaciesFound?: boolean;
  forceSlowNetwork?: boolean;
  simulatedHourOverride?: number | null; // 0-23
}

const SAVED_STORAGE_KEY = 'pharma_now_saved_ids';

export function usePharmacies() {
  const [location, setLocation] = useState<StructuredLocationState>({
    latitude: 34.6814, // Oujda starting coordinates
    longitude: -1.9086,
    city: 'Oujda',
    region: 'Oriental',
    country: 'Morocco',
    countryCode: 'MA',
    source: 'manual',
    isPermissionGranted: false,
    isPermissionDenied: false,
    isLocating: true,
    error: null
  });

  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    selectedCity: 'Oujda',
    onlyOnDuty: false,
    onlyOpenNow: false,
    only247: false,
    onlyDelivery: false,
    maxRadiusKm: 25,
    sortBy: 'distance',
    simulatedHourOverride: null
  });

  const [testOverrides, setTestOverrides] = useState<TestOverrideOptions>({});

  const [rawPharmacies, setRawPharmacies] = useState<Pharmacy[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFallbackMode, setIsFallbackMode] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(SAVED_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleSavePharmacy = (pharmacyId: string) => {
    setSavedIds(prev => {
      const next = prev.includes(pharmacyId)
        ? prev.filter(id => id !== pharmacyId)
        : [...prev, pharmacyId];
      try {
        localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn('Failed to save pharmacy bookmark:', e);
      }
      return next;
    });
  };

  // 1. Dynamic Geolocation Attempt on App Load
  const requestLocation = useCallback(async () => {
    if (testOverrides.forceLocationPermissionDenied) {
      const cityCoords = getDefaultCityLocation(filters.selectedCity);
      setLocation({
        latitude: cityCoords.lat,
        longitude: cityCoords.lng,
        city: filters.selectedCity,
        region: 'Morocco Region',
        country: 'Morocco',
        countryCode: 'MA',
        source: 'manual',
        isPermissionGranted: false,
        isPermissionDenied: true,
        isLocating: false,
        error: 'Location access simulated denied.'
      });
      return;
    }

    setLocation(prev => ({ ...prev, isLocating: true, error: null }));

    try {
      const pos = await getCurrentUserPosition(8000);
      const targetCity = pos.city || filters.selectedCity;
      setLocation({
        latitude: pos.lat,
        longitude: pos.lng,
        city: targetCity,
        region: pos.region || 'Morocco Region',
        country: pos.country || 'Morocco',
        countryCode: pos.countryCode || 'MA',
        accuracy: pos.accuracy,
        source: 'gps',
        isPermissionGranted: true,
        isPermissionDenied: false,
        isLocating: false,
        error: null
      });

      if (pos.city) {
        setFilters(prev => ({ ...prev, selectedCity: pos.city! }));
      }
    } catch (err: any) {
      console.info('[PHARMA NOW] Geolocation fallback engaged:', err.message);
      const defaultCoords = getDefaultCityLocation(filters.selectedCity);
      setLocation({
        latitude: defaultCoords.lat,
        longitude: defaultCoords.lng,
        city: filters.selectedCity,
        region: 'Morocco Region',
        country: 'Morocco',
        countryCode: 'MA',
        source: 'manual',
        isPermissionGranted: false,
        isPermissionDenied: true,
        isLocating: false,
        error: err.message
      });
    }
  }, [filters.selectedCity, testOverrides.forceLocationPermissionDenied]);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  // 2. City Selection & Geocoding Handler with IMMEDIATE State Clear
  const setCity = useCallback(async (cityName: string) => {
    setIsLoading(true);
    setRawPharmacies([]); // Clear stale results immediately on city change
    setErrorMessage(null);

    const geocoded = await geocodeLocation(cityName);
    if (geocoded) {
      setFilters(prev => ({ ...prev, selectedCity: geocoded.name }));
      setLocation({
        latitude: geocoded.lat,
        longitude: geocoded.lng,
        city: geocoded.name,
        region: geocoded.region || 'Morocco Region',
        country: 'Morocco',
        countryCode: 'MA',
        source: 'manual',
        isPermissionGranted: false,
        isPermissionDenied: false,
        isLocating: false,
        error: null
      });
    } else {
      const coords = getDefaultCityLocation(cityName);
      setFilters(prev => ({ ...prev, selectedCity: cityName }));
      setLocation({
        latitude: coords.lat,
        longitude: coords.lng,
        city: cityName,
        region: 'Morocco Region',
        country: 'Morocco',
        countryCode: 'MA',
        source: 'manual',
        isPermissionGranted: false,
        isPermissionDenied: false,
        isLocating: false,
        error: null
      });
    }
  }, []);

  // 3. Smart Search Handler (Parsing Darija + Location + Intent)
  const handleSearchChange = useCallback((query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));

    const parsed = parseSearchQuery(query);
    if (parsed.isOnDutyRequested) {
      setFilters(prev => ({ ...prev, onlyOnDuty: true }));
    }
    if (parsed.isOpenNowRequested) {
      setFilters(prev => ({ ...prev, onlyOpenNow: true }));
    }
    if (parsed.is247Requested) {
      setFilters(prev => ({ ...prev, only247: true }));
    }
    if (parsed.isDeliveryRequested) {
      setFilters(prev => ({ ...prev, onlyDelivery: true }));
    }

    if (parsed.cleanedLocation) {
      const matchingCity = PRESET_CITIES.find(
        c => c.name.toLowerCase() === parsed.cleanedLocation?.toLowerCase()
      );
      if (matchingCity) {
        setCity(matchingCity.name);
      }
    }
  }, [setCity]);

  // 4. Fetch Pharmacies on lat/lng/radius/city change
  const loadPharmacies = useCallback(async () => {
    setIsLoading(true);
    setRawPharmacies([]); // Clear previous results while loading new city
    setErrorMessage(null);

    const lat = location.latitude ?? 34.6814;
    const lng = location.longitude ?? -1.9086;

    if (testOverrides.forceSlowNetwork) {
      await new Promise(res => setTimeout(res, 1800));
    }

    const result = await fetchNearbyPharmacies(
      lat,
      lng,
      filters.maxRadiusKm * 1000,
      testOverrides.forceApiFailure,
      location.city
    );

    setRawPharmacies(result.pharmacies);
    setIsFallbackMode(result.isFallback);
    if (result.errorMessage) {
      setErrorMessage(result.errorMessage);
    }
    setIsLoading(false);
  }, [location.latitude, location.longitude, location.city, filters.maxRadiusKm, testOverrides.forceApiFailure, testOverrides.forceSlowNetwork]);

  useEffect(() => {
    loadPharmacies();
  }, [loadPharmacies]);

  // 5. Processing & Hard City Consistency Filter
  const processedPharmacies = useMemo(() => {
    if (testOverrides.forceNoPharmaciesFound) {
      return [];
    }

    const targetCityNorm = normalizeCityName(location.city);
    const effectiveSimulatedHour = testOverrides.simulatedHourOverride ?? filters.simulatedHourOverride;

    const withStatus = rawPharmacies.map(p => {
      const calculatedStatus = calculatePharmacyStatus(p, new Date(), effectiveSimulatedHour);
      return {
        ...p,
        calculatedStatus
      };
    });

    let filtered = withStatus.filter(p => {
      // ABSOLUTE HARD CITY FILTER: Reject any pharmacy from a different city!
      if (normalizeCityName(p.city) !== targetCityNorm) {
        return false;
      }

      // Radius filter
      if (p.distanceKm !== undefined && p.distanceKm > filters.maxRadiusKm) {
        return false;
      }

      // On duty filter
      if (filters.onlyOnDuty && p.calculatedStatus?.status !== 'on_duty') {
        return false;
      }

      // Open now filter
      if (filters.onlyOpenNow && !(p.calculatedStatus?.status === 'open' || p.calculatedStatus?.status === 'on_duty')) {
        return false;
      }

      // 24/7 filter
      if (filters.only247 && !p.services.includes('open_24_7')) {
        return false;
      }

      // Delivery filter
      if (filters.onlyDelivery && !p.services.includes('delivery')) {
        return false;
      }

      // Search query filtering (name, address, neighborhood, city)
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const parsed = parseSearchQuery(query);
        const term = parsed.cleanedLocation ? parsed.cleanedLocation.toLowerCase() : query;

        const matchName = p.name.toLowerCase().includes(term) || p.name.toLowerCase().includes(query);
        const matchAddr = p.address.toLowerCase().includes(term) || p.address.toLowerCase().includes(query);
        const matchNeigh = p.neighborhood?.toLowerCase().includes(term) ?? false;
        const matchCity = p.city.toLowerCase().includes(term) ?? false;

        if (!matchName && !matchAddr && !matchNeigh && !matchCity) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      if (filters.sortBy === 'distance') {
        const aStatus = a.calculatedStatus?.status;
        const bStatus = b.calculatedStatus?.status;
        if (aStatus === 'on_duty' && bStatus !== 'on_duty') return -1;
        if (bStatus === 'on_duty' && aStatus !== 'on_duty') return 1;

        return (a.distanceMeters ?? 999999) - (b.distanceMeters ?? 999999);
      } else if (filters.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (filters.sortBy === 'status') {
        const orderMap: Record<string, number> = { on_duty: 0, open: 1, conflicting: 2, unknown: 3, closed: 4 };
        const scoreA = orderMap[a.calculatedStatus?.status || 'closed'] ?? 5;
        const scoreB = orderMap[b.calculatedStatus?.status || 'closed'] ?? 5;
        return scoreA - scoreB;
      }
      return 0;
    });

    return filtered;
  }, [rawPharmacies, filters, location.city, testOverrides]);

  return {
    location,
    countryCode: location.countryCode,
    filters,
    setFilters,
    handleSearchChange,
    setCity,
    requestLocation,
    pharmacies: processedPharmacies,
    totalRawCount: rawPharmacies.length,
    isLoading,
    isFallbackMode,
    errorMessage,
    refetch: loadPharmacies,
    testOverrides,
    setTestOverrides,
    savedIds,
    toggleSavePharmacy
  };
}
