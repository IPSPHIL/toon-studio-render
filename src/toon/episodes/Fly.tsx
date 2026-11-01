import React from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import voice from './fly.voice.json';
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
  float: L(2).start,
  soar: L(3).start,
  above: L(4).start,
  mountains: L(5).start,
  clouds: L(6).start,
  small: L(7).start,
  borders: L(8).start,
  connected: L(9).start,
  understand: L(10).start,
  one: L(11).start,
  sky: L(12).start,
  earth: L(13).start,
  family: L(14).start,
  flying: L(15).start,
  end: L(19).start,
  last: L(20).start,
};

const CAM = (s: number, cx: number, cy: number) => {
  cx = clamp(cx, 960 / s, 1920 - 960 / s); cy = clamp(cy, 540 / s, 1080 - 540 / s);
  return `translate(960 540) scale(${s}) translate(${-cx} ${-cy})`;
};

// Sky background component - no rooftop, just sky and clouds
const SkyBg: React.FC<{t: number; id: string; color1: string; color2: string}> = ({t, id, color1, color2}) => (
  <defs>
    <linearGradient id={id} x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor={color1} />
      <stop offset="100%" stopColor={color2} />
    </linearGradient>
  </defs>
);

// Cloud component
const Cloud: React.FC<{x: number; y: number; scale: number; opacity: number}> = ({x, y, scale, opacity}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
    <ellipse cx="0" cy="0" rx="60" ry="30" fill="white" opacity="0.8" />
    <ellipse cx="40" cy="-10" rx="50" ry="25" fill="white" opacity="0.7" />
    <ellipse cx="-30" cy="-5" rx="45" ry="22" fill="white" opacity="0.75" />
  </g>
);

// Scene 1: Waking up - character floating in sky, looking up
const S1: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const s = 2.0, at = {x: 960, y: 400, s};
  const body = t < IS.float ? 'idle' : 'whatif';
  const face = {open:1, wide: t < IS.float ? 0.2 : 0.7, brow: t < IS.float ? 0.1 : 0.8, mouthOpen: t < IS.float ? 0.1 : 0.5, smile: t < IS.float ? 0 : 0.3};
  face.open *= blinkAt(f, [Math.round(IS.float * fps)]);
  return (
    <g>
      <rect width={1920} height={1080} fill="url(#sky1)" />
      <SkyBg t={t} id="sky1" color1="#87CEEB" color2="#E0F6FF" />
      <Cloud x={300} y={200} scale={1.2} opacity={0.6} />
      <Cloud x={1200} y={150} scale={0.9} opacity={0.5} />
      <Cloud x={800} y={300} scale={1.1} opacity={0.55} />
      <HumanChar pose={body} x={at.x} y={at.y} scale={at.s} face={face as any} t={t} />
      <TitleCard f={f} fps={fps} at={IS.wake} title="WE CAN FLY" kicker="With our own wings" />
    </g>
  );
};

// Scene 2: Soaring above - character higher, looking down
const S2: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const s = 1.8, at = {x: 960, y: 300, s};
  const body = t < IS.mountains ? 'idle' : 'point';
  const face = {open:1, wide: t < IS.mountains ? 0.3 : 0.6, brow: t < IS.mountains ? 0.2 : 0.5, mouthOpen: t < IS.mountains ? 0.1 : 0.3, smile: t < IS.mountains ? 0.2 : 0.4};
  face.open *= blinkAt(f, [Math.round(IS.mountains * fps)]);
  return (
    <g>
      <rect width={1920} height={1080} fill="url(#sky2)" />
      <SkyBg t={t} id="sky2" color1="#4A90D9" color2="#87CEEB" />
      <Cloud x={200} y={100} scale={1.5} opacity={0.7} />
      <Cloud x={1000} y={80} scale={1.0} opacity={0.6} />
      <Cloud x={1500} y={200} scale={1.3} opacity={0.65} />
      <Cloud x={600} y={180} scale={0.8} opacity={0.5} />
      <HumanChar pose={body} x={at.x} y={at.y} scale={at.s} face={face as any} t={t} />
      <NumberCard f={f} fps={fps} at={IS.soar} value="Soaring" caption="Above cities" x={200} y={200} size={26} accent="#ffffff" />
      <NumberCard f={f} fps={fps} at={IS.above} value="Above" caption="Mountains" x={200} y={300} size={26} accent="#ffffff" />
      <NumberCard f={f} fps={fps} at={IS.clouds} value="Above" caption="Clouds" x={200} y={400} size={26} accent="#ffffff" />
    </g>
  );
};

