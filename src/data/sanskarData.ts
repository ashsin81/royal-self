import { QualityDefinition, BaggageItem } from '../types';

export const HIGHER_SELF_QUALITIES: QualityDefinition[] = [
  { id: 'shant', nameHi: 'शांत स्वरूप', nameEn: 'Embodiment of Peace', descriptionHi: 'गंभीर, अचल और शांत महासागर की तरह स्थिर स्थिति', icon: '🕊️' },
  { id: 'prem', nameHi: 'प्रेम स्वरूप', nameEn: 'Embodiment of Love', descriptionHi: 'निस्वार्थ, आत्मिक और सबके प्रति स्नेह-सम्पन्न दृष्टि', icon: '💖' },
  { id: 'anand', nameHi: 'आनंद स्वरूप', nameEn: 'Embodiment of Bliss', descriptionHi: 'सदा आंतरिक खुशी और उल्लास से भरपूर स्थिति', icon: '✨' },
  { id: 'shakti', nameHi: 'शक्तिशाली स्वरूप', nameEn: 'Embodiment of Power', descriptionHi: 'माया और विकारों पर सहज विजय पाने वाली शक्ति', icon: '⚡' },
  { id: 'gyan', nameHi: 'ज्ञान स्वरूप', nameEn: 'Embodiment of Wisdom', descriptionHi: 'सत्य और असत्य को एक सेकंड में परखने वाली दिव्य बुद्धि', icon: '☀️' },
  { id: 'pavitra', nameHi: 'पवित्र स्वरूप', nameEn: 'Embodiment of Purity', descriptionHi: 'निर्विकारी, निष्पाप और दिव्य दृष्टि-वृत्ति', icon: '🪷' },
  { id: 'sukh', nameHi: 'सुख स्वरूप', nameEn: 'Embodiment of Joy', descriptionHi: 'सुखदायी बोल, सुखदायी कर्म और सुखदायी संकल्प', icon: '🌸' },
  { id: 'santusht', nameHi: 'संतुष्ट स्वरूप', nameEn: 'Embodiment of Contentment', descriptionHi: 'सदा भरपूर, अप्राप्त नहीं कोई वस्तु इस जीवन में', icon: '💎' },
  { id: 'nirbhay', nameHi: 'निर्भय स्वरूप', nameEn: 'Embodiment of Fearlessness', descriptionHi: 'अकालमूर्त, परमात्मा के छत्रछाया में सुरक्षित', icon: '🦁' },
  { id: 'nirvikari', nameHi: 'निर्विकारी स्वरूप', nameEn: 'Embodiment of Virtue', descriptionHi: 'सर्व विकारों और देह-अभिमान से पूर्णतः मुक्त', icon: '🕊️' },
  { id: 'swadarshan', nameHi: 'स्वदर्शन चक्रधारी स्वरूप', nameEn: 'Self-Realized Soul', descriptionHi: 'अपने अनादि और आदि श्रेष्ठ स्वरूप का निरंतर दर्शन', icon: '☸️' },
  { id: 'master-sarvashaktiman', nameHi: 'मास्टर सर्वशक्तिमान स्वरूप', nameEn: 'Master Almighty Authority', descriptionHi: 'सर्व खजानों और शक्तियों के मालिक सो बालक', icon: '👑' }
];

