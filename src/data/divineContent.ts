import { SpinReward, DailyDivineCard, StudentProgressSummary, TeacherMessage } from '../types';

export const SPIN_WHEEL_ITEMS: SpinReward[] = [
  {
    id: 'spin-1',
    type: 'swaman',
    titleHi: 'मास्टर सर्वशक्तिमान',
    titleEn: 'Master Almighty',
    descriptionHi: 'मैं सर्वशक्तिमान शिव बाबा का सच्चा बच्चा हूँ। कोई भी परिस्थिति मेरी स्थिति से बड़ी नहीं।',
    color: '#8A2C3F', // Crimson maroon
    icon: '👑'
  },
  {
    id: 'spin-2',
    type: 'vardan',
    titleHi: 'वरदान: संतुष्टता',
    titleEn: 'Blessing: Contentment',
    descriptionHi: 'सदा प्राप्तियों को सामने रख भरपूर रहने वाले, हर परिस्थिति में संतुष्ट आत्मा भव।',
    color: '#94723B', // Antique Gold
    icon: '✨'
  },
  {
    id: 'spin-3',
    type: 'swaman',
    titleHi: 'शांत स्वरूप आत्मा',
    titleEn: 'Embodiment of Peace',
    descriptionHi: 'गंभीर महासागर की तरह अचल, अडोल और शांत रहना ही मेरा अनादि स्वरूप है।',
    color: '#2A5A44', // Forest Emerald
    icon: '🕊️'
  },
  {
    id: 'spin-4',
    type: 'vardan',
    titleHi: 'वरदान: साक्षी स्थिति',
    titleEn: 'Blessing: Observer State',
    descriptionHi: 'ड्रामा के हर दृश्य को कल्याणकारी समझ साक्षी होकर देखने वाले, निर्लेप भव।',
    color: '#702333',
    icon: '👁️'
  },
  {
    id: 'spin-5',
    type: 'swaman',
    titleHi: 'आनंद स्वरूप आत्मा',
    titleEn: 'Embodiment of Joy',
    descriptionHi: 'आंतरिक सुख और अविनाशी खुशी ही मेरा सच्चा श्रृंगार है। उदासी माया का खेल है।',
    color: '#B47B42',
    icon: '🌸'
  },
  {
    id: 'spin-6',
    type: 'vardan',
    titleHi: 'वरदान: बालक सो मालिक',
    titleEn: 'Blessing: Sovereign Ruler',
    descriptionHi: 'सर्व कर्मेन्द्रियों पर पूरा स्वराज्य रखने वाले, प्रकृतिजीत सो स्वराज्य अधिकारी भव।',
    color: '#8A2C3F',
    icon: '💎'
  },
  {
    id: 'spin-7',
    type: 'swaman',
    titleHi: 'पवित्रता की मूरत',
    titleEn: 'Embodiment of Purity',
    descriptionHi: 'मेरी दृष्टि, वृत्ति और बोल में पावनता की सुगंध है। मैं निष्काम फरिश्ता हूँ।',
    color: '#2A5A44',
    icon: '🪷'
  },
  {
    id: 'spin-8',
    type: 'vardan',
    titleHi: 'वरदान: निश्चयबुद्धि विजयी',
    titleEn: 'Blessing: Undshakeable Faith',
    descriptionHi: 'बाप के साथ और ड्रामा के अटल नियम पर अटल निश्चय रखने वाले, सदा विजयी भव।',
    color: '#94723B',
    icon: '🦁'
  },
  {
    id: 'spin-9',
    type: 'swaman',
    titleHi: 'ज्ञान सूर्य का बच्चा',
    titleEn: 'Child of Wisdom Sun',
    descriptionHi: 'मेरी बुद्धि में परमात्मा की श्रीमत का प्रकाश है। उलझन मेरा संस्कार नहीं।',
    color: '#B47B42',
    icon: '☀️'
  },
  {
    id: 'spin-10',
    type: 'vardan',
    titleHi: 'वरदान: दाता स्वरूप',
    titleEn: 'Blessing: Giver Soul',
    descriptionHi: 'बिना किसी अपेक्षा के सर्व आत्माओं को शांति और प्रेम का सकाश देने वाले, महान दाता भव।',
    color: '#702333',
    icon: '💖'
  },
  {
    id: 'spin-11',
    type: 'swaman',
    titleHi: 'निर्भय व निश्चिंत',
    titleEn: 'Fearless & Carefree',
    descriptionHi: 'जिसके सिर पर सर्वशक्तिमान बाप का हाथ हो, उसे किसी बात का भय नहीं।',
    color: '#2A5A44',
    icon: '🛡️'
  },
  {
    id: 'spin-12',
    type: 'vardan',
    titleHi: 'वरदान: कर्मातीत अवस्था',
    titleEn: 'Blessing: Beyond Karma',
    descriptionHi: 'कर्म करते भी देह और देह के भान से न्यारे रहने वाले, अतीन्द्रिय सुख के अनुभवी भव।',
    color: '#94723B',
    icon: '☸️'
  }
];

