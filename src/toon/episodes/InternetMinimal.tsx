import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {Stickman, STICK, STICK_RED} from '../rig/Stickman';
import {makePose, poseAt, alive, addPart} from '../lib/poses';
import {THEMES} from '../lib/fx';
import {Sky, Skyline, Rooftop, ROOF} from '../scene/Rooftop';

export const IM_FPS = 30;
export const IM_SEC = 5;

export const InternetMinimal: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const th = THEMES.gold;
  const s = 1.2, at = {x: 960, y: ROOF.stand - STICK.sole * s, s};
  const body = poseAt(t, [[0, 'idle']], 0.3);
  const pose = makePose(at, addPart(body, alive(t, 1)), {open: 1, wide: 0, brow: 0, mouthOpen: 0, smile: 0}, {});
  return (
    <AbsoluteFill style={{background: '#0a0a14'}}>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        <g transform="translate(960 540) scale(1) translate(-960 -540)">
          <Sky theme={th} t={t} id="sky" />
          <Skyline theme={th} t={t} shift={0} />
          <Rooftop theme={th} t={t} />
          <Stickman pose={pose} look={STICK_RED} id="stick" />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
