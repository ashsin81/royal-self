// Figma-extracted exact content and metadata for The Royal Passport (राजाई स्वराज्य पासपोर्ट)

export interface FigmaCheckpoint {
  id: string;
  number: number;
  nameEn: string;
  nameHi: string;
  type: 'border' | 'checkpoint' | 'gate' | 'station';
  category: 'Borders' | 'Checkpoints' | 'Gates';
  situation: string;
  babaDirection: string;
  abhyas: string[];
  bestActions: string[];
  askBaba: string;
  stampId: string;
  stampName: string;
  stampCultivate: string;
  color: string;
  accent: string;
  icon: string;
}

export interface FigmaStamp {
  id: string;
  number: string;
  nameHi: string;
  nameEn: string;
  code: string;
  description: string;
  affirmation: string;
  color: string;
  accent: string;
  icon: string;
}

export interface RoyalRouteStep {
  step: string;
  nameHi: string;
  nameEn: string;
  tagline: string;
  description: string;
  color: string;
}

export interface BaggageDeclarationItem {
  id: string;
  label: string;
  desc: string;
  icon: string;
}

export const FIGMA_CHECKPOINTS: FigmaCheckpoint[] = [
  {
    "id": "cp-01",
    "number": 1,
    "nameEn": "Anger border",
    "nameHi": "क्रोध सीमा",
    "type": "border",
    "category": "Borders",
    "situation": "बात मन के अनुसार नहीं हुई और क्रोध आया।",
    "babaDirection": "देही-अभिमानी बनो। द्रष्टा बनकर अपने संस्कार को देखो।",
    "abhyas": [
      "रुको → आत्म-स्मृति → द्रष्टा बनो → फिर बोलो",
      "अगर बोलना ज़रूरी हो: मधुरता + निर्मानता + स्पष्टता"
    ],
    "bestActions": [
      "मैंने रुककर बोला",
      "मैंने मधुरता रखी",
      "मैंने क्रोध को कर्म नहीं बनने दिया"
    ],
    "askBaba": "बाबा, इस समय मेरी राजाई स्थिति क्या करेगी?",
    "stampId": "stamp-01",
    "stampName": "शांति",
    "stampCultivate": "Cultivate शांति · A stamp is for a lived practice",
    "color": "#991B1B",
    "accent": "#F87171",
    "icon": "flame"
  },
  {
    "id": "cp-02",
    "number": 2,
    "nameEn": "Mind border",
    "nameHi": "मन सीमा",
    "type": "border",
    "category": "Borders",
    "situation": "किसी की बात मन में लग गई।",
    "babaDirection": "घटना को देखते हुए अपनी स्थिति को श्रेष्ठ रखना है। व्यर्थ से बचो।",
    "abhyas": [
      "घटना अलग → मन अलग → आत्म-स्मृति → परमात्म-स्मृति",
      "अपने से पूछें: क्या मैं इस बात को पकड़कर बैठा हूँ?",
      "यदि हाँ — छोड़ो, हल्के बनो, आगे बढ़ो।"
    ],
    "bestActions": [
      "घटना और अपनी स्थिति को अलग समझा",
      "व्यर्थ चिंतन को तुरंत पूर्णविराम दिया",
      "मन को हल्केपन में वापस लाया"
    ],
    "askBaba": "बाबा, मुझे इसे समझना है या छोड़ देना है?",
    "stampId": "stamp-07",
    "stampName": "संतुष्टि",
    "stampCultivate": "Cultivate मन हल्का · A stamp is for a lived practice",
    "color": "#1E3A8A",
    "accent": "#60A5FA",
    "icon": "wind"
  },
  {
    "id": "cp-03",
    "number": 3,
    "nameEn": "Purity checkpoint",
    "nameHi": "दृष्टि जाँच",
    "type": "checkpoint",
    "category": "Checkpoints",
    "situation": "किसी आत्मा की कमी या गलती दिखाई दे रही है।",
    "babaDirection": "आत्मा को आत्मा समझकर देखो। गुण ग्रहण करो, अवगुण छोड़ो।",
    "abhyas": [
      "व्यवहार को सही-गलत समझना है, लेकिन आत्मा को उसकी मूल पवित्रता में देखना है।"
    ],
    "bestActions": [
      "तुरंत कोई रिएक्शन न दें",
      "आत्मा को देखें और आत्मिक दृष्टि रखें",
      "उनकी कोई अच्छाई याद करें",
      "शुभभावना दें और परचिंतन न करें"
    ],
    "askBaba": "बाबा, मुझे इस आत्मा में अभी कौन-सा गुण देखना है?",
    "stampId": "stamp-05",
    "stampName": "पवित्र दृष्टि",
    "stampCultivate": "Cultivate पवित्र दृष्टि · A stamp is for a lived practice",
    "color": "#065F46",
    "accent": "#34D399",
    "icon": "eye"
  },
  {
    "id": "cp-04",
    "number": 4,
    "nameEn": "Comparison border",
    "nameHi": "तुलना सीमा",
    "type": "border",
    "category": "Borders",
    "situation": "दूसरे की प्राप्ति देखकर मन में तुलना आई।",
    "babaDirection": "हर आत्मा का अपना पार्ट है। अपना पुरुषार्थ देखो।",
    "abhyas": [
      "दूसरे की विशेषता देखकर: ईर्ष्या नहीं → गुण ग्रहण",
      "अपने से पूछें: इस गुण को मैं अपने पुरुषार्थ में कैसे ला सकता हूँ?"
    ],
    "bestActions": [
      "तुलना को प्रेरणा में बदल दिया",
      "उनकी विशेषता पर मन से प्रसन्नता जताई",
      "स्वयं के पुरुषार्थ पर ध्यान केंद्रित किया"
    ],
    "askBaba": "बाबा, मुझे दूसरे को देखना है या अपना पुरुषार्थ?",
    "stampId": "stamp-07",
    "stampName": "संतुष्टि",
    "stampCultivate": "Cultivate संतुष्टता · A stamp is for a lived practice",
    "color": "#854D0E",
    "accent": "#FACC15",
    "icon": "scale"
  },
  {
    "id": "cp-05",
    "number": 5,
    "nameEn": "Ego border",
    "nameHi": "अभिमान सीमा",
    "type": "border",
    "category": "Borders",
    "situation": "मेरी बात सही है… मुझे ही समझना चाहिए…",
    "babaDirection": "निर्मानता महानता की निशानी है। नम्र बनो।",
    "abhyas": [
      "सुनो → रुको → विचार करो → आवश्यकता हो तभी बोलो",
      "मेरी श्रेष्ठ क्रिया: हर बात में स्वयं को सिद्ध करना आवश्यक नहीं।"
    ],
    "bestActions": [
      "स्वयं को सिद्ध करने की ज़िद छोड़ी",
      "सामने वाले को सम्मान दिया",
      "सच्ची नम्रता से मौन धारण किया"
    ],
    "askBaba": "बाबा, यहाँ मुझे अपनी बात सिद्ध करनी है या निर्मान बनना है?",
    "stampId": "stamp-03",
    "stampName": "नम्रता",
    "stampCultivate": "Cultivate नम्रता · A stamp is for a lived practice",
    "color": "#701A75",
    "accent": "#F472B6",
    "icon": "shield-alert"
  },
  {
    "id": "cp-06",
    "number": 6,
    "nameEn": "Baggage release",
    "nameHi": "पुराना बोझ मुक्त",
    "type": "border",
    "category": "Borders",
    "situation": "पुरानी बात बार-बार याद आ रही है।",
    "babaDirection": "बीती को समाप्त करो। वर्तमान को श्रेष्ठ बनाओ। बीती सो बीती बिंदी लगाओ।",
    "abhyas": [
      "सीख रखनी है — बोझ नहीं।",
      "जो बदल नहीं सकता — उसे बाबा को सौंपो।"
    ],
    "bestActions": [
      "पुरानी बात को बिंदी लगा दी",
      "बोझ बाबा को सौंपकर हल्का अनुभव किया",
      "वर्तमान के पुरुषार्थ में रम गए"
    ],
    "askBaba": "बाबा, यह पुरानी बात मुझे सिखाने आई है या आगे बढ़ने से रोकने?",
    "stampId": "stamp-09",
    "stampName": "मौन",
    "stampCultivate": "Cultivate हल्कापन · A stamp is for a lived practice",
    "color": "#4C1D95",
    "accent": "#A78BFA",
    "icon": "archive"
  },
  {
    "id": "cp-07",
    "number": 7,
    "nameEn": "Mind direction",
    "nameHi": "मन की दिशा",
    "type": "checkpoint",
    "category": "Checkpoints",
    "situation": "मन बार-बार इधर-उधर जा रहा है।",
    "babaDirection": "मन को शुभ संकल्पों में व्यस्त रखो। एकाग्रता ही शक्ति है।",
    "abhyas": [
      "मन को आज्ञा दो: रुक जाओ।",
      "मन को एक श्रेष्ठ विचार दो: 'मैं आत्मा परमधाम निवासी हूँ।'"
    ],
    "bestActions": [
      "मन को व्यर्थ से हटाकर स्वमान में लगाया",
      "भृकुटि के मध्य प्रकाश बिंदु पर एकाग्र हुए",
      "सदा समर्थ संकल्पों का दीपक जलाए रखा"
    ],
    "askBaba": "बाबा, अभी मन को कौन-सी श्रेष्ठ दिशा दूँ?",
    "stampId": "stamp-11",
    "stampName": "परमात्मा की याद",
    "stampCultivate": "Cultivate मन की एकाग्रता · A stamp is for a lived practice",
    "color": "#0F766E",
    "accent": "#2DD4BF",
    "icon": "compass"
  },
  {
    "id": "cp-08",
    "number": 8,
    "nameEn": "Words customs",
    "nameHi": "वाणी सीमा",
    "type": "border",
    "category": "Borders",
    "situation": "बोलने से पहले CUSTOMS CHECK: क्या बाहर जा रहा है?",
    "babaDirection": "कम बोलो, धीरे बोलो, मीठा बोलो, सत्य बोलो।",
    "abhyas": [
      "चेक करें: क्या यह आवश्यक है? क्या यह सत्य है? क्या यह मधुर है?",
      "यदि नहीं — तो मौन ही सर्वश्रेष्ठ उत्तर है।"
    ],
    "bestActions": [
      "शब्दों को तोलकर बोला",
      "व्यर्थ व कटु शब्दों को अंदर ही रोक लिया",
      "मीठी और प्रेरक वाणी का प्रयोग किया"
    ],
    "askBaba": "बाबा, इस समय मेरे इन शब्दों से किसी को सुख मिलेगा?",
    "stampId": "stamp-04",
    "stampName": "मधुरता",
    "stampCultivate": "Cultivate मधुर वाणी · A stamp is for a lived practice",
    "color": "#9D174D",
    "accent": "#FB7185",
    "icon": "message-square"
  },
  {
    "id": "cp-09",
    "number": 9,
    "nameEn": "Old sanskar border",
    "nameHi": "पुराना संस्कार",
    "type": "border",
    "category": "Borders",
    "situation": "वही पुराना संस्कार फिर सामने आ गया। गलती हो गई।",
    "babaDirection": "गलती को देखकर निराश मत हो। पश्चाताप नहीं, दृढ़ संकल्प करो।",
    "abhyas": [
      "दोष नहीं — होश। स्वयं को दोषी न ठहराएं।",
      "संस्कार को पहचानें और तुरंत नया श्रेष्ठ संस्कार सक्रिय करें।"
    ],
    "bestActions": [
      "निराश होने के बजाय तुरंत बाबा से शक्ति ली",
      "पुराने संस्कार को साक्षी होकर देखा",
      "नये राजाई संस्कार का दृढ़ संकल्प किया"
    ],
    "askBaba": "बाबा, इस पुराने संस्कार की जगह कौन-सा राजाई संस्कार धारण करूँ?",
    "stampId": "stamp-12",
    "stampName": "स्वराज्य",
    "stampCultivate": "Cultivate नया संस्कार · A stamp is for a lived practice",
    "color": "#831843",
    "accent": "#F43F5E",
    "icon": "refresh-cw"
  },
  {
    "id": "cp-10",
    "number": 10,
    "nameEn": "Courage checkpoint",
    "nameHi": "निर्भयता",
    "type": "checkpoint",
    "category": "Checkpoints",
    "situation": "भय या चिंता है। भविष्य को लेकर असुरक्षा है।",
    "babaDirection": "सदा यह याद रखो कि सर्वशक्तिमान बाबा तुम्हारे साथ हैं। निर्भय बनो।",
    "abhyas": [
      "भय का मूल देह-भान है। 'मैं अजर, अमर, अविनाशी आत्मा हूँ।'",
      "ड्रामा का हर दृश्य कल्याणकारी है।"
    ],
    "bestActions": [
      "सर्वशक्तिमान शिव बाबा का हाथ पकड़ा",
      "अमर आत्मा के स्वरूप में स्थित हुए",
      "चिंता को ईश्वरीय निश्चय में विसर्जित किया"
    ],
    "askBaba": "बाबा, मुझे किस बात का डर है जब आप मेरे साथ हैं?",
    "stampId": "stamp-08",
    "stampName": "निर्भयता",
    "stampCultivate": "Cultivate निर्भयता · A stamp is for a lived practice",
    "color": "#1E293B",
    "accent": "#94A3B8",
    "icon": "shield-check"
  },
  {
    "id": "cp-11",
    "number": 11,
    "nameEn": "Wisdom gate",
    "nameHi": "बुद्धि द्वार",
    "type": "gate",
    "category": "Gates",
    "situation": "समझ नहीं आ रहा — क्या करूँ? द्वंद्व है।",
    "babaDirection": "बुद्धि की लाइन क्लियर रखो। श्रीमत पर चलो।",
    "abhyas": [
      "बुद्धि से सारे उलझे विचार हटाएं।",
      "बाबा के महावाक्य याद करें: 'त्रिकालदर्शी होकर निर्णय लो।'"
    ],
    "bestActions": [
      "जल्दबाजी में निर्णय नहीं लिया",
      "शांति में बैठकर बाबा से राय ली",
      "श्रीमत के अनुसार स्पष्ट कदम उठाया"
    ],
    "askBaba": "बाबा, इस निर्णय में आपकी श्रीमत क्या है?",
    "stampId": "stamp-02",
    "stampName": "धैर्य",
    "stampCultivate": "Cultivate विवेक व स्पष्टता · A stamp is for a lived practice",
    "color": "#1E1B4B",
    "accent": "#818CF8",
    "icon": "lightbulb"
  },
  {
    "id": "cp-12",
    "number": 12,
    "nameEn": "Purusharth gate",
    "nameHi": "पुरुषार्थ द्वार",
    "type": "gate",
    "category": "Gates",
    "situation": "उमंग-उत्साह कम है। आलस्य या अलबेलापन आ रहा है।",
    "babaDirection": "समय की समीपता को पहचानो। तीव्र पुरुषार्थी बनो।",
    "abhyas": [
      "यह संगमयुग का अमूल्य समय है।",
      "एक सेकंड भी व्यर्थ न गंवाएं। अपनी मंज़िल को सामने लाएं।"
    ],
    "bestActions": [
      "अलबेलेपन को तुरंत तोड़ा",
      "अमृतवेले की शक्ति को याद किया",
      "उमंग-उत्साह का पंख लगाकर उड़ान भरी"
    ],
    "askBaba": "बाबा, मेरे पुरुषार्थ में उमंग-उत्साह की नई लहर कैसे आए?",
    "stampId": "stamp-13",
    "stampName": "श्रेष्ठ कर्मों की सिद्धि",
    "stampCultivate": "Cultivate उमंग-उत्साह · A stamp is for a lived practice",
    "color": "#B45309",
    "accent": "#FBBF24",
    "icon": "flame"
  },
  {
    "id": "cp-13",
    "number": 13,
    "nameEn": "Contentment gate",
    "nameHi": "संतुष्टता द्वार",
    "type": "gate",
    "category": "Gates",
    "situation": "यह मेरे हिसाब से नहीं हुआ। मन में असंतोष है।",
    "babaDirection": "सदा प्राप्तियों की लिस्ट सामने रखो। संतुष्टमणि बनो।",
    "abhyas": [
      "जो मिला है वह सर्वश्रेष्ठ है।",
      "अपूर्णता में भी कल्याण छिपा है। हर हाल में शुक्रिया।"
    ],
    "bestActions": [
      "शिकायत की जगह शुक्रिया चुना",
      "ईश्वरीय प्राप्तियों को याद कर भरपूर हुए",
      "असंतोष को संतुष्टता के अमृत से धोया"
    ],
    "askBaba": "बाबा, इस परिस्थिति में कौन-सी बड़ी प्राप्ति छिपी है?",
    "stampId": "stamp-07",
    "stampName": "संतुष्टि",
    "stampCultivate": "Cultivate संतुष्टि · A stamp is for a lived practice",
    "color": "#15803D",
    "accent": "#4ADE80",
    "icon": "heart"
  },
  {
    "id": "cp-14",
    "number": 14,
    "nameEn": "Silent border",
    "nameHi": "मौन की शक्ति",
    "type": "border",
    "category": "Borders",
    "situation": "हर बात का जवाब देने की इच्छा हो रही है।",
    "babaDirection": "मौन की शक्ति सबसे बड़ी शक्ति है। अंतर्मुखी बनो।",
    "abhyas": [
      "मौन = दबाना नहीं। मौन = आंतरिक शांति का विस्तार।",
      "बाहरी शोर शांत हो तो अंदर परमात्मा की मीठी आवाज़ सुनाई देती है।"
    ],
    "bestActions": [
      "प्रतिक्रिया देने से खुद को रोका",
      "शांति के गहन सागर में डुबकी लगाई",
      "मौन रहकर वातावरण को पवित्र प्रकंपन दिए"
    ],
    "askBaba": "बाबा, क्या अभी चुप रहना ही मेरी सबसे बड़ी विजय है?",
    "stampId": "stamp-09",
    "stampName": "मौन",
    "stampCultivate": "Cultivate मौन की शक्ति · A stamp is for a lived practice",
    "color": "#334155",
    "accent": "#CBD5E1",
    "icon": "volume-x"
  },
  {
    "id": "cp-15",
    "number": 15,
    "nameEn": "Giving station",
    "nameHi": "शुभभावना",
    "type": "station",
    "category": "Checkpoints",
    "situation": "कुछ अच्छा करने का अवसर है या किसी को सहयोग चाहिए।",
    "babaDirection": "देना ही राजाई संस्कार है। मास्टर दाता बनो।",
    "abhyas": [
      "बिना अपेक्षा: करो → दे दो → आगे बढ़ो।",
      "न प्रशंसा की आवश्यकता, न मान की अपेक्षा।"
    ],
    "bestActions": [
      "निःस्वार्थ भाव से सहयोग दिया",
      "सच्ची शुभभावना और शुभकामनाएं भेजीं",
      "दाता बनकर सुख और शांति का दान दिया"
    ],
    "askBaba": "बाबा, आज मैं किस आत्मा को सच्ची खुशी दे सकता हूँ?",
    "stampId": "stamp-06",
    "stampName": "शुभभावना",
    "stampCultivate": "Cultivate शुभभावना · A stamp is for a lived practice",
    "color": "#C2410C",
    "accent": "#FB923C",
    "icon": "sparkles"
  },
  {
    "id": "cp-16",
    "number": 16,
    "nameEn": "Source connection",
    "nameHi": "परमात्म-स्मृति",
    "type": "checkpoint",
    "category": "Checkpoints",
    "situation": "जब शक्ति कम लगे… बाहर से शक्ति लेने से पहले — स्रोत से जुड़ें।",
    "babaDirection": "जब भी स्वयं को कमज़ोर समझो, तो देह-भान से न्यारे हो बाबा के सानिध्य में आओ।",
    "abhyas": [
      "स्मृति → शक्ति → श्रेष्ठ कर्म",
      "भृकुटि के मध्य स्वयं को आत्मा अनुभव करें: 'मैं आत्मा हूँ। शांति स्वरूप हूँ। शिव बाबा मेरे साथी हैं।'"
    ],
    "bestActions": [
      "बाबा के प्रकाश की किरणों में समा गए",
      "सर्व शक्तियों का करंट स्वयं में भरा",
      "परमात्म-प्यार की अनुभूति से भरपूर हुए"
    ],
    "askBaba": "बाबा, आपकी याद में मुझे कौन-सी शक्ति अभी धारण करनी है?",
    "stampId": "stamp-11",
    "stampName": "परमात्मा की याद",
    "stampCultivate": "Cultivate परमात्म-स्मृति · A stamp is for a lived practice",
    "color": "#7E22CE",
    "accent": "#C084FC",
    "icon": "sun"
  },
  {
    "id": "cp-17",
    "number": 17,
    "nameEn": "Observer checkpoint",
    "nameHi": "द्रष्टा स्थिति",
    "type": "checkpoint",
    "category": "Checkpoints",
    "situation": "जब मन बहुत कुछ दिखा रहा हो… हलचल हो।",
    "babaDirection": "साक्षी होकर हर दृश्य को देखो। तुम अभिनेता हो, दृष्टा हो।",
    "abhyas": [
      "विचार आए — देखो। भावना उठे — देखो। संस्कार सामने आए — देखो।",
      "लेकिन स्वयं को याद रखो: 'मैं आत्मा हूँ। मैं द्रष्टा हूँ।'"
    ],
    "bestActions": [
      "परिस्थिति के बीच में साक्षी भाव साधा",
      "मन के विचारों में बहे बिना उन्हें देखा",
      "अविचल और शांत दृष्टा बनकर खड़े रहे"
    ],
    "askBaba": "बाबा, मुझे अभी परिस्थिति देखनी है या अपनी स्थिति?",
    "stampId": "stamp-10",
    "stampName": "साक्षी स्थिति",
    "stampCultivate": "Cultivate आत्म-दृष्टि · A stamp is for a lived practice",
    "color": "#374151",
    "accent": "#9CA3AF",
    "icon": "eye"
  },
  {
    "id": "cp-18",
    "number": 18,
    "nameEn": "Swarajya checkpoint",
    "nameHi": "स्वराज्य",
    "type": "checkpoint",
    "category": "Checkpoints",
    "situation": "सबसे महत्वपूर्ण जाँच: अभी मेरा राजा कौन है?",
    "babaDirection": "मन-बुद्धि-संस्कार पर अपना राज्य रखो। स्वराज्य अधिकारी ही विश्व अधिकारी बनते हैं।",
    "abhyas": [
      "मन पर मेरा अधिकार। वाणी पर मेरा अधिकार। कर्म पर मेरा अधिकार।",
      "अभी मेरा राजा कौन है? परिस्थिति? दूसरे की बात? पुराना संस्कार? या मैं आत्मा — स्वराज्य अधिकारी?"
    ],
    "bestActions": [
      "इंद्रियों को अपने नियंत्रण में रखा",
      "परिस्थिति के अधीन होने से इनकार किया",
      "राजाई तख्त पर बैठकर स्वराज्य का आदेश दिया"
    ],
    "askBaba": "बाबा, इस समय मुझे किस कर्मेन्द्रिय पर स्वराज्य स्थापित करना है?",
    "stampId": "stamp-12",
    "stampName": "स्वराज्य",
    "stampCultivate": "Cultivate स्वराज्य · A stamp is for a lived practice",
    "color": "#831843",
    "accent": "#FB7185",
    "icon": "crown"
  },
  {
    "id": "cp-19",
    "number": 19,
    "nameEn": "Rajai status check",
    "nameHi": "राजाई स्थिति",
    "type": "checkpoint",
    "category": "Checkpoints",
    "situation": "जब समझ न आए कि कौन-सा पृष्ठ खोलना है।",
    "babaDirection": "मालिकपन के आसन पर बैठो। 'मैं राजऋषि हूँ, तपस्वी हूँ, राजाई अधिकारी हूँ।'",
    "abhyas": [
      "1. मैं आत्मा हूँ।",
      "2. मैं द्रष्टा हूँ।",
      "3. बाबा की याद में हूँ।",
      "अब मेरा श्रेष्ठ कर्म क्या है? — फिर वही करें।"
    ],
    "bestActions": [
      "शाही राजाई गरिमा में स्थित हुए",
      "दीनता और अधीनता को तिलांजलि दी",
      "श्रेष्ठ निश्चय और गरिमा के साथ कदम बढ़ाया"
    ],
    "askBaba": "बाबा, मेरी राजाई स्थिति अभी कैसी हो?",
    "stampId": "stamp-13",
    "stampName": "श्रेष्ठ कर्मों की सिद्धि",
    "stampCultivate": "Cultivate राजाई स्थिति · A stamp is for a lived practice",
    "color": "#9A3412",
    "accent": "#FDBA74",
    "icon": "award"
  },
  {
    "id": "cp-20",
    "number": 20,
    "nameEn": "New sanskar activation",
    "nameHi": "नया संस्कार",
    "type": "checkpoint",
    "category": "Checkpoints",
    "situation": "एक परिस्थिति चुनें और पुराने की जगह नया संस्कार सक्रिय करें।",
    "babaDirection": "पुराने संस्कार को विदाई दो, नये श्रेष्ठ संस्कार को बधाई दो।",
    "abhyas": [
      "पहले रुकें। श्रेष्ठ संस्कार चुनें। फिर श्रेष्ठ कर्म करें।",
      "उदाहरण: जब कोई मेरे साथ गुस्से से बात करे, मैं पहले 3 सेकंड रुकूँगा, फिर शांति संस्कार धारण कर मधुरता से उत्तर दूँगा।"
    ],
    "bestActions": [
      "नये संकल्प की स्पष्ट रूपरेखा बनाई",
      "उसे तुरंत कर्म में उतारकर अनुभव किया",
      "अपने पासपोर्ट में नया संस्कार सील किया"
    ],
    "askBaba": "बाबा, इस परिस्थिति में मेरा नया श्रेष्ठ संस्कार क्या होगा?",
    "stampId": "stamp-01",
    "stampName": "शांति",
    "stampCultivate": "Cultivate नया श्रेष्ठ संस्कार · A stamp is for a lived practice",
    "color": "#1E3A8A",
    "accent": "#93C5FD",
    "icon": "sparkles"
  }
];

