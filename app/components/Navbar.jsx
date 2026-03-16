"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      {/* Top micro bar - The "System Status" readout */}
      <div className="w-full border-b border-white/10 bg-black/60 backdrop-blur-md">
        <div className="container mx-auto px-6 py-1.5">
          <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.3em] text-white/50 font-mono">
            <p>
              Server Loc: <span className="text-white/80">33.4151° N, 111.8315° W</span> 
              <span className="mx-3 text-white/20">//</span> 
              Status: <span className="text-emerald-500/80">Active</span>
            </p>
            <p className="hidden md:block">
              Auth: <span className="text-white/80">Guest_Session_04</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main nav - Stripped of public links */}
      <nav className="w-full">
        <div className="container mx-auto flex items-center justify-between px-6 py-6">
          {/* Logo - The only constant */}
          <Link
            href="/"
            className="flex items-center group"
          >
            <Image
              src="/images/logo.svg"
              alt="Blackrock Operations Logo"
              width={519}
              height={419}
              className="w-[140px] h-auto opacity-80 group-hover:opacity-100 transition-opacity"
              priority
            />
          </Link>

          {/* Desktop "Restricted" Access UI */}
          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-2 md:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-white/20 animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                Encrypted Connection
              </span>
            </div>
            
            {/* A single, vague call to action fits the shell vibe better than a menu */}
            <Link 
              href="#" 
              className="border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white/60 hover:bg-white/10 hover:text-white transition-all"
            >
              Portal Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
