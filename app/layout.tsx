// ============================================================
//  /app/layout.tsx
//  Root layout — runs on every page.
//  Responsibilities:
//    • Load self-hosted fonts via next/font/local
//    • Inject client.colors as CSS custom properties
//    • Set base <html> metadata from client.ts
//    • Wrap children in the colour-token-aware <body>
// ============================================================

import type { Metadata, Viewport } from "next";
import { Inter, Geist } from "next/font/google";
import { client } from "@/config/client";
import "@/app/globals.css";
import { cn } from "@/lib/utils";

// ── Fonts ─────────────────────────────────────────────────
// Using Google Fonts during development — no local files needed.
//
// To switch to self-hosted fonts in production:
//   1. Add your woff2 files to /public/fonts/
//   2. Replace this block with next/font/local (see prompt 1C notes)
//
// Good Google Font pairings for trades sites:
//   - Inter (neutral, professional) ← current
//   - DM Sans (friendly, modern)
//   - Plus Jakarta Sans (clean, trustworthy)
const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

// ── Metadata ──────────────────────────────────────────────
// Pulled entirely from client.ts — zero manual editing needed per client.
export const metadata: Metadata = {
  title: {
    default: client.metaTitle,
    template: `%s | ${client.businessNameShort}`,
  },
  description: client.metaDescription,
  metadataBase: new URL(client.siteUrl),
  openGraph: {
    type: "website",
    siteName: client.businessName,
    title: client.metaTitle,
    description: client.metaDescription,
    url: client.siteUrl,
    images: [
      {
        url: "/images/og-image.jpg", // 1200×630 — add to /public/images/
        width: 1200,
        height: 630,
        alt: client.businessName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: client.metaTitle,
    description: client.metaDescription,
  },
  alternates: {
    canonical: client.siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: client.colors.primary,
};

// ── Layout ────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Build the CSS custom property block from client.colors.
  // Applied to :root so every component can reference var(--color-primary) etc.
  const colorVars = `
    :root {
      --color-primary:    ${client.colors.primary};
      --color-secondary:  ${client.colors.secondary};
      --color-background: ${client.colors.background};
      --color-surface:    ${client.colors.surface};
      --color-text:       ${client.colors.text};
      --color-text-muted: ${client.colors.textMuted};
    }
  `;

  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      {/*
        Inline <style> tag is the safest way to inject dynamic CSS vars
        from server data without a runtime JS dependency.
        dangerouslySetInnerHTML is safe here — all values come from
        our own config file, not user input.
      */}
      <head>
        <style dangerouslySetInnerHTML={{ __html: colorVars }} />
      </head>
      <body className="bg-[var(--color-background)] text-[var(--color-text)] antialiased">
        {children}
      </body>
    </html>
  );
}
