import { Link } from 'react-router-dom';
import Hero from '../components/home/Hero';
import Marquee from '../components/home/Marquee';
import Stats from '../components/home/Stats';
import StorySection from '../components/home/StorySection';
import Wave from '../components/home/Wave';
import Journey from '../components/home/Journey';
import CategoriesSection from '../components/home/CategoriesSection';
import FeaturedSection from '../components/home/FeaturedSection';
import Section from '../components/common/Section';
import Heading from '../components/common/Heading';
import QualityBlock from '../components/common/QualityBlock';
import OrderSteps from '../components/common/OrderSteps';
import CtaBand from '../components/common/CtaBand';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Home() {
  useDocumentTitle('Arusuvai Foods | Spices, Dals & Pantry Essentials');

  return (
    <>
      <Hero />
      <Marquee />
      <Stats k={1} />
      <StorySection k={2} />
      <Wave />
      <Journey />
      <CategoriesSection k={3} />
      <FeaturedSection k={4} />

      <Section k={5} className="dk">
        <div className="wrap">
          <div className="eye">Quality Promise</div>
          <Heading className="rv">
            Three Simple Words. <em>One Everyday Promise.</em>
          </Heading>
          <QualityBlock />
        </div>
      </Section>

      <Section k={6}>
        <div className="wrap">
          <div className="eye">How to Order</div>
          <Heading className="rv">Four easy steps.</Heading>
          <OrderSteps />
        </div>
      </Section>

      <Section k={7} className="cr">
        <div className="wrap split">
          <div className="rv">
            <div className="eye">Wholesale</div>
            <Heading>
              Good Ingredients. <em>Better Business Connections.</em>
            </Heading>
          </div>
          <div className="rv" style={{ '--d': '.15s' }}>
            <p className="lead" style={{ marginTop: 0 }}>
              Arusuvai welcomes enquiries from retailers, grocery stores, caterers and food-service businesses. Share the products, required quantity and delivery location. We will confirm availability and prepare a quote based on your requirements.
            </p>
            <div className="cta">
              <Link className="btn gold" to="/wholesale">
                Request a Bulk Quote <i>→</i>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand k={8} />
    </>
  );
}
