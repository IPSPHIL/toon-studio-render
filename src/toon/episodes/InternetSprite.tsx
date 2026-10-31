import React from 'react';
import {AbsoluteFill, Audio, Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

export const IS_FPS = 30;
export const IS_SEC = 50.42;

export const InternetSprite: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  // Sprite sheet is 1024x1024, 3x2 grid = 6 poses
  // Each cell: 341x512
  const cellW = 341;
  const cellH = 512;

  // Determine current pose based on time
  const poses = [0, 1, 2, 3, 4, 5];
  const poseIdx = Math.floor(t / 8) % 6;
  const col = poseIdx % 3;
  const row = Math.floor(poseIdx / 3);
  const x = col * cellW;
  const y = row * cellH;

  return (
    <AbsoluteFill style={{background: '#1a1a2e'}}>
      <Audio src={staticFile('internet-short/mix.wav')} />
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        <image
          href={staticFile('characters/so3_sprite.png')}
          x={700}
          y={200}
          width={400}
          height={600}
          preserveAspectRatio="xMidYMid meet"
        />
        <text x={960} y={100} fill="#ffffff" fontSize={48} textAnchor="middle" fontWeight="bold">
          Что если интернет пропадёт навсегда?
        </text>
      </svg>
    </AbsoluteFill>
  );
};
