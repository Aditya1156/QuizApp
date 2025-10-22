// Sound effects for the quiz app
// Note: Add actual audio files to public/sounds/ directory

class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private enabled: boolean = true;
  private volume: number = 0.5;

  constructor() {
    this.initSounds();
    // Load sound preference from localStorage
    const savedEnabled = localStorage.getItem('soundEnabled');
    this.enabled = savedEnabled !== 'false';
  }

  private initSounds() {
    const soundFiles = {
      correct: '/sounds/correct.mp3',
      wrong: '/sounds/wrong.mp3',
      tick: '/sounds/tick.mp3',
      countdown: '/sounds/countdown.mp3',
      applause: '/sounds/applause.mp3',
      whoosh: '/sounds/whoosh.mp3',
      join: '/sounds/join.mp3',
    };

    Object.entries(soundFiles).forEach(([key, path]) => {
      const audio = new Audio(path);
      audio.volume = this.volume;
      audio.preload = 'auto';
      this.sounds.set(key, audio);
    });
  }

  // Try to unlock audio on browsers that require a user gesture
  async unlock() {
    try {
      // Try WebAudio API resume
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        if (ctx.state === 'suspended') {
          await ctx.resume();
        }
        // create a short silent oscillator to ensure audio is unlocked
        const gain = ctx.createGain();
        gain.gain.value = 0;
        const osc = ctx.createOscillator();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.01);
      }

      // Also try to play a tiny buffered audio element to prompt permission
      const test = new Audio();
      test.src = '';
      // calling play without src will likely do nothing, but attempt to call it to satisfy gestures
      try { await test.play(); } catch (e) { /* ignore */ }
      return true;
    } catch (err) {
      console.warn('Audio unlock failed', err);
      return false;
    }
  }

  play(soundName: string) {
    if (!this.enabled) return;
    
    const sound = this.sounds.get(soundName);
    if (sound) {
      // Reset to start if already playing
      sound.currentTime = 0;
      sound.play().catch((error) => {
        console.warn('Sound play failed:', error);
      });
    }
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.sounds.forEach(sound => {
      sound.volume = this.volume;
    });
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('soundEnabled', this.enabled.toString());
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }
}

// Create singleton instance
export const soundManager = new SoundManager();

// Convenience functions
export const playSound = (soundName: string) => soundManager.play(soundName);
export const toggleSound = () => soundManager.toggle();
export const isSoundEnabled = () => soundManager.isEnabled();
