import { LanguageCode } from '../types';

export interface TranslationStrings {
  appName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  analyzeBtn: string;
  searchBtn: string;
  heroPlaceholder: string;
  disclaimer: string;
  trustVerified: string;
  trustAiAssisted: string;
  trustOfficialRequired: string;
  leavingBisenceTitle: string;
  leavingBisenceDesc: string;
  proceedToOfficial: string;
  cancelBtn: string;
  nav: {
    discover: string;
    services: string;
    notifications: string;
    consumer: string;
    industry: string;
    labFinder: string;
    hallmarking: string;
    docIntelligence: string;
    knowledgeGraph: string;
    aiAssistant: string;
    adminDemo: string;
    signIn: string;
  };
  smartIntake: {
    title: string;
    dnaTitle: string;
    confidence: string;
    missingNotice: string;
    continueBtn: string;
    editBtn: string;
  };
  roles: {
    manufacturer: string;
    consumer: string;
    laboratory: string;
    jeweller: string;
    student: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationStrings> = {
  en: {
    appName: 'BISENCE',
    tagline: 'From Product Idea to the Right Indian Standard — With Evidence.',
    heroTitle: 'Find the Right Indian Standard. Plan the Right Compliance Journey.',
    heroSubtitle: 'Describe your product in your own words. BISENCE helps you discover potentially relevant Indian Standards, BIS services, notifications, and next steps with transparent evidence.',
    analyzeBtn: 'Analyze with BISENCE AI',
    searchBtn: 'Search Standards',
    heroPlaceholder: 'I manufacture stainless-steel kitchen equipment for commercial restaurants.',
    disclaimer: 'This AI provides guidance based on available knowledge. It does not replace official BIS certification, testing, legal, or regulatory decisions.',
    trustVerified: 'Verified Source Info',
    trustAiAssisted: 'AI-Assisted Recommendation',
    trustOfficialRequired: 'Official Verification Required',
    leavingBisenceTitle: 'You are leaving BISENCE',
    leavingBisenceDesc: 'You are now navigating to an external official government portal (such as manakonline.in or bis.gov.in). Always verify official notification references directly on the official portal.',
    proceedToOfficial: 'Proceed to Official Portal',
    cancelBtn: 'Stay on BISENCE',
    nav: {
      discover: 'Discover Standards',
      services: 'BIS Services',
      notifications: 'Notifications',
      consumer: 'Consumer Centre',
      industry: 'Industry Workspace',
      labFinder: 'Lab Finder',
      hallmarking: 'Hallmarking',
      docIntelligence: 'Doc Intelligence',
      knowledgeGraph: 'Knowledge Graph',
      aiAssistant: 'AI Assistant',
      adminDemo: 'Admin Demo',
      signIn: 'Sign In'
    },
    smartIntake: {
      title: 'Product Intelligence Card',
      dnaTitle: 'Product DNA Profile',
      confidence: 'Assessment Confidence',
      missingNotice: 'BISENCE needs 2 more details to improve discovery.',
      continueBtn: 'Continue to Discovery',
      editBtn: 'Edit Details'
    },
    roles: {
      manufacturer: 'Manufacturer / MSME',
      consumer: 'Consumer',
      laboratory: 'Testing Laboratory',
      jeweller: 'Jeweller / Bullion',
      student: 'Student / Researcher'
    }
  },
  hi: {
    appName: 'BISENCE (बाइसेंस)',
    tagline: 'उत्पाद विचार से सही भारतीय मानक तक — साक्ष्य के साथ।',
    heroTitle: 'सही भारतीय मानक खोजें। सही अनुपालन यात्रा की योजना बनाएं।',
    heroSubtitle: 'अपने उत्पाद का वर्णन अपनी भाषा में करें। बाइसेंस आपको प्रासंगिक भारतीय मानकों, बीआईएस सेवाओं, अधिसूचनाओं और पारदर्शी साक्ष्य के साथ मार्गदर्शन प्रदान करता है।',
    analyzeBtn: 'बाइसेंस एआई से विश्लेषण करें',
    searchBtn: 'मानक खोजें',
    heroPlaceholder: 'मैं वाणिज्यिक रेस्तरां के लिए स्टेनलेस-स्टील रसोई उपकरण बनाता हूं।',
    disclaimer: 'यह एआई उपलब्ध ज्ञान के आधार पर मार्गदर्शन प्रदान करता है। यह आधिकारिक बीआईएस प्रमाणन, परीक्षण या कानूनी निर्णयों का स्थान नहीं लेता है।',
    trustVerified: 'सत्यापित स्रोत सूचना',
    trustAiAssisted: 'एआई-सहायता प्राप्त अनुशंसा',
    trustOfficialRequired: 'आधिकारिक सत्यापन आवश्यक',
    leavingBisenceTitle: 'आप बाइसेंस छोड़ रहे हैं',
    leavingBisenceDesc: 'आप आधिकारिक सरकारी पोर्टल (manakonline.in या bis.gov.in) पर जा रहे हैं। आधिकारिक अधिसूचनाओं का सत्यापन हमेशा आधिकारिक पोर्टल पर करें।',
    proceedToOfficial: 'आधिकारिक पोर्टल पर जाएं',
    cancelBtn: 'बाइसेंस पर रहें',
    nav: {
      discover: 'मानक खोजें',
      services: 'बीआईएस सेवाएं',
      notifications: 'अधिसूचनाएं',
      consumer: 'उपभोक्ता केंद्र',
      industry: 'उद्योग कार्यक्षेत्र',
      labFinder: 'प्रयोगशाला खोजें',
      hallmarking: 'हॉलमार्किंग',
      docIntelligence: 'दस्तावेज़ ज्ञान',
      knowledgeGraph: 'ज्ञान आरेख',
      aiAssistant: 'एआई सहायक',
      adminDemo: 'प्रशासक डेमो',
      signIn: 'साइन इन करें'
    },
    smartIntake: {
      title: 'उत्पाद बुद्धिमत्ता कार्ड',
      dnaTitle: 'उत्पाद डीएनए प्रोफाइल',
      confidence: 'आकलन विश्वास',
      missingNotice: 'सटीक खोज के लिए बाइसेंस को 2 और विवरणों की आवश्यकता है।',
      continueBtn: 'खोज जारी रखें',
      editBtn: 'विवरण संपादित करें'
    },
    roles: {
      manufacturer: 'निर्माता / एमएसएमई',
      consumer: 'उपभोक्ता',
      laboratory: 'परीक्षण प्रयोगशाला',
      jeweller: 'ज्वैलर / सर्राफा',
      student: 'विद्यार्थी / शोधकर्ता'
    }
  },
  te: {
    appName: 'BISENCE',
    tagline: 'ఉత్పత్తి ఆలోచన నుండి సరైన భారతీయ ప్రమాణం వరకు — సాక్ష్యాధారాలతో.',
    heroTitle: 'సరైన భారతీయ ప్రమాణాన్ని కనుగొనండి. ఖచ్చితమైన నియంత్రణ ప్రణాళికను రూపొందించండి.',
    heroSubtitle: 'మీ ఉత్పత్తిని మీ స్వంత మాటల్లో వివరించండి. అనువైన భారతీయ ప్రమాణాలు, BIS సేవలు మరియు మార్గదర్శకాలను తెలుసుకోవడానికి BISENCE మీకు సహాయపడుతుంది.',
    analyzeBtn: 'BISENCE AI తో విశ్లేషించండి',
    searchBtn: 'ప్రమాణాలను శోధించండి',
    heroPlaceholder: 'నేను వాణిజ్య రెస్టారెంట్ల కోసం స్టెయిన్‌లెస్ స్టీల్ వంటగది పరికరాలను తయారు చేస్తాను.',
    disclaimer: 'ఈ AI అందుబాటులో ఉన్న సమాచారం ఆధారంగా మాత్రమే మార్గదర్శకత్వం అందిస్తుంది. ఇది అధికారిక BIS ధృవీకరణను భర్తీ చేయదు.',
    trustVerified: 'ధృవీకరించబడిన సమాచారం',
    trustAiAssisted: 'AI-సహాయక సిఫార్సు',
    trustOfficialRequired: 'అధికారిక ధృవీకరణ అవసరం',
    leavingBisenceTitle: 'మీరు BISENCE నుండి నిష్క్రమిస్తున్నారు',
    leavingBisenceDesc: 'మీరు అధికారిక పోర్టల్ (manakonline.in) కి వెళ్తున్నారు. ఎల్లప్పుడూ అధికారిక పోర్టల్‌లో ధృవీకరించుకోండి.',
    proceedToOfficial: 'అధికారిక పోర్టల్‌కి వెళ్లండి',
    cancelBtn: 'BISENCE లోనే ఉండండి',
    nav: {
      discover: 'ప్రమాణాల శోధన',
      services: 'BIS సేవలు',
      notifications: 'నోటిఫికేషన్లు',
      consumer: 'వినియోగదారు కేంద్రం',
      industry: 'పరిశ్రమ వర్క్‌స్పేస్',
      labFinder: 'ల్యాబ్ ఫైండర్',
      hallmarking: 'హాల్‌మార్కింగ్',
      docIntelligence: 'డాక్యుమెంట్ ఇంటెలిజెన్స్',
      knowledgeGraph: 'నాలెడ్జ్ గ్రాఫ్',
      aiAssistant: 'AI సహాయకుడు',
      adminDemo: 'అడ్మిన్ డెమో',
      signIn: 'సైన్ ఇన్'
    },
    smartIntake: {
      title: 'ఉత్పత్తి ఇంటెలిజెన్స్ కార్డ్',
      dnaTitle: 'ఉత్పత్తి DNA ప్రొఫైల్',
      confidence: 'విశ్వసనీయత స్కోర్',
      missingNotice: 'శోధన మెరుగుపరచడానికి BISENCE కి మరో 2 వివరాలు అవసరం.',
      continueBtn: 'శోధన కొనసాగించండి',
      editBtn: 'సవరించండి'
    },
    roles: {
      manufacturer: 'తయారీదారు / MSME',
      consumer: 'వినియోగదారుడు',
      laboratory: 'పరీక్షా ప్రయోగశాల',
      jeweller: 'నగల వ్యాపారి',
      student: 'విద్యార్థి / పరిశోధకుడు'
    }
  },
  ta: {
    appName: 'BISENCE',
    tagline: 'தயாரிப்பு யோசனையிலிருந்து சரியான இந்திய தரம் வரை — ஆதாரத்துடன்.',
    heroTitle: 'சரியான இந்திய தரத்தைக் கண்டறியவும். இணக்கப் பயணத்தைத் திட்டமிடுங்கள்.',
    heroSubtitle: 'உங்கள் தயாரிப்பை உங்கள் சொந்த வார்த்தைகளில் விவரிக்கவும். பொருத்தமான இந்தியத் தரநிலைகள் மற்றும் BIS சேவைகளைக் கண்டறிய BISENCE உதவுகிறது.',
    analyzeBtn: 'BISENCE AI உடன் பகுப்பாய்வு செய்க',
    searchBtn: 'தரநிலைகளைத் தேடுங்கள்',
    heroPlaceholder: 'வணிக உணவகங்களுக்கான துருப்பிடிக்காத எஃகு சமையலறை உபகரணங்களை நான் தயாரிக்கிறேன்.',
    disclaimer: 'இந்த AI கிடைக்கக்கூடிய அறிவின் அடிப்படையில் வழிகாட்டுதலை வழங்குகிறது. இது அதிகாரப்பூர்வ BIS சான்றிதழை மாற்றாது.',
    trustVerified: 'சரிபார்க்கப்பட்ட தகவல்',
    trustAiAssisted: 'AI பரிந்துரை',
    trustOfficialRequired: 'அதிகாரப்பூர்வ சரிபார்ப்பு தேவை',
    leavingBisenceTitle: 'நீங்கள் BISENCE ஐ விட்டு வெளியேறுகிறீர்கள்',
    leavingBisenceDesc: 'நீங்கள் அதிகாரப்பூர்வ அரசு தளத்திற்கு (manakonline.in) செல்கிறீர்கள். விவரங்களை அங்கே சரிபார்க்கவும்.',
    proceedToOfficial: 'அதிகாரப்பூர்வ தளத்திற்குச் செல்லவும்',
    cancelBtn: 'BISENCE இல் இருங்கள்',
    nav: {
      discover: 'தரநிலைகள் கண்டறிதல்',
      services: 'BIS சேவைகள்',
      notifications: 'அறிவிப்புகள்',
      consumer: 'நுகர்வோர் மையம்',
      industry: 'தொழில்துறை பணியிடம்',
      labFinder: 'ஆய்வகக் கண்டுபிடிப்பான்',
      hallmarking: 'ஹால்மார்க்கிங்',
      docIntelligence: 'ஆவண நுண்ணறிவு',
      knowledgeGraph: 'அறிவு வரைபடம்',
      aiAssistant: 'AI உதவியாளர்',
      adminDemo: 'நிர்வாகி டெமோ',
      signIn: 'உள்நுழைக'
    },
    smartIntake: {
      title: 'தயாரிப்பு நுண்ணறிவு அட்டை',
      dnaTitle: 'தயாரிப்பு DNA விவரக்குறிப்பு',
      confidence: 'மதிப்பீட்டு நம்பிக்கை',
      missingNotice: 'தேடலை மேம்படுத்த BISENCE க்கு மேலும் 2 விவரங்கள் தேவை.',
      continueBtn: 'தேடலைத் தொடரவும்',
      editBtn: 'திருத்து'
    },
    roles: {
      manufacturer: 'உற்பத்தியாளர் / MSME',
      consumer: 'நுகர்வோர்',
      laboratory: 'சோதனை ஆய்வகம்',
      jeweller: 'நகைக் கடைக்காரர்',
      student: 'மாணவர் / ஆய்வாளர்'
    }
  },
  kn: {
    appName: 'BISENCE',
    tagline: 'ಉತ್ಪನ್ನ ಕಲ್ಪನೆಯಿಂದ ಸರಿಯಾದ ಭಾರತೀಯ ಗುಣಮಟ್ಟದವರೆಗೆ — ಸಾಕ್ಷ್ಯದೊಂದಿಗೆ.',
    heroTitle: 'ಸರಿಯಾದ ಭಾರತೀಯ ಗುಣಮಟ್ಟವನ್ನು ಕಂಡುಕೊಳ್ಳಿ. ಸರಿಯಾದ ಅನುಸರಣಾ ಪ್ರಯಾಣವನ್ನು ಯೋಜಿಸಿ.',
    heroSubtitle: 'ನಿಮ್ಮ ಉತ್ಪನ್ನವನ್ನು ನಿಮ್ಮ ಸ್ವಂತ ಪದಗಳಲ್ಲಿ ವಿವರಿಸಿ. ಸೂಕ್ತವಾದ ಭಾರತೀಯ ಮಾನದಂಡಗಳು ಮತ್ತು BIS ಸೇವೆಗಳನ್ನು ಅನ್ವೇಷಿಸಲು BISENCE ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
    analyzeBtn: 'BISENCE AI ನೊಂದಿಗೆ ವಿಶ್ಲೇಷಿಸಿ',
    searchBtn: 'ಮಾನದಂಡಗಳನ್ನು ಹುಡುಕಿ',
    heroPlaceholder: 'ನಾನು ವಾಣಿಜ್ಯ ರೆಸ್ಟೋರೆಂಟ್‌ಗಳಿಗಾಗಿ ಸ್ಟೇನ್‌ಲೆಸ್-ಸ್ಟೀಲ್ ಅಡುಗೆಮನೆ ಉಪಕರಣಗಳನ್ನು ತಯಾರಿಸುತ್ತೇನೆ.',
    disclaimer: 'ಈ AI ಲಭ್ಯವಿರುವ ಜ್ಞಾನದ ಆಧಾರದ ಮೇಲೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ. ಇದು ಅಧಿಕೃತ BIS ಪ್ರಮಾಣೀಕರಣವನ್ನು ಬದಲಿಸುವುದಿಲ್ಲ.',
    trustVerified: 'ಪರಿಶೀಲಿಸಿದ ಮೂಲ ಮಾಹಿತಿ',
    trustAiAssisted: 'AI-ಸಹಾಯದ ಶಿಫಾರಸು',
    trustOfficialRequired: 'ಅಧಿಕೃತ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ',
    leavingBisenceTitle: 'ನೀವು BISENCE ನಿಂದ ನಿರ್ಗಮಿಸುತ್ತಿದ್ದೀರಿ',
    leavingBisenceDesc: 'ನೀವು ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್‌ಗೆ (manakonline.in) ತೆರಳುತ್ತಿದ್ದೀರಿ. ಯಾವಾಗಲೂ ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.',
    proceedToOfficial: 'ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗೆ ಮುಂದುವರಿಯಿರಿ',
    cancelBtn: 'BISENCE ನಲ್ಲಿ ಇರಿ',
    nav: {
      discover: 'ಮಾನದಂಡಗಳ ಶೋಧನೆ',
      services: 'BIS ಸೇವೆಗಳು',
      notifications: 'ಅಧಿಸೂಚನೆಗಳು',
      consumer: 'ಗ್ರಾಹಕ ಕೇಂದ್ರ',
      industry: 'ಉದ್ಯಮ ಕಾರ್ಯಕ್ಷೇತ್ರ',
      labFinder: 'ಪ್ರಯೋಗಾಲಯ ಹುಡುಕಾಟ',
      hallmarking: 'ಹಾಲ್‌ಮಾರ್ಕಿಂಗ್',
      docIntelligence: 'ದಾಖಲೆ ಬುದ್ಧಿಮತ್ತೆ',
      knowledgeGraph: 'ಜ್ಞಾನ ನಕ್ಷೆ',
      aiAssistant: 'AI ಸಹಾಯಕ',
      adminDemo: 'ನಿರ್ವಾಹಕ ಡೆಮೊ',
      signIn: 'ಸೈನ್ ಇನ್'
    },
    smartIntake: {
      title: 'ಉತ್ಪನ್ನ ಬುದ್ಧಿಮತ್ತೆ ಕಾರ್ಡ್',
      dnaTitle: 'ಉತ್ಪನ್ನ DNA ಪ್ರೊಫೈಲ್',
      confidence: 'ಮೌಲ್ಯಮಾಪನ ವಿಶ್ವಾಸ',
      missingNotice: 'ಶೋಧನೆ ಸುಧಾರಿಸಲು BISENCE ಗೆ ಇನ್ನೆರಡು ವಿವರಗಳ ಅಗತ್ಯವಿದೆ.',
      continueBtn: 'ಶೋಧನೆಯನ್ನು ಮುಂದುವರಿಸಿ',
      editBtn: 'ವಿವರಗಳನ್ನು ತಿದ್ದಿ'
    },
    roles: {
      manufacturer: 'ತಯಾರಕರು / MSME',
      consumer: 'ಗ್ರಾಹಕರು',
      laboratory: 'ಪರೀಕ್ಷಾ ಪ್ರಯೋಗಾಲಯ',
      jeweller: 'ಚಿನ್ನದ ವ್ಯಾಪಾರಿ',
      student: 'ವಿದ್ಯಾರ್ಥಿ / ಸಂಶೋಧಕ'
    }
  },
  bn: {
    appName: 'BISENCE (বাইসেন্স)',
    tagline: 'পণ্যের ধারণা থেকে সঠিক ভারতীয় মানক পর্যন্ত — প্রমাণ সহ।',
    heroTitle: 'সঠিক ভারতীয় মান খুঁজুন। সঠিক মান্যতা ও কমপ্লায়েন্স যাত্রার পরিকল্পনা করুন।',
    heroSubtitle: 'আপনার ভাষায় আপনার পণ্যের বিবরণ দিন। প্রাসঙ্গিক ভারতীয় মান, বিআইএস পরিষেবা এবং বিজ্ঞপ্তি আবিষ্কারে BISENCE আপনাকে সহায়তা করে।',
    analyzeBtn: 'BISENCE AI দিয়ে বিশ্লেষণ করুন',
    searchBtn: 'মানক অনুসন্ধান করুন',
    heroPlaceholder: 'আমি বাণিজ্যিক রেস্তোরাঁর জন্য স্টেইনলেস স্টিলের রান্নাঘরের সরঞ্জাম তৈরি করি।',
    disclaimer: 'এই এআই উপলব্ধ তথ্যের ভিত্তিতে নির্দেশিকা প্রদান করে। এটি অফিসিয়াল বিআইএস শংসাপত্র বা পরীক্ষার বিকল্প নয়।',
    trustVerified: 'যাচাইকৃত উৎস তথ্য',
    trustAiAssisted: 'এআই-সহায়তাপ্রাপ্ত সুপারিশ',
    trustOfficialRequired: 'অফিসিয়াল যাচাইকরণ আবশ্যক',
    leavingBisenceTitle: 'আপনি BISENCE ছেড়ে যাচ্ছেন',
    leavingBisenceDesc: 'আপনি এখন অফিসিয়াল সরকারি পোর্টালে (manakonline.in) যাচ্ছেন। তথ্য সর্বদা মূল পোর্টালে যাচাই করুন।',
    proceedToOfficial: 'অফিসিয়াল পোর্টালে যান',
    cancelBtn: 'BISENCE-এ থাকুন',
    nav: {
      discover: 'মানক আবিষ্কার',
      services: 'বিআইএস পরিষেবা',
      notifications: 'বিজ্ঞপ্তি',
      consumer: 'ভোক্তা কেন্দ্র',
      industry: 'শিল্প কর্মক্ষেত্র',
      labFinder: 'ল্যাব সন্ধানকারী',
      hallmarking: 'হলমার্কিং',
      docIntelligence: 'নথি গোয়েন্দা',
      knowledgeGraph: 'জ্ঞান চিত্র',
      aiAssistant: 'এআই সহকারী',
      adminDemo: 'অ্যাডমিন ডেমো',
      signIn: 'সাইন ইন'
    },
    smartIntake: {
      title: 'পণ্য বুদ্ধিমত্তা কার্ড',
      dnaTitle: 'পণ্য ডিএনএ প্রোফাইল',
      confidence: 'মূল্যায়ন আত্মবিশ্বাস',
      missingNotice: 'অনুসন্ধান উন্নত করতে BISENCE-এর আরও ২টি তথ্যের প্রয়োজন।',
      continueBtn: 'অনুসন্ধান চালিয়ে যান',
      editBtn: 'সম্পাদনা করুন'
    },
    roles: {
      manufacturer: 'প্রস্তুতকারক / এমএসএমই',
      consumer: 'ভোক্তা',
      laboratory: 'পরীক্ষাগার',
      jeweller: 'স্বর্ণ ব্যবসায়ী',
      student: 'ছাত্র / গবেষক'
    }
  },
  mr: {
    appName: 'BISENCE (बायसेन्स)',
    tagline: 'उत्पादन कल्पनेपासून योग्य भारतीय मानकापर्यंत — पुराव्यासह.',
    heroTitle: 'योग्य भारतीय मानक शोधा. योग्य अनुपालन प्रवासाचे नियोजन करा.',
    heroSubtitle: 'तुमच्या उत्पादनाचे वर्णन स्वतःच्या शब्दांत करा. BISENCE तुम्हाला संबंधित भारतीय मानके, बीआयएस सेवा आणि पारदर्शक पुरावे शोधण्यात मदत करते.',
    analyzeBtn: 'BISENCE AI द्वारे विश्लेषण करा',
    searchBtn: 'मानके शोधा',
    heroPlaceholder: 'मी व्यावसायिक हॉटेल्ससाठी स्टेनलेस-स्टील स्वयंपाकघरातील उपकरणे तयार करतो.',
    disclaimer: 'हे AI उपलब्ध ज्ञानावर आधारित मार्गदर्शन पुरवते. हे अधिकृत BIS प्रमाणीकरण किंवा चाचणी निर्णयांची जागा घेत नाही.',
    trustVerified: 'सत्यापित स्रोत माहिती',
    trustAiAssisted: 'AI-सहाय्यित शिफारस',
    trustOfficialRequired: 'अधिकृत पडताळणी आवश्यक',
    leavingBisenceTitle: 'तुम्ही BISENCE सोडत आहात',
    leavingBisenceDesc: 'तुम्ही अधिकृत सरकारी पोर्टलवर (manakonline.in) जात आहात. नेहमी अधिकृत पोर्टलवर माहिती तपासा.',
    proceedToOfficial: 'अधिकृत पोर्टलवर जा',
    cancelBtn: 'BISENCE वरच रहा',
    nav: {
      discover: 'मानके शोधा',
      services: 'BIS सेवा',
      notifications: 'अधिसूचना',
      consumer: 'ग्राहक केंद्र',
      industry: 'उद्योग कार्यक्षेत्र',
      labFinder: 'प्रयोगशाळा शोध',
      hallmarking: 'हॉलमार्किंग',
      docIntelligence: 'दस्तऐवज बुद्धिमत्ता',
      knowledgeGraph: 'ज्ञान आलेख',
      aiAssistant: 'AI सहाय्यक',
      adminDemo: 'प्रशासक डेमो',
      signIn: 'साइन इन'
    },
    smartIntake: {
      title: 'उत्पादन बुद्धिमत्ता कार्ड',
      dnaTitle: 'उत्पादन डीएनए प्रोफाइल',
      confidence: 'मूल्यांकन विश्वास',
      missingNotice: 'अचूक शोधासाठी BISENCE ला आणखी २ तपशीलांची आवश्यकता आहे.',
      continueBtn: 'शोध सुरू ठेवा',
      editBtn: 'तपशील संपादित करा'
    },
    roles: {
      manufacturer: 'उत्पादक / एमएसएमई',
      consumer: 'ग्राहक',
      laboratory: 'चाचणी प्रयोगशाळा',
      jeweller: 'सुवर्णकार / सराफ',
      student: 'विद्यार्थी / संशोधक'
    }
  }
};
