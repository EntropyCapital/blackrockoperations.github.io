"use client";

export default function Hero() {
  return (
    <section 
      id="top" 
      className="relative flex min-h-screen w-full items-center justify-center bg-[#050505] overflow-hidden"
    >
      {/* 16:9 Media Container */}
      <div className="relative aspect-video w-full max-w-[1920px] overflow-hidden">
        
        {/* MEDIA PLACEHOLDER BLOCK 
            Uncomment when ready for video/photo
        */}
        {/* <video
          src="/videos/hero-loop.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-40"
        /> */}

        {/* Fallback Dark State */}
        <div className="absolute inset-0 bg-black z-10" />
        
        {/* The Content Layer */}
        <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          
          <h1 className="mb-6 max-w-4xl text-4xl font-medium tracking-tighter md:text-6xl lg:text-7xl">
            Information Logistics & <br />
            <span className="text-white/90">Strategic Assets.</span>
          </h1>

          <div className="flex flex-col items-center gap-4">
             <p className="max-w-xl text-sm font-light leading-relaxed tracking-wide text-white/40 md:text-base">
                Facilitating operational continuity and high-trust documentation 
                for entities operating within discrete and contested environments.
             </p>
             
             {/* Simple Divider */}
             <div className="h-px w-8 bg-white/10 my-4" />

             <p className="font-mono text-[9px] tracking-[0.3em] text-white/20 uppercase">
                Established MMXXV // Mesa, AZ
             </p>
          </div>
        </div>
      </div>
    </section>
  );
}
