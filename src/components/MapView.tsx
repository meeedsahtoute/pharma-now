import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Pharmacy, LocationState } from '../types/pharmacy';
import { AlertTriangle, MapPin } from 'lucide-react';
import { isValidCoordinate } from '../utils/coordinateUtils';

interface MapViewProps {
  pharmacies: Pharmacy[];
  location: LocationState;
  selectedPharmacy?: Pharmacy | null;
  onSelectPharmacy: (p: Pharmacy) => void;
  isMapErrorSimulated?: boolean;
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
  let centerLat: number | null = null;
  let centerLng: number | null = null;

  if (isValidCoordinate(location.lat, location.lng)) {
    centerLat = Number(location.lat);
    centerLng = Number(location.lng);
  } else {
    // Attempt to center on first pharmacy with valid coordinates
    const validPharm = pharmacies.find(p => isValidCoordinate(p.lat, p.lng));
    if (validPharm) {
      centerLat = Number(validPharm.lat);
      centerLng = Number(validPharm.lng);
    }
  }

  const isLocationAvailable = centerLat !== null && centerLng !== null && isValidCoordinate(centerLat, centerLng);

  console.log('[MAP DEBUG]', {
    rawLat: location.lat,
    rawLng: location.lng,
    parsedLat: centerLat,
    parsedLng: centerLng,
    isLocationAvailable,
    source: 'MapView:centerCalculation'
  });

  // 2. Initialize Leaflet Map safely when valid coordinates exist
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

    if (!isValidCoordinate(centerLat, centerLng)) {
      console.warn('[MAP DEBUG] Refusing to initialize Leaflet with invalid center:', { centerLat, centerLng });
      return;
    }

    const map = L.map(mapContainerRef.current, {
      center: [centerLat, centerLng],
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

    if (isValidCoordinate(location.lat, location.lng)) {
      const lat = Number(location.lat);
      const lng = Number(location.lng);
      map.flyTo([lat, lng], 13, { duration: 1.0 });
    }
  }, [location.lat, location.lng, isMapErrorSimulated]);

  // 4. Update Markers (Strict Validation)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || isMapErrorSimulated) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    // User Position Marker
    if (isValidCoordinate(location.lat, location.lng)) {
      const userLat = Number(location.lat);
      const userLng = Number(location.lng);

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

      const userMarker = L.marker([userLat, userLng], { icon: userIcon })
        .addTo(map)
        .bindPopup('<div class="text-xs font-bold text-slate-900 p-1">📍 Live Location</div>');
      
      markersRef.current['user-pin'] = userMarker;
    }

    // Pharmacy Markers
    pharmacies.forEach((pharmacy) => {
      if (!isValidCoordinate(pharmacy.lat, pharmacy.lng)) {
        console.warn('[MAP DEBUG] Rejecting invalid pharmacy marker coordinate:', {
          name: pharmacy.name,
          lat: pharmacy.lat,
          lng: pharmacy.lng,
          source: 'MapView:markerCreation'
        });
        return;
      }

      const pLat = Number(pharmacy.lat);
      const pLng = Number(pharmacy.lng);
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

      const marker = L.marker([pLat, pLng], { icon: customIcon }).addTo(map);

      const popupHtml = `
        <div style="font-family: sans-serif; padding: 4px; min-width: 180px;">
          <div style="font-weight: 800; font-size: 13px; margin-bottom: 2px; color: #0f172a;">${pharmacy.name}</div>
          <div style="font-size: 11px; color: #475569; margin-bottom: 6px;">${pharmacy.address}</div>
          <div style="font-size: 11px; font-weight: 700; color: ${status === 'on_duty' ? '#059669' : status === 'open' ? '#10b981' : '#64748b'}; margin-bottom: 8px;">
            ${pharmacy.calculatedStatus?.statusLabel || ''}
          </div>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${pLat},${pLng}" target="_blank" style="display: block; background: #059669; color: white; text-align: center; font-size: 11px; font-weight: 700; padding: 6px 8px; border-radius: 8px; text-decoration: none;">
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

    if (pharmacies.length > 0 && !selectedPharmacy) {
      try {
        const markerList = Object.values(markersRef.current);
        if (markerList.length > 0) {
          const group = L.featureGroup(markerList);
          const bounds = group.getBounds();
          if (bounds && bounds.isValid()) {
            const sw = bounds.getSouthWest();
            const ne = bounds.getNorthEast();
            if (isValidCoordinate(sw?.lat, sw?.lng) && isValidCoordinate(ne?.lat, ne?.lng)) {
              map.fitBounds(bounds.pad(0.15));
            }
          }
        }
      } catch (e) {
        console.warn('[MAP DEBUG] Exception during fitBounds:', e);
      }
    }
  }, [pharmacies, location.lat, location.lng, isMapErrorSimulated]);

  // 5. Pan to Selected Pharmacy (Strict Validation)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedPharmacy || isMapErrorSimulated) return;

    if (isValidCoordinate(selectedPharmacy.lat, selectedPharmacy.lng)) {
      const pLat = Number(selectedPharmacy.lat);
      const pLng = Number(selectedPharmacy.lng);
      map.flyTo([pLat, pLng], 16, {
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
