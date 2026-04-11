"use client";

export default function Navbar() {
  return (
    <header className="relative z-50 w-full bg-[#050505] border-b border-white/[0.05]">
      {/* Micro system bar ONLY */}
      <div className="w-full bg-black/40">
        <div className="container mx-auto px-6 py-2">
          <div className="flex items-center justify-between font-mono text-[7px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/30">
            
            {/* Left side */}
            <div className="flex items-center gap-2 sm:gap-4">
              <p className="whitespace-nowrap">
                LOC: <span className="text-white/60">33.4151° N, 111.8315° W</span>
              </p>

              <span className="hidden sm:inline text-white/10">|</span>

              <p className="whitespace-nowrap">
                SYS_STATUS:{" "}
                <span className="text-emerald-500/80 font-medium">
                  ACTIVE
                </span>
              </p>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-1.5">
              <div className="h-1 w-1 rounded-full bg-emerald-500/60 animate-pulse" />
              <span className="hidden md:inline opacity-50">
                NODE_TERMINAL_01
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
