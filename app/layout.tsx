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
import localFont from "next/font/local";
import { client } from "@/config/client";
import "@/styles/globals.css";

// ── Fonts ─────────────────────────────────────────────────
// Swap these paths for your actual font files in /public/fonts/
// next/font/local zero-CLS — font CSS is inlined at build time.
const sansFont = localFont({
  src: [
    {
      path: "../public/fonts/sans-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/sans-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/sans-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

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
    <html lang="en" className={sansFont.variable}>
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
