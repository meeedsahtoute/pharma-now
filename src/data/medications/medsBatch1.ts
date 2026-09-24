import type { MedicationEntry } from './medicationTypes.ts';

export const MEDS_BATCH_1: MedicationEntry[] = [
  {
    id: 'med-1',
    genericName: { EN: 'Paracetamol', FR: 'Paracétamol', AR: 'باراسيتامول' },
    brandNames: ['Doliprane', 'Dafalgan', 'Efferalgan', 'Panadol', 'Paracétamol'],
    activeIngredients: { EN: 'Paracetamol (Acetaminophen)', FR: 'Paracétamol', AR: 'باراسيتامول' },
    category: 'Pain & Fever',
    description: {
      EN: 'First-line analgesic and antipyretic for mild to moderate pain and fever reduction.',
      FR: 'Antalgique et antipyrétique de première intention pour les douleurs légères à modérées et la fièvre.',
      AR: 'مسكن ومخفض للحرارة كخط أول للآلام الخفيفة والمتوسطة وارتفاع الحرارة.'
    },
    generalUses: {
      EN: ['Headaches and migraines', 'Fever reduction', 'Toothaches', 'Muscle and joint soreness'],
      FR: ['Maux de tête et migraines', 'Réduction de la fièvre', 'Douleurs dentaires', 'Courbatures musculaires'],
      AR: ['الصداع والشقيقة', 'تخفيض الحرارة', 'ألم الأسنان', 'آلام العضلات والمفاصل']
    },
    forms: {
      EN: ['Tablets 500mg, 1000mg', 'Effervescent Tablets', 'Syrup / Oral Drops', 'Suppositories'],
      FR: ['Comprimés 500mg, 1000mg', 'Comprimés effervescents', 'Sirop pédiatrique', 'Suppositoires'],
      AR: ['أقراص 500 ملغ، 1000 ملغ', 'أقراص فوارة', 'شراب للأطفال', 'تحاميل']
    },
    precautions: {
      EN: ['Do not exceed 4000mg per day in adults', 'Keep 4-6 hours between doses', 'Do not combine with other paracetamol products'],
      FR: ['Ne pas dépasser 4g/jour chez l’adulte', 'Espacer les prises de 4 à 6 heures', 'Éviter le cumul avec d’autres médicaments contenant du paracétamol'],
      AR: ['عدم تجاوز 4 غرام يومياً للبالغين', 'ترك 4 إلى 6 ساعات بين الجرعات', 'تجنب تناوله مع أدوية أخرى تحوي الباراسيتامول']
    },
    sideEffects: {
      EN: ['Rare allergic skin rash', 'Liver toxicity at toxic doses'],
      FR: ['Rares éruptions cutanées', 'Toxicité hépatique en surdosage'],
      AR: ['طفح جلدي نادر', 'تأثير كبدي عند الجرعات الزائدة']
    },
    warnings: {
      EN: ['Severe liver failure or active hepatitis'],
      FR: ['Contre-indiqué en cas d’insuffisance hépatique sévère'],
      AR: ['يمنع في حالة الفشل الكبدي الحاد']
    },
    interactions: {
      EN: ['Warfarin (long term use)', 'Alcohol (chronic high use)'],
      FR: ['Antivitamine K (usage prolongé)', 'Alcool à forte dose'],
      AR: ['مضادات التجلط عند الاستخدام الطويل', 'كحوليات']
    },
    storage: { EN: 'Store below 30°C in dry place', FR: 'Conserver à < 30°C à l’abri de l’humidité', AR: 'يحفظ دون 30 مئوية بعيداً عن الرطوبة' },
    prescriptionStatus: 'OTC',
    sources: 'ANAM Maroc / ANSM France / WHO',
    lastReviewed: '2026-08',
    lastUpdated: '2026-08'
  },
  {
    id: 'med-2',
    genericName: { EN: 'Ibuprofen', FR: 'Ibuprofène', AR: 'إيبوبروفين' },
    brandNames: ['Algofen', 'Antadys', 'Brufen', 'Adviltab', 'Ibuprofène'],
    activeIngredients: { EN: 'Ibuprofen', FR: 'Ibuprofène', AR: 'إيبوبروفين' },
    category: 'Anti-inflammatory',
    description: {
      EN: 'Non-steroidal anti-inflammatory drug (NSAID) for inflammatory pain, fever, and dysmenorrhea.',
      FR: 'Anti-inflammatoire non stéroïdien (AINS) pour les douleurs inflammatoires, la fièvre et les règles douloureuses.',
      AR: 'دواء مضاد للالتهاب غير ستيرويدي لآلام الالتهاب والحمى وآلام الدورة الشهرية.'
    },
    generalUses: {
      EN: ['Dental pain and inflammation', 'Menstrual cramps', 'Joint stiffness and arthritis', 'Fever relief'],
      FR: ['Douleurs dentaires et inflammations', 'Règles douloureuses', 'Douleurs articulaires', 'Fièvre'],
      AR: ['ألم الأسنان والالتهاب', 'آلام الدورة الشهرية', 'آلام المفاصل', 'تخفيض الحرارة']
    },
    forms: {
      EN: ['Tablets 200mg, 400mg', 'Oral Suspension', 'Topical Gel'],
      FR: ['Comprimés 200mg, 400mg', 'Sirop pédiatrique', 'Gel topique'],
      AR: ['أقراص 200 ملغ، 400 ملغ', 'شراب للأطفال', 'جل موضع']
    },
    precautions: {
      EN: ['Always take with meal or glass of water', 'Use shortest effective duration'],
      FR: ['À prendre au cours des repas', 'Utiliser la durée la plus courte possible'],
      AR: ['تناوله مع وجبة الطعام أو الماء', 'استخدام لأقصر فترة ممكنة']
    },
    sideEffects: {
      EN: ['Stomach upset or heartburn', 'Dizziness', 'Fluid retention'],
      FR: ['Brûlures d’estomac, nausées', 'Vertiges', 'Rétention d’eau'],
      AR: ['حرقة معدة، غثيان', 'دوار', 'احتباس السوائل']
    },
    warnings: {
      EN: ['Strictly contraindicated during 3rd trimester of pregnancy', 'Avoid in active peptic ulcer or severe kidney disease', 'Avoid during chickenpox'],
      FR: ['Contre-indiqué au 3ème trimestre de grossesse', 'Éviter en cas d’ulcère gastrique ou d’insuffisance rénale', 'Ne pas donner en cas de varicelle'],
      AR: ['ممنوع تماماً في الثلث الثالث من الحمل', 'تجنبه في قرحة المعدة الحادة وأمراض الكلى', 'تجنبه في حالة جدري الماء']
    },
    interactions: {
      EN: ['Aspirin', 'Anticoagulants', 'ACE inhibitors'],
      FR: ['Aspirine', 'Anticoagulants', 'Inhibiteurs de l’ECA'],
      AR: ['أسبرين', 'مضادات التجلط', 'أدوية الضغط']
    },
    storage: { EN: 'Store below 25°C dry', FR: 'Conserver à < 25°C au sec', AR: 'يحفظ دون 25 مئوية في مكان جاف' },
    prescriptionStatus: 'OTC',
    sources: 'ANAM Maroc / ANSM',
    lastReviewed: '2026-08',
    lastUpdated: '2026-08'
  },
  {
    id: 'med-3',
    genericName: { EN: 'Amoxicillin', FR: 'Amoxicilline', AR: 'أموكسيسيلين' },
    brandNames: ['Amoxil', 'Clamoxyl', 'Ospamox', 'Amoxicilline'],
    activeIngredients: { EN: 'Amoxicillin Trihydrate', FR: 'Amoxicilline trihydratée', AR: 'أموكسيسيلين ثلاثي الهيدرات' },
    category: 'Antibiotics',
    description: {
      EN: 'Broad-spectrum aminopenicillin antibiotic for bacterial infections.',
      FR: 'Antibiotique aminopénicilline à large spectre pour les infections bactériennes.',
      AR: 'مضاد حيوي واسع المجال من عائلة البنسلين للعدوى البكتيرية.'
    },
    generalUses: {
      EN: ['ENT bacterial infections (otitis, sinusitis)', 'Lower respiratory infections (bronchitis)', 'Urinary tract infections', 'Dental infections'],
      FR: ['Infections ORL (otite, sinusite)', 'Infections respiratoires (bronchite)', 'Infections urinaires', 'Infections dentaires'],
      AR: ['عدوى الأنف والأذن والحنجرة', 'التهابات الشعب الهوائية', 'التهابات المسالك البولية', 'عدوى الأسنان البكتيرية']
    },
    forms: {
      EN: ['Capsules 500mg, 1000mg', 'Dispersible Tablets', 'Oral Suspension for Children'],
      FR: ['Gélules 500mg, 1000mg', 'Comprimés dispersibles', 'Poudre pour suspension orale'],
      AR: ['كبسولات 500 ملغ، 1000 ملغ', 'أقراص قابلة للذوبان', 'بودرة شراب للأطفال']
    },
    precautions: {
      EN: ['Complete the full prescribed course even if feeling better', 'Take with meals to minimize gastric discomfort'],
      FR: ['Poursuivre le traitement jusqu’au bout selon l’ordonnance', 'Prendre pendant les repas'],
      AR: ['إكمال كامل مدة العلاج الموصوفة وإن تحسنت الأعراض', 'تناوله مع الوجبات']
    },
    sideEffects: {
      EN: ['Diarrhea or mild nausea', 'Skin rash in sensitive individuals'],
      FR: ['Diarrhée ou nausées légères', 'Éruption cutanée chez les personnes sensibles'],
      AR: ['إسهال أو غثيان بسيط', 'طفح جلدي لدى ذوي الحساسية']
    },
    warnings: {
      EN: ['Contraindicated in patients with severe penicillin allergy (Anaphylaxis risk)'],
      FR: ['Contre-indiqué en cas d’allergie connue aux pénicillines'],
      AR: ['حظر في حالة حساسية البنسلين الشديدة']
    },
    interactions: {
      EN: ['Allopurinol (increases rash risk)', 'Oral contraceptives (minor interaction)'],
      FR: ['Allopurinol (risque d’éruption)', 'Contraceptifs oraux'],
      AR: ['ألوبرينول', 'مانعات الحمل الفموية']
    },
    storage: { EN: 'Store dry below 25°C. Reconstituted syrup in fridge max 7-10 days', FR: 'Conserver à < 25°C. Sirop reconstitué au frigo 7-10 jours', AR: 'يحفظ جافاً دون 25 مئوية. الشراب بالثلاجة 7-10 أيام' },
    prescriptionStatus: 'Prescription',
    sources: 'ANAM Maroc / WHO',
    lastReviewed: '2026-08',
    lastUpdated: '2026-08'
  },
  {
    id: 'med-4',
    genericName: { EN: 'Amoxicillin + Clavulanic Acid', FR: 'Amoxicilline + Acide Clavulanique', AR: 'أموكسيسيلين + حمض الكلافولانيك' },
    brandNames: ['Augmentin', 'Augmentin Sachet', 'Curam', 'Amoclan'],
    activeIngredients: { EN: 'Amoxicillin + Clavulanate Potassium', FR: 'Amoxicilline + Clavulanate de potassium', AR: 'أموكسيسيلين + كلافولانات' },
    category: 'Antibiotics',
    description: {
      EN: 'Enhanced broad-spectrum antibiotic active against beta-lactamase producing bacteria.',
      FR: 'Antibiotique à large spectre renforcé actif contre les bactéries productrices de bêta-lactamases.',
      AR: 'مضاد حيوي مقوى واسع المجال للبكتيريا المقاومة للبنسلين العادي.'
    },
    generalUses: {
      EN: ['Severe otitis media and refractory sinusitis', 'Pneumonia and acute bronchitis exacerbations', 'Skin and soft tissue infections', 'Complicated urinary infections'],
      FR: ['Otite moyenne aiguë et sinusite sévère', 'Pneumopathie et bronchite aiguë', 'Infections cutanées', 'Infections urinaires compliquées'],
      AR: ['التهاب الأذن الوسطى والجيوب الأنفية الحاد', 'التهابات الرئة والشعب الهوائية', 'التهابات الجلد والنسيج الرخو', 'التهابات المسالك المتقدمة']
    },
    forms: {
      EN: ['Tablets 1g/125mg', 'Adult Sachets', 'Pediatric Oral Suspension 100mg/12.5mg'],
      FR: ['Comprimés 1g/125mg', 'Sachets adulte', 'Poudre pour suspension pédiatrique'],
      AR: ['أقراص 1 غرام/125 ملغ', 'أكياس للبالغين', 'شراب للأطفال']
    },
    precautions: {
      EN: ['Take at the start of a meal to enhance absorption and reduce GI side effects', 'Complete exact prescribed duration'],
      FR: ['Prendre au début des repas pour réduire la diarrhée', 'Respecter la durée exacte de la prescription'],
      AR: ['تناوله عند بداية الوجبة لتقليل الإسهال وآلام المعدة', 'التزام بالمدة المحددة بالضبط']
    },
    sideEffects: {
      EN: ['Diarrhea, loose stools', 'Nausea, vomiting', 'Candidiasis (thrush)'],
      FR: ['Diarrhée, selles molles', 'Nausées, vomissements', 'Candidose'],
      AR: ['إسهال، براز لين', 'غثيان وقيء', 'فطريات الفم']
    },
    warnings: {
      EN: ['Penicillin allergy', 'History of Augmentin-associated cholestatic jaundice or liver impairment'],
      FR: ['Allergie aux pénicillines', 'Antécédent d’atteinte hépatique sous amoxicilline/acide clavulanique'],
      AR: ['حساسية البنسلين', 'تاريخ سابق لإصابة الكبد أو اليرقان بسبب هذا الدواء']
    },
    interactions: {
      EN: ['Oral anticoagulants', 'Methotrexate'],
      FR: ['Anticoagulants oraux', 'Méthotrexate'],
      AR: ['مضادات التجلط الفموية', 'ميثوتريكسات']
    },
    storage: { EN: 'Store below 25°C. Keep sachets sealed.', FR: 'Conserver à < 25°C à l’abri de l’humidité.', AR: 'يحفظ دون 25 مئوية.' },
    prescriptionStatus: 'Prescription',
    sources: 'ANAM Maroc / ANSM',
    lastReviewed: '2026-08',
    lastUpdated: '2026-08'
  },
  {
    id: 'med-5',
    genericName: { EN: 'Phloroglucinol', FR: 'Phloroglucinol', AR: 'فلوروجلوسينول' },
    brandNames: ['Spasfon', 'Phloroglucinol', 'Spasfon-Lyoc'],
    activeIngredients: { EN: 'Phloroglucinol', FR: 'Phloroglucinol', AR: 'فلوروجلوسينول' },
    category: 'Digestive Health',
    description: {
      EN: 'Smooth muscle antispasmodic for pain related to GI tract, biliary system, and gynecological spasms.',
      FR: 'Antispasmodique musculotrope pour les douleurs spasmodiques de l’intestin, des voies biliaires et gynécologiques.',
      AR: 'مضاد تقلصات للعضلات الملساء لآلام الأمعاء، القنوات المرارية، وآلام الرحم والدورة.'
    },
    generalUses: {
      EN: ['Abdominal cramps and bowel spasms', 'Biliary colic', 'Renal colic pain support', 'Menstrual cramps'],
      FR: ['Spasmes intestinaux et coliques', 'Colique hépatique', 'Colique néphrétique', 'Règles douloureuses'],
      AR: ['مغص الأمعاء وتقلصات القولون', 'مغص المرارة', 'مغص الكلى', 'آلام الدورة الشهرية']
    },
    forms: {
      EN: ['Tablets 80mg', 'Lyoc (Orally Disintegrating Tablets)', 'Injectable Solution'],
      FR: ['Comprimés 80mg', 'Lyoc (comprimés orodispersibles)', 'Ampoules injectables'],
      AR: ['أقراص 80 ملغ', 'أقراص تذوب بالفم (ليوك)', 'حقن']
    },
    precautions: {
      EN: ['Dissolve Lyoc under tongue or in water for fast relief'],
      FR: ['Fondre le Lyoc sous la langue ou dans un peu d’eau'],
      AR: ['إذابة قرص الليوك تحت اللسان لسرعة المفعول']
    },
    sideEffects: {
      EN: ['Rare cutaneous allergic reactions'],
      FR: ['Rares réactions allergiques cutanées'],
      AR: ['حساسية جلدية نادرة']
    },
    warnings: {
      EN: ['Hypersensitivity to phloroglucinol'],
      FR: ['Allergie connue au phloroglucinol'],
      AR: ['حساسية الفلوروجلوسينول']
    },
    interactions: { EN: ['None major'], FR: ['Aucune majeure'], AR: ['لا توجد تداخلات كبرى'] },
    storage: { EN: 'Store below 30°C', FR: 'Conserver à < 30°C', AR: 'يحفظ دون 30 مئوية' },
    prescriptionStatus: 'OTC',
    sources: 'Ministère de la Santé Maroc',
    lastReviewed: '2026-08',
    lastUpdated: '2026-08'
  }
];
