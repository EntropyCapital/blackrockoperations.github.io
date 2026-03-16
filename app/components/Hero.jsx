"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section 
      id="top" 
      className="relative flex min-h-screen w-full items-center justify-center bg-[#050505] overflow-hidden"
    >
      {/* 16:9 Media Container */}
      <div className="relative aspect-video w-full max-w-[1920px] overflow-hidden shadow-2xl">
        
        {/* MEDIA PLACEHOLDER BLOCK 
            Uncomment the video or image tag below when ready.
        */}
        
        {/* <video
          src="/videos/hero-loop.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-60"
        /> */}

        {/* <Image 
          src="/images/your-photo.jpg" 
          alt="Background" 
          fill 
          className="object-cover opacity-50"
        /> */}

        {/* Fallback/Default Dark State */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 z-10" />
        
        {/* Tactical Overlay (Scanlines or Grid) */}
        <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

        {/* The Content Layer */}
        <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          
          {/* Metadata Intake Tag */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-white/20" />
            <p className="font-mono text-[10px] tracking-[0.4em] text-white/40">
              NODE // INTAKE // 01-B
            </p>
            <span className="h-px w-8 bg-white/20" />
          </div>

          <h1 className="mb-6 max-w-4xl text-4xl font-medium tracking-tighter md:text-6xl lg:text-7xl">
            Information Logistics & <br />
            <span className="text-white/90">Strategic Assets.</span>
          </h1>

          <div className="mb-12 flex flex-col items-center gap-2">
             <p className="max-w-xl text-sm font-light leading-relaxed tracking-wide text-white/50 md:text-base">
                Facilitating operational continuity and high-trust documentation 
                for entities operating within discrete and contested environments.
             </p>
             <p className="font-mono text-[9px] tracking-[0.2em] text-white/20 uppercase">
                Established MMXXV // Mesa, AZ Headquarters
             </p>
          </div>

          {/* System Status Indicators (Replacing the Button) */}
          <div className="flex flex-col items-center gap-6">
            <div className="h-px w-12 bg-white/10" />
            
            <div className="flex items-center gap-8">
                {/* Status light */}
                <div className="flex items-center gap-2 opacity-60">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-emerald-500/80">System Ready</span>
                </div>

                {/* Uplink status */}
                <div className="flex items-center gap-2 opacity-40">
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white">Secure Uplink: Established</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