export const DAILY_DIVINE_CARDS: DailyDivineCard[] = [
  {
    id: 'card-1',
    cardTitle: 'साक्षीपन का दिव्य कवच',
    babaGreeting: 'मीठे बच्चे...',
    mainMessage: 'आज जो भी दृश्य सामने आए, पहले 5 सेकंड के लिए साक्षी होकर देखना। जब तुम साक्षी बनते हो तो क्यों और क्या का प्रश्न समाप्त हो जाता है और बाबा की छत्रछाया प्रत्यक्ष अनुभव होती है।',
    vardan: 'परिस्थिति को खेल समझकर पार करने वाले, सदा हल्के और निश्चिंत भव।',
    slogan: 'सच्चा स्वमान वह है जो दूसरों को भी मान देने योग्य बना दे।',
    drushtiQuality: 'साक्षी दृष्टि',
    imageTheme: 'celestial-eye'
  },
  {
    id: 'card-2',
    cardTitle: 'मौन की अलौकिक शक्ति',
    babaGreeting: 'लाडले बच्चे...',
    mainMessage: 'आज अपनी वाणी को बहुत अनमोल समझना। हर बात का उत्तर देना या सफाई देना जरूरी नहीं होता। जब तुम अंतर्मुखी होकर शुभभावना का मौन रखते हो, तो व्यर्थ वायुमंडल स्वयं शांत हो जाता है।',
    vardan: 'वाणी के संयम द्वारा अपनी शक्तियों को जमा करने वाले, एकाग्रचित्त भव।',
    slogan: 'कम बोलना, धीरे बोलना और मीठा बोलना ही राजाई संस्कार है।',
    drushtiQuality: 'अंतर्मुखता',
    imageTheme: 'lotus-silence'
  },
  {
    id: 'card-3',
    cardTitle: 'फुलस्टॉप का वरदान',
    babaGreeting: 'नूरिरतन बच्चे...',
    mainMessage: 'बीती हुई बातों को मन में बार-बार दोहराना अर्थात् अपनी शक्तियों को व्यर्थ गंवाना। जो बीत गया उस पर एक सेकंड में फुलस्टॉप लगाओ। तुम बिन्दी, बाबा बिन्दी और ड्रामा का हर दृश्य कल्याणकारी।',
    vardan: 'बीती को बीती कर वर्तमान को श्रेष्ठ बनाने वाले, तीव्र पुरुषार्थी भव।',
    slogan: 'फुलस्टॉप लगाना अर्थात् व्यर्थ को समर्थ में परिवर्तन करना।',
    drushtiQuality: 'बिन्दु स्वरूप',
    imageTheme: 'golden-dot'
  },
  {
    id: 'card-4',
    cardTitle: 'स्वराज्य अधिकारी की शान',
    babaGreeting: 'सपूत बच्चे...',
    mainMessage: 'तुम विश्व के मालिक बनने वाली राजयोगी आत्माएँ हो। अपनी किसी भी कर्मेन्द्रिय — मन, आंखें या जुबान को अपने ऊपर हुक्म न चलाने दो। जब चाहो, जहाँ चाहो, मन को वहाँ एकाग्र कर सको, यही सच्ची राजाई है।',
    vardan: 'मन और बुद्धि को अपने हुक्म प्रमाण चलाने वाले, सच्चे स्वराज्य अधिकारी भव।',
    slogan: 'स्वराज्य ही विश्व-राज्य का सच्चा आधार है।',
    drushtiQuality: 'राजाई शान',
    imageTheme: 'royal-throne'
  },
  {
    id: 'card-5',
    cardTitle: 'रहमदिल और क्षमा की भावना',
    babaGreeting: 'सच्चे स्नेही बच्चे...',
    mainMessage: 'यदि कोई अज्ञानवश या संस्कारवश तुम्हारे साथ अनुचित व्यवहार करे, तो क्रोधित होने के बजाय रहमदिल बनो। समझो कि यह आत्मा अभी कमजोर है और इसे मेरी शांति के सकाश की आवश्यकता है।',
    vardan: 'दूसरों की कमियों को दिल में न समाकर शुभचिंतक दृष्टि रखने वाले, दयालु भव।',
    slogan: 'जो सबको दुआएँ देता है, उसका खजाना कभी खाली नहीं होता।',
    drushtiQuality: 'शुभभावना दृष्टि',
    imageTheme: 'divine-heart'
  }
];

