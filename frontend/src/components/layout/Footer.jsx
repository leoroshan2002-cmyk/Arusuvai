import { Link } from 'react-router-dom';
import { useCatalog } from '../../context/CatalogContext';

export default function Footer() {
  const { site } = useCatalog();
  return (
    <footer>
      <div className="wrap">
        <div className="fg">
          <div>
            <div className="plate">
              <img src="/images/logo.webp" alt="Arusuvai Foods logo" />
            </div>
            <p>
              <b style={{ color: '#fff', letterSpacing: '.2em' }}>QUALITY. FRESHNESS. TASTE.</b>
            </p>
            <p style={{ marginTop: 10 }}>
              Everyday cooking essentials, spices, pulses, seeds and pantry favourites for households, retailers and food-service buyers.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <Link to="/about">About Us</Link>
            <Link to="/products">Our Products</Link>
            <Link to="/quality">Quality Promise</Link>
            <Link to="/wholesale">Wholesale</Link>
            <Link to="/contact">Contact &amp; FAQ</Link>
          </div>
          <div>
            <h4>Policies</h4>
            <Link to="/policy/privacy">Privacy Policy</Link>
            <Link to="/policy/shipping">Shipping &amp; Delivery</Link>
            <Link to="/policy/returns">Returns &amp; Refunds</Link>
            <Link to="/policy/terms">Terms &amp; Conditions</Link>
          </div>
          <div>
            <h4>Contact</h4>
            <p>
              {site?.owner}, {site?.ownerTitle}
              <br />
              {site?.company}
              <br />
              {site?.address}
            </p>
            <a href={`tel:${site?.phoneHref}`} style={{ color: '#fff', fontWeight: 700 }}>
              {site?.phone}
            </a>
          </div>
        </div>
        <div className="copy">
          © {new Date().getFullYear()} Arusuvai Foods · {site?.company}
        </div>
      </div>
    </footer>
  );
}
