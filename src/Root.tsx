import React from 'react';
import {Composition} from 'remotion';
import {Example, EX_FPS, EX_SEC} from './toon/episodes/Example';
import {StickExample, SX_FPS, SX_SEC} from './toon/episodes/StickExample';
import {InternetShort, IS_FPS, IS_SEC} from './toon/episodes/InternetShort';
import {TechStop, IS_FPS as TS_FPS, IS_SEC as TS_SEC} from './toon/episodes/TechStop';
import {SkyTest} from './toon/episodes/SkyTest';

export const Root: React.FC = () => (
  <>
    <Composition id="Example" component={Example} width={1920} height={1080} fps={EX_FPS} durationInFrames={Math.round(EX_SEC * EX_FPS)} defaultProps={{vertical: false}} />
    <Composition id="StickExample" component={StickExample} width={1920} height={1080} fps={SX_FPS} durationInFrames={Math.round(SX_SEC * SX_FPS)} />
    <Composition id="InternetShort" component={InternetShort} width={1920} height={1080} fps={IS_FPS} durationInFrames={Math.round(IS_SEC * IS_FPS)} />
    <Composition id="TechStop" component={TechStop} width={1920} height={1080} fps={TS_FPS} durationInFrames={Math.round(TS_SEC * TS_FPS)} />
    <Composition id="SkyTest" component={SkyTest} width={1920} height={1080} fps={30} durationInFrames={30} />
  </>
);
