let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!sharedAudioCtx) {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      sharedAudioCtx = new AudioCtx();
    }
  }
  if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

export function playNewsJingle(): void {
  const c = getAudioContext();
  if (!c) return;
  const now = c.currentTime;
  const notes = [
    { f: 523.25, t: 0.0, d: 0.14 },
    { f: 659.25, t: 0.12, d: 0.14 },
    { f: 783.99, t: 0.24, d: 0.14 },
    { f: 1046.5, t: 0.38, d: 0.75 },
    { f: 523.25, t: 0.38, d: 0.75 },
    { f: 783.99, t: 0.38, d: 0.75 },
    { f: 130.81, t: 0.38, d: 0.85 },
  ];

  notes.forEach((n) => {
    const osc = c.createOscillator();
    const filter = c.createBiquadFilter();
    const gain = c.createGain();
    osc.type = n.f < 200 ? 'triangle' : 'sawtooth';
    osc.frequency.setValueAtTime(n.f, now + n.t);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2400, now + n.t);
    filter.frequency.exponentialRampToValueAtTime(900, now + n.t + n.d);
    gain.gain.setValueAtTime(0.001, now + n.t);
    gain.gain.linearRampToValueAtTime(n.f < 200 ? 0.3 : 0.12, now + n.t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(c.destination);
    osc.start(now + n.t);
    osc.stop(now + n.t + n.d + 0.02);
  });
}

export function playShutter(): void {
  const c = getAudioContext();
  if (!c) return;
  const now = c.currentTime;
  [0, 0.065].forEach((offset, idx) => {
    const t = now + offset;
    const bufSize = Math.floor(c.sampleRate * 0.03);
    const buf = c.createBuffer(1, bufSize, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufSize * 0.18));
    }
    const src = c.createBufferSource();
    src.buffer = buf;
    const hp = c.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.setValueAtTime(idx === 0 ? 1800 : 2600, t);
    const g = c.createGain();
    g.gain.setValueAtTime(0.35, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
    src.connect(hp);
    hp.connect(g);
    g.connect(c.destination);
    src.start(t);
  });
}

export function playStampSound(): void {
  const c = getAudioContext();
  if (!c) return;
  const now = c.currentTime;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(165, now);
  osc.frequency.exponentialRampToValueAtTime(48, now + 0.09);
  gain.gain.setValueAtTime(0.42, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(now);
  osc.stop(now + 0.12);
}

export function stopSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function speakFrench(
  text: string,
  options?: {
    rate?: number;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: () => void;
  }
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'fr-FR';
  utterance.rate = options?.rate ?? 1.02;
  utterance.onstart = () => options?.onStart?.();
  utterance.onend = () => options?.onEnd?.();
  utterance.onerror = () => options?.onError?.();
  window.speechSynthesis.speak(utterance);
  return true;
}
