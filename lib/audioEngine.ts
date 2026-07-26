let ctx: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let masterGain: GainNode | null = null;
let liveNodes: AudioNode[] = [];
let running = false;

export function isRunning() {
  return running;
}

export function getAnalyser() {
  return analyser;
}

export function getAverageLevel(): number {
  if (!analyser) return 0;
  const data = new Uint8Array(analyser.frequencyBinCount) as Uint8Array<ArrayBuffer>;
  analyser.getByteFrequencyData(data);
  let sum = 0;
  for (let i = 0; i < data.length; i++) sum += data[i];
  return sum / data.length / 255;
}

export function startAmbient() {
  if (running) return;

  const AudioContextCtor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext;
  ctx = new AudioContextCtor();

  masterGain = ctx.createGain();
  masterGain.gain.value = 0;

  analyser = ctx.createAnalyser();
  analyser.fftSize = 128;
  analyser.smoothingTimeConstant = 0.82;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1400;

  // Moody, slowly drifting chord — a generative ambient bed, not a fixed loop.
  const chord = [98, 146.83, 174.61, 220];
  liveNodes = [];

  chord.forEach((freq, i) => {
    const osc = ctx!.createOscillator();
    osc.type = i % 2 === 0 ? "sine" : "triangle";
    osc.frequency.value = freq;

    const lfo = ctx!.createOscillator();
    lfo.frequency.value = 0.05 + i * 0.02;
    const lfoGain = ctx!.createGain();
    lfoGain.gain.value = 3;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    const oscGain = ctx!.createGain();
    oscGain.gain.value = 0.1;

    osc.connect(oscGain);
    oscGain.connect(filter);
    osc.start();
    lfo.start();

    liveNodes.push(osc, lfo, lfoGain, oscGain);

    // Octave-up shimmer partial — spreads spectral energy higher so the
    // visualizer isn't just a single dense low bin.
    const shimmer = ctx!.createOscillator();
    shimmer.type = "sine";
    shimmer.frequency.value = freq * 2;
    const shimmerGain = ctx!.createGain();
    shimmerGain.gain.value = 0.035;
    shimmer.connect(shimmerGain);
    shimmerGain.connect(filter);
    shimmer.start();
    liveNodes.push(shimmer, shimmerGain);
  });

  filter.connect(analyser);
  analyser.connect(masterGain);
  masterGain.connect(ctx.destination);

  const now = ctx.currentTime;
  masterGain.gain.linearRampToValueAtTime(0.3, now + 1.4);
  running = true;
}

export function stopAmbient() {
  if (!ctx || !masterGain) {
    running = false;
    return;
  }
  const now = ctx.currentTime;
  masterGain.gain.linearRampToValueAtTime(0, now + 0.6);
  const closingCtx = ctx;
  const nodesToStop = liveNodes;
  running = false;
  liveNodes = [];
  setTimeout(() => {
    nodesToStop.forEach((n) => {
      try {
        (n as OscillatorNode).stop?.();
      } catch {
        // already stopped
      }
      n.disconnect();
    });
    closingCtx.close();
  }, 700);
  ctx = null;
  analyser = null;
  masterGain = null;
}
