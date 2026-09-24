import { MEDICATIONS_DATABASE, type MedicationEntry } from '../data/medicationDatabase.ts';
import { getEmergencyContactsForCountry } from '../services/emergencyService.ts';

declare const process: {
  env: Record<string, string | undefined>;
};

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ServerAiPayload {
  messages: ChatMessage[];
  userLocationCity?: string;
  countryCode?: string;
}

export type TriageCategory = 'LOW CONCERN' | 'NEEDS PHARMACIST' | 'NEEDS DOCTOR' | 'URGENT MEDICAL ATTENTION';

export interface StructuredAiResponse {
  summary: string;
  triageCategory: TriageCategory;
  possible_general_causes: string[];
  self_care: string[];
  medication_ids: string[];
  relevantMedications: MedicationEntry[];
  warning_signs: string[];
  seek_professional_help: {
    consult_doctor: string[];
    consult_pharmacist: string[];
  };
  emergency_level: 'NONE' | 'MODERATE' | 'URGENT';
  follow_up_questions: string[];
  quick_options: string[];
  sources: string[];
  emergencyContacts?: ReturnType<typeof getEmergencyContactsForCountry>;
  userLanguage: 'AR' | 'FR' | 'EN';
}

const RED_FLAG_KEYWORDS = [
  'chest pain', 'douleur thoracique', 'ألم في الصدر', 'صدر',
  'cannot breathe', 'can\'t breathe', 'difficulty breathing', 'gêne respiratoire', 'صعوبة في التنفس', 'خناق', 'نفَس', 'عسر التنفس',
  'numbness', 'paralysis', 'engourdissement', 'تخدر', 'شلل', 'سكتة',
  'sudden severe headache', 'maux de tête foudroyant', 'صداع حاد مفاجئ',
  'unconscious', 'fainted', 'perte de connaissance', 'إغماء', 'غيبوبة',
  'heavy bleeding', 'saignement abondant', 'نزيف شديد',
  'allergic shock', 'anaphylaxis', 'choc anaphylactique', 'صدمة حساسية',
  'severe burn', 'brûlure grave', 'حرق خطير',
  'seizure', 'convulsion', 'تشنجات', 'صرع'
];

function detectLanguage(text: string): 'AR' | 'FR' | 'EN' {
  const q = text.toLowerCase();
  if (/[\u0600-\u06FF]/.test(text) || q.includes('راسي') || q.includes('وجع') || q.includes('شنو') || q.includes('سخانة') || q.includes('ضرني') || q.includes('عندي') || q.includes('بطني')) {
    return 'AR';
  }
  if (q.includes('mal') || q.includes('tête') || q.includes('fièvre') || q.includes('toux') || q.includes('j\'ai') || q.includes('pharmacie') || q.includes('depuis')) {
    return 'FR';
  }
  return 'EN';
}

/**
 * Handle incoming PHARMA AI request server-side
 */
