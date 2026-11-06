import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SectionDecor from '../common/SectionDecor';
import { Scene } from '../art/Scenes';
import ProductDeck from './ProductDeck';
import { useCatalog } from '../../context/CatalogContext';
import { SPICE_SHAPES } from '../../utils/art/spiceShapes';
import { TALK_TO_US } from '../../utils/whatsapp';

// Each word slides up one after the other
const HeroWords = ({ text }) =>
  text.split(' ').map((w, i) => (
    <Fragment key={i}>
      {i > 0 && ' '}
      <span className="hw">
        <span style={{ animationDelay: `${0.15 + i * 0.09}s` }}>{w}</span>
      </span>
    </Fragment>
  ));

const FALLING = ['cardamom', 'pepper', 'anise', 'chili', 'leaf', 'seed', 'cinnamon'];

export default function Hero() {
  const { wa } = useCatalog();

  return (
    <section className="hero">
      <SectionDecor hero k={0} />

      {/* spices drifting down the page */}
      <div className="srn" aria-hidden="true">
        {FALLING.flatMap((key, j) =>
          [0, 1].map((m) => (
            <span
              key={`${key}${m}`}
              style={{
                '--x': `${(j * 14 + m * 47 + 3) % 96}%`,
                '--s': `${22 + ((j * 7 + m * 11) % 22)}px`,
                '--t': `${14 + ((j + m * 3) % 9)}s`,
                '--dl': `${-(j * 2.3 + m * 4.1)}s`,
              }}
            >
              <svg viewBox="0 0 100 100" dangerouslySetInnerHTML={{ __html: SPICE_SHAPES[key] }} />
            </span>
          ))
        )}
      </div>

      <Scene />

      <div className="wrap hg">
        <div className="hp">
          <div className="eye">ARUSUVAI FOODS</div>
          <h1>
            <HeroWords text="Everyday Goodness. Traditional Soul." />
            <br />
            <em>
              <HeroWords text="Naturally Arusuvai." />
            </em>
          </h1>
          <div className="rwl">
            Shop fresh{' '}
            <span className="rwv">
              <i>Spices</i>
              <i>Dals &amp; Pulses</i>
              <i>Seeds</i>
              <i>Nuts &amp; Mixes</i>
              <i>Pantry Staples</i>
            </span>
          </div>
          <p className="lead rv in">
            Bring home the ingredients that make every meal memorable. Explore everyday spices, dals, seeds and pantry favourites selected for the heart of your kitchen.
          </p>
          <div className="cta">
            <Link className="btn" to="/products">
              Explore Our Products <i>→</i>
            </Link>
            <a className="btn line" target="_blank" rel="noopener noreferrer" href={wa(TALK_TO_US)}>
              Talk to Arusuvai
            </a>
          </div>
          <div className="trust">QUALITY. FRESHNESS. TASTE.</div>
          <div className="chips2">
            <span>🌿 Farm-fresh range</span>
            <span>🗣 English &amp; தமிழ்</span>
            <span>💬 Order on WhatsApp</span>
          </div>
        </div>
        <ProductDeck />
      </div>
      <div className="scroll" />
    </section>
  );
}
