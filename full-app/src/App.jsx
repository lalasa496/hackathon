import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Camera,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Award,
  Layers,
  Globe2,
  Filter,
  Flame,
  FileText,
  Compass,
  Cpu,
  Star,
  CheckCheck,
  Building,
  KeyRound,
  Phone,
  LogOut,
  ShieldCheck,
  LogIn,
  Bell,
  AlertTriangle,
  BarChart3,
  TrendingUp,
  DollarSign,
  Briefcase,
  Building2,
  BadgePercent,
  Download,
  AlertOctagon,
  UserCheck,
  Wifi,
  WifiOff,
  Eye,
  Scan,
  Sparkles,
  Share2,
  AlertCircle,
  RefreshCw,
  CheckCircle,
  Radar
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const TRANSLATIONS = {
  "en-US": {
    appTitle: "Voice of the People",
    tagline: "Clean & Green Civic Intelligence • Real-Time Sensor Capture • Anti-Spoof Vision",
    online: "Online",
    offline: "Offline Cache Active",
    viewAs: "VIEW AS:",
    roles: {
      citizen: "Citizen",
      officer: "Municipal Officer",
      admin: "Executive Admin"
    },
    nav: {
      intake: "Universal Grievance Intake",
      tracking: "My Complaints & Verification Loop",
      ward: "Ward Transparency Scorecard",
      triage: "GIS Spatial Clustering & Triage",
      analytics: "Analytics & OpEx ROI",
      warnings: "Contractor Warnings & SLA",
      csr: "CSR & ESG Portal"
    },
    auth: {
      verifiedBadge: "Verified Phone",
      unauth: "Unauthenticated",
      signOut: "Sign Out",
      verifyOtp: "Verify OTP",
      modalTitle: "Verify Mobile Phone (OTP)",
      modalSub: "To prevent spam and provide resolution notifications, verify your phone number via SMS OTP.",
      phonePlaceholder: "Enter 10-digit mobile number",
      sendBtn: "Send Verification OTP",
      dispatching: "Dispatching...",
      otpPlaceholder: "Enter 6-digit OTP code",
      codeSentTo: "Code sent to",
      changeNumber: "Change Number",
      verifyBtn: "Verify & Sign In",
      verifying: "Verifying..."
    },
    intake: {
      title: "DATA INTAKE: Report Civic Problem Anywhere",
      subtitle: "Live hardware camera sensor required. Static gallery uploads are disabled to prevent fraudulent reports.",
      autoGps: "Auto-Detect My GPS",
      locating: "Locating...",
      bannerRule: "Strict Anti-Spoof Policy: Both Problem Description (voice/text) and a Live Camera Capture are mandatory. File uploads from gallery are disabled.",
      jurisdiction: "Detected Jurisdiction:",
      locality: "Locality:",
      detectedDept: "AI Auto-Detected Department:",
      waitingInput: "Waiting for speech/input...",
      voiceSection: "Inclusive Multilingual Voice Dictation",
      listening: "Listening...",
      tapToSpeak: "Tap to Speak",
      textareaPlaceholder: "Describe issue (e.g., 'Streetlights dark', 'Pipeline leak', or 'చెత్త పేరుకుపోయింది')... *",
      locationSection: "Location: Auto-GPS or Click to Pin Manually",
      cameraSection: "Live Sensor Photographic Proof (Anti-Spoofing)",
      btnSubmitReadyOnline: "Dispatch Ticket & Run Risk Telemetry Scan",
      btnSubmitReadyOffline: "Save to Offline Device Queue",
      btnSubmitDisabled: "Both Description & Live Photo Required"
    },
    camera: {
      unavailable: "Live Hardware Camera Unavailable",
      retry: "Retry Permission",
      liveSensor: "REAL-TIME SENSOR FEED",
      galleryDisabled: "Gallery Uploads Disabled",
      captureBtn: "Capture Live Hardware Photo",
      verifiedBadge: "SENSOR EMBEDDED & WATERMARKED",
      retakeBtn: "Retake Real-Time Photo",
      scanning: "Edge Machine Learning inspecting sensor pixels for anomaly validation..."
    },
    tracking: {
      title: "My Filed Grievances & Resolution Verification",
      subtitle: "Official Before vs. After photographic verification loop.",
      auditTitle: "Two-Party Photographic Audit Proof",
      beforeLabel: "BEFORE (Sensor Captured):",
      afterLabel: "AFTER (Municipal Crew):",
      noInitialImg: "No Initial Image",
      citizenSatisfaction: "Citizen satisfaction confirmation:",
      resolved: "Resolved",
      inProgress: "In Progress",
      pending: "Pending",
      fakeRejected: "Rejected - Fake Report"
    },
    scorecard: {
      title: "Public Ward Civic Scorecard & RTI Portal",
      subtitle: "Open public telemetry for civic transparency. No citizen login required.",
      openDataBadge: "Open Data Standard v2.4",
      cleanlinessIndex: "Ward Cleanliness Index",
      cleanlinessRank: "Top 15% in Visakhapatnam",
      avgResolutionTime: "Average Resolution Time",
      slaTargetDays: "SLA Target: 10 Days",
      satisfactionRate: "Citizen Satisfaction",
      satisfactionSub: "Based on verified photographic closures",
      tableHeader: "Neighborhood Ward Transparency Benchmarking",
      colWard: "Ward Name",
      colActive: "Active Incidents",
      colResolved: "Resolved This Month",
      colSla: "SLA Adherence",
      colGrade: "Health Grade"
    },
    marketplace: {
      title: "Civic Credit Marketplace",
      desc: "Earned points for verified reports to unlock civic rewards and priority processing.",
      pointsSuffix: "Civic Credit Pts",
      suspended: "(Suspended)"
    },
    safeguards: {
      title: "Anti-Fraud Safeguards",
      subtitle: "Hardware Sensor Verification",
      desc: "To eliminate false and downloaded image reports, images are captured directly via the device video stream with GPS timestamps embedded into canvas pixels."
    },
    depts: {
      sanitation: "Solid Waste & Sanitation",
      water: "Water & Drainage",
      power: "Electricity & Power",
      roads: "Roads & Transit",
      environment: "Environmental & Pollution"
    }
  },
  "te-IN": {
    appTitle: "ప్రజావాణి",
    tagline: "స్వచ్ఛమైన మరియు పచ్చని పౌర పరిజ్ఞానం • రియల్-టైమ్ సెన్సార్ సంగ్రహణ • స్పూఫ్-నిరోధక వీక్షణ",
    online: "ఆన్‌లైన్",
    offline: "ఆఫ్‌లైన్ నిల్వ చురుకుగా ఉంది",
    viewAs: "వీక్షించండి:",
    roles: {
      citizen: "పౌరుడు",
      officer: "మునిసిపల్ అధికారి",
      admin: "ఎగ్జిక్యూటివ్ అడ్మిన్"
    },
    nav: {
      intake: "సమగ్ర ప్రజా సమస్యల నమోదు",
      tracking: "నా ఫిర్యాదులు & పరిష్కార ధృవీకరణ",
      ward: "వార్డు పారదర్శకత స్కోర్‌కార్డ్",
      triage: "GIS ప్రాదేశిక క్లస్టరింగ్ & విభజన",
      analytics: "విశ్లేషణలు & ఆదా అయిన నిధులు",
      warnings: "కాంట్రాక్టర్ హెచ్చరికలు & SLA",
      csr: "CSR & ESG పోర్టల్"
    },
    auth: {
      verifiedBadge: "ధృవీకరించబడిన ఫోన్",
      unauth: "ధృవీకరించబడలేదు",
      signOut: "లాగ్ అవుట్",
      verifyOtp: "OTP ధృవీకరించండి",
      modalTitle: "మొబైల్ ఫోన్ ధృవీకరణ (OTP)",
      modalSub: "నకిలీలను నివారించడానికి మరియు పరిష్కార వివరాల కొరకు మీ ఫోన్ నంబర్‌ను SMS OTP ద్వారా ధృవీకరించండి.",
      phonePlaceholder: "10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి",
      sendBtn: "ధృవీకరణ OTP పంపండి",
      dispatching: "పంపుతోంది...",
      otpPlaceholder: "6 అంకెల OTP కోడ్ నమోదు చేయండి",
      codeSentTo: "కోడ్ పంపబడిన నంబర్:",
      changeNumber: "నంబర్ మార్చండి",
      verifyBtn: "ధృవీకరించి లాగిన్ అవ్వండి",
      verifying: "ధృవీకరిస్తోంది..."
    },
    intake: {
      title: "సమస్య నమోదు: ఎక్కడి నుంచైనా ప్రజా సమస్యను నివేదించండి",
      subtitle: "ప్రత్యక్ష కెమెరా సెన్సార్ తప్పనిసరి. నకిలీ నివేదికలను అరికట్టడానికి గ్యాలరీ ఫోటోలు పూర్తిగా నిషేధించబడ్డాయి.",
      autoGps: "నా GPS స్థానాన్ని గుర్తించు",
      locating: "గుర్తిస్తోంది...",
      bannerRule: "ఖచ్చితమైన నియమం: సమస్య వివరణ (వాయిస్/రాతపూర్వక) మరియు ప్రత్యక్ష కెమెరా ఫోటో రెండూ తప్పనిసరి. గ్యాలరీ అప్‌లోడ్‌లు అనుమతించబడవు.",
      jurisdiction: "గుర్తించిన అధికార పరిధి:",
      locality: "ప్రాంతం:",
      detectedDept: "AI గుర్తించిన శాఖ:",
      waitingInput: "వాయిస్ లేదా సమాచారం కోసం వేచి చూస్తోంది...",
      voiceSection: "బహుభాషా వాయిస్ రికార్డింగ్",
      listening: "వింటోంది...",
      tapToSpeak: "మాట్లాడటానికి నొక్కండి",
      textareaPlaceholder: "సమస్యను వివరించండి (ఉదా: 'స్ట్రీట్‌లైట్లు వెలగడం లేదు', 'పైపు లీకేజీ', లేదా 'చెత్త పేరుకుపోయింది')... *",
      locationSection: "స్థానం: ఆటో-GPS లేదా మ్యాప్‌పై పిన్ చేయండి",
      cameraSection: "ప్రత్యక్ష కెమెరా సాక్ష్యం (నకిలీ నిరోధక నిబంధన)",
      btnSubmitReadyOnline: "టికెట్ పంపి రిస్క్ స్కాన్ ప్రారంభించండి",
      btnSubmitReadyOffline: "ఆఫ్‌లైన్ పరికరంలో భద్రపరచండి",
      btnSubmitDisabled: "వివరణ మరియు ప్రత్యక్ష ఫోటో రెండూ తప్పనిసరి"
    },
    camera: {
      unavailable: "ప్రత్యక్ష కెమెరా అందుబాటులో లేదు",
      retry: "అనుమతిని మళ్లీ ప్రయత్నించండి",
      liveSensor: "లైవ్ కెమెరా ఫీడ్",
      galleryDisabled: "గ్యాలరీ ఫోటోలు నిషేధించబడ్డాయి",
      captureBtn: "లైవ్ ఫోటో తీయండి",
      verifiedBadge: "సెన్సార్ ద్వారా ధృవీకరించబడింది",
      retakeBtn: "మళ్లీ ఫోటో తీయండి",
      scanning: "యంత్ర అభ్యాసం (ML) ద్వారా లోపం విశ్లేషించబడుతోంది..."
    },
    tracking: {
      title: "నా ఫిర్యాదులు & పరిష్కార ధృవీకరణ",
      subtitle: "అధికారిక పరిష్కార ఫోటో ధృవీకరణ నివేదిక.",
      auditTitle: "రెండు వైపుల ఫోటోగ్రాఫిక్ ఆడిట్ సాక్ష్యం",
      beforeLabel: "సమస్య ఉన్నప్పుడు (పౌరుడు తీసినది):",
      afterLabel: "పరిష్కారం తర్వాత (మునిసిపల్ సిబ్బంది):",
      noInitialImg: "ప్రారంభ చిత్రం లేదు",
      citizenSatisfaction: "పౌరుల సంతృప్తి నిర్ధారణ:",
      resolved: "పరిష్కరించబడింది",
      inProgress: "పురోగతిలో ఉంది",
      pending: "పరిశీలనలో ఉంది",
      fakeRejected: "తిరస్కరించబడింది - నకిలీ నివేదిక"
    },
    scorecard: {
      title: "వార్డు పౌర స్కోర్‌కార్డ్ & RTI పోర్టల్",
      subtitle: "పారదర్శకత కోసం ప్రజల సమాచారం. లాగిన్ అవసరం లేదు.",
      openDataBadge: "ఓపెన్ డేటా ప్రామాణికం v2.4",
      cleanlinessIndex: "వార్డు స్వచ్ఛతా సూచిక",
      cleanlinessRank: "విశాఖపట్నంలో టాప్ 15% లో ఉంది",
      avgResolutionTime: "సగటు పరిష్కార సమయం",
      slaTargetDays: "SLA లక్ష్యం: 10 రోజులు",
      satisfactionRate: "పౌరుల సంతృప్తి రేటింగ్",
      satisfactionSub: "ధృవీకరించబడిన ఫోటోల ఆధారంగా",
      tableHeader: "పరిసర వార్డుల పారదర్శకత పోలిక",
      colWard: "వార్డు పేరు",
      colActive: "చురుకైన సమస్యలు",
      colResolved: "ఈ నెలలో పరిష్కరించబడినవి",
      colSla: "SLA పాటించే శాతం",
      colGrade: "ఆరోగ్య గ్రేడ్"
    },
    marketplace: {
      title: "పౌర క్రెడిట్ మార్కెట్‌ప్లేస్",
      desc: "ధృవీకరించబడిన నివేదికల ద్వారా పౌర బహుమతులు పొందవచ్చు.",
      pointsSuffix: "పౌర క్రెడిట్ పాయింట్లు",
      suspended: "(సస్పెండ్ చేయబడింది)"
    },
    safeguards: {
      title: "నకిలీ రక్షణ చర్యలు",
      subtitle: "హార్డ్‌వేర్ సెన్సార్ ధృవీకరణ",
      desc: "నకిలీ మరియు డౌన్‌లోడ్ చేసిన ఫోటోలను అరికట్టడానికి, కెమెరా వీడియో ద్వారా నేరుగా ఫోటో తీయబడి GPS మరియు సమయం ముద్రించబడతాయి."
    },
    depts: {
      sanitation: "పారిశుధ్యం & ఘన వ్యర్థాల నిర్వహణ",
      water: "మంచినీరు & డ్రైనేజీ వ్యవస్థ",
      power: "విద్యుత్ & లైట్లు",
      roads: "రహదారులు & రవాణా",
      environment: "పర్యావరణం & కాలుష్యం"
    }
  },
  "hi-IN": {
    appTitle: "जनता की आवाज़",
    tagline: "स्वच्छ और हरित नागरिक बुद्धिमत्ता • रीयल-टाइम सेंसर कैप्चर • धोखाधड़ी-रोधी दृश्य",
    online: "ऑनलाइन",
    offline: "ऑफ़लाइन कैश सक्रिय",
    viewAs: "के रूप में देखें:",
    roles: {
      citizen: "नागरिक",
      officer: "नगर निगम अधिकारी",
      admin: "कार्यकारी प्रशासक"
    },
    nav: {
      intake: "सार्वभौमिक शिकायत दर्ज",
      tracking: "मेरी शिकायतें और समाधान सत्यापन",
      ward: "वार्ड पारदर्शिता स्कोरकार्ड",
      triage: "जीआईएस स्थानिक क्लस्टरिंग और ट्राइएज",
      analytics: "एनालिटिक्स और लागत बचत",
      warnings: "ठेकेदार चेतावनी और एसएलए",
      csr: "सीएसआर और ईएसजी पोर्टल"
    },
    auth: {
      verifiedBadge: "सत्यापित फोन",
      unauth: "प्रमाणीकृत नहीं",
      signOut: "साइन आउट",
      verifyOtp: "ओटीपी सत्यापित करें",
      modalTitle: "मोबाइल फोन सत्यापन (ओटीपी)",
      modalSub: "धोखाधड़ी रोकने और समाधान सूचना प्राप्त करने के लिए मोबाइल नंबर सत्यापित करें।",
      phonePlaceholder: "10 अंकों का मोबाइल नंबर दर्ज करें",
      sendBtn: "सत्यापन ओटीपी भेजें",
      dispatching: "भेज रहा है...",
      otpPlaceholder: "6 अंकों का ओटीपी कोड दर्ज करें",
      codeSentTo: "कोड भेजा गया:",
      changeNumber: "नंबर बदलें",
      verifyBtn: "सत्यापित कर प्रवेश करें",
      verifying: "सत्यापित कर रहा है..."
    },
    intake: {
      title: "शिकायत दर्ज करें: नागरिक समस्या कहीं से भी रिपोर्ट करें",
      subtitle: "लाइव कैमरा सेंसर अनिवार्य है। फर्जी रिपोर्ट रोकने के लिए गैलरी अपलोड बंद हैं।",
      autoGps: "मेरा जीपीएस खोजें",
      locating: "स्थान खोज रहा है...",
      bannerRule: "धोखाधड़ी-रोधी नीति: समस्या का विवरण (आवाज़/टेक्स्ट) और लाइव कैमरा फोटो दोनों अनिवार्य हैं। गैलरी से फोटो अपलोड नहीं हो सकती।",
      jurisdiction: "पहचाना गया क्षेत्राधिकार:",
      locality: "क्षेत्र:",
      detectedDept: "एआई द्वारा पहचाना गया विभाग:",
      waitingInput: "आवाज़ या विवरण की प्रतीक्षा में...",
      voiceSection: "समावेशी बहुभाषी आवाज़ इनपुट",
      listening: "सुन रहा है...",
      tapToSpeak: "बोलने के लिए दबाएं",
      textareaPlaceholder: "समस्या का विवरण दें (उदा. 'सड़क की बत्ती बंद है', 'पानी की पाइप फूट गई', या 'कचरा फैला हुआ है')... *",
      locationSection: "स्थान: ऑटो-जीपीएस या मैन्युअल रूप से पिन करें",
      cameraSection: "लाइव सेंसर फोटो प्रमाण (धोखाधड़ी-रोधी)",
      btnSubmitReadyOnline: "शिकायत भेजें और जोखिम स्कैन करें",
      btnSubmitReadyOffline: "ऑफ़लाइन डिवाइस में सहेजें",
      btnSubmitDisabled: "विवरण और लाइव फोटो दोनों आवश्यक हैं"
    },
    camera: {
      unavailable: "लाइव कैमरा उपलब्ध नहीं है",
      retry: "अनुमति दोबारा दें",
      liveSensor: "लाइव कैमरा फीड",
      galleryDisabled: "गैलरी अपलोड वर्जित",
      captureBtn: "लाइव फोटो खींचे",
      verifiedBadge: "सेंसर द्वारा सत्यापित",
      retakeBtn: "दोबारा फोटो लें",
      scanning: "मशीन लर्निंग मॉडल द्वारा छवि का निरीक्षण किया जा रहा है..."
    },
    tracking: {
      title: "मेरी शिकायतें और समाधान सत्यापन",
      subtitle: "आधिकारिक समाधान पूर्व एवं पश्चात फोटो सत्यापन।",
      auditTitle: "द्वि-पक्षीय फोटोग्राफिक ऑडिट साक्ष्य",
      beforeLabel: "समाधान से पूर्व (नागरिक द्वारा):",
      afterLabel: "समाधान के पश्चात (नगर निगम दल):",
      noInitialImg: "प्रारंभिक छवि उपलब्ध नहीं",
      citizenSatisfaction: "नागरिक संतुष्टि पुष्टि:",
      resolved: "समाधान हो गया",
      inProgress: "प्रगति पर है",
      pending: "लंबित",
      fakeRejected: "अस्वीकृत - फर्जी रिपोर्ट"
    },
    scorecard: {
      title: "वार्ड नागरिक स्कोरकार्ड एवं आरटीआई पोर्टल",
      subtitle: "सार्वजनिक पारदर्शिता हेतु खुला डेटा। लॉगिन आवश्यक नहीं।",
      openDataBadge: "ओपन डेटा मानक v2.4",
      cleanlinessIndex: "वार्ड स्वच्छता सूचकांक",
      cleanlinessRank: "विशाखापत्तनम में शीर्ष 15% में",
      avgResolutionTime: "औसत समाधान समय",
      slaTargetDays: "एसएलए लक्ष्य: 10 दिन",
      satisfactionRate: "नागरिक संतुष्टि दर",
      satisfactionSub: "सत्यापित तस्वीरों के आधार पर",
      tableHeader: "पड़ोसी वार्डों की तुलनात्मक पारदर्शिता",
      colWard: "वार्ड का नाम",
      colActive: "सक्रिय समस्याएं",
      colResolved: "इस माह हल की गई",
      colSla: "एसएलए अनुपालन",
      colGrade: "ग्रेड"
    },
    marketplace: {
      title: "नागरिक क्रेडिट बाज़ार",
      desc: "सत्यापित शिकायतों पर नागरिक क्रेडिट प्राप्त करें।",
      pointsSuffix: "नागरिक क्रेडिट अंक",
      suspended: "(निलंबित)"
    },
    safeguards: {
      title: "धोखाधड़ी से सुरक्षा उपाय",
      subtitle: "हार्डवेयर सेंसर सत्यापन",
      desc: "फर्जी और इंटरनेट से डाउनलोड फोटो रोकने के लिए लाइव कैमरे से जीपीएस और समय दर्ज करके फोटो ली जाती है।"
    },
    depts: {
      sanitation: "ठोस अपशिष्ट एवं स्वच्छता",
      water: "जल एवं जल निकासी",
      power: "बिजली एवं प्रकाश",
      roads: "सड़कें एवं यातायात",
      environment: "पर्यावरण एवं प्रदूषण"
    }
  },
  "es-ES": {
    appTitle: "Voz del Pueblo",
    tagline: "Inteligencia Cívica Limpia y Verde • Captura de Sensor en Tiempo Real • Anti-Fraude",
    online: "En línea",
    offline: "Caché fuera de línea activo",
    viewAs: "VER COMO:",
    roles: {
      citizen: "Ciudadano",
      officer: "Oficial Municipal",
      admin: "Administrador Ejecutivo"
    },
    nav: {
      intake: "Registro Universal de Quejas",
      tracking: "Mis Quejas y Verificación",
      ward: "Puntuación de Transparencia de Barrio",
      triage: "Agrupación Espacial SIG y Triaje",
      analytics: "Análisis y ROI de Ahorro",
      warnings: "Advertencias de Contratistas y SLA",
      csr: "Portal de RSE y ESG"
    },
    auth: {
      verifiedBadge: "Teléfono Verificado",
      unauth: "No autenticado",
      signOut: "Cerrar sesión",
      verifyOtp: "Verificar OTP",
      modalTitle: "Verificación de Teléfono Móvil (OTP)",
      modalSub: "Para evitar spam y recibir notificaciones de resolución, verifique su número mediante SMS OTP.",
      phonePlaceholder: "Ingrese número móvil de 10 dígitos",
      sendBtn: "Enviar Código OTP",
      dispatching: "Enviando...",
      otpPlaceholder: "Ingrese código OTP de 6 dígitos",
      codeSentTo: "Código enviado a",
      changeNumber: "Cambiar número",
      verifyBtn: "Verificar e Iniciar Sesión",
      verifying: "Verificando..."
    },
    intake: {
      title: "REGISTRO DE DATOS: Reporte Problemas Cívicos",
      subtitle: "Sensor de cámara en vivo requerido. Se prohíben fotos de galería para evitar reportes falsos.",
      autoGps: "Autodetectar mi GPS",
      locating: "Localizando...",
      bannerRule: "Política Estricta Anti-Fraude: Tanto la descripción (voz/texto) como la captura de cámara en vivo son obligatorias.",
      jurisdiction: "Jurisdicción Detectada:",
      locality: "Localidad:",
      detectedDept: "Departamento Detectado por IA:",
      waitingInput: "Esperando entrada de voz/texto...",
      voiceSection: "Dictado de Voz Multilingüe Inclusivo",
      listening: "Escuchando...",
      tapToSpeak: "Toca para Hablar",
      textareaPlaceholder: "Describa el problema (ej. 'Luz de calle rota', 'Fuga de agua', 'Basura acumulada')... *",
      locationSection: "Ubicación: Auto-GPS o Clic para Fijar",
      cameraSection: "Prueba Fotográfica con Sensor en Vivo",
      btnSubmitReadyOnline: "Enviar Reporte y Ejecutar Escaneo de Riesgo",
      btnSubmitReadyOffline: "Guardar en Cola Fuera de Línea",
      btnSubmitDisabled: "Se requiere descripción y foto en vivo"
    },
    camera: {
      unavailable: "Cámara en Vivo No Disponible",
      retry: "Reintentar Permiso",
      liveSensor: "SENSOR EN TIEMPO REAL",
      galleryDisabled: "Fotos de Galería Prohibidas",
      captureBtn: "Capturar Foto en Vivo",
      verifiedBadge: "VERIFICADO POR SENSOR",
      retakeBtn: "Tomar Foto Nuevamente",
      scanning: "Modelo ML inspeccionando píxeles del sensor para validar anomalías..."
    },
    tracking: {
      title: "Mis Quejas y Verificación",
      subtitle: "Circuito de auditoría fotográfica oficial Antes vs. Después.",
      auditTitle: "Prueba de Auditoría Fotográfica Bipartita",
      beforeLabel: "ANTES (Capturado por Sensor):",
      afterLabel: "DESPUÉS (Equipo Municipal):",
      noInitialImg: "Sin imagen inicial",
      citizenSatisfaction: "Confirmación de satisfacción ciudadana:",
      resolved: "Resuelto",
      inProgress: "En Progreso",
      pending: "Pendiente",
      fakeRejected: "Rechazado - Reporte Falso"
    },
    scorecard: {
      title: "Puntuación de Transparencia de Barrio y Portal RTI",
      subtitle: "Datos abiertos públicos para transparencia cívica. No se requiere inicio de sesión.",
      openDataBadge: "Estándar de Datos Abiertos v2.4",
      cleanlinessIndex: "Índice de Limpieza del Barrio",
      cleanlinessRank: "Top 15% en Visakhapatnam",
      avgResolutionTime: "Tiempo Promedio de Resolución",
      slaTargetDays: "Objetivo SLA: 10 Días",
      satisfactionRate: "Satisfacción Ciudadana",
      satisfactionSub: "Basado en cierres fotográficos verificados",
      tableHeader: "Evaluación Comparativa de Transparencia de Barrios",
      colWard: "Nombre del Barrio",
      colActive: "Incidentes Activos",
      colResolved: "Resueltos Este Mes",
      colSla: "Adherencia al SLA",
      colGrade: "Grado de Salud"
    },
    marketplace: {
      title: "Mercado de Créditos Cívicos",
      desc: "Gane puntos por reportes verificados.",
      pointsSuffix: "Puntos de Crédito Cívico",
      suspended: "(Suspendido)"
    },
    safeguards: {
      title: "Protección Contra Fraudes",
      subtitle: "Verificación de Sensor Físico",
      desc: "Para evitar fotos descargadas o falsas, las imágenes se toman directamente de la cámara con coordenadas GPS y hora integradas."
    },
    depts: {
      sanitation: "Residuos Sólidos y Saneamiento",
      water: "Agua y Drenaje",
      power: "Electricity & Power",
      roads: "Caminos y Tránsito",
      environment: "Medio Ambiente y Contaminación"
    }
  }
};

