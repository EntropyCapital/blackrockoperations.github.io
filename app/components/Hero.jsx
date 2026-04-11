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
        <div className="absolute inset-0 z-10 bg-black/28" />

        {/* Surveillance overlay */}
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_36%,rgba(0,0,0,0.44)_100%)]" />

          {/* Subtle cool tint */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(140,255,220,0.05),rgba(255,255,255,0.02),rgba(0,0,0,0.12))]" />

          {/* Animated scanlines */}
          <div className="scanlines absolute inset-0 opacity-[0.12]" />

          {/* Animated noise */}
          <div className="noise absolute inset-0 opacity-[0.055]" />

          {/* Moving grid */}
          <div className="surveillance-grid absolute inset-0 opacity-[0.06]" />

          {/* Sweep line */}
          <div className="sweep-line absolute inset-0 opacity-[0.11]" />

          {/* Corner brackets */}
          <div className="absolute left-6 top-6 h-12 w-12 border-l border-t border-emerald-300/25" />
          <div className="absolute right-6 top-6 h-12 w-12 border-r border-t border-emerald-300/25" />
          <div className="absolute bottom-6 left-6 h-12 w-12 border-b border-l border-emerald-300/25" />
          <div className="absolute bottom-6 right-6 h-12 w-12 border-b border-r border-emerald-300/25" />

          {/* HUD text - moved away from brackets */}
          <div className="absolute left-8 top-2 font-mono text-[8px] uppercase tracking-[0.28em] text-emerald-300/40 md:left-10 md:top-3 md:text-[9px]">
            Feed Active // Node 01
          </div>

          <div className="absolute right-8 top-2 font-mono text-[8px] uppercase tracking-[0.28em] text-emerald-300/35 md:right-10 md:top-3 md:text-[9px]">
            Rec ●
          </div>

          <div className="absolute bottom-2 left-8 font-mono text-[8px] uppercase tracking-[0.28em] text-white/22 md:bottom-3 md:left-10 md:text-[9px]">
            Mesa, AZ // Surveillance Relay
          </div>
        </div>

        {/* Content */}
        <div className="relative z-30 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <h1 className="mb-2 max-w-4xl text-2xl font-medium tracking-tighter md:mb-6 md:text-6xl lg:text-7xl">
            Information Logistics & <br />
            <span className="text-white/92">Strategic Assets.</span>
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
            rgba(255, 255, 255, 0.045) 0px,
            rgba(255, 255, 255, 0.045) 1px,
            transparent 2px,
            transparent 4px
          );
          background-size: 100% 4px;
          animation: scanlineDrift 10s linear infinite;
          will-change: transform;
        }

        .noise {
          background-image:
            radial-gradient(rgba(255, 255, 255, 0.22) 0.6px, transparent 0.8px),
            radial-gradient(rgba(120, 255, 210, 0.12) 0.5px, transparent 0.7px);
          background-size: 3px 3px, 5px 5px;
          background-position: 0 0, 1px 1px;
          mix-blend-mode: soft-light;
          animation: noiseShift 0.25s steps(2) infinite;
          will-change: transform, opacity;
        }

        .surveillance-grid {
          background-image:
            linear-gradient(rgba(120, 255, 210, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120, 255, 210, 0.1) 1px, transparent 1px);
          background-size: 96px 96px;
          animation: gridDrift 22s linear infinite;
          will-change: transform;
        }

        .sweep-line::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            transparent 46%,
            rgba(140, 255, 220, 0.07) 50%,
            transparent 54%,
            transparent 100%
          );
          animation: sweep 6.5s linear infinite;
          will-change: transform;
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
            transform: translate3d(96px, 48px, 0);
          }
        }

        @keyframes scanlineDrift {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(4px);
          }
        }

        @keyframes noiseShift {
          0% {
            transform: translate3d(0, 0, 0);
            opacity: 0.05;
          }
          25% {
            transform: translate3d(-1px, 1px, 0);
            opacity: 0.06;
          }
          50% {
            transform: translate3d(1px, -1px, 0);
            opacity: 0.05;
          }
          75% {
            transform: translate3d(1px, 1px, 0);
            opacity: 0.065;
          }
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.05;
          }
        }
      `}</style>
    </section>
  );
}
