import React from 'react';
import {Composition} from 'remotion';
import {Example, EX_FPS, EX_SEC} from './toon/episodes/Example';
import {StickExample, SX_FPS, SX_SEC} from './toon/episodes/StickExample';
import {InternetShort, IS_FPS, IS_SEC} from './toon/episodes/InternetShort';
import {TechStop, IS_FPS as TS_FPS, IS_SEC as TS_SEC} from './toon/episodes/TechStop';
import {AnimalTalk, IS_FPS as AT_FPS, IS_SEC as AT_SEC} from './toon/episodes/AnimalTalk';
import {GravityGone, IS_FPS as GG_FPS, IS_SEC as GG_SEC} from './toon/episodes/GravityGone';
import {Fly, IS_FPS as FL_FPS, IS_SEC as FL_SEC} from './toon/episodes/Fly';
import {SkyTest} from './toon/episodes/SkyTest';

export const Root: React.FC = () => (
  <>
    <Composition id="Example" component={Example} width={1920} height={1080} fps={EX_FPS} durationInFrames={Math.round(EX_SEC * EX_FPS)} defaultProps={{vertical: false}} />
    <Composition id="StickExample" component={StickExample} width={1920} height={1080} fps={SX_FPS} durationInFrames={Math.round(SX_SEC * SX_FPS)} />
    <Composition id="InternetShort" component={InternetShort} width={1920} height={1080} fps={IS_FPS} durationInFrames={Math.round(IS_SEC * IS_FPS)} />
    <Composition id="AnimalTalk" component={AnimalTalk} width={1920} height={1080} fps={AT_FPS} durationInFrames={Math.round(AT_SEC * AT_FPS)} />
    <Composition id="GravityGone" component={GravityGone} width={1920} height={1080} fps={GG_FPS} durationInFrames={Math.round(GG_SEC * GG_FPS)} />
    <Composition id="Fly" component={Fly} width={1920} height={1080} fps={FL_FPS} durationInFrames={Math.round(FL_SEC * FL_FPS)} />
    <Composition id="TechStop" component={TechStop} width={1920} height={1080} fps={TS_FPS} durationInFrames={Math.round(TS_SEC * TS_FPS)} />
    <Composition id="SkyTest" component={SkyTest} width={1920} height={1080} fps={30} durationInFrames={30} />
  </>
);
