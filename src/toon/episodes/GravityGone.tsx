import React from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import voice from './gravitygone.voice.json';
import {HumanChar} from '../characters/HumanChar';
import {THEMES} from '../lib/fx';
import {Sky, Skyline, Rooftop, ROOF} from '../scene/Rooftop';
import {NumberCard, TitleCard} from '../ui/Info';
import {Subtitles} from '../ui/Captions';
import {blinkAt, clamp, easeInOut, lerp, ramp} from '../lib/anim';

export const IS_FPS = 30;
export const IS_SEC = Math.ceil(voice.total * 10) / 10;
const L = (i: number) => voice.lines[i];

export const IS = {
  wake: L(1).start,
  everything: L(2).start,
  water: L(3).start,
  cars: L(4).start,
  people: L(5).start,
  chaos: L(6).start,
  sky: L(7).start,
  beautiful: L(8).start,
  equal: L(9).start,
  fall: L(10).start,
  pushed: L(11).start,
  float: L(12).start,
  see: L(13).start,
  really: L(14).start,
  side: L(15).start,
  hierarchy: L(16).start,
  updown: L(17).start,
  justus: L(18).start,
  together: L(19).start,
  end: L(20).start,
  last: L(20).start,
};

const CAM = (s: number, cx: number, cy: number) => {
  cx = clamp(cx, 960 / s, 1920 - 960 / s); cy = clamp(cy, 540 / s, 1080 - 540 / s);
  return `translate(960 540) scale(${s}) translate(${-cx} ${-cy})`;
};

// Scene 1: Waking up - character floating slightly, looking around confused
const S1: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const th = THEMES.neon;
  const s = 2.0, at = {x: 960, y: ROOF.stand - 70 * s - 30, s};
  const body = t < IS.everything ? 'idle' : 'whatif';
  const face = {open:1, wide: t < IS.everything ? 0.2 : 0.8, brow: t < IS.everything ? 0.1 : 0.9, mouthOpen: t < IS.everything ? 0.1 : 0.5, smile: 0};
  face.open *= blinkAt(f, [Math.round(IS.everything * fps)]);
  return (
    <g transform={CAM(1.1, 960, 540)}>
      <Sky theme={th} t={t} id="g1sky" />
      <Skyline theme={th} t={t} shift={-t * 5} />
      <Rooftop theme={th} t={t} />
      <HumanChar pose={body} x={at.x} y={at.y} scale={at.s} face={face as any} t={t} />
      <TitleCard f={f} fps={fps} at={IS.wake} title="NO GRAVITY" kicker="For one day" />
    </g>
  );
};

// Scene 2: Water floating up, character looking up
const S2: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const th = THEMES.dusk;
  const s = 2.2, at = {x: 700, y: ROOF.stand - 70 * s - 50, s};
  const body = t < IS.cars ? 'idle' : 'point';
  const face = {open:1, wide: t < IS.cars ? 0.4 : 0.6, brow: t < IS.cars ? 0.3 : 0.7, mouthOpen: t < IS.cars ? 0.2 : 0.4, smile: t < IS.cars ? 0 : 0.2};
  face.open *= blinkAt(f, [Math.round(IS.cars * fps)]);
  return (
    <g transform={CAM(0.9, 900, 540)}>
      <Sky theme={th} t={t} id="g2sky" />
      <Skyline theme={th} t={t} shift={-t * 3} />
      <Rooftop theme={th} t={t} />
      <HumanChar pose={body} x={at.x} y={at.y} scale={at.s} face={face as any} t={t} />
      <NumberCard f={f} fps={fps} at={IS.water} value="Floating" caption="Water" x={1200} y={200} size={26} accent="#44aaff" />
      <NumberCard f={f} fps={fps} at={IS.cars} value="Lifting" caption="Cars" x={1200} y={300} size={26} accent="#44aaff" />
      <NumberCard f={f} fps={fps} at={IS.people} value="Bumping" caption="Ceilings" x={1200} y={400} size={26} accent="#44aaff" />
    </g>
  );
};

// Scene 3: Chaos in streets and sky - three characters scattered
const S3: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const th = THEMES.gold;
  const s = 1.6, at1 = {x: 250, y: ROOF.stand - 70 * s - 80, s};
  const at2 = {x: 700, y: ROOF.stand - 70 * s - 40, s};
  const at3 = {x: 1150, y: ROOF.stand - 70 * s - 120, s};
  const body1 = 'whatif';
  const body2 = 'think';
  const body3 = 'talk';
  const face1 = {open:1, wide:0.9, brow:0.9, mouthOpen:0.6, smile:0};
  const face2 = {open:1, wide:0.5, brow:0.6, mouthOpen:0.3, smile:0.1};
  const face3 = {open:1, wide:0.7, brow:0.8, mouthOpen:0.5, smile:0.2};
  face1.open *= blinkAt(f, [Math.round(IS.chaos * fps)]);
  face2.open *= blinkAt(f, [Math.round(IS.sky * fps)]);
  face3.open *= blinkAt(f, [Math.round(IS.beautiful * fps)]);
  return (
    <g transform={CAM(0.65, 700, 500)}>
      <Sky theme={th} t={t} id="g3sky" />
      <Skyline theme={th} t={t} shift={-t * 7} />
      <Rooftop theme={th} t={t} />
      <HumanChar pose={body1} x={at1.x} y={at1.y} scale={s} face={face1 as any} t={t} />
      <HumanChar pose={body2} x={at2.x} y={at2.y} scale={s} face={face2 as any} t={t} />
      <HumanChar pose={body3} x={at3.x} y={at3.y} scale={s} face={face3 as any} t={t} />
      <NumberCard f={f} fps={fps} at={IS.chaos} value="Chaos" caption="Streets" x={1350} y={120} size={24} accent="#ff6060" />
      <NumberCard f={f} fps={fps} at={IS.sky} value="Chaos" caption="Sky" x={1350} y={220} size={24} accent="#ff6060" />
    </g>
  );
};

