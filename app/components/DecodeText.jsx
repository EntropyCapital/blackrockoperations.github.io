"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function DecodeText({
  text,
  className = "",
  speed = 24,
  triggerOnce = true,
}) {
  const ref = useRef(null);
  const [displayText, setDisplayText] = useState(text);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let interval;

    const startAnimation = () => {
      if (triggerOnce && hasPlayed) return;

      let iteration = 0;

      clearInterval(interval);
      interval = setInterval(() => {
        const next = text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");

        setDisplayText(next);

        iteration += 1 / 2.2;

        if (iteration >= text.length) {
          clearInterval(interval);
          setDisplayText(text);
          setHasPlayed(true);
        }
      }, speed);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
          if (triggerOnce) observer.unobserve(el);
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [text, speed, triggerOnce, hasPlayed]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {displayText}
    </span>
  );
}