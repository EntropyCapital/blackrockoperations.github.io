/**
 * Strategic Sectors (formerly ClientLogos)
 * Clinical categorization of operational environments.
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
    <div className="border border-white/10 bg-[#050505] w-full">
      <div className="px-6 py-10 md:px-12 md:py-14">
        
        {/* Institutional Trust Signal */}
        <div className="max-w-3xl mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
            Protocol // Sector_Engagement
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/50 max-w-2xl">
            Blackrock Operations provides strategic support for organizations within 
            controlled, high-trust environments. All engagements are governed by 
            strict disclosure standards and non-disclosure protocols.
          </p>
        </div>

        {/* Sectors Grid: Matching the Domain 1px Grid */}
        <div className="grid gap-px bg-white/10 border border-white/10 md:grid-cols-3">
          {sectors.map((sector) => (
            <div
              key={sector.id}
              className="group bg-[#050505] p-6 transition-colors duration-500 hover:bg-white/[0.02]"
            >
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                   <span className="font-mono text-[9px] text-white/20 tracking-widest">
                     ID // {sector.id}
                   </span>
                   {/* Status Indicator */}
                   <div className="h-1 w-1 bg-white/10 group-hover:bg-emerald-500/40 transition-colors" />
                </div>
                
                <h4 className="text-sm font-medium tracking-widest text-white uppercase italic">
                  {sector.title}
                </h4>

                <p className="text-xs leading-relaxed text-white/40 font-light min-h-[60px]">
                  {sector.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.03]">
                 <span className="font-mono text-[8px] text-white/10 uppercase tracking-[0.3em]">
                   Clearance_Req: LEVEL_2
                 </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note: Re-emphasizing the "Black Box" nature */}
        <div className="mt-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/5" />
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/20 whitespace-nowrap">
            Specific engagements are not publicly listed // NDA-PROTECTED
          </p>
          <div className="h-px flex-1 bg-white/5" />
        </div>
      </div>
    </div>
  );
}
