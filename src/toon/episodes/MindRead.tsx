import React from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import voice from './mindread.voice.json';
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
  every: L(2).start,
  secret: L(3).start,
  lie: L(4).start,
  hear: L(5).start,
  about: L(6).start,
  themselves: L(7).start,
  world: L(8).start,
  overwhelming: L(9).start,
  voices: L(10).start,
  fears: L(11).start,
  dreams: L(12).start,
  learn: L(13).start,
  scared: L(14).start,
  lonely: L(15).start,
  loved: L(16).start,
  secret2: L(17).start,
  same: L(18).start,
  deep: L(19).start,
  want: L(20).start,
  connection: L(21).start,
  understanding: L(22).start,
  choose: L(23).start,
  end: L(23).start,
  last: L(23).start,
};

const CAM = (s: number, cx: number, cy: number) => {
  cx = clamp(cx, 960 / s, 1920 - 960 / s); cy = clamp(cy, 540 / s, 1080 - 540 / s);
  return `translate(960 540) scale(${s}) translate(${-cx} ${-cy})`;
};

// Thought bubble component
const ThoughtBubble: React.FC<{x: number; y: number; text: string; opacity: number; size: number}> = ({x, y, text, opacity, size}) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity}>
    <ellipse cx="0" cy="0" rx={size * 3} ry={size * 1.5} fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
    <text x="0" y="5" textAnchor="middle" fill="white" fontSize={size * 0.8} fontFamily="sans-serif" opacity={0.9}>{text}</text>
  </g>
);

// Abstract mind-space background
const MindBg: React.FC<{color1: string; color2: string}> = ({color1, color2}) => (
  <defs>
    <radialGradient id="mindbg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stopColor={color1} />
      <stop offset="100%" stopColor={color2} />
    </radialGradient>
  </defs>
);

// Scene 1: Waking up - character in dark space, thought bubbles
const S1: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const s = 2.0, at = {x: 960, y: 500, s};
  const body = t < IS.every ? 'idle' : 'whatif';
  const face = {open:1, wide: t < IS.every ? 0.2 : 0.7, brow: t < IS.every ? 0.1 : 0.8, mouthOpen: t < IS.every ? 0.1 : 0.4, smile: 0};
  face.open *= blinkAt(f, [Math.round(IS.every * fps)]);
  const bubbleOpacity = clamp((t - IS.every) / 0.5);
  return (
    <g>
      <rect width={1920} height={1080} fill="url(#mindbg)" />
      <MindBg color1="#1a0a2e" color2="#0a0a1a" />
      <ThoughtBubble x={400} y={200} text="..." opacity={bubbleOpacity * 0.6} size={30} />
      <ThoughtBubble x={1500} y={250} text="?" opacity={bubbleOpacity * 0.5} size={25} />
      <ThoughtBubble x={700} y={150} text="!" opacity={bubbleOpacity * 0.7} size={28} />
      <HumanChar pose={body} x={at.x} y={at.y} scale={at.s} face={face as any} t={t} />
      <TitleCard f={f} fps={fps} at={IS.wake} title="READ MINDS" kicker="Every thought" />
    </g>
  );
};

// Scene 2: Every thought, every secret, every lie
const S2: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const s = 2.2, at = {x: 960, y: 500, s};
  const body = t < IS.secret ? 'idle' : 'think';
  const face = {open:1, wide: t < IS.secret ? 0.3 : 0.6, brow: t < IS.secret ? 0.2 : 0.7, mouthOpen: t < IS.secret ? 0.1 : 0.3, smile: 0};
  face.open *= blinkAt(f, [Math.round(IS.secret * fps)]);
  const b1 = clamp((t - IS.every) / 0.4);
  const b2 = clamp((t - IS.secret) / 0.4);
  const b3 = clamp((t - IS.lie) / 0.4);
  return (
    <g>
      <rect width={1920} height={1080} fill="url(#mindbg)" />
      <MindBg color1="#2a0a3e" color2="#0a0a1a" />
      <ThoughtBubble x={300} y={200} text="Every thought" opacity={b1 * 0.7} size={22} />
      <ThoughtBubble x={960} y={150} text="Every secret" opacity={b2 * 0.7} size={22} />
      <ThoughtBubble x={1600} y={220} text="Every lie" opacity={b3 * 0.7} size={22} />
      <HumanChar pose={body} x={at.x} y={at.y} scale={at.s} face={face as any} t={t} />
      <NumberCard f={f} fps={fps} at={IS.every} value="Every" caption="Thought" x={300} y={350} size={24} accent="#cc88ff" />
      <NumberCard f={f} fps={fps} at={IS.secret} value="Every" caption="Secret" x={960} y={300} size={24} accent="#cc88ff" />
      <NumberCard f={f} fps={fps} at={IS.lie} value="Every" caption="Lie" x={1600} y={380} size={24} accent="#cc88ff" />
    </g>
  );
};

