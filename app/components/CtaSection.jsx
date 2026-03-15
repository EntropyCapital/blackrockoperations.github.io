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
    <div className="border border-white/10 bg-[#0e0e0e]">
      <div className="px-6 py-12 md:px-12 md:py-14">
        <div className="grid gap-10 md:grid-cols-12 md:items-start">
          {/* LEFT CONTENT */}
          <div className="md:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">
              Intake / Availability
            </p>

            <h3 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              Request a Project Review
            </h3>

            <p className="mt-3 max-w-xl text-base leading-relaxed text-white/70">
              If the work requires precision, discretion, and a clean approval chain,
              we’ll align scope, timeline, and constraints—then execute.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <MiniSpec label="Response window" value="24–72 HRS" />
              <MiniSpec label="Engagement type" value="LIMITED" />
              <MiniSpec label="Location" value="MESA, AZ" />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="md:col-span-5">
            <div className="border border-white/10 bg-black/20 p-6">
              <div className="text-[11px] uppercase tracking-[0.24em] text-white/50">
                Next step
              </div>

              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Direct outreach only. Copy the address below to send a brief (scope / timeline / constraints).
              </p>

              <div className="mt-6">
                <button
                  onClick={handleCopy}
                  className="group relative flex w-full flex-col items-center justify-center overflow-hidden border border-white/10 bg-white/5 px-6 py-8 transition-all hover:bg-white/10 active:scale-[0.98]"
                >
                  <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
                    {copied ? "Status: Copied" : "Click to copy address"}
                  </span>
                  <span className={`text-lg font-medium tracking-tight transition-colors ${copied ? 'text-orange-500' : 'text-white'}`}>
                    {email}
                  </span>
                  
                  {/* Subtle underline progress for the "Copied" state */}
                  {copied && (
                    <div className="absolute bottom-0 left-0 h-[2px] w-full bg-orange-600 animate-in fade-in slide-in-from-left duration-500" />
                  )}
                </button>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4 text-[11px] uppercase tracking-[0.22em] text-white/40">
                No public work listings. Presence only.
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
    <div className="border border-white/10 bg-black/20 p-4">
      <div className="text-[11px] uppercase tracking-[0.24em] text-white/50">
        {label}
      </div>
      <div className="mt-2 text-sm font-semibold tracking-tight text-white/85">
        {value}
      </div>
    </div>
  );
}
