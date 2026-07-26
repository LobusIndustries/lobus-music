"use client";

import { useEffect, useRef } from "react";

const WORD = "LOBUS";

export default function GlitchTitle() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const glitchRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let mouseX = -9999;
    let mouseY = -9999;
    let rafId = 0;

    function onMove(e: PointerEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
    window.addEventListener("pointermove", onMove);

    function tick() {
      rafId = requestAnimationFrame(tick);
      letterRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = mouseX - cx;
        const dy = mouseY - cy;
        const dist = Math.hypot(dx, dy);
        const radius = 260;
        const influence = Math.max(0, 1 - dist / radius);
        const lift = influence * 34;
        const scale = 1 + influence * 0.5;
        const skew = (dx / radius) * influence * 14;
        el.style.transform = `translateY(${-lift}px) scale(${scale}) skewX(${skew}deg)`;
        el.style.opacity = `${0.55 + influence * 0.45}`;
      });
    }
    tick();

    const glitchInterval = setInterval(() => {
      const layers = glitchRefs.current;
      layers.forEach((el) => {
        if (!el) return;
        el.style.opacity = "1";
        const ox = (Math.random() - 0.5) * 18;
        const oy = (Math.random() - 0.5) * 6;
        el.style.transform = `translate(${ox}px, ${oy}px)`;
        el.style.clipPath = `inset(${Math.random() * 80}% 0 ${Math.random() * 15}% 0)`;
      });
      setTimeout(() => {
        layers.forEach((el) => {
          if (!el) return;
          el.style.opacity = "0";
        });
      }, 90 + Math.random() * 90);
    }, 2400 + Math.random() * 2200);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(glitchInterval);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative select-none">
      <h1
        className="flex text-[clamp(4rem,18vw,13rem)] font-black leading-none tracking-tight mix-blend-difference text-white"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {WORD.split("").map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              letterRefs.current[i] = el;
            }}
            className="inline-block transition-transform duration-[60ms] will-change-transform"
          >
            {char}
          </span>
        ))}
      </h1>

      {[
        { color: "#ff2e63", blend: "screen" as const },
        { color: "#00f2ea", blend: "screen" as const },
      ].map((layer, i) => (
        <div
          key={i}
          ref={(el) => {
            glitchRefs.current[i] = el;
          }}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex text-[clamp(4rem,18vw,13rem)] font-black leading-none tracking-tight opacity-0"
          style={{
            color: layer.color,
            mixBlendMode: layer.blend,
            fontFamily: "var(--font-display)",
          }}
        >
          {WORD}
        </div>
      ))}
    </div>
  );
}
