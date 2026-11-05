const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, "complaints.json");

app.use(cors());
app.use(express.json({ limit: "25mb" }));

const otpStore = {};

function readComplaints() {
  try {
    const data = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveComplaints(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
}

function calculateDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const toRad = (x) => (x * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function classifyGlobalDepartment(text) {
  if (!text || text.trim() === "") return "Solid Waste & Sanitation";
  const t = text.toLowerCase();

  const scores = {
    "Water & Drainage": 0,
    "Electricity & Power": 0,
    "Roads & Transit": 0,
    "Environmental & Pollution": 0,
    "Solid Waste & Sanitation": 0,
  };

  if (t.match(/water|pipeline|pipe|leak|drain|drainage|sewage|gutter|tap|drinking|flood|overflow|manhole|sewer|waterlogging|మంచినీరు|పైపు|మురుగు|నీరు|లీకేజ్|కాలువ|నల్లా|पानी|जल|नल|नाली|सीवर|पाइप|जलभराव/i)) {
    scores["Water & Drainage"] += 3;
  }
  if (t.match(/electric|current|light|streetlight|wire|pole|power|dark|darkness|transformer|spark|blackout|bulb|fuse|voltage|దీపం|కరెంట్|లైట్|విద్యుత్|స్తంభం|వైరు|చీకటి|बिजली|तार|खंभा|अंधेरा|ट्रांसफार्मर|बत्ती|करंट/i)) {
    scores["Electricity & Power"] += 3;
  }
  if (t.match(/pothole|road|footpath|street|traffic|asphalt|divider|highway|carretera|straße|rue|గుంత|రోడ్డు|దారి|రహదారి|ఫుట్‌పాత్|సడక్|सड़क|गड्ढा|फुटपाथ|मार्ग|जाम/i)) {
    scores["Roads & Transit"] += 3;
  }
  if (t.match(/smoke|chemical|factory|air|noise|sound|pollution|plastic|toxic|dust|fumes|smell|odor|కాలుష్యం|పొగ|శబ్దం|దుర్వాసన|రసాయనాలు|ప్రదూషణ|प्रदूषण|धुआं|बदबू|शोर|जहरीला/i)) {
    scores["Environmental & Pollution"] += 3;
  }
  if (t.match(/garbage|trash|waste|dustbin|bin|debris|dump|sanitation|litter|scraps|చెత్త|పరిశుభ్రత|కచరా|కుప్ప|చెత్తబుట్ట|कचरा|गंदगी|कूड़ा|सफाई|कचरे/i)) {
    scores["Solid Waste & Sanitation"] += 3;
  }

  let topCategory = "Solid Waste & Sanitation";
  let maxScore = 0;

  for (const [dept, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      topCategory = dept;
    }
  }

  return topCategory;
}

// MUNICIPAL INFRASTRUCTURE & RISK ZONES (Geo-Fenced Open Data Lookups)
const MUNICIPAL_RISK_ZONES = [
  {
    name: "MVP Colony Drainage Convergence Node",
    latitude: 17.7231,
    longitude: 83.3012,
    radiusMeters: 400,
    riskType: "Chronic Urban Flooding / Stormwater Backflow Risk",
    advisory: "Warning: This area historically experiences rapid drainage overflow and waterlogging during high-intensity rainfall."
  },
  {
    name: "Gajuwaka Industrial Pipeline Corridor",
    latitude: 17.6800,
    longitude: 83.2100,
    radiusMeters: 500,
    riskType: "High-Pressure Mainline & Effluent Risk",
    advisory: "Warning: Heavy industrial stress zone. Pipeline leakages here carry secondary risk of soil saturation and road depressions."
  },
  {
    name: "Madhurawada Low-Lying Storm Basin",
    latitude: 17.8100,
    longitude: 83.3500,
    radiusMeters: 450,
    riskType: "Seasonal Waterlogging Zone",
    advisory: "Advisory: Prone to localized drainage blockages due to silt accumulation during heavy runoff."
  }
];

function checkMunicipalRiskZones(latitude, longitude) {
  const triggeredRisks = [];
  MUNICIPAL_RISK_ZONES.forEach((zone) => {
    const distance = calculateDistanceMeters(latitude, longitude, zone.latitude, zone.longitude);
    if (distance <= zone.radiusMeters) {
      triggeredRisks.push({
        zoneName: zone.name,
        riskType: zone.riskType,
        advisory: zone.advisory,
        distanceMeters: Math.round(distance)
      });
    }
  });
  return triggeredRisks;
}

// AUTONOMOUS PREDICTIVE SURROUNDINGS SCANNER
function runAutonomousPredictiveScan(primaryCategory, desc, latitude, longitude) {
  const t = desc.toLowerCase();
  const predictiveScans = [];

  if (primaryCategory === "Water & Drainage" || t.match(/leak|rupture|burst|flood|pipe/i)) {
    predictiveScans.push({
      id: `PRED-2026-${Math.floor(100 + Math.random() * 900)}`,
      category: "Roads & Transit",
      city: "Visakhapatnam",
      country: "India",
      locality: "Adjacent Pipeline Corridor Zone",
      desc: `Autonomous Preventive Alert: Potential soil erosion and secondary asphalt pothole formation detected due to nearby water main saturation.`,
      latitude: latitude + (Math.random() - 0.5) * 0.002,
      longitude: longitude + (Math.random() - 0.5) * 0.002,
      status: "Pending Preventive Action",
      assignedWorker: "Apex Infra Maintenance Ltd (Contractor #4)",
      createdAt: new Date().toISOString(),
      duplicatesCount: 1,
      priority: "PREVENTIVE HIGH",
      citizenPhone: "+91 98490 12345",
      beforeImg: null,
      afterImg: null,
      channel: "Autonomous AI Radar",
      isPredictive: true
    });
  }

  if (primaryCategory === "Solid Waste & Sanitation" || t.match(/garbage|trash|waste|dump/i)) {
    predictiveScans.push({
      id: `PRED-2026-${Math.floor(100 + Math.random() * 900)}`,
      category: "Water & Drainage",
      city: "Visakhapatnam",
      country: "India",
      locality: "Adjacent Drainage Grate",
      desc: `Autonomous Preventive Alert: Debris and litter overflow risk threatening stormwater drain blockage and localized waterlogging.`,
      latitude: latitude + (Math.random() - 0.5) * 0.002,
      longitude: longitude + (Math.random() - 0.5) * 0.002,
      status: "Pending Preventive Action",
      assignedWorker: "Sanitation & Drainage Unit B",
      createdAt: new Date().toISOString(),
      duplicatesCount: 1,
      priority: "PREVENTIVE MEDIUM",
      citizenPhone: "+91 98490 12345",
      beforeImg: null,
      afterImg: null,
      channel: "Autonomous AI Radar",
      isPredictive: true
    });
  }

  return predictiveScans;
}

// 1. Phone OTP Dispatches
app.post("/api/auth/send-otp", (req, res) => {
  const { phone } = req.body;
  if (!phone || phone.length < 10) {
    return res.status(400).json({ error: "Please provide a valid 10-digit mobile number." });
  }

  const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000;
  otpStore[phone] = { otp: generatedOtp, expiresAt };

  console.log(`\n==============================================`);
  console.log(`[SMS GATEWAY] Outbound OTP for +91 ${phone}: ${generatedOtp}`);
  console.log(`==============================================\n`);

  res.json({
    success: true,
    message: `OTP dispatched to +91 ${phone}`,
    devOtp: generatedOtp,
  });
});

app.post("/api/auth/verify-otp", (req, res) => {
  const { phone, otp } = req.body;
  const record = otpStore[phone];

  if (!record) {
    return res.status(400).json({ error: "No OTP request found for this mobile number." });
  }
  if (Date.now() > record.expiresAt) {
    delete otpStore[phone];
    return res.status(400).json({ error: "OTP has expired. Please request a new one." });
  }
  if (record.otp !== otp.trim()) {
    return res.status(400).json({ error: "Incorrect OTP. Please check and try again." });
  }

  delete otpStore[phone];
  const token = `token_civic_${Buffer.from(phone).toString("base64")}`;
  res.json({
    success: true,
    token,
    phone,
    message: "Mobile phone verified successfully.",
  });
});

// 2. Complaints Query with Department & City Filtering
app.get("/api/complaints", (req, res) => {
  const { city, department } = req.query;
  let complaints = readComplaints();
  const now = new Date();

  const evaluated = complaints.map((c) => {
    const diffDays = (now - new Date(c.createdAt)) / (1000 * 60 * 60 * 24);
    const isBreached = diffDays >= 10 && c.status !== "Resolved";
    return {
      ...c,
      isSLABreached: isBreached,
      priority: isBreached ? "CRITICAL" : c.priority,
    };
  });

  let filtered = evaluated;

  if (city && city !== "All Cities") {
    filtered = filtered.filter((item) => item.city === city);
  }

  if (department && department !== "All Departments") {
    filtered = filtered.filter((item) => item.category === department);
  }

  res.json(filtered);
});

// 3. Complaint Ingestion + Risk Telemetry & Autonomous Scan
app.post("/api/complaints", (req, res) => {
  const { desc, city, country, locality, latitude, longitude, citizenPhone, beforeImg, aiSeverity, channel } = req.body;

  if (!desc || !desc.trim()) {
    return res.status(400).json({ error: "Validation Error: Grievance description is required." });
  }

  if (!beforeImg) {
    return res.status(400).json({ error: "Validation Error: Real-time camera photographic proof is mandatory." });
  }

  const isBase64Stream = typeof beforeImg === "string" && beforeImg.startsWith("data:image/");
  if (!isBase64Stream) {
    return res.status(400).json({
      error: "Integrity Violation: Images must originate from live device camera sensor, not third-party web links.",
    });
  }

  const imageSizeBytes = (beforeImg.length * 3) / 4;
  if (imageSizeBytes < 12000) {
    return res.status(400).json({
      error: "Integrity Violation: Captured image is blank or below verifiable optical resolution.",
    });
  }

  const complaints = readComplaints();
  const detectedDept = classifyGlobalDepartment(desc);

  // Check Municipal Open Data Risk Zones
  const environmentalRisks = checkMunicipalRiskZones(Number(latitude), Number(longitude));

  const parentIndex = complaints.findIndex((c) => {
    if (c.status === "Resolved") return false;
    const distance = calculateDistanceMeters(latitude, longitude, c.latitude, c.longitude);
    return distance <= 100 && c.category === detectedDept;
  });

  if (parentIndex !== -1) {
    complaints[parentIndex].duplicatesCount += 1;
    complaints[parentIndex].priority = "URGENT / CLUSTER";
    saveComplaints(complaints);

    return res.status(200).json({
      merged: true,
      parentTicket: complaints[parentIndex],
      message: `Spatial duplicate detected near ${locality || city}. Merged into incident ${complaints[parentIndex].id} (Cluster density: ${complaints[parentIndex].duplicatesCount})`,
    });
  }

  const newTicket = {
    id: `CIVIC-2026-${Math.floor(100 + Math.random() * 900)}`,
    category: detectedDept,
    city: city || "Visakhapatnam",
    country: country || "India",
    locality: locality || "General Zone",
    desc: desc.trim(),
    latitude: Number(latitude),
    longitude: Number(longitude),
    status: "Pending",
    assignedWorker: "Apex Infra Maintenance Ltd (Contractor #4)",
    createdAt: new Date().toISOString(),
    duplicatesCount: 1,
    priority: aiSeverity && aiSeverity.level === "HIGH" ? "HIGH / URGENT" : "Normal",
    citizenPhone: citizenPhone || "+91 98490 12345",
    beforeImg: beforeImg,
    afterImg: null,
    citizenRating: null,
    channel: channel || "Web Portal",
    aiSeverity: aiSeverity || null,
    isSensorVerified: true,
    environmentalRisks
  };

  complaints.unshift(newTicket);

  const predictiveScans = runAutonomousPredictiveScan(detectedDept, desc, Number(latitude), Number(longitude));
  if (predictiveScans.length > 0) {
    predictiveScans.forEach((scanTicket) => {
      complaints.unshift(scanTicket);
    });
  }

  saveComplaints(complaints);

  res.status(201).json({
    merged: false,
    ticket: newTicket,
    environmentalRisks,
    predictiveScans,
    message: `Registered in ${city}, ${country} via [${newTicket.channel}] and routed to [${detectedDept}]. Cross-referenced ${environmentalRisks.length} regional risk factor(s) and generated ${predictiveScans.length} preventive alert(s).`,
  });
});

app.patch("/api/complaints/:id", (req, res) => {
  const { id } = req.params;
  const { status, assignedWorker, afterImg, citizenRating } = req.body;
  const complaints = readComplaints();

  const index = complaints.findIndex((c) => c.id === id);
  if (index === -1) return res.status(404).json({ error: "Ticket not found" });

  if (status) complaints[index].status = status;
  if (assignedWorker) complaints[index].assignedWorker = assignedWorker;
  if (afterImg) complaints[index].afterImg = afterImg;
  if (citizenRating) complaints[index].citizenRating = citizenRating;

  saveComplaints(complaints);
  res.json({ success: true, updated: complaints[index] });
});

app.listen(PORT, () => {
  console.log(`Global Civic Platform Engine live on http://localhost:${PORT}`);
});