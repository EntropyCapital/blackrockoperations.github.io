import {
  ShieldCheckIcon,
  BeakerIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

/**
 * Clients / Trust Signals
 * No logos. No disclosure. Context only.
 */
export default function ClientLogos() {
  const sectors = [
    {
      icon: <ShieldCheckIcon className="h-6 w-6 text-white/70" />,
      title: "Defense & Aerospace Manufacturing",
      description:
        "Support for organizations operating under strict compliance, security, and review constraints.",
    },
    {
      icon: <BeakerIcon className="h-6 w-6 text-white/70" />,
      title: "Advanced R&D Environments",
      description:
        "Documentation and media systems for sensitive research, prototyping, and testing programs.",
    },
    {
      icon: <BuildingOffice2Icon className="h-6 w-6 text-white/70" />,
      title: "Government & Adjacent Sectors",
      description:
        "Work aligned with public-sector standards, controlled disclosures, and formal approval chains.",
    },
  ];

  return (
    <div className="mt-10 border border-white/10 bg-[#0b0b0b] px-6 py-10 md:px-10 md:py-12">
      {/* Header */}
      <div className="max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.24em] text-white/50">
          Operational Trust Signal
        </p>

        <p className="mt-3 text-sm leading-relaxed text-white/65">
          Blackrock Operations supports organizations in controlled,
          high-trust environments.<br></br> Engagements are governed by strict disclosure standards.
        </p>
      </div>

      {/* Sectors */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {sectors.map((sector) => (
          <div
            key={sector.title}
            className="border border-white/10 bg-black/20 p-5"
          >
            <div className="flex items-center gap-3">
              {sector.icon}
              <h4 className="text-sm font-semibold tracking-tight text-white/85">
                {sector.title}
              </h4>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {sector.description}
            </p>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-8 border-t border-white/10 pt-4 text-[11px] uppercase tracking-[0.22em] text-white/40">
        Specific engagements are not publicly listed.
      </div>
    </div>
  );
}
