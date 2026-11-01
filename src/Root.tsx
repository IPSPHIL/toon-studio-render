import React from 'react';
import {Composition} from 'remotion';
import {Example, EX_FPS, EX_SEC} from './toon/episodes/Example';
import {StickExample, SX_FPS, SX_SEC} from './toon/episodes/StickExample';
import {InternetShort, IS_FPS, IS_SEC} from './toon/episodes/InternetShort';
import {TechStop, IS_FPS as TS_FPS, IS_SEC as TS_SEC} from './toon/episodes/TechStop';
import {AnimalTalk, IS_FPS as AT_FPS, IS_SEC as AT_SEC} from './toon/episodes/AnimalTalk';
import {GravityGone, IS_FPS as GG_FPS, IS_SEC as GG_SEC} from './toon/episodes/GravityGone';
import {Fly, IS_FPS as FL_FPS, IS_SEC as FL_SEC} from './toon/episodes/Fly';
import {MindRead, IS_FPS as MR_FPS, IS_SEC as MR_SEC} from './toon/episodes/MindRead';
import {TimeStop, IS_FPS as TS2_FPS, IS_SEC as TS2_SEC} from './toon/episodes/TimeStop';
import {TimeTravel, IS_FPS as TT_FPS, IS_SEC as TT_SEC} from './toon/episodes/TimeTravel';
import {TestImg} from './toon/episodes/TestImg';
import {TimeTravel2, IS_FPS as TT2_FPS, IS_SEC as TT2_SEC} from './toon/episodes/TimeTravel2';
import {TimeTravel3, IS_FPS as TT3_FPS, IS_SEC as TT3_SEC} from './toon/episodes/TimeTravel3';
import {TimeTravel4, IS_FPS as TT4_FPS, IS_SEC as TT4_SEC} from './toon/episodes/TimeTravel4';
import {TimeTravel5, IS_FPS as TT5_FPS, IS_SEC as TT5_SEC} from './toon/episodes/TimeTravel5';
import {TaxLossHarvesting, IS_FPS as TLH_FPS, IS_SEC as TLH_SEC} from './toon/episodes/TaxLossHarvesting';
import {TaxLossHarvesting2, IS_FPS as TLH2_FPS, IS_SEC as TLH2_SEC} from './toon/episodes/TaxLossHarvesting2';
import {SkyTest} from './toon/episodes/SkyTest';

export const Root: React.FC = () => (
  <>
    <Composition id="Example" component={Example} width={1920} height={1080} fps={EX_FPS} durationInFrames={Math.round(EX_SEC * EX_FPS)} defaultProps={{vertical: false}} />
    <Composition id="StickExample" component={StickExample} width={1920} height={1080} fps={SX_FPS} durationInFrames={Math.round(SX_SEC * SX_FPS)} />
    <Composition id="InternetShort" component={InternetShort} width={1920} height={1080} fps={IS_FPS} durationInFrames={Math.round(IS_SEC * IS_FPS)} />
    <Composition id="AnimalTalk" component={AnimalTalk} width={1920} height={1080} fps={AT_FPS} durationInFrames={Math.round(AT_SEC * AT_FPS)} />
    <Composition id="GravityGone" component={GravityGone} width={1920} height={1080} fps={GG_FPS} durationInFrames={Math.round(GG_SEC * GG_FPS)} />
    <Composition id="Fly" component={Fly} width={1920} height={1080} fps={FL_FPS} durationInFrames={Math.round(FL_SEC * FL_FPS)} />
    <Composition id="MindRead" component={MindRead} width={1920} height={1080} fps={MR_FPS} durationInFrames={Math.round(MR_SEC * MR_FPS)} />
    <Composition id="TimeStop" component={TimeStop} width={1920} height={1080} fps={TS2_FPS} durationInFrames={Math.round(TS2_SEC * TS2_FPS)} />
    <Composition id="TimeTravel" component={TimeTravel} width={1920} height={1080} fps={TT_FPS} durationInFrames={Math.round(TT_SEC * TT_FPS)} />
    <Composition id="TechStop" component={TechStop} width={1920} height={1080} fps={TS_FPS} durationInFrames={Math.round(TS_SEC * TS_FPS)} />
    <Composition id="SkyTest" component={SkyTest} width={1920} height={1080} fps={30} durationInFrames={30} />
    <Composition id="TestImg" component={TestImg} width={1920} height={1080} fps={30} durationInFrames={30} />
    <Composition id="TimeTravel2" component={TimeTravel2} width={1920} height={1080} fps={TT2_FPS} durationInFrames={Math.round(TT2_SEC * TT2_FPS)} />
    <Composition id="TimeTravel3" component={TimeTravel3} width={1920} height={1080} fps={TT3_FPS} durationInFrames={Math.round(TT3_SEC * TT3_FPS)} />
    <Composition id="TimeTravel4" component={TimeTravel4} width={1920} height={1080} fps={TT4_FPS} durationInFrames={Math.round(TT4_SEC * TT4_FPS)} />
    <Composition id="TimeTravel5" component={TimeTravel5} width={1920} height={1080} fps={TT5_FPS} durationInFrames={Math.round(TT5_SEC * TT5_FPS)} />
    <Composition id="TaxLossHarvesting" component={TaxLossHarvesting} width={1920} height={1080} fps={TLH_FPS} durationInFrames={Math.round(TLH_SEC * TLH_FPS)} />
    <Composition id="TaxLossHarvesting2" component={TaxLossHarvesting2} width={1920} height={1080} fps={TLH2_FPS} durationInFrames={Math.round(TLH2_SEC * TLH2_FPS)} />
  </>
);