export const FIGMA_STAMPS: FigmaStamp[] = [
  {
    "id": "stamp-01",
    "number": "01",
    "nameHi": "शांति",
    "nameEn": "Peace",
    "code": "ROYAL-01-PEACE",
    "description": "क्रोध सीमा पार · देही-अभिमानी स्थिति",
    "affirmation": "मैं शांत स्वरूप आत्मा हूँ। शांति मेरा अनादि स्वधर्म है।",
    "color": "#0284C7",
    "accent": "#38BDF8",
    "icon": "🕊️"
  },
  {
    "id": "stamp-02",
    "number": "02",
    "nameHi": "धैर्य",
    "nameEn": "Patience",
    "code": "ROYAL-02-PATIENCE",
    "description": "बुद्धि द्वार पार · अचल अडोल स्थिति",
    "affirmation": "हर दृश्य में कल्याण समाया है। मैं धैर्यवान और संतुष्ट हूँ।",
    "color": "#4F46E5",
    "accent": "#818CF8",
    "icon": "⏳"
  },
  {
    "id": "stamp-03",
    "number": "03",
    "nameHi": "नम्रता",
    "nameEn": "Humility",
    "code": "ROYAL-03-HUMILITY",
    "description": "अभिमान सीमा पार · निर्माणता ही महानता",
    "affirmation": "झुकना ही महानता है। मैं सच्चा सेवाधारी और निर्मान हूँ।",
    "color": "#9333EA",
    "accent": "#C084FC",
    "icon": "🌸"
  },
  {
    "id": "stamp-04",
    "number": "04",
    "nameHi": "मधुरता",
    "nameEn": "Sweetness",
    "code": "ROYAL-04-SWEETNESS",
    "description": "वाणी सीमा पार · अनमोल मीठे बोल",
    "affirmation": "मेरी हर वाणी से सुख और दुआएं निकलती हैं।",
    "color": "#DB2777",
    "accent": "#F472B6",
    "icon": "🍯"
  },
  {
    "id": "stamp-05",
    "number": "05",
    "nameHi": "पवित्र दृष्टि",
    "nameEn": "Pure Vision",
    "code": "ROYAL-05-PURITY",
    "description": "दृष्टि जाँच पार · आत्मा को आत्मा देखना",
    "affirmation": "मेरी दृष्टि में सदा पावनता और दिव्यता है।",
    "color": "#059669",
    "accent": "#34D399",
    "icon": "👁️"
  },
  {
    "id": "stamp-06",
    "number": "06",
    "nameHi": "शुभभावना",
    "nameEn": "Benevolence",
    "code": "ROYAL-06-GOODWISHES",
    "description": "देने का स्थान · सर्व के प्रति शुभचिंतन",
    "affirmation": "सदा सभी के प्रति शुभभावना और शुभकामनाएं रखना मेरा राजाई स्वभाव है।",
    "color": "#EA580C",
    "accent": "#FB923C",
    "icon": "✨"
  },
  {
    "id": "stamp-07",
    "number": "07",
    "nameHi": "संतुष्टि",
    "nameEn": "Contentment",
    "code": "ROYAL-07-CONTENTMENT",
    "description": "संतुष्टता द्वार पार · भरपूर और निश्चिंत",
    "affirmation": "सदा प्राप्तियों को सामने रख भरपूर रहने वाली संतुष्ट आत्मा हूँ।",
    "color": "#16A34A",
    "accent": "#4ADE80",
    "icon": "💎"
  },
  {
    "id": "stamp-08",
    "number": "08",
    "nameHi": "निर्भयता",
    "nameEn": "Fearlessness",
    "code": "ROYAL-08-COURAGE",
    "description": "हिम्मत की सीमा पार · सर्वशक्तिमान का सानिध्य",
    "affirmation": "बाबा का हाथ मेरे सिर पर है, मैं सदा निर्भय और निश्चिंत हूँ।",
    "color": "#475569",
    "accent": "#94A3B8",
    "icon": "🛡️"
  },
  {
    "id": "stamp-09",
    "number": "09",
    "nameHi": "मौन",
    "nameEn": "Silence",
    "code": "ROYAL-09-SILENCE",
    "description": "मौन की सीमा पार · अंतर्मुखी महातपस्वी",
    "affirmation": "मौन में परमात्मा का साक्षात्कार होता है। मैं शांत स्वरूप हूँ।",
    "color": "#334155",
    "accent": "#CBD5E1",
    "icon": "🤫"
  },
  {
    "id": "stamp-10",
    "number": "10",
    "nameHi": "साक्षी स्थिति",
    "nameEn": "Observer State",
    "code": "ROYAL-10-OBSERVER",
    "description": "साक्षी स्थिति पार · ड्रामा का साक्षी दृष्टा",
    "affirmation": "मैं इस विशाल ड्रामा का साक्षी दृष्टा हूँ, निर्लेप और अडोल।",
    "color": "#52525B",
    "accent": "#A1A1AA",
    "icon": "🧘"
  },
  {
    "id": "stamp-11",
    "number": "11",
    "nameHi": "परमात्मा की याद",
    "nameEn": "God Remembrance",
    "code": "ROYAL-11-SOURCE",
    "description": "परमात्म-स्मृति पार · सीधा सर्वोच्च संबंध",
    "affirmation": "एक शिव बाबा दूसरा न कोई। मेरा दिल केवल बाबा से जुड़ा है।",
    "color": "#E11D48",
    "accent": "#FDA4AF",
    "icon": "☀️"
  },
  {
    "id": "stamp-12",
    "number": "12",
    "nameHi": "स्वराज्य",
    "nameEn": "Self-Sovereignty",
    "code": "ROYAL-12-SWARAJYA",
    "description": "स्वराज्य जाँच पार · सर्व कर्मेन्द्रियों का राजा",
    "affirmation": "मैं स्वराज्य अधिकारी राजा आत्मा हूँ, प्रकृतिजीत और मायाजीत।",
    "color": "#D97706",
    "accent": "#FCD34D",
    "icon": "👑"
  },
  {
    "id": "stamp-13",
    "number": "13",
    "nameHi": "श्रेष्ठ कर्मों की सिद्धि",
    "nameEn": "Elevated Action",
    "code": "ROYAL-13-MASTERY",
    "description": "राजाई स्थिति पार · कर्मयोगी स्थिति",
    "affirmation": "मेरा हर कर्म श्रेष्ठ, कल्याणकारी और ईश्वरीय आज्ञा के अनुसार है।",
    "color": "#B45309",
    "accent": "#FDE68A",
    "icon": "🌟"
  }
];

