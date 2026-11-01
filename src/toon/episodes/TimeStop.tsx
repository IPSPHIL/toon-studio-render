import React from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import voice from './timestop.voice.json';
import {HumanChar} from '../characters/HumanChar';
import {THEMES} from '../lib/fx';
import {NumberCard, TitleCard} from '../ui/Info';
import {Subtitles} from '../ui/Captions';
import {blinkAt, clamp, easeInOut, lerp, ramp} from '../lib/anim';

export const IS_FPS = 30;
export const IS_SEC = Math.ceil(voice.total * 10) / 10;
const L = (i: number) => voice.lines[i];

export const IS = {
  wake: L(1).start,
  freezes: L(2).start,
  bird: L(3).start,
  drop: L(4).start,
  suspended: L(5).start,
  people: L(6).start,
  midstep: L(7).start,
  midlaugh: L(8).start,
  midtear: L(9).start,
  painting: L(10).start,
  photograph: L(11).start,
  walk: L(12).start,
  touch: L(13).start,
  look: L(14).start,
  joy: L(15).start,
  pain: L(16).start,
  see: L(17).start,
  beautiful: L(18).start,
  moment: L(19).start,
  precious: L(20).start,
  fragile: L(21).start,
  enemy: L(22).start,
  canvas: L(23).start,
  stroke: L(24).start,
  color: L(25).start,
  stopped: L(26).start,
  finally: L(26).start + 1,
  life: L(26).start + 2,
  art: L(26).start + 3,
  end: L(26).start,
  last: L(26).start,
};

const CAM = (s: number, cx: number, cy: number) => {
  cx = clamp(cx, 960 / s, 1920 - 960 / s); cy = clamp(cy, 540 / s, 1080 - 540 / s);
  return `translate(960 540) scale(${s}) translate(${-cx} ${-cy})`;
};

// Frozen particle component
const FrozenParticle: React.FC<{x: number; y: number; size: number; opacity: number; color: string}> = ({x, y, size, opacity, color}) => (
  <circle cx={x} cy={y} r={size} fill={color} opacity={opacity} />
);

// Frozen raindrop component
const FrozenDrop: React.FC<{x: number; y: number; opacity: number}> = ({x, y, opacity}) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity}>
    <ellipse cx="0" cy="0" rx="3" ry="8" fill="rgba(100,180,255,0.6)" />
    <ellipse cx="0" cy="-12" rx="2" ry="5" fill="rgba(100,180,255,0.4)" />
  </g>
);

// Painting background
const PaintingBg: React.FC<{color1: string; color2: string; color3: string}> = ({color1, color2, color3}) => (
  <defs>
    <linearGradient id="paintbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor={color1} />
      <stop offset="50%" stopColor={color2} />
      <stop offset="100%" stopColor={color3} />
    </linearGradient>
  </defs>
);

// Scene 1: Everything freezes - character in frozen world
const S1: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const s = 2.0, at = {x: 960, y: 500, s};
  const body = t < IS.freezes ? 'idle' : 'whatif';
  const face = {open:1, wide: t < IS.freezes ? 0.2 : 0.7, brow: t < IS.freezes ? 0.1 : 0.8, mouthOpen: t < IS.freezes ? 0.1 : 0.4, smile: 0};
  face.open *= blinkAt(f, [Math.round(IS.freezes * fps)]);
  const particleOpacity = clamp((t - IS.freezes) / 0.5);
  return (
    <g>
      <rect width={1920} height={1080} fill="url(#paintbg)" />
      <PaintingBg color1="#2a2a3e" color2="#1a1a2e" color3="#0a0a1a" />
      {Array.from({length: 30}).map((_, i) => (
        <FrozenParticle key={i} x={100 + i * 60} y={50 + (i * 37) % 900} size={2 + (i % 4)} opacity={particleOpacity * (0.3 + (i % 5) * 0.1)} color="rgba(200,200,255,0.6)" />
      ))}
      {Array.from({length: 15}).map((_, i) => (
        <FrozenDrop key={`d${i}`} x={200 + i * 120} y={100 + (i * 53) % 800} opacity={particleOpacity * (0.4 + (i % 3) * 0.15)} />
      ))}
      <HumanChar pose={body} x={at.x} y={at.y} scale={at.s} face={face as any} t={t} />
      <TitleCard f={f} fps={fps} at={IS.wake} title="TIME STOPPED" kicker="Everything freezes" />
    </g>
  );
};

