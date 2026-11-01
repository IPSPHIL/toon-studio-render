import React from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import voice from './animaltalk.voice.json';
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
  mimic: L(2).start,
  real: L(3).start,
  dog: L(4).start,
  cat: L(5).start,
  pigeon: L(6).start,
  chaos: L(7).start,
  chaos2: L(8).start,
  opinions: L(9).start,
  cows: L(10).start,
  pigs: L(11).start,
  birds: L(12).start,
  alone: L(13).start,
  negotiate: L(14).start,
  share: L(15).start,
  listen: L(16).start,
  really: L(17).start,
  learn: L(18).start,
  kinder: L(19).start,
  all: L(20).start,
  end: L(23).start,
  last: L(24).start,
};

const CAM = (s: number, cx: number, cy: number) => {
  cx = clamp(cx, 960 / s, 1920 - 960 / s); cy = clamp(cy, 540 / s, 1080 - 540 / s);
  return `translate(960 540) scale(${s}) translate(${-cx} ${-cy})`;
};

// Scene 1: Waking up - single character, surprised expression, looking down at dog
const S1: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const th = THEMES.fairytale;
  const s = 2.4, at = {x: 960, y: ROOF.stand - 70 * s, s};
  const body = t < IS.mimic ? 'idle' : 'whatif';
  const face = {open:1, wide: t < IS.mimic ? 0.3 : 0.7, brow: t < IS.mimic ? 0.2 : 0.9, mouthOpen: t < IS.mimic ? 0.1 : 0.5, smile: 0};
  face.open *= blinkAt(f, [Math.round(IS.mimic * fps)]);
  return (
    <g transform={CAM(1.0, 960, 540)}>
      <Sky theme={th} t={t} id="a1sky" />
      <Skyline theme={th} t={t} shift={-t * 3} />
      <Rooftop theme={th} t={t} />
      <HumanChar pose={body} x={at.x} y={at.y} scale={at.s} face={face as any} t={t} />
      <TitleCard f={f} fps={fps} at={IS.wake} title="ANIMALS TALK" kicker="What if?" />
    </g>
  );
};

// Scene 2: Dog and cat - two characters, one talking, one judging
const S2: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const th = THEMES.dusk;
  const s = 2.0, at1 = {x: 400, y: ROOF.stand - 70 * s, s};
  const at2 = {x: 900, y: ROOF.stand - 70 * s, s};
  const body1 = 'talk';
  const body2 = 'think';
  const face1 = {open:1, wide:0.3, brow:0.2, mouthOpen:0.6, smile:0.5};
  const face2 = {open:1, wide:0.1, brow:0.6, mouthOpen:0.1, smile:-0.3};
  face1.open *= blinkAt(f, [Math.round(IS.dog * fps)]);
  face2.open *= blinkAt(f, [Math.round(IS.cat * fps)]);
  return (
    <g transform={CAM(0.85, 700, 540)}>
      <Sky theme={th} t={t} id="a2sky" />
      <Skyline theme={th} t={t} shift={-t * 5} />
      <Rooftop theme={th} t={t} />
      <HumanChar pose={body1} x={at1.x} y={at1.y} scale={s} face={face1 as any} t={t} />
      <HumanChar pose={body2} x={at2.x} y={at2.y} scale={s} face={face2 as any} t={t} />
      <NumberCard f={f} fps={fps} at={IS.dog} value="Good morning!" caption="Dog" x={200} y={200} size={22} accent="#66ff88" />
      <NumberCard f={f} fps={fps} at={IS.cat} value="Nice outfit..." caption="Cat" x={1000} y={200} size={22} accent="#ffaa44" />
    </g>
  );
};

// Scene 3: Pigeon asking directions - character pointing
const S3: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const th = THEMES.gold;
  const s = 2.2, at = {x: 600, y: ROOF.stand - 70 * s, s};
  const body = t < IS.pigeon ? 'idle' : 'point';
  const face = {open:1, wide: t < IS.pigeon ? 0 : 0.5, brow: t < IS.pigeon ? 0 : 0.7, mouthOpen: t < IS.pigeon ? 0.1 : 0.3, smile: t < IS.pigeon ? 0 : 0.2};
  face.open *= blinkAt(f, [Math.round(IS.pigeon * fps)]);
  return (
    <g transform={CAM(1.1, 800, 540)}>
      <Sky theme={th} t={t} id="a3sky" />
      <Skyline theme={th} t={t} shift={-t * 2} />
      <Rooftop theme={th} t={t} />
      <HumanChar pose={body} x={at.x} y={at.y} scale={at.s} face={face as any} t={t} />
      <TitleCard f={f} fps={fps} at={IS.pigeon} title="DIRECTIONS?" kicker="Pigeon asks" />
    </g>
  );
};

