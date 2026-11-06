import Section from '../components/common/Section';
import Heading from '../components/common/Heading';
import QualityBlock from '../components/common/QualityBlock';
import OrderSteps from '../components/common/OrderSteps';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { qualitySealHtml } from '../utils/art/qualitySeal';

export default function Quality() {
  useDocumentTitle('Arusuvai Foods | Quality');
  return (
    <>
      <Section
        k={0}
        className="dk pg"
        style={{ minHeight: '70vh' }}
        before={<div className="seal" aria-hidden="true" dangerouslySetInnerHTML={{ __html: qualitySealHtml }} />}
      >
        <div className="wrap">
          <div className="eye">Quality Promise</div>
          <Heading as="h1">
            Three Simple Words. <em>One Everyday Promise.</em>
          </Heading>
          <QualityBlock ticks />
          <p className="lead" style={{ marginTop: 50 }}>
            Product weights, packaging and labelling details are confirmed by Arusuvai on enquiry. We make no certification, laboratory-test or compliance claims on this site until documentation is verified.
          </p>
        </div>
      </Section>

      <Section k={1}>
        <div className="wrap">
          <div className="eye">How to Order</div>
          <Heading>From enquiry to order.</Heading>
          <OrderSteps />
        </div>
      </Section>
    </>
  );
}
