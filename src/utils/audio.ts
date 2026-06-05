type AudioContextConstructor = new () => AudioContext;

function getAudioContext(): AudioContext | null {
  const AudioCtor =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: AudioContextConstructor }).webkitAudioContext;

  if (!AudioCtor) return null;

  try {
    return new AudioCtor();
  } catch {
    return null;
  }
}

type ToneType = OscillatorType;

interface ToneOptions {
  frequency: number;
  duration?: number;
  volume?: number;
  type?: ToneType;
}

function playTone({ frequency, duration = 0.16, volume = 0.08, type = "sine" }: ToneOptions): void {
  const audioContext = getAudioContext();
  if (!audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.frequency.value = frequency;
  oscillator.type = type;
  gain.gain.setValueAtTime(volume, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

export function playCorrectSound(): void {
  playTone({ frequency: 740, duration: 0.18, volume: 0.08, type: "sine" });
}

export function playIncorrectSound(): void {
  playTone({ frequency: 196, duration: 0.26, volume: 0.14, type: "square" });
}

export function playTimeoutSound(): void {
  playTone({ frequency: 150, duration: 0.28, volume: 0.12, type: "sawtooth" });
}