// Scene 2: Bird mid-flight, rain suspended
const S2: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const s = 2.2, at = {x: 960, y: 500, s};
  const body = t < IS.bird ? 'idle' : 'point';
  const face = {open:1, wide: t < IS.bird ? 0.3 : 0.6, brow: t < IS.bird ? 0.2 : 0.5, mouthOpen: t < IS.bird ? 0.1 : 0.3, smile: t < IS.bird ? 0 : 0.2};
  face.open *= blinkAt(f, [Math.round(IS.bird * fps)]);
  const b1 = clamp((t - IS.bird) / 0.4);
  const b2 = clamp((t - IS.drop) / 0.4);
  const b3 = clamp((t - IS.suspended) / 0.4);
  return (
    <g>
      <rect width={1920} height={1080} fill="url(#paintbg)" />
      <PaintingBg color1="#3a2a4e" color2="#2a1a3e" color3="#1a0a2e" />
      {Array.from({length: 25}).map((_, i) => (
        <FrozenParticle key={i} x={50 + i * 75} y={30 + (i * 41) % 950} size={1.5 + (i % 3)} opacity={0.4 + (i % 4) * 0.1} color="rgba(180,180,255,0.5)" />
      ))}
      {Array.from({length: 20}).map((_, i) => (
        <FrozenDrop key={`d${i}`} x={100 + i * 90} y={80 + (i * 47) % 850} opacity={0.5 + (i % 3) * 0.12} />
      ))}
      <HumanChar pose={body} x={at.x} y={at.y} scale={at.s} face={face as any} t={t} />
      <NumberCard f={f} fps={fps} at={IS.bird} value="Frozen" caption="Bird mid-flight" x={300} y={200} size={24} accent="#aabbff" />
      <NumberCard f={f} fps={fps} at={IS.drop} value="Suspended" caption="Rain drops" x={960} y={150} size={24} accent="#aabbff" />
      <NumberCard f={f} fps={fps} at={IS.suspended} value="Still" caption="Everything" x={1600} y={220} size={24} accent="#aabbff" />
    </g>
  );
};

// Scene 3: People frozen - multiple characters
const S3: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const s = 1.6, at1 = {x: 300, y: 500, s};
  const at2 = {x: 960, y: 450, s};
  const at3 = {x: 1600, y: 520, s};
  const body1 = 'idle';
  const body2 = 'talk';
  const body3 = 'think';
  const face1 = {open:1, wide:0.3, brow:0.2, mouthOpen:0.2, smile:0.4};
  const face2 = {open:1, wide:0.5, brow:0.6, mouthOpen:0.5, smile:0.6};
  const face3 = {open:1, wide:0.2, brow:0.7, mouthOpen:0.1, smile:-0.2};
  face1.open *= blinkAt(f, [Math.round(IS.people * fps)]);
  face2.open *= blinkAt(f, [Math.round(IS.midlaugh * fps)]);
  face3.open *= blinkAt(f, [Math.round(IS.midtear * fps)]);
  return (
    <g>
      <rect width={1920} height={1080} fill="url(#paintbg)" />
      <PaintingBg color1="#4a3a5e" color2="#3a2a4e" color3="#2a1a3e" />
      {Array.from({length: 20}).map((_, i) => (
        <FrozenParticle key={i} x={80 + i * 90} y={40 + (i * 33) % 980} size={1 + (i % 3)} opacity={0.3 + (i % 4) * 0.1} color="rgba(220,200,255,0.5)" />
      ))}
      <HumanChar pose={body1} x={at1.x} y={at1.y} scale={s} face={face1 as any} t={t} />
      <HumanChar pose={body2} x={at2.x} y={at2.y} scale={s} face={face2 as any} t={t} />
      <HumanChar pose={body3} x={at3.x} y={at3.y} scale={s} face={face3 as any} t={t} />
      <NumberCard f={f} fps={fps} at={IS.people} value="Frozen" caption="Mid-step" x={300} y={200} size={24} accent="#ddaaff" />
      <NumberCard f={f} fps={fps} at={IS.midlaugh} value="Frozen" caption="Mid-laugh" x={960} y={150} size={24} accent="#ddaaff" />
      <NumberCard f={f} fps={fps} at={IS.midtear} value="Frozen" caption="Mid-tear" x={1600} y={220} size={24} accent="#ddaaff" />
    </g>
  );
};

// Scene 4: Walking through frozen world
const S4: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const s = 2.0, at = {x: 960, y: 500, s};
  const body = t < IS.walk ? 'idle' : 'think';
  const face = {open:1, wide: t < IS.walk ? 0.2 : 0.5, brow: t < IS.walk ? 0.1 : 0.4, mouthOpen: t < IS.walk ? 0.1 : 0.2, smile: t < IS.walk ? 0 : 0.3};
  face.open *= blinkAt(f, [Math.round(IS.walk * fps)]);
  const p1 = clamp((t - IS.touch) / 0.4);
  const p2 = clamp((t - IS.look) / 0.4);
  return (
    <g>
      <rect width={1920} height={1080} fill="url(#paintbg)" />
      <PaintingBg color1="#2a3a4e" color2="#1a2a3e" color3="#0a1a2e" />
      {Array.from({length: 35}).map((_, i) => (
        <FrozenParticle key={i} x={30 + i * 55} y={20 + (i * 29) % 1020} size={1.5 + (i % 4)} opacity={0.25 + (i % 5) * 0.1} color="rgba(200,220,255,0.5)" />
      ))}
      <HumanChar pose={body} x={at.x} y={at.y} scale={at.s} face={face as any} t={t} />
      <NumberCard f={f} fps={fps} at={IS.touch} value="Touch" caption="Frozen rain" x={400} y={200} size={24} accent="#bbccff" />
      <NumberCard f={f} fps={fps} at={IS.look} value="Look" caption="Frozen faces" x={1500} y={220} size={24} accent="#bbccff" />
    </g>
  );
};

