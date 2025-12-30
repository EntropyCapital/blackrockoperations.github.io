import Link from "next/link";

/**
 * The main "above the fold" hero section.
 * Features a full-screen, autoplaying background video.
 */
export default function Hero() {
  return (
    <section id="top" className="relative h-screen w-full overflow-hidden">
      {/* 1. The Video Background */}
      <video
        src="/videos/hero-loop.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute left-0 top-0 z-0 h-full w-full object-cover"
      />

      {/* 2. The Dark Overlay */}
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/60" />

      {/* 3. The Content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        {/* tiny “program line explains the vibe instantly” */}
        <p className="mb-6 text-[11px] tracking-[0.28em] text-white/45">
          FIELD OPS // MEDIA SYSTEMS
        </p>

        <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-7xl">
          Media Systems for High-Trust Brands.
        </h1>

        {/* tiny metadata line under heading */}
        <p className="mb-6 text-[11px] tracking-[0.22em] text-white/40">
          REV 1.0 // UPDATED 2025-12-26
        </p>

        <p className="mb-8 max-w-2xl text-lg text-white/75 md:text-xl">
          Strategic video production for teams that need precision,
          discretion, and impact.
        </p>

        <Link
          href="/work"
          className="rounded bg-orange-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-orange-500"
        >
          View Our Work
        </Link>
      </div>
    </section>
  );
}
