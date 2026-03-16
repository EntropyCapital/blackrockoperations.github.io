"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="relative z-50 w-full bg-[#050505]">
      {/* Top micro bar */}
      <div className="w-full border-b border-white/5 bg-black/40">
        <div className="container mx-auto px-6 py-2">
          {/* Use flex and tracking-tighter on tiny screens to prevent wrapping */}
          <div className="flex items-center justify-between md:justify-start font-mono text-[7px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/30">
            
            <div className="flex items-center gap-2 sm:gap-4">
              <p className="whitespace-nowrap">
                LOC: <span className="text-white/60">33.4151° N, 111.8315° W</span>
              </p>
              
              <span className="hidden sm:inline text-white/10">|</span> 

              {/* whitespace-nowrap ensures ACTIVE stays pinned to SYS_STATUS */}
              <p className="whitespace-nowrap">
                SYS_STATUS: <span className="text-emerald-500/80 font-medium">ACTIVE</span>
              </p>
            </div>

            {/* Added a subtle "Live" indicator for the terminal feel */}
            <div className="flex items-center gap-1.5 md:ml-auto">
              <div className="h-1 w-1 rounded-full bg-emerald-500/50 animate-pulse" />
              <span className="hidden md:inline opacity-50">NODE_TERMINAL_01</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav Space */}
      <nav className="w-full border-b border-white/[0.02]">
        <div className="container mx-auto flex items-center justify-start px-6 py-4 md:py-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.svg"
              alt="Blackrock Operations Logo"
              width={519}
              height={419}
              className="w-[90px] md:w-[110px] h-auto opacity-80 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0"
              priority
            />
          </Link>
        </div>
      </nav>
    </header>
  );
}
