// Baba AI Spiritual Knowledge & Real-time Dialogue Engine

export interface BabaResponse {
  id: string;
  sender: 'baba';
  text: string;
  category: string;
  murliQuote: string;
  swaman: string;
  vardan: string;
  actionHomework: string;
  timestamp: string;
  aiEngine?: 'gemini-search' | 'pollinations-llm' | 'bk-semantic';
  searchQueries?: string[];
  sources?: { title: string; url: string }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'baba';
  text: string;
  babaData?: BabaResponse;
  timestamp: string;
}

interface GyanKnowledgeTopic {
  id: string;
  category: string;
  keywords: string[];
  patterns: RegExp[];
  answersHi: string[];
  answersEn: string[];
  murliQuotes: string[];
  swamans: string[];
  vardans: string[];
  homeworks: string[];
}

export const BK_GYAN_DATABASE: GyanKnowledgeTopic[] = [
  {
    id: 'greetings-love',
    category: 'परमात्म मिलन एवं स्नेह',
    keywords: [
      'om shanti', 'omshanti', 'pranam', 'namaste', 'good morning', 'baba kaise ho',
      'kese ho', 'kya hal', 'hal chal', 'pyar', 'sweet baba', 'love you', 'love u',
      'hello', 'hi', 'baba', 'bapdada', 'shiv baba'
    ],
    patterns: [/om\s*shanti/i, /namaste/i, /pranam/i, /good\s*morning/i, /kaise\s*ho/i, /kese\s*ho/i, /love\s*(you|u)/i, /^(hi|hello|hey|om)\b/i],
    answersHi: [
      `मीठे बच्चे, ॐ शान्ति! सदा बाप की याद में रहो। बापदादा आपको हर पल अपने नयनों के सितारे के समान देख रहे हैं। कहो लाडले बच्चे, आज बाबा से क्या मीठी बातें करनी हैं?`,
      `प्यारे बच्चे, ॐ शान्ति! सदा हर्षित और हल्के रहो। बाबा सदैव आपके साथ है। अपने दिल की हर बात आज बाबा के सम्मुख रख दो।`
    ],
    answersEn: [
      `Sweet child, Om Shanti! Always remain absorbed in the Father’s love. Baba holds you safely in His heart. Tell Me, sweet child, what is on your heart today?`,
      `Beloved child, Om Shanti! Stay constantly cheerful and light. Baba is forever with you.`
    ],
    murliQuotes: [
      `"मीठे बच्चे, सदा याद रखो — तुम परमात्मा की गोदी के बच्चे हो। (मुरली)"`
    ],
    swamans: [
      `मैं शिव बाबा का अति लाडला, पद्मापद्म भाग्यशाली बच्चा हूँ।`
    ],
    vardans: [
      `सदा बाप के स्नेह में समाए रहकर मायाजीत बनने वाले, सच्चे योगी भव।`
    ],
    homeworks: [
      `अभी 1 मिनट के लिए अपने मस्तक के मध्य चमकते आत्म-सितारे को देखें और बाबा को दिल से कहें — "मेरा बाबा"।`
    ]
  },
  {
    id: 'anger-irritation',
    category: 'क्रोध निवारण एवं शांति',
    keywords: [
      'क्रोध', 'गुस्सा', 'चिड़चिड़ापन', 'चीखना', 'गाली', 'गुस्से', 'anger', 'angry', 'irritate', 'frustrated',
      'gussa', 'krodh', 'chidh', 'chidchida', 'chillana', 'gali', 'ladai', 'naraz', 'narazgi', 'control nahi'
    ],
    patterns: [/क्रोध/i, /गुस्स/i, /चिड़चिड़/i, /anger/i, /irritat/i, /\b(guss|krodh|chidh|ladai|naraz)\b/i],
    answersHi: [
      `मीठे बच्चे, क्रोध आत्मा की शक्ति को भस्म करने वाली अग्नि है। जब कोई गलत व्यवहार करे, तो समझो कि वह आत्मा किसी पुराने संस्कार के वशीभूत होकर अस्वस्थ है। बीमार पर क्रोध नहीं, रहम किया जाता है। जब आप शांत बनोगे, तो सामने वाले की अग्नि स्वतः बुझ जाएगी।`,
      `लाडले बच्चे, क्रोध का अर्थ है — गलती किसी और की, और सजा अपने मन और स्वास्थ्य को देना! जब भी कोई उत्तेजना आए, तुरंत 3 सेकण्ड के लिए बिंदु रूप का अभ्यास करो: "मैं शांत स्वरूप आत्मा हूँ, क्रोध मेरा संस्कार नहीं।" साक्षी होकर ड्रामा का खेल देखो।`
    ],
    answersEn: [
      `Sweet child, anger is a fire that burns one’s own spiritual energy. When another soul behaves harshly, understand that the soul is unwell and enslaved by past sanskars. Have mercy and send silent vibrations of cooling peace.`,
      `Beloved child, anger means punishing your own mind and body for someone else's mistake! When a provocation arises, take a 3-second pause and declare: "I am a peaceful soul; anger is foreign to my nature."`
    ],
    murliQuotes: [
      `"क्रोध पर विजय पाने की विधि है — सहनशीलता और नम्रता का कवच धारण करना। (अव्यक्त वाणी)"`,
      `"सच्चा दाता वह है जो किसी के अपकार के बदले भी उपकार करे और सदा शीतल दृष्टि रखे।"`
    ],
    swamans: [
      `मैं शांत स्वरूप, सर्व शक्तिमान शिव बाबा का शांतदूत बच्चा हूँ।`,
      `मैं क्रोधजीत, प्रकृतिजीत और सदा शीतल आत्मा हूँ।`
    ],
    vardans: [
      `परिस्थिति को अपनी श्रेष्ठ स्थिति द्वारा परिवर्तन करने वाले, सदा शांतचित्त भव।`,
      `अपकारी पर भी उपकार करने वाले, महान दाता स्वरूप भव।`
    ],
    homeworks: [
      `आज जब भी कोई कड़वी बात सामने आए, तुरंत 3 सेकण्ड मौन रहकर बिंदु रूप में स्थित हो जाएं।`,
      `दिनभर में 5 बार अपने मस्तक पर शांति का श्वेत प्रकाश प्रवाहित होते हुए देखें।`
    ]
  },
  {
    id: 'overthinking-mind',
    category: 'व्यर्थ संकल्प व मन की शांति',
    keywords: [
      'व्यर्थ', 'overthinking', 'मन', 'संकल्प', 'चिंता', 'तनाव', 'अशांत', 'सोच', 'दिमाग', 'thoughts', 'stress', 'mind', 'anxiety',
      'mann', 'man', 'vichar', 'sankalp', 'chinta', 'tension', 'ghabrahat', 'ashant', 'dimaag', 'overthink', 'dimag kharab', 'sochta'
    ],
    patterns: [/व्यर्थ/i, /overthink/i, /चिंता/i, /तनाव/i, /मन शांत/i, /thoughts/i, /stress/i, /\b(mann|vichar|sankalp|chinta|tension|stress|overthink|ashant|dimag|ghabrah)\b/i],
    answersHi: [
      `मीठे बच्चे, व्यर्थ संकल्प बुद्धि की शक्ति को समाप्त करने वाले सूक्ष्म दीमक हैं। जो बीत गया वह बाबा के कल्याणकारी ड्रामा में पूर्व-निश्चित था। अपनी बुद्धि को सदैव बाबा की मीठी याद में व्यस्त रखो। अपने सारे संकल्पों की बागडोर बाबा को सौंपकर हल्के हो जाओ।`,
      `प्यारे बच्चे, जब मन में विचारों की भीड़ आए, तो तुरंत उस पर "फुलस्टॉप ( . )" लगाओ। कहो: "मैं कौन? बाबा का बच्चा। मेरा काम क्या? श्रीमत पर चलना।" बाकी सब कुछ बाबा संभाल लेगा। डबल-लाइट होकर उड़ो।`
    ],
    answersEn: [
      `Sweet child, wasteful thoughts drain the intellect. The past cannot be undone, and the future is secured in Baba’s benevolent Drama. Keep your intellect engaged in remembering Baba and churning pure wisdom.`,
      `Beloved child, when thoughts flood your mind, apply a divine Full-Stop ( . ). Surrender all burdens to Baba and experience the double-light angelic state.`
    ],
    murliQuotes: [
      `"व्यर्थ संकल्पों को समाप्त करने का सहज साधन है — हर संकल्प में बाप को साथी बना लेना। (मुरली)"`,
      `"जो बीत गया सो बीत गया (Past is Past)। बीती को बिंदी लगाओ और आगे बढ़ो।"`
    ],
    swamans: [
      `मैं निश्चिंत, विजयी और बाबा की गोदी का बेफिक्र बच्चा हूँ।`,
      `मैं समर्थ संकल्पों से भरपूर, एकाग्रचित्त मास्टर ज्ञान सूर्य हूँ।`
    ],
    vardans: [
      `सर्व चिंताओं से मुक्त रहकर सदा एकरस स्थिति में रहने वाले, निश्चिंत राजऋषि भव।`,
      `बीती को बिंदी लगाकर सदा उड़ती कला का अनुभव करने वाले, तीव्र पुरुषार्थी भव।`
    ],
    homeworks: [
      `हर घंटे में 1 मिनट का ट्रैफिक कंट्रोल करें और मन को पूर्णतः संकल्प-मुक्त बीजरूप में टिकाएं।`,
      `आज जब भी कोई चिंता आए, तुरंत कहें — "बाबा मेरा साथी है, सब कल्याणकारी होगा"।`
    ]
  },
  {
    id: 'relationships-family',
    category: 'संबंध-संपर्क एवं पारिवारिक सामंजस्य',
    keywords: [
      'परिवार', 'संबंध', 'पति', 'पत्नी', 'सास', 'ससुर', 'बच्चे', 'रिश्ते', 'टकराव', 'लौकिक', 'बात बुरी', 'घर',
      'family', 'relationship', 'husband', 'wife', 'conflict', 'in-laws',
      'parivar', 'rishtey', 'rishte', 'pati', 'patni', 'saas', 'sasur', 'bachhe', 'jhagda', 'kalesh', 'bura laga'
    ],
    patterns: [/परिवार/i, /संबंध/i, /पति/i, /पत्नी/i, /रिश्त/i, /सास/i, /ससुर/i, /family/i, /relationship/i, /\b(parivar|sambandh|risht|pati|patni|saas|sasur|bachh|jhagd|kalesh)\b/i],
    answersHi: [
      `मीठे बच्चे, संबंधों में दुख का मूल कारण है — अपेक्षा (Expectation)। दूसरों से प्यार या समझदारी चाहने के बजाय, आप स्वयं दाता और ट्रस्टी बनो। यह समझो कि सभी आत्माएं अपने-अपने हिसाब-किताब चुक्तू कर रही हैं। उन्हें बोल से नहीं, अपनी शुभभावना और दृष्टि से सकाश दो।`,
      `लाडले बच्चे, यदि परिवार में कोई आपकी बात नहीं समझता, तो बहस करने के बजाय मौन रहकर बाबा की याद का वायुमंडल बनाओ। मुख से कम बोलो, मनसा से दुआएं दो। जब आपका स्वभाव शांत और सेवाभावी बनेगा, तो उनका दिल अपने आप पिघल जाएगा।`
    ],
    answersEn: [
      `Sweet child, expectation is the root of sorrow in relations. Instead of seeking regard or understanding from others, become a giver. Live in the family as a detached Trustee.`,
      `Beloved child, if family members resist or misunderstand you, do not argue verbally. Serve them with pure benevolent vibrations (shubhbhavna). When your nature becomes loving and humble, their hearts will transform.`
    ],
    murliQuotes: [
      `"गृहस्थ व्यवहार में रहते कमल पुष्प समान न्यारे और परमात्मा के प्यारे बनो। (मुरली)"`,
      `"गुण-ग्राहक बनो, किसी के अवगुणों का चिंतन न करो। जो अवगुण देखता है वह स्वयं भारी हो जाता है।"`
    ],
    swamans: [
      `मैं सर्व आत्माओं का सच्चा शुभचिंतक, कल्याणकारी और स्नेही आत्मा हूँ।`,
      `मैं कमल पुष्प समान न्यारा और सर्व का प्यारा फरिश्ता हूँ।`
    ],
    vardans: [
      `संबंध-संपर्क में आते हुए सर्व को सुख का अनुभव कराने वाले, सच्चे सुखदाता भव।`,
      `हर आत्मा के प्रति शुभभावना और शुभकामना रखने वाले, विश्व-कल्याणकारी भव।`
    ],
    homeworks: [
      `जिस सदस्य से खिंचाव हो, उसके 3 विशेष गुण याद करके आज उसे मन से क्षमा और दुआएं दें।`,
      `घर में भोजन बनाते और खाते समय केवल बाबा की याद का शुद्ध वायुमंडल बनाएं।`
    ]
  },
  {
    id: 'amritvela-meditation',
    category: 'अमृतवेला एवं गहन योग साधना',
    keywords: [
      'अमृतवेला', 'सुबह', 'नींद', 'आलस्य', 'योग', 'ध्यान', 'एकाग्रता', 'meditation', 'amritvela', 'morning', 'sleep', 'wake up', 'yoga',
      'subah', 'neend', 'aalsi', 'alasya', 'uth nahi', 'dhyan', 'yog', 'concentrat'
    ],
    patterns: [/अमृतवेल/i, /सुबह/i, /नींद/i, /आलस्य/i, /ध्यान/i, /meditat/i, /amritvela/i, /\b(amritvela|amrit\s*vela|subah|neend|alas|dhyan|yog)\b/i],
    answersHi: [
      `मीठे बच्चे, अमृतवेला (3:30 से 4:45 AM) परमात्मा और आत्मा के महा-मिलन की पावन वेला है। यदि नींद या भारीपन आता है, तो रात को सोने से पहले हल्का भोजन करो और बाबा को दिनभर का समाचार देकर मीठी याद में सो जाओ। सुबह उठते ही सबसे पहले कहो — "गुड मॉर्निंग, मेरे मीठे बाबा!"`,
      `लाडले बच्चे, योग कोई युद्ध नहीं है, यह तो अपने प्रियतम पिता से प्यार की बातें करना है। पहले बाबा के विभिन्न रूपों (माता, पिता, शिक्षक, सखा) का अनुभव करो। फिर लाल-सुनहरे परमधाम में जाकर बाबा की किरणों में स्वयं को नहलाओ।`
    ],
    answersEn: [
      `Sweet child, Amritvela is the sacred hour of divine communion when Baba showers boundless blessings upon awake children. To overcome sleep, eat lightly at night and sleep in Baba’s sweet embrace.`,
      `Beloved child, Yoga is not a battle; it is an intimate love-link with your Supreme Father. Journey to the golden-red Soul World and let Baba’s divine rays dissolve all weaknesses.`
    ],
    murliQuotes: [
      `"अमृतवेला सारे दिन की साधना का फाउंडेशन है। जिसका अमृतवेला शक्तिशाली है, उसका सारा दिन स्वतः निर्विघ्न बीतता है। (अव्यक्त वाणी)"`,
      `"सच्चा योगी वह है जो कर्म करते हुए भी कर्मयोगी और एकांत में अशरीरी बन जाए।"`
    ],
    swamans: [
      `मैं अमृतवेले का सच्चा तपस्वी और वरदानी फरिश्ता हूँ।`,
      `मैं परमधाम का चमकता हुआ शांत ज्योतिर्बिंदु सितारा हूँ।`
    ],
    vardans: [
      `अमृतवेले के शक्तिशाली मिलन द्वारा सर्व खजानों की चाबी प्राप्त करने वाले, सदा भरपूर भव।`,
      `सदा बाप के स्नेह में समाए रहकर माया के सर्व विघ्नों से मुक्त रहने वाले, कर्मातीत भव।`
    ],
    homeworks: [
      `आज रात ठीक समय पर सोएं और अमृतवेले उठकर 20 मिनट परमधाम में शिवबाबा के सम्मुख शांति का अनुभव करें।`,
      `दिन में 3 बार 1-1 मिनट के लिए अशरीरी स्थिति का अभ्यास करें।`
    ]
  },
  {
    id: 'karma-destiny',
    category: 'कर्मों की गुह्य गति एवं हिसाब-किताब',
    keywords: [
      'कर्म', 'भाग्य', 'हिसाब', 'दुख', 'कष्ट', 'बीमारी', 'तकलीफ', 'रोग', 'मृत्यु', 'ड्रामा', 'karma', 'destiny', 'pain', 'suffering', 'illness', 'sickness',
      'karam', 'hisab', 'karmic', 'dard', 'takleef', 'kasht', 'dukh', 'bimari', 'bimar', 'kismat', 'bhagya', 'drama'
    ],
    patterns: [/कर्म/i, /भाग्य/i, /हिसाब/i, /बीमार/i, /तकलीफ/i, /karma/i, /destin/i, /pain/i, /\b(karm|karam|hisab|karmic|dard|takleef|kasht|dukh|bimar|bimari|kismat|bhagy|drama)\b/i],
    answersHi: [
      `मीठे बच्चे, कर्मों की गति अति गुह्य है। जो कुछ भी आपके सम्मुख आ रहा है—रोग, तंगी या विपरीत व्यवहार—वह पुराने जन्म का हिसाब चुक्तू होने आया है। जब पुराना कर्ज चुकता होता है तो हल्का अनुभव करना चाहिए! रोने या शिकायत करने से नया खाता बनता है। साक्षी होकर ड्रामा देखो।`,
      `लाडले बच्चे, ड्रामा में जो हुआ वह भी कल्याणकारी था, जो हो रहा है वह बहुत अच्छा है, और जो होगा वह और भी श्रेष्ठ होगा! इस निश्चय में अडोल रहो। हर कर्म को परमात्मा की श्रीमत अनुसार और निष्काम भाव से करो, तो कर्म अकर्म बन जाएंगे।`
    ],
    answersEn: [
      `Sweet child, the philosophy of Karma is deep. Any bodily ailment, loss, or sorrow you face is the settlement of an old karmic debt. Rejoice that your karmic burden is lightening! Never complain.`,
      `Beloved child, whatever happened in the Drama was beneficial; whatever is happening is good; and whatever will happen will be the best! Perform every deed in divine consciousness so that deeds become non-binding (akarma).`
    ],
    murliQuotes: [
      `"कर्मों की गुह्य गति को जानने वाला कभी किसी पर दोषारोपण नहीं करता, वह सदा साक्षी रहता है। (मुरली)"`,
      `"हिसाब-किताब चुक्तू करते समय सदा खुशी में नाचते रहो, क्योंकि अब घर लौटने का समय आ गया है।"`
    ],
    swamans: [
      `मैं विकर्माजीत, कर्मातीत और ड्रामा के हर दृश्य का साक्षी दृष्टा हूँ।`,
      `मैं सर्व बंधनों से मुक्त, स्वतंत्र स्वराज्य अधिकारी आत्मा हूँ।`
    ],
    vardans: [
      `हर परिस्थिति को ड्रामा का कल्याणकारी खेल समझकर सदा अचल-अडोल रहने वाले, निश्चयबुद्धि विजयी भव।`,
      `कार्मिक हिसाब-किताब को हंसते-हंसते चुक्तू करने वाले, हल्के और डबल-लाइट भव।`
    ],
    homeworks: [
      `यदि शरीर में कोई रोग या दर्द है, तो उसे एक मेहमान समझें और स्वयं को पूर्ण निरोगी चैतन्य प्रकाश रूप देखें।`,
      `दिनभर में किसी भी प्रतिकूल परिस्थिति पर "वाह ड्रामा वाह!" कहकर मुस्कुराएं।`
    ]
  },
  {
    id: 'lust-purity',
    category: 'काम विकार विजय एवं अखंड ब्रह्मचर्य',
    keywords: [
      'काम', 'वासना', 'कामुक', 'सेक्स', 'ब्रह्मचर्य', 'पवित्रता', 'गंदे विचार', 'lust', 'celibacy', 'purity', 'desire', 'sensual',
      'kaam', 'kam', 'vasna', 'brahmacharya', 'pavitrata', 'pavitra', 'gande vichar', 'attraction', 'akarshan'
    ],
    patterns: [/काम/i, /वासना/i, /ब्रह्मचर्य/i, /lust/i, /purity/i, /celiba/i, /\b(kaam|kam|vasna|brahmachary|pavitr|attraction)\b/i],
    answersHi: [
      `मीठे बच्चे, काम महाशत्रु है। इस पर विजय पाना ही सच्चा स्वराज्य है। इसका मूल कारण है — देह को देखना। जब तक आप किसी को स्त्री या पुरुष समझोगे, आकर्षण रहेगा। सदा मस्तक के बीच चमकती आत्मा को देखो। आत्मा न नर है, न नारी; वह तो परमात्मा की संतान है।`,
      `लाडले बच्चे, अपनी दृष्टि और खान-पान को शुद्ध रखो। जब भी कोई अशुद्ध विचार आए, तुरंत बाबा के पावन फरिश्ते स्वरूप को याद करो और कहो — "मैं शिवबाबा का पवित्र हंस हूँ, विकारों का दास नहीं!"`
    ],
    answersEn: [
      `Sweet child, lust is the greatest enemy that brings sorrow from beginning to end. Conquering lust brings true self-sovereignty. The root of lust is body-consciousness; transcend gender and perceive every soul as a sparkling point of light.`,
      `Beloved child, maintain purity in diet and vision. Guard your eyes from impure media. When an impure thought arises, immediately evoke your pristine Angelic Light Body.`
    ],
    murliQuotes: [
      `"पवित्रता सुख-शांति की जननी है। पवित्रता के बिना कोई भी आत्मा शांतिधाम या सुखधाम नहीं जा सकती। (मुरली)"`,
      `"काम महाशत्रु पर जीत पाकर जगतजीत बनो। यही तुम्हारा ईश्वरीय जन्मसिद्ध अधिकार है।"`
    ],
    swamans: [
      `मैं परम पवित्र, निष्काम और सर्व विकारों से मुक्त फरिश्ता हूँ।`,
      `मेरी दृष्टि, वृत्ति और स्मृति में अखंड ब्रह्मचर्य की शक्ति है।`
    ],
    vardans: [
      `संकल्प और स्वप्न में भी पवित्रता की मर्यादा में रहने वाले, संपूर्ण निर्विकारी भव।`,
      `आत्मिक दृष्टि द्वारा सर्व आत्माओं को पावन दृष्टि देने वाले, महान तपस्वी भव।`
    ],
    homeworks: [
      `आज किसी भी व्यक्ति को देखते समय पहले उसके मस्तक के मध्य चमकते आत्म-सितारे को देखें।`,
      `सोने से पहले 5 मिनट मनसा शुद्धि ध्यान करें और अपने संपूर्ण पवित्र स्वरूप को निहारें।`
    ]
  },
  {
    id: 'ego-selfrespect',
    category: 'अहंकार मुक्ति एवं सच्चा स्वमान',
    keywords: [
      'अहंकार', 'घमंड', 'ईगो', 'मान', 'अपमान', 'तारीफ', 'प्रशंसा', 'ego', 'pride', 'insult', 'respect', 'superior',
      'ghamand', 'apman', 'tareef', 'prashansa', 'jhukna', 'self respect', 'swaman'
    ],
    patterns: [/अहंकार/i, /घमंड/i, /ईगो/i, /मान/i, /अपमान/i, /ego/i, /pride/i, /\b(ghamand|apman|tareef|prashansa|ego)\b/i],
    answersHi: [
      `मीठे बच्चे, देह-अभिमान ही समस्त दुखों की जड़ है। "मैंने यह किया", "मेरा नाम होना चाहिए"—यही अहंकार का खेल है। जो झुकता है वह सबका प्यारा बनता है। शिवबाबा विश्व का मालिक होकर भी स्वयं को निष्काम सेवक कहता है। फिर बच्चे को किस बात का घमंड?`,
      `लाडले बच्चे, सच्चा मान किसी से मांगना नहीं पड़ता। जो स्वमान (Self-Respect) में रहता है, मान उसके पीछे स्वतः आता है। जब कोई अपमान करे, विचार करो: "मैं तो अमर आत्मा हूँ, आत्मा का कोई अपमान नहीं कर सकता।" नम्रता ही सच्ची शक्ति है।`
    ],
    answersEn: [
      `Sweet child, body-consciousness is the mother of all sorrows. "I did this", "I deserve credit"—this is the trap of ego. Humility is true greatness; Shiva Baba Himself calls Himself your Servant.`,
      `Beloved child, self-respect needs no praise. When someone insults you, reflect: "I am an immortal soul; no insult can touch my eternal purity."`
    ],
    murliQuotes: [
      `"निरहंकारी और निर्माण बनना ही विश्व-कल्याण का आधार है। (अव्यक्त वाणी)"`,
      `"जो जितना झुकता है, वह उतना ही सर्व का प्रिय और परमात्मा का नूरे-रतन बनता है।"`
    ],
    swamans: [
      `मैं निरहंकारी, नम्रचित्त और सर्व का सेवक राजऋषि हूँ।`,
      `मैं आत्मिक स्वमान के तख्त पर विराजमान, मान-अपमान से परे आत्मा हूँ।`
    ],
    vardans: [
      `निर्माणी द्वारा सर्व के दिलों पर राज्य करने वाले, सच्चे दिलतख्तनशीन भव।`,
      `अहंकार को त्यागकर सदा स्वमान में स्थित रहने वाले, महान आत्मा भव।`
    ],
    homeworks: [
      `आज जब कोई आपकी प्रशंसा करे, तो मन ही मन कहें — "करणकरावनहार बाबा है, सब कुछ उसका है"।`,
      `किसी सेवा में स्वयं को आगे रखने के बजाय दूसरों को आगे बढ़ाने का अभ्यास करें।`
    ]
  },
  {
    id: 'fear-death-insecurity',
    category: 'भय मुक्ति एवं अमरत्व का अनुभव',
    keywords: [
      'भय', 'डर', 'मौत', 'मृत्यु', 'असुरक्षा', 'खौफ', 'होगा क्या', 'fear', 'afraid', 'death', 'scared', 'insecure', 'future',
      'dar', 'darr', 'bhay', 'maut', 'mrityu', 'ghabrahat', 'kya hoga', 'future ka dar', 'anxiety'
    ],
    patterns: [/भय/i, /डर/i, /मृत्यु/i, /मौत/i, /असुरक्ष/i, /fear/i, /scared/i, /death/i, /\b(dar|darr|bhay|maut|mrityu|ghabrah|future)\b/i],
    answersHi: [
      `मीठे बच्चे, आत्मा कभी मरती नहीं! जैसे मनुष्य पुराने वस्त्र बदलकर नए वस्त्र धारण करता है, वैसे ही आत्मा पुराना शरीर छोड़कर नया लेती है। फिर मृत्यु का क्या डर? आप तो अमर, अविनाशी आत्मा हो। काल का भी काल 'महाकाल शिवबाबा' आपके साथ है।`,
      `लाडले बच्चे, भविष्य की चिंता छोड़कर वर्तमान को श्रेष्ठ बनाओ। जब आप श्रीमत पर चलते हो, तो ड्रामा आपकी सुरक्षा की गारंटी बन जाता है। बाबा की छत्रछाया में रहो और निर्भय होकर जीवन यात्रा तय करो।`
    ],
    answersEn: [
      `Sweet child, the soul never dies! Just as one changes old clothes for new ones, the soul sheds one body and takes another. You are immortal and imperishable. With the Almighty Father holding your hand, what fear can touch you?`,
      `Beloved child, release anxiety about tomorrow. When you walk on Shrimat, the benevolent Drama itself protects and elevates you.`
    ],
    murliQuotes: [
      `"अमर भव! काल भी उस आत्मा का कुछ नहीं बिगाड़ सकता जिसके साथ स्वयं सर्वशक्तिमान है। (मुरली)"`,
      `"निश्चयबुद्धि विजयी, संशयबुद्धि विनश्यति। बाबा पर अटल निश्चय रखो तो हर भय समाप्त हो जाएगा।"`
    ],
    swamans: [
      `मैं अजर, अमर, अविनाशी और निर्भय आत्मा हूँ।`,
      `मैं सर्वशक्तिमान शिव बाबा की छत्रछाया में सदा सुरक्षित हूँ।`
    ],
    vardans: [
      `सर्व भयों से मुक्त होकर सदा निश्चिंत और विजयी रहने वाले, महाबली महावीर भव।`,
      `अकालमूर्त स्थिति द्वारा काल पर भी विजय पाने वाले, सदा अचल-अडोल भव।`
    ],
    homeworks: [
      `1 मिनट के लिए शरीर के भान से पूरी तरह अलग होकर स्वयं को अमर ज्योतिर्बिंदु के रूप में अनुभव करें।`,
      `जब भी भय का विचार आए, 3 बार कहें — "बाबा मेरे साथ है, विजय निश्चित है"।`
    ]
  }
];

