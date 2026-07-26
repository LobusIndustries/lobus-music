"use client";

import { useState } from "react";
import { startAmbient, stopAmbient } from "@/lib/audioEngine";

export default function SoundToggle() {
  const [on, setOn] = useState(false);

  function toggle() {
    if (on) {
      stopAmbient();
      setOn(false);
    } else {
      startAmbient();
      setOn(true);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Mute ambient sound" : "Play ambient sound"}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-white/40"
      style={{ boxShadow: on ? "0 0 30px rgba(255,46,99,0.55)" : "none" }}
    >
      {on ? (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="1.6">
          <path d="M4 9v6h4l5 4V5L8 9H4Z" />
          <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="1.6">
          <path d="M4 9v6h4l5 4V5L8 9H4Z" />
          <path d="M16 9l5 6M21 9l-5 6" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
