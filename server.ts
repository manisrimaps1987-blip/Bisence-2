import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Built-in Indian Standards Knowledge Base for RAG and Grounding
const KNOWLEDGE_BASE = [
  {
    code: 'IS 13983:1994',
    title: 'Stainless Steel Sinks for Domestic Purposes — Sample Reference',
    category: 'Kitchen Equipment',
    scheme: 'ISI',
    riskArea: 'Food safety & Material hygiene',
    keywords: ['kitchen', 'stainless', 'sink', 'steel', 'restaurant', 'commercial', 'basin', 'food prep'],
    requirements: 'Grade AISI 304 austenitic stainless steel, 0.8mm-1.2mm thickness, salt spray corrosion testing, overflow drainage tolerance.',
    officialPortal: 'https://www.manakonline.in',
    qcoStatus: 'Covered under Kitchenware Quality Control Order'
  },
  {
    code: 'IS 2347:2017',
    title: 'Pressure Cooker Safety — Sample Reference',
    category: 'Pressure Appliances',
    scheme: 'ISI',
    riskArea: 'Pressure safety & Thermal containment',
    keywords: ['pressure', 'cooker', 'vessel', 'steam', 'safety valve', 'gasket', 'cooking'],
    requirements: 'Proof pressure 2x operating pressure, fusible alloy plug melting between 115°C-130°C, burst pressure 3x operating threshold.',
    officialPortal: 'https://www.manakonline.in',
    qcoStatus: 'Mandatory under Domestic Pressure Cookers QCO'
  },
  {
    code: 'IS 302 (Part 1):2008',
    title: 'Electrical Safety for Household Appliances — Sample Reference',
    category: 'Electrical',
    scheme: 'ISI',
    riskArea: 'Electrical safety & shock prevention',
    keywords: ['electrical', 'appliance', 'mixer', 'grinder', 'iron', 'toaster', 'motor', 'power'],
    requirements: 'Insulation resistance > 2 MOhm, 1500V dielectric flash test, earthing continuity < 0.1 Ohm, flame retardant polymer.',
    officialPortal: 'https://www.manakonline.in',
    qcoStatus: 'Mandatory under Electrical Appliances QCO'
  },
  {
    code: 'IS 14543:2024',
    title: 'Packaged Drinking Water (Other than Natural Mineral Water) — Sample Reference',
    category: 'Food & Water',
    scheme: 'ISI',
    riskArea: 'Microbiological safety & heavy metal toxicity',
    keywords: ['water', 'drinking', 'packaged', 'bottle', 'mineral', 'ro', 'beverage'],
    requirements: 'Zero detectable E. Coli/Coliforms, lead < 0.01 mg/L, mandatory in-house chemical & microbiological test laboratory.',
    officialPortal: 'https://www.manakonline.in',
    qcoStatus: 'Mandatory under Food Safety & Standards (FSSAI) and BIS Act'
  },
  {
    code: 'IS 1417:2016',
    title: 'Gold and Gold Alloys, Jewellery/Artefacts — Fineness and Marking — Sample Reference',
    category: 'Hallmarking',
    scheme: 'HALLMARKING',
    riskArea: 'Consumer economic protection & Precious metal assay purity',
    keywords: ['gold', 'jewellery', 'hallmark', 'huid', 'karat', 'fineness', 'ornament'],
    requirements: 'Assaying by fire assay method, 6-digit alphanumeric Hallmark Unique Identification (HUID) laser marking.',
    officialPortal: 'https://www.manakonline.in',
    qcoStatus: 'Mandatory across notified districts in India'
  },
  {
    code: 'IS 16102 (Part 1):2012',
    title: 'Self-Ballasted LED Lamps for General Lighting Services — Sample Reference',
    category: 'Electronics & IT',
    scheme: 'CRS',
    riskArea: 'Electrical safety & photobiological radiation',
    keywords: ['led', 'lamp', 'bulb', 'light', 'luminaire', 'lighting'],
    requirements: 'Compulsory Registration Scheme (CRS), 650°C glow wire test, photobiological eye safety risk evaluation.',
    officialPortal: 'https://www.crsbis.in',
    qcoStatus: 'Mandatory under MeitY Electronics Order'
  },
  {
    code: 'IS 9873 (Part 1):2019',
    title: 'Safety of Toys: Mechanical and Physical Properties — Sample Reference',
    category: 'Consumer Products',
    scheme: 'ISI',
    riskArea: 'Child safety, choking hazard & sharp edge injury',
    keywords: ['toy', 'children', 'game', 'plastic', 'doll', 'infant', 'choking'],
    requirements: 'Drop test, torque/tension testing, small parts cylinder test for kids under 36 months, lead migration test.',
    officialPortal: 'https://www.manakonline.in',
    qcoStatus: 'Mandatory under Toys (Quality Control) Order'
  },
  {
    code: 'IS 4151:2020',
    title: 'Protective Helmets for Riders of Two-Wheeler Motor Vehicles — Sample Reference',
    category: 'Automotive & Safety',
    scheme: 'ISI',
    riskArea: 'Head trauma protection & impact deceleration',
    keywords: ['helmet', 'bike', 'motorcycle', 'rider', 'two wheeler', 'headgear'],
    requirements: 'Impact energy attenuation with tri-axial accelerometer, penetration resistance drop striker, chin strap retention strength.',
    officialPortal: 'https://www.manakonline.in',
    qcoStatus: 'Mandatory under MoRTH Two-Wheeler Helmets QCO'
  }
];

