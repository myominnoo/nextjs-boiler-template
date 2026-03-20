// ============================================================
//  /components/sections/Contact.tsx
//  Contact form + business hours + map embed.
//  "use client" — form state and submission handling.
//
//  On submit: POST to /app/api/contact/route.ts which sends
//  the email via Resend. No third-party form library required.
// ============================================================

"use client";

import { useState } from "react";
import { client } from "@/config/client";
import { DynamicIcon } from "@/components/DynamicIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────
type FormState = "idle" | "submitting" | "success" | "error";

interface FormFields {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const EMPTY_FIELDS: FormFields = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

// ── Component ─────────────────────────────────────────────
export function Contact() {
  const { contact } = client;

  const [fields, setFields] = useState<FormFields>(EMPTY_FIELDS);
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Generic field updater — avoids a handler per input
  const set =
    (key: keyof FormFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data?.error ?? "Something went wrong. Please try again.",
        );
      }

      setState("success");
      setFields(EMPTY_FIELDS);
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Unexpected error.");
    }
  };

  return (
    <section
      id="contact"
      className="bg-[var(--color-background)] py-20 sm:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section header ─────────────────────────────────── */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">
            Get In Touch
          </p>
          <h2
            id="contact-heading"
            className="text-3xl font-bold text-[var(--color-text)] sm:text-4xl"
          >
            Request a Free Quote
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[var(--color-text-muted)]">
            Fill in the form and we&apos;ll get back to you within one business
            hour. Prefer to talk? Call us directly at{" "}
            <a
              href={client.phoneHref}
              className="font-medium text-[var(--color-primary)] hover:underline"
            >
              {client.phone}
            </a>
            .
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* ── Form (3/5 width on desktop) ──────────────────── */}
          <div className="lg:col-span-3">
            {state === "success" ? (
              /* Success state */
              <div className="flex flex-col items-center rounded-2xl border border-green-100 bg-green-50 px-8 py-16 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                  <DynamicIcon
                    name="badge-check"
                    size={28}
                    className="text-green-600"
                  />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-[var(--color-text)]">
                  Message sent!
                </h3>
                <p className="mb-6 text-sm text-[var(--color-text-muted)]">
                  We&apos;ll be in touch shortly. For urgent issues, please call
                  us directly.
                </p>
                <button
                  type="button"
                  onClick={() => setState("idle")}
                  className="text-sm font-medium text-[var(--color-primary)] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              /* Form */
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5 rounded-2xl border border-gray-100 bg-[var(--color-surface)] p-6 sm:p-8"
                aria-label="Contact form"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={fields.name}
                      onChange={set("name")}
                      placeholder="Jane Smith"
                      disabled={state === "submitting"}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={fields.phone}
                      onChange={set("phone")}
                      placeholder="(416) 555-0100"
                      disabled={state === "submitting"}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email">Email address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={fields.email}
                    onChange={set("email")}
                    placeholder="jane@example.com"
                    disabled={state === "submitting"}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message">Describe the job *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={fields.message}
                    onChange={set("message")}
                    placeholder="E.g. Leaking pipe under kitchen sink — need someone ASAP…"
                    disabled={state === "submitting"}
                  />
                </div>

                {/* Error message */}
                {state === "error" && (
                  <p role="alert" className="text-sm text-red-600">
                    {errorMsg}
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[var(--color-primary)] text-white hover:opacity-90"
                  disabled={state === "submitting"}
                >
                  {state === "submitting" ? "Sending…" : "Send Message"}
                </Button>

                <p className="text-center text-xs text-[var(--color-text-muted)]">
                  We never share your information. See our privacy policy.
                </p>
              </form>
            )}
          </div>

          {/* ── Sidebar — hours + address (2/5 width) ──────────── */}
          <aside className="flex flex-col gap-8 lg:col-span-2">
            {/* Address */}
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">
                <DynamicIcon name="map-pin" size={14} />
                Address
              </h3>
              <address className="not-italic text-sm leading-relaxed text-[var(--color-text-muted)]">
                {contact.addressLine1}
                <br />
                {contact.addressLine2}
              </address>
            </div>

            {/* Phone */}
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">
                <DynamicIcon name="phone" size={14} />
                Phone
              </h3>
              <a
                href={client.phoneHref}
                className="text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary)]"
              >
                {client.phone}
              </a>
            </div>

            {/* Hours */}
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">
                <DynamicIcon name="clock" size={14} />
                Hours
              </h3>
              <dl className="space-y-1.5">
                {contact.hours.map((entry) => (
                  <div
                    key={entry.days}
                    className="flex justify-between text-sm"
                  >
                    <dt className="text-[var(--color-text)]">{entry.days}</dt>
                    <dd className="text-[var(--color-text-muted)]">
                      {entry.hours}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Map embed */}
            <div className="overflow-hidden rounded-xl border border-gray-100">
              <iframe
                src={contact.mapsEmbedUrl}
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map showing ${client.businessName} location`}
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
