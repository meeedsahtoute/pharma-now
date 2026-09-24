export type PharmacyStatus = 'open' | 'closed' | 'on_duty' | 'unknown' | 'conflicting';

export type ServiceType = 
  | 'night_bell' 
  | 'delivery' 
  | 'prescription' 
  | 'wheelchair' 
  | 'parapharmacy' 
  | 'open_24_7'
  | 'oxygen_supplies';

export interface DayHours {
  open: string;  // e.g. "08:30"
  close: string; // e.g. "20:00"
  isClosed?: boolean;
}

export interface WeeklyOpeningHours {
  monday?: DayHours;
  tuesday?: DayHours;
  wednesday?: DayHours;
  thursday?: DayHours;
  friday?: DayHours;
  saturday?: DayHours;
  sunday?: DayHours;
  rawText?: string;
  isConflicting?: boolean;
  hasMissingHours?: boolean;
}

export interface DutySchedule {
  isOnDutyTonight: boolean;
  dutyType: 'night_shift' | '24h_duty' | 'weekend_duty' | 'none';
  shiftStart?: string; // e.g. "20:00"
  shiftEnd?: string;   // e.g. "08:30"
  dutyNote?: string;   // e.g. "Sonnette de nuit à la porte latérale"
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  city: string;
  neighborhood?: string;
  phone?: string | null;
  lat: number;
  lng: number;
  openingHours?: WeeklyOpeningHours | null;
  dutyInfo: DutySchedule;
  services: ServiceType[];
  verifiedAt: string; // e.g. "Today 20:00"
  source: string;     // e.g. "Regional Duty Rota", "OpenStreetMap"
  confidenceLabel: 'HIGH CONFIDENCE' | 'MEDIUM' | 'UNVERIFIED';
  distanceKm?: number;
  distanceMeters?: number;
  drivingTimeMin?: number;
  walkingTimeMin?: number;
  calculatedStatus?: {
    status: PharmacyStatus;
    statusLabel: string;
    subtext: string;
    badgeColor: 'emerald' | 'amber' | 'rose' | 'slate' | 'yellow';
  };
  note?: string;
}

export interface LocationState {
  lat: number | null;
  lng: number | null;
  city: string;
  isPermissionGranted: boolean;
  isPermissionDenied: boolean;
  isLocating: boolean;
  error?: string | null;
}

export interface FilterOptions {
  searchQuery: string;
  selectedCity: string;
  onlyOnDuty: boolean;
  onlyOpenNow: boolean;
  only247: boolean;
  onlyDelivery: boolean;
  maxRadiusKm: number;
  sortBy: 'distance' | 'name' | 'status';
  simulatedHourOverride?: number | null;
}
