import React from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import voice from './internetshort.voice.json';
import {HumanChar} from '../characters/HumanChar';
import {poseAt, exprAt, makePose, alive, addPart} from '../lib/poses';
import {THEMES} from '../lib/fx';
import {FxOverlay} from '../scene/FxLayers';
import {Sky, Skyline, Rooftop, ROOF} from '../scene/Rooftop';
import {NumberCard, TitleCard} from '../ui/Info';
import {Subtitles, TimePlate} from '../ui/Captions';
import {blinkAt, clamp, easeInOut, lerp, ramp, wobble} from '../lib/anim';

export const IS_FPS = 30;
export const IS_SEC = Math.ceil(voice.total * 10) / 10;
const L = (i: number) => voice.lines[i];
const W = (w: string) => { const r = voice.lines.flatMap((l: any) => l.words).find((x: any) => x.w.toLowerCase().startsWith(w)); return r ? r.t : 0; };

export const IS = {
  cut: L(1).start - 0.12,
  think: W('что') + 0.05,
  phone: W('телефон') - 0.08,
  news: W('новости') - 0.08,
  social: W('новости') + 1.0,
  concept: W('представь') - 0.08,
  day1: W('день') - 0.08,
  money: W('деньги') - 0.08,
  street: W('улицу') - 0.08,
  kids: W('дети') - 0.08,
  end: W('зависимы') - 0.08,
  last: W('комментариях') - 0.08,
};




const getPoseIdx = (t: number) => Math.min(5, Math.floor(t / 12));

const CAM = (s: number, cx: number, cy: number) => {
  cx = clamp(cx, 960 / s, 1920 - 960 / s); cy = clamp(cy, 540 / s, 1080 - 540 / s);
  return `translate(960 540) scale(${s}) translate(${-cx} ${-cy})`;
};

const rimTo = (from: {x: number; y: number}, to: {x: number; y: number}) => (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI;

const S1: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const th = THEMES.fairytale;
  const s = 1.3, at = {x: 820, y: ROOF.stand - 70 * s, s};
  const body = t < IS.think + 0.2 ? 'idle' : t < IS.phone ? 'think' : 'whatif';
  const turn = ramp(t, IS.think, IS.think + 0.5, easeInOut) * (1 - ramp(t, IS.phone - 0.1, IS.phone + 0.35, easeInOut));
  const face = {...exprAt(t, [[0, 'neutral'], [IS.think + 0.2, 'thinking'], [IS.phone + 0.05, {open: 1, wide: 0.35, brow: 0.7, browTilt: 0.1, mouthW: 0.95, mouthOpen: 0.32, smile: 0.7}]], 0.35),
    yaw: lerp(0.06, 0.42, turn), pitch: lerp(0, -0.3, turn), lookX: lerp(0, 0.75, turn), lookY: lerp(0.05, -0.8, turn)};
  face.open *= blinkAt(f, [12, Math.round((IS.think + 0.9) * fps), Math.round((IS.phone + 0.7) * fps)]);
  const head = {x: at.x, y: at.y - 25 * s};
  const cs = lerp(1.04, 1.12, easeInOut(t / IS.cut));
  return (
    <g>
      <Sky theme={th} t={t} id="s1sky" />
      <Skyline theme={th} t={t} shift={-t * 6} />
      <Rooftop theme={th} t={t} />
      <HumanChar pose={body} x={at.x} y={at.y} scale={at.s} face={face as any} />
      <text x={820} y={ROOF.stand - 70 * 1.3 - 25 * 1.3 + 60} textAnchor="middle" fill="#ff0000" fontSize={16} fontWeight="bold" fontFamily="Arial">SO3</text>
      
      <text x={1200} y={200} fill="#ffffff" fontSize={48} fontWeight="bold">ЧЕЛОВЕК</text>
      <NumberCard f={f} fps={fps} at={IS.phone} value="Нет сети" caption="Телефон" x={1200} y={300} size={28} accent="#ff6060" />
    </g>
  );
};

const S2: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const th = THEMES.fairytale;
  const s = 1.8, at = {x: 960, y: ROOF.stand - 70 * s, s};
  const body = t < IS.news ? 'idle' : 'point';
  const face = {...exprAt(t, [[0, 'neutral'], [IS.news, 'thinking']], 0.3)};
  face.open *= blinkAt(f, [Math.round(IS.news * fps)]);
  return (
    <g transform={CAM(1.0, 960, 540)}>
      <Sky theme={th} t={t} id="s2sky" />
      <Skyline theme={th} t={t} shift={-t * 4} />
      <Rooftop theme={th} t={t} />
      <HumanChar pose={body} x={at.x} y={at.y} scale={at.s} face={face as any} />
      
      <NumberCard f={f} fps={fps} at={IS.news} value="Пусто" caption="Новости" x={1200} y={250} size={28} accent="#ffaa44" />
      <NumberCard f={f} fps={fps} at={IS.social} value="Пусто" caption="Соцсети" x={1200} y={350} size={28} accent="#ffaa44" />
    </g>
  );
};

