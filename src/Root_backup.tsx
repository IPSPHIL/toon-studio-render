// One <Composition> per episode. Add new episodes here (2D and 3D, 16:9 and 9:16).
import React from 'react';
import {Composition} from 'remotion';
import {Example, EX_FPS, EX_SEC} from './toon/episodes/Example';
import {Superhero, SU_FPS, SU_SEC} from './toon/episodes/Superhero';
import {MarketCap, MC_FPS, MC_SEC} from './toon/episodes/MarketCap';
import {Example3D} from './toon/episodes/Example3D';
import {StickExample, StickPoses, InfoCards, SX_FPS, SX_SEC} from './toon/episodes/StickExample';

import {InternetShort, IS_FPS, IS_SEC} from './toon/episodes/InternetShort';
import {VoiceDebug} from './toon/episodes/VoiceDebug';
import {InternetTest, IT_FPS, IT_SEC} from './toon/episodes/InternetTest';
import {InternetMinimal, IM_FPS, IM_SEC} from './toon/episodes/InternetMinimal';

export const Root: React.FC = () => (
  <>
    <Composition id="Example" component={Example} width={1920} height={1080} fps={EX_FPS} durationInFrames={Math.round(EX_SEC * EX_FPS)} defaultProps={{vertical: false}} />
    <Composition id="Superhero" component={Superhero} width={1920} height={1080} fps={SU_FPS} durationInFrames={Math.round(SU_SEC * SU_FPS)} defaultProps={{vertical: false}} />
    <Composition id="MarketCap" component={MarketCap} width={1920} height={1080} fps={MC_FPS} durationInFrames={Math.round(MC_SEC * MC_FPS)} defaultProps={{vertical: false}} />
    <Composition id="ExampleVertical" component={Example} width={1080} height={1920} fps={EX_FPS} durationInFrames={Math.round(EX_SEC * EX_FPS)} defaultProps={{vertical: true}} />
    <Composition id="Example3D" component={Example3D} width={1920} height={1080} fps={EX_FPS} durationInFrames={Math.round(EX_SEC * EX_FPS)} />
    <Composition id="StickExample" component={StickExample} width={1920} height={1080} fps={SX_FPS} durationInFrames={Math.round(SX_SEC * SX_FPS)} />
    <Composition id="StickPoses" component={StickPoses} width={1920} height={1080} fps={30} durationInFrames={30} />
    <Composition id="InfoCards" component={InfoCards} width={1920} height={1080} fps={30} durationInFrames={240} />
    <Composition id="InternetShort" component={InternetShort} width={1920} height={1080} fps={IS_FPS} durationInFrames={Math.round(IS_SEC * IS_FPS)} />
    <Composition id="VoiceDebug" component={VoiceDebug} width={1920} height={1080} fps={30} durationInFrames={30} />
    <Composition id="InternetTest" component={InternetTest} width={1920} height={1080} fps={IT_FPS} durationInFrames={Math.round(IT_SEC * IT_FPS)} />
    <Composition id="InternetMinimal" component={InternetMinimal} width={1920} height={1080} fps={IM_FPS} durationInFrames={Math.round(IM_SEC * IM_FPS)} />
  </>
);
