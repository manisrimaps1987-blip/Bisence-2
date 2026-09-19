export type LanguageCode = 'en' | 'hi' | 'te' | 'ta' | 'kn' | 'bn' | 'mr';

export type TrustLevel = 'VERIFIED' | 'AI_ASSISTED' | 'OFFICIAL_VERIFICATION_REQUIRED';

export type UserRole = 'MANUFACTURER' | 'CONSUMER' | 'LABORATORY' | 'JEWELLER' | 'STUDENT';

export interface StandardItem {
  id: string;
  code: string;
  title: string;
  category: string;
  scheme: 'ISI' | 'CRS' | 'FMCS' | 'HALLMARKING' | 'VOLUNTARY';
  riskArea: string;
  keywords: string[];
  demoBadge: boolean;
  relevanceScore: number;
  trustLabel: TrustLevel;
  whyList: string[];
  scopeLimitations: string;
  sourceReference: string;
  officialUrl: string;
  testingParameters: string[];
  clausesSummary: string;
  isQcoMandatory?: boolean;
  year?: string;
  scope?: string;
  sectionalCommittee?: string;
}

export interface ProductIntelligence {
  product: string;
  category: string;
  intendedUse: string;
  material: string;
  targetUser: string;
  industry: string;
  riskArea: string;
  targetMarket: string;
  confidenceScore: number;
  characteristics: string[];
  missingDetailsQuestions?: {
    id: string;
    question: string;
    options: string[];
    selected?: string;
  }[];
}

export interface ComplianceStep {
  stepNumber: number;
  title: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING' | 'CRITICAL';
  inputsRequired: string[];
  userAction: string;
  officialPortalLink: string;
  readinessLevel: string;
  nextAction: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  category: 'Standards Updates' | 'Quality Control Orders' | 'Product Certification' | 'Hallmarking' | 'Public Alerts & Recalls' | 'Training & Events' | 'Tenders & Announcements' | 'Consumer Notices';
  publishedDate: string;
  status: 'New' | 'Updated' | 'Archived';
  summary: string;
  sourceBadge: string;
  officialSourceLink: string;
  isImportant?: boolean;
  relevantStandards?: string[];
  pdfUrl?: string;
}

export interface LabItem {
  id: string;
  name: string;
  region: string;
  discipline?: string;
  disciplines?: string[];
  scope?: string;
  applicableStandards?: string[];
  accreditationNumber?: string;
  officialLimsUrl?: string;
  contactPhone?: string;
  city?: string;
  state?: string;
  trustLabel: TrustLevel;
  address: string;
  contactEmail: string;
  officialLink?: string;
}

export interface ProductWorkspaceItem {
  id: string;
  product: string;
  category: string;
  dnaConfidence: number;
  relevantStandards: string;
  complianceStage: 'Discovery' | 'Testing Preparation' | 'Lab Testing' | 'Application Submitted' | 'Certified';
  openActions: number;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  trustLabel?: TrustLevel;
  sourceLink?: string;
  language?: LanguageCode;
  feedback?: 'yes' | 'no';
  feedbackReason?: string;
}
