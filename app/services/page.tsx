// ============================================================
//  /app/services/page.tsx
// ============================================================
import type { Metadata } from "next";
import { Navigation } from "@/components/sections/Navigation";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { client } from "@/config/client";

export const metadata: Metadata = {
  title: "Services",
  description: `${client.businessName} services — ${client.services.map((s) => s.title).join(", ")}. ${client.serviceArea}.`,
};

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <Services />
        {/* Inline contact form so users can book right from the services page */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
