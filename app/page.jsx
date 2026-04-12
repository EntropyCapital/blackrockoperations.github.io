import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import ClientLogos from "./components/ClientLogos";
import CtaSection from "./components/CtaSection";
import SectionSlate from "./components/SectionSlate";
import Reveal from "./components/Reveal";

export default function Home() {
  return (
    <main className="bg-[#050505] text-white">
      <Hero />

      {/* SECTION 01: TECHNICAL DOMAINS */}
      <section
        id="operations"
        className="mx-auto max-w-7xl border-t border-white/[0.03] px-6 pt-12 pb-10 md:pt-16 md:pb-14"
      >
        <Reveal>
          <SectionSlate
            section="REF"
            number="01"
            title="Technical Domains"
            meta="CLASSIFICATION: UNCLASSIFIED // FOUO"
          />
        </Reveal>

        <Reveal delay={120} y={28}>
          <div className="mt-10">
            <Philosophy />
          </div>
        </Reveal>
      </section>

      {/* SECTION 02: STRATEGIC SECTORS */}
      <section
        id="sectors"
        className="mx-auto max-w-7xl border-t border-white/[0.03] px-6 pt-10 pb-10 md:pt-14 md:pb-14"
      >
        <Reveal>
          <SectionSlate
            section="REF"
            number="02"
            title="Strategic Sectors"
            meta="DISTRIBUTION: CONTROLLED"
            align="left"
          />
        </Reveal>

        <Reveal delay={120} y={28}>
          <div className="mt-10">
            <ClientLogos />
          </div>
        </Reveal>
      </section>

      {/* SECTION 03: INQUIRY PROTOCOL */}
      <section
        id="intake"
        className="mx-auto max-w-7xl border-t border-white/[0.03] px-6 pt-10 pb-10 md:pt-14 md:pb-14"
      >
        <Reveal>
          <SectionSlate
            section="REF"
            number="03"
            title="Inquiry Protocol"
            meta="STATUS: SECURE_LINE_OPEN"
            align="left"
          />
        </Reveal>

        <Reveal delay={120} y={28}>
          <div className="mt-10">
            <CtaSection />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
