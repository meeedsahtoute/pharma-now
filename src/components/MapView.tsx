import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Pharmacy, LocationState } from '../types/pharmacy';
import { AlertTriangle, MapPin } from 'lucide-react';

interface MapViewProps {
  pharmacies: Pharmacy[];
  location: LocationState;
  selectedPharmacy?: Pharmacy | null;
  onSelectPharmacy: (p: Pharmacy) => void;
  isMapErrorSimulated?: boolean;
}

/**
 * Hard Invariant Validator for Leaflet Input Coordinates.
 * Strictly checks for finite, non-NaN numbers within Earth's latitude/longitude boundaries.
 */
function validateLeafletCoords(rawLat: unknown, rawLng: unknown, source: string): { lat: number; lng: number } | null {
  if (rawLat === null || rawLat === undefined || rawLng === null || rawLng === undefined) {
    return null;
  }
  const lat = Number(rawLat);
  const lng = Number(rawLng);

  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lng) ||
    isNaN(lat) ||
    isNaN(lng) ||
    lat < -90 ||
    lat > 90 ||
    lng < -180 ||
    lng > 180
  ) {
    console.error('[PHARMA FATAL MAP INPUT]', {
      rawLat,
      rawLng,
      lat,
      lng,
      source
    });
    return null;
  }

  return { lat, lng };
}