// Scene 3: Hear what people really think - multiple characters
const S3: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const s = 1.6, at1 = {x: 300, y: 500, s};
  const at2 = {x: 960, y: 450, s};
  const at3 = {x: 1600, y: 520, s};
  const body1 = 'talk';
  const body2 = 'think';
  const body3 = 'whatif';
  const face1 = {open:1, wide:0.4, brow:0.5, mouthOpen:0.3, smile:0.1};
  const face2 = {open:1, wide:0.6, brow:0.7, mouthOpen:0.1, smile:0};
  const face3 = {open:1, wide:0.5, brow:0.6, mouthOpen:0.4, smile:0.2};
  face1.open *= blinkAt(f, [Math.round(IS.hear * fps)]);
  face2.open *= blinkAt(f, [Math.round(IS.about * fps)]);
  face3.open *= blinkAt(f, [Math.round(IS.themselves * fps)]);
  const b1 = clamp((t - IS.hear) / 0.4);
  const b2 = clamp((t - IS.about) / 0.4);
  const b3 = clamp((t - IS.themselves) / 0.4);
  return (
    <g>
      <rect width={1920} height={1080} fill="url(#mindbg)" />
      <MindBg color1="#3a0a4e" color2="#0a0a1a" />
      <ThoughtBubble x={300} y={250} text="What they think" opacity={b1 * 0.6} size={18} />
      <ThoughtBubble x={960} y={200} text="About you" opacity={b2 * 0.6} size={18} />
      <ThoughtBubble x={1600} y={270} text="About themselves" opacity={b3 * 0.6} size={18} />
      <HumanChar pose={body1} x={at1.x} y={at1.y} scale={s} face={face1 as any} t={t} />
      <HumanChar pose={body2} x={at2.x} y={at2.y} scale={s} face={face2 as any} t={t} />
      <HumanChar pose={body3} x={at3.x} y={at3.y} scale={s} face={face3 as any} t={t} />
    </g>
  );
};

// Scene 4: Overwhelming - voices, fears, dreams
const S4: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const s = 2.0, at = {x: 960, y: 500, s};
  const body = t < IS.overwhelming ? 'idle' : 'whatif';
  const face = {open:1, wide: t < IS.overwhelming ? 0.3 : 0.9, brow: t < IS.overwhelming ? 0.2 : 0.9, mouthOpen: t < IS.overwhelming ? 0.1 : 0.5, smile: 0};
  face.open *= blinkAt(f, [Math.round(IS.overwhelming * fps)]);
  const v1 = clamp((t - IS.voices) / 0.4);
  const v2 = clamp((t - IS.fears) / 0.4);
  const v3 = clamp((t - IS.dreams) / 0.4);
  return (
    <g>
      <rect width={1920} height={1080} fill="url(#mindbg)" />
      <MindBg color1="#4a0a5e" color2="#0a0a1a" />
      <ThoughtBubble x={400} y={200} text="So many voices" opacity={v1 * 0.6} size={20} />
      <ThoughtBubble x={960} y={150} text="So many fears" opacity={v2 * 0.6} size={20} />
      <ThoughtBubble x={1500} y={220} text="So many dreams" opacity={v3 * 0.6} size={20} />
      <HumanChar pose={body} x={at.x} y={at.y} scale={at.s} face={face as any} t={t} />
      <NumberCard f={f} fps={fps} at={IS.voices} value="Voices" caption="Everywhere" x={400} y={350} size={24} accent="#cc88ff" />
      <NumberCard f={f} fps={fps} at={IS.fears} value="Fears" caption="Hidden" x={960} y={300} size={24} accent="#cc88ff" />
      <NumberCard f={f} fps={fps} at={IS.dreams} value="Dreams" caption="Shared" x={1500} y={380} size={24} accent="#cc88ff" />
    </g>
  );
};

