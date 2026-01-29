"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Work", href: "/work" },
    { name: "Capabilities", href: "/capabilities" },
    { name: "Overview", href: "/overview" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      {/* Top micro bar */}
      <div className="w-full border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="container mx-auto px-6 py-2">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/70">
            OPERATIONS <span className="mx-2 text-white/30">//</span> MESA, AZ
            <span className="mx-2 text-white/30">//</span> EST. 2025
          </p>
        </div>
      </div>

      {/* Main nav */}
      <nav className="w-full bg-gradient-to-b from-black/55 to-transparent">
        <div className="container mx-auto flex items-center justify-between px-6 py-5">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <Image
              src="/images/logo.svg"
              alt="Blackrock Operations Logo"
              width={300}
              height={300}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[13px] font-medium uppercase tracking-[0.18em] text-white/75 transition hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className="rounded-md border border-white/15 bg-white/5 p-2 text-white backdrop-blur transition hover:bg-white/10"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="border-t border-white/10 bg-[#101010]/95 p-6 backdrop-blur md:hidden">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80 transition hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