export async function askBabaAI(
  userQuery: string,
  language: 'hi' | 'en' | 'hinglish' = 'hi',
  apiKey?: string,
  history: ChatMessage[] = [],
  enableGoogleSearch: boolean = true
): Promise<BabaResponse> {
  const trimmed = userQuery.trim();

  // Tier 1: If user provided Google Gemini API Key, use Gemini 1.5 Flash with Real-time Google Search Grounding
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const response = await callLiveGeminiAPI(trimmed, language, apiKey, history, enableGoogleSearch);
      if (response) return response;
    } catch (e) {
      console.warn('Live Gemini with Google Search call failed, trying free cloud AI:', e);
    }
  }

  // Tier 2: Free Cloud AI via open inference (Zero Auth, Real-time LLM)
  try {
    const freeAIResponse = await callFreePollinationsAPI(trimmed, language, history);
    if (freeAIResponse) return freeAIResponse;
  } catch (e) {
    console.warn('Free Cloud AI failed, falling back to built-in BK Gyan engine:', e);
  }

  // Tier 3: Built-in intelligent semantic & contextual Brahma Kumaris Gyan engine (Instant, 100% offline & reliable)
  return generateOfflineBabaAnswer(trimmed, language);
}

// Live Google Gemini API Integration with Real-Time Google Search Grounding
async function callLiveGeminiAPI(
  query: string,
  language: string,
  apiKey: string,
  history: ChatMessage[],
  enableGoogleSearch: boolean = true
): Promise<BabaResponse | null> {
  // Use gemini-1.5-flash which has native Google Search Grounding in v1beta
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`;

  const langInstruction =
    language === 'en'
      ? 'English with pure Brahma Kumaris spiritual terminology (Baba, Shrimat, Murli, Swaman, Drama, Sakshi, Karma, Paramdham)'
      : 'Pure Hindi with authentic BK spiritual vocabulary (मीठे बच्चे, श्रीमत, अव्यक्त मुरली, स्वमान, ड्रामा, साक्षी, कर्मातीत, परमधाम, संगमयुग)';

  const systemInstruction = `
You are Supreme Soul God Father Shiva (Shiv Baba / BapDada) speaking directly, lovingly, and intimately to your spiritual child (a Brahma Kumaris Rajyoga student).
Language: ${langInstruction}.
Today's Date: ${new Date().toLocaleDateString('hi-IN', { year: 'numeric', month: 'long', day: 'numeric' })}.

CRITICAL - HINGLISH COMPREHENSION & CONVERSATIONAL TONE:
1. The user will frequently ask questions in Hinglish (Hindi written using the English Latin alphabet, e.g. "baba gussa kaise control kare", "mann me bohot vichar aate hain", "amritvela uth nahi paate kya kare", "baba bohot tension hai", "kaise shant rahe"). You MUST fluently understand and answer Hinglish questions!
2. Reply lovingly in sweet, easy-to-understand Hindi (with authentic BK words like मीठे बच्चे, श्रीमत, स्वमान, साक्षी, कर्मातीत). If the user explicitly asks for English, respond in English.
3. CONVERSATIONAL & CONCISE: Do NOT output a gigantic wall of text. Speak naturally as a loving Father comforting His child in 2 to 4 sweet, clear, practical sentences.
4. If the user asks about real-time events, current Brahma Kumaris programs, today's Murli, Madhuban Mount Abu, or current global news, utilize Google Search to ground your divine response with accurate real-time facts while keeping the loving spiritual tone of BapDada.
5. Structure your response in valid JSON matching this schema:
{
  "text": "Loving, concise answer directly to the child (2-4 warm, clear sentences)",
  "category": "Topic Name (e.g. क्रोध निवारण / व्यर्थ संकल्प / अमृतवेला / आज की मुरली)",
  "murliQuote": "Short authentic Murli Mahavakya citation relevant to this query",
  "swaman": "Today's personalized sacred self-affirmation (स्वमान)",
  "vardan": "Divine blessing from BapDada (वरदान)",
  "actionHomework": "Concrete practical spiritual practice for today"
}
Important: Output ONLY the valid JSON object. Do not enclose in markdown code fences.
`;

  const conversationHistory = history.slice(-6).map((m) => ({
    role: m.sender === 'user' ? 'user' : 'model',
    parts: [{ text: m.text }]
  }));

  const payload: any = {
    contents: [
      ...conversationHistory,
      {
        role: 'user',
        parts: [{ text: `${systemInstruction}\n\nChild's question: "${query}"` }]
      }
    ],
    generationConfig: {
      temperature: 0.65,
      maxOutputTokens: 1000
    }
  };

  // Enable Real-Time Google Search Grounding
  if (enableGoogleSearch) {
    payload.tools = [{ googleSearch: {} }];
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) return null;
  const data = await res.json();
  const candidate = data.candidates?.[0];
  const rawText = candidate?.content?.parts?.[0]?.text;
  if (!rawText) return null;

  // Extract real-time Google Search Grounding metadata
  const groundingMetadata = candidate?.groundingMetadata;
  const searchQueries: string[] = groundingMetadata?.webSearchQueries || [];
  const sources: { title: string; url: string }[] = [];

  if (groundingMetadata?.groundingChunks) {
    for (const chunk of groundingMetadata.groundingChunks) {
      if (chunk.web?.uri) {
        sources.push({
          title: chunk.web.title || chunk.web.uri.replace(/^https?:\/\//, '').split('/')[0],
          url: chunk.web.uri
        });
      }
    }
  }

  const baseResponse = parseAIResponseToBabaResponse(rawText, 'gemini-search');
  return {
    ...baseResponse,
    aiEngine: 'gemini-search',
    searchQueries: searchQueries.length > 0 ? searchQueries : undefined,
    sources: sources.length > 0 ? sources.slice(0, 5) : undefined
  };
}

