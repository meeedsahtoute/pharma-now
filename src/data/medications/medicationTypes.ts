export type TherapeuticCategory =
  | 'Pain & Fever'
  | 'Cold & Flu'
  | 'Allergy'
  | 'Cough'
  | 'Digestive Health'
  | 'Diarrhea'
  | 'Constipation'
  | 'Antacids'
  | 'Nausea'
  | 'Vitamins & Minerals'
  | 'Antibiotics'
  | 'Antifungals'
  | 'Antivirals'
  | 'Antiparasitics'
  | 'Respiratory'
  | 'Asthma'
  | 'Blood Pressure'
  | 'Diabetes'
  | 'Cholesterol'
  | 'Cardiovascular'
  | 'Dermatology'
  | 'Eye Care'
  | 'Ear Care'
  | 'Antiseptics'
  | 'First Aid'
  | 'Anti-inflammatory'
  | 'Muscle & Joint'
  | 'Women\'s Health'
  | 'Men\'s Health'
  | 'Pediatric'
  | 'Neurology'
  | 'Mental Health'
  | 'Urology'
  | 'Other';

export interface MedicationEntry {
  id: string;
  genericName: { EN: string; FR: string; AR: string };
  brandNames: string[]; // Moroccan market brands
  activeIngredients: { EN: string; FR: string; AR: string };
  category: TherapeuticCategory;
  description: { EN: string; FR: string; AR: string };
  generalUses: { EN: string[]; FR: string[]; AR: string[] };
  forms: { EN: string[]; FR: string[]; AR: string[] };
  precautions: { EN: string[]; FR: string[]; AR: string[] };
  sideEffects: { EN: string[]; FR: string[]; AR: string[] };
  warnings: { EN: string[]; FR: string[]; AR: string[] };
  interactions: { EN: string[]; FR: string[]; AR: string[] };
  storage: { EN: string; FR: string; AR: string };
  prescriptionStatus: 'OTC' | 'Prescription' | 'Strict Prescription';
  ageWarnings?: { EN: string; FR: string; AR: string };
  pregnancyWarnings?: { EN: string; FR: string; AR: string };
  sources: string;
  lastReviewed: string;
  lastUpdated: string;
}
