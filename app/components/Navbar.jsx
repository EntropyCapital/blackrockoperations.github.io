"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    /* Changed from absolute to relative to push Hero content down */
    <header className="relative z-50 w-full bg-[#050505]">
      {/* Top micro bar */}
      <div className="w-full border-b border-white/5 bg-black/40">
        <div className="container mx-auto px-6 py-2">
          <div className="flex items-center text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-white/30 font-mono">
            <p>
              LOC: <span className="text-white/60">33.4151° N, 111.8315° W</span> 
              <span className="mx-3 text-white/10">|</span> 
              SYS_STATUS: <span className="text-emerald-500/60">ACTIVE</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Nav Space */}
      <nav className="w-full border-b border-white/[0.02]">
        <div className="container mx-auto flex items-center justify-start px-6 py-4 md:py-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.svg"
              alt="Blackrock Operations Logo"
              width={519}
              height={419}
              className="w-[100px] md:w-[120px] h-auto opacity-70 hover:opacity-100 transition-opacity"
              priority
            />
          </Link>
        </div>
      </nav>
    </header>
  );
}