export const MapView: React.FC<MapViewProps> = ({
  pharmacies,
  location,
  selectedPharmacy,
  onSelectPharmacy,
  isMapErrorSimulated
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  // 1. Determine Map Center safely (NO fallback to hardcoded 0,0 or hardcoded cities if invalid)
  const userCoords = validateLeafletCoords(location.lat, location.lng, 'MapView:centerCalculation:user');
  let centerLat: number | null = null;
  let centerLng: number | null = null;

  if (userCoords) {
    centerLat = userCoords.lat;
    centerLng = userCoords.lng;
  } else {
    // Attempt to center on first pharmacy with valid coordinates
    const validPharm = pharmacies.find(p => validateLeafletCoords(p.lat, p.lng, 'MapView:centerCalculation:pharmacySearch') !== null);
    if (validPharm) {
      const pCoords = validateLeafletCoords(validPharm.lat, validPharm.lng, 'MapView:centerCalculation:pharmacyFound');
      if (pCoords) {
        centerLat = pCoords.lat;
        centerLng = pCoords.lng;
      }
    }
  }

  const isLocationAvailable = centerLat !== null && centerLng !== null;

  console.error('[PHARMA DEBUG] MAP COORDINATES', {
    rawLat: location.lat,
    rawLng: location.lng,
    parsedLat: centerLat,
    parsedLng: centerLng,
    isLocationAvailable,
    source: 'MapView:centerCalculation',
    component: 'MapView'
  });

  // 2. Initialize Leaflet Map safely when valid coordinates AND container dimensions exist
  useEffect(() => {
    if (isMapErrorSimulated || !isLocationAvailable || centerLat === null || centerLng === null) {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      return;
    }

    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Check container dimensions to prevent 0x0 Leaflet fitBounds/zoom crash on mobile
    const clientWidth = mapContainerRef.current.clientWidth;
    const clientHeight = mapContainerRef.current.clientHeight;

    if (clientWidth === 0 || clientHeight === 0) {
      console.warn('[PHARMA DEBUG] Map container has 0 dimensions (hidden tab/mobile). Delaying map init.', { clientWidth, clientHeight });
      return;
    }

    const verifiedCenter = validateLeafletCoords(centerLat, centerLng, 'MapView:initLeafletCenter');
    if (!verifiedCenter) {
      console.error('[PHARMA FATAL MAP INPUT] Refusing to initialize Leaflet with invalid center:', { centerLat, centerLng });
      return;
    }

    console.error('[PHARMA DEBUG] MAP COORDINATES', {
      rawLat: centerLat,
      rawLng: centerLng,
      parsedLat: verifiedCenter.lat,
      parsedLng: verifiedCenter.lng,
      source: 'MapView:L.map:initialization',
      component: 'MapView'
    });

    const map = L.map(mapContainerRef.current, {
      center: [verifiedCenter.lat, verifiedCenter.lng],
      zoom: 13,
      zoomControl: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    mapInstanceRef.current = map;

    const resizeObserver = new ResizeObserver(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    });

    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [isMapErrorSimulated, isLocationAvailable, centerLat, centerLng]);

  // 3. Update Map Center when user location coords change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || isMapErrorSimulated) return;

    const size = map.getSize();
    if (size.x === 0 || size.y === 0) return;

    const validUser = validateLeafletCoords(location.lat, location.lng, 'MapView:flyToUser');
    if (validUser) {
      console.error('[PHARMA DEBUG] MAP COORDINATES', {
        rawLat: location.lat,
        rawLng: location.lng,
        parsedLat: validUser.lat,
        parsedLng: validUser.lng,
        source: 'MapView:flyToUser',
        component: 'MapView'
      });
      map.flyTo([validUser.lat, validUser.lng], 13, { duration: 1.0 });
    }
  }, [location.lat, location.lng, isMapErrorSimulated]);

  // 4. Update Markers (Strict Validation)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || isMapErrorSimulated) return;

    const size = map.getSize();
    if (size.x === 0 || size.y === 0) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    // User Position Marker
    const validUser = validateLeafletCoords(location.lat, location.lng, 'MapView:userMarker');
    if (validUser) {
      console.error('[PHARMA DEBUG] MAP COORDINATES', {
        rawLat: location.lat,
        rawLng: location.lng,
        parsedLat: validUser.lat,
        parsedLng: validUser.lng,
        source: 'MapView:userMarkerCreation',
        component: 'MapView'
      });

      const userIcon = L.divIcon({
        className: 'user-pin-icon',
        html: `
          <div class="relative flex items-center justify-center w-8 h-8">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-5 w-5 bg-emerald-600 border-2 border-white shadow-lg"></span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const userMarker = L.marker([validUser.lat, validUser.lng], { icon: userIcon })
        .addTo(map)
        .bindPopup('<div class="text-xs font-bold text-slate-900 p-1">📍 Live Location</div>');
      
      markersRef.current['user-pin'] = userMarker;
    }

    // Pharmacy Markers
    pharmacies.forEach((pharmacy) => {
      const pCoords = validateLeafletCoords(pharmacy.lat, pharmacy.lng, `MapView:pharmacyMarker:${pharmacy.name}`);
      if (!pCoords) {
        return;
      }

      console.error('[PHARMA DEBUG] MAP COORDINATES', {
        rawLat: pharmacy.lat,
        rawLng: pharmacy.lng,
        parsedLat: pCoords.lat,
        parsedLng: pCoords.lng,
        source: `MapView:pharmacyMarker:${pharmacy.id}`,
        component: 'MapView'
      });

      const status = pharmacy.calculatedStatus?.status;
      
      let colorBg = 'bg-slate-700 text-white border-slate-500';
      let ringEffect = '';
      let iconSymbol = '✚';

      if (status === 'on_duty') {
        colorBg = 'bg-emerald-600 text-white border-emerald-400';
        ringEffect = 'animate-pulse shadow-lg shadow-emerald-600/40 ring-2 ring-emerald-400';
        iconSymbol = '🌙';
      } else if (status === 'open') {
        colorBg = 'bg-emerald-500 text-white border-emerald-300';
        ringEffect = 'shadow-md shadow-emerald-500/30';
      } else if (status === 'closed') {
        colorBg = 'bg-slate-500 text-white border-slate-400 opacity-80';
      } else if (status === 'conflicting' || status === 'unknown') {
        colorBg = 'bg-amber-500 text-white border-amber-300';
        iconSymbol = '❓';
      }

      const customIcon = L.divIcon({
        className: 'custom-pharmacy-marker',
        html: `
          <div class="flex items-center justify-center w-8 h-8 rounded-full border-2 font-bold text-xs shadow-xl ${colorBg} ${ringEffect} transition-transform hover:scale-125">
            ${iconSymbol}
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([pCoords.lat, pCoords.lng], { icon: customIcon }).addTo(map);

      const popupHtml = `
        <div style="font-family: sans-serif; padding: 4px; min-width: 180px;">
          <div style="font-weight: 800; font-size: 13px; margin-bottom: 2px; color: #0f172a;">${pharmacy.name}</div>
          <div style="font-size: 11px; color: #475569; margin-bottom: 6px;">${pharmacy.address}</div>
          <div style="font-size: 11px; font-weight: 700; color: ${status === 'on_duty' ? '#059669' : status === 'open' ? '#10b981' : '#64748b'}; margin-bottom: 8px;">
            ${pharmacy.calculatedStatus?.statusLabel || ''}
          </div>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${pCoords.lat},${pCoords.lng}" target="_blank" style="display: block; background: #059669; color: white; text-align: center; font-size: 11px; font-weight: 700; padding: 6px 8px; border-radius: 8px; text-decoration: none;">
            Directions ➔
          </a>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        onSelectPharmacy(pharmacy);
      });

      markersRef.current[pharmacy.id] = marker;
    });

    // 5. Safe fitBounds Execution (Requires Non-Zero Container Dimensions & >= 2 Valid Markers)
    if (pharmacies.length > 0 && !selectedPharmacy) {
      try {
        const markerList = Object.values(markersRef.current);
        if (markerList.length >= 2) {
          const group = L.featureGroup(markerList);
          const bounds = group.getBounds();
          if (bounds && bounds.isValid()) {
            const sw = bounds.getSouthWest();
            const ne = bounds.getNorthEast();
            const validSW = validateLeafletCoords(sw?.lat, sw?.lng, 'MapView:fitBoundsSW');
            const validNE = validateLeafletCoords(ne?.lat, ne?.lng, 'MapView:fitBoundsNE');

            if (validSW && validNE) {
              const boundsCenter = bounds.getCenter();
              const validCenter = validateLeafletCoords(boundsCenter?.lat, boundsCenter?.lng, 'MapView:fitBoundsCenter');
              if (validCenter) {
                console.error('[PHARMA DEBUG] MAP COORDINATES', {
                  rawLat: boundsCenter.lat,
                  rawLng: boundsCenter.lng,
                  parsedLat: validCenter.lat,
                  parsedLng: validCenter.lng,
                  source: 'MapView:fitBounds',
                  component: 'MapView'
                });
                map.fitBounds(bounds.pad(0.15));
              }
            }
          }
        } else if (markerList.length === 1) {
          const singleMarker = markerList[0];
          const pos = singleMarker.getLatLng();
          const validPos = validateLeafletCoords(pos?.lat, pos?.lng, 'MapView:singleMarkerPos');
          if (validPos) {
            map.setView([validPos.lat, validPos.lng], 13);
          }
        }
      } catch (e) {
        console.error('[PHARMA DEBUG] fitBounds safely caught error:', e);
      }
    }
  }, [pharmacies, location.lat, location.lng, isMapErrorSimulated]);

  // 6. Pan to Selected Pharmacy (Strict Validation)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedPharmacy || isMapErrorSimulated) return;

    const size = map.getSize();
    if (size.x === 0 || size.y === 0) return;

    const validSelected = validateLeafletCoords(selectedPharmacy.lat, selectedPharmacy.lng, 'MapView:flyToSelected');
    if (validSelected) {
      console.error('[PHARMA DEBUG] MAP COORDINATES', {
        rawLat: selectedPharmacy.lat,
        rawLng: selectedPharmacy.lng,
        parsedLat: validSelected.lat,
        parsedLng: validSelected.lng,
        source: 'MapView:flyToSelected',
        component: 'MapView'
      });

      map.flyTo([validSelected.lat, validSelected.lng], 16, {
        duration: 1.2
      });

      const marker = markersRef.current[selectedPharmacy.id];
      if (marker) {
        marker.openPopup();
      }
    }
  }, [selectedPharmacy, isMapErrorSimulated]);

  if (isMapErrorSimulated) {
    return (
      <div className="w-full h-full min-h-[300px] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center p-6 text-center">
        <div className="p-3 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-3 border border-amber-500/20">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Map Engine Unavailable</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1 mb-4 leading-relaxed">
          Switched to high-speed list view navigation mode.
        </p>
      </div>
    );
  }

  if (!isLocationAvailable) {
    return (
      <div className="w-full h-full min-h-[350px] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center p-6 text-center">
        <div className="p-3.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-3 border border-emerald-500/20">
          <MapPin className="w-8 h-8" />
        </div>
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Location Unavailable</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1.5 leading-relaxed">
          Select a city or enable GPS location to load the interactive pharmacy map.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg">
      <div ref={mapContainerRef} className="w-full h-full bg-slate-100 dark:bg-slate-950" />
    </div>
  );
};
