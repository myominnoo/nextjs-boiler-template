// ============================================================
//  /components/sections/About.tsx
//  Two-column layout: story + photo left, trust badges right.
//  Years-in-business calculated from client.about.foundedYear.
//  Server component.
// ============================================================

import Image from "next/image";
import { client } from "@/config/client";
import { DynamicIcon } from "@/components/DynamicIcon";

export function About() {
  const { about, businessName } = client;

  // Calculate dynamically so the copy never goes stale
  const yearsInBusiness = new Date().getFullYear() - about.foundedYear;

  return (
    <section
      id="about"
      className="bg-[var(--color-background)] py-20 sm:py-28"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* ── Left — story + photo ────────────────────────── */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">
              Our Story
            </p>
            <h2
              id="about-heading"
              className="mb-6 text-3xl font-bold text-[var(--color-text)] sm:text-4xl"
            >
              {yearsInBusiness} Years of Trusted Work
            </h2>
            <p className="mb-8 text-base leading-relaxed text-[var(--color-text-muted)]">
              {about.story}
            </p>

            {/* Stats strip */}
            <dl className="mb-10 grid grid-cols-3 gap-4 text-center">
              {[
                { value: `${yearsInBusiness}+`, label: "Years in business" },
                { value: "5,000+", label: "Jobs completed" },
                { value: "4.9 ★", label: "Google rating" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-gray-100 bg-[var(--color-surface)] px-3 py-4"
                >
                  <dt className="mb-1 text-2xl font-bold text-[var(--color-primary)]">
                    {stat.value}
                  </dt>
                  <dd className="text-xs text-[var(--color-text-muted)]">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Team photo — only rendered if path is set in client.ts */}
            {about.teamPhoto && (
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src={about.teamPhoto}
                  alt={`${businessName} team`}
                  width={640}
                  height={380}
                  className="h-64 w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
          </div>

          {/* ── Right — trust badges ────────────────────────── */}
          <div>
            <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">
              Why Choose Us
            </p>
            <ul className="grid gap-4 sm:grid-cols-2" role="list">
              {about.trustBadges.map((badge) => (
                <li
                  key={badge.label}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 bg-[var(--color-surface)] px-4 py-4"
                >
                  {/* Icon circle */}
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${client.colors.primary}15` }}
                    aria-hidden="true"
                  >
                    <DynamicIcon
                      name={badge.icon}
                      size={18}
                      style={{ color: "var(--color-primary)" }}
                    />
                  </span>
                  <span className="text-sm font-medium text-[var(--color-text)]">
                    {badge.label}
                  </span>
                </li>
              ))}
            </ul>

            {/* Phone CTA below badges */}
            <div className="mt-10">
              <p className="mb-4 text-sm text-[var(--color-text-muted)]">
                Ready to book? We answer every call personally.
              </p>
              <a
                href={client.phoneHref}
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <DynamicIcon name="phone" size={15} />
                {client.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