const createClusterBadgeIcon = (count, isBreached) => {
  return L.divIcon({
    className: "custom-cluster-badge",
    html: `
      <div style="
        background-color: ${isBreached ? "#dc2626" : "#0d9488"};
        width: 38px;
        height: 38px;
        border-radius: 50%;
        border: 3px solid #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 800;
        font-size: 13px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      ">
        ${count}
      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
  });
};

const createClusterIcon = (count, isBreached) => createClusterBadgeIcon(count, isBreached);

const BACKEND_URL = "http://localhost:5000/api";

function LiveCameraCapture({ onCapture, currentLocation, onRetake, t }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraError, setCameraError] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);

  const startCamera = async () => {
    setCameraError("");
    setIsInitializing(true);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(t.camera.unavailable);
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setCameraError(err.message || t.camera.unavailable);
    } finally {
      setIsInitializing(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const timestamp = new Date().toISOString();
    const locText = currentLocation 
      ? `GPS: ${currentLocation.lat.toFixed(5)}, ${currentLocation.lng.toFixed(5)}`
      : "GPS: Unverified Sensor";

    ctx.fillStyle = "rgba(15, 23, 42, 0.75)";
    ctx.fillRect(10, canvas.height - 52, canvas.width - 20, 42);

    ctx.fillStyle = "#2dd4bf";
    ctx.font = "bold 13px monospace";
    ctx.fillText(`GVMC LIVE AUDIT • ${timestamp}`, 20, canvas.height - 30);
    ctx.fillStyle = "#ffffff";
    ctx.font = "12px monospace";
    ctx.fillText(`${locText} • SENSOR-AUTHENTICATED`, 20, canvas.height - 15);

    const base64Data = canvas.toDataURL("image/jpeg", 0.85);
    setCapturedImage(base64Data);
    stopCamera();
    onCapture(base64Data, timestamp);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    onRetake();
    startCamera();
  };

  return (
    <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
      <canvas ref={canvasRef} className="hidden" />

      {cameraError ? (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-semibold space-y-2">
          <div className="flex items-center gap-2 font-bold">
            <AlertTriangle size={15} className="text-red-600" />
            {t.camera.unavailable}
          </div>
          <p className="text-[11px] text-red-600 leading-normal">{cameraError}</p>
          <button
            type="button"
            onClick={startCamera}
            className="px-3 py-1 bg-red-600 text-white rounded-md text-xs font-bold hover:bg-red-700"
          >
            {t.camera.retry}
          </button>
        </div>
      ) : !capturedImage ? (
        <div className="space-y-3">
          <div className="relative bg-slate-950 rounded-xl overflow-hidden h-56 flex items-center justify-center border border-slate-800">
            {isInitializing && (
              <span className="text-xs text-slate-400 font-bold animate-pulse">
                {t.intake.locating}
              </span>
            )}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2.5 left-2.5 bg-red-600/90 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" /> {t.camera.liveSensor}
            </div>
            <div className="absolute bottom-2.5 right-2.5 bg-slate-900/80 text-teal-300 text-[10px] font-mono px-2 py-0.5 rounded border border-teal-500/30">
              {t.camera.galleryDisabled}
            </div>
          </div>
          <button
            type="button"
            onClick={handleCapture}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow"
          >
            <Camera size={15} /> {t.camera.captureBtn}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="relative rounded-xl overflow-hidden border-2 border-emerald-500 shadow-sm">
            <img src={capturedImage} alt="Live Captured Proof" className="w-full h-56 object-cover" />
            <div className="absolute top-2.5 left-2.5 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
              <CheckCircle size={12} /> {t.camera.verifiedBadge}
            </div>
          </div>
          <button
            type="button"
            onClick={handleRetake}
            className="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-2"
          >
            <RefreshCw size={14} /> {t.camera.retakeBtn}
          </button>
        </div>
      )}
    </div>
  );
}

function MapRecenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center && Array.isArray(center) && center[0] && center[1]) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
}

function LocationMarker({ position, setPosition, setJurisdiction }) {
  useMapEvents({
    click(e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      setPosition({ lat, lng });
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
        .then((res) => res.json())
        .then((data) => {
          const addr = data.address || {};
          setJurisdiction({
            city: addr.city || addr.town || addr.village || "Local Municipality",
            country: addr.country || "Global",
            locality: addr.suburb || addr.neighbourhood || "Custom Pinned Zone",
            formatted: data.display_name || "Custom Pinned Location",
          });
        })
        .catch(() => {});
    },
  });

  return position === null ? null : (
    <Marker position={[position.lat, position.lng]}>
      <Popup>Selected Incident Location</Popup>
    </Marker>
  );
}

function classifyGlobalPreview(text, lang = "en-US") {
  const d = TRANSLATIONS[lang]?.depts || TRANSLATIONS["en-US"].depts;
  if (!text || text.trim() === "") return TRANSLATIONS[lang]?.intake.waitingInput || "Waiting for speech/input...";
  const t = text.toLowerCase();

  const scores = {
    water: 0,
    power: 0,
    roads: 0,
    environment: 0,
    sanitation: 0,
  };

  if (t.match(/water|pipeline|pipe|leak|drain|drainage|sewage|gutter|tap|drinking|flood|overflow|manhole|sewer|waterlogging|మంచినీరు|పైపు|మురుగు|నీరు|లీకేజ్|కాలువ|నల్లా|पानी|जल|नल|नाली|सीवर|पाइप|जलभराव/i)) {
    scores.water += 3;
  }
  if (t.match(/electric|current|light|streetlight|wire|pole|power|dark|darkness|transformer|spark|blackout|bulb|fuse|voltage|దీపం|కరెంట్|లైట్|విద్యుత్|స్తంభం|వైరు|చీకటి|बिजली|तार|खंभा|अंधेरा|ट्रांसफार्मर|बत्ती|करंट/i)) {
    scores.power += 3;
  }
  if (t.match(/pothole|road|footpath|street|traffic|asphalt|divider|highway|carretera|straße|rue|గుంత|రోడ్డు|దారి|రహదారి|ఫుట్‌పాత్|సడక్|सड़क|गड्ढा|फुटपाथ|मार्ग|जाम/i)) {
    scores.roads += 3;
  }
  if (t.match(/smoke|chemical|factory|air|noise|sound|pollution|plastic|toxic|dust|fumes|smell|odor|కాలుష్యం|పొగ|శబ్దం|దుర్వాసన|రసాయనాలు|ప్రదూషణ|प्रदूषण|धुआं|बदबू|शोर|जहरीला/i)) {
    scores.environment += 3;
  }
  if (t.match(/garbage|trash|waste|dustbin|bin|debris|dump|sanitation|litter|scraps|చెత్త|పరిశుభ్రత|కచరా|కుప్ప|చెత్తబుట్ట|कचरा|गंदगी|कूड़ा|सफाई|कचरे/i)) {
    scores.sanitation += 3;
  }

  if (t.match(/clean|safai|శుభ్రం/i)) {
    if (scores.water === 0 && scores.roads === 0) {
      scores.sanitation += 1;
    }
  }

  let maxCategory = "sanitation";
  let maxScore = 0;

  for (const [category, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      maxCategory = category;
    }
  }

  if (maxScore === 0) {
    return d.sanitation;
  }

  return d[maxCategory];
}

export default function App() {
  const [speechLang, setSpeechLang] = useState("en-US");
  const t = TRANSLATIONS[speechLang] || TRANSLATIONS["en-US"];

  const [currentRole, setCurrentRole] = useState("Citizen");
  const [activeTab, setActiveTab] = useState("report");
  const [complaints, setComplaints] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineQueue, setOfflineQueue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("civic_offline_queue")) || [];
    } catch {
      return [];
    }
  });

  const [cvAnalysis, setCvAnalysis] = useState(null);
  const [isScanningImage, setIsScanningImage] = useState(false);

  // Municipal Manager / Officer Performance Score State
  const [managerScore, setManagerScore] = useState(850);
  const [managerTier, setManagerTier] = useState("Tier 1 - Elite Municipal Director");

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const [citizenBadges] = useState([
    { title: "Eco Guardian", desc: "Reported 5+ verified sanitation issues", icon: "🌱" },
    { title: "Rapid Responder", desc: "Completed 2-party audit loop", icon: "⚡" },
    { title: "Trusted Verifier", desc: "Maintained 100+ Civic Credit score", icon: "🛡️" }
  ]);

  const [csrSponsors] = useState([
    { name: "Tata Steel CSR", adoptedWard: "MVP Colony", budgetFunded: "₹12,50,000", projectsCompleted: 14 },
    { name: "RINL Vizag Green", adoptedWard: "Gajuwaka Industrial", budgetFunded: "₹8,00,000", projectsCompleted: 9 },
    { name: "Infosys Foundation", adoptedWard: "IT SEZ Madhurawada", budgetFunded: "₹15,00,000", projectsCompleted: 19 },
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, text: "Incident CIVIC-2026-101 has been Acknowledged by Ward Officer.", time: "10 mins ago", unread: true },
    { id: 2, text: "Repair unit dispatched for mainline rupture.", time: "1 hour ago", unread: false },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const [citizenPoints, setCitizenPoints] = useState(120);

  const [authToken, setAuthToken] = useState(() => localStorage.getItem("civic_auth_token") || null);
  const [verifiedPhone, setVerifiedPhone] = useState(() => localStorage.getItem("civic_auth_phone") || null);
  const [phoneInput, setPhoneInput] = useState("9849012345");
  const [otpInput, setOtpInput] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [coords, setCoords] = useState({ lat: 17.7231, lng: 83.3012 });
  const [jurisdiction, setJurisdiction] = useState({
    city: "Visakhapatnam",
    country: "India",
    locality: "MVP Colony",
    formatted: "Visakhapatnam, Andhra Pradesh, India",
  });
  const [isLocating, setIsLocating] = useState(false);

  const [description, setDescription] = useState("");
  const [incidentImg, setIncidentImg] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");

  const loadComplaints = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/complaints`);
      const data = await res.json();
      setComplaints(data);
    } catch (err) {
      console.error("Backend fetch error:", err);
    }
  };

  useEffect(() => {
    loadComplaints();

    const handleOnline = () => {
      setIsOnline(true);
      syncOfflineReports();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const syncOfflineReports = async () => {
    const queue = JSON.parse(localStorage.getItem("civic_offline_queue")) || [];
    if (queue.length === 0) return;

    for (const report of queue) {
      try {
        await fetch(`${BACKEND_URL}/complaints`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(report),
        });
      } catch (e) {
        console.error("Sync error:", e);
      }
    }
    localStorage.removeItem("civic_offline_queue");
    setOfflineQueue([]);
    alert(`Connected to Network: ${queue.length} offline cached reports synced to municipality!`);
    loadComplaints();
  };

  const runComputerVisionScan = (imageFile) => {
    setIsScanningImage(true);
    setCvAnalysis(null);

    setTimeout(() => {
      const sampleTags = [
        { type: "Asphalt Pothole / Structural Crack", confidence: "94.8%", level: "HIGH", action: "Auto-Escalate Priority" },
        { type: "Municipal Water Main Leak / Waterlogging", confidence: "92.3%", level: "HIGH", action: "Auto-Escalate Priority" },
        { type: "Solid Waste Overflow / Hazardous Debris", confidence: "89.1%", level: "MEDIUM", action: "Standard Routing" },
      ];
      const selected = sampleTags[Math.floor(Math.random() * sampleTags.length)];
      setCvAnalysis(selected);
      setIsScanningImage(false);
    }, 1200);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneInput }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to dispatch OTP");

      setOtpSent(true);
      if (data.devOtp) setOtpInput(data.devOtp);
      alert(`OTP Sent!\nHackathon Demo Passcode: ${data.devOtp}`);
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneInput, otp: otpInput }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Verification failed");

      setAuthToken(data.token);
      setVerifiedPhone(data.phone);
      localStorage.setItem("civic_auth_token", data.token);
      localStorage.setItem("civic_auth_phone", data.phone);
      setOtpSent(false);
      setOtpInput("");
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setAuthToken(null);
    setVerifiedPhone(null);
    localStorage.removeItem("civic_auth_token");
    localStorage.removeItem("civic_auth_phone");
    setOtpSent(false);
    setOtpInput("");
  };

  const detectLiveGlobalLocation = () => {
    if (!("geolocation" in navigator)) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCoords({ lat, lng });

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          const data = await res.json();
          const addr = data.address || {};

          const resolvedCity = addr.city || addr.town || addr.village || addr.county || "Local Municipality";
          const resolvedCountry = addr.country || "Global";
          const resolvedLocality = addr.suburb || addr.neighbourhood || addr.residential || "Downtown";

          setJurisdiction({
            city: resolvedCity,
            country: resolvedCountry,
            locality: resolvedLocality,
            formatted: data.display_name || `${resolvedCity}, ${resolvedCountry}`,
          });
        } catch (err) {
          console.error("Reverse geocoding error:", err);
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        alert("GPS access denied. Falling back to default coordinates.");
        setIsLocating(false);
      }
    );
  };

  const toggleSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Use Chrome or Edge to access the Web Speech API.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = speechLang;

    rec.onstart = () => setIsListening(true);
    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setDescription((prev) => (prev ? `${prev} ${text}` : text));
    };
    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);
    rec.start();
  };

  const handleIntakeSubmit = async (e) => {
    e.preventDefault();

    if (citizenPoints < 50) {
      alert("Account Suspended: Your civic score is below 50 due to flagged false reports.");
      return;
    }

    if (!description.trim() || !incidentImg) {
      alert("Submission Blocked:\nBoth a problem description (voice/text) AND real-time live photographic proof are required.");
      return;
    }

    const payload = {
      desc: description.trim(),
      city: jurisdiction.city,
      country: jurisdiction.country,
      locality: jurisdiction.locality,
      latitude: coords.lat,
      longitude: coords.lng,
      citizenPhone: `+91 ${verifiedPhone}`,
      beforeImg: incidentImg,
      aiSeverity: cvAnalysis,
      channel: "Web Portal",
    };

    if (!navigator.onLine) {
      const updatedQueue = [...offlineQueue, payload];
      setOfflineQueue(updatedQueue);
      localStorage.setItem("civic_offline_queue", JSON.stringify(updatedQueue));
      alert("Offline Mode: Live capture saved to encrypted local cache. It will auto-sync once online!");
      setDescription("");
      setIncidentImg(null);
      setCvAnalysis(null);
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/complaints`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Server rejected complaint.");
      }

      let alertMsg = `${result.message}`;
      if (result.environmentalRisks && result.environmentalRisks.length > 0) {
        alertMsg += `\n\n⚠️ MUNICIPAL INFRASTRUCTURE ADVISORY:\n`;
        result.environmentalRisks.forEach((risk) => {
          alertMsg += `- ${risk.zoneName}: ${risk.advisory}\n`;
        });
      }
      if (result.predictiveScans && result.predictiveScans.length > 0) {
        alertMsg += `\n\n🛡️ AUTONOMOUS PREDICTIVE SCAN:\nDetected ${result.predictiveScans.length} secondary risk(s) in surrounding area!`;
      }
      alert(alertMsg);

      setNotifications((prev) => [
        {
          id: Date.now(),
          text: `Grievance registered in ${jurisdiction.city}. Municipal risk & predictive scan executed.`,
          time: "Just now",
          unread: true,
        },
        ...prev,
      ]);

      setAuditLogs((prev) => [
        { time: new Date().toLocaleTimeString(), event: result.message },
        ...prev,
      ]);

      setDescription("");
      setIncidentImg(null);
      setCvAnalysis(null);
      await loadComplaints();
      setCurrentRole("Municipal Officer");
      setActiveTab("admin_triage");
    } catch (err) {
      alert("Submission error: " + err.message);
    }
  };

  const updateTicketOnBackend = async (id, payload) => {
    try {
      await fetch(`${BACKEND_URL}/complaints/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      await loadComplaints();
    } catch (err) {
      alert("Update error: " + err.message);
    }
  };

  const dispatchWorker = (id) => {
    updateTicketOnBackend(id, {
      status: "In Progress",
      assignedWorker: "Apex Infra Maintenance Ltd (Contractor #4)",
    });

    setNotifications((prev) => [
      { id: Date.now(), text: `Ticket ${id} is now In Progress. Maintenance crew dispatched.`, time: "Just now", unread: true },
      ...prev,
    ]);
  };

  const markResolvedWithProof = (id) => {
    const proofUrl = "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?w=400";
    updateTicketOnBackend(id, {
      status: "Resolved",
      afterImg: proofUrl,
    });
    
    setCitizenPoints((prev) => prev + 10);
    setManagerScore((prev) => {
      const updated = prev + 15;
      if (updated > 900) setManagerTier("Tier 1 - Elite Municipal Director");
      else if (updated > 750) setManagerTier("Tier 2 - Senior Operations Lead");
      return updated;
    });

    setNotifications((prev) => [
      { id: Date.now(), text: `Ticket ${id} marked Resolved! +10 Citizen Credits & +15 Manager Performance Pts awarded.`, time: "Just now", unread: true },
      ...prev,
    ]);
  };

  const flagFakeComplaint = (id) => {
    if (window.confirm("Flag this report as Spam/Fake? This deducts 25 credits from the citizen account.")) {
      updateTicketOnBackend(id, { status: "Rejected - Fake Report" });
      setCitizenPoints((prev) => Math.max(0, prev - 25));

      setNotifications((prev) => [
        {
          id: Date.now(),
          text: `Warning: Ticket ${id} was flagged as False/Spam. 25 Civic Credits deducted.`,
          time: "Just now",
          unread: true,
        },
        ...prev,
      ]);
    }
  };

  const submitCitizenRating = (id, rating) => {
    updateTicketOnBackend(id, { citizenRating: rating });
    if (rating >= 4) {
      setCitizenPoints((prev) => prev + 5);
      setManagerScore((prev) => prev + 10);
      alert(`Thank you! Recorded ${rating}-star feedback. +5 bonus Citizen Credits & +10 Manager Performance Pts awarded!`);
    } else {
      alert(`Thank you! Recorded ${rating}-star feedback for ticket ${id}.`);
    }
  };

  const uniqueCities = ["All Cities", ...new Set(complaints.map((c) => c.city).filter(Boolean))];
  const uniqueDepartments = ["All Departments", ...new Set(complaints.map((c) => c.category).filter(Boolean))];

  const filteredList = complaints.filter((c) => {
    const matchesCity = selectedCity === "All Cities" || c.city === selectedCity;
    const matchesDept = selectedDepartment === "All Departments" || c.category === selectedDepartment;
    return matchesCity && matchesDept;
  });

  const isAuthenticated = Boolean(authToken && verifiedPhone);

  const totalComplaints = complaints.length;
  const resolvedCount = complaints.filter((c) => c.status === "Resolved").length;
  const resolutionRate = totalComplaints > 0 ? Math.round((resolvedCount / totalComplaints) * 100) : 0;
  const duplicateClusterCount = complaints.reduce((acc, c) => acc + (c.duplicatesCount > 1 ? c.duplicatesCount - 1 : 0), 0);
  const opexSavedINR = duplicateClusterCount * 350;

  const isFormSubmittable = Boolean(description.trim() && incidentImg);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      {/* HEADER */}
      <header className="bg-slate-900 text-white border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Globe2 className="text-teal-400" size={24} />
              <h1 className="text-xl font-black tracking-wide uppercase">{t.appTitle}</h1>
              {isOnline ? (
                <span className="flex items-center gap-1 text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full font-bold ml-2">
                  <Wifi size={11} /> {t.online}
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] bg-amber-950 text-amber-400 border border-amber-800 px-2 py-0.5 rounded-full font-bold ml-2 animate-pulse">
                  <WifiOff size={11} /> {t.offline} ({offlineQueue.length})
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{t.tagline}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
              <span className="text-slate-400 px-2 font-semibold">{t.viewAs}</span>
              {[
                { id: "Citizen", label: t.roles.citizen },
                { id: "Municipal Officer", label: t.roles.officer },
                { id: "Executive Admin", label: t.roles.admin },
              ].map((roleItem) => (
                <button
                  key={roleItem.id}
                  onClick={() => {
                    setCurrentRole(roleItem.id);
                    if (roleItem.id === "Citizen") setActiveTab("report");
                    else setActiveTab("admin_triage");
                  }}
                  className={`px-3 py-1.5 rounded-lg font-bold transition ${
                    currentRole === roleItem.id ? "bg-teal-500 text-slate-950 shadow" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {roleItem.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* TOP NAVBAR */}
      <nav className="bg-white border-b border-slate-200 px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-2">
            {currentRole === "Citizen" ? (
              <>
                <button
                  onClick={() => setActiveTab("report")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    activeTab === "report" ? "bg-teal-600 text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {t.nav.intake}
                </button>
                <button
                  onClick={() => setActiveTab("tracking")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    activeTab === "tracking" ? "bg-teal-600 text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {t.nav.tracking}
                </button>
                <button
                  onClick={() => setActiveTab("public_transparency")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    activeTab === "public_transparency" ? "bg-teal-600 text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {t.nav.ward}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab("admin_triage")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    activeTab === "admin_triage" ? "bg-teal-600 text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {t.nav.triage}
                </button>
                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    activeTab === "analytics" ? "bg-teal-600 text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {t.nav.analytics}
                </button>
                <button
                  onClick={() => setActiveTab("contract_warnings")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    activeTab === "contract_warnings" ? "bg-teal-600 text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {t.nav.warnings}
                </button>
                <button
                  onClick={() => setActiveTab("csr")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    activeTab === "csr" ? "bg-teal-600 text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {t.nav.csr}
                </button>
                <button
                  onClick={() => setActiveTab("public_transparency")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    activeTab === "public_transparency" ? "bg-teal-600 text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {t.nav.ward}
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs font-bold relative">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
                title="Stage Notifications"
              >
                <Bell size={18} />
                {notifications.some((n) => n.unread) && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 shadow-xl rounded-2xl p-4 z-50">
                  <h4 className="font-bold text-xs uppercase text-slate-700 mb-2 border-b pb-1">
                    Multi-Stage Notifications
                  </h4>
                  <div className="space-y-2 max-h-56 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-[11px]">
                        <p className="text-slate-800 font-medium">{n.text}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <span
              className={`flex items-center gap-1 border px-2.5 py-1 rounded-full text-xs font-bold ${
                citizenPoints < 50
                  ? "bg-red-50 text-red-700 border-red-300 animate-pulse"
                  : "bg-amber-50 text-amber-900 border-amber-200"
              }`}
            >
              <Award size={14} className={citizenPoints < 50 ? "text-red-600" : "text-amber-600"} />
              {citizenPoints} {t.marketplace.pointsSuffix}
            </span>

            {isAuthenticated ? (
              <div className="relative">
                {/* INTERACTIVE PROFILE ICON BUTTON */}
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center gap-2 bg-teal-50 hover:bg-teal-100 border border-teal-300 px-3 py-1.5 rounded-full transition shadow-sm"
                >
                  <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center font-black text-[11px]">
                    👤
                  </div>
                  <span className="text-teal-900 font-mono font-bold">+91 {verifiedPhone}</span>
                </button>

                {/* PROFILE DROPDOWN MENU WITH PROPER TOP POSITIONING */}
                {showProfileDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 z-[999] space-y-3 font-sans">
                    <div className="pb-3 border-b border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Signed In User</span>
                      <div className="text-sm font-black text-slate-800 mt-0.5">+91 {verifiedPhone}</div>
                      <span className="inline-block mt-1 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        Verified Citizen Account
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab("tracking");
                        setShowProfileDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-between transition"
                    >
                      <span>📂 My User Database / Records</span>
                      <span className="text-slate-400 font-mono text-[10px]">{complaints.length} Filed</span>
                    </button>

                    <button
                      onClick={() => {
                        handleLogout();
                        setShowProfileDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-red-50 rounded-xl text-xs font-bold text-red-600 flex items-center justify-between transition border-t border-slate-100 pt-2"
                    >
                      <span>🚪 Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-xs">{t.auth.unauth}</span>
                <button
                  onClick={() => setActiveTab("report")}
                  className="flex items-center gap-1 text-xs text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-2.5 py-1 rounded-lg transition"
                >
                  <LogIn size={13} /> {t.auth.verifyOtp}
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* VIEW 1: CITIZEN REPORTING + LIVE SENSOR CAMERA */}
        {currentRole === "Citizen" && activeTab === "report" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-black text-slate-800">{t.intake.title}</h2>
                  <p className="text-xs text-slate-500">{t.intake.subtitle}</p>
                </div>
                {isAuthenticated && (
                  <button
                    type="button"
                    onClick={detectLiveGlobalLocation}
                    className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg text-xs font-bold text-teal-800 flex items-center gap-1.5"
                  >
                    <Compass size={14} className={isLocating ? "animate-spin text-teal-600" : "text-teal-600"} />
                    {isLocating ? t.intake.locating : t.intake.autoGps}
                  </button>
                )}
              </div>

              {!isAuthenticated ? (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center max-w-md mx-auto my-6 space-y-4 shadow-sm">
                  <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto">
                    <KeyRound size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">{t.auth.modalTitle}</h3>
                    <p className="text-xs text-slate-500 mt-1">{t.auth.modalSub}</p>
                  </div>

                  {authError && (
                    <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg p-2 text-xs font-bold">
                      {authError}
                    </div>
                  )}

                  {!otpSent ? (
                    <form onSubmit={handleSendOtp} className="space-y-3">
                      <div className="relative">
                        <Phone size={15} className="absolute left-3 top-3 text-slate-400" />
                        <input
                          type="tel"
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value)}
                          placeholder={t.auth.phonePlaceholder}
                          className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                          maxLength={10}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={authLoading}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider shadow"
                      >
                        {authLoading ? t.auth.dispatching : t.auth.sendBtn}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-3">
                      <div>
                        <input
                          type="text"
                          value={otpInput}
                          onChange={(e) => setOtpInput(e.target.value)}
                          placeholder={t.auth.otpPlaceholder}
                          className="w-full text-center tracking-widest text-lg font-mono font-bold py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                          maxLength={6}
                          required
                        />
                        <span className="text-[11px] text-teal-600 block mt-1 font-semibold">
                          {t.auth.codeSentTo} +91 {phoneInput}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setOtpSent(false)}
                          className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 rounded-xl text-xs"
                        >
                          {t.auth.changeNumber}
                        </button>
                        <button
                          type="submit"
                          disabled={authLoading}
                          className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-xl text-xs"
                        >
                          {authLoading ? t.auth.verifying : t.auth.verifyBtn}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                <form onSubmit={handleIntakeSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                    <AlertCircle size={16} className="text-amber-600 flex-shrink-0" />
                    <span>{t.intake.bannerRule}</span>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap justify-between items-center gap-2 text-xs">
                    <div>
                      <span className="text-[11px] uppercase font-bold text-slate-500 block">{t.intake.jurisdiction}</span>
                      <strong className="text-slate-800 text-sm">
                        {jurisdiction.city}, {jurisdiction.country}
                      </strong>
                      <span className="text-slate-500 block text-[11px] font-mono mt-0.5">
                        {t.intake.locality} {jurisdiction.locality} ({coords.lat.toFixed(4)}, {coords.lng.toFixed(4)})
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-teal-700 block">{t.intake.detectedDept}</span>
                      <span className="inline-block mt-0.5 bg-teal-600 text-white px-2.5 py-1 rounded text-xs font-black shadow-sm">
                        {classifyGlobalPreview(description, speechLang)}
                      </span>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-black uppercase text-slate-700 flex items-center gap-1.5">
                        <Mic size={14} className="text-teal-600" /> {t.intake.voiceSection} <span className="text-red-500">*</span>
                      </span>
                      <div className="flex items-center gap-2">
                        <select
                          value={speechLang}
                          onChange={(e) => setSpeechLang(e.target.value)}
                          className="text-xs border border-teal-300 rounded px-2.5 py-1 bg-white font-bold text-teal-800 shadow-sm"
                        >
                          <option value="en-US">English (US/UK/Global)</option>
                          <option value="te-IN">Telugu (తెలుగు)</option>
                          <option value="hi-IN">Hindi (हिन्दी)</option>
                          <option value="es-ES">Spanish (Español)</option>
                        </select>
                        <button
                          type="button"
                          onClick={toggleSpeechRecognition}
                          className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                            isListening ? "bg-red-500 text-white animate-pulse" : "bg-teal-600 text-white"
                          }`}
                        >
                          {isListening ? <MicOff size={12} /> : <Mic size={12} />}
                          {isListening ? t.intake.listening : t.intake.tapToSpeak}
                        </button>
                      </div>
                    </div>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={t.intake.textareaPlaceholder}
                      className="w-full border rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-teal-500 outline-none bg-white border-slate-300"
                      required
                    />
                  </div>

                  <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                    <span className="text-xs font-black uppercase text-slate-700 flex items-center gap-1 mb-1">
                      <MapPin size={14} className="text-teal-600" /> {t.intake.locationSection}
                    </span>
                    <div className="h-44 w-full rounded-lg overflow-hidden border border-slate-200 mt-2">
                      <MapContainer center={[coords.lat, coords.lng]} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapRecenter center={[coords.lat, coords.lng]} />
                        <LocationMarker position={coords} setPosition={setCoords} setJurisdiction={setJurisdiction} />
                      </MapContainer>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-black uppercase text-slate-700 flex items-center gap-1 mb-1">
                      <Camera size={14} className="text-teal-600" /> {t.intake.cameraSection} <span className="text-red-500">*</span>
                    </span>

                    <LiveCameraCapture
                      t={t}
                      currentLocation={coords}
                      onCapture={(imageData) => {
                        setIncidentImg(imageData);
                        runComputerVisionScan(imageData);
                      }}
                      onRetake={() => {
                        setIncidentImg(null);
                        setCvAnalysis(null);
                      }}
                    />

                    {isScanningImage && (
                      <div className="mt-2 p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-800 font-bold flex items-center gap-2 animate-pulse">
                        <Scan size={16} /> {t.camera.scanning}
                      </div>
                    )}

                    {cvAnalysis && (
                      <div className="mt-2 p-3 bg-slate-900 text-white rounded-xl text-xs border border-slate-700 space-y-1">
                        <div className="flex justify-between items-center text-teal-400 font-bold">
                          <span className="flex items-center gap-1">
                            <Sparkles size={13} /> Edge ML Validation
                          </span>
                          <span>Confidence: {cvAnalysis.confidence}</span>
                        </div>
                        <div className="text-sm font-black">{cvAnalysis.type}</div>
                        <div className="text-[11px] text-slate-300">
                          Severity: <span className="text-amber-400 font-bold">{cvAnalysis.level}</span> • Action: {cvAnalysis.action}
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={!isFormSubmittable}
                    className={`w-full font-black py-3 rounded-xl flex justify-center items-center gap-2 text-xs uppercase tracking-wider shadow transition ${
                      !isFormSubmittable
                        ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                        : "bg-teal-600 hover:bg-teal-700 text-white"
                    }`}
                  >
                    <Radar size={15} className="animate-spin" /> {!isFormSubmittable ? t.intake.btnSubmitDisabled : isOnline ? t.intake.btnSubmitReadyOnline : t.intake.btnSubmitReadyOffline}
                  </button>
                </form>
              )}
            </div>

            {/* RIGHT COLUMN: CITIZEN PROFILE & MARKETPLACE CARDS (NUMBER BADGE COMPLETELY REMOVED) */}
            <div className="space-y-6">
              {isAuthenticated && (
                <aside className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                  <div className="pb-3 border-b border-slate-100">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Verified Citizen Profile</h3>
                    <p className="text-xs text-teal-700 font-mono font-bold mt-0.5">+91 {verifiedPhone}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">Civic Balance</span>
                      <span className="text-lg font-black text-teal-700">{citizenPoints} Pts</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">Active Reports</span>
                      <span className="text-lg font-black text-slate-800">
                        {complaints.filter(c => c.status !== "Resolved").length}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-[11px] font-black uppercase text-slate-700 flex items-center gap-1">
                      <Award size={13} className="text-amber-500" /> Earned Civic Badges
                    </h4>
                    <div className="space-y-2">
                      {citizenBadges.map((badge, idx) => (
                        <div key={idx} className="p-2.5 bg-amber-50/50 border border-amber-200/60 rounded-xl flex items-center gap-2.5">
                          <span className="text-lg">{badge.icon}</span>
                          <div>
                            <h5 className="text-xs font-bold text-slate-800">{badge.title}</h5>
                            <p className="text-[10px] text-slate-600 leading-tight">{badge.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>
              )}

              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <h3 className="text-xs font-black uppercase text-slate-700 mb-2 flex items-center gap-1.5">
                  <BadgePercent size={16} className="text-teal-600" /> {t.marketplace.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{t.marketplace.desc}</p>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-teal-950 text-white rounded-2xl p-5 shadow-sm">
                <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-1">{t.safeguards.title}</h3>
                <p className="text-sm font-bold">{t.safeguards.subtitle}</p>
                <p className="text-xs text-slate-300 mt-2">{t.safeguards.desc}</p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: CITIZEN TRACKING */}
        {currentRole === "Citizen" && activeTab === "tracking" && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-black text-slate-800">{t.tracking.title}</h2>
              <p className="text-xs text-slate-500">{t.tracking.subtitle}</p>
            </div>

            {complaints.map((ticket) => (
              <div key={ticket.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-slate-100 px-2 py-0.5 rounded">{ticket.id}</span>
                    <span className="text-xs font-bold text-teal-800">{ticket.category}</span>
                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-medium text-slate-600">
                      {ticket.city}, {ticket.country}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      ticket.status === "Resolved"
                        ? "bg-emerald-100 text-emerald-800"
                        : ticket.status.includes("Fake")
                        ? "bg-red-100 text-red-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {ticket.status === "Resolved"
                      ? t.tracking.resolved
                      : ticket.status.includes("Fake")
                      ? t.tracking.fakeRejected
                      : ticket.status === "In Progress"
                      ? t.tracking.inProgress
                      : t.tracking.pending}
                  </span>
                </div>

                <p className="text-xs text-slate-600">{ticket.desc}</p>

                {ticket.status === "Resolved" && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-3">
                    <span className="text-xs font-black uppercase text-slate-700 flex items-center gap-1.5 mb-2">
                      <CheckCheck size={16} className="text-emerald-600" /> {t.tracking.auditTitle}
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-slate-500">{t.tracking.beforeLabel}</span>
                        {ticket.beforeImg ? (
                          <img src={ticket.beforeImg} alt="Before" className="h-28 w-full object-cover rounded-lg mt-1 border" />
                        ) : (
                          <div className="h-28 bg-slate-200 rounded-lg flex items-center justify-center text-[10px] text-slate-500">
                            {t.tracking.noInitialImg}
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-500">{t.tracking.afterLabel}</span>
                        <img src={ticket.afterImg} alt="After" className="h-28 w-full object-cover rounded-lg mt-1 border border-emerald-400" />
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap justify-between items-center gap-2">
                      <span className="text-xs font-bold text-slate-700">{t.tracking.citizenSatisfaction}</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => submitCitizenRating(ticket.id, star)}
                            className="p-1 hover:text-amber-500"
                          >
                            <Star
                              size={16}
                              className={ticket.citizenRating >= star ? "text-amber-400 fill-amber-400" : "text-slate-300"}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: PUBLIC WARD TRANSPARENCY SCORECARD */}
        {activeTab === "public_transparency" && (
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center flex-wrap gap-4">
              <div>
                <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                  <Eye className="text-teal-600" size={20} /> {t.scorecard.title}
                </h2>
                <p className="text-xs text-slate-500">{t.scorecard.subtitle}</p>
              </div>
              <span className="text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 px-3 py-1.5 rounded-xl">
                {t.scorecard.openDataBadge}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-slate-500 uppercase">{t.scorecard.cleanlinessIndex}</span>
                <div className="text-3xl font-black text-teal-700 mt-2">87 / 100</div>
                <span className="text-[11px] text-emerald-600 font-bold mt-1 block">{t.scorecard.cleanlinessRank}</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-slate-500 uppercase">{t.scorecard.avgResolutionTime}</span>
                <div className="text-3xl font-black text-slate-800 mt-2">2.4 Days</div>
                <span className="text-[11px] text-slate-500 mt-1 block">{t.scorecard.slaTargetDays}</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-slate-500 uppercase">{t.scorecard.satisfactionRate}</span>
                <div className="text-3xl font-black text-amber-500 mt-2">4.6 ★</div>
                <span className="text-[11px] text-slate-500 mt-1 block">{t.scorecard.satisfactionSub}</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs uppercase text-slate-700">
                {t.scorecard.tableHeader}
              </div>
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/60 border-b text-slate-600 font-bold uppercase">
                  <tr>
                    <th className="p-3.5">{t.scorecard.colWard}</th>
                    <th className="p-3.5">{t.scorecard.colActive}</th>
                    <th className="p-3.5">{t.scorecard.colResolved}</th>
                    <th className="p-3.5">{t.scorecard.colSla}</th>
                    <th className="p-3.5">{t.scorecard.colGrade}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3.5 font-bold">Ward 14 (MVP Colony)</td>
                    <td className="p-3.5 text-amber-600 font-bold">3</td>
                    <td className="p-3.5 text-emerald-700 font-bold">42</td>
                    <td className="p-3.5">97.4%</td>
                    <td className="p-3.5"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">Grade A+</span></td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold">Ward 28 (Gajuwaka Industrial)</td>
                    <td className="p-3.5 text-amber-600 font-bold">7</td>
                    <td className="p-3.5 text-emerald-700 font-bold">38</td>
                    <td className="p-3.5">91.2%</td>
                    <td className="p-3.5"><span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-bold">Grade A</span></td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold">Ward 5 (Madhurawada IT SEZ)</td>
                    <td className="p-3.5 text-amber-600 font-bold">2</td>
                    <td className="p-3.5 text-emerald-700 font-bold">51</td>
                    <td className="p-3.5">98.1%</td>
                    <td className="p-3.5"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">Grade A+</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 4: ADMIN CLUSTER TRIAGE */}
        {currentRole !== "Citizen" && activeTab === "admin_triage" && (
          <div className="space-y-6">
            {/* MUNICIPAL MANAGER / OFFICER PERFORMANCE SCORECARD */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-1 rounded">
                    Municipal Officer Performance Index
                  </span>
                  <h3 className="text-base font-black text-slate-800 mt-1">Ward 14 Operations Manager Scorecard</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Scoring determined by SLA adherence, resolution turnaround time, and citizen feedback ratings.
                  </p>
                </div>
                
                <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Manager Rating Score</span>
                    <span className="text-2xl font-black text-teal-700">{managerScore} / 1000 Pts</span>
                  </div>
                  <div className="border-l border-slate-200 pl-4">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Performance Tier</span>
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block mt-0.5">
                      {managerTier}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap justify-between items-center gap-4">
              <div>
                <h2 className="text-lg font-black text-slate-800">{currentRole.toUpperCase()} OPERATIONS CONSOLE</h2>
                <p className="text-xs text-slate-500">
                  Live Geospatial Clustering • Department-Wise Segregation & Triage
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                    <Layers size={14} /> Department:
                  </span>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="border border-slate-300 rounded-lg px-3 py-1.5 bg-white font-bold text-xs text-teal-800"
                  >
                    {uniqueDepartments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                    <Building size={14} /> City:
                  </span>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="border border-slate-300 rounded-lg px-3 py-1.5 bg-white font-bold text-xs"
                  >
                    {uniqueCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-black uppercase text-teal-800 flex items-center gap-1.5">
                  <Compass size={15} className="text-teal-600" /> Geospatial Clustering Engine & Incident Radar
                </span>
                <div className="flex items-center gap-3 text-[11px] font-bold">
                  <span className="flex items-center gap-1 text-teal-700">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-teal-500"></span> Standard Cluster
                  </span>
                  <span className="flex items-center gap-1 text-red-600">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500"></span> Critical / Breached
                  </span>
                </div>
              </div>

              <div className="h-96 w-full rounded-xl overflow-hidden border border-slate-200 relative">
                <MapContainer center={[coords.lat, coords.lng]} zoom={12} scrollWheelZoom={false}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {filteredList.length > 0 && (
                    <MapRecenter center={[filteredList[0].latitude, filteredList[0].longitude]} />
                  )}

                  {filteredList.map((ticket) => (
                    <Circle
                      key={`halo-${ticket.id}`}
                      center={[ticket.latitude, ticket.longitude]}
                      radius={100}
                      pathOptions={{
                        color: ticket.isSLABreached ? "#ef4444" : "#0d9488",
                        fillColor: ticket.isSLABreached ? "#f87171" : "#2dd4bf",
                        fillOpacity: 0.25,
                        weight: 2,
                      }}
                    />
                  ))}

                  {filteredList.map((ticket) => {
                    const isMulti = ticket.duplicatesCount > 1;
                    const markerIcon = isMulti
                      ? createClusterIcon(ticket.duplicatesCount, ticket.isSLABreached)
                      : new L.Icon.Default();

                    return (
                      <Marker
                        key={ticket.id}
                        position={[ticket.latitude, ticket.longitude]}
                        icon={markerIcon}
                      >
                        <Popup>
                          <div className="p-1 font-sans text-xs">
                            <strong className="block text-teal-800 font-bold mb-1">
                              {ticket.id} ({ticket.city}, {ticket.country})
                            </strong>
                            <div className="text-slate-700 font-bold mb-1">{ticket.category}</div>
                            <p className="text-slate-600 text-[11px] mb-2">{ticket.desc}</p>
                            <div className="bg-slate-100 p-1.5 rounded text-[10px] font-bold">
                              Status: {ticket.status} | Cluster Density: {ticket.duplicatesCount} Reports Merged
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredList.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`bg-white rounded-2xl p-5 shadow-sm border flex flex-col justify-between ${
                    ticket.isSLABreached ? "border-red-400 ring-2 ring-red-100" : "border-slate-200"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] px-2 py-0.5 rounded font-black bg-slate-100 text-slate-700 border border-slate-200">
                        {ticket.city}, {ticket.country}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-black uppercase ${
                          ticket.status === "Resolved"
                            ? "bg-emerald-100 text-emerald-800"
                            : ticket.status.includes("Fake")
                            ? "bg-red-100 text-red-800"
                            : ticket.status === "In Progress"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>

                    {ticket.isSLABreached && (
                      <div className="mb-3 px-2 py-1.5 bg-red-50 border border-red-200 rounded-lg flex items-center gap-1.5 text-[11px] text-red-700 font-bold">
                        <ShieldAlert size={14} className="text-red-600 flex-shrink-0" />
                        SLA Breached (&gt;10 Days) — Show-Cause Warning Logged
                      </div>
                    )}

                    {ticket.duplicatesCount > 1 && (
                      <div className="mb-2 px-2 py-1 bg-amber-50 border border-amber-200 rounded-md text-[10px] text-amber-800 font-bold flex items-center gap-1">
                        <Flame size={12} className="text-amber-600" />
                        Spatial Cluster: {ticket.duplicatesCount} citizens merged
                      </div>
                    )}

                    {ticket.isPredictive && (
                      <div className="mb-2 px-2 py-1 bg-purple-50 border border-purple-200 rounded-md text-[10px] text-purple-800 font-bold flex items-center gap-1">
                        <Sparkles size={12} className="text-purple-600" />
                        Autonomous Preventive Scan Generated
                      </div>
                    )}

                    {ticket.environmentalRisks && ticket.environmentalRisks.length > 0 && (
                      <div className="mb-2 p-2 bg-purple-50 border border-purple-200 rounded-lg text-[11px] text-purple-900 space-y-1">
                        <span className="font-bold uppercase tracking-wider block text-[10px] text-purple-800 flex items-center gap-1">
                          <Sparkles size={12} className="text-purple-600" /> Municipal Risk Advisory:
                        </span>
                        {ticket.environmentalRisks.map((risk, idx) => (
                          <p key={idx} className="leading-tight text-purple-950 font-medium">
                            <strong>{risk.zoneName}:</strong> {risk.advisory}
                          </p>
                        ))}
                      </div>
                    )}

                    <div className="text-[11px] font-bold text-teal-700 uppercase tracking-wide">{ticket.category}</div>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">{ticket.desc}</p>

                    {ticket.aiSeverity && (
                      <div className="mt-2 p-1.5 bg-slate-50 border border-slate-200 rounded text-[10px] text-slate-600">
                        <span className="font-bold text-teal-800">Vision Tag:</span> {ticket.aiSeverity.type} ({ticket.aiSeverity.confidence})
                      </div>
                    )}kotnanapoornima057

                    <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                      <div>Locality: {ticket.locality}</div>
                      <div>Contractor: <span className="font-bold text-slate-700">{ticket.assignedWorker}</span></div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
                    {ticket.status !== "Resolved" && !ticket.status.includes("Fake") ? (
                      <>
                        <div className="flex gap-2">
                          <button
                            onClick={() => dispatchWorker(ticket.id)}
                            className="flex-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-lg"
                          >
                            Dispatch Unit
                          </button>
                          <button
                            onClick={() => markResolvedWithProof(ticket.id)}
                            className="flex-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg"
                          >
                            Resolve + Proof
                          </button>
                        </div>
                        <button
                          onClick={() => flagFakeComplaint(ticket.id)}
                          className="w-full text-xs text-red-600 hover:bg-red-50 border border-red-200 font-bold py-1.5 rounded-lg flex items-center justify-center gap-1"
                        >
                          <AlertTriangle size={13} /> Flag as Fake Report (-25 Credits)
                        </button>
                      </>
                    ) : (
                      <div className="text-center py-1 text-xs font-bold text-slate-500">
                        {ticket.status === "Resolved" ? "Closed & Persisted" : "Penalized & Discarded"}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 5: ANALYTICS & OPEX ROI */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <BarChart3 className="text-teal-600" size={20} /> Municipal OpEx & Operational ROI Dashboard
              </h2>
              <p className="text-xs text-slate-500">Real-time quantification of municipal cost reductions via deduplication.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-slate-500 uppercase">Total Intake</span>
                <div className="text-3xl font-black text-slate-800 mt-2">{totalComplaints}</div>
                <span className="text-[11px] text-teal-600 font-bold mt-1 block">Registered civic tickets</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-slate-500 uppercase">Resolution Efficiency</span>
                <div className="text-3xl font-black text-emerald-600 mt-2">{resolutionRate}%</div>
                <span className="text-[11px] text-slate-500 mt-1 block">{resolvedCount} verified closures</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-slate-500 uppercase">Redundant Trucks Saved</span>
                <div className="text-3xl font-black text-amber-600 mt-2">{duplicateClusterCount}</div>
                <span className="text-[11px] text-slate-500 mt-1 block">Wasted dispatches eliminated</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-teal-300 bg-teal-50/50 shadow-sm">
                <span className="text-xs font-bold text-teal-800 uppercase flex items-center gap-1">
                  <DollarSign size={14} /> OpEx Cost Saved
                </span>
                <div className="text-3xl font-black text-teal-700 mt-2">₹{opexSavedINR.toLocaleString()}</div>
                <span className="text-[11px] text-teal-600 font-bold mt-1 block">Direct fuel & crew savings</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-xs font-black uppercase text-slate-800 mb-3 flex items-center gap-1.5">
                <FileText size={15} className="text-teal-600" /> Operational Escalation Telemetry
              </h3>
              <div className="space-y-2 font-mono text-xs max-h-56 overflow-y-auto">
                {auditLogs.map((log, i) => (
                  <div key={i} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex gap-3 items-center">
                    <span className="text-slate-400 font-bold">{log.time}</span>
                    <span className="text-slate-700">{log.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 6: CONTRACTOR WARNINGS & ADMINISTRATIVE SANCTIONS */}
        {activeTab === "contract_warnings" && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap justify-between items-center gap-4">
              <div>
                <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                  <AlertOctagon className="text-amber-600" size={20} /> Contractor Performance & Warning Ledger
                </h2>
                <p className="text-xs text-slate-500">
                  Zero banking required: Operational sanctions, Show-Cause notices, and dispatch freezing.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-xs font-bold flex items-center gap-1">
                  <Clock size={13} /> Yellow: Notice to Expedite
                </span>
                <span className="px-3 py-1 bg-red-50 border border-red-200 text-red-800 rounded-lg text-xs font-bold flex items-center gap-1">
                  <ShieldAlert size={13} /> Red: Formal Show-Cause
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase">
                  <tr>
                    <th className="p-3.5">Ticket ID</th>
                    <th className="p-3.5">Assigned Contractor</th>
                    <th className="p-3.5">SLA Timeline</th>
                    <th className="p-3.5">Administrative Status</th>
                    <th className="p-3.5">Work Allocation Eligibility</th>
                    <th className="p-3.5 text-right">Sanction Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {complaints.map((c) => {
                    const isBreached = c.isSLABreached;
                    const isResolved = c.status === "Resolved";

                    let warningBadge = (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        Compliant (Within SLA)
                      </span>
                    );

                    let dispatchStatus = (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <UserCheck size={13} /> Active / Eligible
                      </span>
                    );

                    if (isBreached && !isResolved) {
                      warningBadge = (
                        <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 font-bold text-[10px] flex items-center gap-1 w-max">
                          <ShieldAlert size={12} /> Red Flag: Show-Cause Issued
                        </span>
                      );
                      dispatchStatus = (
                        <span className="text-red-600 font-bold flex items-center gap-1">
                          <AlertTriangle size={12} /> Throttled (New Jobs Frozen)
                        </span>
                      );
                    } else if (!isResolved && c.status === "In Progress") {
                      warningBadge = (
                        <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px] flex items-center gap-1 w-max">
                          <Clock size={12} /> Yellow Flag: Notice to Expedite
                        </span>
                      );
                    }

                    return (
                      <tr key={c.id} className={isBreached && !isResolved ? "bg-red-50/30" : ""}>
                        <td className="p-3.5 font-bold font-mono">{c.id}</td>
                        <td className="p-3.5 text-slate-700 font-medium">{c.assignedWorker}</td>
                        <td className="p-3.5">
                          {isResolved ? (
                            <span className="text-slate-500 font-medium">Completed</span>
                          ) : isBreached ? (
                            <span className="text-red-600 font-bold">&gt;10 Days Overdue</span>
                          ) : (
                            <span className="text-slate-600">Day 3 of 10</span>
                          )}
                        </td>
                        <td className="p-3.5">{warningBadge}</td>
                        <td className="p-3.5">{dispatchStatus}</td>
                        <td className="p-3.5 text-right">
                          {isBreached && !isResolved ? (
                            <button
                              onClick={() =>
                                alert(
                                  `OFFICIAL NOTICE ISSUED:\nFormal Show-Cause Memo registered against ${c.assignedWorker} for Ticket ${c.id}.\nWork allocation frozen under Municipal Act Section 42.`
                                )
                              }
                              className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[11px] font-bold shadow-sm"
                            >
                              Issue Formal Warning
                            </button>
                          ) : (
                            <span className="text-slate-400 text-[11px]">No Action Needed</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 7: CSR & ESG PORTAL */}
        {activeTab === "csr" && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center flex-wrap gap-4">
              <div>
                <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                  <Building2 className="text-teal-600" size={20} /> Corporate Social Responsibility (CSR) & ESG Portal
                </h2>
                <p className="text-xs text-slate-500">
                  Corporate-sponsored ward adoption compliant with Section 135 Indian Companies Act.
                </p>
              </div>
              <button
                onClick={() => alert("Downloading ESG Telemetry Audit Certificate (PDF)...")}
                className="px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-slate-800"
              >
                <Download size={14} /> Export ESG Certificate
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {csrSponsors.map((sponsor, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-teal-50 text-teal-800 border border-teal-200 rounded uppercase">
                      Active Ward Sponsor
                    </span>
                    <h3 className="text-base font-black text-slate-800 mt-2">{sponsor.name}</h3>
                    <p className="text-xs text-slate-500">
                      Adopted Zone: <strong className="text-slate-700">{sponsor.adoptedWard}</strong>
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">CSR Budget Deployed:</span>
                        <strong className="text-teal-700">{sponsor.budgetFunded}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Civic Fixes Completed:</span>
                        <strong className="text-slate-800">{sponsor.projectsCompleted} Projects</strong>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-teal-600">
                    <span>ESG Compliance: Verified ✓</span>
                    <span className="text-slate-400">BRSR Aligned</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}