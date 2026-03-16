/**
 * Strategic Sectors (REF 02)
 * Designed to match the 'Domains' grid exactly.
 */
export default function ClientLogos() {
  const sectors = [
    {
      id: "SEC_01",
      title: "Defense & Aerospace",
      description:
        "Support for organizations operating under strict compliance, ITAR/EAR security protocols, and rigid review constraints.",
    },
    {
      id: "SEC_02",
      title: "Advanced R&D Systems",
      description:
        "Documentation and media integration for sensitive laboratory research, rapid prototyping, and experimental testing programs.",
    },
    {
      id: "SEC_03",
      title: "Institutional Infrastructure",
      description:
        "Work aligned with public-sector standards, controlled disclosures, and high-trust formal approval chains.",
    },
  ];

  return (
    <div className="w-full">
      {/* The Grid: Matching Technical Domains 1:1 */}
      <div className="grid gap-px bg-white/10 border border-white/10 md:grid-cols-3">
        {sectors.map((sector) => (
          <div
            key={sector.id}
            className="group bg-[#050505] p-8 flex flex-col justify-between min-h-[280px] transition-colors duration-500 hover:bg-[#080808]"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-[10px] text-white/20 tracking-tighter uppercase">
                  REF_ID // {sector.id}
                </span>
                <div className="h-1 w-1 bg-white/10 group-hover:bg-emerald-500/40 transition-colors" />
              </div>
              
              <h4 className="text-lg font-medium tracking-widest text-white uppercase mb-4">
                {sector.title}
              </h4>

              <p className="text-sm leading-relaxed text-white/40 font-light max-w-[260px]">
                {sector.description}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.03]">
              <p className="font-mono text-[8px] text-white/10 uppercase tracking-[0.3em]">
                Status // Active_Engagement
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Simplified Mobile-Safe Footer Note */}
      <div className="mt-8 px-2">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20 text-center md:text-left">
          Specific engagements are not publicly listed // NDA-PROTECTED
        </p>
      </div>
    </div>
  );
}
