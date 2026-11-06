import { Link } from 'react-router-dom';
import Section from '../common/Section';
import Heading from '../common/Heading';
import ScrubText from '../common/ScrubText';

export const INTRO =
  "At Arusuvai, we believe the heart of every great meal is the ingredient behind it. Inspired by Tamil Nadu's food traditions, we bring together everyday pantry essentials to help make home cooking familiar, flavourful and enjoyable.";

export default function StorySection({ k }) {
  return (
    <Section k={k}>
      <div className="wrap split">
        <div className="rv">
          <div className="eye">Our Story</div>
          <Heading>
            Rooted in Tradition. <em>Chosen with Care.</em>
          </Heading>
          <ScrubText>{INTRO}</ScrubText>
          <div className="cta">
            <Link className="btn line" to="/about">
              Read Our Story <i>→</i>
            </Link>
          </div>
        </div>
        <div className="rv comp" style={{ '--d': '.15s' }}>
          <div className="arch2" />
          <img className="c1" src="/images/Coriander_Seeds.webp" alt="Coriander seeds" loading="lazy" />
          <img className="c2" src="/images/Cumin_Seed.webp" alt="Cumin seeds" loading="lazy" />
          <img className="c3" src="/images/Fenugreek_Seeds.webp" alt="Fenugreek seeds" loading="lazy" />
        </div>
      </div>
    </Section>
  );
}
