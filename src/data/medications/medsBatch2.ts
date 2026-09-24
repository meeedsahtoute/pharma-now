import type { MedicationEntry } from './medicationTypes.ts';

export const MEDS_BATCH_2: MedicationEntry[] = [
  {
    id: 'med-6',
    genericName: { EN: 'Diosmectite', FR: 'Diosmectite', AR: 'ديوسمكتيت' },
    brandNames: ['Smecta', 'Smectalia', 'Diosmectite'],
    activeIngredients: { EN: 'Diosmectite (Natural Clay)', FR: 'Diosmectite', AR: 'ديوسمكتيت' },
    category: 'Diarrhea',
    description: {
      EN: 'Gastrointestinal natural clay protectant that binds toxins and covers intestinal mucosa.',
      FR: 'Pansement gastro-intestinal en argile naturelle qui protège la muqueuse intestinale.',
      AR: 'طين طبيعي لحماية الغشاء المخاطي للأمعاء وامتصاص السموم في حالات الإسهال.'
    },
    generalUses: { EN: ['Acute diarrhea in adults and children', 'Chronic diarrhea symptom relief', 'Abdominal bloating'], FR: ['Diarrhée aiguë chez l’adulte et l’enfant', 'Diarrhée chronique', 'Ballonnements'], AR: ['الإسهال الحاد عند البالغين والأطفال', 'الإسهال المزمن', 'الانتفاخات'] },
    forms: { EN: ['Oral Sachets for suspension'], FR: ['Sachets de poudre pour suspension orale'], AR: ['أكياس بودرة للحل في الماء'] },
    precautions: { EN: ['Administer 2 hours apart from any other oral medications as clay impairs absorption', 'Ensure oral rehydration therapy in children'], FR: ['Prendre à 2h d’écart de tout autre médicament', 'Associer des solutés de réhydratation chez l’enfant'], AR: ['فصل الدواء بساعتين عن باقي الأدوية لمنع امتصاصها', 'استخدام أملاح التروية للأطفال'] },
    sideEffects: { EN: ['Constipation (rarely)'], FR: ['Constipation (rare)'], AR: ['إمساك نادر'] },
    warnings: { EN: ['Severe intestinal obstruction'], FR: ['Obstruction intestinale'], AR: ['انسداد الأمعاء'] },
    interactions: { EN: ['Reduces absorption of most oral drugs if taken simultaneously'], FR: ['Diminue l’absorption des autres médicaments'], AR: ['يقلل امتصاص الأدوية الأخرى عند التزامن'] },
    storage: { EN: 'Store below 25°C', FR: 'Conserver à < 25°C', AR: 'يحفظ دون 25 مئوية' },
    prescriptionStatus: 'OTC',
    sources: 'ANAM Maroc',
    lastReviewed: '2026-08',
    lastUpdated: '2026-08'
  },
  {
    id: 'med-7',
    genericName: { EN: 'Omeprazole', FR: 'Oméprazole', AR: 'أوميبرازول' },
    brandNames: ['Oméprazole', 'Mopral', 'Zoltum', 'Gastrimut'],
    activeIngredients: { EN: 'Omeprazole', FR: 'Oméprazole', AR: 'أوميبرازول' },
    category: 'Antacids',
    description: {
      EN: 'Proton pump inhibitor (PPI) reducing stomach acid production.',
      FR: 'Inhibiteur de la pompe à protons (IPP) réduisant la sécrétion d’acide gastrique.',
      AR: 'مثبط مضخة البروتون لتقليل إفراز حمض المعدة لعلاج الحرقة والقرحة.'
    },
    generalUses: { EN: ['Gastroesophageal reflux (GERD) and heartburn', 'Peptic ulcer treatment and prevention', 'Gastritis'], FR: ['Reflux gastro-œsophagien (RGO) et brûlures', 'Ulcère gastrique ou duodénal', 'Gastrite'], AR: ['حرقة المعدة وارتجاع المريء', 'قرحة المعدة والإثني عشر', 'التهاب المعدة'] },
    forms: { EN: ['Gastro-resistant Capsules 10mg, 20mg'], FR: ['Gélules gastrorésistantes 10mg, 20mg'], AR: ['كبسولات مقاومة لعصارة المعدة 10 ملغ، 20 ملغ'] },
    precautions: { EN: ['Swallow capsules whole with water in the morning before breakfast', 'Do not crush or chew'], FR: ['Avaler la gélule entière le matin à jeun', 'Ne pas croquer ni écraser'], AR: ['بلع الكبسولة كاملة بالماء صباحاً على الريق', 'عدم كسر أو مضغ الكبسولة'] },
    sideEffects: { EN: ['Headache', 'Abdominal pain, constipation, flatulence'], FR: ['Céphalées', 'Douleurs abdominales, constipation, flatulences'], AR: ['صداع', 'ألم في البطن، إمساك، غازات'] },
    warnings: { EN: ['Long term use over 1 year requires monitoring of Vitamin B12 and magnesium levels'], FR: ['Un traitement au long cours nécessite un suivi du magnésium et B12'], AR: ['الاستخدام أكثر من سنة يتطلب مراقبة المغنيسيوم وفيتامين ب12'] },
    interactions: { EN: ['Clopidogrel', 'Ketoconazole', 'Methotrexate'], FR: ['Clopidogrel', 'Kétoconazole', 'Méthotrexate'], AR: ['كلوبيدوجريل', 'كيتوكونازول'] },
    storage: { EN: 'Store below 25°C in original blister', FR: 'Conserver à < 25°C dans l’emballage d’origine', AR: 'يحفظ دون 25 مئوية' },
    prescriptionStatus: 'OTC',
    sources: 'ANAM Maroc',
    lastReviewed: '2026-08',
    lastUpdated: '2026-08'
  },
  {
    id: 'med-8',
    genericName: { EN: 'Cetirizine', FR: 'Cétirizine', AR: 'سيتريزين' },
    brandNames: ['Zyrtec', 'Cétirizine', 'Alerid', 'Cetriz'],
    activeIngredients: { EN: 'Cetirizine Dihydrochloride', FR: 'Dichlorhydrate de cétirizine', AR: 'سيتريزين ثنائي الهيدروكلوريد' },
    category: 'Allergy',
    description: {
      EN: 'Second-generation non-drowsy antihistamine for allergic rhinitis and hives.',
      FR: 'Antihistaminique H1 de 2ème génération pour la rhinite allergique et l’urticaire.',
      AR: 'مضاد هيستامين من الجيل الثاني لعلاج الحساسية، سيلان الأنف، والشري (الحكة).'
    },
    generalUses: { EN: ['Seasonal allergic rhinitis (hay fever)', 'Perennial allergic rhinitis', 'Chronic urticaria (hives)'], FR: ['Rhinite allergique saisonnière (rhume des foins)', 'Rhinite perannuelle', 'Urticaire chronique'], AR: ['حساسية الأنف الموسمية (حمى القش)', 'الحساسية المزمنة', 'حكة الجلد والارتكاريا'] },
    forms: { EN: ['Film-coated Tablets 10mg', 'Oral Solution 1mg/ml'], FR: ['Comprimés pelliculés 10mg', 'Solution buvable 1mg/ml'], AR: ['أقراص 10 ملغ', 'محلول فموي للأطفال'] },
    precautions: { EN: ['Take once daily, preferably in evening', 'Avoid excessive alcohol'], FR: ['Une prise par jour de préférence le soir', 'Éviter l’alcool'], AR: ['جرعة واحدة يومياً مساءً', 'تجنب المشروبات الكحولية'] },
    sideEffects: { EN: ['Mild drowsiness in sensitive patients', 'Dry mouth'], FR: ['Légère somnolence possible', 'Sécheresse buccale'], AR: ['نعاس خفيف لدى البعض', 'جفاف الفم'] },
    warnings: { EN: ['Severe renal impairment (requires dose adjustment)'], FR: ['Insuffisance rénale sévère (adapter la dose)'], AR: ['الفشل الكلوي الحاد يستدعي تعديل الجرعة'] },
    interactions: { EN: ['CNS depressants', 'Alcohol'], FR: ['Sédatifs', 'Alcool'], AR: ['المهدئات'] },
    storage: { EN: 'Store below 30°C', FR: 'Conserver à < 30°C', AR: 'يحفظ دون 30 مئوية' },
    prescriptionStatus: 'OTC',
    sources: 'ANAM Maroc',
    lastReviewed: '2026-08',
    lastUpdated: '2026-08'
  },
  {
    id: 'med-9',
    genericName: { EN: 'Metformin', FR: 'Metformine', AR: 'ميتفورمين' },
    brandNames: ['Glucophage', 'Stagid', 'Metformine'],
    activeIngredients: { EN: 'Metformin Hydrochloride', FR: 'Chlorhydrate de metformine', AR: 'ميتفورمين هيدروكلوريد' },
    category: 'Diabetes',
    description: {
      EN: 'First-line biguanide oral antidiabetic medication for Type 2 Diabetes.',
      FR: 'Antidiabétique oral de la famille des biguanides, traitement de première intention du diabète de type 2.',
      AR: 'دواء خافض للسكر من عائلة البيجوانيد كخط أول لعلاج السكري من النوع الثاني.'
    },
    generalUses: { EN: ['Type 2 Diabetes blood sugar control', 'Prediabetes prevention', 'Polycystic Ovary Syndrome (PCOS) off-label'], FR: ['Contrôle de la glycémie dans le diabète de type 2', 'Prévention du pré-diabète', 'Syndrome des ovaires polykystiques'], AR: ['ضبط الجلوكوز في سكري النوع الثاني', 'الوقاية في مرحلة ما قبل السكري', 'تيسير التبويض في تكيس المبايض'] },
    forms: { EN: ['Tablets 500mg, 850mg, 1000mg', 'Extended Release (XR) Tablets'], FR: ['Comprimés 500mg, 850mg, 1000mg', 'Comprimés à libération prolongée (XR)'], AR: ['أقراص 500، 850، 1000 ملغ', 'أقراص ممتدة المفعول'] },
    precautions: { EN: ['Take during or after meals to minimize abdominal cramps and nausea', 'Stay hydrated'], FR: ['Prendre pendant ou à la fin des repas pour réduire les troubles digestifs', 'Bien s’hydrater'], AR: ['تناوله أثناء أو بعد الوجبة لتقليل اضطراب المعدة', 'كثرة شرب الماء'] },
    sideEffects: { EN: ['Diarrhea, nausea, gas', 'Metallic taste in mouth', 'Long term Vitamin B12 deficiency'], FR: ['Diarrhée, nausées, flatulences', 'Goût métallique', 'Carence en vitamine B12 à long terme'], AR: ['إسهال، غثيان، غازات', 'طعم معدني بالفم', 'نقص فيتامين ب12 على المدى الطويل'] },
    warnings: { EN: ['Severe renal failure (eGFR < 30 mL/min)', 'Acute lactic acidosis risk during severe hypoxia or contrast agent IV dye injection'], FR: ['Insuffisance rénale sévère', 'Risque d’acidose lactique en cas d’hypoxie ou d’injection de produit de contraste iodé'], AR: ['يمنع في الفشل الكلوي الشديد', 'خطر الحموضة اللبنية في حالات نقص الأكسجين أو صبغات الأشعة'] },
    interactions: { EN: ['Iodinated contrast media (stop 48h prior)', 'Alcohol'], FR: ['Produits de contraste iodés', 'Alcool'], AR: ['صبغات الأشعة الملونة', 'الكحوليات'] },
    storage: { EN: 'Store below 25°C', FR: 'Conserver à < 25°C', AR: 'يحفظ دون 25 مئوية' },
    prescriptionStatus: 'Prescription',
    sources: 'ANAM Maroc / ADA Guidelines',
    lastReviewed: '2026-08',
    lastUpdated: '2026-08'
  },
  {
    id: 'med-10',
    genericName: { EN: 'Amlodipine', FR: 'Amlodipine', AR: 'أملوديبين' },
    brandNames: ['Amlor', 'Amlodipine', 'Norvasc'],
    activeIngredients: { EN: 'Amlodipine Besylate', FR: 'Bésilate d’amlodipine', AR: 'أملوديبين بيسيلات' },
    category: 'Blood Pressure',
    description: {
      EN: 'Dihydropyridine calcium channel blocker for hypertension and angina.',
      FR: 'Inhibiteur calcique dihydropyridine pour l’hypertension artérielle et l’angine de poitrine.',
      AR: 'مغلق قنوات الكالسيوم لعلاج ارتفاع ضغط الدم والذبحة الصدرية.'
    },
    generalUses: { EN: ['Essential hypertension control', 'Chronic stable angina pectoris', 'Vasospastic angina'], FR: ['Hypertension artérielle essentielle', 'Angor chronique stable', 'Angor de Prinzmetal'], AR: ['ارتفاع ضغط الدم الأساسي', 'الذبحة الصدرية المستقرة', 'تقلص الشرايين التاجية'] },
    forms: { EN: ['Tablets 5mg, 10mg'], FR: ['Comprimés 5mg, 10mg'], AR: ['أقراص 5 ملغ، 10 ملغ'] },
    precautions: { EN: ['Take once daily with or without food at the same time every day', 'Avoid grapefruit juice'], FR: ['Une prise par jour avec ou sans nourriture', 'Éviter le jus de pamplemousse'], AR: ['جرعة واحدة يومياً بنفس الوقت', 'تجنب عصير الجريب فروت'] },
    sideEffects: { EN: ['Ankle and peripheral edema (swelling)', 'Flushing, dizziness, fatigue'], FR: ['Œdème des chevilles et des membres inférieurs', 'Bouffées de chaleur, vertiges'], AR: ['انتفاخ وتورم الكاحلين والقدمين', 'توهج الوجه، دوخة، تعب'] },
    warnings: { EN: ['Severe hypotension', 'Severe aortic stenosis'], FR: ['Hypotension sévère', 'Rétrécissement aortique sévère'], AR: ['انخفاض الضغط الشديد', 'ضيق الصمام الأورطي الحاد'] },
    interactions: { EN: ['Grapefruit juice (increases drug concentration)', 'Simvastatin (max 20mg dose)'], FR: ['Jus de pamplemousse', 'Simvastatine'], AR: ['عصير الجريب فروت', 'سيمفاستاتين'] },
    storage: { EN: 'Store below 30°C away from light', FR: 'Conserver à < 30°C à l’abri de la lumière', AR: 'يحفظ دون 30 مئوية بعيداً عن الضوء' },
    prescriptionStatus: 'Prescription',
    sources: 'ANAM Maroc / ESC Guidelines',
    lastReviewed: '2026-08',
    lastUpdated: '2026-08'
  }
];