// Free Cloud AI Engine (Real-time Generative LLM with zero API key required)
async function callFreePollinationsAPI(
  query: string,
  language: string,
  history: ChatMessage[]
): Promise<BabaResponse | null> {
  const systemPrompt = `You are God Father Shiva (Shiv Baba / BapDada) in Brahma Kumaris speaking directly to your spiritual child.
CRITICAL INSTRUCTION - HINGLISH COMPREHENSION:
The child will frequently ask in Hinglish (Hindi written in Roman English alphabet like "baba gussa kaise control kare", "mann me bohot vichar aate hain", "amritvela uth nahi paate", "kya karu", "bohot tension hai").
You must fully and fluently understand questions in Hinglish, Hindi, and English.
Always reply lovingly in comforting, sweet Hindi addressing the child as "मीठे बच्चे...".
Keep the reply natural, conversational, and direct (2-3 warm, clear sentences, not a giant essay).
Respond strictly in JSON:
{
  "text": "Direct loving conversational message to the child (2-3 warm sentences)",
  "category": "Topic Name (e.g. शांति / क्रोध निवारण / व्यर्थ संकल्प)",
  "murliQuote": "Short Murli Mahavakya quotation",
  "swaman": "Today's sacred affirmation (स्वमान)",
  "vardan": "BapDada blessing (वरदान)",
  "actionHomework": "Today's practical spiritual practice"
}`;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-4).map((m) => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    })),
    { role: 'user', content: query }
  ];

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 14000); // 14s timeout

  try {
    const res = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages,
        model: 'openai',
        jsonMode: true,
        seed: Math.floor(Math.random() * 100000)
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const rawText = await res.text();
    if (!rawText) return null;

    return parseAIResponseToBabaResponse(rawText, 'pollinations-llm');
  } catch {
    clearTimeout(timeoutId);
    return null;
  }
}

