// ============================================================
//  /components/sections/Hero.tsx
//  Above-the-fold section.
//  • Full-viewport background image with dark overlay
//  • Headline + subheadline from client.ts
//  • Two CTA buttons (primary = phone, secondary = services anchor)
//  • Service area badge
//  Server component — no client interactivity needed.
// ============================================================

import Image from "next/image";
import Link from "next/link";
import { client } from "@/config/client";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/DynamicIcon";

export function Hero() {
  const { hero } = client;

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-16"
      aria-label="Hero"
    >
      {/* ── Background image ─────────────────────────────────── */}
      <Image
        src={hero.backgroundImage}
        alt={`${client.businessName} — ${client.serviceArea}`}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        quality={85}
      />

      {/* ── Dark overlay ─────────────────────────────────────── */}
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Service area badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur-sm">
          <DynamicIcon name="map-pin" size={13} />
          {client.serviceArea}
        </div>

        {/* Headline */}
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          {hero.headline}
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
          {hero.subheadline}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {/* Primary — phone call */}
          <Button
            asChild
            size="lg"
            className="w-full bg-[var(--color-primary)] text-white hover:opacity-90 sm:w-auto"
          >
            <a href={hero.ctaPrimaryHref}>
              <DynamicIcon name="phone" size={18} className="mr-2" />
              {hero.ctaPrimary}
            </a>
          </Button>

          {/* Secondary — scroll / navigate */}
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full border-white/50 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 sm:w-auto"
          >
            <Link href={hero.ctaSecondaryHref}>
              {hero.ctaSecondary}
              <DynamicIcon name="chevron-right" size={16} className="ml-1.5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/60"
        aria-hidden="true"
      >
        <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
          <rect
            x="1"
            y="1"
            width="18"
            height="28"
            rx="9"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <rect x="9" y="6" width="2" height="6" rx="1" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}