// Scene 3: World looks small - three characters floating at different heights
const S3: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const s = 1.5, at1 = {x: 400, y: 200, s};
  const at2 = {x: 960, y: 350, s};
  const at3 = {x: 1500, y: 150, s};
  const body1 = 'whatif';
  const body2 = 'think';
  const body3 = 'talk';
  const face1 = {open:1, wide:0.7, brow:0.8, mouthOpen:0.4, smile:0.2};
  const face2 = {open:1, wide:0.4, brow:0.5, mouthOpen:0.2, smile:0.1};
  const face3 = {open:1, wide:0.6, brow:0.7, mouthOpen:0.5, smile:0.3};
  face1.open *= blinkAt(f, [Math.round(IS.small * fps)]);
  face2.open *= blinkAt(f, [Math.round(IS.borders * fps)]);
  face3.open *= blinkAt(f, [Math.round(IS.connected * fps)]);
  return (
    <g>
      <rect width={1920} height={1080} fill="url(#sky3)" />
      <SkyBg t={t} id="sky3" color1="#1E3A5F" color2="#4A90D9" />
      <Cloud x={150} y={80} scale={1.8} opacity={0.5} />
      <Cloud x={700} y={50} scale={1.2} opacity={0.45} />
      <Cloud x={1300} y={120} scale={1.6} opacity={0.55} />
      <HumanChar pose={body1} x={at1.x} y={at1.y} scale={s} face={face1 as any} t={t} />
      <HumanChar pose={body2} x={at2.x} y={at2.y} scale={s} face={face2 as any} t={t} />
      <HumanChar pose={body3} x={at3.x} y={at3.y} scale={s} face={face3 as any} t={t} />
      <NumberCard f={f} fps={fps} at={IS.small} value="Small" caption="World looks" x={960} y={550} size={28} accent="#ffffff" />
      <NumberCard f={f} fps={fps} at={IS.borders} value="No borders" caption="From above" x={960} y={650} size={28} accent="#ffffff" />
    </g>
  );
};

// Scene 4: Connected - two characters flying together
const S4: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const s = 2.0, at1 = {x: 500, y: 350, s};
  const at2 = {x: 1100, y: 300, s};
  const body1 = 'idle';
  const body2 = 'talk';
  const face1 = {open:1, wide:0.2, brow:0.1, mouthOpen:0.1, smile:0.4};
  const face2 = {open:1, wide:0.3, brow:0.2, mouthOpen:0.4, smile:0.5};
  face1.open *= blinkAt(f, [Math.round(IS.understand * fps)]);
  face2.open *= blinkAt(f, [Math.round(IS.one * fps)]);
  return (
    <g>
      <rect width={1920} height={1080} fill="url(#sky4)" />
      <SkyBg t={t} id="sky4" color1="#FFD700" color2="#FFA500" />
      <Cloud x={300} y={150} scale={1.4} opacity={0.6} />
      <Cloud x={1400} y={100} scale={1.1} opacity={0.55} />
      <Cloud x={800} y={200} scale={1.3} opacity={0.5} />
      <HumanChar pose={body1} x={at1.x} y={at1.y} scale={s} face={face1 as any} t={t} />
      <HumanChar pose={body2} x={at2.x} y={at2.y} scale={s} face={face2 as any} t={t} />
      <NumberCard f={f} fps={fps} at={IS.understand} value="Understand" caption="We are one" x={800} y={500} size={26} accent="#ffffff" />
      <NumberCard f={f} fps={fps} at={IS.sky} value="One sky" caption="One earth" x={800} y={600} size={26} accent="#ffffff" />
    </g>
  );
};