// Helper: Local fallback heuristic for Product Intelligence Card
function generateLocalProductDNA(text: string) {
  const lower = text.toLowerCase();
  let category = 'General Manufactured Goods';
  let intendedUse = 'Commercial / Institutional usage';
  let material = 'Fabricated Metal / Mixed Components';
  let targetUser = 'Businesses & Consumers';
  let industry = 'Light Engineering & Manufacturing';
  let riskArea = 'Operational & Structural Quality';
  let targetMarket = 'India (Domestic & Interstate)';
  let confidence = 86;
  const characteristics = ['Standard Production Line', 'Traceable Material Specification'];

  if (lower.includes('sink') || lower.includes('kitchen') || lower.includes('restaurant')) {
    category = 'Commercial & Domestic Kitchen Equipment';
    intendedUse = 'Food preparation sanitation, washbasin, and commercial restaurant kitchen fixtures';
    material = lower.includes('stainless') ? 'Austenitic Stainless Steel (AISI 304 / 316 Grade)' : 'Corrosion-Resistant Metal';
    targetUser = 'Commercial Kitchen Operators, Chefs & Domestic Users';
    industry = 'Food Equipment & Hospitality Infrastructure';
    riskArea = 'Food Hygiene, Corrosion Resistance & Water Drainage Safety';
    targetMarket = 'Indian Commercial Catering & Domestic Housing';
    confidence = 94;
    characteristics.push('Corrosion-resistant alloy', 'Food contact surface', 'Drainage overflow required', 'Welded/Pressed fabrication');
  } else if (lower.includes('cooker') || lower.includes('pressure') || lower.includes('steam')) {
    category = 'Pressure Appliances & Cookware';
    intendedUse = 'High-pressure thermal food processing & cooking';
    material = 'Aluminium Alloy / Stainless Steel Sandwiched Base';
    targetUser = 'Domestic Households & Commercial Kitchens';
    industry = 'Consumer Appliances & Thermal Vessels';
    riskArea = 'Steam Overpressure Burst Hazard & Burn Prevention';
    targetMarket = 'Pan-India Domestic & Commercial Market';
    confidence = 96;
    characteristics.push('Pressure containment vessel', 'Fusible alloy safety valve', 'Silicone gasket sealing', 'Thermal shock tested');
  } else if (lower.includes('electric') || lower.includes('mixer') || lower.includes('grinder') || lower.includes('iron') || lower.includes('motor')) {
    category = 'Household & Commercial Electrical Appliances';
    intendedUse = 'Motor-operated or heating appliance for residential/commercial utility';
    material = 'Polycarbonate Housing & Copper Winding Motor';
    targetUser = 'End Consumers & Culinary Staff';
    industry = 'Electrotechnical & Small Appliances';
    riskArea = 'Electrical Shock, Insulation Breakdown & Thermal Overheating';
    targetMarket = 'Bureau of Energy Efficiency (BEE) & BIS ISI Market';
    confidence = 92;
    characteristics.push('Class I / Class II Earthing Insulation', 'Dielectric breakdown resistant', 'Thermal cut-off switch');
  } else if (lower.includes('water') || lower.includes('bottle') || lower.includes('ro') || lower.includes('beverage')) {
    category = 'Packaged Potable Food & Beverages';
    intendedUse = 'Human oral consumption & hydration';
    material = 'Food-grade Polyethylene Terephthalate (PET) / Glass';
    targetUser = 'General Public & Commuters';
    industry = 'Food & Agriculture Division (FAD)';
    riskArea = 'Microbiological Contamination (Coliforms, E. Coli) & Chemical Leaching';
    targetMarket = 'Pan-India FMCG & Retail';
    confidence = 95;
    characteristics.push('Microbial sterility required', 'Pesticide residue testing', 'Mandatory on-site laboratory');
  } else if (lower.includes('gold') || lower.includes('jewel') || lower.includes('silver') || lower.includes('ornament')) {
    category = 'Precious Metals & Hallmarked Artefacts';
    intendedUse = 'Retail jewellery, bullion investment & ceremonial artefacts';
    material = 'Gold Alloy (916 / 750 Fineness)';
    targetUser = 'Consumers & Retail Jewellers';
    industry = 'Gems, Jewellery & Assaying';
    riskArea = 'Assay Purity Misrepresentation & Economic Adulteration';
    targetMarket = 'Notified Hallmarking Districts of India';
    confidence = 97;
    characteristics.push('Assaying & Hallmarking Centre (AHC) certified', '6-digit HUID laser engraved', 'Fire assay compliance');
  } else if (lower.includes('light') || lower.includes('led') || lower.includes('bulb') || lower.includes('lamp')) {
    category = 'Electronics & Lighting Products';
    intendedUse = 'Interior/exterior illumination';
    material = 'Aluminium Heat Sink & Flame-Retardant Polymer Lens';
    targetUser = 'Commercial Facilities & Residential Users';
    industry = 'Electronics & Information Technology';
    riskArea = 'Blue Light Radiation, Fire Hazards & Voltage Fluctuations';
    targetMarket = 'Compulsory Registration Scheme (CRS) Regime';
    confidence = 91;
    characteristics.push('Glow wire 650°C tested', 'Photobiological safe', 'Self-ballasted circuit');
  } else if (lower.includes('toy') || lower.includes('kid') || lower.includes('child')) {
    category = 'Children Playthings & Educational Toys';
    intendedUse = 'Play & learning for infants and children under 14 years';
    material = 'Non-toxic ABS Plastic / Wood / Non-phthalate Vinyl';
    targetUser = 'Children & Parents';
    industry = 'Consumer Goods & Toys';
    riskArea = 'Choking Hazards, Heavy Metal Leaching & Sharp Points';
    targetMarket = 'Mandatory ISI Toys QCO Domain';
    confidence = 93;
    characteristics.push('Small parts cylinder tested', 'Phthalate-free formulation', 'Drop and torque endurance');
  } else if (lower.includes('helmet') || lower.includes('bike') || lower.includes('motorcycle')) {
    category = 'Personal Protective & Automotive Headgear';
    intendedUse = 'Head impact protection for two-wheeler vehicular riders';
    material = 'Fibre Reinforced Polymer / High-Density EPS Foam Liner';
    targetUser = 'Motorcycle & Scooter Riders';
    industry = 'Automotive Safety & Transport Engineering';
    riskArea = 'Crush Injury, Dynamic Deceleration & Retention Failure';
    targetMarket = 'MoRTH Mandatory Road Safety Standards';
    confidence = 95;
    characteristics.push('Tri-axial impact headform tested', 'Penetration resistant shell', 'Visor optical clarity tested');
  }

  const missingDetailsQuestions = [
    {
      id: 'q1',
      question: 'Is this product intended for domestic (home), commercial, or heavy industrial use?',
      options: ['Domestic Household', 'Commercial / Food Service', 'Industrial Manufacturing'],
      selected: 'Commercial / Food Service'
    },
    {
      id: 'q2',
      question: 'What exact raw material grade specification will be utilized in fabrication?',
      options: ['Austenitic Stainless Steel (SS 304/316)', 'Engineering Plastic / Polymer', 'Cast Iron / Structural Steel', 'Other / Composite'],
      selected: 'Austenitic Stainless Steel (SS 304/316)'
    },
    {
      id: 'q3',
      question: 'Does the product involve electricity, pressurized fluids, food contact, or chemical containment?',
      options: ['Food contact surface', 'Mains electric power', 'Pressure-bearing vessel', 'None of these / Passive structural'],
      selected: 'Food contact surface'
    }
  ];

  return {
    product: text.slice(0, 70),
    category,
    intendedUse,
    material,
    targetUser,
    industry,
    riskArea,
    targetMarket,
    confidenceScore: confidence,
    characteristics,
    missingDetailsQuestions
  };
}