export const ROYAL_ROUTE_STEPS: RoyalRouteStep[] = [
  {
    "step": "STEP 01",
    "nameHi": "आत्म-स्मृति",
    "nameEn": "Awakening",
    "tagline": "Begin by remembering who you are",
    "description": "देह-भान से परे भृकुटि के मध्य ज्योतिर्बिंदु आत्मा का साक्षात्कार। मैं यह शरीर नहीं, इसे चलाने वाली चैतन्य प्रकाश स्वरूप आत्मा हूँ।",
    "color": "#3B82F6"
  },
  {
    "step": "STEP 02",
    "nameHi": "द्रष्टा स्थिति",
    "nameEn": "The Observer",
    "tagline": "Watch your thoughts without becoming them",
    "description": "मन और विचारों के प्रवाह से ऊपर उठकर साक्षी भाव में टिकना। विचार आते हैं, चले जाते हैं; मैं उन्हें देखने वाला अमर दृष्टा हूँ।",
    "color": "#8B5CF6"
  },
  {
    "step": "STEP 03",
    "nameHi": "स्वराज्य",
    "nameEn": "Swarajya",
    "tagline": "Ruler of senses and inner kingdom",
    "description": "सर्व कर्मेन्द्रियों (आँख, कान, मुख, मन, बुद्धि) पर पूर्ण नियंत्रण। परिस्थिति मेरी स्वामी नहीं, मैं अपनी आंतरिक दुनिया का सम्राट हूँ।",
    "color": "#EC4899"
  },
  {
    "step": "STEP 04",
    "nameHi": "शुद्ध दृष्टि",
    "nameEn": "Purity",
    "tagline": "Seeing soul as soul, immaculate view",
    "description": "हर प्राणी में आत्मा का प्रकाश देखना। अवगुणों को परे रख केवल दिव्य गुणों को ग्रहण करना। शुद्ध व पावन दृष्टि ही सच्चा अमृत है।",
    "color": "#10B981"
  },
  {
    "step": "STEP 05",
    "nameHi": "परमात्म-स्मृति",
    "nameEn": "God Connection",
    "tagline": "Direct communion with the Supreme Source",
    "description": "परमधाम निवासी परमपिता शिव बाबा से सीधा शक्तिशाली तार। सर्व शक्तियों का झरना आत्मा में उतरकर उसे परिपूर्ण बना देता है।",
    "color": "#F59E0B"
  },
  {
    "step": "STEP 06",
    "nameHi": "राजाई संस्कार",
    "nameEn": "Higher Self",
    "tagline": "Living as a spiritual royal sovereign",
    "description": "दातापन, शांतता, नम्रता और गरिमा से परिपूर्ण राजाई जीवन। हर कर्म में सहज स्वाभाविकता और फरिश्ता स्वरूप की दिव्यता।",
    "color": "#EF4444"
  }
];

