import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './components/layout/Loader';
import PageCurtain from './components/layout/PageCurtain';
import ScrollProgress from './components/layout/ScrollProgress';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartDrawer from './components/layout/CartDrawer';
import Toast from './components/layout/Toast';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Quality from './pages/Quality';
import Wholesale from './pages/Wholesale';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import NotFound from './pages/NotFound';
import { useCatalog } from './context/CatalogContext';
import useReveal from './hooks/useReveal';
import useParallax from './hooks/useParallax';
import useGlobalEffects from './hooks/useGlobalEffects';
import { prefersReducedMotion } from './utils/helpers';

export default function App() {
  const { loading, error, reload, products } = useCatalog();
  const location = useLocation();
  const latest = useRef(location);
  latest.current = location;

  // `shown` lags behind the URL so the page can swap while the spice curtain covers the screen
  const [shown, setShown] = useState(location);
  const [curtain, setCurtain] = useState({ key: 0, on: false });

  useReveal();
  useParallax();
  useGlobalEffects();

  // logo shape for the shimmer effect (CSS var used by .logo:after)
  useEffect(() => {
    document.documentElement.style.setProperty('--m', 'url(/images/logo.webp)');
  }, []);

  useEffect(() => {
    if (shown.pathname === location.pathname) return;
    if (prefersReducedMotion()) {
      setShown(latest.current);
      window.scrollTo(0, 0);
      return;
    }
    setCurtain((c) => ({ key: c.key + 1, on: true }));
    const swap = setTimeout(() => {
      setShown(latest.current);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 430);
    const end = setTimeout(() => setCurtain((c) => ({ ...c, on: false })), 980);
    return () => {
      clearTimeout(swap);
      clearTimeout(end);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const ready = !loading || products.length > 0;

  return (
    <>
      <Loader />
      <ScrollProgress />
      <PageCurtain key={curtain.key} active={curtain.on} />
      <Header />

      <main id="app">
        {error && !products.length ? (
          <section className="sec pg">
            <div className="wrap text-center">
              <h1>We couldn't load the shop</h1>
              <p className="lead mx-auto">The server isn't responding. Please check that the backend is running, then try again.</p>
              <button className="btn mt-6" onClick={reload}>
                Try again
              </button>
            </div>
          </section>
        ) : (
          ready && (
            <Routes location={shown}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:category" element={<Products />} />
              <Route path="/p/:slug" element={<ProductDetail />} />
              <Route path="/quality" element={<Quality />} />
              <Route path="/wholesale" element={<Wholesale />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/policy/:key" element={<Policy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )
        )}
      </main>

      <Footer />
      <CartDrawer />
      <Toast />
    </>
  );
}
