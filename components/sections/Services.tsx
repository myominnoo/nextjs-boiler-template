// ============================================================
//  /components/sections/Services.tsx
//  Grid of service cards driven entirely by client.services.
//  Server component — no interactivity needed.
// ============================================================

import Link from "next/link";
import { client } from "@/config/client";
import { DynamicIcon } from "@/components/DynamicIcon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function Services() {
  const { services } = client;

  return (
    <section
      id="services"
      className="bg-[var(--color-surface)] py-20 sm:py-28"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section header ─────────────────────────────────── */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">
            What We Do
          </p>
          <h2
            id="services-heading"
            className="text-3xl font-bold text-[var(--color-text)] sm:text-4xl"
          >
            Our Services
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[var(--color-text-muted)]">
            From emergency callouts to full renovations — we handle every aspect
            of {client.tradeType} work across {client.serviceArea}.
          </p>
        </div>

        {/* ── Card grid ──────────────────────────────────────── */}
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {services.map((service) => (
            <li key={service.title}>
              <Card className="group h-full border border-gray-100 bg-[var(--color-background)] shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="pb-3">
                  {/* Icon */}
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${client.colors.primary}15` }}
                    aria-hidden="true"
                  >
                    <DynamicIcon
                      name={service.icon}
                      size={24}
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-[var(--color-text)]">
                    {service.title}
                  </h3>
                </CardHeader>

                <CardContent className="flex flex-col gap-4">
                  {/* Description */}
                  <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {service.description}
                  </p>

                  {/* Optional "Learn more" link */}
                  {service.href && (
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:underline"
                    >
                      Learn more
                      <DynamicIcon name="chevron-right" size={14} />
                    </Link>
                  )}
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>

        {/* ── Bottom CTA ─────────────────────────────────────── */}
        <div className="mt-14 text-center">
          <p className="mb-4 text-sm text-[var(--color-text-muted)]">
            Not sure what you need? Give us a call — we&apos;ll diagnose it for
            free.
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
    </section>
  );
}
