import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCatalog } from '../../context/CatalogContext';
import { useCart } from '../../context/CartContext';
import { MORE_INFO } from '../../utils/whatsapp';

const NAV = [
  { label: 'Home', to: '/', active: (p) => p === '/' },
  { label: 'About Us', to: '/about', active: (p) => p.startsWith('/about') },
  { label: 'Our Products', to: '/products', active: (p) => p.startsWith('/products') || p.startsWith('/p/') },
  { label: 'Quality Promise', to: '/quality', active: (p) => p.startsWith('/quality') },
  { label: 'Wholesale', to: '/wholesale', active: (p) => p.startsWith('/wholesale') },
  { label: 'Contact Us', to: '/contact', active: (p) => p.startsWith('/contact') },
];

export default function Header() {
  const { site, wa } = useCatalog();
  const { count, bumpKey, openCart } = useCart();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close the mobile menu after navigating
  useEffect(() => setMenuOpen(false), [pathname]);

  const whatsappHref = wa(MORE_INFO);

  return (
    <header id="hd" className={scrolled ? 's' : ''}>
      <div className="strip">{site?.stripText}</div>
      <div className="wrap nav">
        <Link className="logo" to="/" aria-label="Arusuvai Foods home">
          <img id="lg" src="/images/logo.webp" alt="Arusuvai Foods logo" />
        </Link>

        <nav id="nv" className={menuOpen ? 'o' : ''} aria-label="Main">
          <ul>
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={item.active(pathname) ? 'on' : ''}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="nwa">
              <a id="nwa" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
          </ul>
        </nav>

        <a className="btn wa hide-m" id="hwa" href={whatsappHref} target="_blank" rel="noopener noreferrer" style={{ padding: '11px 20px' }}>
          WhatsApp
        </a>

        <button className={`cartb${count > 0 ? ' has' : ''}`} id="cb" aria-label="Open cart" onClick={openCart}>
          <span className="cbg" />
          <svg className="cbs" viewBox="0 0 32 32" width="27" height="27" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path className="cbh" d="M11 12v-2a5 5 0 0 1 10 0v2" stroke="#F6DC94" strokeWidth="2.2" />
            <path className="cbb" d="M5.5 12h21l-1.8 14.2a2 2 0 0 1-2 1.8H9.3a2 2 0 0 1-2-1.8L5.5 12Z" fill="#FAF8F0" stroke="#FAF8F0" strokeWidth="1.4" />
            <path d="M12.5 17.5c.5 2.2 1.8 3.2 3.5 3.2s3-1 3.5-3.2" stroke="#064E3B" strokeWidth="2" />
          </svg>
          <span id="cn" key={bumpKey} className={bumpKey ? 'bp' : ''} hidden={!count}>
            {count}
          </span>
        </button>

        <button className="burger" id="bg" aria-label="Open menu" aria-expanded={menuOpen} aria-controls="nv" onClick={() => setMenuOpen((o) => !o)}>
          <span />
        </button>
      </div>
    </header>
  );
}
