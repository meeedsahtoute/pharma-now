export interface HealthArticle {
  id: string;
  category: string;
  iconName: string;
  title: { EN: string; FR: string; AR: string };
  summary: { EN: string; FR: string; AR: string };
  whatIsIt: { EN: string; FR: string; AR: string };
  symptoms: { EN: string[]; FR: string[]; AR: string[] };
  causes: { EN: string[]; FR: string[]; AR: string[] };
  pharmacistRole: { EN: string; FR: string; AR: string };
  doctorRole: { EN: string; FR: string; AR: string };
  emergencySigns: { EN: string[]; FR: string[]; AR: string[] };
  prevention: { EN: string[]; FR: string[]; AR: string[] };
  treatmentInfo: { EN: string; FR: string; AR: string };
  source: string; // e.g. "Moroccan Ministry of Health / WHO"
  lastReviewed: string; // e.g. "2026-08"
  moroccoContextNote?: { EN: string; FR: string; AR: string };
}

export const HEALTH_ARTICLES: HealthArticle[] = [
  {
    id: 'diabetes',
    category: 'Chronic Conditions',
    iconName: 'Activity',
    title: {
      EN: 'Diabetes Mellitus',
      FR: 'Diabète de Type 1 et 2',
      AR: 'داء السكري (النوع 1 والنوع 2)'
    },
    summary: {
      EN: 'Understanding chronic blood glucose elevation, management, and blood sugar control.',
      FR: 'Comprendre le contrôle de la glycémie, le traitement et la prévention du diabète.',
      AR: 'فهم مرض السكري، إدارة مستوى السكر في الدم، والوقاية من المضاعفات.'
    },
    whatIsIt: {
      EN: 'Diabetes is a chronic metabolic condition characterized by elevated levels of blood glucose. It occurs when the pancreas does not produce enough insulin or when the body cannot effectively use the insulin it produces.',
      FR: 'Le diabète est une maladie chronique caractérisée par une glycémie élevée. Il survient lorsque le pancréas ne produit pas suffisamment d’insuline ou que le corps ne l’utilise pas efficacement.',
      AR: 'السكري مرض مزمن يتميز بارتفاع مستوى الجلوكوز في الدم. يحدث عندما لا ينتج البنكرياس قدرًا كافيًا من الأنسولين أو عندما لا يستجيب الجسم له بشكل فعال.'
    },
    symptoms: {
      EN: ['Excessive thirst and dry mouth', 'Frequent urination', 'Unexplained fatigue and weight loss', 'Blurred vision', 'Slow-healing cuts or sores'],
      FR: ['Soif excessive et bouche sèche', 'Mictions fréquentes', 'Fatigue inexpliquée et perte de poids', 'Vision floue', 'Cicatrisation lente des plaies'],
      AR: ['العطش الشديد وجفاف الفم', 'التبول المتكرر', 'التعب غير المبرر ونقص الوزن', 'رؤية غير واضحة', 'بطء التئام الجروح']
    },
    causes: {
      EN: ['Genetics & family history', 'Overweight & physical inactivity', 'Unhealthy diet high in refined sugars', 'High blood pressure & cholesterol'],
      FR: ['Antécédents familiaux', 'Surpoids et sédentarité', 'Alimentation riche en sucres raffinés', 'Hypertension et cholestérol'],
      AR: ['العوامل الوراثية والتاريخ العائلي', 'السمنة وقلة النشاط البدني', 'النظام الغذائي الغني بالسكريات', 'ارتفاع ضغط الدم والكوليسترول']
    },
    pharmacistRole: {
      EN: 'Pharmacists can guide blood glucose monitoring device selection, demonstrate glucose meter usage, provide advice on insulin storage, and check for drug interactions.',
      FR: 'Le pharmacien peut vous conseiller sur le choix et l’utilisation des lecteurs de glycémie, la conservation de l’insuline et vérifier les interactions médicamenteuses.',
      AR: 'يمكن للصيدلي مساعدتك في اختيار جهاز قياس السكر، وشرح كيفية استخدامه، وتوفير نصائح حول حفظ الأنسولين والتحقق من التداخلات الدوائية.'
    },
    doctorRole: {
      EN: 'Consult a physician or endocrinologist for definitive blood test diagnosis (HbA1c), personalized prescription therapy, and long-term organ health monitoring.',
      FR: 'Consultez un médecin ou endocrinologue pour un diagnostic biologique (HbA1c), la prescription adaptée et le suivi régulier.',
      AR: 'استشر الطبيب أو أخصائي الغدد الصماء لتشخيص مخبري دقيق (HbA1c) وتحديد العلاج الدوائي والمتابعة الدورية.'
    },
    emergencySigns: {
      EN: ['Severe confusion or dizziness', 'Rapid, deep breathing or fruity breath odor', 'Loss of consciousness (Diabetic Coma)', 'Persistent vomiting unable to keep fluids down'],
      FR: ['Confusion sévère ou vertiges', 'Respiration rapide avec odeur d’acétonémie', 'Perte de connaissance', 'Vomissements incoercibles'],
      AR: ['تشوش ذهني شديد أو دوار', 'تنفس سريع وغير عادي مع رائحة الفواكه بالنمط', 'فقدان الوعي (غيبوبة السكري)', 'قيء متواصل وعدم القدرة على الاحتفاظ بالسائل']
    },
    prevention: {
      EN: ['Maintain a balanced Mediterranean-style diet', 'Engage in at least 150 minutes of physical exercise weekly', 'Monitor body weight regularly', 'Screen blood sugar annually if over 35'],
      FR: ['Adopter une alimentation équilibrée', 'Pratiquer au moins 150 minutes d’exercice par semaine', 'Surveiller son poids', 'Dépistage annuel à partir de 35 ans'],
      AR: ['اتباَع نظام غذائي متوازن', 'ممارسة الرياضة 150 دقيقة أسبوعياً على الأقل', 'مراقبة الوزن بانتظام', 'فحص السكر سنوياً لمن هم فوق 35 سنة']
    },
    treatmentInfo: {
      EN: 'Treatment combines lifestyle modifications (diet, exercise) with prescribed oral antidiabetic medications (e.g., Metformin) or insulin therapy.',
      FR: 'Le traitement associe hygiène de vie et antidiabétiques oraux ou insulinothérapie sur ordonnance.',
      AR: 'يعتمد العلاج على توازن نمط الحياة وتناول الأدوية الخافضة للسكر أو الأنسولين بناءً على وصفة طبية.'
    },
    source: 'Ministère de la Santé du Maroc / WHO',
    lastReviewed: '2026-08',
    moroccoContextNote: {
      EN: 'According to national health survey data reported by the Moroccan Ministry of Health (2017–2018), diabetes prevalence among Moroccan adults aged 18+ was estimated at 10.6%. Regular screening is recommended.',
      FR: 'Selon les données de l’enquête nationale du Ministère de la Santé du Maroc (2017–2018), la prévalence du diabète chez les adultes était estimée à 10,6 %. Un dépistage régulier est conseillé.',
      AR: 'وفقًا لبيانات المسح الوطني الصادرة عن وزارة الصحة المغربية (2017-2018)، بلغت نسبة انتشار السكري بين البالغين في المغرب 10.6٪. يُوصى بالفحص الدوري.'
    }
  },
  {
    id: 'hypertension',
    category: 'Cardiovascular',
    iconName: 'Heart',
    title: {
      EN: 'High Blood Pressure (Hypertension)',
      FR: 'Hypertension Artérielle (HTA)',
      AR: 'ارتفاع ضغط الدم'
    },
    summary: {
      EN: 'Silent cardiovascular risk factor: symptoms, arterial health, and blood pressure monitoring.',
      FR: 'Comprendre l’hypertension artérielle, les risques cardiovasculaires et la prise de tension.',
      AR: 'المخاطر الصامتة لارتفاع ضغط الدم، قياس الضغط، والوقاية من السكتات والجلطات.'
    },
    whatIsIt: {
      EN: 'Hypertension occurs when the pressure inside your blood vessels is persistently too high (140/90 mmHg or higher). It often presents with no obvious symptoms, earning it the title "the silent killer".',
      FR: 'L’hypertension est une pression artérielle anormalement élevée dans les artères (≥ 140/90 mmHg). Souvent asymptomatique, elle nécessite un suivi régulier.',
      AR: 'ارتفاع ضغط الدم هو زادة ضغط الدم داخل الأوعية الدموية بشكل مستمر (140/90 ملم زئبق أو أكثر). يُلقب بالقاتل الصامت لعدم وجود أعراض واضحة غالبًا.'
    },
    symptoms: {
      EN: ['Morning occipital headaches', 'Dizziness or lightheadedness', 'Ringing in ears (tinnitus)', 'Nosebleeds', 'Shortness of breath on exertion'],
      FR: ['Maux de tête matinaux', 'Vertiges et étourdissements', 'Bourdonnements d’oreilles', 'Saignements de nez', 'Essoufflement à l’effort'],
      AR: ['صداع صباحي خلف الرأس', 'دوار ودوخة', 'طنين في الأذنين', 'نزيف أنفي متكرر', 'ضيق في التنفس عند المجهود']
    },
    causes: {
      EN: ['High dietary sodium (salt) intake', 'Lack of physical activity', 'Chronic stress and smoking', 'Overweight & genetic predisposition'],
      FR: ['Consommation excessive de sel', 'Sédentarité et tabagisme', 'Stress chronique', 'Surpoids et facteurs génétiques'],
      AR: ['الاستهلاك المفرط للملح', 'قلة الحركة والتدخين', 'التوتر المستمر', 'زيادة الوزن والعوامل الوراثية']
    },
    pharmacistRole: {
      EN: 'Many Moroccan pharmacies offer blood pressure measurement, advice on home blood pressure monitors, and medication compliance tips.',
      FR: 'De nombreuses pharmacies au Maroc proposent la prise de tension, des conseils sur les tensiomètres électroniques et le suivi de la prise de traitement.',
      AR: 'تقدم العديد من الصيدليات المغربية خدمة قياس ضغط الدم، وتوجيهات اختيار أجهزة القياس المنزلية، والالتزام بمواعيد الدواء.'
    },
    doctorRole: {
      EN: 'A physician evaluates cardiovascular risk, prescribes antihypertensive treatment (e.g. ACE inhibitors, calcium channel blockers), and schedules ECGs or kidney function tests.',
      FR: 'Le médecin évalue le risque global, prescrit le traitement antihypertenseur et effectue le suivi cardiaque et rénal.',
      AR: 'يقوم الطبيب بتقييم المخاطر، ووصف الأدوية المناسبة لضغط الدم، وإجراء الفحوصات الدورية للقلب والكلى.'
    },
    emergencySigns: {
      EN: ['Sudden severe chest pain radiating to arm or jaw', 'Sudden numbness or paralysis of face or limbs (Stroke sign)', 'Severe shortness of breath', 'Blood pressure over 180/120 mmHg with severe headache'],
      FR: ['Douleur thoracique soudaine irradiant le bras', 'Engourdissement ou paralysie du visage/membre (AVC)', 'Essoufflement aigu', 'Tension artérielle supérieure à 18/12 avec céphalées vives'],
      AR: ['ألم حاد مفاجئ في الصدر يمتد للذراع أو الفك', 'شلل أو تخدر مفاجئ في الوجه أو الأطراف (علامة سكتة)', 'صعوبة شديدة في التنفس', 'ارتفاع الضغط فوق 180/120 ملم زئبق مع صداع حاد']
    },
    prevention: {
      EN: ['Reduce daily salt consumption to under 5g', 'Maintain active routine and regular exercise', 'Quit smoking and avoid secondhand smoke', 'Manage daily stress levels'],
      FR: ['Réduire la consommation de sel (< 5g/jour)', 'Pratiquer une activité physique régulière', 'Arrêter le tabac', 'Gérer le stress au quotidien'],
      AR: ['تقليل تناول الملح لأقل من 5 غرام يومياً', 'ممارسة النشاط البدني المنتظم', 'الإقلاع التام عن التدخين', 'الابتعاد عن التوتر المفرط']
    },
    treatmentInfo: {
      EN: 'Requires lifelong blood pressure control through low-sodium nutrition and prescribed daily medication.',
      FR: 'Nécessite un contrôle continu associant régime hyposodé et traitement quotidien sur ordonnance.',
      AR: 'يتطلب مراقبة مستمرة مع الالتزام بالنظام الخالي من الملح والدواء اليومي الموصوف.'
    },
    source: 'Ministère de la Santé du Maroc / WHO',
    lastReviewed: '2026-08',
    moroccoContextNote: {
      EN: 'National Ministry of Health survey data (2017–2018) reported hypertension prevalence among Moroccan adults at 29.3%. Regular blood pressure monitoring is strongly recommended.',
      FR: 'L’enquête nationale du Ministère de la Santé (2017–2018) a révélé une prévalence de l’hypertension de 29,3 % chez les adultes au Maroc. La prise de tension régulière est vivement recommandée.',
      AR: 'أظهر المسح الوطني لوزارة الصحة المغربية (2017-2018) أن نسبة انتشار ارتفاع ضغط الدم بين البالغين بلغت 29.3٪. يُنصح بقياس الضغط بشكل دوري.'
    }
  },
  {
    id: 'cold_flu',
    category: 'Respiratory',
    iconName: 'Thermometer',
    title: {
      EN: 'Common Cold & Seasonal Flu',
      FR: 'Rhume & Grippe Saisonnière',
      AR: 'الزكام والأنفلونزا الموسمية'
    },
    summary: {
      EN: 'Relieving viral upper respiratory symptoms, fever control, and hydration.',
      FR: 'Soulager les symptômes viraux, fièvre, courbatures et encombrement nasal.',
      AR: 'علاج أعراض الزكام والأنفلونزا، السيطرة على الحمى، والحفاظ على التروية.'
    },
    whatIsIt: {
      EN: 'Contagious viral infections of the upper respiratory tract. Flu is typically caused by influenza viruses and is more severe than the common cold.',
      FR: 'Infections virales contagieuses des voies respiratoires supérieures. La grippe (virus Influenza) est plus intense que le simple rhume.',
      AR: 'عدوى فيروسية تصيب الجهاز التنفسي العلوي. تكون الأنفلونزا أكثر شدة مقارنة بنزلة البرد العادية.'
    },
    symptoms: {
      EN: ['Nasal congestion & runny nose', 'Sore throat & sneezing', 'Fever & muscle aches (especially with flu)', 'Dry or productive cough', 'Headache & fatigue'],
      FR: ['Nez bouché et écoulement nasal', 'Maux de gorge et éternuements', 'Fièvre et courbatures (grippe)', 'Toux sèche ou grasse', 'Fatigue et céphalées'],
      AR: ['انسداد وسيلان الأنف', 'ألم الحلق والعطاس', 'الحمى وآلام العضلات (الأنفلونزا)', 'سعال جاف أو مصحوب ببلغم', 'التعب والصداع']
    },
    causes: {
      EN: ['Airborne viral transmission (Rhinoviruses, Influenza)', 'Close contact with infected individuals', 'Seasonal temperature variations'],
      FR: ['Transmission virale par gouttelettes', 'Contact étroit avec une personne infectée', 'Changements de saison'],
      AR: ['انتقال الفيروسات عبر الهواء والذاذ', 'الملامسة المباشرة للمصابين', 'التغيرات الموسمية في الطقس']
    },
    pharmacistRole: {
      EN: 'Pharmacists can suggest non-prescription symptom relievers (paracetamol for pain/fever, saline nasal sprays, throat lozenges) and evaluate if antibiotics are inappropriately requested (antibiotics do NOT treat viruses).',
      FR: 'Le pharmacien vous conseille des antalgiques (paracétamol), sprays nasaux eau de mer, pastilles pour la gorge et rappelle que les antibiotiques ne traitent pas les virus.',
      AR: 'يقدم الصيدلي مسكنات الألم ومخففات الحرارة (البندول/باراسيتامول)، وبخاخات المياه البحرية للأنف، وأقراص امتصاص الحلق، ويذكر بأن المضادات الحيوية لا تعالج الفيروسات.'
    },
    doctorRole: {
      EN: 'Consult a physician if fever lasts longer than 3 days, breathing becomes difficult, or symptoms worsen significantly.',
      FR: 'Consultez si la fièvre persiste plus de 3 jours, en cas de gêne respiratoire ou d’aggravation.',
      AR: 'استشر الطبيب إذا استمرت الحمى أكثر من 3 أيام، أو عند صعوبة التنفس، أو تفاقم الأعراض.'
    },
    emergencySigns: {
      EN: ['Shortness of breath or rapid labored breathing', 'Persistent chest pressure or pain', 'High unyielding fever in infants under 3 months', 'Confusion or inability to wake up'],
      FR: ['Difficulté respiratoire ou essoufflement marqué', 'Douleur thoracique persistante', 'Fièvre élevée chez le nourrisson de moins de 3 mois', 'Confusion ou léthargie'],
      AR: ['صعوبة بالغة في التنفس أو سرعة التنفس', 'ألم أو ضغط مستمر في الصدر', 'ارتفاع حرارة شديد لدى الرضع أقل من 3 أشهر', 'تشوش ذهني أو صعوبة الاستيقاظ']
    },
    prevention: {
      EN: ['Wash hands frequently with soap and water', 'Receive annual seasonal flu vaccination', 'Cover mouth when coughing or sneezing', 'Maintain good indoor ventilation'],
      FR: ['Se laver fréquemment les mains', 'Se faire vacciner contre la grippe saisonnière', 'Couvrir sa bouche en toussant', 'Aérer les pièces'],
      AR: ['غسل اليدين جيداً بالماء والصابون', 'التطعيم السنوي ضد الأنفلونزا الموسمية', 'تغطية الفم عند السعال أو العطس', 'تهوية الغرف والمنازل']
    },
    treatmentInfo: {
      EN: 'Symptomatic support with bed rest, abundant fluids, paracetamol for fever/pain, and saline hydration.',
      FR: 'Traitement symptomatique : repos, hydratation abondante, paracétamol et hygiène nasale.',
      AR: 'علاج الأعرض: الراحة، كثرة السوائل، الباراسيتامول لتخفيف الحرارة والألم.'
    },
    source: 'Ministère de la Santé du Maroc / WHO',
    lastReviewed: '2026-08'
  },
  {
    id: 'asthma',
    category: 'Respiratory',
    iconName: 'Wind',
    title: {
      EN: 'Asthma & Airway Reactivity',
      FR: 'Asthme & Réactivité Bronchique',
      AR: 'الربو وحساسية الصدر'
    },
    summary: {
      EN: 'Chronic airway inflammation, triggers, bronchodilators, and emergency warning signs.',
      FR: 'Inflammation chronique des bronches, déclencheurs, inhalateurs et conduite en crise.',
      AR: 'التهاب الشعب الهوائية المزمن، محفزات النوبات، البخاخات، والإسعافات الأولية.'
    },
    whatIsIt: {
      EN: 'Asthma is a chronic inflammatory condition of the airways that causes periodic chest tightness, wheezing, breathlessness, and coughing.',
      FR: 'L’asthme est une maladie inflammatoire chronique des voies respiratoires provoquant une gêne respiratoire, des sifflements et de la toux.',
      AR: 'الربو مرض التهابي مزمن يصيب الشعب الهوائية، ويسبب ضيق الصدر، الصفير عند التنفس، وضيق التنفس والسعال.'
    },
    symptoms: {
      EN: ['Wheezing sound during exhalation', 'Shortness of breath or gasping for air', 'Chest tightness or discomfort', 'Coughing fits, especially at night or early morning'],
      FR: ['Sifflement à la respiration', 'Essoufflement ou manque d’air', 'Sensation de oppression thoracique', 'Toux quinteuse nocturne ou au réveil'],
      AR: ['صفير أو أزيز عند الزفير', 'ضيق في التنفس وخناق', 'شعور بضغط في الصدر', 'نوبات سعال خاصة في الليل أو الصباح الباكر']
    },
    causes: {
      EN: ['Allergens (dust mites, pollen, pet dander)', 'Cold air and weather changes', 'Physical exertion or exercise', 'Air pollution and tobacco smoke'],
      FR: ['Allergènes (acariens, pollens, poils d’animaux)', 'Air froid et changements de climat', 'Effort physique', 'Pollution et fumée de tabac'],
      AR: ['مثيرات الحساسية (الغبار، اللقاح، شعر الحيوانات)', 'الهواء البارد وتغيرات الطقس', 'المجهود البدني الشديد', 'التلوث ودخان التدخين']
    },
    pharmacistRole: {
      EN: 'Pharmacists can demonstrate proper spacer and inhaler technique, check prescription refills for rescue inhalers (Salbutamol/Ventolin), and advise avoiding known environmental triggers.',
      FR: 'Le pharmacien vérifie la bonne utilisation des inhalateurs et chambres d’inhalation, le renouvellement des bronchodilatateurs et conseille l’éviction des allergènes.',
      AR: 'يوضح الصيدلي الطريقة الصحيحة لاستخدام بخاخات الربو وغرف الاستنشاق، ومتابعة توفر بخاخ الإسعاف، وتجنب مثيرات النوبات.'
    },
    doctorRole: {
      EN: 'A pulmonologist or physician performs spirometry lung function tests, prescribes daily controller medications (inhaled corticosteroids), and establishes a written Asthma Action Plan.',
      FR: 'Le pneumologue ou médecin réalise une spirométrie, ajuste le traitement de fond (corticoïdes inhalés) et rédige un plan d’action personnalisé.',
      AR: 'يطلب طبيب الأمراض الصدرية فحص وظائف الرئة (قياس التنفس)، ويحدد العلاج الوقائي المستمر، ويضع خطة عمل في حالة النوبات.'
    },
    emergencySigns: {
      EN: ['Severe breathlessness unable to speak full sentences', 'Chest or ribs pulling inward during breath (retractions)', 'Blue lips or fingernails (Cyanosis)', 'No relief 10 minutes after using rescue inhaler'],
      FR: ['Difficulté respiratoire extrême empêchant de parler', 'Tirage intercostal (creusement du thorax)', 'Lèvres ou ongles bleutés (cyanose)', 'Aucun soulagement après inhalateur de secours'],
      AR: ['ضيق تنفس شديد يمنع التحدث بجمل كاملة', 'انكماش الصدر والأضلاع أثناء التنفس', 'زرقة الشفتين أو الأظافر', 'عدم التحسن بعد 10 دقائق من استخدام بخاخ الإسعاف']
    },
    prevention: {
      EN: ['Avoid exposure to tobacco smoke and dust', 'Use mattress covers to reduce dust mites', 'Take prescribed daily controller inhaler consistently'],
      FR: ['Éviter le tabagisme passif et la poussière', 'Utiliser des housses anti-acariens', 'Prendre son traitement de fond tous les jours'],
      AR: ['تجنب التدخين والغبار', 'استخدام أغطية واقية من العث', 'الالتزام التام بالبخاخ الوقائي اليومي']
    },
    treatmentInfo: {
      EN: 'Divided into fast-acting rescue bronchodilators for acute attacks and daily anti-inflammatory controllers.',
      FR: 'Distinction entre bronchodilatateurs de secours pour la crise et traitement anti-inflammatoire de fond.',
      AR: 'ينقسم العلاج إلى بخاخ إسعافي سريع للسيطرة على النوبة، وبخاخ وقائي يومي مضاد للالتهاب.'
    },
    source: 'Ministère de la Santé du Maroc / Global Initiative for Asthma (GINA)',
    lastReviewed: '2026-08'
  },
  {
    id: 'first_aid',
    category: 'Emergency & Injury',
    iconName: 'Bandage',
    title: {
      EN: 'Minor Wounds & First Aid Care',
      FR: 'Plaies Mineures & Premiers Secours',
      AR: 'الجروح البسيطة والإسعافات الأولية'
    },
    summary: {
      EN: 'Wound cleaning, disinfection, dressing, tetanus precautions, and infection signs.',
      FR: 'Nettoyage des plaies, désinfection, pansements, prévention du tétanos et signes d’infection.',
      AR: 'تنظيف الجروح، التطهير، الضمادات، التلقيح ضد الكزاز (التيتانوس) وعلامات التلوث.'
    },
    whatIsIt: {
      EN: 'Minor cuts, scrapes, and superficial abrasions disrupting skin integrity. Prompt first aid reduces infection risk and promotes clean healing.',
      FR: 'Coupures, écorchures et abrasions superficielles. Des soins immédiats réduisent le risque d’infection et favorisent la cicatrisation.',
      AR: 'الجروح والجروح السطحية والخداشات التي تصيب الجلد. تساعد الإسعافات الأولية السريعة في الوقاية من التعفن والتئام الجلد.'
    },
    symptoms: {
      EN: ['Localized bleeding', 'Mild pain or sting at cut site', 'Redness around edges'],
      FR: ['Saignement localisé', 'Douleur ou picotement', 'Rougeur sur les bords de la plaie'],
      AR: ['نزيف موضع بسيط', 'ألم أو وخز في مكان الجرح', 'احمرار حول حواف الجرح']
    },
    causes: {
      EN: ['Accidental kitchen cuts', 'Fall abrasions on pavement', 'Minor household tool injuries'],
      FR: ['Coupures de cuisine', 'Chutes et écorchures', 'Petits accidents domestiques'],
      AR: ['جروح المطبخ الحادة', 'الخداشات الناتجة عن السقوط', 'إصابات الأدوات المنزلية البسيطة']
    },
    pharmacistRole: {
      EN: 'Pharmacists supply sterile gauze, antiseptics (povidone-iodine, chlorhexidine), adhesive bandages, and confirm your tetanus vaccination status.',
      FR: 'Le pharmacien vous fournit compresses stériles, antiseptiques, pansements adhésifs et vérifie votre rappel de vaccin contre le tétanos.',
      AR: 'يوفر الصيدلي الضمادات المعقمة، والمطهرات الطبية، والشريط اللاصق للجروح، ويوصي بالتأكد من لقاح الكزاز (التيتانوس).'
    },
    doctorRole: {
      EN: 'A doctor is needed for deep cuts requiring sutures (stitches), wounds with embedded foreign material, or dirty rusty metal injuries.',
      FR: 'Consultez un médecin pour les plaies profondes nécessitant des points de suture, les plaies souillées ou causées par du métal rouillé.',
      AR: 'يجب زيارة الطبيب للجروح العميقة التي تتطلب خياطة، أو الجروح الملوثة بأجسام غريبة أو المعدن الصدئ.'
    },
    emergencySigns: {
      EN: ['Uncontrolled spurting blood despite continuous 10-minute pressure', 'Red streaks spreading outward from wound', 'Pus drainage, swelling, and increasing fever', 'Numbness beyond the injury site'],
      FR: ['Saignement abondant ne s’arrêtant pas après 10 min de compression', 'Lignes rouges s’étendant autour de la plaie', 'Écoulement de pus, gonflement et fièvre', 'Engourdissement sous la plaie'],
      AR: ['نزيف شديد لا يتوقف رغم الضغط المستمر لمدة 10 دقائق', 'احمرار خطي ينتشر من مكان الجرح', 'خروج قيح مع تورم وارتفاع الحرارة', 'فقدان الإحساس أو التخدر تحت الإصابة']
    },
    prevention: {
      EN: ['Keep domestic knives sharp and handle with care', 'Wear protective footwear outdoors', 'Keep a verified first aid kit accessible at home and vehicle'],
      FR: ['Manipuler les ustensiles coupants avec précaution', 'Porter des chaussures fermées à l’extérieur', 'Avoir une trousse de secours à domicile'],
      AR: ['الحذر عند استخدام الأدوات الحادة', 'ارتداء أحذية واقية خارج المنزل', 'احتفاظ بحقيبة إسعافات أولية في المنزل السيارة']
    },
    treatmentInfo: {
      EN: 'Clean thoroughly with running water and gentle soap, apply antiseptic solution, cover with sterile dressing, and change daily.',
      FR: 'Laver abondamment à l’eau claire et au savon, appliquer un antiseptique, couvrir d’un pansement stérile.',
      AR: 'غسل الجرح جيداً بالماء الجاري والصابون، تطهيره بالمطهر، وتغطيته بضمادة معقمة مع تغييرها يومياً.'
    },
    source: 'Ministère de la Santé du Maroc / Croissant-Rouge Marocain',
    lastReviewed: '2026-08'
  }
];
