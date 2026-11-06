import { sceneHtml, miniSceneHtml, bandSceneHtml } from '../../utils/art/landscape';

// Decorative landscapes (static markup, generated once).
const HERO = sceneHtml();
const MINI = miniSceneHtml();
const BAND = bandSceneHtml();

export const Scene = () => <div className="scene" aria-hidden="true" dangerouslySetInnerHTML={{ __html: HERO }} />;
export const MiniScene = () => <div className="scene mini" aria-hidden="true" dangerouslySetInnerHTML={{ __html: MINI }} />;
export const BandScene = () => <div className="scene" aria-hidden="true" dangerouslySetInnerHTML={{ __html: BAND }} />;
