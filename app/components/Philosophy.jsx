"use client";

export default function Domains() {
  const domains = [
    {
      id: "01",
      title: "Signal Acquisition",
      desc: "High-fidelity sensor integration and multi-spectral visual data capture in austere and contested environments.",
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
      title: "Data Management",
      desc: "Secure storage protocols and long-term retention of sensitive multi-format assets and institutional records.",
      status: "ENCRYPTED"
    }
  ];

  return (
    <div className="w-full">
      {/* The "Database" Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
        {domains.map((item) => (
          <div 
            key={item.id} 
            className="bg-[#050505] p-8 flex flex-col justify-between min-h-[280px] group hover:bg-[#080808] transition-colors duration-500"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-[10px] text-white/20 tracking-tighter">REF_ID // {item.id}</span>
                <span className={`text-[9px] font-mono px-2 py-0.5 border ${
                  item.status === 'ENCRYPTED' 
                  ? 'border-white/20 text-white/40 bg-white/5' 
                  : 'border-emerald-500/30 text-emerald-500/70 bg-emerald-500/5'
                }`}>
                  [{item.status}]
                </span>
              </div>
              
              <h3 className="text-lg font-medium text-white mb-4 uppercase tracking-[0.1em]">
                {item.title}
              </h3>
              
              <p className="text-sm leading-relaxed text-white/40 font-light max-w-[260px]">
                {item.desc}
              </p>
            </div>
            
            <div className="mt-8 pt-4 border-t border-white/[0.03] flex justify-between items-center">
              <p className="font-mono text-[8px] text-white/10 tracking-widest">
                AUTH_REQ // P_{item.id}
              </p>
              {/* Subtle visual marker */}
              <div className="h-1 w-1 bg-white/10 group-hover:bg-emerald-500/40 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
