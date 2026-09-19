import { StandardItem } from '../types';

export const SAMPLE_STANDARDS: StandardItem[] = [
  {
    id: 'std-sink',
    code: 'IS 13983:1994 (Sample Ref)',
    title: 'Stainless Steel Sinks for Domestic Purposes — Sample Reference',
    category: 'Kitchen Equipment',
    scheme: 'ISI',
    riskArea: 'Food safety & Material Hygiene',
    keywords: ['kitchen', 'stainless', 'sink', 'steel', 'commercial', 'restaurant', 'basin', 'wash'],
    demoBadge: true,
    relevanceScore: 96,
    trustLabel: 'VERIFIED',
    whyList: [
      'Matches material characteristic: Stainless Steel grade',
      'Intended use aligns with domestic and commercial food prep sanitation',
      'Specifies dimensional tolerances and corrosion-resistant test thresholds'
    ],
    scopeLimitations: 'Covers domestic and commercial pressed and fabricated stainless steel sinks. Does not cover heavy chemical industrial drainage units.',
    sourceReference: 'BIS Indian Standards Catalogue / Sectional Committee MED 32',
    officialUrl: 'https://www.manakonline.in',
    testingParameters: [
      'Chemical composition analysis (Austenitic Stainless Steel 304/316)',
      'Resistance to corrosion (Salt spray test)',
      'Sound deadening material evaluation',
      'Overflow capacity and load deflection'
    ],
    clausesSummary: 'Clause 4 (Materials), Clause 6 (Fabrication & Finish), Clause 8 (Inspection & Testing)'
  },
  {
    id: 'std-pressure-cooker',
    code: 'IS 2347:2017 (Sample Ref)',
    title: 'Pressure Cooker Safety — Sample Reference',
    category: 'Pressure Appliances',
    scheme: 'ISI',
    riskArea: 'Pressure safety & Thermal containment',
    keywords: ['pressure', 'cooker', 'vessel', 'steam', 'cooking', 'safety valve', 'gasket'],
    demoBadge: true,
    relevanceScore: 94,
    trustLabel: 'VERIFIED',
    whyList: [
      'Directly matches domestic and commercial steam pressure cooking vessels',
      'Mandated under the Domestic Pressure Cookers (Quality Control) Order',
      'Regulates burst pressure, fusible plug safety, and operating pressure limits'
    ],
    scopeLimitations: 'Applicable to cookers up to 20-litre capacity. Industrial continuous autoclaves fall under the Indian Boiler Regulations.',
    sourceReference: 'BIS Mechanical Engineering Division / QCO Order No. S.O. 293(E)',
    officialUrl: 'https://www.manakonline.in',
    testingParameters: [
      'Proof pressure testing (minimum 2x operating pressure)',
      'Burst pressure testing (minimum 3x operating pressure)',
      'Safety release device operation test',
      'Thermal shock & handle temperature rise'
    ],
    clausesSummary: 'Clause 5 (Design Requirements), Clause 7 (Safety Devices), Clause 9 (Marking)'
  },
  {
    id: 'std-electrical-safety',
    code: 'IS 302 (Part 1):2008 (Sample Ref)',
    title: 'Electrical Safety for Household Appliances — Sample Reference',
    category: 'Electrical',
    scheme: 'ISI',
    riskArea: 'Electrical safety, Shock hazard & Fire prevention',
    keywords: ['electrical', 'appliance', 'mixer', 'grinder', 'toaster', 'iron', 'heater', 'motor', 'power'],
    demoBadge: true,
    relevanceScore: 92,
    trustLabel: 'VERIFIED',
    whyList: [
      'Matches motorized and heating electrical consumer appliances',
      'Under Electrical Appliances QCO issued by DPIIT',
      'Requires insulation resistance, earth continuity, and protection against live parts'
    ],
    scopeLimitations: 'General requirements for appliances not exceeding 250V single-phase. Specific appliance parts (e.g. Part 2-14 for kitchen machines) apply concurrently.',
    sourceReference: 'BIS Electrotechnical Division ETD 32',
    officialUrl: 'https://www.manakonline.in',
    testingParameters: [
      'High-voltage electric strength test (1500V dielectric test)',
      'Insulation resistance test (> 2 Megaohms)',
      'Leakage current measurement under operating conditions',
      'Creepage distances and electrical clearances'
    ],
    clausesSummary: 'Clause 8 (Protection against electric shock), Clause 13 (Electrical insulation), Clause 19 (Abnormal operation)'
  },
  {
    id: 'std-packaged-water',
    code: 'IS 14543:2024 (Sample Ref)',
    title: 'Packaged Drinking Water (Other than Natural Mineral Water) — Sample Reference',
    category: 'Food & Water',
    scheme: 'ISI',
    riskArea: 'Microbiological safety & Chemical toxicity',
    keywords: ['water', 'drinking', 'packaged', 'bottle', 'mineral', 'ro', 'beverage', 'potable'],
    demoBadge: true,
    relevanceScore: 90,
    trustLabel: 'VERIFIED',
    whyList: [
      'Mandatory ISI Mark certification under Food Safety & Standards (FSSAI) regulations',
      'In-house testing laboratory setup mandatory at bottling plant premises',
      'Strict microbial sterility and heavy metal limits (Lead, Arsenic, Pesticide residues)'
    ],
    scopeLimitations: 'Pertains to packaged potable water; excludes natural springs classified under IS 13428 (Packaged Natural Mineral Water).',
    sourceReference: 'BIS Food and Agriculture Division FAD 14',
    officialUrl: 'https://www.manakonline.in',
    testingParameters: [
      'Microbiological parameters (E. Coli, Salmonella, Coliforms)',
      'Heavy metal limits (PPM scale for Lead, Cadmium, Mercury)',
      'Pesticide residue testing via Gas Chromatography (GC-MS)',
      'Packaging migration limits'
    ],
    clausesSummary: 'Clause 3 (Hygiene requirements), Clause 4 (Physical & Chemical limits), Clause 7 (Marking & Labelling)'
  },
  {
    id: 'std-gold-hallmarking',
    code: 'IS 1417:2016 (Sample Ref)',
    title: 'Gold and Gold Alloys, Jewellery/Artefacts — Fineness and Marking — Sample Reference',
    category: 'Hallmarking',
    scheme: 'HALLMARKING',
    riskArea: 'Consumer economic protection & Precious metal assay purity',
    keywords: ['gold', 'jewellery', 'hallmark', 'huid', 'karat', 'fineness', 'ornament', 'bullion', 'silver'],
    demoBadge: true,
    relevanceScore: 95,
    trustLabel: 'VERIFIED',
    whyList: [
      'Mandatory Hallmarking Order issued under the Bureau of Indian Standards Act',
      'Requires unique 6-digit alphanumeric HUID (Hallmark Unique Identification)',
      'Standardizes caratage/fineness marks: 24K (995), 22K (916), 20K (833), 18K (750), 14K (585), 9K (375)'
    ],
    scopeLimitations: 'Applies to gold jewellery and artefacts sold to consumers in notified hallmarking districts. Excludes export bullion and medical instruments.',
    sourceReference: 'BIS Hallmarking Department / Hallmarking Regulations 2018',
    officialUrl: 'https://www.manakonline.in',
    testingParameters: [
      'Fire Assay testing method (IS 1418)',
      'X-ray Fluorescence (XRF) spectrometry preliminary screening',
      'Laser marking adherence and durability test'
    ],
    clausesSummary: 'Clause 4 (Grades of Gold), Clause 5 (Marking symbols: BIS Logo, Purity mark, 6-digit HUID)'
  },
  {
    id: 'std-led-lighting',
    code: 'IS 16102 (Part 1):2012 (Sample Ref)',
    title: 'Self-Ballasted LED Lamps for General Lighting Services — Sample Reference',
    category: 'Electronics & IT',
    scheme: 'CRS',
    riskArea: 'Electrical safety & Photobiological radiation',
    keywords: ['led', 'lamp', 'bulb', 'light', 'lighting', 'luminaire', 'driver', 'photobiology'],
    demoBadge: true,
    relevanceScore: 89,
    trustLabel: 'VERIFIED',
    whyList: [
      'Mandated under the Compulsory Registration Scheme (CRS) by MeitY / BIS',
      'Requires registration number (R-XXXXXXXX) and standard logo',
      'Focuses on flame-retardant casing, insulation resistance, and blue light hazard'
    ],
    scopeLimitations: 'Applies to AC mains self-ballasted LED lamps. Modular street lights fall under IS 10322 series.',
    sourceReference: 'BIS Compulsory Registration Scheme (CRS) Portal',
    officialUrl: 'https://www.crsbis.in',
    testingParameters: [
      'Glow-wire flammability test (650°C/750°C)',
      'Resistance to humidity and mechanical shock',
      'Photobiological safety (Exempt group/Risk Group 1)',
      'Cap temperature rise under endurance'
    ],
    clausesSummary: 'Clause 6 (Marking requirements), Clause 8 (Interchangeability), Clause 10 (Insulation resistance)'
  },
  {
    id: 'std-toys-safety',
    code: 'IS 9873 (Part 1):2019 (Sample Ref)',
    title: 'Safety of Toys: Mechanical and Physical Properties — Sample Reference',
    category: 'Consumer Products',
    scheme: 'ISI',
    riskArea: 'Child safety, Choking hazard & Sharp edge injury',
    keywords: ['toy', 'children', 'game', 'plastic', 'doll', 'infant', 'choking', 'plush'],
    demoBadge: true,
    relevanceScore: 91,
    trustLabel: 'VERIFIED',
    whyList: [
      'Toys (Quality Control) Order makes ISI certification strictly mandatory for all domestic manufacturers and importers',
      'Tests small parts cylinder to prevent child choking hazards',
      'Mandatory chemical phthalate and heavy metal restrictions under Part 3'
    ],
    scopeLimitations: 'Applicable to products intended for play by children under 14 years. Sports equipment and collectibles are excluded.',
    sourceReference: 'DPIIT Toys QCO / BIS Mechanical Committee PCD 22',
    officialUrl: 'https://www.manakonline.in',
    testingParameters: [
      'Drop test & impact test for small part detachment',
      'Torque and tension testing of component seams',
      'Sharp edge and sharp point electronic sensor tests',
      'Migration of certain heavy elements (Lead, Cadmium)'
    ],
    clausesSummary: 'Clause 4 (General requirements), Clause 5 (Age grading), Clause 8 (Test methods)'
  },
  {
    id: 'std-two-wheeler-helmets',
    code: 'IS 4151:2020 (Sample Ref)',
    title: 'Protective Helmets for Riders of Two-Wheeler Motor Vehicles — Sample Reference',
    category: 'Automotive & Safety',
    scheme: 'ISI',
    riskArea: 'Head trauma protection & Impact deceleration',
    keywords: ['helmet', 'bike', 'motorcycle', 'rider', 'two wheeler', 'headgear', 'visor'],
    demoBadge: true,
    relevanceScore: 93,
    trustLabel: 'VERIFIED',
    whyList: [
      'Mandatory under Ministry of Road Transport & Highways (MoRTH) QCO',
      'Rigorous impact attenuation test across hot, cold, and ambient conditioners',
      'Visor optical clarity, scratch resistance, and peripheral vision angle tests'
    ],
    scopeLimitations: 'Pertains to two-wheeler riders on Indian roads. Industrial hard hats fall under IS 2925.',
    sourceReference: 'MoRTH QCO / BIS Transport Engineering Division TED 28',
    officialUrl: 'https://www.manakonline.in',
    testingParameters: [
      'Impact energy attenuation (Headform accelerometer test)',
      'Retention system dynamic displacement and chin strap strength',
      'Penetration resistance test (Conical drop striker)',
      'Visor light transmission & haze test'
    ],
    clausesSummary: 'Clause 6 (Construction), Clause 8 (Performance requirements), Clause 9 (Identification & Marking)'
  }
];

export const FALLBACK_STANDARD_NOTICE = 
  'Potentially relevant standard reference — Official verification required on manakonline.in.';

export const INSUFFICIENT_KNOWLEDGE_NOTICE = 
  'I couldn’t find sufficient verified information in the available BIS knowledge base to provide a reliable answer.';

export const STANDARD_DISCLAIMER = 
  'This AI provides guidance based on available knowledge. It does not replace official BIS certification, testing, legal, or regulatory decisions.';
