// ============================================================
//  /app/about/page.tsx
// ============================================================
import type { Metadata } from "next";
import { Navigation } from "@/components/sections/Navigation";
import { About } from "@/components/sections/About";
import { Footer } from "@/components/sections/Footer";
import { client } from "@/config/client";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${client.businessName} — ${client.serviceArea}. Our story, team, and credentials.`,
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <About />
      </main>
      <Footer />
    </>
  );
}