export const INITIAL_STUDENTS_PROGRESS: StudentProgressSummary[] = [
  {
    id: 'stud-1',
    phone: '9876543210',
    name: 'राजेश भाई (Rajesh Bhai)',
    centerName: 'शांति निकेतन सेवाकेंद्र, दिल्ली',
    streakDays: 14,
    completedTodayCount: 5,
    activeSanskar: 'क्रोध के स्थान पर धैर्य व शांति',
    unlockedStampsCount: 7,
    lastActive: 'आज, 06:15 AM',
    lastReflection: 'आज कार्यालय में तनाव के बीच 5 सेकंड रुककर शांत रहा। क्रोध को कर्म नहीं बनने दिया।',
    ratingAverage: 4.8,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'stud-2',
    phone: '9812345678',
    name: 'सुनीता बहन (Sunita Behan)',
    centerName: 'शांति सरोवर केंद्र, मुम्बई',
    streakDays: 8,
    completedTodayCount: 4,
    activeSanskar: 'व्यर्थ संकल्पों के स्थान पर समर्थ चिंतन',
    unlockedStampsCount: 5,
    lastActive: 'आज, 07:45 AM',
    lastReflection: 'मन की व्यर्थ रील को फुलस्टॉप लगाया और बाबा के महावाक्यों पर मनन किया।',
    ratingAverage: 4.2,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'stud-3',
    phone: '9798765432',
    name: 'अमित भाई (Amit Bhai)',
    centerName: 'आनंद धाम सेवाकेंद्र, जयपुर',
    streakDays: 21,
    completedTodayCount: 5,
    activeSanskar: 'तुलना व ईर्ष्या के स्थान पर गुण-ग्राहक दृष्टि',
    unlockedStampsCount: 11,
    lastActive: 'आज, 05:30 AM',
    lastReflection: 'दूसरे भाई की विशेषता देखकर सच्ची खुशी अनुभव की और स्वमान में स्थित रहा।',
    ratingAverage: 4.9,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'stud-4',
    phone: '9123456780',
    name: 'प्रियंका बहन (Priyanka Behan)',
    centerName: 'मधुबन वाटिका, पुणे',
    streakDays: 3,
    completedTodayCount: 2,
    activeSanskar: 'आलस्य के स्थान पर अमृतवेले की तत्परता',
    unlockedStampsCount: 3,
    lastActive: 'कल, 09:20 PM',
    lastReflection: 'अमृतवेले थोड़ा खिंचाव रहा लेकिन मुरली क्लास समय पर पूरी की।',
    ratingAverage: 3.8,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_TEACHER_MESSAGES: TeacherMessage[] = [
  {
    id: 'msg-1',
    fromTeacherName: 'बापदादा',
    toStudentId: 'current-user',
    title: 'बापदादा का पावन संदेश एवं दृष्टि',
    messageText: 'मीठे बच्चे, आपके पुरुषार्थ में निरंतरता देखकर बाबा बहुत प्रसन्न हैं। आज विशेष साक्षीपन का अभ्यास करना और हर परिस्थिति में बाबा की छत्रछाया का अनुभव करना।',
    blessingVardan: 'सर्व खजानों से भरपूर, सदा संतुष्ट आत्मा भव।',
    sentAt: 'आज, 08:00 AM',
    read: false
  }
];

export interface SpiritualGyanTopic {
  keywords: string[];
  babaAnswerHi: string;
  babaAnswerEn: string;
  swaman: string;
  murliQuote: string;
  actionHomework: string;
  drishtiQuality: string;
}

export const SPIRITUAL_GYAN_KNOWLEDGE_BASE: SpiritualGyanTopic[] = [
  {
    keywords: ['क्रोध', 'गुस्सा', 'चिड़चिड़ापन', 'anger', 'irritation', 'patience', 'shanti'],
    babaAnswerHi: 'मीठे बच्चे, क्रोध भूत है जो अपनी ही स्थिति को भस्म कर देता है। जब कोई आत्मा विपरीत व्यवहार करे, तो समझो वह किसी संस्कार के वश परेशान है। उस समय आप दाता बनकर उसे शांति की सकाश दो। अपने शांत स्वरूप में टिक जाओ।',
    babaAnswerEn: 'Sweet child, anger burns one’s own elevated stage. When someone behaves negatively, realize that soul is bound by old sanskars. Become a benefactor and send pure vibrations of peace.',
    swaman: 'मैं शांत स्वरूप, सर्व शक्तिमान शिव बाबा का शांतदूत बच्चा हूँ।',
    murliQuote: 'क्रोध पर विजय पाने की विधि है — सहनशीलता और नम्रता का कवच धारण करना। (अव्यक्त वाणी)',
    actionHomework: 'आज जब भी मन में कोई उत्तेजना आए, तुरंत 3 सेकण्ड रुक कर बिंदु रूप स्थिति का अनुभव करें।',
    drishtiQuality: 'शीतल शांत दृष्टि'
  },
  {
    keywords: ['व्यर्थ', 'overthinking', 'चिंता', 'तनाव', 'मन', 'संकल्प', 'stress', 'thoughts', 'fear', 'डर'],
    babaAnswerHi: 'लाडले बच्चे, व्यर्थ संकल्प बुद्धि की शक्ति को चूस लेते हैं। ड्रामा में जो बीत चुका वह कल्याणकारी था, जो हो रहा है वह भी कल्याणकारी है। सब कुछ बाबा के हाथ में सौंप कर हल्के (Double Light) हो जाओ।',
    babaAnswerEn: 'Beloved child, wasteful thinking drains the intellect. Whatever has passed in the drama holds supreme welfare. Surrender all burdens to Baba and become Double-Light.',
    swaman: 'मैं निश्चिंत, विजयी और बाबा की गोदी का बेफिक्र बच्चा हूँ।',
    murliQuote: 'व्यर्थ संकल्पों को समाप्त करने के लिए बुद्धि को सदैव समर्थ चिंतन और सेवा में व्यस्त रखो।',
    actionHomework: 'मन में व्यर्थ संकल्प आते ही "फुलस्टॉप ( . )" लगाएं और 5 बार कहें — "बाबा मेरा, मैं बाबा का"।',
    drishtiQuality: 'निश्चिंत अभय दृष्टि'
  },
  {
    keywords: ['अमृतवेला', 'सुबह', 'नींद', 'आलस्य', 'meditation', 'amritvela', 'laziness', 'wake up'],
    babaAnswerHi: 'मीठे बच्चे, अमृतवेला परमात्म मिलन और वरदान लूटने की वेला है। रात को सोते समय ही बाबा को शुभ संकल्पों का पत्र देकर सोएं और अलवेलेपन को त्यागें। बाबा स्वयं आपको बुलाने आते हैं।',
    babaAnswerEn: 'Sweet child, Amritvela is the divine time of receiving boundless blessings from the Supreme. Sleep with elevated thoughts, and Baba Himself will awaken you with love.',
    swaman: 'मैं अमृतवेले का सच्चा योगी और वरदानी फरिश्ता हूँ।',
    murliQuote: 'अमृतवेला फाउण्डेशन है। जिसका अमृतवेला शक्तिशाली है, उसका सारा दिन स्वतः निर्विघ्न बीतता है।',
    actionHomework: 'आज रात सोने से पहले 10 मिनट बाबा से मीठी बातें करें और ठीक समय पर उठने का दृढ़ संकल्प करें।',
    drishtiQuality: 'उमंग-उत्साह संपन्न दृष्टि'
  },
  {
    keywords: ['संबंध', 'परिवार', 'टकराव', 'रिश्ते', 'बात बुरी लगी', 'relationship', 'family', 'conflict', 'expectation'],
    babaAnswerHi: 'बच्चे, संबंधों में दुख का कारण है "अपेक्षा"। किसी से कुछ लेने की इच्छा रखने के बजाए, सबको शुभभावना और शुभकामनाएं दो। हर आत्मा का अपना पार्ट है, उन्हें स्वीकार करो।',
    babaAnswerEn: 'Child, expectation is the root of sorrow in relations. Instead of seeking respect or love from others, become a giver of good wishes and pure vibrations.',
    swaman: 'मैं सर्व आत्माओं का शुभचिंतक, कल्याणकारी और स्नेही आत्मा हूँ।',
    murliQuote: 'गुण-ग्राहक बनो, किसी के अवगुणों को मन में न समाओ। जो अवगुण देखता है वह स्वयं भारी हो जाता है।',
    actionHomework: 'जिस व्यक्ति से खिंचाव हो, उसके 3 विशेष गुण याद कर आज उसे मन से क्षमा और दुआएं दें।',
    drishtiQuality: 'निःस्वार्थ प्रेम व रहम की दृष्टि'
  },
  {
    keywords: ['तुलना', 'ईर्ष्या', 'अहंकार', 'मान', 'सम्मान', 'ego', 'jealousy', 'comparison', 'respect'],
    babaAnswerHi: 'मीठे बच्चे, आप बाबा के नयनों के सितारे हो। आपकी अपनी विशिष्ट विशेषता है, किसी से तुलना करके अपने स्वमान को मत गिराओ। मान मांगना भिखारीपन है, स्वमान में रहना राजाई है।',
    babaAnswerEn: 'Sweet child, you are the jewel of Baba’s eyes. You have unique spiritual virtues. Asking for regard is begging; staying in self-respect is royal sovereignty.',
    swaman: 'मैं स्वराज्य अधिकारी, स्वमान के आसन पर विराजमान राजऋषि हूँ।',
    murliQuote: 'सच्चा मान वह है जो निराकारी और निरहंकारी बनकर सर्व की दुआएं प्राप्त करे।',
    actionHomework: 'आज सारा दिन किसी की प्रशंसा सुनकर ईर्ष्या नहीं, बल्कि "वाह ड्रामा वाह" कहकर दिल से खुशी मनाएं।',
    drishtiQuality: 'निरहंकारी नम्र दृष्टि'
  },
  {
    keywords: ['निराशा', 'उदास', 'कमजोरी', 'उमंग', 'sadness', 'depression', 'weakness', 'hopeless'],
    babaAnswerHi: 'बच्चे, सर्वशक्तिमान का बच्चा कभी कमजोर या निराश नहीं हो सकता। माया का काम है हिलाना, और बच्चे का काम है अचल-अडोल रहना। बाबा की भुजाओं में समा जाओ, सारा भारीपन समाप्त हो जाएगा।',
    babaAnswerEn: 'Child, the progeny of the Almighty can never be weak. Maya’s duty is to test, and your duty is to remain unshakeable. Melt into Baba’s embrace and be refreshed.',
    swaman: 'मैं मास्टर सर्वशक्तिमान, विजय मेरा जन्मसिद्ध अधिकार है।',
    murliQuote: 'सदा खुशी में नाचते रहो, उदासी ज्ञान मार्ग का सबसे बड़ा विघ्न है।',
    actionHomework: 'अभी 2 मिनट के लिए अपने प्रकाशमय फरिश्ते स्वरूप को देखें और बाबा के साथ कम्बाइंड स्थिति का अनुभव करें।',
    drishtiQuality: 'शक्तियों की सकाश दृष्टि'
  }
];

export function getBabaSpiritualAnswer(query: string, language: string = 'hi') {
  const lower = query.toLowerCase();
  
  // Find best matched topic
  let matched = SPIRITUAL_GYAN_KNOWLEDGE_BASE.find(topic =>
    topic.keywords.some(kw => lower.includes(kw.toLowerCase()))
  );

  if (!matched) {
    matched = {
      keywords: [],
      babaAnswerHi: `मीठे बच्चे, आपके मन की हर बात बाबा तक पहुँचती है। इस समय परिस्थिति पर नहीं, अपनी स्वस्थिति पर ध्यान दो। आप देह नहीं, चमकती हुई पवित्र आत्मा हो। सब कुछ बाबा के अर्पण कर निश्चिंत हो जाओ।`,
      babaAnswerEn: `Sweet child, every thought in your pure heart reaches Baba. Focus on your inner soul consciousness rather than external situations. Surrender all to Baba and remain peaceful.`,
      swaman: 'मैं बाबा का लाडला, शांत और पवित्र स्वरूप फरिश्ता हूँ।',
      murliQuote: 'याद रखो, जो बच्चे बाप के बनकर रहते हैं, उनका हर कदम कल्याणकारी होता है। (मुरली)',
      actionHomework: 'आज दिनभर में 5 बार 1-1 मिनट के लिए ट्रैफिक कंट्रोल कर बापदादा के स्नेह में लीन हो जाएं।',
      drishtiQuality: 'परम पवित्र सकाश दृष्टि'
    };
  }

  return {
    id: `baba-ans-${Date.now()}`,
    sender: 'baba' as const,
    text: language === 'en' ? matched.babaAnswerEn : matched.babaAnswerHi,
    swaman: matched.swaman,
    murliQuote: matched.murliQuote,
    actionHomework: matched.actionHomework,
    drishtiQuality: matched.drishtiQuality,
    timestamp: 'अभी (Now)'
  };
}
