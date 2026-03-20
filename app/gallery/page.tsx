// ============================================================
//  /app/gallery/page.tsx
// ============================================================
import type { Metadata } from "next";
import { Navigation } from "@/components/sections/Navigation";
import { Gallery } from "@/components/sections/Gallery";
import { Footer } from "@/components/sections/Footer";
import { client } from "@/config/client";

export const metadata: Metadata = {
  title: "Project Gallery",
  description: `Browse completed ${client.tradeType} projects by ${client.businessName} across ${client.serviceArea}.`,
};

export default function GalleryPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
