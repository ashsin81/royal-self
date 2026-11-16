export interface SpiritualAvatar {
  id: string;
  nameHi: string;
  nameEn: string;
  descriptionHi: string;
  category: 'farishta' | 'paramdham' | 'sovereign' | 'tapaswi' | 'jyoti';
  imageUrl: string;
  fallbackGradient: string;
  icon: string;
}

export interface HigherSelfArtwork {
  id: string;
  titleHi: string;
  titleEn: string;
  subtitleHi: string;
  descriptionHi: string;
  imageUrl: string;
  drishtiSutra: string;
  swaman: string;
  audioAffirmationHi: string;
}

export const SPIRITUAL_AVATARS: SpiritualAvatar[] = [
  {
    id: 'avatar-farishta-1',
    nameHi: 'प्रकाशमय फरिश्ता स्वरूप',
    nameEn: 'Radiant Farishta',
    descriptionHi: 'सम्पूर्ण देहभान से मुक्त, श्वेत-स्वर्ण आभा युक्त दिव्य प्रकाश का फरिश्ता।',
    category: 'farishta',
    imageUrl: './avatars/farishta_higher_self.jpg',
    fallbackGradient: 'from-amber-400 via-rose-300 to-amber-100',
    icon: '🪽'
  },
  {
    id: 'avatar-paramdham-1',
    nameHi: 'परमधाम में आत्मा व शिवबाबा',
    nameEn: 'Soul & Shiva in Paramdham',
    descriptionHi: 'लाल-सुनहरे परमधाम में ज्ञान सूर्य शिवबाबा के सम्मुख चमकता ज्योतिर्बिंदु।',
    category: 'paramdham',
    imageUrl: './avatars/paramdham_soul_shiva.jpg',
    fallbackGradient: 'from-rose-600 via-amber-600 to-orange-400',
    icon: '✨'
  },
  {
    id: 'avatar-sovereign-1',
    nameHi: 'स्वराज्य अधिकारी मुकुटधारी',
    nameEn: 'Royal Sovereign Soul',
    descriptionHi: 'आत्मिक स्वमान के तख्त पर विराजमान, प्रकाश के ताज से सुशोभित राजऋषि।',
    category: 'sovereign',
    imageUrl: './avatars/royal_swarajya_sovereign.jpg',
    fallbackGradient: 'from-amber-500 via-yellow-400 to-amber-700',
    icon: '👑'
  },
  {
    id: 'avatar-tapaswi-1',
    nameHi: 'अमृतवेला तपस्वी राजयोगी',
    nameEn: 'Tapaswi Rajyogi',
    descriptionHi: 'गहन मौन व पवित्रता की लहरों में मग्न, अमृतवेले का सच्चा तपस्वी।',
    category: 'tapaswi',
    imageUrl: './avatars/tapaswi_yogi.jpg',
    fallbackGradient: 'from-purple-600 via-pink-500 to-amber-400',
    icon: '🧘'
  },
  {
    id: 'avatar-lotus-1',
    nameHi: 'पवित्रता का श्वेत कमल',
    nameEn: 'Purity Lotus Soul',
    descriptionHi: 'कीचड़ से न्यारा, प्रभु चरणों में प्यारा, निर्लेप और अनासक्त स्वरूप।',
    category: 'farishta',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=80',
    fallbackGradient: 'from-teal-400 via-emerald-300 to-teal-100',
    icon: '🪷'
  },
  {
    id: 'avatar-shakti-1',
    nameHi: 'मास्टर सर्वशक्तिमान',
    nameEn: 'Master Almighty',
    descriptionHi: 'अष्ट शक्तियों से संपन्न, मायाजीत और प्रकृतिजीत निर्भय योद्धा स्वरूप।',
    category: 'sovereign',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400&auto=format&fit=crop&q=80',
    fallbackGradient: 'from-maroon-700 via-rose-600 to-amber-500',
    icon: '🛡️'
  }
];

