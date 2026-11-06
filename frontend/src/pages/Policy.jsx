import { useParams } from 'react-router-dom';
import Section from '../components/common/Section';
import Heading from '../components/common/Heading';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useFetch from '../hooks/useFetch';
import { api } from '../api/client';

// Privacy / Shipping / Returns / Terms – one component, content comes from the API.
export default function Policy() {
  const { key } = useParams();
  const { data: policy } = useFetch(() => api.getPolicy(key), [key]);
  useDocumentTitle(policy ? `Arusuvai Foods | ${policy.title}` : 'Arusuvai Foods | Policy');

  if (!policy) return <Section k={0} className="pg pol" style={{ minHeight: '70vh' }} />;

  return (
    <Section k={0} className="pg pol">
      <div className="wrap" style={{ maxWidth: 800 }}>
        <div className="eye">Policy</div>
        <Heading as="h1" style={{ fontSize: 'clamp(2.2rem,5vw,3.6rem)' }}>
          {policy.title}
        </Heading>
        <p className="note">
          <b>Draft for review.</b> Items in [brackets] are unconfirmed business terms and must be approved before publication.
        </p>
        {policy.sections.map((s) => (
          <div key={s.heading}>
            <h3>{s.heading}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
