"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  hue: number;
  size: number;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let particles: Particle[] = [];
    let mx = width / 2;
    let my = height / 2;
    let lastX = mx;
    let lastY = my;
    let hue = 180;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width;
      canvas!.height = height;
    }

    function onMove(e: PointerEvent) {
      mx = e.clientX;
      my = e.clientY;
      const speed = Math.hypot(mx - lastX, my - lastY);
      const count = Math.min(4, 1 + Math.floor(speed / 12));
      hue = (hue + 2) % 360;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: mx,
          y: my,
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.4 - 0.4,
          life: 1,
          hue: hue + Math.random() * 40,
          size: 2 + Math.random() * 4,
        });
      }
      lastX = mx;
      lastY = my;
      if (particles.length > 240) particles.splice(0, particles.length - 240);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);

    let frameId = 0;
    function animate() {
      frameId = requestAnimationFrame(animate);
      ctx!.clearRect(0, 0, width, height);
      ctx!.globalCompositeOperation = "lighter";

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.018;
      });
      particles = particles.filter((p) => p.life > 0);

      for (const p of particles) {
        const alpha = Math.max(p.life, 0);
        const r = p.size * (0.5 + p.life);
        const gradient = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
        gradient.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${alpha * 0.9})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 100%, 60%, 0)`);
        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
        ctx!.fill();
      }
    }
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 h-full w-full mix-blend-screen"
      aria-hidden="true"
    />
  );
}
