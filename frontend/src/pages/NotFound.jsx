import { Link } from 'react-router-dom';
import Section from '../components/common/Section';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Arusuvai Foods | Page not found');
  return (
    <Section k={0} className="pg">
      <div className="wrap">
        <h1>Page not found</h1>
        <p className="lead">
          <Link to="/" className="font-bold text-brand-bright">
            Return home →
          </Link>
        </p>
      </div>
    </Section>
  );
}
