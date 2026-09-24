export type Language = 'EN' | 'FR' | 'AR';

export interface Translations {
  // Navigation & Brand
  brandName: string;
  tagline: string;
  secondaryTagline: string;
  navFindPharmacy: string;
  navOnDuty: string;
  navCities: string;
  navHowItWorks: string;

  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroCtaNearMe: string;
  heroCtaSearchCity: string;
  searchPlaceholder: string;
  popularCities: string;

  // Location Status
  locationUsingGps: string;
  locationDisabled: string;
  locationDisabledSubtitle: string;
  locationEnableBtn: string;
  locationSelectCityBtn: string;
  locationDetecting: string;

  // On-Duty Night Mode
  dutyTitle: string;
  dutySubtitle: string;
  dutyTonightBadge: string;
  dutySourceInfo: string;

  // Filters & Search
  filterAll: string;
  filterOpenNow: string;
  filterOnDuty: string;
  filter247: string;
  filterHasPhone: string;
  filterDelivery: string;
  filterVerified: string;
  radiusLabel: string;
  sortByLabel: string;
  sortNearest: string;
  sortFastest: string;
  sortVerified: string;
  resultsCount: string;

  // Pharmacy Card & Details
  statusOpen: string;
  statusOnDuty: string;
  statusOnDuty24h: string;
  statusClosed: string;
  statusUnknown: string;
  statusConflicting: string;
  distanceLabel: string;
  etaDrive: string;
  etaWalk: string;
  addressLabel: string;
  phoneLabel: string;
  hoursLabel: string;
  lastVerifiedLabel: string;
  sourceLabel: string;
  confidenceLabel: string;
  highConfidence: string;
  mediumConfidence: string;
  unverifiedConfidence: string;
  btnGetDirections: string;
  btnCall: string;
  btnSave: string;
  btnSaved: string;
  btnShare: string;
  btnClose: string;
  dutyNoteTitle: string;
  demoDataBadge: string;

  // Emergency Section
  emergencyTitle: string;
  emergencySubtitle: string;
  emergencyCallNow: string;
  samuLabel: string;
  samuSub: string;
  policeLabel: string;
  policeSub: string;
  firefightersLabel: string;
  firefightersSub: string;
  gendarmerieLabel: string;
  gendarmerieSub: string;

  // Empty & Error States
  noPharmaciesTitle: string;
  noPharmaciesText: string;
  btnTryAnotherCity: string;
  btnExpandRadius: string;
  btnResetFilters: string;
  unverifiedWarningText: string;

  // Modals & City Search
  cityModalTitle: string;
  citySearchPlaceholder: string;
  citySearchNoResults: string;
  howItWorksTitle: string;
  howStep1Title: string;
  howStep1Text: string;
  howStep2Title: string;
  howStep2Text: string;
  howStep3Title: string;
  howStep3Text: string;

  // Footer & Privacy
  footerDesc: string;
  footerLinksTitle: string;
  privacyNotice: string;
  privacyText: string;
  copyright: string;