// Scene 5: The secret - everyone is scared, lonely, wants love
const S5: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const s = 2.0, at1 = {x: 400, y: 500, s};
  const at2 = {x: 1000, y: 450, s};
  const body1 = 'think';
  const body2 = 'talk';
  const face1 = {open:1, wide:0.3, brow:0.4, mouthOpen:0.2, smile:0.2};
  const face2 = {open:1, wide:0.3, brow:0.4, mouthOpen:0.4, smile:0.3};
  face1.open *= blinkAt(f, [Math.round(IS.scared * fps)]);
  face2.open *= blinkAt(f, [Math.round(IS.lonely * fps)]);
  const s1 = clamp((t - IS.scared) / 0.4);
  const s2 = clamp((t - IS.lonely) / 0.4);
  const s3 = clamp((t - IS.loved) / 0.4);
  return (
    <g>
      <rect width={1920} height={1080} fill="url(#mindbg)" />
      <MindBg color1="#2a1a3e" color2="#0a0a1a" />
      <ThoughtBubble x={400} y={200} text="Everyone is scared" opacity={s1 * 0.6} size={18} />
      <ThoughtBubble x={960} y={150} text="Everyone is lonely" opacity={s2 * 0.6} size={18} />
      <ThoughtBubble x={1500} y={220} text="Everyone wants love" opacity={s3 * 0.6} size={18} />
      <HumanChar pose={body1} x={at1.x} y={at1.y} scale={s} face={face1 as any} t={t} />
      <HumanChar pose={body2} x={at2.x} y={at2.y} scale={s} face={face2 as any} t={t} />
      <NumberCard f={f} fps={fps} at={IS.scared} value="Scared" caption="Everyone" x={400} y={350} size={24} accent="#ff88cc" />
      <NumberCard f={f} fps={fps} at={IS.lonely} value="Lonely" caption="Everyone" x={960} y={300} size={24} accent="#ff88cc" />
      <NumberCard f={f} fps={fps} at={IS.loved} value="Wants love" caption="Everyone" x={1500} y={380} size={24} accent="#ff88cc" />
    </g>
  );
};

// Scene 6: The answer - choose kindness
const S6: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const s = 2.2, at = {x: 960, y: 500, s};
  const body = 'think';
  const face = {open:1, wide:0.2, brow:0.2, mouthOpen:0.1, smile:0.5};
  face.open *= blinkAt(f, [Math.round(IS.choose * fps)]);
  const c1 = clamp((t - IS.choose) / 0.5);
  return (
    <g>
      <rect width={1920} height={1080} fill="url(#mindbg)" />
      <MindBg color1="#1a2a3e" color2="#0a0a1a" />
      <ThoughtBubble x={960} y={200} text="Choose kindness" opacity={c1 * 0.7} size={28} />
      <HumanChar pose={body} x={at.x} y={at.y} scale={at.s} face={face as any} t={t} />
      <TitleCard f={f} fps={fps} at={IS.choose} title="Choose" kicker="Kindness" />
    </g>
  );
};

export const MindRead: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const scenes = [
    {from: 0, to: IS.every, C: S1},
    {from: IS.every, to: IS.hear, C: S2},
    {from: IS.hear, to: IS.overwhelming, C: S3},
    {from: IS.overwhelming, to: IS.scared, C: S4},
    {from: IS.scared, to: IS.choose, C: S5},
    {from: IS.choose, to: IS_SEC, C: S6},
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
      <Audio src={staticFile('internet-short/mix6.wav')} />
      <svg width={1920} height={1080} viewBox="0 0 1920 1080" opacity={opacity}>
        <C t={t} f={frame} fps={fps} />
      </svg>
      <Subtitles lines={voice.lines} f={frame} fps={fps} total={IS_SEC} bottom={120} />
    </AbsoluteFill>
  );
};