export async function processHealthAiRequest(payload: ServerAiPayload): Promise<StructuredAiResponse> {
  const messages = payload.messages || [];
  const latestMessage = messages.length > 0 ? messages[messages.length - 1].content : '';
  const countryCode = payload.countryCode || 'MA';
  const lang = detectLanguage(latestMessage);

  // Check for Emergency Red Flags in any user message
  const hasEmergency = messages.some(m => 
    m.role === 'user' && RED_FLAG_KEYWORDS.some(kw => m.content.toLowerCase().includes(kw))
  );

  if (hasEmergency) {
    const contacts = getEmergencyContactsForCountry(countryCode);
    return {
      summary: lang === 'AR' 
        ? 'تم اكتشاف عوارض طوارئ تستدعي تقييم طبي فوري ومستعجل'
        : lang === 'FR'
        ? 'Symptômes d’urgence médicale détectés nécessitant une prise en charge immédiate.'
        : 'Emergency warning signs detected requiring immediate emergency medical evaluation.',
      triageCategory: 'URGENT MEDICAL ATTENTION',
      possible_general_causes: [
        lang === 'AR' ? 'حالة طوارئ حادة قد تهدد الحياة' : lang === 'FR' ? 'Urgence médicale aiguë' : 'Acute medical emergency'
      ],
      self_care: [
        lang === 'AR' ? 'الهدوء التام والاتصال برقم الإسعاف فوراً' : lang === 'FR' ? 'Restez calme et appelez les secours immédiatement' : 'Stay calm and call emergency services immediately'
      ],
      medication_ids: [],
      relevantMedications: [],
      warning_signs: [
        lang === 'AR' ? 'صعوبة التنفس، ألم الصدر، الإغماء، أو التخدر المفاجئ' : lang === 'FR' ? 'Troubles respiratoires, douleur thoracique, perte de connaissance' : 'Severe breathing difficulty, chest pain, or sudden weakness/numbness'
      ],
      seek_professional_help: {
        consult_doctor: [lang === 'AR' ? 'الذهاب فوراً لقسم المستعجلات' : lang === 'FR' ? 'Rendez-vous immédiatement aux urgences' : 'Go directly to nearest emergency room'],
        consult_pharmacist: []
      },
      emergency_level: 'URGENT',
      follow_up_questions: [],
      quick_options: [],
      sources: ['Moroccan Emergency Protocols (SAMU 15 / Protection Civile 150)', 'WHO Clinical Guidelines'],
      emergencyContacts: contacts,
      userLanguage: lang
    };
  }

  // Check for environment API keys
  const geminiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;
  const groqKey = process.env.GROQ_API_KEY;
  const openRouterKey = process.env.OPENROUTER_API_KEY;

  if (geminiKey) {
    try {
      const llmResult = await callGeminiApi(geminiKey, messages);
      if (llmResult) return hydrateMedications(llmResult, lang);
    } catch (e) {
      console.warn('Gemini API call failed, falling back to smart engine:', e);
    }
  }

  if (openAiKey) {
    try {
      const llmResult = await callOpenAiApi(openAiKey, messages);
      if (llmResult) return hydrateMedications(llmResult, lang);
    } catch (e) {
      console.warn('OpenAI API call failed, falling back to smart engine:', e);
    }
  }

  if (groqKey) {
    try {
      const llmResult = await callGroqApi(groqKey, messages);
      if (llmResult) return hydrateMedications(llmResult, lang);
    } catch (e) {
      console.warn('Groq API call failed, falling back to smart engine:', e);
    }
  }

  if (openRouterKey) {
    try {
      const llmResult = await callOpenRouterApi(openRouterKey, messages);
      if (llmResult) return hydrateMedications(llmResult, lang);
    } catch (e) {
      console.warn('OpenRouter API call failed, falling back to smart engine:', e);
    }
  }

  // Smart Contextual Decision Engine Fallback
  return generateSmartEngineResponse(messages, lang);
}

function hydrateMedications(rawResponse: Partial<StructuredAiResponse> & { triage_category?: string }, lang: 'AR' | 'FR' | 'EN'): StructuredAiResponse {
  const medIds = rawResponse.medication_ids || [];
  const relevantMedications: MedicationEntry[] = [];

  medIds.forEach((id: string) => {
    const found = MEDICATIONS_DATABASE.find((m: MedicationEntry) => m.id === id.toLowerCase() || m.brandNames.some(b => b.toLowerCase() === id.toLowerCase()));
    if (found) relevantMedications.push(found);
  });

  let category: TriageCategory = 'LOW CONCERN';
  const rawCat = (rawResponse.triageCategory || rawResponse.triage_category || '').toUpperCase();
  if (rawCat.includes('URGENT')) category = 'URGENT MEDICAL ATTENTION';
  else if (rawCat.includes('DOCTOR')) category = 'NEEDS DOCTOR';
  else if (rawCat.includes('PHARMACIST')) category = 'NEEDS PHARMACIST';

  return {
    summary: rawResponse.summary || 'Symptom overview and guidance.',
    triageCategory: category,
    possible_general_causes: rawResponse.possible_general_causes || [],
    self_care: rawResponse.self_care || [],
    medication_ids: medIds,
    relevantMedications,
    warning_signs: rawResponse.warning_signs || [],
    seek_professional_help: rawResponse.seek_professional_help || { consult_doctor: [], consult_pharmacist: [] },
    emergency_level: rawResponse.emergency_level || 'NONE',
    follow_up_questions: rawResponse.follow_up_questions || [],
    quick_options: rawResponse.quick_options || [],
    sources: rawResponse.sources || ['Ministère de la Santé du Maroc (ANAM)', 'World Health Organization (WHO)'],
    userLanguage: lang
  };
}

