import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Sky} from '../scene/Rooftop';
import {THEMES} from '../lib/fx';

export const SkyTest: React.FC = () => {
  const th = THEMES.gold;
  return (
    <AbsoluteFill>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        <Sky theme={th} t={0} id="sky" />
      </svg>
    </AbsoluteFill>
  );
};
