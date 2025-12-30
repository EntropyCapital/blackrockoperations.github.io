'use client';

import { useState } from 'react';

export default function CtaSection() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const formEl = e.currentTarget; // this IS the <form>
    try {
      const form = new FormData(formEl);

      const payload = {
        name: String(form.get('name') || ''),
        company: String(form.get('company') || ''),
        email: String(form.get('email') || ''),
        details: String(form.get('details') || ''),
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || 'Request failed.');
      }

      setStatus('sent');
      formEl.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err?.message || 'Something failed. Try again.');
    }
  }

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
              we’ll align scope, timeline, and constraints-then execute.
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
            <div className="border border-white/10 bg-black/20 p-6">
              <div className="text-[11px] uppercase tracking-[0.24em] text-white/50">
                Next step
              </div>

              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Send a short brief. If it’s a fit, you’ll get a plan and a clean
                path to delivery.
              </p>

              <form onSubmit={onSubmit} className="mt-4 space-y-3">
                <input
                  name="name"
                  placeholder="Name"
                  className="w-full rounded-sm border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                  required
                />

                <input
                  name="company"
                  placeholder="Company (optional)"
                  className="w-full rounded-sm border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-sm border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                  required
                />

                <textarea
                  name="details"
                  placeholder="Brief (scope / timeline / constraints)"
                  rows={4}
                  className="w-full rounded-sm border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                  required
                />

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex w-full items-center justify-center rounded bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending…' : 'Request Contact'}
                </button>

                {status === 'sent' && (
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/60">
                    Received. Response window: 24–72 hrs.
                  </div>
                )}

                {status === 'error' && (
                  <div className="text-sm text-red-400">{errorMsg}</div>
                )}
              </form>

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

