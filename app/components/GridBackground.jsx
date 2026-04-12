"use client";

import { useEffect, useState } from "react";

export default function GridBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY || 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const baseOffsetY = Math.min(scrollY * 0.04, 60);
  const fineOffsetY = Math.min(scrollY * 0.025, 40);
  const glowOffsetY = Math.min(scrollY * 0.015, 24);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Main grid */}
      <div
        className="grid-base absolute inset-0"
        style={{ transform: `translate3d(0, ${baseOffsetY}px, 0)` }}
      />

      {/* Secondary fine grid */}
      <div
        className="grid-fine absolute inset-0"
        style={{ transform: `translate3d(0, ${fineOffsetY}px, 0)` }}
      />

      {/* Glow / depth */}
      <div
        className="grid-glow absolute inset-0"
        style={{ transform: `translate3d(0, ${glowOffsetY}px, 0)` }}
      />

      {/* Vignette */}
      <div className="grid-vignette absolute inset-0" />

      <style jsx>{`
        .grid-base {
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.09) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.09) 1px, transparent 1px);
          background-size: 64px 64px;
          background-position: center center;
          animation: gridFloat 14s ease-in-out infinite alternate;
          opacity: 0.58;
          will-change: transform;
        }

        .grid-fine {
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
          background-size: 16px 16px;
          background-position: center center;
          animation: gridFloatReverse 20s ease-in-out infinite alternate;
          opacity: 0.38;
          will-change: transform;
        }

        .grid-glow {
          background:
            radial-gradient(circle at 20% 20%, rgba(120, 255, 210, 0.14), transparent 30%),
            radial-gradient(circle at 80% 30%, rgba(120, 255, 210, 0.09), transparent 25%),
            radial-gradient(circle at 50% 80%, rgba(255, 255, 255, 0.06), transparent 30%);
          animation: glowShift 16s ease-in-out infinite alternate;
          opacity: 0.95;
          will-change: transform;
        }

        .grid-vignette {
          background: radial-gradient(
            circle at center,
            transparent 38%,
            rgba(0, 0, 0, 0.42) 100%
          );
        }

        @keyframes gridFloat {
          0% {
            translate: -28px 0;
          }
          100% {
            translate: 28px 0;
          }
        }

        @keyframes gridFloatReverse {
          0% {
            translate: 18px 0;
          }
          100% {
            translate: -18px 0;
          }
        }

        @keyframes glowShift {
          0% {
            translate: 0 0;
            scale: 1;
          }
          100% {
            translate: -1% 1%;
            scale: 1.05;
          }
        }
      `}</style>
    </div>
  );
}