export const VISA_COMMITMENTS: string[] = [
  "मैं स्वयं को ईमानदारी से देखूँगा।",
  "मैं अपने पुराने patterns को पहचानूँगा।",
  "मैं अपने मन को दबाने के बजाय समझना सीखूँगा।",
  "मैं reaction और response के बीच जगह बनाऊँगा।",
  "मैं श्रेष्ठ विकल्प चुनने का अभ्यास करूँगा।",
  "मैं परमात्म-स्मृति को अपनी यात्रा का आधार बनाऊँगा।"
];

export const BAGGAGE_ITEMS: BaggageDeclarationItem[] = [
  {
    "id": "b1",
    "label": "पुरानी बातें",
    "desc": "जो बीत गया उसे बार-बार याद करना",
    "icon": "📜"
  },
  {
    "id": "b2",
    "label": "पुराने डर",
    "desc": "भविष्य की अनिश्चितता और असफलता का भय",
    "icon": "⚡"
  },
  {
    "id": "b3",
    "label": "अपेक्षाएँ",
    "desc": "दूसरों से मान, सम्मान और व्यवहार की चाह",
    "icon": "🎯"
  },
  {
    "id": "b4",
    "label": "सूक्ष्म अहंकार",
    "desc": "मेरी बात सही है, मुझे ही सिद्ध होना चाहिए",
    "icon": "👑"
  },
  {
    "id": "b5",
    "label": "दूसरों से तुलना",
    "desc": "दूसरों के गुण या साधनों से स्वयं को कम या ज्यादा आंकना",
    "icon": "⚖️"
  },
  {
    "id": "b6",
    "label": "दूसरों की राय",
    "desc": "लोग क्या कहेंगे की व्यर्थ चिंता",
    "icon": "💬"
  },
  {
    "id": "b7",
    "label": "पुरानी चोटें",
    "desc": "अतीत के कटु अनुभव और आहत भावनाएं",
    "icon": "💔"
  },
  {
    "id": "b8",
    "label": "पुराने संस्कार",
    "desc": "क्रोध, चिड़चिड़ापन, जल्दबाजी और अलबेलापन",
    "icon": "🔄"
  }
];

