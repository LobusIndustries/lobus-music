"use client";

import { useRef } from "react";
import type { PlatformLink } from "@/lib/links";
import PlatformIcon from "./PlatformIcon";

export default function LinkCard({ link, index }: { link: PlatformLink; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  function onMove(e: React.PointerEvent<HTMLAnchorElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -16;
    const ry = (px - 0.5) * 16;
    card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.04,1.04,1.04)`;
    card.style.setProperty("--gx", `${px * 100}%`);
    card.style.setProperty("--gy", `${py * 100}%`);
  }

  function onLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(700px) rotateX(0) rotateY(0) scale3d(1,1,1)";
  }

  return (
    <a
      ref={cardRef}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="group relative flex items-center gap-5 overflow-hidden rounded-2xl border px-6 py-5 backdrop-blur-xl transition-transform duration-150 ease-out will-change-transform"
      style={
        {
          "--gx": "50%",
          "--gy": "50%",
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.1), rgba(10,8,14,0.65))",
          borderColor: `${link.color}55`,
          boxShadow: `0 10px 40px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(0,0,0,0.3)`,
          animationDelay: `${index * 80}ms`,
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(280px circle at var(--gx) var(--gy), ${link.color}40, transparent 70%)`,
        }}
      />
      <div
        className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-white transition-transform duration-300 group-hover:scale-110"
        style={{
          color: link.color,
          borderColor: `${link.color}88`,
          background: `${link.color}22`,
          boxShadow: `0 0 16px -2px ${link.color}88`,
        }}
      >
        <PlatformIcon platform={link.key} />
      </div>

      <div className="relative z-10 flex flex-1 flex-col">
        <span className="text-lg font-bold tracking-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]">
          {link.label}
        </span>
        <span className="text-sm text-white/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">
          {link.handle}
        </span>
      </div>

      <span
        className="relative z-10 text-xl transition-transform duration-300 group-hover:translate-x-1"
        style={{ color: link.color }}
      >
        &#8594;
      </span>
    </a>
  );
}