async function callGeminiApi(apiKey: string, messages: ChatMessage[]): Promise<Partial<StructuredAiResponse> | null> {
  const systemPrompt = getSystemPrompt();
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents,
      generationConfig: {
        responseMimeType: 'application/json'
      }
    })
  });

  if (!response.ok) return null;
  const data: any = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) return null;
  return JSON.parse(text);
}

async function callOpenAiApi(apiKey: string, messages: ChatMessage[]): Promise<Partial<StructuredAiResponse> | null> {
  const systemPrompt = getSystemPrompt();
  const formattedMsgs = [
    { role: 'system', content: systemPrompt },
    ...messages.map(m => ({ role: m.role, content: m.content }))
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: formattedMsgs,
      response_format: { type: 'json_object' }
    })
  });

  if (!response.ok) return null;
  const data: any = await response.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) return null;
  return JSON.parse(text);
}

async function callGroqApi(apiKey: string, messages: ChatMessage[]): Promise<Partial<StructuredAiResponse> | null> {
  const systemPrompt = getSystemPrompt();
  const formattedMsgs = [
    { role: 'system', content: systemPrompt },
    ...messages.map(m => ({ role: m.role, content: m.content }))
  ];

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: formattedMsgs,
      response_format: { type: 'json_object' }
    })
  });

  if (!response.ok) return null;
  const data: any = await response.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) return null;
  return JSON.parse(text);
}

async function callOpenRouterApi(apiKey: string, messages: ChatMessage[]): Promise<Partial<StructuredAiResponse> | null> {
  const systemPrompt = getSystemPrompt();
  const formattedMsgs = [
    { role: 'system', content: systemPrompt },
    ...messages.map(m => ({ role: m.role, content: m.content }))
  ];

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash',
      messages: formattedMsgs,
      response_format: { type: 'json_object' }
    })
  });

  if (!response.ok) return null;
  const data: any = await response.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) return null;
  return JSON.parse(text);
}

function getSystemPrompt(): string {
  const medSummary = MEDICATIONS_DATABASE.map(m => `${m.id} (${m.brandNames.join('/')}): DCI ${m.activeIngredients.FR}`).join(', ');

  return `You are PHARMA AI, an evidence-based clinical safety and health guidance assistant for PHARMA NOW in Morocco.

CRITICAL CLINICAL SAFETY RULES:
1. You are NOT a diagnosis engine and NOT a prescription system.
2. NEVER say "You have X disease" or "Take X medicine". Provide general educational health context.
3. If symptom information is missing key details (onset, duration, severity, fever, red flags), ask 2-3 symptom-specific follow-up questions first! Provide 3-5 quick_options for the user to answer easily.
4. Classify triage_category as one of: "LOW CONCERN", "NEEDS PHARMACIST", "NEEDS DOCTOR", "URGENT MEDICAL ATTENTION".
5. Reference medication IDs from our verified database: [${medSummary}]. ONLY return medication_ids from this exact list.
6. Return valid JSON matching this schema:
{
  "summary": "Educational summary of symptoms described",
  "triageCategory": "LOW CONCERN" | "NEEDS PHARMACIST" | "NEEDS DOCTOR" | "URGENT MEDICAL ATTENTION",
  "possible_general_causes": ["Cause 1", "Cause 2"],
  "self_care": ["Self care tip 1"],
  "medication_ids": ["paracetamol", "ibuprofen"],
  "warning_signs": ["Red flag warning 1"],
  "seek_professional_help": {
    "consult_doctor": ["When to see doctor"],
    "consult_pharmacist": ["When to see pharmacist"]
  },
  "emergency_level": "NONE" | "MODERATE" | "URGENT",
  "follow_up_questions": ["Follow-up Q1"],
  "quick_options": ["1-3 Mild", "4-6 Moderate", "7-10 Severe"],
  "sources": ["WHO Guidelines", "Ministère de la Santé du Maroc"]
}`;
}

