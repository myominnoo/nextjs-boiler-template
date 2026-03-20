// ============================================================
//  /components/sections/Footer.tsx
//  Site footer — nav links, licence number, social icons, copyright.
//  Server component.
// ============================================================

import Link from "next/link";
import Image from "next/image";
import { client } from "@/config/client";
import { DynamicIcon } from "@/components/DynamicIcon";

export function Footer() {
  const { footer } = client;
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[var(--color-text)] text-white"
      aria-label="Site footer"
    >
      {/* ── Main footer content ───────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <Image
                src={client.logo}
                alt={`${client.businessName} logo`}
                width={36}
                height={36}
                className="h-9 w-auto brightness-0 invert" // Invert logo to white
              />
              <span className="text-lg font-bold">
                {client.businessNameShort}
              </span>
            </div>
            <p className="mb-2 max-w-xs text-sm leading-relaxed text-white/60">
              {footer.byline}
            </p>
            <p className="text-xs text-white/40">{footer.licenceNumber}</p>

            {/* Social links */}
            <div className="mt-6 flex gap-3">
              {footer.socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-[var(--color-primary)] hover:text-white"
                >
                  <DynamicIcon name={social.icon} size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation column */}
          <nav aria-label="Footer navigation">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              Navigation
            </h3>
            <ul className="space-y-2.5" role="list">
              {client.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact column */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              Contact
            </h3>
            <ul className="space-y-3" role="list">
              <li>
                <a
                  href={client.phoneHref}
                  className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <DynamicIcon name="phone" size={14} className="shrink-0" />
                  {client.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${client.contact.replyToEmail}`}
                  className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <DynamicIcon name="mail" size={14} className="shrink-0" />
                  {client.contact.replyToEmail}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/70">
                <DynamicIcon
                  name="map-pin"
                  size={14}
                  className="mt-0.5 shrink-0"
                />
                <address className="not-italic">
                  {client.contact.addressLine1}
                  <br />
                  {client.contact.addressLine2}
                </address>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/40 sm:flex-row sm:px-6 lg:px-8">
          <p>
            &copy; {currentYear} {client.businessName}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="hover:text-white/70 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white/70 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
