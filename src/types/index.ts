// ═══════════════════════════════════════════════════
// RECONTINUUM HOLDING — TYPE DEFINITIONS
// All company data must conform to these interfaces
// ═══════════════════════════════════════════════════

// ── COMPANY ──────────────────────────────────────
export interface CompanyInfo {
  readonly name: string;
  readonly shortName: string;
  readonly tagline: string;
  readonly description: string;
  readonly cin: string;
  readonly founded: number;
  readonly type: 'Holding Company';
  readonly address: Address;
  readonly contact: ContactInfo;
  readonly website: string;
}

export interface Address {
  readonly street?: string;
  readonly city: string;
  readonly state: string;
  readonly pincode: string;
  readonly country: string;
}

export interface ContactInfo {
  readonly email: string;
  readonly phone: string;
  readonly website: string;
}

// ── FOUNDER ──────────────────────────────────────
export interface Founder {
  readonly name: string;
  readonly title: string;
  readonly role: string;
  readonly bio: string;
  readonly background: string;
  readonly imageAlt: string;
}

// ── PORTFOLIO / SUBSIDIARIES ─────────────────────
export type VentureStage =
  | 'Active Development'
  | 'Operational'
  | 'Pre-Launch'
  | 'Strategic Evaluation';

export type VentureSector =
  | 'Nutraceutical & Wellness'
  | 'Technology'
  | 'Healthcare'
  | 'Finance'
  | 'Real Estate'
  | 'Education';

export interface PortfolioVenture {
  readonly id: string;
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
  readonly sector: VentureSector;
  readonly stage: VentureStage;
  readonly logoAlt: string;
  readonly focusAreas: readonly string[];
  readonly metadata: readonly VentureMetaItem[];
  readonly featured: boolean;
}

export interface VentureMetaItem {
  readonly label: string;
  readonly value: string;
}

// ── SERVICES / CAPABILITIES ───────────────────────
export interface Capability {
  readonly id: string;
  readonly number: string;
  readonly icon: string;
  readonly title: string;
  readonly description: string;
}

// ── BRAND VALUES ──────────────────────────────────
export interface BrandValue {
  readonly name: string;
  readonly description: string;
}

// ── STATS ─────────────────────────────────────────
export interface StatItem {
  readonly value: string;
  readonly label: string;
  readonly sublabel: string;
}

// ── NAV ───────────────────────────────────────────
export interface NavLink {
  readonly label: string;
  readonly href: string;
}

// ── SEO ───────────────────────────────────────────
export interface SEOMeta {
  readonly title: string;
  readonly description: string;
  readonly keywords: string;
  readonly ogTitle?: string;
  readonly ogDescription?: string;
  readonly ogImage?: string;
  readonly twitterCard?: 'summary' | 'summary_large_image';
  readonly canonical?: string;
}

// ── CHATBOT ───────────────────────────────────────
export interface ChatMessage {
  readonly id: string;
  readonly role: 'bot' | 'user';
  readonly content: string;
  readonly timestamp: Date;
}

export type KnowledgeCategory =
  | 'greetings'
  | 'about'
  | 'founder'
  | 'rajmeric'
  | 'services'
  | 'contact'
  | 'portfolio'
  | 'vision'
  | 'cin'
  | 'website'
  | 'thanks'
  | 'bye';

export interface KnowledgeEntry {
  readonly triggers: readonly string[];
  readonly answer: () => string;
}

export type KnowledgeBase = Record<KnowledgeCategory, KnowledgeEntry>;

// ── CONTACT FORM ──────────────────────────────────
export type EnquiryType =
  | 'Business Partnership'
  | 'Strategic Collaboration'
  | 'Investment Inquiry'
  | 'Life Sciences / Rajmeric'
  | 'General Enquiry';

export interface ContactFormData {
  fullName: string;
  organisation?: string;
  email: string;
  enquiryType: EnquiryType | '';
  message?: string;
}
