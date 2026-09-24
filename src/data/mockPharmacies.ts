import type { Pharmacy } from '../types/pharmacy';

export const MOCK_PHARMACIES: Pharmacy[] = [
  // NADOR PHARMACIES (Prompt emphasized!)
  {
    id: 'ph-nador-1',
    name: 'Pharmacie de Garde Nador Ville',
    address: '88 Avenue Hassan II, Centre Ville',
    city: 'Nador',
    neighborhood: 'Centre Ville',
    phone: '+212 536-602-114',
    lat: 35.1681,
    lng: -2.9335,
    source: 'Syndicat des Pharmaciens de Nador',
    confidenceLabel: 'HIGH CONFIDENCE',
    verifiedAt: 'Verified today 20:00',
    dutyInfo: {
      isOnDutyTonight: true,
      dutyType: 'night_shift',
      shiftStart: '20:00',
      shiftEnd: '08:30',
      dutyNote: 'Guichet de garde de nuit avec sonnette d’urgence.'
    },
    openingHours: {
      monday: { open: '08:30', close: '20:00' },
      tuesday: { open: '08:30', close: '20:00' },
      wednesday: { open: '08:30', close: '20:00' },
      thursday: { open: '08:30', close: '20:00' },
      friday: { open: '08:30', close: '20:00' },
      saturday: { open: '09:00', close: '19:00' },
      sunday: { open: '09:00', close: '14:00' }
    },
    services: ['night_bell', 'prescription', 'delivery', 'parapharmacy'],
    note: 'Pharmacie de garde officielle pour la zone centre Nador.'
  },
  {
    id: 'ph-nador-2',
    name: 'Pharmacie Marchica 24/7',
    address: 'Boulevard de la Corniche, Marchica',
    city: 'Nador',
    neighborhood: 'Marchica',
    phone: '+212 536-331-900',
    lat: 35.1742,
    lng: -2.9250,
    source: 'Verified 24/7 Registry',
    confidenceLabel: 'HIGH CONFIDENCE',
    verifiedAt: 'Verified today 18:00',
    dutyInfo: {
      isOnDutyTonight: true,
      dutyType: '24h_duty',
      dutyNote: 'Permanence 24h/24 continue.'
    },
    openingHours: {
      monday: { open: '00:00', close: '23:59' },
      tuesday: { open: '00:00', close: '23:59' },
      wednesday: { open: '00:00', close: '23:59' },
      thursday: { open: '00:00', close: '23:59' },
      friday: { open: '00:00', close: '23:59' },
      saturday: { open: '00:00', close: '23:59' },
      sunday: { open: '00:00', close: '23:59' }
    },
    services: ['open_24_7', 'night_bell', 'delivery', 'wheelchair']
  },
  {
    id: 'ph-nador-3',
    name: 'Pharmacie Al Matar Nador',
    address: 'Quartier Al Matar, Route d\'Oujda',
    city: 'Nador',
    neighborhood: 'Al Matar',
    phone: '+212 536-380-444',
    lat: 35.1550,
    lng: -2.9410,
    source: 'Local Registry',
    confidenceLabel: 'HIGH CONFIDENCE',
    verifiedAt: 'Verified yesterday',
    dutyInfo: {
      isOnDutyTonight: false,
      dutyType: 'none'
    },
    openingHours: {
      monday: { open: '08:30', close: '20:30' },
      tuesday: { open: '08:30', close: '20:30' },
      wednesday: { open: '08:30', close: '20:30' },
      thursday: { open: '08:30', close: '20:30' },
      friday: { open: '08:30', close: '20:30' },
      saturday: { open: '09:00', close: '19:30' }
    },
    services: ['prescription', 'parapharmacy']
  },

  // CASABLANCA PHARMACIES
  {
    id: 'ph-casa-1',
    name: 'Pharmacie de Night Garde Anfa',
    address: '45 Boulevard d\'Anfa, Quartier Anfa',
    city: 'Casablanca',
    neighborhood: 'Anfa',
    phone: '+212 522-200-112',
    lat: 33.589882,
    lng: -7.632145,
    source: 'Regional Syndicate Rota',
    confidenceLabel: 'HIGH CONFIDENCE',
    verifiedAt: 'Verified today 20:00',
    dutyInfo: {
      isOnDutyTonight: true,
      dutyType: 'night_shift',
      shiftStart: '20:00',
      shiftEnd: '08:30',
      dutyNote: 'Emergency night bell at left side entrance door.'
    },
    openingHours: {
      monday: { open: '08:30', close: '20:00' },
      tuesday: { open: '08:30', close: '20:00' },
      wednesday: { open: '08:30', close: '20:00' },
      thursday: { open: '08:30', close: '20:00' },
      friday: { open: '08:30', close: '20:00' },
      saturday: { open: '09:00', close: '19:00' },
      sunday: { open: '09:00', close: '14:00' }
    },
    services: ['night_bell', 'prescription', 'delivery', 'parapharmacy'],
    note: 'Urgent night duty rotation verified today.'
  },
  {
    id: 'ph-casa-2',
    name: 'Pharmacie 24/7 Gauthier',
    address: '12 Rue Mousseix, Gauthier',
    city: 'Casablanca',
    neighborhood: 'Gauthier',
    phone: '+212 522-480-990',
    lat: 33.593120,
    lng: -7.625410,
    source: 'Verified 24/7 Registry',
    confidenceLabel: 'HIGH CONFIDENCE',
    verifiedAt: 'Verified today 18:30',
    dutyInfo: {
      isOnDutyTonight: false,
      dutyType: 'none'
    },
    openingHours: {
      monday: { open: '00:00', close: '23:59' },
      tuesday: { open: '00:00', close: '23:59' },
      wednesday: { open: '00:00', close: '23:59' },
      thursday: { open: '00:00', close: '23:59' },
      friday: { open: '00:00', close: '23:59' },
      saturday: { open: '00:00', close: '23:59' },
      sunday: { open: '00:00', close: '23:59' }
    },
    services: ['open_24_7', 'night_bell', 'delivery', 'wheelchair', 'oxygen_supplies'],
    note: 'Open 365 days a year continuous.'
  },
  {
    id: 'ph-casa-3',
    name: 'Pharmacie Maarif Centrale',
    address: '128 Boulevard Al Massira Al Khadra',
    city: 'Casablanca',
    neighborhood: 'Maarif',
    phone: '+212 522-251-404',
    lat: 33.578450,
    lng: -7.636920,
    source: 'City Directory',
    confidenceLabel: 'HIGH CONFIDENCE',
    verifiedAt: 'Verified yesterday',
    dutyInfo: {
      isOnDutyTonight: false,
      dutyType: 'none'
    },
    openingHours: {
      monday: { open: '08:30', close: '20:30' },
      tuesday: { open: '08:30', close: '20:30' },
      wednesday: { open: '08:30', close: '20:30' },
      thursday: { open: '08:30', close: '20:30' },
      friday: { open: '08:30', close: '20:30' },
      saturday: { open: '09:00', close: '20:00' },
      sunday: { open: '10:00', close: '18:00', isClosed: true }
    },
    services: ['prescription', 'parapharmacy', 'wheelchair']
  },
  {
    id: 'ph-casa-4',
    name: 'Pharmacie Du Parc',
    address: '88 Avenue Hassan II, Centre Ville',
    city: 'Casablanca',
    neighborhood: 'Centre Ville',
    phone: null,
    lat: 33.587210,
    lng: -7.618450,
    source: 'Duty Night Board',
    confidenceLabel: 'MEDIUM',
    verifiedAt: 'Verified today',
    dutyInfo: {
      isOnDutyTonight: true,
      dutyType: 'night_shift',
      shiftStart: '20:00',
      shiftEnd: '08:00',
      dutyNote: 'Phone line disconnected. Visit directly at Night Window.'
    },
    openingHours: {
      monday: { open: '08:30', close: '20:00' },
      tuesday: { open: '08:30', close: '20:00' },
      wednesday: { open: '08:30', close: '20:00' }
    },
    services: ['night_bell', 'prescription'],
    note: 'No phone number listed. On-duty window active.'
  },
  {
    id: 'ph-casa-5',
    name: 'Pharmacie Al Quods (Conflicting Hours)',
    address: '15 Boulevard Panoramique, Oasis',
    city: 'Casablanca',
    neighborhood: 'Oasis',
    phone: '+212 522-870-123',
    lat: 33.554310,
    lng: -7.632890,
    source: 'Community Submission',
    confidenceLabel: 'UNVERIFIED',
    verifiedAt: 'Unverified schedule',
    dutyInfo: {
      isOnDutyTonight: false,
      dutyType: 'none'
    },
    openingHours: {
      isConflicting: true,
      rawText: 'Schedule changing due to holiday rotation. Call pharmacy first.'
    },
    services: ['prescription', 'parapharmacy'],
    note: 'Conflicting holiday hours reported.'
  },
  {
    id: 'ph-casa-6',
    name: 'Pharmacie Ibn Sina (Missing Hours Info)',
    address: '24 Route de Nouaceur, Near CHU',
    city: 'Casablanca',
    neighborhood: 'Near CHU Ibn Rochd',
    phone: '+212 522-224-555',
    lat: 33.568910,
    lng: -7.621000,
    source: 'OpenStreetMap',
    confidenceLabel: 'UNVERIFIED',
    verifiedAt: 'Hours unverified',
    dutyInfo: {
      isOnDutyTonight: false,
      dutyType: 'none'
    },
    openingHours: {
      hasMissingHours: true
    },
    services: ['prescription', 'oxygen_supplies'],
    note: 'Opening schedule unverified.'
  },

  // RABAT PHARMACIES
  {
    id: 'ph-rabat-1',
    name: 'Pharmacie de Garde Agdal',
    address: '32 Avenue Fal Ould Oumeir, Agdal',
    city: 'Rabat',
    neighborhood: 'Agdal',
    phone: '+212 537-771-888',
    lat: 34.004120,
    lng: -6.852310,
    source: 'Rabat Syndicate Rota',
    confidenceLabel: 'HIGH CONFIDENCE',
    verifiedAt: 'Verified today 19:00',
    dutyInfo: {
      isOnDutyTonight: true,
      dutyType: 'night_shift',
      shiftStart: '20:00',
      shiftEnd: '08:30',
      dutyNote: 'Ring illuminated night bell next to main entrance.'
    },
    openingHours: {
      monday: { open: '08:30', close: '20:00' },
      tuesday: { open: '08:30', close: '20:00' },
      wednesday: { open: '08:30', close: '20:00' },
      thursday: { open: '08:30', close: '20:00' },
      friday: { open: '08:30', close: '20:00' }
    },
    services: ['night_bell', 'prescription', 'delivery', 'wheelchair']
  },
  {
    id: 'ph-rabat-2',
    name: 'Pharmacie Hassan Premier 24/7',
    address: '14 Avenue Allal Ben Abdellah, Hassan',
    city: 'Rabat',
    neighborhood: 'Hassan',
    phone: '+212 537-202-020',
    lat: 34.020810,
    lng: -6.834100,
    source: 'Official 24/7 Registry',
    confidenceLabel: 'HIGH CONFIDENCE',
    verifiedAt: 'Verified today',
    dutyInfo: {
      isOnDutyTonight: true,
      dutyType: '24h_duty',
      dutyNote: 'Full 24-hour service.'
    },
    openingHours: {
      monday: { open: '00:00', close: '23:59' },
      tuesday: { open: '00:00', close: '23:59' },
      wednesday: { open: '00:00', close: '23:59' },
      thursday: { open: '00:00', close: '23:59' },
      friday: { open: '00:00', close: '23:59' },
      saturday: { open: '00:00', close: '23:59' },
      sunday: { open: '00:00', close: '23:59' }
    },
    services: ['open_24_7', 'night_bell', 'delivery', 'prescription']
  },

  // MARRAKESH PHARMACIES
  {
    id: 'ph-kech-1',
    name: 'Pharmacie de Garde Guéliz',
    address: '54 Avenue Mohammed V, Guéliz',
    city: 'Marrakesh',
    neighborhood: 'Guéliz',
    phone: '+212 524-431-200',
    lat: 31.634810,
    lng: -8.012540,
    source: 'Marrakesh Duty Rota',
    confidenceLabel: 'HIGH CONFIDENCE',
    verifiedAt: 'Verified today',
    dutyInfo: {
      isOnDutyTonight: true,
      dutyType: 'night_shift',
      shiftStart: '20:00',
      shiftEnd: '08:30',
      dutyNote: 'Night window active at Guéliz plaza side.'
    },
    openingHours: {
      monday: { open: '08:30', close: '20:00' },
      tuesday: { open: '08:30', close: '20:00' },
      wednesday: { open: '08:30', close: '20:00' },
      thursday: { open: '08:30', close: '20:00' },
      friday: { open: '08:30', close: '20:00' }
    },
    services: ['night_bell', 'prescription', 'delivery', 'parapharmacy']
  },

  // PARIS PHARMACIES
  {
    id: 'ph-paris-1',
    name: 'Pharmacie de Garde Opéra 24h',
    address: '6 Boulevard des Capucines',
    city: 'Paris',
    neighborhood: '9ème Arrondissement',
    phone: '+33 1 42 65 88 29',
    lat: 48.870510,
    lng: 2.332150,
    source: 'ARS Ile-de-France Rota',
    confidenceLabel: 'HIGH CONFIDENCE',
    verifiedAt: 'Verified today',
    dutyInfo: {
      isOnDutyTonight: true,
      dutyType: '24h_duty',
      dutyNote: 'Guichet de nuit accessible après minuit.'
    },
    openingHours: {
      monday: { open: '00:00', close: '23:59' },
      tuesday: { open: '00:00', close: '23:59' },
      wednesday: { open: '00:00', close: '23:59' },
      thursday: { open: '00:00', close: '23:59' },
      friday: { open: '00:00', close: '23:59' },
      saturday: { open: '00:00', close: '23:59' },
      sunday: { open: '00:00', close: '23:59' }
    },
    services: ['open_24_7', 'night_bell', 'prescription', 'wheelchair']
  }
];

export const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  'Nador': { lat: 35.1681, lng: -2.9335 },
  'Casablanca': { lat: 33.589882, lng: -7.632145 },
  'Rabat': { lat: 34.020810, lng: -6.834100 },
  'Marrakesh': { lat: 31.634810, lng: -8.012540 },
  'Marrakech': { lat: 31.634810, lng: -8.012540 },
  'Tangier': { lat: 35.776100, lng: -5.789200 },
  'Agadir': { lat: 30.427800, lng: -9.598100 },
  'Oujda': { lat: 34.681400, lng: -1.908600 },
  'Fes': { lat: 34.033300, lng: -5.000000 },
  'Paris': { lat: 48.856600, lng: 2.352200 },
  'Lyon': { lat: 45.764040, lng: 4.835659 }
};
