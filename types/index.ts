// ============================================================
//  /types/index.ts
//  Shared TypeScript interfaces for the trades business template.
//  Import from here in config/client.ts and all section components.
// ============================================================

// ------------------------------------------------------------
//  Primitives
// ------------------------------------------------------------

/** A single navigation link in the top nav or footer. */
export interface NavLink {
  label: string;
  href: string;
}

/** One service offered by the business. */
export interface Service {
  /** Short title shown on the card, e.g. "Emergency Repairs" */
  title: string;
  /** 1–2 sentence description shown below the title */
  description: string;
  /**
   * Lucide icon name (string) used to render the icon.
   * Must match a valid export from the `lucide-react` package.
   * See https://lucide.dev/icons for the full list.
   * Example: "wrench" | "zap" | "flame" | "droplets"
   */
  icon: string;
  /** Optional link to a dedicated service detail page */
  href?: string;
}

/** One image in the project gallery. */
export interface GalleryImage {
  /** Path relative to /public, e.g. "/images/gallery/job-01.jpg" */
  src: string;
  /** Alt text for accessibility and SEO */
  alt: string;
  /** Optional caption shown in the lightbox */
  caption?: string;
  /** Optional category tag for filtering, e.g. "Bathroom" | "Commercial" */
  category?: string;
}

/** A trust badge / credential shown in the About section. */
export interface TrustBadge {
  /** Short label, e.g. "Licensed & Insured" */
  label: string;
  /** Lucide icon name, e.g. "shield-check" */
  icon: string;
}

/** Social media profile link. */
export interface SocialLink {
  /** Platform name for aria-label, e.g. "Facebook" */
  platform: string;
  /** Full URL, e.g. "https://facebook.com/acmeplumbing" */
  href: string;
  /** Lucide icon name, e.g. "facebook" */
  icon: string;
}

/** Business operating hours for a single day or range of days. */
export interface HoursEntry {
  /** Day label, e.g. "Mon – Fri" | "Saturday" | "Sunday" */
  days: string;
  /** Hours string, e.g. "7:00 am – 6:00 pm" | "Closed" */
  hours: string;
}

// ------------------------------------------------------------
//  Section-level config blocks
//  Each maps to one section component under /components/sections/
// ------------------------------------------------------------

export interface HeroConfig {
  /** Main headline, e.g. "Toronto's Most Trusted Plumbers" */
  headline: string;
  /** Supporting subheadline */
  subheadline: string;
  /** Primary CTA button label */
  ctaPrimary: string;
  /** Primary CTA href — typically "#contact" or "/contact" */
  ctaPrimaryHref: string;
  /** Secondary CTA button label */
  ctaSecondary: string;
  /** Secondary CTA href — typically "#services" or "/services" */
  ctaSecondaryHref: string;
  /** Path to hero background image relative to /public */
  backgroundImage: string;
}

export interface AboutConfig {
  /** Short company story — 2–4 sentences rendered as a paragraph */
  story: string;
  /** Year the company was founded — used to calculate years in business */
  foundedYear: number;
  /** Optional path to owner / team photo relative to /public */
  teamPhoto?: string;
  /** List of trust badges rendered as icon + label chips */
  trustBadges: TrustBadge[];
}

export interface ContactConfig {
  /** Street address line 1 */
  addressLine1: string;
  /** City, Province, Postal Code */
  addressLine2: string;
  /** Embed-friendly Google Maps URL (iframe src) */
  mapsEmbedUrl: string;
  /** Operating hours displayed beside the form */
  hours: HoursEntry[];
  /** Email address used as Reply-To in Resend emails */
  replyToEmail: string;
}

export interface FooterConfig {
  /** Short tagline or registered business name for the footer byline */
  byline: string;
  /** Trades licence number displayed in the footer */
  licenceNumber: string;
  /** Social profile links */
  socialLinks: SocialLink[];
}

// ------------------------------------------------------------
//  Theming
// ------------------------------------------------------------

/**
 * Brand colour palette.
 * Use full hex values — these are injected as CSS custom properties
 * via globals.css so Tailwind arbitrary values can reference them.
 *
 * Convention:
 *   primary   — main brand colour (buttons, active states)
 *   secondary — accent / hover states
 *   background — page background (usually #ffffff for light mode)
 *   surface    — card / section background
 *   text       — body text
 *   textMuted  — secondary / muted text
 */
export interface BrandColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
}

// ------------------------------------------------------------
//  Root config — the single object you import everywhere
// ------------------------------------------------------------

export interface ClientConfig {
  // ── Identity ──────────────────────────────────────────────
  /** Full legal / trading name, e.g. "Kowalski & Sons Plumbing Inc." */
  businessName: string;
  /** Short version used in tight spaces, e.g. "Kowalski Plumbing" */
  businessNameShort: string;
  /**
   * Trade type — drives default icon choices and meta copy.
   * Extend the union as needed.
   */
  tradeType: 'plumbing' | 'electrical' | 'hvac' | 'general';
  /** Primary phone number — formatted for display, e.g. "(416) 555-0192" */
  phone: string;
  /** Canonical href for the phone CTA, e.g. "tel:+14165550192" */
  phoneHref: string;
  /** Primary service area tagline, e.g. "Serving Greater Toronto Area" */
  serviceArea: string;
  /** Path to SVG or PNG logo relative to /public, e.g. "/images/logo.svg" */
  logo: string;

  // ── SEO ───────────────────────────────────────────────────
  /** <title> and og:title base, e.g. "Kowalski Plumbing | Toronto Plumber" */
  metaTitle: string;
  /** <meta name="description"> */
  metaDescription: string;
  /** Canonical site URL without trailing slash, e.g. "https://kowalskiplumbing.ca" */
  siteUrl: string;

  // ── Sections ──────────────────────────────────────────────
  hero: HeroConfig;
  /** Array of service cards rendered in the Services section */
  services: Service[];
  about: AboutConfig;
  /** Array of images rendered in the Gallery section */
  gallery: GalleryImage[];
  contact: ContactConfig;
  footer: FooterConfig;

  // ── Navigation ────────────────────────────────────────────
  /** Top-nav links rendered by the Navigation component */
  navLinks: NavLink[];

  // ── Theme ─────────────────────────────────────────────────
  colors: BrandColors;
}