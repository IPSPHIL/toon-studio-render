import React from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import voice from './taxloss.voice.json';

export const IS_FPS = 30;
export const IS_SEC = Math.ceil(voice.total * 10) / 10;
const L = (i: number) => voice.lines[i];

export const IS = {
  title: L(0).start, what: L(1).start, sell: L(2).start, loss: L(3).start,
  offset: L(4).start, lower: L(5).start, save: L(6).start, stay: L(7).start,
  buy: L(8).start, notid: L(9).start, wash: L(10).start, days: L(11).start,
  no: L(12).start, example: L(13).start, drop: L(14).start, sell2: L(15).start,
  loss2: L(16).start, buy2: L(17).start, offset2: L(18).start, save2: L(19).start,
  repeat: L(20).start, harvest: L(21).start, reduce: L(22).start, grow: L(23).start,
  end: L(23).start, last: L(23).start,
};

const scenes = [
  {src: 'test_images/tax1.png', label: 'TAX LOSS HARVESTING', kicker: 'In 60 Seconds', icon: '💰', from: 0, to: IS.what,
    color: '#00D4AA', stats: [{value: 'Save', unit: 'on taxes'}, {value: 'Stay', unit: 'invested'}, {value: 'Grow', unit: 'wealth'}]},
  {src: 'test_images/tax2.png', label: 'WHAT IS IT?', kicker: 'Simple Definition', icon: '📖', from: IS.what, to: IS.sell,
    color: '#FFD700', stats: [{value: 'Sell', unit: 'losers'}, {value: 'Offset', unit: 'gains'}, {value: 'Save', unit: 'taxes'}]},
  {src: 'test_images/tax3.png', label: 'THE PROCESS', kicker: 'Step by Step', icon: '🔄', from: IS.sell, to: IS.wash,
    color: '#FF6B6B', stats: [{value: '1. Sell', unit: 'loser'}, {value: '2. Realize', unit: 'loss'}, {value: '3. Offset', unit: 'gains'}]},
  {src: 'test_images/tax4.png', label: 'WASH SALE RULE', kicker: 'IRS Compliance', icon: '⚖️', from: IS.wash, to: IS.example,
    color: '#FFA500', stats: [{value: '30 days', unit: 'window'}, {value: 'No', unit: 'identical'}, {value: 'Similar', unit: 'OK'}]},
  {src: 'test_images/tax5.png', label: 'EXAMPLE', kicker: 'Real Numbers', icon: '📊', from: IS.example, to: IS.repeat,
    color: '#00BFFF', stats: [{value: '-$10K', unit: 'loss'}, {value: '+$10K', unit: 'offset'}, {value: 'Tax', unit: 'saved'}]},
  {src: 'test_images/tax6.png', label: 'REPEAT YEARLY', kicker: 'Compound Savings', icon: '📅', from: IS.repeat, to: IS_SEC,
    color: '#9B59B6', stats: [{value: 'Every', unit: 'year'}, {value: 'Harvest', unit: 'losses'}, {value: 'Grow', unit: 'more'}]},
];

const Subtitles: React.FC<{lines: any[]; f: number; fps: number; total: number; bottom: number}> = ({lines, f, fps, total, bottom}) => {
  const t = f / fps;
  const line = lines.find((l: any) => t >= l.start && t < l.end);
  if (!line) return null;
  return (
    <div style={{position: 'absolute', bottom, left: 40, right: 40, textAlign: 'center', color: 'white', fontSize: 36, fontWeight: 'bold', textShadow: '3px 3px 8px rgba(0,0,0,0.95)', padding: '0 20px', zIndex: 10, lineHeight: 1.3}}>
      {line.text}
    </div>
  );
};

export const TaxLossHarvesting2: React.FC = () => {
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
    <AbsoluteFill style={{background: '#0a0a1a', fontFamily: 'sans-serif'}}>
      <Audio src={staticFile('internet-short/mix9.wav')} />
      {/* Background image */}
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity}}>
        <img src={staticFile(cur.src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </div>
      {/* Dark overlay */}
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.5) 100%)', opacity, zIndex: 2}} />
      {/* Colored accent bar */}
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: 6, background: `linear-gradient(90deg, ${cur.color}, ${cur.color}80, transparent)`, opacity, zIndex: 6}} />
      {/* Title with icon */}
      <div style={{position: 'absolute', top: 50, left: 60, opacity, zIndex: 5, display: 'flex', alignItems: 'center', gap: 18}}>
        <span style={{fontSize: 52}}>{cur.icon}</span>
        <div>
          <div style={{color: 'white', fontSize: 46, fontWeight: 'bold', textShadow: '3px 3px 10px rgba(0,0,0,0.9)', letterSpacing: 2}}>{cur.label}</div>
          <div style={{color: cur.color, fontSize: 24, marginTop: 6, textShadow: '2px 2px 6px rgba(0,0,0,0.9)', fontWeight: 'bold'}}>{cur.kicker}</div>
        </div>
      </div>
      {/* Stats */}
      <div style={{position: 'absolute', bottom: 150, left: 60, right: 60, opacity, zIndex: 5, display: 'flex', justifyContent: 'space-around', gap: 20}}>
        {cur.stats.map((stat, i) => (
          <div key={i} style={{textAlign: 'center', background: `linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.4))`, padding: '16px 24px', borderRadius: 16, backdropFilter: 'blur(8px)', border: `2px solid ${cur.color}50`, minWidth: 180, boxShadow: `0 4px 20px ${cur.color}20`}}>
            <div style={{color: cur.color, fontSize: 36, fontWeight: 'bold', textShadow: '2px 2px 8px rgba(0,0,0,0.9)'}}>{stat.value}</div>
            <div style={{color: 'rgba(255,255,255,0.85)', fontSize: 16, marginTop: 6, textTransform: 'uppercase', letterSpacing: 1.5}}>{stat.unit}</div>
          </div>
        ))}
      </div>
      {/* Progress bar */}
      <div style={{position: 'absolute', bottom: 0, left: 0, width: '100%', height: 5, background: 'rgba(255,255,255,0.15)', zIndex: 10}}>
        <div style={{width: `${progress}%`, height: '100%', background: `linear-gradient(90deg, ${cur.color}, ${cur.color}90)`, boxShadow: `0 0 10px ${cur.color}`}} />
      </div>
      {/* Scene progress */}
      <div style={{position: 'absolute', top: 50, right: 60, opacity, zIndex: 5, color: 'rgba(255,255,255,0.6)', fontSize: 18, fontWeight: 'bold'}}>
        {Math.round(sceneProgress * 100)}%
      </div>
      {/* Decorative line */}
      <div style={{position: 'absolute', top: 115, left: 60, width: `${opacity * 250}px`, height: 3, background: `linear-gradient(90deg, ${cur.color}, transparent)`, zIndex: 5, opacity: opacity * 0.9}} />
      <Subtitles lines={voice.lines} f={frame} fps={fps} total={IS_SEC} bottom={60} />
    </AbsoluteFill>
  );
};
