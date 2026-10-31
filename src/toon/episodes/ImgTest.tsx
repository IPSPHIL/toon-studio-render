import React from 'react';
import {AbsoluteFill, staticFile} from 'remotion';

export const ImgTest: React.FC = () => {
  return (
    <AbsoluteFill style={{background: '#ff0000'}}>
      <img src={staticFile('characters/pose_0.png')} style={{width: 300, height: 400, position: 'absolute', left: 100, top: 100}} />
    </AbsoluteFill>
  );
};
