import { Link } from 'react-router-dom';
import Section from '../components/common/Section';
import Heading from '../components/common/Heading';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useFetch from '../hooks/useFetch';
import { api } from '../api/client';
import { useCatalog } from '../context/CatalogContext';
import { contactSceneHtml } from '../utils/art/contactScene';
import { GENERAL_ENQUIRY } from '../utils/whatsapp';

const SCENE = contactSceneHtml();

export default function Contact() {
  useDocumentTitle('Arusuvai Foods | Contact');
  const { site, wa } = useCatalog();
  const { data: faqs } = useFetch(() => api.getFaqs(), []);

  return (
    <Section k={0} className="pg">
      <div className="wrap">
        <div className="eye">Contact Us</div>
        <Heading as="h1" style={{ fontSize: 'clamp(2.4rem,6vw,4.4rem)' }}>
          Let's <em>talk</em> pantry.
        </Heading>

        <div className="sc cts" aria-hidden="true" dangerouslySetInnerHTML={{ __html: SCENE }} />

        <div className="split" style={{ marginTop: 40, alignItems: 'start' }}>
          <div className="card" style={{ padding: 30 }}>
            <h3>{site?.owner}</h3>
            <p style={{ color: 'var(--mu)' }}>
              {site?.ownerTitle}
              <br />
              Arusuvai Foods · {site?.company}
              <br />
              {site?.address}
            </p>
            <p style={{ marginTop: 14 }}>
              <a href={`tel:${site?.phoneHref}`} style={{ font: '600 1.8rem var(--ser)', color: 'var(--g)' }}>
                {site?.phone}
              </a>
            </p>
            <div className="cta">
              <a className="btn wa" target="_blank" rel="noopener noreferrer" href={wa(GENERAL_ENQUIRY)}>
                WhatsApp Us <i>→</i>
              </a>
              <Link className="btn line" to="/wholesale">
                Wholesale Enquiry
              </Link>
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: '2.2rem', marginBottom: 10 }}>Frequently asked</h2>
            {faqs?.map((f, i) => (
              <details key={f._id} style={{ '--x': '40px', animation: `fin .6s ${0.3 + i * 0.09}s cubic-bezier(.2,.7,.2,1) both` }}>
                <summary>{f.question}</summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
