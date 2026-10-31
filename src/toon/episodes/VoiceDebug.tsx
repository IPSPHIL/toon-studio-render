import React from 'react';
import {AbsoluteFill} from 'remotion';
import voice from './internetshort.voice.json';

export const VoiceDebug: React.FC = () => {
  console.log('voice:', JSON.stringify(voice).substring(0, 200));
  console.log('lines:', voice.lines?.length);
  console.log('words:', voice.lines?.[0]?.words?.length);
  return <AbsoluteFill style={{background: 'red'}} />;
};
