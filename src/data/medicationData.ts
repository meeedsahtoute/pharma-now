export interface MedicationInfo {
  id: string;
  brandNames: string[];
  activeIngredient: { EN: string; FR: string; AR: string };
  category: string;
  isPrescriptionRequired: boolean;
  purpose: { EN: string; FR: string; AR: string };
  commonForms: { EN: string[]; FR: string[]; AR: string[] };
  precautions: { EN: string[]; FR: string[]; AR: string[] };
  sideEffects: { EN: string[]; FR: string[]; AR: string[] };
  warnings: { EN: string[]; FR: string[]; AR: string[] };
  storage: { EN: string; FR: string; AR: string };
  source: string;
}

export const MEDICATIONS_DATABASE: MedicationInfo[] = [
  {
    id: 'paracetamol',
    brandNames: ['Paracétamol', 'Doliprane', 'Dafalgan', 'Efferalgan', 'Panadol'],
    activeIngredient: {
      EN: 'Paracetamol (Acetaminophen)',
      FR: 'Paracétamol',
      AR: 'باراسيتامول'
    },
    category: 'Analgesic & Antipyretic',
    isPrescriptionRequired: false,
    purpose: {
      EN: 'Relief of mild to moderate pain (headaches, toothaches, muscle aches) and reduction of fever.',
      FR: 'Soulagement des douleurs légères à modérées (maux de tête, dentaires, courbatures) et réduction de la fièvre.',
      AR: 'مسكن للآلام الخفيفة والمتوسطة (الصداع، ألم الأسنان، العضلات) ومخفض للحمى.'
    },
    commonForms: {
      EN: ['Oral Tablets (500mg, 1000mg)', 'Effervescent Tablets', 'Oral Syrup for Children', 'Suppositories'],
      FR: ['Comprimés (500mg, 1000mg)', 'Comprimés effervescents', 'Sirop pédiatrique', 'Suppositoires'],
      AR: ['أقراص (500 ملغ، 1000 ملغ)', 'أقراص فوارة', 'شراب للأطفال', 'تحاميل']
    },
    precautions: {
      EN: ['Do not exceed the maximum daily dose (4g/day for adults)', 'Leave at least 4 to 6 hours between doses', 'Check other cold/flu remedies to prevent accidental overdose'],
      FR: ['Ne pas dépasser 4g par jour chez l’adulte', 'Respecter un intervalle de 4 à 6 heures entre les prises', 'Vérifier les associations avec d’autres médicaments pour éviter le surdosage'],
      AR: ['عدم تجاوز الجرعة القصوى (4 غرام يومياً للبالغين)', 'ترك 4 إلى 6 ساعات على الأقل بين الجرعات', 'التأكد من الأدوية الأخرى لمنع التكرار والتسمم']
    },
    sideEffects: {
      EN: ['Rare allergic skin rash', 'Rare liver enzyme elevation with excessive use'],
      FR: ['Rares éruptions cutanées allergiques', 'Atteinte hépatique en cas de surdosage'],
      AR: ['طفح جلدي نادراً', 'تأثير على الكبد في حالة الجرعات الزائدة']
    },
    warnings: {
      EN: ['Severe liver disease or hepatic failure require medical clearance', 'Chronic alcohol use increases liver toxicity risk'],
      FR: ['Contre-indiqué en cas d’insuffisance hépatique sévère', 'Prudence chez l’alcoolique chronique'],
      AR: ['يحظر في حالة الفشل الكبدي الحاد', 'الحذر عند مرضى الكبد']
    },
    storage: {
      EN: 'Store below 30°C away from direct moisture and heat. Keep out of reach of children.',
      FR: 'Conserver à une température inférieure à 30°C, à l’abri de l’humidité. Tenir hors de portée des enfants.',
      AR: 'يحفظ في درجة حرارة أقل من 30 مئوية بعيداً عن الرطوبة والأطفال.'
    },
    source: 'Agence Nationale de l’Assurance Maladie (ANAM Maroc) / WHO'
  },
  {
    id: 'ibuprofen',
    brandNames: ['Ibuprofène', 'Algofen', 'Antadys', 'Brufen', 'Adviltab'],
    activeIngredient: {
      EN: 'Ibuprofen',
      FR: 'Ibuprofène',
      AR: 'إيبوبروفين'
    },
    category: 'Non-Steroidal Anti-Inflammatory (NSAID)',
    isPrescriptionRequired: false,
    purpose: {
      EN: 'Short-term treatment of inflammatory pain, fever, joint pain, and menstrual cramps.',
      FR: 'Traitement de courte durée des douleurs inflammatoires, de la fièvre et des règles douloureuses.',
      AR: 'علاج قصير المدى للآلام الالتهابية، الحمى، آلام المفاصل، وآلام الدورة الشهرية.'
    },
    commonForms: {
      EN: ['Oral Tablets (200mg, 400mg)', 'Pediatric Oral Suspension', 'Topical Gel'],
      FR: ['Comprimés (200mg, 400mg)', 'Sirop pédiatrique', 'Gel cutané'],
      AR: ['أقراص (200 ملغ، 400 ملغ)', 'شراب للأطفال', 'جل موضع']
    },
    precautions: {
      EN: ['Take with food or a glass of water to protect the stomach', 'Use the lowest effective dose for the shortest duration'],
      FR: ['À prendre au cours des repas pour protéger l’estomac', 'Utiliser la dose minimale efficace pendant la durée la plus courte'],
      AR: ['يتناول مع الطعام أو كؤوس من الماء لحماية المعدة', 'استخدام أقل جرعة موجهة ولأقصر فترة']
    },
    sideEffects: {
      EN: ['Stomach pain, heartburn, or nausea', 'Dizziness', 'Fluid retention'],
      FR: ['Maux d’estomac, brûlures, nausées', 'Vertiges', 'Rétention d’eau'],
      AR: ['ألم المعدة، حرقة، غثيان', 'دوار', 'احتباس السوائل']
    },
    warnings: {
      EN: ['Contraindicated during pregnancy (from 6th month onwards)', 'Avoid if you have active stomach ulcers or severe kidney disease', 'Avoid during chickenpox (Varicella) infection'],
      FR: ['Contre-indiqué à partir du 6ème mois de grossesse', 'Éviter en cas d’ulcère gastrique ou d’insuffisance rénale', 'Ne pas utiliser en cas de varicelle'],
      AR: ['ممنوع تماماً من الشهر السادس للحمل', 'يتجنب في حالة قرحة المعدة الحادة أو أمراض الكلى', 'يمنع في حالة جدري الماء (المكتع)']
    },
    storage: {
      EN: 'Store in dry place under 25°C.',
      FR: 'Conserver à l’abri de la chaleur et de l’humidité (< 25°C).',
      AR: 'يحفظ في مكان جاف أقل من 25 مئوية.'
    },
    source: 'ANAM Maroc / ANSM'
  },
  {
    id: 'spasfon',
    brandNames: ['Spasfon', 'Phloroglucinol'],
    activeIngredient: {
      EN: 'Phloroglucinol',
      FR: 'Phloroglucinol',
      AR: 'فلوروجلوسينول'
    },
    category: 'Antispasmodic',
    isPrescriptionRequired: false,
    purpose: {
      EN: 'Symptomatic treatment of painful spasms in the digestive tract, biliary tract, and urinary/gynecological conditions.',
      FR: 'Traitement symptomatique des douleurs spasmodiques digestives, biliaires et gynécologiques (règles douloureuses).',
      AR: 'علاج أعراض المغص والتقلصات المؤلمة في الجهاز الهضمي والمسالك البولية وآلام الدورة الشهرية.'
    },
    commonForms: {
      EN: ['Oral Tablets (80mg)', 'Lyoc / Orally Disintegrating Tablets', 'Injectable Solution'],
      FR: ['Comprimés (80mg)', 'Lyoc (comprimés orodispersibles)', 'Ampoules injectables'],
      AR: ['أقراص (80 ملغ)', 'أقراص تذوب بالفم (ليوك)', 'حقن']
    },
    precautions: {
      EN: ['Dissolve Lyoc tablets under the tongue or in a glass of water', 'Consult a doctor if pain persists or worsens'],
      FR: ['Fondre le Lyoc sous la langue ou dans un verre d’eau', 'Consulter si la douleur persiste'],
      AR: ['إذابة قرص الليوك تحت اللسان أو في الماء', 'استشارة الطبيب إذا استمر الألم']
    },
    sideEffects: {
      EN: ['Rare allergic skin reactions (hives, itching)'],
      FR: ['Rares réactions allergiques cutanées (urticaire)'],
      AR: ['تفاعلات جلدية حساسية نادرة']
    },
    warnings: {
      EN: ['Avoid using if known hypersensitivity to phloroglucinol'],
      FR: ['Ne pas utiliser en cas d’allergie connue au phloroglucinol'],
      AR: ['يمنع في حالة الحساسية للفلوروجلوسينول']
    },
    storage: {
      EN: 'Store protected from humidity and excessive warmth.',
      FR: 'Conserver à l’abri de l’humidité.',
      AR: 'يحفظ بعيداً عن الرطوبة.'
    },
    source: 'Ministère de la Santé du Maroc'
  }
];
