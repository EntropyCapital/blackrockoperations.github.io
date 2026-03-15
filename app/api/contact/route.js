'use client';

export default function CtaSection() {
  const emailAddress = "colton@blackrockoperations.com";

  return (
    <div className="border border-white/10 bg-[#0e0e0e]">
      <div className="px-6 py-12 md:px-12 md:py-14">
        <div className="grid gap-10 md:grid-cols-12 md:items-start">
          {/* LEFT */}
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

            {/* TRUST / SPECS */}
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <MiniSpec label="Response window" value="24–72 HRS" />
              <MiniSpec label="Engagement type" value="LIMITED" />
              <MiniSpec label="Location" value="MESA, AZ" />
            </div>
          </div>

          {/* RIGHT */}
          <div className="md:col-span-5">
            <div className="border border-white/10 bg-black/20 p-6 text-center md:text-left">
              <div className="text-[11px] uppercase tracking-[0.24em] text-white/50">
                Direct Contact
              </div>

              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Send a short brief including scope, timeline, and constraints directly to our intake desk.
              </p>

              <a
                href={`mailto:${emailAddress}`}
                className="mt-6 inline-flex w-full items-center justify-center rounded bg-orange-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-orange-500"
              >
                {emailAddress}
              </a>

              <p className="mt-4 text-[10px] uppercase tracking-widest text-white/30">
                Encrypted comms preferred.
              </p>

              <div className="mt-8 border-t border-white/10 pt-4 text-[11px] uppercase tracking-[0.22em] text-white/40">
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
