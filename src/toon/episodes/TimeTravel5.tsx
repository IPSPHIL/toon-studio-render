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
  {src: 'test_images/egypt.png', label: 'ANCIENT EGYPT', kicker: 'Pyramids & Desert', icon: '🏛️', from: 0, to: IS.egypt,
    color: '#FFD700', stats: [{value: '4500', unit: 'years ago'}, {value: '2.3M', unit: 'stones'}, {value: '146m', unit: 'height'}]},
  {src: 'test_images/medieval.png', label: 'MEDIEVAL', kicker: 'Castles & Kingdoms', icon: '🏰', from: IS.egypt, to: IS.medieval,
    color: '#C0C0C0', stats: [{value: '1000-1500', unit: 'AD'}, {value: '5000+', unit: 'castles'}, {value: 'Knights', unit: '& Kings'}]},
  {src: 'test_images/industrial.png', label: 'INDUSTRIAL', kicker: 'Factories & Steam', icon: '🏭', from: IS.medieval, to: IS.industrial,
    color: '#FF6347', stats: [{value: '1760-1840', unit: 'era'}, {value: 'Steam', unit: 'power'}, {value: 'Factory', unit: 'revolution'}]},
  {src: 'test_images/modern.png', label: 'MODERN', kicker: 'Cities & Neon', icon: '🌃', from: IS.industrial, to: IS.future,
    color: '#00BFFF', stats: [{value: '2024', unit: 'now'}, {value: '8B', unit: 'people'}, {value: 'Digital', unit: 'age'}]},
  {src: 'test_images/future.png', label: 'FUTURE', kicker: 'Flying Cars & Holograms', icon: '🛸', from: IS.future, to: IS.flying,
    color: '#FF00FF', stats: [{value: '2100+', unit: 'era'}, {value: 'AI', unit: '& Space'}, {value: 'New', unit: 'frontier'}]},
  {src: 'test_images/future2.png', label: 'FUTURE', kicker: 'Holographic World', icon: '🛸', from: IS.flying, to: IS.now,
    color: '#00FFFF', stats: [{value: 'Virtual', unit: 'reality'}, {value: 'Quantum', unit: 'computing'}, {value: 'Beyond', unit: 'limits'}]},
  {src: 'test_images/present.png', label: 'NOW', kicker: 'This Moment', icon: '🌿', from: IS.now, to: IS.moment,
    color: '#00FF7F', stats: [{value: 'Right', unit: 'now'}, {value: 'Your', unit: 'moment'}, {value: 'Make', unit: 'it count'}]},
  {src: 'test_images/present2.png', label: 'NOW', kicker: 'Golden Hour', icon: '🌿', from: IS.moment, to: IS_SEC,
    color: '#FFD700', stats: [{value: 'Every', unit: 'second'}, {value: 'Every', unit: 'breath'}, {value: 'Life', unit: 'is art'}]},
];

const Subtitles: React.FC<{lines: any[]; f: number; fps: number; total: number; bottom: number}> = ({lines, f, fps, total, bottom}) => {
  const t = f / fps;
  const line = lines.find((l: any) => t >= l.start && t < l.end);
  if (!line) return null;
  return (
    <div style={{position: 'absolute', bottom, left: 0, right: 0, textAlign: 'center', color: 'white', fontSize: 30, fontWeight: 'bold', textShadow: '2px 2px 6px rgba(0,0,0,0.9)', padding: '0 60px', zIndex: 10}}>
      {line.text}
    </div>
  );
};

// Typewriter text component
const TypewriterText: React.FC<{text: string; t: number; start: number; speed: number; style: React.CSSProperties}> = ({text, t, start, speed, style}) => {
  const elapsed = Math.max(0, t - start);
  const chars = Math.floor(elapsed / speed);
  const display = text.slice(0, Math.min(chars, text.length));
  return <div style={style}>{display}<span style={{opacity: chars < text.length ? 1 : 0, animation: 'blink 1s infinite'}}>|</span></div>;
};

export const TimeTravel5: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const progress = Math.min(100, (t / IS_SEC) * 100);
  const cur = scenes.find(s => t >= s.from && t < s.to) || scenes[scenes.length - 1];
  const sceneStart = cur.from;
  const sceneEnd = cur.to;
  const fadeIn = Math.min(1, (t - sceneStart) / 0.3);
  const fadeOut = Math.min(1, (sceneEnd - t) / 0.2);
  const opacity = Math.min(fadeIn, fadeOut);
  const sceneProgress = Math.min(1, (t - sceneStart) / (sceneEnd - sceneStart));
  
  return (
    <AbsoluteFill style={{background: '#000', fontFamily: 'sans-serif'}}>
      <Audio src={staticFile('internet-short/mix8.wav')} />
      {/* Background image */}
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity}}>
        <img src={staticFile(cur.src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </div>
      {/* Dark overlay with gradient */}
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.5) 100%)', opacity, zIndex: 2}} />
      {/* Colored accent bar */}
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: 6, background: cur.color, opacity, zIndex: 6}} />
      {/* Title with icon */}
      <div style={{position: 'absolute', top: 40, left: 50, opacity, zIndex: 5, display: 'flex', alignItems: 'center', gap: 16}}>
        <span style={{fontSize: 48}}>{cur.icon}</span>
        <div>
          <div style={{color: 'white', fontSize: 48, fontWeight: 'bold', textShadow: '3px 3px 8px rgba(0,0,0,0.9)', letterSpacing: 3}}>{cur.label}</div>
          <div style={{color: cur.color, fontSize: 22, marginTop: 4, textShadow: '2px 2px 4px rgba(0,0,0,0.9)', fontWeight: 'bold'}}>{cur.kicker}</div>
        </div>
      </div>
      {/* Stats with color accents */}
      <div style={{position: 'absolute', bottom: 130, left: 50, right: 50, opacity, zIndex: 5, display: 'flex', justifyContent: 'space-around', gap: 16}}>
        {cur.stats.map((stat, i) => (
          <div key={i} style={{textAlign: 'center', background: `linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3))`, padding: '14px 20px', borderRadius: 14, backdropFilter: 'blur(6px)', border: `2px solid ${cur.color}40`, minWidth: 160}}>
            <div style={{color: cur.color, fontSize: 34, fontWeight: 'bold', textShadow: '2px 2px 6px rgba(0,0,0,0.9)'}}>{stat.value}</div>
            <div style={{color: 'rgba(255,255,255,0.85)', fontSize: 16, marginTop: 4, textTransform: 'uppercase', letterSpacing: 1}}>{stat.unit}</div>
          </div>
        ))}
      </div>
      {/* Progress bar */}
      <div style={{position: 'absolute', bottom: 0, left: 0, width: '100%', height: 4, background: 'rgba(255,255,255,0.2)', zIndex: 10}}>
        <div style={{width: `${progress}%`, height: '100%', background: `linear-gradient(90deg, ${cur.color}, ${cur.color}80)`, transition: 'width 0.1s'}} />
      </div>
      {/* Scene progress indicator */}
      <div style={{position: 'absolute', top: 40, right: 50, opacity, zIndex: 5, color: 'rgba(255,255,255,0.7)', fontSize: 16, fontWeight: 'bold'}}>
        {Math.round(sceneProgress * 100)}%
      </div>
      {/* Decorative line */}
      <div style={{position: 'absolute', top: 110, left: 50, width: `${opacity * 200}px`, height: 2, background: cur.color, zIndex: 5, opacity: opacity * 0.8}} />
      <Subtitles lines={voice.lines} f={frame} fps={fps} total={IS_SEC} bottom={50} />
    </AbsoluteFill>
  );
};
