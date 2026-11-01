import React from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import voice from './timetravel.voice.json';

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

const images = [
  {src: 'test_images/egypt.png', label: 'ANCIENT EGYPT', kicker: 'Pyramids & Desert', from: 0, to: IS.egypt},
  {src: 'test_images/medieval.png', label: 'MEDIEVAL', kicker: 'Castles & Kingdoms', from: IS.egypt, to: IS.medieval},
  {src: 'test_images/industrial.png', label: 'INDUSTRIAL', kicker: 'Factories & Steam', from: IS.medieval, to: IS.industrial},
  {src: 'test_images/modern.png', label: 'MODERN', kicker: 'Cities & Neon', from: IS.industrial, to: IS.future},
  {src: 'test_images/future.png', label: 'FUTURE', kicker: 'Flying Cars & Holograms', from: IS.future, to: IS.now},
  {src: 'test_images/present.png', label: 'NOW', kicker: 'This Moment', from: IS.now, to: IS_SEC},
];

const Subtitles: React.FC<{lines: any[]; f: number; fps: number; total: number; bottom: number}> = ({lines, f, fps, total, bottom}) => {
  const t = f / fps;
  const line = lines.find((l: any) => t >= l.start && t < l.end);
  if (!line) return null;
  return (
    <div style={{position: 'absolute', bottom, left: 0, right: 0, textAlign: 'center', color: 'white', fontSize: 36, fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.8)', padding: '0 40px'}}>
      {line.text}
    </div>
  );
};

export const TimeTravel2: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const cur = images.find(s => t >= s.from && t < s.to) || images[images.length - 1];
  const sceneStart = cur.from;
  const sceneEnd = cur.to;
  const fadeIn = Math.min(1, (t - sceneStart) / 0.5);
  const fadeOut = Math.min(1, (sceneEnd - t) / 0.3);
  const opacity = Math.min(fadeIn, fadeOut);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Audio src={staticFile('internet-short/mix8.wav')} />
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity}}>
        <img src={staticFile(cur.src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </div>
      <div style={{position: 'absolute', top: 60, left: 60, opacity}}>
        <div style={{color: 'white', fontSize: 48, fontWeight: 'bold', textShadow: '3px 3px 6px rgba(0,0,0,0.9)'}}>{cur.label}</div>
        <div style={{color: 'rgba(255,255,255,0.8)', fontSize: 28, marginTop: 8, textShadow: '2px 2px 4px rgba(0,0,0,0.9)'}}>{cur.kicker}</div>
      </div>
      <Subtitles lines={voice.lines} f={frame} fps={fps} total={IS_SEC} bottom={80} />
    </AbsoluteFill>
  );
};
EOF
echo "TimeTravel2.tsx created"