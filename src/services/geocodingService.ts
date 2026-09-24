export interface CityLocation {
  name: string;
  nameAr: string;
  nameFr: string;
  region: string;
  country: string;
  countryCode: string; // "MA"
  lat: number;
  lng: number;
  displayName: string;
  isPopular?: boolean;
}

// Pre-indexed Moroccan Cities Atlas 🇲🇦
export const PRESET_CITIES: CityLocation[] = [
  { name: 'Nador', nameAr: 'الناظور', nameFr: 'Nador', region: 'Oriental', country: 'Morocco', countryCode: 'MA', lat: 35.1681, lng: -2.9335, displayName: 'Nador, Oriental, Morocco', isPopular: true },
  { name: 'Oujda', nameAr: 'وجدة', nameFr: 'Oujda', region: 'Oriental', country: 'Morocco', countryCode: 'MA', lat: 34.6814, lng: -1.9086, displayName: 'Oujda, Oriental, Morocco', isPopular: true },
  { name: 'Casablanca', nameAr: 'الدار البيضاء', nameFr: 'Casablanca', region: 'Casablanca-Settat', country: 'Morocco', countryCode: 'MA', lat: 33.5898, lng: -7.6321, displayName: 'Casablanca, Morocco', isPopular: true },
  { name: 'Rabat', nameAr: 'الرباط', nameFr: 'Rabat', region: 'Rabat-Salé-Kénitra', country: 'Morocco', countryCode: 'MA', lat: 34.0209, lng: -6.8416, displayName: 'Rabat, Morocco', isPopular: true },
  { name: 'Tangier', nameAr: 'طنجة', nameFr: 'Tanger', region: 'Tanger-Tétouan-Al Hoceïma', country: 'Morocco', countryCode: 'MA', lat: 35.7595, lng: -5.8340, displayName: 'Tangier, Morocco', isPopular: true },
  { name: 'Fes', nameAr: 'فاس', nameFr: 'Fès', region: 'Fès-Meknès', country: 'Morocco', countryCode: 'MA', lat: 34.0331, lng: -5.0003, displayName: 'Fes, Morocco', isPopular: true },
  { name: 'Marrakesh', nameAr: 'مراكش', nameFr: 'Marrakech', region: 'Marrakech-Safi', country: 'Morocco', countryCode: 'MA', lat: 31.6295, lng: -7.9811, displayName: 'Marrakesh, Morocco', isPopular: true },
  { name: 'Agadir', nameAr: 'أكادير', nameFr: 'Agadir', region: 'Souss-Massa', country: 'Morocco', countryCode: 'MA', lat: 30.4278, lng: -9.5981, displayName: 'Agadir, Morocco', isPopular: true },
  { name: 'Meknes', nameAr: 'مكناس', nameFr: 'Meknès', region: 'Fès-Meknès', country: 'Morocco', countryCode: 'MA', lat: 33.8935, lng: -5.5473, displayName: 'Meknes, Morocco', isPopular: true },
  { name: 'Kenitra', nameAr: 'القنيطرة', nameFr: 'Kénitra', region: 'Rabat-Salé-Kénitra', country: 'Morocco', countryCode: 'MA', lat: 34.2610, lng: -6.5802, displayName: 'Kenitra, Morocco', isPopular: true },
  { name: 'Tetouan', nameAr: 'تطوان', nameFr: 'Tétouan', region: 'Tanger-Tétouan-Al Hoceïma', country: 'Morocco', countryCode: 'MA', lat: 35.5889, lng: -5.3626, displayName: 'Tetouan, Morocco' },
  { name: 'Safi', nameAr: 'آسفي', nameFr: 'Safi', region: 'Marrakech-Safi', country: 'Morocco', countryCode: 'MA', lat: 32.2994, lng: -9.2372, displayName: 'Safi, Morocco' },
  { name: 'El Jadida', nameAr: 'الجديدة', nameFr: 'El Jadida', region: 'Casablanca-Settat', country: 'Morocco', countryCode: 'MA', lat: 33.2316, lng: -8.5007, displayName: 'El Jadida, Morocco' },
  { name: 'Beni Mellal', nameAr: 'بني ملال', nameFr: 'Béni Mellal', region: 'Béni Mellal-Khénifra', country: 'Morocco', countryCode: 'MA', lat: 32.3394, lng: -6.3608, displayName: 'Beni Mellal, Morocco' },
  { name: 'Khouribga', nameAr: 'خريبكة', nameFr: 'Khouribga', region: 'Béni Mellal-Khénifra', country: 'Morocco', countryCode: 'MA', lat: 32.8811, lng: -6.9063, displayName: 'Khouribga, Morocco' },
  { name: 'Ouarzazate', nameAr: 'ورزازات', nameFr: 'Ouarzazate', region: 'Drâa-Tafilalet', country: 'Morocco', countryCode: 'MA', lat: 30.9189, lng: -6.8934, displayName: 'Ouarzazate, Morocco' },
  { name: 'Laayoune', nameAr: 'العيون', nameFr: 'Laâyoune', region: 'Laâyoune-Sakia El Hamra', country: 'Morocco', countryCode: 'MA', lat: 27.1536, lng: -13.2033, displayName: 'Laayoune, Morocco' },
  { name: 'Dakhla', nameAr: 'الداخلة', nameFr: 'Dakhla', region: 'Dakhla-Oued Ed-Dahab', country: 'Morocco', countryCode: 'MA', lat: 23.6848, lng: -15.9579, displayName: 'Dakhla, Morocco' },
  { name: 'Al Hoceima', nameAr: 'الحسيمة', nameFr: 'Al Hoceïma', region: 'Tanger-Tétouan-Al Hoceïma', country: 'Morocco', countryCode: 'MA', lat: 35.2472, lng: -3.9321, displayName: 'Al Hoceima, Morocco' },
  { name: 'Berkane', nameAr: 'بركان', nameFr: 'Berkane', region: 'Oriental', country: 'Morocco', countryCode: 'MA', lat: 34.9211, lng: -2.3275, displayName: 'Berkane, Morocco' },
  { name: 'Mohammedia', nameAr: 'المحمدية', nameFr: 'Mohammédia', region: 'Casablanca-Settat', country: 'Morocco', countryCode: 'MA', lat: 33.6835, lng: -7.3848, displayName: 'Mohammedia, Morocco' }
];