const S3: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const th = THEMES.fairytale;
  const s = 1.0, at = {x: 600, y: ROOF.stand - 70 * s, s};
  const body = t < IS.concept ? 'idle' : 'whatif';
  const face = {...exprAt(t, [[0, 'neutral'], [IS.concept, {open: 1, wide: 0.5, brow: 0.8, mouthOpen: 0.4, smile: 0.3}]], 0.4)};
  face.open *= blinkAt(f, [Math.round(IS.concept * fps)]);
  return (
    <g transform={CAM(1.0, 960, 540)}>
      <Sky theme={th} t={t} id="s3sky" />
      <Skyline theme={th} t={t} shift={-t * 3} />
      <Rooftop theme={th} t={t} />
      <HumanChar pose={body} x={at.x} y={at.y} scale={at.s} face={face as any} />
      
      <TitleCard f={f} fps={fps} at={IS.concept} title="ИНТЕРНЕТ" kicker="ИСЧЕЗ НАВСЕГДА" />
    </g>
  );
};

const S4: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const th = THEMES.fairytale;
  const s = 1.3, at = {x: 500, y: ROOF.stand - 70 * s, s};
  const body = t < IS.money ? 'idle' : 'think';
  const face = {...exprAt(t, [[0, 'sad'], [IS.money, 'thinking']], 0.3)};
  face.open *= blinkAt(f, [Math.round(IS.money * fps)]);
  return (
    <g transform={CAM(1.0, 960, 540)}>
      <Sky theme={th} t={t} id="s4sky" />
      <Skyline theme={th} t={t} shift={-t * 2} />
      <Rooftop theme={th} t={t} />
      <HumanChar pose={body} x={at.x} y={at.y} scale={at.s} face={face as any} />
      
      <NumberCard f={f} fps={fps} at={IS.money} value="Ошибка" caption="Банкоматы" x={1200} y={200} size={24} accent="#ff6060" />
      <NumberCard f={f} fps={fps} at={IS.money + 1} value="Не работают" caption="Карты" x={1200} y={300} size={24} accent="#ff6060" />
      <NumberCard f={f} fps={fps} at={IS.money + 2} value="Нет доступа" caption="Деньги" x={1200} y={400} size={24} accent="#ff6060" />
    </g>
  );
};

const S5: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const th = THEMES.fairytale;
  const s = 1.5, at1 = {x: 400, y: ROOF.stand - 70 * s, s};
  const at2 = {x: 800, y: ROOF.stand - 70 * s, s};
  const body1 = 'idle';
  const body2 = 'idle';
  const face1 = {...exprAt(t, [[0, 'happy']], 0.3)};
  const face2 = {...exprAt(t, [[0, 'happy']], 0.3)};
  face1.open *= blinkAt(f, [Math.round(IS.street * fps)]);
  face2.open *= blinkAt(f, [Math.round((IS.street + 0.5) * fps)]);
  return (
    <g transform={CAM(1.0, 960, 540)}>
      <Sky theme={th} t={t} id="s5sky" />
      <Skyline theme={th} t={t} shift={-t * 3} />
      <Rooftop theme={th} t={t} />
      <HumanChar pose={body1} x={at1.x} y={at1.y} scale={s} face={face1} />
      <HumanChar pose={body2} x={at2.x} y={at2.y} scale={s} face={face2} />
      <NumberCard f={f} fps={fps} at={IS.street} value="Общаются лично" caption="Люди" x={1100} y={250} size={24} accent="#66ff88" />
      <NumberCard f={f} fps={fps} at={IS.kids} value="Играют на улице" caption="Дети" x={1100} y={350} size={24} accent="#66ff88" />
    </g>
  );
};

const S6: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const th = THEMES.fairytale;
  const s = 1.5, at = {x: 960, y: ROOF.stand - 70 * s, s};
  const body = 'think';
  const face = {...exprAt(t, [[0, 'thinking']], 0.3)};
  face.open *= blinkAt(f, [Math.round(IS.end * fps)]);
  return (
    <g transform={CAM(1.0, 960, 540)}>
      <Sky theme={th} t={t} id="s6sky" />
      <Skyline theme={th} t={t} shift={-t * 2} />
      <Rooftop theme={th} t={t} />
      <HumanChar pose={body} x={at.x} y={at.y} scale={at.s} face={face as any} />
      
      <TitleCard f={f} fps={fps} at={IS.end} title="Может быть," kicker="мы слишком зависимы?" />
    </g>
  );
};

export const InternetShort: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const scenes = [
    {from: 0, to: IS.phone, C: S1},
    {from: IS.phone, to: IS.concept, C: S2},
    {from: IS.concept, to: IS.day1, C: S3},
    {from: IS.day1, to: IS.street, C: S4},
    {from: IS.street, to: IS.end, C: S5},
    {from: IS.end, to: IS_SEC, C: S6},
  ];
  const cur = scenes.find(s => t >= s.from && t < s.to) || scenes[scenes.length - 1];
  const C = cur.C;
  const poseIdx = Math.min(5, Math.floor(t / 12));
  return (
    <AbsoluteFill style={{background: '#1a1a2e'}}>
      <Audio src={staticFile('internet-short/mix.wav')} />
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        <C t={t} f={frame} fps={fps} />
      </svg>
      <Subtitles lines={voice.lines} f={frame} fps={fps} total={IS_SEC} bottom={120} />
    </AbsoluteFill>
  );
};