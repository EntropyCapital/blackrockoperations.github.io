"use client";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative w-full overflow-hidden border-b border-white/[0.05] bg-[#050505]"
    >
      <div className="relative mx-auto aspect-video w-full max-w-[1920px] overflow-hidden">
        <video
          src="/images/hero-loop.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />

        {/* Base darkening */}
        <div className="absolute inset-0 z-10 bg-black/35" />

        {/* Surveillance overlay */}
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,0,0,0.42)_100%)]" />

          {/* Scanlines */}
          <div className="scanlines absolute inset-0 opacity-[0.14]" />

          {/* Moving grid */}
          <div className="surveillance-grid absolute inset-0 opacity-[0.08]" />

          {/* Sweep line */}
          <div className="sweep-line absolute inset-0 opacity-[0.12]" />

          {/* Corner brackets */}
          <div className="absolute left-6 top-6 h-10 w-10 border-l border-t border-emerald-400/30" />
          <div className="absolute right-6 top-6 h-10 w-10 border-r border-t border-emerald-400/30" />
          <div className="absolute bottom-6 left-6 h-10 w-10 border-b border-l border-emerald-400/30" />
          <div className="absolute bottom-6 right-6 h-10 w-10 border-b border-r border-emerald-400/30" />

          {/* HUD text */}
          <div className="absolute left-6 top-5 font-mono text-[9px] uppercase tracking-[0.28em] text-emerald-300/40">
            Feed Active // Node 01
          </div>
          <div className="absolute right-6 top-5 font-mono text-[9px] uppercase tracking-[0.28em] text-emerald-300/30">
            Rec ●
          </div>
          <div className="absolute bottom-5 left-6 font-mono text-[9px] uppercase tracking-[0.28em] text-white/20">
            Mesa, AZ // Surveillance Relay
          </div>
        </div>

        {/* Content */}
        <div className="relative z-30 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <h1 className="mb-2 max-w-4xl text-2xl font-medium tracking-tighter md:mb-6 md:text-6xl lg:text-7xl">
            Information Logistics & <br />
            <span className="text-white/90">Strategic Assets.</span>
          </h1>

          <div className="flex flex-col items-center gap-2">
            <p className="max-w-md text-[11px] font-light leading-relaxed tracking-wide text-white/50 md:text-base">
              Facilitating operational continuity and high-trust documentation
              for entities operating within discrete and contested environments.
            </p>

            <div className="my-1 h-px w-6 bg-white/10 md:my-4" />

            <p className="font-mono text-[7px] uppercase tracking-[0.3em] text-white/20 md:text-[9px]">
              Established MMXXV // Mesa, AZ
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scanlines {
          background-image: repeating-linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.06) 0px,
            rgba(255, 255, 255, 0.06) 1px,
            transparent 2px,
            transparent 4px
          );
        }

        .surveillance-grid {
          background-image:
            linear-gradient(rgba(120, 255, 210, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120, 255, 210, 0.12) 1px, transparent 1px);
          background-size: 90px 90px;
          animation: gridDrift 18s linear infinite;
        }

        .sweep-line::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            transparent 46%,
            rgba(140, 255, 220, 0.08) 50%,
            transparent 54%,
            transparent 100%
          );
          animation: sweep 6s linear infinite;
        }

        @keyframes sweep {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        @keyframes gridDrift {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(90px, 45px, 0);
          }
        }
      `}</style>
    </section>
  );
}
