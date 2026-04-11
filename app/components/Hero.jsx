"use client";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative w-full bg-[#050505] overflow-hidden border-b border-white/[0.05]"
    >
      <div className="relative aspect-video w-full max-w-[1920px] mx-auto overflow-hidden">
        <video
          src="/images/hero-loop.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-40"
        />

        {/* Optional dark overlay */}
        <div className="absolute inset-0 z-10 bg-black/40" />

        <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <h1 className="mb-2 md:mb-6 max-w-4xl text-2xl font-medium tracking-tighter md:text-6xl lg:text-7xl">
            Information Logistics & <br />
            <span className="text-white/90">Strategic Assets.</span>
          </h1>

          <div className="flex flex-col items-center gap-2">
            <p className="max-w-md text-[11px] md:text-base font-light leading-relaxed tracking-wide text-white/40">
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
    </section>
  );
}