function generateSmartEngineResponse(messages: ChatMessage[], lang: 'AR' | 'FR' | 'EN'): StructuredAiResponse {
  const fullText = messages.map(m => m.content).join(' ').toLowerCase();
  const turnCount = messages.filter(m => m.role === 'user').length;

  let medIds: string[] = [];
  let causes: string[] = [];
  let selfCare: string[] = [];
  let questions: string[] = [];
  let quickOptions: string[] = [];
  let doctorHelp: string[] = [];
  let pharmacistHelp: string[] = [];
  let category: TriageCategory = 'LOW CONCERN';

  const isHeadache = fullText.includes('headache') || fullText.includes('tête') || fullText.includes('را示') || fullText.includes('راسي') || fullText.includes('صداع') || fullText.includes('وجع الراس');
  const isFever = fullText.includes('fever') || fullText.includes('fièvre') || fullText.includes('سخانة') || fullText.includes('حمى') || fullText.includes('حرارة');
  const isCough = fullText.includes('cough') || fullText.includes('toux') || fullText.includes('كحة') || fullText.includes('سعلة');
  const isStomach = fullText.includes('stomach') || fullText.includes('ventre') || fullText.includes('بطني') || fullText.includes('وجع البطن') || fullText.includes('معدة');
  const isAllergy = fullText.includes('allergy') || fullText.includes('allergie') || fullText.includes('حساسية');

  // Multi-turn context extraction
  const hasSeverityContext = fullText.includes('1') || fullText.includes('2') || fullText.includes('3') || fullText.includes('4') || fullText.includes('5') || fullText.includes('6') || fullText.includes('7') || fullText.includes('8') || fullText.includes('9') || fullText.includes('10') || fullText.includes('mild') || fullText.includes('léger') || fullText.includes('خفيف') || fullText.includes('شدة') || fullText.includes('severe') || fullText.includes('متوسط');
  const hasDurationContext = fullText.includes('today') || fullText.includes('morning') || fullText.includes('صباح') || fullText.includes('يوم') || fullText.includes('days') || fullText.includes('depuis') || fullText.includes('just');

  if (isHeadache) {
    medIds = ['paracetamol', 'ibuprofen'];
    if (turnCount === 1 && !hasSeverityContext && !hasDurationContext) {
      category = 'NEEDS PHARMACIST';
      if (lang === 'AR') {
        questions = [
          'كم تبلغ شدة الصداع على مقياس من 1 إلى 10؟',
          'متى بدأ الصداع؟ وهل جاء بشكل مفاجئ وحاد؟',
          'هل يرافقه ارتفاع في الحرارة أو غثيان أو زغللة بالعينين؟'
        ];
        quickOptions = ['1-3 خفيف', '4-6 متوسط', '7-10 شديد', 'بدأ اليوم', 'منذ يومين', 'مع سخانة أو غثيان'];
        causes = ['التوتر والإجهاد النفسي', 'الجفاف وقلة شرب الماء', 'قلة النوم والسهر', 'إجهاد العينين'];
        selfCare = ['الراحة في مكان هادئ ومظلم', 'شرب 1.5 إلى 2 لتر من الماء', 'تجنب الشاشات والإضاءة العالية'];
      } else if (lang === 'FR') {
        questions = [
          'Quelle est l’intensité de la douleur sur une échelle de 1 à 10 ?',
          'Quand le mal de tête a-t-il commencé ? Est-il survenu brutalement ?',
          'S’accompagne-t-il de fièvre, nausées ou troubles visuels ?'
        ];
        quickOptions = ['1-3 Léger', '4-6 Modéré', '7-10 Sévère', 'Depuis ce matin', 'Depuis 2 jours', 'Avec fièvre'];
        causes = ['Stress et tension nerveuse', 'Déshydratation', 'Manque de sommeil', 'Fatigue oculaire'];
        selfCare = ['Rester au calme dans une pièce sombre', 'S’hydrater abondamment', 'Éviter les écrans'];
      } else {
        questions = [
          'How severe is the headache on a scale from 1 to 10?',
          'When did it start, and was the onset sudden?',
          'Do you have an accompanying fever, nausea, or visual disturbances?'
        ];
        quickOptions = ['1-3 Mild', '4-6 Moderate', '7-10 Severe', 'Since this morning', 'Past 2 days', 'Fever or nausea'];
        causes = ['Stress and mental tension', 'Dehydration', 'Lack of sleep', 'Eyestrain'];
        selfCare = ['Rest in a quiet, darkened room', 'Drink 1.5 to 2 liters of fresh water', 'Avoid bright screens'];
      }
    } else {
      const isHighSeverity = fullText.includes('7') || fullText.includes('8') || fullText.includes('9') || fullText.includes('10') || fullText.includes('severe') || fullText.includes('شديد') || fullText.includes('sévère');
      category = isHighSeverity ? 'NEEDS DOCTOR' : 'NEEDS PHARMACIST';

      if (lang === 'AR') {
        causes = ['صداع التوتر العضلي', 'الجفاف ونقص التروية', 'إجهاد العين أو قلة النوم', 'احتقان الجيوب الأنفية'];
        selfCare = ['الاسترخاء ووضع كمادة باردة على الجبين', 'الحفاظ على التروية الكافية بالماء', 'تجنب الإضاءة والأصوات المرتفعة'];
        doctorHelp = ['إذا استمر الصداع أكثر من 3 أيام', 'إذا كان حاداً ومفاجئاً بشكل غير معتاد (7/10 أو أكثر)', 'عند ظهور قيء متكرر أو غباش الرؤية'];
        pharmacistHelp = ['الاطلاع على معلومات المسكنات الآمنة مثل الباراسيتامول ومراقبة ضغط الدم'];
      } else if (lang === 'FR') {
        causes = ['Céphalée de tension', 'Déshydratation', 'Fatigue oculaire ou manque de sommeil', 'Congestion sinusale'];
        selfCare = ['Application d’une compresse fraîche sur le front', 'Hydratation régulière', 'Repos dans le calme'];
        doctorHelp = ['Si la douleur persiste au-delà de 72h', 'En cas de douleur aiguë brutale (>= 7/10)', 'En cas de vomissements ou flou visuel'];
        pharmacistHelp = ['Conseils sur les antalgiques adaptés (paracétamol) et prise de tension'];
      } else {
        causes = ['Tension headache', 'Dehydration', 'Eyestrain or fatigue', 'Sinus congestion'];
        selfCare = ['Apply a cool compress to forehead', 'Maintain regular hydration', 'Rest in a quiet setting'];
        doctorHelp = ['If headache persists for over 72 hours', 'If severity is high (>= 7/10) or onset was sudden', 'If accompanied by vision changes or vomiting'];
        pharmacistHelp = ['Consultation on suitable analgesics (e.g. Paracetamol) and BP check'];
      }
    }
  } else if (isFever) {
    medIds = ['paracetamol', 'ibuprofen'];
    if (turnCount === 1 && !hasSeverityContext) {
      category = 'NEEDS PHARMACIST';
      if (lang === 'AR') {
        questions = ['كم تبلغ درجة الحرارة المقاسة بالترمومتر؟', 'كم يوماً استمرت الحمى؟', 'هل تعاني من قشعريرة، سعال، أو طفح جلدي؟'];
        quickOptions = ['أقل من 38.5°C', '38.5°C - 39.5°C', 'أكثر من 39.5°C', 'طفل / رضع', 'بالغ'];
      } else {
        questions = ['What is the measured body temperature?', 'How many days has the fever lasted?', 'Do you have chills, cough, or a skin rash?'];
        quickOptions = ['Under 38.5°C', '38.5°C - 39.5°C', 'Over 39.5°C', 'Child / Infant', 'Adult'];
      }
    }
    category = 'NEEDS PHARMACIST';
    causes = [lang === 'AR' ? 'استجابة مناعية لعدوى فيروسية تنفسية' : 'Immune response to a viral respiratory infection'];
    selfCare = [lang === 'AR' ? 'ارتداء ملابس خفيفة وشرب السوائل بكثرة' : 'Wear light clothing and stay hydrated'];
    doctorHelp = [lang === 'AR' ? 'إذا تجاوزت الحرارة 39.5 درجة مئوية ولم تنخفض' : 'If temperature exceeds 39.5°C unyielding to antipyretics'];
    pharmacistHelp = [lang === 'AR' ? 'اختيار خافض الحرارة المناسب وقياس الحرارة' : 'Select appropriate antipyretics and dosage guidance'];

  } else if (isCough) {
    medIds = ['paracetamol'];
    if (turnCount === 1) {
      category = 'LOW CONCERN';
      if (lang === 'AR') {
        questions = ['هل السعال جاف أم مصحوب بالبلغم؟', 'هل يرافقه ضيق في التنفس أو ألم بالصدر؟'];
        quickOptions = ['سعال جاف', 'سعال مع بلغم', 'منذ يومين', 'أكثر من أسبوعين'];
      } else {
        questions = ['Is the cough dry or productive with phlegm?', 'Are you experiencing breathing difficulty or chest tightness?'];
        quickOptions = ['Dry Cough', 'Cough with Phlegm', '1-3 Days', 'Over 2 Weeks'];
      }
    }
    causes = [lang === 'AR' ? 'تهيج الشعب الهوائية أو زكام تنفسي' : 'Bronchial irritation or common cold'];
    selfCare = [lang === 'AR' ? 'شرب المشروبات الدافئة وترطيب الجو' : 'Sip warm fluids and use humidification'];
    doctorHelp = [lang === 'AR' ? 'إذا استمر السعال أكثر من أسبوعين أو ظهر دم' : 'If cough persists over 2 weeks or hemoptysis occurs'];
    pharmacistHelp = [lang === 'AR' ? 'استشارة الصيدلي حول مهدئات السعال المناسبة' : 'Guidance on appropriate OTC cough syrups'];

  } else if (isStomach) {
    medIds = ['spasfon', 'ors'];
    if (turnCount === 1) {
      category = 'NEEDS PHARMACIST';
      if (lang === 'AR') {
        questions = ['أين يتركز ألم البطن تحديداً (يمين، شمال، أعلى، أسفل)؟', 'هل يرافقه قيء، إسهال، أو ارتفاع بالحرارة؟'];
        quickOptions = ['مغص خفيف', 'أعلى المعدة', 'أسفل البطن اليمين', 'إسهال أو قيء'];
      } else {
        questions = ['Where is the stomach pain localized?', 'Do you have accompanying vomiting, diarrhea, or fever?'];
        quickOptions = ['Mild Cramps', 'Upper Stomach', 'Lower Right Side', 'Nausea / Vomiting'];
      }
    }
    causes = [lang === 'AR' ? 'تقلصات الأمعاء أو عسر الهضم' : 'Intestinal cramps or indigestion'];
    selfCare = [lang === 'AR' ? 'تناول وجبات خفيفة وشرب شاي الأعشاب الدافئ' : 'Eat bland meals and sip warm herbal tea'];
    doctorHelp = [lang === 'AR' ? 'عند وجود ألم شديد حاد بأسفل البطن الأيمن (اشتباه الزائدة)' : 'If severe sharp pain develops in lower right abdomen'];
    pharmacistHelp = [lang === 'AR' ? 'مضادات التشنج ومحلول إماهة الأمعاء' : 'Antispasmodics and oral rehydration solutions'];

  } else if (isAllergy) {
    medIds = ['antihistamine'];
    category = 'NEEDS PHARMACIST';
    causes = [lang === 'AR' ? 'تفاعل حساسية موسمية أو بيئية' : 'Seasonal or environmental allergy response'];
    selfCare = [lang === 'AR' ? 'غسل الأنف والوجه وتنظيف المكان من الغبار' : 'Rinse nasal passages and avoid dust/pollens'];
    doctorHelp = [lang === 'AR' ? 'إذا ظهر تورم بالشفتين أو صعوبة تنفس (طوارئ)' : 'If lip/facial swelling or respiratory distress develops'];
    pharmacistHelp = [lang === 'AR' ? 'مضادات الهيستامين غير المسببة للنعاس' : 'Non-drowsy antihistamine options'];

  } else {
    medIds = ['paracetamol'];
    category = 'LOW CONCERN';
    causes = [lang === 'AR' ? 'إجهاد بدني أو تغيرات موسمية' : 'General fatigue or seasonal changes'];
    selfCare = [lang === 'AR' ? 'الراحة وشرب السوائل الكافية' : 'Adequate rest and proper hydration'];
    doctorHelp = [lang === 'AR' ? 'إذا تفاقمت الأعراض بدون سبب واضح' : 'If symptoms worsen unexpectedly'];
    pharmacistHelp = [lang === 'AR' ? 'استشارة الصيدلي للتقييم والتوجيه' : 'General guidance and health consultation'];
  }

  const hydratedMeds = medIds.map((id: string) => MEDICATIONS_DATABASE.find((m: MedicationEntry) => m.id === id)).filter((m): m is MedicationEntry => m !== undefined);

  let summaryText = '';
  if (lang === 'AR') {
    summaryText = `بناءً على الأعراض التي وصفتها ("${messages[messages.length - 1]?.content || ''}")، إليك الإرشادات الصحية والمعلومات المعتمدة.`;
  } else if (lang === 'FR') {
    summaryText = `Basé sur les symptômes décrits ("${messages[messages.length - 1]?.content || ''}"), voici une évaluation guidée et sécurisée.`;
  } else {
    summaryText = `Based on your description ("${messages[messages.length - 1]?.content || ''}"), here is an evidence-based clinical evaluation.`;
  }

  return {
    summary: summaryText,
    triageCategory: category,
    possible_general_causes: causes,
    self_care: selfCare,
    medication_ids: medIds,
    relevantMedications: hydratedMeds,
    warning_signs: [
      lang === 'AR' ? 'صعوبة التنفس، ألم الصدر، أو الصداع الحاد المفاجئ يستدعي الطوارئ فوراً' : lang === 'FR' ? 'Une gêne respiratoire, douleur thoracique ou mal de tête brutal nécessitent les urgences' : 'Shortness of breath, chest pain, or sudden severe headache requires immediate emergency care'
    ],
    seek_professional_help: {
      consult_doctor: doctorHelp,
      consult_pharmacist: pharmacistHelp
    },
    emergency_level: 'NONE',
    follow_up_questions: questions,
    quick_options: quickOptions,
    sources: ['Ministère de la Santé du Maroc (ANAM)', 'World Health Organization (WHO) Guidelines'],
    userLanguage: lang
  };
}