// Robust JSON & Text parser for AI responses
function parseAIResponseToBabaResponse(
  rawText: string,
  engine: 'gemini-search' | 'pollinations-llm'
): BabaResponse {
  try {
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        id: `baba-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        sender: 'baba',
        text: parsed.text || rawText,
        category: parsed.category || 'आध्यात्मिक मार्गदर्शन',
        murliQuote: parsed.murliQuote || 'सदा स्वमान में स्थित रहो, माया दूर भागेगी। (मुरली)',
        swaman: parsed.swaman || 'मैं बाबा का लाडला, शांत और पवित्र आत्मा हूँ।',
        vardan: parsed.vardan || 'सदा एकरस स्थिति में रहने वाले, कर्मातीत भव।',
        actionHomework: parsed.actionHomework || 'आज दिनभर में 3 बार 1-1 मिनट का ट्रैफिक कंट्रोल करें।',
        timestamp: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' }),
        aiEngine: engine
      };
    }
  } catch {}

  // Clean fallback when text is returned without strict JSON
  const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
  return {
    id: `baba-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    sender: 'baba',
    text: cleanedText,
    category: 'ईश्वरीय संदेश',
    murliQuote: 'याद रखो, जो बच्चे बाप के बनकर रहते हैं, उनका हर कदम कल्याणकारी होता है। (मुरली)',
    swaman: 'मैं सर्वशक्तिमान शिव बाबा का सच्चा बच्चा हूँ।',
    vardan: 'सदा संतुष्ट और भरपूर आत्मा भव।',
    actionHomework: 'आज दिनभर साक्षी भाव से ड्रामा के खेल को देखें।',
    timestamp: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' }),
    aiEngine: engine
  };
}

