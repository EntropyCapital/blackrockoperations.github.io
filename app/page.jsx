import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import FeaturedProject from "./components/FeaturedProject";
import ClientLogos from "./components/ClientLogos";
import CtaSection from "./components/CtaSection";
import SectionSlate from "./components/SectionSlate";

export default function Home() {
  return (
    <main className="bg-[#101010] text-white">
      <Hero />

      {/* SECTION 01 */}
      <section
        id="capabilities"
        className="mx-auto max-w-7xl px-6 pt-20 pb-0 md:pt-28 md:pb-0"
      >
        <SectionSlate
          section="SECTION"
          number="01"
          title="Capabilities"
          meta="REV 1.0 // UPDATED 2025-12-26"
        />
        <div className="mt-10">
          <Philosophy />
        </div>
      </section>

      {/* SECTION 02 */}
      <section
        id="featured"
        className="mx-auto max-w-7xl px-6 pt-20 pb-0 md:pt-28 md:pb-0"
      >
        <SectionSlate
          section="SECTION"
          number="02"
          title="Featured"
          meta="REV 1.0 // UPDATED 2025-12-26"
        />
        <div className="mt-10">
          <FeaturedProject />
        </div>
      </section>

      {/* SECTION 03 */}
      <section
        id="clients"
        className="mx-auto max-w-7xl px-6 pt-20 pb-0 md:pt-28 md:pb-0"
      >
        <SectionSlate
          section="SECTION"
          number="03"
          title="Clients"
          meta="REV 1.0 // UPDATED 2025-12-26"
          align="left"
        />
        <div className="mt-10">
          <ClientLogos />
        </div>
      </section>

      {/* SECTION 04 */}
      <section
        id="contact"
        className="mx-auto max-w-7xl px-6 pt-20 pb-0 md:pt-28 md:pb-0"
      >
        <SectionSlate
          section="SECTION"
          number="04"
          title="Contact"
          meta="REV 1.0 // UPDATED 2025-12-26"
          align="left"
        />
        <div className="mt-10">
          <CtaSection />
        </div>
      </section>
    </main>
  );
}
