export interface ParsedSearchQuery {
  originalQuery: string;
  cleanedLocation: string | null;
  isOnDutyRequested: boolean;
  isOpenNowRequested: boolean;
  is247Requested: boolean;
  isDeliveryRequested: boolean;
  detectedIntent: 'pharmacy' | 'health_guide' | 'medication' | 'emergency';
  targetTopic?: string | null;
}

export function parseSearchQuery(query: string): ParsedSearchQuery {
  const q = query.trim();
  if (!q) {
    return {
      originalQuery: query,
      cleanedLocation: null,
      isOnDutyRequested: false,
      isOpenNowRequested: false,
      is247Requested: false,
      isDeliveryRequested: false,
      detectedIntent: 'pharmacy'
    };
  }

  const lower = q.toLowerCase();

  // Moroccan Darija & Multilingual On-Duty Keywords
  const dutyKeywords = [
    'garde', 'de garde', 'f garde', 'onduty', 'on-duty', 'on duty', 'حراسة', 'صيدلية حراسة', 'ليلية', 'night', 'ديال الحراسة'
  ];

  // Moroccan Darija & Multilingual Open-Now Keywords ("محلولة دابا", "حلين", "دابا")
  const openKeywords = [
    'ouverte', 'ouvert', 'open', 'open now', 'مفتوح', 'مفتوحة', 'الآن', 'دابا', 'محلولة', 'محلولين', 'حلين'
  ];

  // 24/7 Keywords
  const keywords247 = [
    '24/7', '24h', '24/24', '247', 'ساعة', '24'
  ];

  // Delivery Keywords
  const deliveryKeywords = [
    'delivery', 'livraison', 'توصيل'
  ];

  let isOnDutyRequested = dutyKeywords.some(kw => lower.includes(kw));
  let isOpenNowRequested = openKeywords.some(kw => lower.includes(kw));
  let is247Requested = keywords247.some(kw => lower.includes(kw));
  let isDeliveryRequested = deliveryKeywords.some(kw => lower.includes(kw));

  // Health Topic Detection (e.g. Diabète, Tension, Grippe, Asthme, Headache, etc.)
  const healthKeywords: Record<string, string> = {
    'diabete': 'diabetes',
    'diabète': 'diabetes',
    'سكر': 'diabetes',
    'السكري': 'diabetes',
    'tension': 'hypertension',
    'ضغط': 'hypertension',
    'الضغط': 'hypertension',
    'grippe': 'cold_flu',
    'froid': 'cold_flu',
    'زكام': 'cold_flu',
    'نزلة': 'cold_flu',
    'astme': 'asthma',
    'asthme': 'asthma',
    'ربو': 'asthma',
    'الربو': 'asthma',
    'allergie': 'allergies',
    'حساسية': 'allergies',
    'tete': 'headache',
    'tête': 'headache',
    'رأس': 'headache',
    'الرأس': 'headache',
    'شقيقة': 'headache'
  };

  let detectedIntent: 'pharmacy' | 'health_guide' | 'medication' | 'emergency' = 'pharmacy';
  let targetTopic: string | null = null;

  for (const [kw, topic] of Object.entries(healthKeywords)) {
    if (lower.includes(kw)) {
      detectedIntent = 'health_guide';
      targetTopic = topic;
      break;
    }
  }

  // Strip Moroccan Darija phrases & stopwords to extract location (e.g. "fin kayna pharmacie 7daya f Nador" -> "Nador")
  let clean = lower;
  const darijaStopWords = [
    'fin', 'kayna', 'kayn', '7daya', '7da', 'ف', 'f', 'فين', 'نلقى', 'بغيت', 'قريبة', 'محلولة', 'دابا',
    'pharmacie', 'pharmacy', 'صيدلية', 'de', 'du', 'à', 'a', 'la', 'le', 'dans', 'en', 'in', 'near',
    'près de', 'قرب', 'في', 'من', 'garde', 'ouvert', 'ouverte', 'open', 'now', '24/7', '24h', '24/24',
    'حراسة', 'مفتوح', 'مفتوحة', 'الآن', 'night', 'tonight'
  ];

  darijaStopWords.forEach(word => {
    clean = clean.replace(new RegExp(`\\b${word}\\b`, 'gi'), '');
  });

  clean = clean.replace(/\s+/g, ' ').trim();
  const cleanedLocation = clean.length > 1 ? clean.charAt(0).toUpperCase() + clean.slice(1) : null;

  return {
    originalQuery: query,
    cleanedLocation,
    isOnDutyRequested,
    isOpenNowRequested,
    is247Requested,
    isDeliveryRequested,
    detectedIntent,
    targetTopic
  };
}
