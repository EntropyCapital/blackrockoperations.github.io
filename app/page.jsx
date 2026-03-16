import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import FeaturedProject from "./components/FeaturedProject";
import ClientLogos from "./components/ClientLogos";
import CtaSection from "./components/CtaSection";
import SectionSlate from "./components/SectionSlate";

export default function Home() {
  return (
    <main className="bg-[#050505] text-white">
      <Hero />

      {/* SECTION 01: FLUSH START */}
      <section
        id="operations"
        className="mx-auto max-w-7xl px-6 pt-12 pb-20 md:pt-16 md:pb-28"
      >
        <SectionSlate
          section="REF"
          number="01"
          title="Technical Domains"
          meta="CLASSIFICATION: UNCLASSIFIED // FOUO"
        />
        <div className="mt-10">
          <Philosophy />
        </div>
      </section>

      {/* SECTION 02 */}
      <section
        id="archive"
        className="mx-auto max-w-7xl px-6 pt-20 pb-20 md:pt-28 md:pb-28 border-t border-white/[0.03]"
      >
        <SectionSlate
          section="REF"
          number="02"
          title="Field Documentation"
          meta="LOG_TYPE: ACTIVE_RECOVERY"
        />
        <div className="mt-10">
          <FeaturedProject />
        </div>
      </section>

      {/* SECTION 03 */}
      <section
        id="sectors"
        className="mx-auto max-w-7xl px-6 pt-20 pb-20 md:pt-28 md:pb-28 border-t border-white/[0.03]"
      >
        <SectionSlate
          section="REF"
          number="03"
          title="Strategic Sectors"
          meta="DISTRIBUTION: CONTROLLED"
          align="left"
        />
        <div className="mt-10">
          <ClientLogos />
        </div>
      </section>

      {/* SECTION 04 */}
      <section
        id="intake"
        className="mx-auto max-w-7xl px-6 pt-20 pb-20 md:pt-28 md:pb-28 border-t border-white/[0.03]"
      >
        <SectionSlate
          section="REF"
          number="04"
          title="Inquiry Protocol"
          meta="STATUS: SECURE_LINE_OPEN"
          align="left"
        />
        <div className="mt-10">
          <CtaSection />
        </div>
      </section>
    </main>
  );
}
