export default function SectionSlate({
    section = "SECTION",
    number = "01",
    title = "Title",
    meta = "REV 1.0 // UPDATED 2025-12-26",
    align = "left", // "left" | "center"
  }) {
    const isCenter = align === "center";
  
    return (
      <div className={isCenter ? "text-center" : "text-left"}>
        <div
          className={
            isCenter
              ? "mx-auto mb-3 flex w-fit items-center gap-3"
              : "mb-3 flex items-center gap-3"
          }
        >
          <span className="text-xs font-semibold tracking-[0.22em] text-white/60">
            {section} {number} — {title.toUpperCase()}
          </span>
  
          {/* thin rule line */}
          <span className="hidden h-px w-24 bg-white/10 md:inline-block" />
        </div>
  
        {/* big title */}
        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
          {title}
        </h2>
  
        {/* tiny metadata line */}
        <p className="mt-3 text-[11px] tracking-[0.22em] text-white/40">
          {meta}
        </p>
      </div>
    );
  }
  