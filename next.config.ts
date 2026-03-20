// =============================================================
//  next.config.ts
//  Next.js 16 configuration.
//
//  Key decisions:
//   • reactCompiler: true   — React Compiler is stable in Next 16;
//                             auto-memoises components without manual
//                             useMemo / useCallback calls
//   • Turbopack             — default bundler in Next 16 for both
//                             `next dev` and `next build`; no flags needed
//   • images.remotePatterns — lock down next/image to only the origins
//                             you actually serve from; add CDN/CMS domains here
//   • Security headers      — applied to every route via headers()
// =============================================================

import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // ── React Compiler ────────────────────────────────────────
  // Stable in Next.js 16 / React 19.2.
  // Automatically optimises re-renders — remove only if you hit a
  // compiler bug and need to bisect.
  reactCompiler: true,

  // ── Images ────────────────────────────────────────────────
  // List every external hostname you pass to <Image src="https://…" />.
  // Local /public images do not need an entry.
  images: {
    remotePatterns: [
      // Example: if you pull photos from a CMS or S3 bucket
      // {
      //   protocol: "https",
      //   hostname: "images.yourdomain.com",
      //   pathname: "/**",
      // },
    ],
    // Serve modern formats automatically — AVIF first, then WebP
    formats: ["image/avif", "image/webp"],
  },

  // ── Security headers ─────────────────────────────────────
  // Applied globally. Adjust CSP in production once you know all
  // third-party origins (analytics, fonts, maps, etc.).
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            // Tighten per your actual feature usage
            value: "camera=(), microphone=(), geolocation=()",
          },
          // ── Content Security Policy ──────────────────────
          // `unsafe-inline` on style-src is required by Tailwind v4's
          // runtime style injection and the shadcn component library.
          // Tighten once you move to a build-time CSS extraction step.
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",   // Next.js HMR needs unsafe-eval in dev
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",                  // blob: for next/image AVIF
              "font-src 'self'",
              "connect-src 'self' https://api.resend.com",          // Resend API calls from server
              "frame-src 'self' https://www.google.com",            // Google Maps iframe
              "object-src 'none'",
              "base-uri 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },

  // ── Redirects ────────────────────────────────────────────
  // Add permanent 301s here when you rename pages.
  // async redirects() {
  //   return [
  //     { source: "/old-page", destination: "/new-page", permanent: true },
  //   ];
  // },

  // ── TypeScript & ESLint ───────────────────────────────────
  // Keep both true in CI so broken types/lint never ship.
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;