// ============================================================
//  /app/contact/page.tsx
// ============================================================
import type { Metadata } from "next";
import { Navigation } from "@/components/sections/Navigation";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { client } from "@/config/client";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get a free quote from ${client.businessName}. Call ${client.phone} or fill in our contact form — we respond within one hour.`,
};

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