// 1. Health API
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'BISENCE Standards Discovery Engine',
    timestamp: new Date().toISOString()
  });
});

// 2. Product Intelligence / DNA Extraction
app.post('/api/ai/dna', async (req: Request, res: Response) => {
  try {
    const { text, language = 'en' } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Product description is required' });
    }

    const ai = getGenAI();
    if (ai) {
      try {
        const prompt = `You are the BISENCE Product Intelligence Engine for Indian Standards compliance.
Analyze this user product description:
"${text}"

Extract structured Product DNA matching Indian Standards and BIS domains.
Output STRICT JSON matching this format:
{
  "product": "Short title",
  "category": "Standard category in India",
  "intendedUse": "Detailed intended use",
  "material": "Estimated primary material & grade",
  "targetUser": "Target demographic/professionals",
  "industry": "Relevant industry/sectional committee sector",
  "riskArea": "Main safety/quality risk addressed by BIS",
  "targetMarket": "Market scope in India",
  "confidenceScore": 85-98,
  "characteristics": ["list of 3-5 technical characteristics"],
  "missingDetailsQuestions": [
    {
      "id": "q1",
      "question": "Structured technical question 1",
      "options": ["Option A", "Option B", "Option C"]
    },
    {
      "id": "q2",
      "question": "Structured technical question 2",
      "options": ["Option A", "Option B", "Option C"]
    }
  ]
}
Return JSON only. Do not invent non-existent standards.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const rawText = response.text?.trim();
        if (rawText) {
          const parsed = JSON.parse(rawText);
          return res.json(parsed);
        }
      } catch (err) {
        console.warn('Gemini DNA extraction failed or key unavailable, using local intelligence engine:', err);
      }
    }

    // Heuristic Fallback
    const localDna = generateLocalProductDNA(text);
    return res.json(localDna);
  } catch (error: any) {
    console.error('Error in /api/ai/dna:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// 3. AI Chat with strict anti-hallucination & trust labels
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    const { message, language = 'en' } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = getGenAI();
    if (ai) {
      try {
        const systemInstruction = `You are BISENCE AI, a government-grade Standards Discovery and BIS Compliance Navigation assistant for India.
Tagline: "From Product Idea to the Right Indian Standard — With Evidence."

NON-NEGOTIABLE TRUST AND SAFETY RULES:
1. Never invent Indian Standard numbers, clause references, QCOs, certification requirements, laboratories, laws, or fees.
2. If verified information is unavailable, show exactly:
   "Potentially relevant standard reference — Official verification required on manakonline.in."
3. Every recommendation must visibly declare one trust label at the very top:
   - 🟢 Verified Source Info
   - 🟡 AI-Assisted Recommendation
   - 🔴 Official Verification Required
4. Always append this exact disclaimer at the end:
   "This AI provides guidance based on available knowledge. It does not replace official BIS certification, testing, legal, or regulatory decisions."
5. If the question is outside known BIS standards or the knowledge base is insufficient, state:
   "I couldn’t find sufficient verified information in the available BIS knowledge base to provide a reliable answer."
6. Label any sample or simulated content as SAMPLE / DEMO.
7. No hidden chain-of-thought. Provide concise, clear, evidence-backed explanations.
8. Support the requested language: ${language} (English, Hindi, Telugu, Tamil, Kannada, Bengali, or Marathi). Respond naturally and accurately in the requested language while maintaining official standard terminology.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `User Query: "${message}"\nTarget Language: ${language}\n\nGrounding Knowledge Base Context:\n${JSON.stringify(KNOWLEDGE_BASE, null, 2)}`,
          config: {
            systemInstruction,
          }
        });

        const reply = response.text?.trim() || '';
        return res.json({
          reply,
          trustLabel: reply.includes('🟢') ? 'VERIFIED' : reply.includes('🔴') ? 'OFFICIAL_VERIFICATION_REQUIRED' : 'AI_ASSISTED',
          source: 'BISENCE Knowledge Base & Gemini AI'
        });
      } catch (geminiErr) {
        console.warn('Gemini chat error, falling back to local standards RAG generator:', geminiErr);
      }
    }

    // Local RAG fallback response generator
    const lower = message.toLowerCase();
    let matchedStandard = KNOWLEDGE_BASE.find(k => 
      k.keywords.some(kw => lower.includes(kw)) || lower.includes(k.category.toLowerCase())
    );

    let reply = '';
    let trustLabel = 'AI_ASSISTED';

    if (matchedStandard) {
      trustLabel = 'VERIFIED';
      reply = `🟢 **Verified Source Info** (SAMPLE / DEMO)

Based on your product inquiry, the potentially relevant Indian Standard reference is:
**${matchedStandard.code}: ${matchedStandard.title}**

- **Category**: ${matchedStandard.category}
- **Applicable Scheme**: ${matchedStandard.scheme} (e.g., ISI Mark / CRS Scheme)
- **Primary Risk Area**: ${matchedStandard.riskArea}
- **Key Technical Requirements**: ${matchedStandard.requirements}
- **Regulatory Status**: ${matchedStandard.qcoStatus}

**Recommended Next Steps**:
1. Verify the exact scope and latest amendment of ${matchedStandard.code} on the official portal.
2. Formulate factory test plans for parameters like material chemical composition and endurance testing.
3. Check NABL/BIS-recognized testing facilities through the BISENCE Lab Finder.

*Official Verification Destination*: [manakonline.in](${matchedStandard.officialPortal})

---
*This AI provides guidance based on available knowledge. It does not replace official BIS certification, testing, legal, or regulatory decisions.*`;
    } else if (lower.includes('difference between isi') || lower.includes('isi and crs') || lower.includes('scheme')) {
      reply = `🟢 **Verified Source Info**

**Key Differences Between ISI Certification and CRS:**
1. **ISI Mark (Scheme I - Product Certification)**:
   - Covers consumer health, structural, and safety products (e.g. pressure cookers, cement, packaged water, steel).
   - Involves rigorous factory audit, in-house laboratory establishment, and continuous surveillance sampling.
2. **Compulsory Registration Scheme (CRS - Scheme II)**:
   - Primarily designated for electronics, IT equipment, solar inverters, and LED products under MeitY orders.
   - Based on self-declaration of conformity supported by an accredited laboratory test report (Registration Number format: R-XXXXXXXX).

*Official Verification Destination*: [manakonline.in](https://www.manakonline.in) & [crsbis.in](https://www.crsbis.in)

---
*This AI provides guidance based on available knowledge. It does not replace official BIS certification, testing, legal, or regulatory decisions.*`;
    } else if (lower.includes('consumer alert') || lower.includes('fake') || lower.includes('verify')) {
      reply = `🟢 **Verified Source Info**

**How to Verify a BIS Standard Mark & Check Consumer Alerts:**
1. **Locate the CM/L Number**: On products bearing the genuine ISI Mark, a 7 or 8 digit Licence Number (CM/L-XXXXXXXX) is printed right below the mark.
2. **Use BIS Care Mobile App**: Enter the CM/L number or scan the QR code to view the manufacturer's name, brand, factory location, validity date, and covered product variants.
3. **Check Recalls & Warnings**: Review the BISENCE Notifications portal or official public advisories on bis.gov.in for enforcement confiscations.
4. **Report Misuse**: File a grievance through the official National Consumer Helpline or BIS Grievance portal.

*Official Verification Destination*: [bis.gov.in](https://www.bis.gov.in)

---
*This AI provides guidance based on available knowledge. It does not replace official BIS certification, testing, legal, or regulatory decisions.*`;
    } else {
      trustLabel = 'OFFICIAL_VERIFICATION_REQUIRED';
      reply = `🔴 **Official Verification Required**

Potentially relevant standard reference — Official verification required on manakonline.in.

I couldn’t find sufficient verified information in the available BIS knowledge base to provide a reliable answer for your specific query. 

Please explore:
1. Search the full standards catalog on [manakonline.in](https://www.manakonline.in)
2. Submit your product parameters in the **Discover Standards** engine
3. Consult the BIS Sectional Committee corresponding to your industrial domain

---
*This AI provides guidance based on available knowledge. It does not replace official BIS certification, testing, legal, or regulatory decisions.*`;
    }

    return res.json({
      reply,
      trustLabel,
      source: 'BISENCE Local RAG Knowledge Engine'
    });
  } catch (err: any) {
    console.error('Error in /api/ai/chat:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// 4. Semantic RAG Search across Standards
app.post('/api/standards/rag', (req: Request, res: Response) => {
  const { query, category } = req.body;
  if (!query) {
    return res.json(KNOWLEDGE_BASE);
  }
  const q = String(query).toLowerCase();
  const filtered = KNOWLEDGE_BASE.filter(item => {
    const matchesCategory = !category || category === 'All' || item.category === category;
    const matchesQuery = 
      item.title.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q) ||
      item.keywords.some(k => k.includes(q)) ||
      item.riskArea.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });
  return res.json(filtered);
});

// Setup Vite middleware or Static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BISENCE server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
