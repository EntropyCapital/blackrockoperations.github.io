"use client";

export default function Domains() {
  const domains = [
    {
      id: "01",
      title: "Signal Acquisition",
      desc: "High-fidelity sensor integration and multi-spectral visual data capture in electromagnetically contested environments.",
      status: "OPERATIONAL"
    },
    {
      id: "02",
      title: "Narrative Engineering",
      desc: "Strategic development of informational frameworks to ensure mission-concordant messaging across institutional stakeholders.",
      status: "ACTIVE"
    },
    {
      id: "03",
      title: "Asset Archival",
      desc: "Tier-4 secure storage protocols and long-term retention of sensitive multi-format data assets.",
      status: "ENCRYPTED"
    }
  ];

  return (
    <section className="w-full bg-[#050505] py-12 md:py-24">
      <div className="container mx-auto px-6">
        
        {/* Classification Header */}
        <div className="mb-12 border-l-2 border-white/20 pl-4">
          <p className="font-mono text-[10px] tracking-[0.4em] text-white/30 uppercase mb-2">
            Section 01 // Technical Domains
          </p>
          <h2 className="text-2xl md:text-4xl font-light tracking-tight text-white uppercase">
            Operational Scope
          </h2>
        </div>

        {/* The "Database" Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {domains.map((item) => (
            <div key={item.id} className="bg-[#050505] p-8 flex flex-col justify-between min-h-[280px]">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-[10px] text-white/20">REF_{item.id}</span>
                  <span className="text-[9px] font-mono px-2 py-0.5 border border-emerald-500/30 text-emerald-500/70 bg-emerald-500/5">
                    {item.status}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-white mb-4 uppercase tracking-wider">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/40 font-light">
                  {item.desc}
                </p>
              </div>
              
              <div className="mt-8 pt-4 border-t border-white/[0.03]">
                <p className="font-mono text-[8px] text-white/10 tracking-widest">
                  BLACKROCK_OPS // PROTOCOL_{item.id}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
