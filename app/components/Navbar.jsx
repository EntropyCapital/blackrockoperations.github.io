"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      {/* Top micro bar - Pure Diagnostic Data */}
      <div className="w-full border-b border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-2">
          <div className="flex items-center text-[9px] uppercase tracking-[0.4em] text-white/30 font-mono">
            <p>
              SERVER LOC: <span className="text-white/60">33.4151° N, 111.8315° W</span> 
              <span className="mx-4 text-white/10">|</span> 
              SYS_STATUS: <span className="text-emerald-500/60">ACTIVE</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Brand Space */}
      <nav className="w-full">
        <div className="container mx-auto flex items-center justify-start px-6 py-8">
          <Link
            href="/"
            className="flex items-center"
          >
            <Image
              src="/images/logo.svg"
              alt="Blackrock Operations Logo"
              width={519}
              height={419}
              className="w-[120px] h-auto opacity-70 hover:opacity-100 transition-opacity"
              priority
            />
          </Link>
        </div>
      </nav>
    </header>
  );
}