// Scene 5: Joy and pain
const S5: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const s = 2.0, at1 = {x: 400, y: 500, s};
  const at2 = {x: 1000, y: 450, s};
  const body1 = 'idle';
  const body2 = 'think';
  const face1 = {open:1, wide:0.3, brow:0.2, mouthOpen:0.2, smile:0.6};
  const face2 = {open:1, wide:0.2, brow:0.5, mouthOpen:0.1, smile:-0.3};
  face1.open *= blinkAt(f, [Math.round(IS.joy * fps)]);
  face2.open *= blinkAt(f, [Math.round(IS.pain * fps)]);
  const j1 = clamp((t - IS.joy) / 0.4);
  const p1 = clamp((t - IS.pain) / 0.4);
  return (
    <g>
      <rect width={1920} height={1080} fill="url(#paintbg)" />
      <PaintingBg color1="#3a2a4e" color2="#2a1a3e" color3="#1a0a2e" />
      <ThoughtBubble x={400} y={200} text="Joy" opacity={j1 * 0.7} size={24} />
      <ThoughtBubble x={1000} y={150} text="Pain" opacity={p1 * 0.7} size={24} />
      <HumanChar pose={body1} x={at1.x} y={at1.y} scale={s} face={face1 as any} t={t} />
      <HumanChar pose={body2} x={at2.x} y={at2.y} scale={s} face={face2 as any} t={t} />
      <NumberCard f={f} fps={fps} at={IS.joy} value="Joy" caption="Frozen in time" x={400} y={350} size={24} accent="#ddaaff" />
      <NumberCard f={f} fps={fps} at={IS.pain} value="Pain" caption="Frozen in time" x={1000} y={300} size={24} accent="#ddaaff" />
    </g>
  );
};

// Scene 6: Life is art
const S6: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const s = 2.2, at = {x: 960, y: 500, s};
  const body = 'think';
  const face = {open:1, wide:0.2, brow:0.2, mouthOpen:0.1, smile:0.5};
  face.open *= blinkAt(f, [Math.round(IS.end * fps)]);
  const c1 = clamp((t - IS.end) / 0.5);
  return (
    <g>
      <rect width={1920} height={1080} fill="url(#paintbg)" />
      <PaintingBg color1="#1a2a3e" color2="#0a1a2e" color3="#0a0a1a" />
      {Array.from({length: 40}).map((_, i) => (
        <FrozenParticle key={i} x={20 + i * 48} y={10 + (i * 23) % 1060} size={1 + (i % 3)} opacity={0.2 + (i % 4) * 0.08} color="rgba(200,200,255,0.4)" />
      ))}
      <HumanChar pose={body} x={at.x} y={at.y} scale={at.s} face={face as any} t={t} />
      <TitleCard f={f} fps={fps} at={IS.end} title="Life is art" kicker="Every second a stroke" />
    </g>
  );
};

export const TimeStop: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const scenes = [
    {from: 0, to: IS.freezes, C: S1},
    {from: IS.freezes, to: IS.people, C: S2},
    {from: IS.people, to: IS.walk, C: S3},
    {from: IS.walk, to: IS.joy, C: S4},
    {from: IS.joy, to: IS.end, C: S5},
    {from: IS.end, to: IS_SEC, C: S6},
  ];
  const cur = scenes.find(s => t >= s.from && t < s.to) || scenes[scenes.length - 1];
  const C = cur.C;
  const sceneStart = cur.from;
  const sceneEnd = cur.to;
  const fadeIn = clamp((t - sceneStart) / 0.4);
  const fadeOut = clamp((sceneEnd - t) / 0.3);
  const opacity = Math.min(fadeIn, fadeOut);
  return (
    <AbsoluteFill style={{background: '#0a0a1a'}}>
      <Audio src={staticFile('internet-short/mix7.wav')} />
      <svg width={1920} height={1080} viewBox="0 0 1920 1080" opacity={opacity}>
        <C t={t} f={frame} fps={fps} />
      </svg>
      <Subtitles lines={voice.lines} f={frame} fps={fps} total={IS_SEC} bottom={120} />
    </AbsoluteFill>
  );
};