export const HOW_TO_PRACTISE_STEPS = [
  {
    "num": "01",
    "title": "पहचानें",
    "desc": "अभी मेरे अंदर क्या चल रहा है? स्थिति को बिना छुपाए ईमानदारी से देखें।"
  },
  {
    "num": "02",
    "title": "पृष्ठ खोलें",
    "desc": "क्रोध? तुलना? अभिमान? चिंता? व्यर्थ? सही चेकपॉइंट का पृष्ठ चुनें।"
  },
  {
    "num": "03",
    "title": "बाबा की दिशा पढ़ें",
    "desc": "लंबा विचार नहीं — एक स्पष्ट, संक्षिप्त ईश्वरीय दिशा।"
  },
  {
    "num": "04",
    "title": "अभ्यास करें",
    "desc": "तुरंत छोटी-सी श्रेष्ठ क्रिया: 3 सेकंड का ठहराव और स्वमान।"
  },
  {
    "num": "05",
    "title": "बाबा से पूछें",
    "desc": "'इस समय बाबा, मेरा पुरुषार्थ क्या है?' अंतर्मन से आवाज़ सुनें।"
  },
  {
    "num": "06",
    "title": "श्रेष्ठ कर्म करें",
    "desc": "ज्ञान को कर्म में लाएँ। प्रतिक्रिया के बदले स्वराज्य चुनें।"
  },
  {
    "num": "07",
    "title": "संस्कार सक्रिय करें",
    "desc": "जब अभ्यास हो जाए — अपना stamp लगाएं और ईश्वर का आशीर्वाद स्वीकार करें।"
  }
];

