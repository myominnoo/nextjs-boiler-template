// ============================================================
//  /components/sections/Navigation.tsx
//  Sticky top navigation.
//  • Logo + business name left
//  • Nav links centre
//  • Phone CTA button right
//  • Hamburger menu for mobile (< md)
//  "use client" — needed for mobile menu open/close state
// ============================================================

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { client } from "@/config/client";
import { DynamicIcon } from "@/components/DynamicIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add a shadow when the user scrolls past the hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change (user clicked a link)
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-shadow duration-200",
        "bg-[var(--color-background)]",
        scrolled && "shadow-md",
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* ── Logo ────────────────────────────────────────── */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          onClick={closeMenu}
        >
          <Image
            src={client.logo}
            alt={`${client.businessName} logo`}
            width={40}
            height={40}
            className="h-10 w-auto"
            priority
          />
          <span
            className="hidden text-lg font-bold sm:block"
            style={{ color: "var(--color-text)" }}
          >
            {client.businessNameShort}
          </span>
        </Link>

        {/* ── Desktop nav links ────────────────────────────── */}
        <ul className="hidden items-center gap-8 md:flex" role="list">
          {client.navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Desktop CTA ──────────────────────────────────── */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            asChild
            size="sm"
            className="bg-[var(--color-primary)] text-white hover:opacity-90"
          >
            <a href={client.phoneHref}>
              <DynamicIcon name="phone" size={15} className="mr-1.5" />
              {client.phone}
            </a>
          </Button>
        </div>

        {/* ── Mobile hamburger ─────────────────────────────── */}
        <button
          type="button"
          className="flex items-center justify-center rounded-md p-2 text-[var(--color-text-muted)] md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <DynamicIcon name={menuOpen ? "x" : "menu"} size={22} />
        </button>
      </nav>

      {/* ── Mobile drawer ────────────────────────────────────── */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-gray-100 bg-[var(--color-background)] px-4 pb-6 pt-4 md:hidden"
        >
          <ul className="flex flex-col gap-4" role="list">
            {client.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-base font-medium text-[var(--color-text)] hover:text-[var(--color-primary)]"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href={client.phoneHref}
            className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-3 text-base font-semibold text-white"
            onClick={closeMenu}
          >
            <DynamicIcon name="phone" size={16} />
            {client.phone}
          </a>
        </div>
      )}
    </header>
  );
}
