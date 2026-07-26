"use client";

import { useEffect, useRef } from "react";
import { getAnalyser, isRunning } from "@/lib/audioEngine";

const BAR_COUNT = 48;

export default function Waveform() {
  const barRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    let rafId = 0;
    let dataArray: Uint8Array<ArrayBuffer> | null = null;
    let wasRunning = false;

    function tick() {
      rafId = requestAnimationFrame(tick);
      const analyser = getAnalyser();
      const running = !!analyser && isRunning();

      if (running) {
        if (!dataArray || dataArray.length !== analyser!.frequencyBinCount) {
          dataArray = new Uint8Array(analyser!.frequencyBinCount) as Uint8Array<ArrayBuffer>;
        }
        analyser!.getByteFrequencyData(dataArray);
        const bins = dataArray.length;
        barRefs.current.forEach((el, i) => {
          if (!el) return;
          if (!wasRunning) el.style.animation = "none";
          // Perceptual (power-curve) mapping so low-frequency energy — where
          // this ambient bed lives — spreads across more bars instead of
          // collapsing into the first couple of linear bins.
          const t = i / (BAR_COUNT - 1);
          const idx = Math.min(bins - 1, Math.floor(t ** 2.2 * bins));
          const v = dataArray![idx] / 255;
          el.style.transform = `scaleY(${Math.max(0.06, v)})`;
        });
      } else if (wasRunning) {
        barRefs.current.forEach((el) => {
          if (!el) return;
          el.style.animation = "";
          el.style.transform = "";
        });
      }
      wasRunning = running;
    }
    tick();

    return () => cancelAnimationFrame(rafId);
  }, []);

  const bars = Array.from({ length: BAR_COUNT }, (_, i) => i);
  return (
    <div className="flex h-16 items-center justify-center gap-[3px] mix-blend-difference">
      {bars.map((i) => {
        const duration = 0.6 + ((i * 37) % 11) / 10;
        const delay = ((i * 53) % 20) / 10;
        return (
          <span
            key={i}
            ref={(el) => {
              barRefs.current[i] = el;
            }}
            className="w-[3px] rounded-full bg-white"
            style={{
              height: "100%",
              transformOrigin: "bottom",
              animation: `waveform ${duration}s ease-in-out ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}