// Scene 5: One family - multiple characters flying together
const S5: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const s = 1.6, at1 = {x: 300, y: 250, s};
  const at2 = {x: 700, y: 350, s};
  const at3 = {x: 1100, y: 200, s};
  const at4 = {x: 1500, y: 300, s};
  const body1 = 'idle';
  const body2 = 'talk';
  const body3 = 'idle';
  const body4 = 'think';
  const face1 = {open:1, wide:0.2, brow:0.1, mouthOpen:0.1, smile:0.5};
  const face2 = {open:1, wide:0.3, brow:0.2, mouthOpen:0.4, smile:0.6};
  const face3 = {open:1, wide:0.2, brow:0.1, mouthOpen:0.1, smile:0.5};
  const face4 = {open:1, wide:0.2, brow:0.3, mouthOpen:0.2, smile:0.4};
  face1.open *= blinkAt(f, [Math.round(IS.family * fps)]);
  face2.open *= blinkAt(f, [Math.round(IS.flying * fps)]);
  face3.open *= blinkAt(f, [Math.round((IS.family + 0.5) * fps)]);
  face4.open *= blinkAt(f, [Math.round((IS.flying + 0.5) * fps)]);
  return (
    <g>
      <rect width={1920} height={1080} fill="url(#sky5)" />
      <SkyBg t={t} id="sky5" color1="#FF6B6B" color2="#4ECDC4" />
      <Cloud x={200} y={60} scale={1.6} opacity={0.5} />
      <Cloud x={900} y={40} scale={1.3} opacity={0.45} />
      <Cloud x={1600} y={90} scale={1.5} opacity={0.55} />
      <HumanChar pose={body1} x={at1.x} y={at1.y} scale={s} face={face1 as any} t={t} />
      <HumanChar pose={body2} x={at2.x} y={at2.y} scale={s} face={face2 as any} t={t} />
      <HumanChar pose={body3} x={at3.x} y={at3.y} scale={s} face={face3 as any} t={t} />
      <HumanChar pose={body4} x={at4.x} y={at4.y} scale={s} face={face4 as any} t={t} />
      <TitleCard f={f} fps={fps} at={IS.family} title="ONE FAMILY" kicker="Flying together" />
    </g>
  );
};

// Scene 6: Reflection - single character, peaceful, floating
const S6: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const s = 2.2, at = {x: 960, y: 300, s};
  const body = 'think';
  const face = {open:1, wide:0.2, brow:0.2, mouthOpen:0.1, smile:0.6};
  face.open *= blinkAt(f, [Math.round(IS.end * fps)]);
  return (
    <g>
      <rect width={1920} height={1080} fill="url(#sky6)" />
      <SkyBg t={t} id="sky6" color1="#2C3E50" color2="#4CA1AF" />
      <Cloud x={400} y={120} scale={1.2} opacity={0.4} />
      <Cloud x={1200} y={80} scale={1.0} opacity={0.35} />
      <HumanChar pose={body} x={at.x} y={at.y} scale={at.s} face={face as any} t={t} />
      <TitleCard f={f} fps={fps} at={IS.end} title="One sky" kicker="One earth" />
    </g>
  );
};

export const Fly: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const scenes = [
    {from: 0, to: IS.float, C: S1},
    {from: IS.float, to: IS.small, C: S2},
    {from: IS.small, to: IS.understand, C: S3},
    {from: IS.understand, to: IS.family, C: S4},
    {from: IS.family, to: IS.end, C: S5},
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
    <AbsoluteFill style={{background: '#1a1a2e'}}>
      <Audio src={staticFile('internet-short/mix5.wav')} />
      <svg width={1920} height={1080} viewBox="0 0 1920 1080" opacity={opacity}>
        <C t={t} f={frame} fps={fps} />
      </svg>
      <Subtitles lines={voice.lines} f={frame} fps={fps} total={IS_SEC} bottom={120} />
    </AbsoluteFill>
  );
};
