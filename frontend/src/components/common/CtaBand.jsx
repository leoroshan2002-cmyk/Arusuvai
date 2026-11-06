import { Link } from 'react-router-dom';
import Section from './Section';
import Heading from './Heading';
import { useCatalog } from '../../context/CatalogContext';
import { GENERAL_ENQUIRY } from '../../utils/whatsapp';

// Closing call-to-action band used at the bottom of Home and About.
export default function CtaBand({ k }) {
  const { wa } = useCatalog();
  return (
    <Section k={k} className="dk band">
      <div className="wrap rv">
        <Heading>
          Let's Bring the Taste of <em>Arusuvai</em> to Your Kitchen.
        </Heading>
        <div className="cta">
          <Link className="btn gold" to="/products">
            Explore Products <i>→</i>
          </Link>
          <a className="btn line" target="_blank" rel="noopener noreferrer" href={wa(GENERAL_ENQUIRY)}>
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </Section>
  );
}