export const ROUTE_SHIFTS = [
  {
    "from": "परिस्थिति (Circumstance)",
    "to": "आत्म-स्मृति (Soul Awareness)"
  },
  {
    "from": "देह-अभिमान (Body Consciousness)",
    "to": "द्रष्टा स्थिति (Detached Observer)"
  },
  {
    "from": "पुराना संस्कार (Old Habitual Reaction)",
    "to": "परमात्म-स्मृति (Divine Remembrance)"
  },
  {
    "from": "प्रतिक्रिया (Immediate Reaction)",
    "to": "स्वराज्य (Inner Sovereignty)"
  },
  {
    "from": "पछतावा (Regret & Guilt)",
    "to": "श्रेष्ठ कर्म (Elevated Response)"
  }
];

export const SWARAJYA_DECLARATIONS = [
  "मैं आत्मा हूँ।",
  "मैं शांति स्वरूप हूँ।",
  "मैं परमात्मा की संतान हूँ।",
  "मैं स्वराज्य अधिकारी हूँ।",
  "मैं द्रष्टा बन सकता हूँ।",
  "मैं अपने संस्कारों को पहचान सकता हूँ।",
  "मैं श्रीमत ले सकता हूँ।",
  "मैं परमात्म-स्मृति से शक्ति ले सकता हूँ।",
  "मैं श्रेष्ठ कर्म चुन सकता हूँ।",
  "मैं अपने राजाई संस्कारों को जीवन में ला सकता हूँ।"
];
