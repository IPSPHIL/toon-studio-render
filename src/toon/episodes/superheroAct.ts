import voice from './superhero.voice.json';
import {blinkAt, easeInOut, kick, lerp, ramp} from '../lib/anim';

export const SU_FPS = 30;
export const SU_SEC = Math.ceil(voice.total * 10) / 10;
export const VOICE = voice;
const L = (i: number) => voice.lines[i];
const W = (w: string) => voice.lines.flatMap((l) => l.words).find((x) => x.w.toLowerCase().startsWith(w.toLowerCase()))!.t;

export const BEATS = {
  intro: L(0).start,
  name: L(1).start,
  power: L(2).start,
  darkness: L(4).start,
  villain: L(4).start,
  battle: L(4).start,
  unleash: L(4).start,
  victory: L(4).start,
  saved: L(4).start,
  end: L(4).start,
};

export const act = (f: number, fps: number) => {
  const t = f / fps;
  const F = (s: number) => s * fps;
  const fOff = F(BEATS.darkness);
  const dark = ramp(f, fOff, fOff + 5);
  const tense = ramp(f, fOff, fOff + 4);
  const toCam = ramp(t, BEATS.end - 0.1, BEATS.end + 0.4, easeInOut);
  const breathe = Math.sin(2 * Math.PI * t * lerp(1 / 3.4, 1 / 2.1, tense)) * (1 + tense * 0.6);
  const blink = blinkAt(f, [38, 112, Math.round(F(BEATS.battle)) + 30, Math.round(F(BEATS.end)) + 20]);
  const face = {
    yaw: lerp(0.1, 0, toCam),
    pitch: lerp(0.3, 0, toCam),
    open: Math.min(lerp(0.82, 1, tense), blink),
    wide: tense * 0.5 * (1 - 0.5 * toCam),
    lookX: lerp(0.15, 0, toCam),
    lookY: lerp(0.3, 0, toCam),
    brow: tense * 0.5, browTilt: tense * 0.4,
    mouthW: 1 - tense * 0.3,
    mouthOpen: tense * 0.4 * (1 - ramp(f, fOff + 24, fOff + 48)),
    smile: 0.14 - tense * 0.3 + toCam * 0.15,
  };
  return {t, fOff, lamp: 1, lit: 1, dark, jolt: 0, tense, win: 0, down: 0, toCam, breathe, face,
    mugHop: 0, shake: {x: 0, y: 0}};
};
export type Act = ReturnType<typeof act>;
