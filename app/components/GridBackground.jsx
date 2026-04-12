"use client";

export default function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base grid */}
      <div className="grid-base absolute inset-0" />

      {/* Glow / movement */}
      <div className="grid-glow absolute inset-0" />

      <style jsx>{`
        .grid-base {
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 64px 64px;
          animation: gridDrift 40s linear infinite;
          opacity: 0.25;
        }

        .grid-glow {
          background:
            radial-gradient(circle at 20% 20%, rgba(120,255,210,0.06), transparent 30%),
            radial-gradient(circle at 80% 30%, rgba(120,255,210,0.04), transparent 25%),
            radial-gradient(circle at 50% 80%, rgba(255,255,255,0.03), transparent 30%);
          animation: glowShift 20s ease-in-out infinite alternate;
          opacity: 0.6;
        }

        @keyframes gridDrift {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(64px, 32px, 0);
          }
        }

        @keyframes glowShift {
          0% {
            transform: scale(1) translate3d(0, 0, 0);
          }
          100% {
            transform: scale(1.05) translate3d(-1%, 1%, 0);
          }
        }
      `}</style>
    </div>
  );
}