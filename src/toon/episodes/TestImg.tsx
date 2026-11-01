import React from 'react';
import {AbsoluteFill, staticFile} from "remotion";

export const TestImg: React.FC = () => {
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <img src={staticFile('test_images/egypt.png')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    </AbsoluteFill>
  );
};
