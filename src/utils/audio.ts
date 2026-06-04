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

function playTone(frequency: number, duration = 0.16): void {
  const audioContext = getAudioContext();
  if (!audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.frequency.value = frequency;
  oscillator.type = "sine";
  gain.gain.setValueAtTime(0.08, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

export function playCorrectSound(): void {
  playTone(740, 0.18);
}

export function playIncorrectSound(): void {
  playTone(220, 0.22);
}

export function playTimeoutSound(): void {
  playTone(150, 0.28);
}
