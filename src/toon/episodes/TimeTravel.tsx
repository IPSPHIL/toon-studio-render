import React from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import voice from './timetravel.voice.json';
import {THEMES} from '../lib/fx';
import {NumberCard, TitleCard} from '../ui/Info';
import {Subtitles} from '../ui/Captions';
import {blinkAt, clamp, easeInOut, lerp, ramp} from '../lib/anim';

export const IS_FPS = 30;
export const IS_SEC = Math.ceil(voice.total * 10) / 10;
const L = (i: number) => voice.lines[i];

export const IS = {
  wake: L(0).start,
  egypt: L(1).start,
  pyramids: L(2).start,
  medieval: L(3).start,
  industrial: L(4).start,
  change: L(5).start,
  future: L(6).start,
  flying: L(7).start,
  holograms: L(8).start,
  truth: L(9).start,
  beauty: L(10).start,
  pain: L(11).start,
  past: L(12).start,
  future2: L(13).start,
  now: L(14).start,
  moment: L(15).start,
  breath: L(16).start,
  time: L(17).start,
  count: L(18).start,
  end: L(19).start,
  last: L(19).start,
};

const CAM = (s: number, cx: number, cy: number) => {
  cx = clamp(cx, 960 / s, 1920 - 960 / s); cy = clamp(cy, 540 / s, 1080 - 540 / s);
  return `translate(960 540) scale(${s}) translate(${-cx} ${-cy})`;
};

// Ancient Egypt scene
const S1: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const fadeIn = clamp((t - IS.wake) / 0.5);
  return (
    <g opacity={fadeIn}>
      <rect width={1920} height={1080} fill="#f4a460" />
      <rect width={1920} height={400} fill="#87CEEB" />
      <circle cx={1600} cy={200} r={80} fill="#FFD700" />
      {Array.from({length: 5}).map((_, i) => (
        <ellipse key={i} cx={200 + i * 350} cy={380 + (i % 2) * 20} rx={60} ry={40} fill="#228B22" />
      ))}
      <polygon points="400,800 600,400 800,800" fill="#DAA520" />
      <polygon points="900,800 1100,350 1300,800" fill="#CD853F" />
      <polygon points="1400,800 1550,450 1700,800" fill="#DAA520" />
      <rect x={0} y={800} width={1920} height={280} fill="#DEB887" />
      <TitleCard f={f} fps={fps} at={IS.wake} title="ANCIENT EGYPT" kicker="Pyramids & Desert" />
    </g>
  );
};

// Medieval scene
const S2: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const fadeIn = clamp((t - IS.egypt) / 0.5);
  return (
    <g opacity={fadeIn}>
      <rect width={1920} height={1080} fill="#4a6741" />
      <rect width={1920} height={500} fill="#87CEEB" />
      <rect x={0} y={500} width={1920} height={580} fill="#556B2F" />
      <rect x={300} y={200} width={200} height={400} fill="#696969" />
      <polygon points="300,200 400,100 500,200" fill="#8B0000" />
      <rect x={800} y={250} width={250} height={350} fill="#696969" />
      <polygon points="800,250 925,120 1050,250" fill="#8B0000" />
      <rect x={1300} y={220} width={180} height={380} fill="#696969" />
      <polygon points="1300,220 1390,110 1480,220" fill="#8B0000" />
      {Array.from({length: 6}).map((_, i) => (
        <rect key={i} x={350 + i * 250} y={450} width={40} height={60} fill="#8B4513" />
      ))}
      <TitleCard f={f} fps={fps} at={IS.egypt} title="MEDIEVAL" kicker="Castles & Kingdoms" />
    </g>
  );
};

// Industrial scene
const S3: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const fadeIn = clamp((t - IS.medieval) / 0.5);
  return (
    <g opacity={fadeIn}>
      <rect width={1920} height={1080} fill="#2F4F4F" />
      <rect width={1920} height={400} fill="#708090" />
      <rect x={0} y={400} width={1920} height={680} fill="#36454F" />
      {Array.from({length: 4}).map((_, i) => (
        <g key={i}>
          <rect x={100 + i * 450} y={250} width={80} height={300} fill="#1C1C1C" />
          <rect x={120 + i * 450} y={200} width={40} height={50} fill="#FF4500" />
          <circle cx={140 + i * 450} cy={180} r={20} fill="#FF6347" opacity={0.8} />
        </g>
      ))}
      {Array.from({length: 8}).map((_, i) => (
        <circle key={`g${i}`} cx={200 + i * 220} cy={600 + (i % 3) * 100} r={30 + i * 3} fill="none" stroke="#C0C0C0" strokeWidth={3} />
      ))}
      <TitleCard f={f} fps={fps} at={IS.medieval} title="INDUSTRIAL" kicker="Factories & Steam" />
    </g>
  );
};

