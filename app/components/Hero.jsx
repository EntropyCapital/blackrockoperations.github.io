"use client";

import Image from "next/image";

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
        <div className="absolute inset-0 z-10 bg-black/34" />

        {/* Surveillance overlay */}
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_32%,rgba(0,0,0,0.5)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(140,255,220,0.08),rgba(255,255,255,0.03),rgba(0,0,0,0.18))]" />
          <div className="scanlines absolute inset-0 opacity-[0.22]" />
          <div className="noise absolute inset-0 opacity-[0.12]" />
          <div className="flicker absolute inset-0 opacity-[0.06]" />
          <div className="surveillance-grid absolute inset-0 opacity-[0.09]" />
          <div className="sweep-line absolute inset-0 opacity-[0.16]" />
        </div>

        {/* Content */}
        <div className="relative z-30 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          
          {/* 🔥 LOGO ADDED HERE */}
          <div className="mb-4 md:mb-6">
            <Image
              src="/images/logo.svg"
              alt="Blackrock Operations Logo"
              width={519}
              height={419}
              className="w-[70px] md:w-[90px] lg:w-[110px] h-auto opacity-70 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0"
              priority
            />
          </div>

          <h1 className="mb-2 max-w-4xl text-2xl font-medium tracking-tighter md:mb-6 md:text-6xl lg:text-7xl">
            Information Logistics & <br />
            <span className="text-white/92">Strategic Assets.</span>
          </h1>

          <div className="flex flex-col items-center gap-2">
            <p className="max-w-md text-[11px] font-light leading-relaxed tracking-wide text-white/55 md:text-base">
              Video production and documentation for defense, R&amp;D, and high-risk environments.
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
            rgba(255, 255, 255, 0.08) 0px,
            rgba(255, 255, 255, 0.08) 1px,
            transparent 2px,
            transparent 3px
          );
          background-size: 100% 3px;
          animation: scanlineDrift 6s linear infinite;
          mix-blend-mode: overlay;
        }

        .noise {
          background-image:
            radial-gradient(rgba(255, 255, 255, 0.35) 0.7px, transparent 1px),
            radial-gradient(rgba(120, 255, 210, 0.18) 0.6px, transparent 1px);
          background-size: 2px 2px, 3px 3px;
          mix-blend-mode: overlay;
          animation: noiseShift 0.12s steps(3) infinite;
        }

        .flicker {
          background: rgba(255, 255, 255, 0.04);
          animation: flicker 0.15s infinite;
          mix-blend-mode: overlay;
        }

        .surveillance-grid {
          background-image:
            linear-gradient(rgba(120, 255, 210, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120, 255, 210, 0.12) 1px, transparent 1px);
          background-size: 96px 96px;
          animation: gridDrift 18s linear infinite;
        }

        .sweep-line::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            transparent 45%,
            rgba(140, 255, 220, 0.12) 50%,
            transparent 55%,
            transparent 100%
          );
          animation: sweep 5s linear infinite;
        }

        @keyframes sweep {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @keyframes gridDrift {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(96px, 48px, 0); }
        }

        @keyframes scanlineDrift {
          0% { transform: translateY(0); }
          100% { transform: translateY(3px); }
        }

        @keyframes noiseShift {
          0% { transform: translate3d(0,0,0); opacity: 0.1; }
          25% { transform: translate3d(-1px,1px,0); opacity: 0.12; }
          50% { transform: translate3d(1px,-1px,0); opacity: 0.1; }
          75% { transform: translate3d(1px,1px,0); opacity: 0.135; }
          100% { transform: translate3d(0,0,0); opacity: 0.1; }
        }

        @keyframes flicker {
          0% { opacity: 0.03; }
          50% { opacity: 0.07; }
          100% { opacity: 0.03; }
        }
      `}</style>
    </section>
  );
}
