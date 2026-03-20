// ============================================================
//  /config/client.ts
//  ⚑  SWAP THIS FILE PER CLIENT — nothing else needs to change.
//
//  All business content, colours, and copy lives here.
//  Every section component imports { client } from "@/config/client".
// ============================================================

import { ClientConfig } from "@/types";

export const client: ClientConfig = {
  // ── Identity ──────────────────────────────────────────────
  businessName: "Kowalski & Sons Plumbing Inc.",
  businessNameShort: "Kowalski Plumbing",
  tradeType: "plumbing",
  phone: "(416) 555-0192",
  phoneHref: "tel:+14165550192",
  serviceArea: "Serving Greater Toronto Area",
  logo: "/images/logo.svg",

  // ── SEO ───────────────────────────────────────────────────
  metaTitle: "Kowalski Plumbing | Licensed Toronto Plumber",
  metaDescription:
    "Trusted Toronto plumbers since 1987. Emergency repairs, drain cleaning, water heater installation & more. Licensed & insured. Call (416) 555-0192.",
  siteUrl: "https://kowalskiplumbing.ca",

  // ── Navigation ────────────────────────────────────────────
  navLinks: [
    { label: "Services", href: "/services" },
    { label: "About",    href: "/about"    },
    { label: "Gallery",  href: "/gallery"  },
    { label: "Contact",  href: "/contact"  },
  ],

  // ── Hero ──────────────────────────────────────────────────
  hero: {
    headline:       "Toronto's Most Trusted Plumbers",
    subheadline:
      "Fast, reliable plumbing — emergency service available 24/7 across the GTA. Licensed, insured, and family-owned since 1987.",
    ctaPrimary:      "Call Now",
    ctaPrimaryHref:  "tel:+14165550192",
    ctaSecondary:    "See Our Services",
    ctaSecondaryHref: "#services",
    backgroundImage: "/images/hero.jpg",
  },

  // ── Services ──────────────────────────────────────────────
  //  icon  →  Lucide icon name  (https://lucide.dev/icons)
  services: [
    {
      title:       "Emergency Repairs",
      description: "Burst pipes, severe leaks, or no hot water — we respond within the hour, any time of day or night.",
      icon:        "alarm-clock",
      href:        "/services#emergency",
    },
    {
      title:       "Drain Cleaning",
      description: "Slow drains and blockages cleared fast with hydro-jetting and camera inspection — no mess, no guesswork.",
      icon:        "waves",
      href:        "/services#drains",
    },
    {
      title:       "Water Heater Service",
      description: "Installation, replacement, and repair of tank and tankless water heaters. All major brands serviced.",
      icon:        "flame",
      href:        "/services#water-heaters",
    },
    {
      title:       "Pipe Replacement",
      description: "Whole-home repiping in copper or PEX, with minimal drywall disruption and a 10-year workmanship warranty.",
      icon:        "wrench",
      href:        "/services#repiping",
    },
    {
      title:       "Bathroom Renovations",
      description: "Rough-in, fixtures, and finish plumbing for new builds and full bathroom gut-and-renos.",
      icon:        "bath",
      href:        "/services#bathrooms",
    },
    {
      title:       "Backflow Prevention",
      description: "Certified backflow device testing, installation, and annual City of Toronto reporting.",
      icon:        "shield-check",
      href:        "/services#backflow",
    },
  ],

  // ── About ─────────────────────────────────────────────────
  about: {
    story:
      "Stan Kowalski started this company out of a single van in 1987 with one promise: show up on time and do the job right. " +
      "Three decades later, his sons Mark and Peter carry that same commitment across the GTA — backed by a team of 14 licensed journeymen. " +
      "We've earned a reputation for fair pricing, clean workmanship, and picking up the phone when others don't.",
    foundedYear: 1987,
    teamPhoto: "/images/team.jpg",
    trustBadges: [
      { label: "Licensed Master Plumber",  icon: "badge-check"   },
      { label: "Fully Insured",            icon: "shield"        },
      { label: "TSSA Registered",          icon: "clipboard-list" },
      { label: "10-Year Warranty",         icon: "star"          },
      { label: "24 / 7 Emergency",         icon: "alarm-clock"   },
      { label: "Family Owned Since 1987",  icon: "heart"         },
    ],
  },

  // ── Gallery ───────────────────────────────────────────────
  gallery: [
    {
      src:      "/images/gallery/bathroom-reno-01.jpg",
      alt:      "Complete master bathroom renovation in North York",
      caption:  "Master bath reno — North York, 2024",
      category: "Bathroom",
    },
    {
      src:      "/images/gallery/water-heater-01.jpg",
      alt:      "Tankless water heater installation in Etobicoke",
      caption:  "Navien tankless install — Etobicoke",
      category: "Water Heater",
    },
    {
      src:      "/images/gallery/drain-01.jpg",
      alt:      "Hydro-jet drain cleaning on a commercial property",
      caption:  "Commercial hydro-jet — Downtown Toronto",
      category: "Drains",
    },
    {
      src:      "/images/gallery/repiping-01.jpg",
      alt:      "Full copper repipe in a 1960s Scarborough bungalow",
      caption:  "Full repipe — Scarborough bungalow",
      category: "Repiping",
    },
    {
      src:      "/images/gallery/bathroom-reno-02.jpg",
      alt:      "Ensuite rough-in for new build in Mississauga",
      caption:  "New-build ensuite rough-in — Mississauga",
      category: "Bathroom",
    },
    {
      src:      "/images/gallery/backflow-01.jpg",
      alt:      "Backflow preventer installation on a commercial building",
      caption:  "Backflow device install — Vaughan",
      category: "Backflow",
    },
  ],

  // ── Contact ───────────────────────────────────────────────
  contact: {
    addressLine1:  "842 Weston Road",
    addressLine2:  "Toronto, ON  M6N 3R3",
    // Replace with your real embed URL from Google Maps → Share → Embed
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2885.123456789!2d-79.47!3d43.69!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDQxJzI0LjAiTiA3OcKwMjgnMTIuMCJX!5e0!3m2!1sen!2sca!4v0000000000000",
    hours: [
      { days: "Mon – Fri",  hours: "7:00 am – 6:00 pm" },
      { days: "Saturday",   hours: "8:00 am – 4:00 pm" },
      { days: "Sunday",     hours: "Emergency only"     },
    ],
    replyToEmail: "info@kowalskiplumbing.ca",
  },

  // ── Footer ────────────────────────────────────────────────
  footer: {
    byline:        "Kowalski & Sons Plumbing Inc.",
    licenceNumber: "ON Master Plumber Lic. #P12345",
    socialLinks: [
      {
        platform: "Facebook",
        href:     "https://facebook.com/kowalskiplumbing",
        icon:     "facebook",
      },
      {
        platform: "Google Business",
        href:     "https://g.page/kowalskiplumbing",
        icon:     "map-pin",
      },
      {
        platform: "Houzz",
        href:     "https://houzz.com/pro/kowalskiplumbing",
        icon:     "home",
      },
    ],
  },

  // ── Theme ─────────────────────────────────────────────────
  //  These are injected as CSS custom properties in layout.tsx:
  //    document.documentElement.style.setProperty("--color-primary", client.colors.primary)
  //  Then reference in Tailwind as: bg-[var(--color-primary)]
  colors: {
    primary:    "#1B4FD8", // Bold blue — trust, reliability
    secondary:  "#F59E0B", // Amber — warmth, CTA contrast
    background: "#FFFFFF",
    surface:    "#F8FAFC", // Slate-50 — card / section bg
    text:       "#0F172A", // Slate-900
    textMuted:  "#64748B", // Slate-500
  },
};