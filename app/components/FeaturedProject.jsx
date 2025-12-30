import Image from "next/image";

export default function FeaturedProject() {
  return (
    <div className="border border-white/10 bg-[#0b0b0b]">
      <div className="grid gap-10 px-6 py-10 md:grid-cols-12 md:gap-12 md:px-12 md:py-14">
        
        {/* LEFT: IMAGE */}
        <div className="md:col-span-7">
          <div className="pt-16 md:pt-20">
            <div className="relative overflow-hidden rounded-sm border border-white/15 bg-black">
              <div className="relative aspect-[16/10] md:aspect-[16/9]">
                <Image
                  src="/images/featured-bg.png"
                  alt="Featured Project Preview"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-contain"
                />
              </div>
            </div>
            <div className="mt-3 flex justify-between text-[11px] uppercase tracking-[0.22em] text-white/40">
              <span>Visual Reference</span>
              <span>Sanitized Preview</span>
            </div>
          </div>
        </div>

        {/* RIGHT: TEXT */}
        <div className="md:col-span-5">
          <div className="pt-6 md:pt-10 md:pl-2">
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">
              Case Study Preview
            </p>

            <h3 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl text-white/90">
              [Administrative Results]
            </h3>

            <p className="mt-3 max-w-xl text-base leading-relaxed text-white/70">
              Lead full-spectrum documentation, from field capture to final delivery. Manage footage, analysis, and archiving under strict controls to ensure clarity without compromising sensitive data.
            </p>

            {/* BRIEF BLOCKS */}
            <div className="mt-6 space-y-3">
              <BriefItem
                label="Objective"
                text="Deliver a high-trust video package that communicates capability and reliability without revealing sensitive details."
              />
              <BriefItem
                label="Constraints"
                text="Tight timelines, limited on-site access, controlled release of information, and strict brand tone requirements."
              />
              <BriefItem
                label="Outcome"
                text='Final assets delivered on schedule with consistent “defense-grade” presentation and clean approval flow.'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BriefItem({ label, text }) {
  return (
    <div className="rounded-sm border border-white/10 bg-black/10 p-4">
      <div className="text-[11px] uppercase tracking-[0.24em] text-white/50">
        {label}
      </div>
      <div className="mt-2 text-sm leading-relaxed text-white/75">
        {text}
      </div>
    </div>
  );
}