// Modern scene
const S4: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const fadeIn = clamp((t - IS.industrial) / 0.5);
  return (
    <g opacity={fadeIn}>
      <rect width={1920} height={1080} fill="#1a1a2e" />
      <rect width={1920} height={1080} fill="url(#moderndark)" />
      <defs>
        <linearGradient id="moderndark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0a0a2e" />
          <stop offset="100%" stopColor="#1a1a3e" />
        </linearGradient>
      </defs>
      {Array.from({length: 8}).map((_, i) => (
        <rect key={i} x={50 + i * 230} y={100} width={60} height={700} fill="#2a2a4e" />
      ))}
      {Array.from({length: 8}).map((_, i) => (
        <rect key={`w${i}`} x={60 + i * 230} y={120} width={40} height={60} fill="#FFD700" opacity={0.6} />
      ))}
      {Array.from({length: 5}).map((_, i) => (
        <rect key={`c${i}`} x={100 + i * 350} y={850} width={120} height={40} fill="#FF0000" rx={5} />
      ))}
      <TitleCard f={f} fps={fps} at={IS.industrial} title="MODERN" kicker="Cities & Neon" />
    </g>
  );
};

// Future scene
const S5: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const fadeIn = clamp((t - IS.future) / 0.5);
  return (
    <g opacity={fadeIn}>
      <rect width={1920} height={1080} fill="#0a0a1a" />
      <rect width={1920} height={1080} fill="url(#futuregrad)" />
      <defs>
        <radialGradient id="futuregrad" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#1a0a3e" />
          <stop offset="100%" stopColor="#0a0a1a" />
        </radialGradient>
      </defs>
      {Array.from({length: 6}).map((_, i) => (
        <g key={i}>
          <rect x={100 + i * 300} y={150} width={200} height={400} fill="none" stroke="#00FFFF" strokeWidth={2} />
          <rect x={120 + i * 300} y={170} width={160} height={360} fill="rgba(0,255,255,0.1)" />
        </g>
      ))}
      {Array.from({length: 4}).map((_, i) => (
        <ellipse key={`f${i}`} cx={300 + i * 400} cy={700 + (i % 2) * 50} rx={80} ry={20} fill="rgba(0,255,255,0.3)" />
      ))}
      {Array.from({length: 3}).map((_, i) => (
        <circle key={`h${i}`} cx={400 + i * 500} cy={300} r={15} fill="#FF00FF" opacity={0.8} />
      ))}
      <TitleCard f={f} fps={fps} at={IS.future} title="FUTURE" kicker="Flying Cars & Holograms" />
    </g>
  );
};

// Present scene
const S6: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const fadeIn = clamp((t - IS.now) / 0.5);
  return (
    <g opacity={fadeIn}>
      <rect width={1920} height={1080} fill="#87CEEB" />
      <rect x={0} y={700} width={1920} height={380} fill="#90EE90" />
      <circle cx={960} cy={200} r={60} fill="#FFD700" />
      {Array.from({length: 8}).map((_, i) => (
        <circle key={i} cx={100 + i * 240} cy={650 + (i % 2) * 30} r={40} fill="#228B22" />
      ))}
      <TitleCard f={f} fps={fps} at={IS.now} title="NOW" kicker="This Moment" />
      <NumberCard f={f} fps={fps} at={IS.now} value="Now" caption="This moment" x={960} y={400} size={32} accent="#FFD700" />
    </g>
  );
};

export const TimeTravel: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const scenes = [
    {from: 0, to: IS.egypt, C: S1},
    {from: IS.egypt, to: IS.medieval, C: S2},
    {from: IS.medieval, to: IS.industrial, C: S3},
    {from: IS.industrial, to: IS.future, C: S4},
    {from: IS.future, to: IS.now, C: S5},
    {from: IS.now, to: IS_SEC, C: S6},
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
      <Audio src={staticFile('internet-short/mix8.wav')} />
      <svg width={1920} height={1080} viewBox="0 0 1920 1080" opacity={opacity}>
        <C t={t} f={frame} fps={fps} />
      </svg>
      <Subtitles lines={voice.lines} f={frame} fps={fps} total={IS_SEC} bottom={120} />
    </AbsoluteFill>
  );
};
