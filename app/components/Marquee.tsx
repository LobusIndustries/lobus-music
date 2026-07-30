"use client";

import { useLayoutEffect, useRef } from "react";

interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  /** Constant scroll speed in pixels/second, so the repeat interval scales with content length instead of staying fixed. */
  pxPerSecond?: number;
}

export default function Marquee({
  items,
  reverse,
  pxPerSecond = 50,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const content = [...items, ...items, ...items, ...items];

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      track.style.animation = "none";
      return;
    }

    function apply() {
      const copyWidth = track!.scrollWidth / 4;
      const duration = (copyWidth * 2) / pxPerSecond;
      track!.style.animationDuration = `${duration}s`;
      track!.style.animationDelay = `-${duration / 2}s`;
    }

    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(track);
    return () => ro.disconnect();
  }, [pxPerSecond, items]);

  return (
    <div className="relative overflow-hidden py-4 mix-blend-difference">
      <div
        ref={trackRef}
        className="flex w-max shrink-0 gap-8 whitespace-nowrap"
        style={{
          animationName: reverse ? "marquee-reverse" : "marquee",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDuration: "40s",
          animationDelay: "-20s",
        }}
      >
        {content.map((item, i) => (
          <span
            key={i}
            className="text-sm sm:text-base font-semibold uppercase tracking-[0.35em] text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]"
          >
            {item} <span className="opacity-40">&#9679;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
