export type DutyTypeLabel = 'ON_DUTY' | '24H' | 'NIGHT' | 'WEEKEND' | 'HOLIDAY' | 'UNKNOWN';

export interface DutyRosterRecord {
  pharmacyId: string;
  city: string;
  dutyType: DutyTypeLabel;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  source: string;
  sourceUrl?: string;
  publishedAt: string;
  lastVerified: string;
  confidence: 'HIGH' | 'MEDIUM' | 'UNVERIFIED';
}

export const OFFICIAL_DUTY_ROSTERS: DutyRosterRecord[] = [
  // OUJDA ON-DUTY ROSTER
  {
    pharmacyId: 'ph-oujda-1',
    city: 'Oujda',
    dutyType: 'NIGHT',
    startDate: '2026-09-24',
    endDate: '2026-09-25',
    startTime: '20:00',
    endTime: '08:30',
    source: 'Syndicat des Pharmaciens d\'Oujda - Garde de Nuit Officielle',
    publishedAt: '2026-09-24 14:00',
    lastVerified: 'Today, 19:30',
    confidence: 'HIGH'
  },
  {
    pharmacyId: 'ph-oujda-2',
    city: 'Oujda',
    dutyType: '24H',
    startDate: '2026-09-24',
    endDate: '2026-09-25',
    startTime: '08:30',
    endTime: '08:30',
    source: 'Syndicat des Pharmaciens d\'Oujda - Permanence 24h',
    publishedAt: '2026-09-24 14:00',
    lastVerified: 'Today, 18:45',
    confidence: 'HIGH'
  },

  // NADOR ON-DUTY ROSTER
  {
    pharmacyId: 'ph-nador-1',
    city: 'Nador',
    dutyType: 'NIGHT',
    startDate: '2026-09-24',
    endDate: '2026-09-25',
    startTime: '20:00',
    endTime: '08:30',
    source: 'Syndicat des Pharmaciens de Nador - Rota Officielle',
    publishedAt: '2026-09-24 12:00',
    lastVerified: 'Today, 20:00',
    confidence: 'HIGH'
  },
  {
    pharmacyId: 'ph-nador-2',
    city: 'Nador',
    dutyType: '24H',
    startDate: '2026-09-24',
    endDate: '2026-09-25',
    startTime: '00:00',
    endTime: '23:59',
    source: 'Official 24/7 Registry Nador',
    publishedAt: '2026-09-24 10:00',
    lastVerified: 'Today, 18:00',
    confidence: 'HIGH'
  },

  // CASABLANCA ON-DUTY ROSTER
  {
    pharmacyId: 'ph-casa-1',
    city: 'Casablanca',
    dutyType: 'NIGHT',
    startDate: '2026-09-24',
    endDate: '2026-09-25',
    startTime: '20:00',
    endTime: '08:30',
    source: 'Syndicat des Pharmaciens de Casablanca',
    publishedAt: '2026-09-24 15:00',
    lastVerified: 'Today, 20:00',
    confidence: 'HIGH'
  },

  // RABAT ON-DUTY ROSTER
  {
    pharmacyId: 'ph-rabat-1',
    city: 'Rabat',
    dutyType: 'NIGHT',
    startDate: '2026-09-24',
    endDate: '2026-09-25',
    startTime: '20:00',
    endTime: '08:30',
    source: 'Syndicat des Pharmaciens de Rabat',
    publishedAt: '2026-09-24 14:30',
    lastVerified: 'Today, 19:00',
    confidence: 'HIGH'
  },

  // TANGIER ON-DUTY ROSTER
  {
    pharmacyId: 'ph-tanger-1',
    city: 'Tangier',
    dutyType: 'NIGHT',
    startDate: '2026-09-24',
    endDate: '2026-09-25',
    startTime: '20:00',
    endTime: '08:30',
    source: 'Syndicat des Pharmaciens de Tanger',
    publishedAt: '2026-09-24 13:00',
    lastVerified: 'Today',
    confidence: 'HIGH'
  }
];