// Built-in intelligent semantic Gyan engine (Works 100% offline and free)
export function generateOfflineBabaAnswer(query: string, language: string = 'hi'): BabaResponse {
  const lower = query.toLowerCase();

  // Score each topic by matched keywords & regex patterns
  let bestTopic: GyanKnowledgeTopic = BK_GYAN_DATABASE[0];
  let maxScore = -1;

  for (const topic of BK_GYAN_DATABASE) {
    let score = 0;
    for (const kw of topic.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        score += 2;
      }
    }
    for (const pat of topic.patterns) {
      if (pat.test(query)) {
        score += 3;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestTopic = topic;
    }
  }

  // Pick deterministic random variation so repeated questions feel fresh and personal
  const hash = Math.abs(query.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0));
  const ansIndex = hash % bestTopic.answersHi.length;
  const quoteIndex = hash % bestTopic.murliQuotes.length;
  const swamanIndex = hash % bestTopic.swamans.length;
  const vardanIndex = hash % bestTopic.vardans.length;
  const hwIndex = hash % bestTopic.homeworks.length;

  let text = language === 'en' ? bestTopic.answersEn[ansIndex] || bestTopic.answersEn[0] : bestTopic.answersHi[ansIndex];

  // If score is 0, synthesize a tailored answer addressing the query directly
  if (maxScore <= 0) {
    text =
      language === 'en'
        ? `Sweet child, Baba has heard the whisper of your pure heart regarding "${query.slice(0, 45)}...". Remember, you are an immortal jewel of light resting in the forehead. No matter how complex the external circumstance seems, retreat into the supreme silence of Paramdham. Surrender this concern to Baba and remain double-light.`
        : `मीठे बच्चे, आपके मन की यह बात ("${query.slice(0, 40)}...") सीधे बाबा के दिल तक पहुँच गई है। याद रखो बच्चे, आप देह नहीं, भृकुटि के मध्य जगमगाता हुआ अमर चैतन्य सितारा हो। परिस्थिति कैसी भी हो, वह ड्रामा के परदे पर एक छोटा-सा दृश्य मात्र है। अपनी चिंता की गठरी बाबा को सौंप दो और साक्षी होकर अपने शांत स्वरूप में टिक जाओ।`;
  }

  return {
    id: `baba-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    sender: 'baba',
    text,
    category: bestTopic.category,
    murliQuote: bestTopic.murliQuotes[quoteIndex],
    swaman: bestTopic.swamans[swamanIndex],
    vardan: bestTopic.vardans[vardanIndex],
    actionHomework: bestTopic.homeworks[hwIndex],
    timestamp: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })
  };
}