// Scene 4: Chaos - multiple characters, running around
const S4: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const th = THEMES.neon;
  const s = 1.8, at1 = {x: 300, y: ROOF.stand - 70 * s, s};
  const at2 = {x: 700, y: ROOF.stand - 70 * s, s};
  const at3 = {x: 1100, y: ROOF.stand - 70 * s, s};
  const body1 = 'whatif';
  const body2 = 'think';
  const body3 = 'talk';
  const face1 = {open:1, wide:0.8, brow:0.9, mouthOpen:0.6, smile:0};
  const face2 = {open:1, wide:0.4, brow:0.5, mouthOpen:0.3, smile:0.1};
  const face3 = {open:1, wide:0.6, brow:0.7, mouthOpen:0.5, smile:0.3};
  face1.open *= blinkAt(f, [Math.round(IS.chaos * fps)]);
  face2.open *= blinkAt(f, [Math.round(IS.chaos2 * fps)]);
  face3.open *= blinkAt(f, [Math.round(IS.opinions * fps)]);
  return (
    <g transform={CAM(0.7, 700, 540)}>
      <Sky theme={th} t={t} id="a4sky" />
      <Skyline theme={th} t={t} shift={-t * 6} />
      <Rooftop theme={th} t={t} />
      <HumanChar pose={body1} x={at1.x} y={at1.y} scale={s} face={face1 as any} t={t} />
      <HumanChar pose={body2} x={at2.x} y={at2.y} scale={s} face={face2 as any} t={t} />
      <HumanChar pose={body3} x={at3.x} y={at3.y} scale={s} face={face3 as any} t={t} />
      <NumberCard f={f} fps={fps} at={IS.chaos} value="Chaos" caption="Everywhere" x={1300} y={150} size={26} accent="#ff6060" />
      <NumberCard f={f} fps={fps} at={IS.chaos2} value="Opinions" caption="Animals have" x={1300} y={250} size={26} accent="#ff6060" />
      <NumberCard f={f} fps={fps} at={IS.opinions} value="Demands" caption="They speak" x={1300} y={350} size={26} accent="#ff6060" />
    </g>
  );
};

// Scene 5: Negotiation - two characters facing each other
const S5: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const th = THEMES.night;
  const s = 2.0, at1 = {x: 400, y: ROOF.stand - 70 * s, s};
  const at2 = {x: 1000, y: ROOF.stand - 70 * s, s};
  const body1 = 'talk';
  const body2 = 'think';
  const face1 = {open:1, wide:0.2, brow:0.3, mouthOpen:0.5, smile:0.2};
  const face2 = {open:1, wide:0.1, brow:0.4, mouthOpen:0.2, smile:0.1};
  face1.open *= blinkAt(f, [Math.round(IS.negotiate * fps)]);
  face2.open *= blinkAt(f, [Math.round(IS.share * fps)]);
  return (
    <g transform={CAM(0.9, 700, 540)}>
      <Sky theme={th} t={t} id="a5sky" />
      <Skyline theme={th} t={t} shift={-t * 4} />
      <Rooftop theme={th} t={t} />
      <HumanChar pose={body1} x={at1.x} y={at1.y} scale={s} face={face1 as any} t={t} />
      <HumanChar pose={body2} x={at2.x} y={at2.y} scale={s} face={face2 as any} t={t} />
      <NumberCard f={f} fps={fps} at={IS.negotiate} value="Negotiate" caption="Together" x={700} y={150} size={24} accent="#66ff88" />
      <NumberCard f={f} fps={fps} at={IS.share} value="Share" caption="The planet" x={700} y={250} size={24} accent="#66ff88" />
      <NumberCard f={f} fps={fps} at={IS.listen} value="Listen" caption="Really listen" x={700} y={350} size={24} accent="#66ff88" />
    </g>
  );
};

// Scene 6: Reflection - single character, peaceful
const S6: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const th = THEMES.fairytale;
  const s = 2.2, at = {x: 960, y: ROOF.stand - 70 * s, s};
  const body = 'idle';
  const face = {open:1, wide:0.2, brow:0.1, mouthOpen:0.1, smile:0.4};
  face.open *= blinkAt(f, [Math.round(IS.end * fps)]);
  return (
    <g transform={CAM(1.0, 960, 540)}>
      <Sky theme={th} t={t} id="a6sky" />
      <Skyline theme={th} t={t} shift={-t * 2} />
      <Rooftop theme={th} t={t} />
      <HumanChar pose={body} x={at.x} y={at.y} scale={at.s} face={face as any} t={t} />
      <TitleCard f={f} fps={fps} at={IS.end} title="Kinder" kicker="To all living things" />
    </g>
  );
};

export const AnimalTalk: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const scenes = [
    {from: 0, to: IS.mimic, C: S1},
    {from: IS.mimic, to: IS.pigeon, C: S2},
    {from: IS.pigeon, to: IS.chaos, C: S3},
    {from: IS.chaos, to: IS.negotiate, C: S4},
    {from: IS.negotiate, to: IS.end, C: S5},
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
      <Audio src={staticFile('internet-short/mix3.wav')} />
      <svg width={1920} height={1080} viewBox="0 0 1920 1080" opacity={opacity}>
        <C t={t} f={frame} fps={fps} />
      </svg>
      <Subtitles lines={voice.lines} f={frame} fps={fps} total={IS_SEC} bottom={120} />
    </AbsoluteFill>
  );
};
