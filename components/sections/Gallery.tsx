// ============================================================
//  /components/sections/Gallery.tsx
//  Photo grid with category filter tabs.
//  "use client" — filter state is client-side.
//  Lightbox is left as a TODO comment — drop in any headless
//  library (e.g. yet-another-react-lightbox) without touching
//  the data layer.
// ============================================================

"use client";

import Image from "next/image";
import { useState } from "react";
import { client } from "@/config/client";
import { cn } from "@/lib/utils";

export function Gallery() {
  const { gallery } = client;

  // Build unique category list — "All" is always first
  const categories = [
    "All",
    ...Array.from(new Set(gallery.map((img) => img.category).filter(Boolean))),
  ] as string[];

  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? gallery
      : gallery.filter((img) => img.category === activeCategory);

  return (
    <section
      id="gallery"
      className="bg-[var(--color-surface)] py-20 sm:py-28"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section header ─────────────────────────────────── */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">
            Our Work
          </p>
          <h2
            id="gallery-heading"
            className="text-3xl font-bold text-[var(--color-text)] sm:text-4xl"
          >
            Project Gallery
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[var(--color-text-muted)]">
            A sample of recent jobs across the {client.serviceArea}.
          </p>
        </div>

        {/* ── Category filter tabs ───────────────────────────── */}
        <div
          className="mb-10 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Filter gallery by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                activeCategory === cat
                  ? "border-transparent bg-[var(--color-primary)] text-white"
                  : "border-gray-200 bg-white text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Photo grid ─────────────────────────────────────── */}
        {/*
          TODO: Wrap each item in a lightbox trigger.
          Recommended: yet-another-react-lightbox
            npm i yet-another-react-lightbox
          Then import Lightbox and pass `filtered` as its slides array.
        */}
        <ul
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-live="polite"
          aria-label={`Gallery filtered to: ${activeCategory}`}
        >
          {filtered.map((image, idx) => (
            <li key={image.src} className="group overflow-hidden rounded-xl">
              <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  // Priority for first 3 images (above fold on desktop)
                  priority={idx < 3}
                />
                {/* Caption overlay on hover */}
                {image.caption && (
                  <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-sm text-white transition-transform duration-200 group-hover:translate-y-0">
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            </li>
          ))}
        </ul>

        {/* Empty state — shouldn't happen with real data */}
        {filtered.length === 0 && (
          <p className="py-16 text-center text-sm text-[var(--color-text-muted)]">
            No images in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
