import type { MedicationEntry } from './medications/medicationTypes.ts';
import { MEDS_BATCH_1 } from './medications/medsBatch1.ts';
import { MEDS_BATCH_2 } from './medications/medsBatch2.ts';
import { MEDS_BATCH_3 } from './medications/medsBatch3.ts';
import { MEDS_BATCH_4 } from './medications/medsBatch4.ts';

export type { MedicationEntry };
export * from './medications/medicationTypes.ts';

export const MEDICATIONS_DATABASE: MedicationEntry[] = [
  ...MEDS_BATCH_1,
  ...MEDS_BATCH_2,
  ...MEDS_BATCH_3,
  ...MEDS_BATCH_4
];

export const ALL_THERAPEUTIC_CATEGORIES: string[] = Array.from(
  new Set(MEDICATIONS_DATABASE.map(m => m.category))
).sort();
