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

const scenes = [
  {src: 'test_images/egypt.png', label: 'ANCIENT EGYPT', kicker: 'Pyramids & Desert', from: 0, to: IS.egypt,
    stats: [{value: '4500', unit: 'years ago'}, {value: '2.3M', unit: 'stones'}, {value: '146m', unit: 'height'}]},
  {src: 'test_images/medieval.png', label: 'MEDIEVAL', kicker: 'Castles & Kingdoms', from: IS.egypt, to: IS.medieval,
    stats: [{value: '1000-1500', unit: 'AD'}, {value: '5000+', unit: 'castles'}, {value: 'Knights', unit: '& Kings'}]},
  {src: 'test_images/industrial.png', label: 'INDUSTRIAL', kicker: 'Factories & Steam', from: IS.medieval, to: IS.industrial,
    stats: [{value: '1760-1840', unit: 'era'}, {value: 'Steam', unit: 'power'}, {value: 'Factory', unit: 'revolution'}]},
  {src: 'test_images/modern.png', label: 'MODERN', kicker: 'Cities & Neon', from: IS.industrial, to: IS.future,
    stats: [{value: '2024', unit: 'now'}, {value: '8B', unit: 'people'}, {value: 'Digital', unit: 'age'}]},
  {src: 'test_images/future.png', label: 'FUTURE', kicker: 'Flying Cars & Holograms', from: IS.future, to: IS.flying,
    stats: [{value: '2100+', unit: 'era'}, {value: 'AI', unit: '& Space'}, {value: 'New', unit: 'frontier'}]},
  {src: 'test_images/future2.png', label: 'FUTURE', kicker: 'Holographic World', from: IS.flying, to: IS.now,
    stats: [{value: 'Virtual', unit: 'reality'}, {value: 'Quantum', unit: 'computing'}, {value: 'Beyond', unit: 'limits'}]},
  {src: 'test_images/present.png', label: 'NOW', kicker: 'This Moment', from: IS.now, to: IS.moment,
    stats: [{value: 'Right', unit: 'now'}, {value: 'Your', unit: 'moment'}, {value: 'Make', unit: 'it count'}]},
  {src: 'test_images/present2.png', label: 'NOW', kicker: 'Golden Hour', from: IS.moment, to: IS_SEC,
    stats: [{value: 'Every', unit: 'second'}, {value: 'Every', unit: 'breath'}, {value: 'Life', unit: 'is art'}]},
];

const Subtitles: React.FC<{lines: any[]; f: number; fps: number; total: number; bottom: number}> = ({lines, f, fps, total, bottom}) => {
  const t = f / fps;
  const line = lines.find((l: any) => t >= l.start && t < l.end);
  if (!line) return null;
  return (
    <div style={{position: 'absolute', bottom, left: 0, right: 0, textAlign: 'center', color: 'white', fontSize: 32, fontWeight: 'bold', textShadow: '2px 2px 6px rgba(0,0,0,0.9)', padding: '0 60px', zIndex: 10}}>
      {line.text}
    </div>
  );
};

export const TimeTravel4: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const cur = scenes.find(s => t >= s.from && t < s.to) || scenes[scenes.length - 1];
  const sceneStart = cur.from;
  const sceneEnd = cur.to;
  const fadeIn = Math.min(1, (t - sceneStart) / 0.35);
  const fadeOut = Math.min(1, (sceneEnd - t) / 0.25);
  const opacity = Math.min(fadeIn, fadeOut);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Audio src={staticFile('internet-short/mix8.wav')} />
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity}}>
        <img src={staticFile(cur.src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </div>
      {/* Dark overlay for readability */}
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.4) 100%)', opacity, zIndex: 2}} />
      {/* Title */}
      <div style={{position: 'absolute', top: 50, left: 60, opacity, zIndex: 5}}>
        <div style={{color: 'white', fontSize: 52, fontWeight: 'bold', textShadow: '3px 3px 8px rgba(0,0,0,0.9)', letterSpacing: 2}}>{cur.label}</div>
        <div style={{color: 'rgba(255,255,255,0.9)', fontSize: 26, marginTop: 6, textShadow: '2px 2px 4px rgba(0,0,0,0.9)'}}>{cur.kicker}</div>
      </div>
      {/* Stats/Infographics */}
      <div style={{position: 'absolute', bottom: 140, left: 60, right: 60, opacity, zIndex: 5, display: 'flex', justifyContent: 'space-around'}}>
        {cur.stats.map((stat, i) => (
          <div key={i} style={{textAlign: 'center', background: 'rgba(0,0,0,0.5)', padding: '12px 24px', borderRadius: 12, backdropFilter: 'blur(4px)'}}>
            <div style={{color: '#FFD700', fontSize: 36, fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.9)'}}>{stat.value}</div>
            <div style={{color: 'rgba(255,255,255,0.8)', fontSize: 18, marginTop: 4}}>{stat.unit}</div>
          </div>
        ))}
      </div>
      <Subtitles lines={voice.lines} f={frame} fps={fps} total={IS_SEC} bottom={60} />
    </AbsoluteFill>
  );
};