export const SANSKAR_GOAL_PRESETS = [
  {
    category: 'क्रोध → शांति',
    oldSanskar: 'प्रतिक्रिया और चिड़चिड़ापन',
    newSanskar: 'धैर्य और आंतरिक शांति',
    trigger: 'जब कोई अनुचित या अव्यावहारिक बात करता है',
    oldResponse: 'तुरंत गुस्से से जवाब देना और खुद को सही सिद्ध करना',
    newResponse: 'पहले 3 सेकंड शांत रहना, गहरी सांस लेना और विनम्रता से उत्तर देना',
    dailyPractice: 'आज किसी भी परिस्थिति में अपनी आवाज को धीमा और मधुर रखूँगा/रखूँगी',
    ifThenPlan: 'यदि कोई मेरे सामने क्रोध करेगा, तो मैं उसे अशांत आत्मा समझकर शांति का सकाश दूँगा/दूँगी।'
  },
  {
    category: 'अपेक्षा → आत्मसम्मान',
    oldSanskar: 'दूसरों से प्रशंसा व कद्र की अपेक्षा',
    newSanskar: 'स्वमान और संतुष्टता',
    trigger: 'जब मेरे अच्छे काम की कोई सराहना नहीं करता',
    oldResponse: 'मन में खिन्नता आना और सेवा का उत्साह कम हो जाना',
    newResponse: 'स्वयं को याद दिलाना: मैं परमात्मा का बच्चा हूँ, बाबा मेरा साथी है',
    dailyPractice: 'आज कोई भी कर्म केवल बाबा की प्रसन्नता के लिए करूँगा, इंसानों की वाह-वाह के लिए नहीं',
    ifThenPlan: 'यदि कोई मेरी उपेक्षा करेगा, तो मैं अपने स्वमान में स्थित होकर दाता बनूँगा।'
  },
  {
    category: 'व्यर्थ संकल्प → शुभ संकल्प',
    oldSanskar: 'भूतकाल व भविष्य की व्यर्थ चिंता (Overthinking)',
    newSanskar: 'समर्थ संकल्प और वर्तमान में एकाग्रता',
    trigger: 'जब कोई अनपेक्षित परिस्थिति या पुरानी बात सामने आती है',
    oldResponse: 'घंटों तक मन में विचारों का बवंडर चलाना',
    newResponse: 'एक सेकंड में फुलस्टॉप लगाना और बाबा की याद में बुद्धि लगाना',
    dailyPractice: 'हर घंटे ट्रैफिक कंट्रोल करके 1 मिनट के लिए मन को परमात्मा में टिकाना',
    ifThenPlan: 'यदि मन में कोई व्यर्थ संकल्प उठेगा, तो मैं तुरंत 1 स्वमान का उच्चारण करूँगा।'
  },
  {
    category: 'तुलना → स्वमान',
    oldSanskar: 'दूसरों की प्रगति या विशेषताओं से तुलना व ईर्ष्या',
    newSanskar: 'गुण-ग्राहक दृष्टि और स्वमान',
    trigger: 'जब किसी दूसरे भाई/बहन को विशेष मंच या मान मिलता है',
    oldResponse: 'असुरक्षा और उनकी कमियाँ खोजने का विचार',
    newResponse: 'उनके गुणों का सम्मान करना और उनकी खुशी में खुश होना',
    dailyPractice: 'आज कम से कम 2 व्यक्तियों की सच्ची विशेषता देखकर मन ही मन बधाई दूँगा',
    ifThenPlan: 'यदि तुलना का भाव आएगा, तो मैं याद रखूँगा: हर आत्मा का ड्रामा में अपना अद्वितीय पार्ट है।'
  },
  {
    category: 'आलस्य → तत्परता',
    oldSanskar: 'पुरुषार्थ में ढीलापन और टालमटोल',
    newSanskar: 'उमंग-उत्साह और समय की कद्र',
    trigger: 'अमृतवेला या क्लास के समय बिस्तर का खिंचाव',
    oldResponse: 'कल से पक्का करूँगा कहकर सो जाना',
    newResponse: 'उठकर तुरंत एक संकल्प करना: यह संगमयुग का अमूल्य सेकंड है',
    dailyPractice: 'अमृतवेले समय पर उठकर 20 मिनट शक्तिशाली योग का अनुभव करना',
    ifThenPlan: 'यदि आलस्य सताएगा, तो मैं तुरंत उठकर हाथ-मुँह धोकर शिव बाबा के सामने बैठूँगा।'
  },
  {
    category: 'शिकायत → संतुष्टता',
    oldSanskar: 'परिस्थितियों और व्यक्तियों से शिकायत',
    newSanskar: 'कल्याणकारी भावना और संतुष्टता',
    trigger: 'जब कार्य मेरी इच्छानुसार नहीं होता',
    oldResponse: 'यह क्यों हुआ? मेरे साथ ही ऐसा क्यों होता है?',
    newResponse: 'ड्रामा का हर दृश्य कल्याणकारी है, इसमें कोई रहस्य छिपा है',
    dailyPractice: 'आज पूरे दिन किसी भी वस्तु या व्यक्ति के प्रति शिकायत नहीं करूँगा',
    ifThenPlan: 'यदि कोई असुविधा होगी, तो मैं बाबा का शुक्रिया अदा करूँगा कि मुझे सहनशक्ति का अभ्यास मिल रहा है।'
  }
];

export const INITIAL_BAGGAGE: BaggageItem[] = [
  { id: 'b1', nameHi: 'पुरानी बातें (Past baggage)', nameEn: 'Past memories & grudges', category: 'past', isReleased: false, spiritualAntidote: 'बीती सो बीती (Full stop)' },
  { id: 'b2', nameHi: 'पुराने डर (Hidden fears)', nameEn: 'Subconscious fears', category: 'fear', isReleased: false, spiritualAntidote: 'सर्वशक्तिमान बाप सदा संग है' },
  { id: 'b3', nameHi: 'अपेक्षाएँ (Expectations)', nameEn: 'Expectations from people', category: 'desire', isReleased: false, spiritualAntidote: 'लेने वाला नहीं, दाता स्वरूप बनो' },
  { id: 'b4', nameHi: 'अहंकार (Ego & pride)', nameEn: 'Ego & righteous pride', category: 'ego', isReleased: false, spiritualAntidote: 'निर्माणता ही सच्ची महानता है' },
  { id: 'b5', nameHi: 'तुलना (Comparison)', nameEn: 'Comparison with others', category: 'comparison', isReleased: false, spiritualAntidote: 'हर आत्मा का अपना अनादि पार्ट है' },
  { id: 'b6', nameHi: 'दूसरों की राय (People pleasing)', nameEn: 'Fear of people’s opinions', category: 'attachment', isReleased: false, spiritualAntidote: 'मुझे बाबा को संतुष्ट करना है' },
  { id: 'b7', nameHi: 'पुरानी चोटें (Old hurts)', nameEn: 'Emotional wounds', category: 'hurt', isReleased: false, spiritualAntidote: 'सीख रखनी है — बोझ नहीं' },
  { id: 'b8', nameHi: 'पुराने संस्कार (Old habits)', nameEn: 'Repeated karmic patterns', category: 'habit', isReleased: false, spiritualAntidote: 'ज्वालामुखी योग द्वारा नया जन्म' }
];

export const SWARAJYA_DECLARATION_POINTS = [
  'मैं आत्मा हूँ।',
  'मैं शांति स्वरूप हूँ।',
  'मैं परमात्मा की संतान हूँ।',
  'मैं स्वराज्य अधिकारी हूँ।',
  'मैं द्रष्टा बन सकता हूँ।',
  'मैं अपने संस्कारों को पहचान सकता हूँ।',
  'मैं श्रीमत ले सकता हूँ।',
  'मैं परमात्म-स्मृति से शक्ति ले सकता हूँ।',
  'मैं श्रेष्ठ कर्म चुन सकता हूँ।',
  'मैं अपने राजाई संस्कारों को जीवन में ला सकता हूँ।'
];
