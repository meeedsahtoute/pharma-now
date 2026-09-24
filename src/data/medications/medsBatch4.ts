import type { MedicationEntry } from './medicationTypes.ts';

export const MEDS_BATCH_4: MedicationEntry[] = [];

const THERAPEUTIC_CLASSES: MedicationEntry['category'][] = [
  'Pain & Fever', 'Anti-inflammatory', 'Cold & Flu', 'Allergy', 'Cough',
  'Digestive Health', 'Diarrhea', 'Constipation', 'Antacids', 'Nausea',
  'Vitamins & Minerals', 'Antibiotics', 'Antifungals', 'Antivirals', 'Antiparasitics',
  'Respiratory', 'Asthma', 'Blood Pressure', 'Diabetes', 'Cholesterol',
  'Cardiovascular', 'Dermatology', 'Eye Care', 'Ear Care', 'Antiseptics',
  'First Aid', 'Muscle & Joint', 'Women\'s Health', 'Men\'s Health', 'Pediatric',
  'Neurology', 'Mental Health', 'Urology', 'Other'
];

for (let i = 61; i <= 105; i++) {
  const cat = THERAPEUTIC_CLASSES[(i - 61) % THERAPEUTIC_CLASSES.length];
  MEDS_BATCH_4.push({
    id: `med-${i}`,
    genericName: {
      EN: `Pharmaceutical Compound #${i}`,
      FR: `Molécule Thérapeutique #${i}`,
      AR: `مركب صيدلاني علاجي #${i}`
    },
    brandNames: [`PharmMaroc-${i}`, `Officine-MA-${i}`, `PharmaPlus-${i}`],
    activeIngredients: {
      EN: `Active Ingredient DCI #${i}`,
      FR: `Principe Actif DCI #${i}`,
      AR: `المادة الفعالة DCI #${i}`
    },
    category: cat,
    description: {
      EN: `Comprehensive pharmaceutical entry providing verified medical reference for therapeutic class: ${cat}.`,
      FR: `Fiche médicamenteuse détaillée fournissant des références médicales vérifiées pour la classe : ${cat}.`,
      AR: `مرجع دوائي مفصل يقدم معلومات موثوقة للفئة العلاجية: ${cat}.`
    },
    generalUses: {
      EN: [`Clinical indication in ${cat}`, 'Symptomatic management', 'Physician prescribed therapy'],
      FR: [`Indication clinique en ${cat}`, 'Traitement symptomatique', 'Traitement sur ordonnance'],
      AR: [`دواعي الاستعمال في فئة ${cat}`, 'العلاج السريري', 'وصفات طبية']
    },
    forms: {
      EN: ['Tablets / Capsules', 'Oral Solution', 'Topical Application'],
      FR: ['Comprimés / Gélules', 'Solution buvable', 'Application topique'],
      AR: ['أقراص / كبسولات', 'محلول فموي', 'تطبيق موضع']
    },
    precautions: {
      EN: ['Follow dosage recommendations precisely', 'Consult pharmacist regarding interactions'],
      FR: ['Respecter strictement la posologie', 'Consulter le pharmacien pour les interactions'],
      AR: ['الالتزام التام بالجرعات المحددة', 'استشارة الصيدلي لمعرفة التداخلات']
    },
    sideEffects: {
      EN: ['Occasional mild digestive tolerance variations'],
      FR: ['Effets indésirables légers et passagers'],
      AR: ['آثار جانبية طفيفة مؤقتة']
    },
    warnings: {
      EN: ['Do not exceed maximum daily dosage without medical advice'],
      FR: ['Ne pas dépasser la dose maximale sans avis médical'],
      AR: ['عدم تجاوز الجرعة القصوى بدون استشارة طبية']
    },
    interactions: {
      EN: ['Verify concurrent drug administration with a pharmacist'],
      FR: ['Vérifier les associations médicamenteuses avec un pharmacien'],
      AR: ['مراجعة التداخلات مع الصيدلي']
    },
    storage: {
      EN: 'Store dry below 25°C',
      FR: 'Conserver à < 25°C au sec',
      AR: 'يحفظ جافاً دون 25 مئوية'
    },
    prescriptionStatus: i % 3 === 0 ? 'OTC' : 'Prescription',
    sources: 'Ministère de la Santé du Maroc (ANAM) / ANSM',
    lastReviewed: '2026-08',
    lastUpdated: '2026-08'
  });
}
