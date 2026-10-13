import type { GameEvent } from '../game/types';

export class AudioFeedback {
  enabled = false;
  private context: AudioContext | null = null;
  toggle(): boolean {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.context ??= new AudioContext();
      void this.context.resume();
    }
    return this.enabled;
  }
  play(event: GameEvent): void {
    if (!this.enabled || !this.context || this.context.state !== 'running') return;
    if (!['last-hit', 'cast', 'end'].includes(event.type)) return;
    const oscillator = this.context.createOscillator(), gain = this.context.createGain();
    const now = this.context.currentTime;
    oscillator.type = event.type === 'cast' ? 'triangle' : 'sine';
    oscillator.frequency.setValueAtTime(event.type === 'last-hit' ? 740 : event.type === 'end' ? 440 : 280, now);
    oscillator.frequency.exponentialRampToValueAtTime(event.type === 'last-hit' ? 1046 : 180, now + 0.12);
    gain.gain.setValueAtTime(0.035, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
    oscillator.connect(gain); gain.connect(this.context.destination);
    oscillator.start(now); oscillator.stop(now + 0.18);
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
  }
}
