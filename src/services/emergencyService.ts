export interface EmergencyContact {
  id: string;
  nameKey: 'samuLabel' | 'policeLabel' | 'firefightersLabel' | 'gendarmerieLabel';
  subKey: 'samuSub' | 'policeSub' | 'firefightersSub' | 'gendarmerieSub';
  number: string;
  iconName: 'Ambulance' | 'Shield' | 'Flame' | 'BadgeAlert';
}

export interface CountryEmergencyData {
  countryCode: string;
  countryName: string;
  contacts: EmergencyContact[];
}

export const EMERGENCY_DIRECTORY: Record<string, CountryEmergencyData> = {
  MA: {
    countryCode: 'MA',
    countryName: 'Morocco',
    contacts: [
      { id: 'ma-samu', nameKey: 'samuLabel', subKey: 'samuSub', number: '15', iconName: 'Ambulance' },
      { id: 'ma-police', nameKey: 'policeLabel', subKey: 'policeSub', number: '19', iconName: 'Shield' },
      { id: 'ma-fire', nameKey: 'firefightersLabel', subKey: 'firefightersSub', number: '150', iconName: 'Flame' },
      { id: 'ma-gendarmerie', nameKey: 'gendarmerieLabel', subKey: 'gendarmerieSub', number: '177', iconName: 'BadgeAlert' }
    ]
  },
  FR: {
    countryCode: 'FR',
    countryName: 'France',
    contacts: [
      { id: 'fr-samu', nameKey: 'samuLabel', subKey: 'samuSub', number: '15', iconName: 'Ambulance' },
      { id: 'fr-police', nameKey: 'policeLabel', subKey: 'policeSub', number: '17', iconName: 'Shield' },
      { id: 'fr-fire', nameKey: 'firefightersLabel', subKey: 'firefightersSub', number: '18', iconName: 'Flame' },
      { id: 'fr-eu', nameKey: 'gendarmerieLabel', subKey: 'gendarmerieSub', number: '112', iconName: 'BadgeAlert' }
    ]
  },
  ES: {
    countryCode: 'ES',
    countryName: 'Spain',
    contacts: [
      { id: 'es-samu', nameKey: 'samuLabel', subKey: 'samuSub', number: '061', iconName: 'Ambulance' },
      { id: 'es-police', nameKey: 'policeLabel', subKey: 'policeSub', number: '091', iconName: 'Shield' },
      { id: 'es-fire', nameKey: 'firefightersLabel', subKey: 'firefightersSub', number: '112', iconName: 'Flame' }
    ]
  },
  GB: {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    contacts: [
      { id: 'gb-emerg', nameKey: 'samuLabel', subKey: 'samuSub', number: '999', iconName: 'Ambulance' },
      { id: 'gb-nhs', nameKey: 'policeLabel', subKey: 'policeSub', number: '111', iconName: 'Shield' }
    ]
  },
  US: {
    countryCode: 'US',
    countryName: 'United States',
    contacts: [
      { id: 'us-emerg', nameKey: 'samuLabel', subKey: 'samuSub', number: '911', iconName: 'Ambulance' },
      { id: 'us-poison', nameKey: 'firefightersLabel', subKey: 'firefightersSub', number: '1-800-222-1222', iconName: 'Flame' }
    ]
  }
};

export function getEmergencyContactsForCountry(countryCode: string = 'MA'): CountryEmergencyData {
  const code = countryCode.toUpperCase();
  return EMERGENCY_DIRECTORY[code] || EMERGENCY_DIRECTORY['MA'];
}
