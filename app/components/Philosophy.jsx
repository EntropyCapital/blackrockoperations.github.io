import {
  VideoCameraIcon,
  ChatBubbleBottomCenterTextIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

/**
 * SECTION 01 — CAPABILITIES
 * Clean "ops brief" style capability cards.
 */
export default function Philosophy() {
  const capabilities = [
    {
      id: "CAP-01",
      icon: ChatBubbleBottomCenterTextIcon,
      title: "Narrative & Messaging",
      summary:
        "Clarify the story, sharpen the message, and align creative with the mission.",
      bullets: ["Creative brief", "Script + VO", "Messaging framework"],
    },
    {
      id: "CAP-02",
      icon: VideoCameraIcon,
      title: "Production & Post",
      summary:
        "Production and editorial built for credibility: composed, precise, and consistent.",
      bullets: ["Field capture", "Edit + color", "Sound + delivery"],
    },
    {
      id: "CAP-03",
      icon: CogIcon,
      title: "Process & Delivery",
      summary:
        "A controlled pipeline: clean approvals, versioning, and predictable handoff.",
      bullets: ["Milestones", "Review rounds", "Packaging + exports"],
    },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      {/* subtle top divider like your Featured block */}
      <div className="mb-10 h-px w-full bg-white/10" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {capabilities.map((cap) => {
          const Icon = cap.icon;

          return (
            <div
              key={cap.id}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-6"
            >
              {/* header row */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-black/20">
                    <Icon className="h-5 w-5 text-orange-500" />
                  </span>

                  <div>
                    <div className="text-[11px] uppercase tracking-[0.28em] text-white/50">
                      {cap.id} // ACTIVE
                    </div>
                    <h3 className="mt-1 text-xl font-semibold">{cap.title}</h3>
                  </div>
                </div>

                <div className="text-[11px] uppercase tracking-[0.28em] text-white/40">
                  BRIEF
                </div>
              </div>

              {/* body */}
              <p className="text-sm leading-relaxed text-white/70">
                {cap.summary}
              </p>

              <div className="my-5 h-px w-full bg-white/10" />

              {/* deliverables line */}
              <div className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                Deliverables
              </div>

              <ul className="mt-3 space-y-2 text-sm text-white/70">
                {cap.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange-500/80" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* bottom note line (matches your “details available…” vibe) */}
      <div className="mt-8 text-[11px] uppercase tracking-[0.28em] text-white/35">
        Scope scaled to engagement // NDA-compatible workflows available
      </div>
    </div>
  );
}
