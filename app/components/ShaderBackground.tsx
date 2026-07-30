"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getAverageLevel, isRunning } from "@/lib/audioEngine";

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  uniform vec2 uClickPos;
  uniform float uClickStrength;
  uniform float uAudioLevel;

  // Ashima simplex noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
            + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float sum = 0.0;
    float amp = 0.55;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 6; i++) {
      sum += amp * snoise(p);
      p = rot * p * 2.03;
      amp *= 0.55;
    }
    return sum;
  }

  vec3 palette(float t) {
    vec3 a = vec3(0.06, 0.02, 0.10);
    vec3 b = vec3(0.55, 0.45, 0.65);
    vec3 c = vec3(1.0, 1.0, 0.7);
    vec3 d = vec3(0.35, 0.15, 0.65);
    return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= uResolution.x / uResolution.y;

    vec2 mouse = uMouse * 2.0 - 1.0;
    mouse.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.055;

    vec2 warp = p;
    warp += 0.35 * vec2(fbm(p * 1.4 + t), fbm(p * 1.4 - t + 4.2));

    float distToMouse = length(p - mouse);
    float bulge = uMouseStrength * exp(-distToMouse * 2.6) * 0.9;
    warp += normalize(p - mouse + 0.0001) * bulge;

    vec2 click = uClickPos * 2.0 - 1.0;
    click.x *= uResolution.x / uResolution.y;
    float distToClick = length(p - click);
    float ring = sin(distToClick * 26.0 - uTime * 6.0) * 0.5 + 0.5;
    float ringMask = exp(-distToClick * 2.2) * uClickStrength;
    warp += normalize(p - click + 0.0001) * ringMask * 0.7 * ring;

    float n1 = fbm(warp * 1.6 + vec2(0.0, t * 1.3));
    float n2 = fbm(warp * 2.4 - vec2(t * 0.8, 0.0));
    float field = fbm(warp * 1.1 + n1 * 0.6 - n2 * 0.4 + t * 0.2);

    float bands = sin((field + t * 0.6) * 8.0) * 0.5 + 0.5;
    float glow = smoothstep(0.0, 1.0, bands);

    vec3 col = palette(field * 1.4 + t * 0.15);
    col = mix(col, col * 1.8, glow * 0.6);
    col += ringMask * vec3(1.0, 0.35, 0.65) * 0.8;
    col *= 1.0 + uAudioLevel * 0.6;

    float vig = smoothstep(1.35, 0.15, length(p));
    col *= vig;

    float grain = fract(sin(dot(uv * uResolution.xy, vec2(12.9898, 78.233))) * 43758.5453);
    col += (grain - 0.5) * 0.02;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function ShaderBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseStrength: { value: 0 },
      uClickPos: { value: new THREE.Vector2(0.5, 0.5) },
      uClickStrength: { value: 0 },
      uAudioLevel: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const targetMouse = new THREE.Vector2(0.5, 0.5);
    const currentMouse = new THREE.Vector2(0.5, 0.5);
    let targetStrength = 0;
    let currentStrength = 0;

    function resize() {
      const { clientWidth, clientHeight } = container!;
      renderer.setSize(clientWidth, clientHeight);
      uniforms.uResolution.value.set(clientWidth, clientHeight);
    }

    function onPointerMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      targetMouse.set(
        (e.clientX - rect.left) / rect.width,
        1 - (e.clientY - rect.top) / rect.height
      );
      targetStrength = 1;
    }

    function onPointerLeave() {
      targetStrength = 0;
    }

    let clickStrength = 0;
    function onPointerDown(e: PointerEvent) {
      uniforms.uClickPos.value.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight
      );
      clickStrength = 1;
    }

    resize();
    window.addEventListener("resize", resize);

    if (reduceMotion) {
      renderer.render(scene, camera);
      return () => {
        window.removeEventListener("resize", resize);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        container?.removeChild(renderer.domElement);
      };
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("pointerdown", onPointerDown);

    const timer = new THREE.Timer();
    let frameId = 0;

    function animate() {
      frameId = requestAnimationFrame(animate);
      timer.update();
      uniforms.uTime.value = timer.getElapsed();

      currentMouse.lerp(targetMouse, 0.06);
      currentStrength += (targetStrength - currentStrength) * 0.05;
      uniforms.uMouse.value.copy(currentMouse);
      uniforms.uMouseStrength.value = currentStrength;

      clickStrength *= 0.94;
      uniforms.uClickStrength.value = clickStrength;

      const targetAudio = isRunning() ? getAverageLevel() : 0;
      uniforms.uAudioLevel.value +=
        (targetAudio - uniforms.uAudioLevel.value) * 0.15;

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("pointerdown", onPointerDown);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      container?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      aria-hidden="true"
    />
  );
}