export const HIGHER_SELF_ARTWORKS: HigherSelfArtwork[] = [
  {
    id: 'hs-farishta',
    titleHi: 'मेरा श्रेष्ठ फरिश्ता स्वरूप',
    titleEn: 'Angelic Light Body (Farishta)',
    subtitleHi: 'देही-अभिमानी स्थिति • सम्पूर्ण प्रकाश का देह',
    descriptionHi: 'मैं देह नहीं, श्वेत-स्वर्ण आभा युक्त चैतन्य फरिश्ता हूँ। इस पुरानी दुनिया से उपराम, परमात्मा बाप की छत्रछाया में उड़ता हुआ उड़ता पंछी।',
    imageUrl: './avatars/farishta_higher_self.jpg',
    drishtiSutra: 'सम्पूर्ण पवित्र, हल्का, डबल-लाइट स्वरूप',
    swaman: 'मैं एक फरिश्ता हूँ — न मेरा किसी से कोई हिसाब-किताब, न कोई भारीपन।',
    audioAffirmationHi: 'मैं देह के बंधनों से मुक्त, प्रकाश का फरिश्ता हूँ। मेरी हर दृष्टि में शांति और पवित्रता का वरदान समाया है। ओम शांति।'
  },
  {
    id: 'hs-paramdham',
    titleHi: 'परमधाम में मुक्ति-धाम की स्थिति',
    titleEn: 'Soul in Incorporeal Paramdham',
    subtitleHi: 'अनादि शांत स्वरूप • ज्योतिर्बिंदु स्थिति',
    descriptionHi: 'लाल-सुनहरे प्रकाश के सागर में, मैं आत्मा अपने परमपिता शिव परमात्मा के सम्मुख बैठी हूँ। सर्व शक्तियों और शांति की किरणें मुझमें समा रही हैं।',
    imageUrl: './avatars/paramdham_soul_shiva.jpg',
    drishtiSutra: 'ज्ञान सूर्य शिवबाबा से निरंतर सकाश की प्राप्ति',
    swaman: 'मैं ज्ञान सूर्य शिव बाबा का बिंदु स्वरूप, सर्व खजानों से भरपूर लाडला बच्चा हूँ।',
    audioAffirmationHi: 'मैं परमधाम निवासी, शांत स्वरूप ज्योतिर्बिंदु आत्मा हूँ। बाबा से अखंड शांति और पवित्रता की किरणें मुझमें समा रही हैं।'
  },
  {
    id: 'hs-sovereign',
    titleHi: 'स्वराज्य अधिकारी राजऋषि स्वरूप',
    titleEn: 'Royal Sovereign Ruler (Swarajya Adhikari)',
    subtitleHi: 'आत्मिक स्वमान का तख्त • ज्ञान-प्रकाश का ताज',
    descriptionHi: 'मन, बुद्धि और सर्व कर्मेन्द्रियों पर मेरा पूर्ण स्वराज्य है। मैं किसी परिस्थिति के अधीन नहीं, बल्कि अपनी श्रेष्ठ स्थिति के आसन पर विराजमान राजा हूँ।',
    imageUrl: './avatars/royal_swarajya_sovereign.jpg',
    drishtiSutra: 'आत्म-संप्रभुता और प्रकृतिजीत स्थिति',
    swaman: 'मैं स्वराज्य अधिकारी, प्रकृतिजीत और विकर्माजीत आत्मा हूँ।',
    audioAffirmationHi: 'मैं स्वराज्य अधिकारी आत्मा हूँ। मेरा मन, मेरी बुद्धि मेरी आज्ञा में हैं। कोई भी परिस्थिति मेरी शांति को हिला नहीं सकती।'
  },
  {
    id: 'hs-tapaswi',
    titleHi: 'अमृतवेला महातपस्वी स्वरूप',
    titleEn: 'Tapaswi Rajyogi at Dawn',
    subtitleHi: 'एकाग्रता की चरम सीमा • ज्वाला स्वरूप योग',
    descriptionHi: 'अमृतवेले के शांत वातावरण में, बाबा के महावाक्यों पर मनन करते हुए, अंतर्मुखी होकर स्वयं को परमात्मा की गोद में समर्पित करने का दिव्य स्वरूप।',
    imageUrl: './avatars/tapaswi_yogi.jpg',
    drishtiSutra: 'ज्वाला स्वरूप याद द्वारा पुराने संस्कारों का भस्म होना',
    swaman: 'मैं एकाग्रचित्त, दृढ़ संकल्पी और विजयी तपस्वी आत्मा हूँ।',
    audioAffirmationHi: 'मैं तपस्वी राजयोगी आत्मा हूँ। मेरी एकाग्रता अचल-अडोल है। सर्व पुराने संस्कार परमात्मा की याद की अग्नि में भस्म हो रहे हैं।'
  }
];
