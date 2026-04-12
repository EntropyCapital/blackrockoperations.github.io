"use client";

export default function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="grid-base absolute inset-0" />
      <div className="grid-glow absolute inset-0" />
      <div className="grid-vignette absolute inset-0" />

      <style jsx>{`
        .grid-base {
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
          background-size: 64px 64px;
          animation: gridDrift 32s linear infinite;
          opacity: 0.32;
        }

        .grid-glow {
          background:
            radial-gradient(circle at 20% 20%, rgba(120, 255, 210, 0.08), transparent 30%),
            radial-gradient(circle at 80% 30%, rgba(120, 255, 210, 0.05), transparent 25%),
            radial-gradient(circle at 50% 80%, rgba(255, 255, 255, 0.035), transparent 30%);
          animation: glowShift 18s ease-in-out infinite alternate;
          opacity: 0.7;
        }

        .grid-vignette {
          background: radial-gradient(
            circle at center,
            transparent 45%,
            rgba(0, 0, 0, 0.28) 100%
          );
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
            transform: scale(1.04) translate3d(-1%, 1%, 0);
          }
        }
      `}</style>
    </div>
  );
}