  // UI Tabs
  tabList: string;
  tabMap: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  EN: {
    brandName: 'PHARMA NOW',
    tagline: 'Find a pharmacy. Now.',
    secondaryTagline: 'Open pharmacies. On-duty pharmacies. Near you.',
    navFindPharmacy: 'Find a Pharmacy',
    navOnDuty: 'On Duty',
    navCities: 'Cities',
    navHowItWorks: 'How It Works',

    heroTitle: 'Find a pharmacy.\nNow.',
    heroSubtitle: 'Discover nearby open and on-duty pharmacies with directions, opening status and verified contact information.',
    heroCtaNearMe: 'Find pharmacies near me',
    heroCtaSearchCity: 'Search by city',
    searchPlaceholder: 'Search pharmacy, city, neighborhood or address...',
    popularCities: 'Popular Cities:',

    locationUsingGps: 'Using your live GPS location',
    locationDisabled: 'Location access is disabled',
    locationDisabledSubtitle: 'Location unavailable. Select your city to continue.',
    locationEnableBtn: 'Enable GPS',
    locationSelectCityBtn: 'Choose a City',
    locationDetecting: 'Detecting your location...',

    dutyTitle: 'Pharmacies on duty tonight',
    dutySubtitle: 'Emergency night shifts & 24-hour on-duty rosters for urgent prescription access.',
    dutyTonightBadge: 'ON DUTY TONIGHT',
    dutySourceInfo: 'Information sourced from official syndicate rosters and local duty registries.',

    filterAll: 'All Pharmacies',
    filterOpenNow: 'OPEN NOW',
    filterOnDuty: 'ON DUTY',
    filter247: '24/7 OPEN',
    filterHasPhone: 'HAS PHONE',
    filterDelivery: 'DELIVERY',
    filterVerified: 'VERIFIED',
    radiusLabel: 'Radius:',
    sortByLabel: 'Sort by:',
    sortNearest: 'Nearest',
    sortFastest: 'Fastest Travel',
    sortVerified: 'Recently Verified',
    resultsCount: 'pharmacies found',

    statusOpen: 'OPEN NOW',
    statusOnDuty: 'ON-DUTY NIGHT',
    statusOnDuty24h: 'ON-DUTY 24H',
    statusClosed: 'CLOSED NOW',
    statusUnknown: 'UNVERIFIED STATUS',
    statusConflicting: 'SCHEDULE UNCERTAIN',
    distanceLabel: 'Distance',
    etaDrive: 'drive',
    etaWalk: 'walk',
    addressLabel: 'Address',
    phoneLabel: 'Phone',
    hoursLabel: 'Opening Hours',
    lastVerifiedLabel: 'Verified',
    sourceLabel: 'Source',
    confidenceLabel: 'Confidence',
    highConfidence: 'VERIFIED HIGH CONFIDENCE',
    mediumConfidence: 'MEDIUM CONFIDENCE',
    unverifiedConfidence: 'UNVERIFIED DATA',
    btnGetDirections: 'Directions',
    btnCall: 'Call Now',
    btnSave: 'Save',
    btnSaved: 'Saved',
    btnShare: 'Share',
    btnClose: 'Close',
    dutyNoteTitle: 'Night Shift Instructions:',
    demoDataBadge: 'DEMO / FALLBACK DATA',

    emergencyTitle: 'Need urgent help?',
    emergencySubtitle: 'Contact local emergency services immediately for medical emergencies.',
    emergencyCallNow: 'Call Now',
    samuLabel: 'SAMU / Medical Emergency',
    samuSub: 'Ambulance & Urgent Care',
    policeLabel: 'Police Emergency',
    policeSub: 'Law Enforcement',
    firefightersLabel: 'Civil Protection',
    firefightersSub: 'Fire & Emergency Rescue',
    gendarmerieLabel: 'Gendarmerie Royale',
    gendarmerieSub: 'Rural Patrol & Safety',

    noPharmaciesTitle: 'No verified pharmacies found',
    noPharmaciesText: 'We couldn’t find pharmacies matching your current filters in this area.',
    btnTryAnotherCity: 'Search another city',
    btnExpandRadius: 'Expand search radius',
    btnResetFilters: 'Reset filters',
    unverifiedWarningText: 'Availability could not be verified. Please call before traveling.',

    cityModalTitle: 'Select or Search City',
    citySearchPlaceholder: 'Type a city name (e.g. Nador, Paris, Casablanca)...',
    citySearchNoResults: 'No matching cities found in global directory.',
    howItWorksTitle: 'How PHARMA NOW Works',
    howStep1Title: '1. Detect or Choose Location',
    howStep1Text: 'Grant GPS access for instant nearby results or type any city name in Morocco or internationally.',
    howStep2Title: '2. Live & On-Duty Status Verification',
    howStep2Text: 'We query real-time data and official rosters to show which pharmacies are open or on emergency night duty.',
    howStep3Title: '3. Instant Route & Direct Contact',
    howStep3Text: 'Get turn-by-turn directions via Google Maps or call the pharmacy immediately with one tap.',

    footerDesc: 'PHARMA NOW — Premium global pharmacy & emergency discovery platform.',
    footerLinksTitle: 'Quick Links',
    privacyNotice: 'Privacy & Data Protection',
    privacyText: 'Your location is used solely in real time to locate nearby medical facilities. We never store or track your personal location data.',
    copyright: '© 2026 PHARMA NOW. All rights reserved.',

    tabList: 'List View',
    tabMap: 'Map View'
  },
  FR: {
    brandName: 'PHARMA NOW',
    tagline: 'Trouvez une pharmacie. Maintenant.',
    secondaryTagline: 'Pharmacies ouvertes. Pharmacies de garde. Près de chez vous.',
    navFindPharmacy: 'Trouver une pharmacie',
    navOnDuty: 'Pharmacies de garde',
    navCities: 'Villes',
    navHowItWorks: 'Comment ça marche',

    heroTitle: 'Trouvez une pharmacie.\nMaintenant.',
    heroSubtitle: 'Découvrez les pharmacies ouvertes et de garde à proximité avec itinéraire, statut et coordonnées vérifiées.',
    heroCtaNearMe: 'Pharmacies près de moi',
    heroCtaSearchCity: 'Rechercher par ville',
    searchPlaceholder: 'Rechercher pharmacie, ville, quartier ou adresse...',
    popularCities: 'Villes populaires:',

    locationUsingGps: 'Utilisation de votre position GPS en direct',
    locationDisabled: 'Accès à la géolocalisation désactivé',
    locationDisabledSubtitle: 'Localisation indisponible. Sélectionnez votre ville pour continuer.',
    locationEnableBtn: 'Activer le GPS',
    locationSelectCityBtn: 'Choisir une ville',
    locationDetecting: 'Détection de votre position...',

    dutyTitle: 'Pharmacies de garde ce soir',
    dutySubtitle: 'Gardes de nuit et permanences d’urgence 24h/24 pour l’accès urgent aux médicaments.',
    dutyTonightBadge: 'DE GARDE CE SOIR',
    dutySourceInfo: 'Informations issues des tableaux officiels du syndicat des pharmaciens.',

    filterAll: 'Toutes les pharmacies',
    filterOpenNow: 'OUVERT MAINTENANT',
    filterOnDuty: 'DE GARDE',
    filter247: 'OUVERT 24/7',
    filterHasPhone: 'AVEC TÉLÉPHONE',
    filterDelivery: 'LIVRAISON',
    filterVerified: 'VÉRIFIÉ',
    radiusLabel: 'Rayon:',
    sortByLabel: 'Trier par:',
    sortNearest: 'Plus proche',
    sortFastest: 'Trajet le plus rapide',
    sortVerified: 'Récemment vérifiée',
    resultsCount: 'pharmacies trouvées',

    statusOpen: 'OUVERT MAINTENANT',
    statusOnDuty: 'DE GARDE DE NUIT',
    statusOnDuty24h: 'DE GARDE 24H',
    statusClosed: 'FERMÉ MAINTENANT',
    statusUnknown: 'STATUT NON VÉRIFIÉ',
    statusConflicting: 'HORAIRES À CONFIRMER',
    distanceLabel: 'Distance',
    etaDrive: 'en voiture',
    etaWalk: 'à pied',
    addressLabel: 'Adresse',
    phoneLabel: 'Téléphone',
    hoursLabel: 'Horaires d’ouverture',
    lastVerifiedLabel: 'Vérifié',
    sourceLabel: 'Source',
    confidenceLabel: 'Fiabilité',
    highConfidence: 'HAUTE FIABILITÉ',
    mediumConfidence: 'FIABILITÉ MOYENNE',
    unverifiedConfidence: 'DONNÉES NON VÉRIFIÉES',
    btnGetDirections: 'Itinéraire',
    btnCall: 'Appeler',
    btnSave: 'Enregistrer',
    btnSaved: 'Enregistré',
    btnShare: 'Partager',
    btnClose: 'Fermer',
    dutyNoteTitle: 'Consignes pour la garde de nuit:',
    demoDataBadge: 'DONNÉES DE DÉMO',

    emergencyTitle: 'Besoin d’aide urgente ?',
    emergencySubtitle: 'Contactez immédiatement les services d’urgence en cas de détresse médicale.',
    emergencyCallNow: 'Appeler',
    samuLabel: 'SAMU / Urgence Médicale',
    samuSub: 'Ambulance & Soins Intensifs',
    policeLabel: 'Police Secours',
    policeSub: 'Maintien de l’ordre',
    firefightersLabel: 'Protection Civile / Sapeurs-Pompiers',
    firefightersSub: 'Secours & Incendie',
    gendarmerieLabel: 'Gendarmerie Royale',
    gendarmerieSub: 'Sécurité rurale',

    noPharmaciesTitle: 'Aucune pharmacie vérifiée trouvée',
    noPharmaciesText: 'Aucune pharmacie ne correspond à vos filtres dans cette zone.',
    btnTryAnotherCity: 'Changer de ville',
    btnExpandRadius: 'Élargir le rayon',
    btnResetFilters: 'Réinitialiser les filtres',
    unverifiedWarningText: 'La disponibilité n’a pas pu être vérifiée. Veuillez appeler avant de vous déplacer.',

    cityModalTitle: 'Sélectionner ou rechercher une ville',
    citySearchPlaceholder: 'Saisissez une ville (ex. Nador, Paris, Casablanca)...',
    citySearchNoResults: 'Aucune ville trouvée dans le répertoire mondial.',
    howItWorksTitle: 'Comment fonctionne PHARMA NOW',
    howStep1Title: '1. Détection ou Choix de Localisation',
    howStep1Text: 'Autorisez le GPS pour un résultat immédiat ou tapez le nom de n’importe quelle ville dans le monde.',
    howStep2Title: '2. Vérification du Statut & des Gardes',
    howStep2Text: 'Nous croisons les données temps réel et les gardes officielles pour indiquer les pharmacies accessibles.',
    howStep3Title: '3. Itinéraire & Contact Direct',
    howStep3Text: 'Lancez la navigation Google Maps ou appelez directement la pharmacie en un clic.',

    footerDesc: 'PHARMA NOW — Plateforme mondiale de recherche de pharmacies et services d’urgence.',
    footerLinksTitle: 'Liens rapides',
    privacyNotice: 'Confidentialité & Données',
    privacyText: 'Votre position est utilisée exclusivement en temps réel pour localiser les officines proches. Aucune donnée n’est stockée.',
    copyright: '© 2026 PHARMA NOW. Tous droits réservés.',

    tabList: 'Vue Liste',
    tabMap: 'Vue Carte'
  },
  AR: {
    brandName: 'فارما ناو',
    tagline: 'اعثر على صيدلية. الآن.',
    secondaryTagline: 'صيدليات مفتوحة. صيدليات الحراسة الليلية. بالقرب منك.',
    navFindPharmacy: 'البحث عن صيدلية',
    navOnDuty: 'صيدليات الحراسة',
    navCities: 'المدن',
    navHowItWorks: 'كيف يعمل',

    heroTitle: 'اعثر على صيدلية.\nالآن.',
    heroSubtitle: 'اكتشف الصيدليات المفتوحة وصيدليات الحراسة الليلية بالقرب منك مع الاتجاهات ومواعيد العمل وأرقام الهاتف.',
    heroCtaNearMe: 'الصيدليات القريبة مني',
    heroCtaSearchCity: 'البحث حسب المدينة',
    searchPlaceholder: 'ابحث عن صيدلية، مدينة، حي أو عنوان...',
    popularCities: 'المدن الشائعة:',

    locationUsingGps: 'جاري استخدام موقعك الحالي عبر GPS',
    locationDisabled: 'خدمة تحديد الموقع معطلة',
    locationDisabledSubtitle: 'الموقع غير متاح. اختر مدينتك للمتابعة.',
    locationEnableBtn: 'تفعيل GPS',
    locationSelectCityBtn: 'اختيار مدينة',
    locationDetecting: 'جاري تحديد موقعك...',

    dutyTitle: 'صيدليات الحراسة الليلية الليلة',
    dutySubtitle: 'جدول الحراسة الليلية والطوارئ 24/24 للحصول على الدواء في الحالات المستعجلة.',
    dutyTonightBadge: 'حراسة الليلة',
    dutySourceInfo: 'المعلومات مستخرجة من الجداول الرسمية لنقابة الصيدليين.',

    filterAll: 'جميع الصيدليات',
    filterOpenNow: 'مفتوح الآن',
    filterOnDuty: 'صيدلية حراسة',
    filter247: 'مفتوح 24/24',
    filterHasPhone: 'يتوفر على هاتف',
    filterDelivery: 'توصيل',
    filterVerified: 'مُتحقق منها',
    radiusLabel: 'النطاق:',
    sortByLabel: 'الترتيب حسب:',
    sortNearest: 'الأقرب مسافة',
    sortFastest: 'الأسرع وصولاً',
    sortVerified: 'الأحدث تأكيداً',
    resultsCount: 'صيدلية تم العثور عليها',

    statusOpen: 'مفتوح الآن',
    statusOnDuty: 'حراسة ليلية',
    statusOnDuty24h: 'حراسة 24 ساعة',
    statusClosed: 'مغلق الآن',
    statusUnknown: 'الحالة غير مؤكدة',
    statusConflicting: 'المواعيد تحت التأكيد',
    distanceLabel: 'المسافة',
    etaDrive: 'بالسيارة',
    etaWalk: 'مشياً',
    addressLabel: 'العنوان',
    phoneLabel: 'الهاتف',
    hoursLabel: 'أوقات العمل',
    lastVerifiedLabel: 'آخر تحديث',
    sourceLabel: 'المصدر',
    confidenceLabel: 'مستوى الثقة',
    highConfidence: 'مُتحقق منها بامتياز',
    mediumConfidence: 'ثقة متوسطة',
    unverifiedConfidence: 'بيانات غير مؤكدة',
    btnGetDirections: 'الاتجاهات',
    btnCall: 'اتصال الآن',
    btnSave: 'حفظ',
    btnSaved: 'تم الحفظ',
    btnShare: 'مشاركة',
    btnClose: 'إغلاق',
    dutyNoteTitle: 'تعليمات الحراسة الليلية:',
    demoDataBadge: 'بيانات توضيحية',

    emergencyTitle: 'هل تحتاج مساعدة عاجلة؟',
    emergencySubtitle: 'اتصل بخدمات الطوارئ المحلية فوراً في الحالات الطبية الحَرجة.',
    emergencyCallNow: 'اتصل الآن',
    samuLabel: 'الإسعاف الطبي (SAMU)',
    samuSub: 'سيارات الإسعاف والرعاية المستعجلة',
    policeLabel: 'الشرطة / النجدة',
    policeSub: 'الأمن والأمر العام',
    firefightersLabel: 'الوقاية المدنية / الإطفاء',
    firefightersSub: 'الإثقاذ والإنقاذ من الحرائق',
    gendarmerieLabel: 'الدرك الملكي',
    gendarmerieSub: 'السلامة في المناطق القروية والطرق',

    noPharmaciesTitle: 'لم يتم العثور على صيدليات مؤكدة',
    noPharmaciesText: 'لم نجد صيدليات تتوافق مع معايير البحث الحالية في هذه المنطقة.',
    btnTryAnotherCity: 'البحث في مدينة أخرى',
    btnExpandRadius: 'توسيع نطاق البحث',
    btnResetFilters: 'إعادة ضبط الفلاتر',
    unverifiedWarningText: 'تعذر التحقق من حالة الفتح. يرجى الاتصال قبل التنقل.',

    cityModalTitle: 'اختر أو ابحث عن مدينة',
    citySearchPlaceholder: 'اكتب اسم المدينة (مثال: الناظور، الدار البيضاء، باريس)...',
    citySearchNoResults: 'لم يتم العثور على المدينة في الدليل العالمي.',
    howItWorksTitle: 'كيف يعمل فارما ناو',
    howStep1Title: '1. تحديد الموقع أو اختيار المدينة',
    howStep1Text: 'اسمح بخدمة الموقع نتائج فورية أو اكتب اسم أي مدينة في المغرب أو عبر العالم.',
    howStep2Title: '2. التحقق من حالة الفتح والحراسة',
    howStep2Text: 'نقوم بمقاطعة البيانات اللحظية مع جداول الحراسة الرسمية لنبين لك الصيدليات المتاحة.',
    howStep3Title: '3. الاتجاهات المباشرة والاتصال',
    howStep3Text: 'احصل على الاتجاهات عبر الخريطة أو اتصل بالصيدلية مباشرة بضغطة زر واحدة.',

    footerDesc: 'فارما ناو — المنصة العالمية الذكية للبحث عن الصيدليات وخدمات الطوارئ.',
    footerLinksTitle: 'روابط سريعة',
    privacyNotice: 'الخصوصية وحماية البيانات',
    privacyText: 'يتم استخدام موقعك الجغرافي حصرياً في الوقت الفعلي للبحث عن الصيدليات القريبة. لا نقوم بتخزين موقعك.',
    copyright: '© 2026 فارما ناو. جميع الحقوق محفوظة.',

    tabList: 'قائمة الصيدليات',
    tabMap: 'عرض الخريطة'
  }
};