const geocodeCache = new Map<string, CityLocation>();

export async function geocodeLocation(query: string): Promise<CityLocation | null> {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return null;

  // 1. Check pre-indexed Moroccan atlas
  const presetMatch = PRESET_CITIES.find(
    c => c.name.toLowerCase() === cleanQuery ||
         c.nameAr.toLowerCase() === cleanQuery ||
         c.nameFr.toLowerCase() === cleanQuery ||
         c.displayName.toLowerCase().includes(cleanQuery)
  );
  if (presetMatch) return presetMatch;

  // 2. Check memory cache
  if (geocodeCache.has(cleanQuery)) {
    return geocodeCache.get(cleanQuery)!;
  }

  // 3. Live OpenStreetMap Nominatim lookup focusing on Morocco
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=ma&q=${encodeURIComponent(query)}&limit=1`;
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'Accept-Language': 'fr,ar,en' }
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        const item = data[0];
        const result: CityLocation = {
          name: item.name || query,
          nameAr: item.name || query,
          nameFr: item.name || query,
          region: 'Morocco Region',
          country: 'Morocco',
          countryCode: 'MA',
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
          displayName: item.display_name
        };
        geocodeCache.set(cleanQuery, result);
        return result;
      }
    }
  } catch (err) {
    console.warn('[GeocodingService] Nominatim fetch failed:', err);
  }

  // 4. Fuzzy match against Moroccan PRESET_CITIES
  const fuzzyMatch = PRESET_CITIES.find(
    c => c.name.toLowerCase().includes(cleanQuery) ||
         c.nameAr.toLowerCase().includes(cleanQuery) ||
         c.nameFr.toLowerCase().includes(cleanQuery) ||
         cleanQuery.includes(c.name.toLowerCase())
  );

  return fuzzyMatch || PRESET_CITIES[0]; // Defaults to Nador/Casa in Morocco
}
