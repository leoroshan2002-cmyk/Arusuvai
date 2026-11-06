import { spiceSvg } from '../../utils/art/spiceShapes';

// Star-anise curtain that sweeps across the screen between pages. Re-mount (change key) to replay.
export default function PageCurtain({ active }) {
  return <div id="cu" className={active ? 'go' : ''} aria-hidden="true" dangerouslySetInnerHTML={{ __html: spiceSvg('anise') }} />;
}
