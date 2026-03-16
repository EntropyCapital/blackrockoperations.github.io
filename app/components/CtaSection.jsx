'use client';

import { useState } from 'react';

export default function CtaSection() {
  const email = "colton@blackrockoperations.com";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-white/10 bg-[#050505]">
      <div className="px-6 py-10 md:px-12 md:py-14">
        <div className="grid gap-12 md:grid-cols-12 md:items-start">
          
          {/* LEFT CONTENT: Mission Parameters */}
          <div className="md:col-span-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
              Protocol // Intake_Availability
            </p>

            <h3 className="mt-4 text-3xl font-medium tracking-tighter text-white md:text-4xl">
              Request Project Review
            </h3>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/50 md:text-base">
              If the objective requires clinical precision and a secure approval chain, 
              provide a brief via the established channel. We align on scope and 
              constraints—then initiate.
            </p>

            {/* Responsive Specs: Stacks on mobile, 3-col on desktop */}
            <div className="mt-8 grid gap-px bg-white/10 border border-white/10 sm:grid-cols-3">
              <MiniSpec label="Response" value="24–72 HRS" />
              <MiniSpec label="Engagement" value="LIMITED" />
              <MiniSpec label="Origin" value="MESA, AZ" />
            </div>
          </div>

          {/* RIGHT CONTENT: Secure Channel */}
          <div className="md:col-span-5">
            <div className="border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                  Secure Channel
                </span>
              </div>

              <p className="text-xs leading-relaxed text-white/60 mb-6">
                Direct outreach only. Transmit brief (scope / timeline / constraints) to the following node:
              </p>

              <button
                onClick={handleCopy}
                className="group relative flex w-full flex-col items-center justify-center overflow-hidden border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10 active:scale-[0.98]"
              >
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-2">
                  {copied ? "[ Status: Address Copied ]" : "Click to copy node address"}
                </span>
                
                {/* Responsive text size: smaller on mobile so it doesn't break */}
                <span className={`text-[13px] sm:text-lg font-mono tracking-tight transition-colors truncate w-full ${copied ? 'text-emerald-400' : 'text-white/90'}`}>
                  {email}
                </span>
                
                {copied && (
                  <div className="absolute bottom-0 left-0 h-[1px] w-full bg-emerald-500/50" />
                )}
              </button>

              <div className="mt-6 border-t border-white/5 pt-4 text-center">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
                  No public listings. Presence only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniSpec({ label, value }) {
  return (
    <div className="bg-[#050505] p-5">
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
        {label}
      </div>
      <div className="mt-1 text-xs font-medium tracking-widest text-white/70">
        {value}
      </div>
    </div>
  );
}