// Scene 4: Beautiful - floating together, peaceful
const S4: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const th = THEMES.fairytale;
  const s = 2.0, at1 = {x: 400, y: ROOF.stand - 70 * s - 60, s};
  const at2 = {x: 1000, y: ROOF.stand - 70 * s - 60, s};
  const body1 = 'idle';
  const body2 = 'idle';
  const face1 = {open:1, wide:0.2, brow:0.1, mouthOpen:0.1, smile:0.4};
  const face2 = {open:1, wide:0.2, brow:0.1, mouthOpen:0.1, smile:0.4};
  face1.open *= blinkAt(f, [Math.round(IS.equal * fps)]);
  face2.open *= blinkAt(f, [Math.round(IS.float * fps)]);
  return (
    <g transform={CAM(0.8, 700, 500)}>
      <Sky theme={th} t={t} id="g4sky" />
      <Skyline theme={th} t={t} shift={-t * 2} />
      <Rooftop theme={th} t={t} />
      <HumanChar pose={body1} x={at1.x} y={at1.y} scale={s} face={face1 as any} t={t} />
      <HumanChar pose={body2} x={at2.x} y={at2.y} scale={s} face={face2 as any} t={t} />
      <NumberCard f={f} fps={fps} at={IS.equal} value="Equal" caption="Everyone" x={700} y={120} size={26} accent="#66ff88" />
      <NumberCard f={f} fps={fps} at={IS.fall} value="No Fall" caption="No one falls" x={700} y={220} size={26} accent="#66ff88" />
      <NumberCard f={f} fps={fps} at={IS.pushed} value="No Push" caption="No one pushed" x={700} y={320} size={26} accent="#66ff88" />
    </g>
  );
};

// Scene 5: Side by side - two characters looking at each other
const S5: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const th = THEMES.night;
  const s = 2.0, at1 = {x: 350, y: ROOF.stand - 70 * s - 50, s};
  const at2 = {x: 1050, y: ROOF.stand - 70 * s - 50, s};
  const body1 = 'think';
  const body2 = 'talk';
  const face1 = {open:1, wide:0.3, brow:0.4, mouthOpen:0.2, smile:0.3};
  const face2 = {open:1, wide:0.3, brow:0.4, mouthOpen:0.4, smile:0.3};
  face1.open *= blinkAt(f, [Math.round(IS.see * fps)]);
  face2.open *= blinkAt(f, [Math.round(IS.really * fps)]);
  return (
    <g transform={CAM(0.9, 700, 500)}>
      <Sky theme={th} t={t} id="g5sky" />
      <Skyline theme={th} t={t} shift={-t * 3} />
      <Rooftop theme={th} t={t} />
      <HumanChar pose={body1} x={at1.x} y={at1.y} scale={s} face={face1 as any} t={t} />
      <HumanChar pose={body2} x={at2.x} y={at2.y} scale={s} face={face2 as any} t={t} />
      <NumberCard f={f} fps={fps} at={IS.see} value="See" caption="Each other" x={700} y={120} size={26} accent="#aaffaa" />
      <NumberCard f={f} fps={fps} at={IS.side} value="Side by side" caption="Floating" x={700} y={220} size={26} accent="#aaffaa" />
      <NumberCard f={f} fps={fps} at={IS.hierarchy} value="No hierarchy" caption="No up or down" x={700} y={320} size={26} accent="#aaffaa" />
    </g>
  );
};

// Scene 6: Reflection - single character, peaceful, floating
const S6: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const th = THEMES.fairytale;
  const s = 2.2, at = {x: 960, y: ROOF.stand - 70 * s - 40, s};
  const body = 'think';
  const face = {open:1, wide:0.2, brow:0.2, mouthOpen:0.1, smile:0.5};
  face.open *= blinkAt(f, [Math.round(IS.end * fps)]);
  return (
    <g transform={CAM(1.0, 960, 540)}>
      <Sky theme={th} t={t} id="g6sky" />
      <Skyline theme={th} t={t} shift={-t * 2} />
      <Rooftop theme={th} t={t} />
      <HumanChar pose={body} x={at.x} y={at.y} scale={at.s} face={face as any} t={t} />
      <TitleCard f={f} fps={fps} at={IS.end} title="Just us" kicker="Together" />
    </g>
  );
};

export const GravityGone: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const scenes = [
    {from: 0, to: IS.everything, C: S1},
    {from: IS.everything, to: IS.chaos, C: S2},
    {from: IS.chaos, to: IS.beautiful, C: S3},
    {from: IS.beautiful, to: IS.see, C: S4},
    {from: IS.see, to: IS.end, C: S5},
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
      <Audio src={staticFile('internet-short/mix4.wav')} />
      <svg width={1920} height={1080} viewBox="0 0 1920 1080" opacity={opacity}>
        <C t={t} f={frame} fps={fps} />
      </svg>
      <Subtitles lines={voice.lines} f={frame} fps={fps} total={IS_SEC} bottom={120} />
    </AbsoluteFill>
  );
};
ENDOFFILE
echo "GravityGone.tsx created"