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

  {/* Animated scanlines */}
  <div className="scanlines absolute inset-0 opacity-[0.12]" />

  {/* Animated noise */}
  <div className="noise absolute inset-0 opacity-[0.035]" />

  {/* Moving grid */}
  <div className="surveillance-grid absolute inset-0 opacity-[0.06]" />

  {/* Sweep line */}
  <div className="sweep-line absolute inset-0 opacity-[0.10]" />

  {/* Corner brackets */}
  <div className="absolute left-6 top-6 h-12 w-12 border-l border-t border-emerald-400/30" />
  <div className="absolute right-6 top-6 h-12 w-12 border-r border-t border-emerald-400/30" />
  <div className="absolute bottom-6 left-6 h-12 w-12 border-b border-l border-emerald-400/30" />
  <div className="absolute bottom-6 right-6 h-12 w-12 border-b border-r border-emerald-400/30" />

  {/* HUD text moved inward so it does not overlap brackets */}
  <div className="absolute left-14 top-6 font-mono text-[9px] uppercase tracking-[0.28em] text-emerald-300/40">
    Feed Active // Node 01
  </div>

  <div className="absolute right-14 top-6 font-mono text-[9px] uppercase tracking-[0.28em] text-emerald-300/30">
    Rec ●
  </div>

  <div className="absolute bottom-6 left-14 font-mono text-[9px] uppercase tracking-[0.28em] text-white/20">
    Mesa, AZ // Surveillance Relay
  </div>
</div>
