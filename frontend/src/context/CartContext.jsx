import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useCatalog } from './CatalogContext';
import { cartMessage } from '../utils/whatsapp';
import { flyToCart } from '../utils/flyToCart';

const CartContext = createContext(null);
const STORAGE_KEY = 'ac'; // same key as the original site

const readStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {};
  } catch {
    return {};
  }
};

export function CartProvider({ children }) {
  const { products, wa } = useCatalog();
  const [cart, setCart] = useState(readStorage); // { slug: qty }
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState({ text: '', show: false });
  const [bumpKey, setBumpKey] = useState(0); // restarts the count "pop" animation
  const toastTimer = useRef();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* storage unavailable – ignore */
    }
  }, [cart]);

  // The CSS expects a "co" class on <body> while the drawer is open
  useEffect(() => {
    document.body.classList.toggle('co', open);
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const showToast = useCallback((text) => {
    setToast({ text, show: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 1800);
  }, []);

  const addToCart = useCallback(
    (product, sourceImg) => {
      flyToCart(sourceImg);
      setCart((c) => ({ ...c, [product.slug]: (c[product.slug] || 0) + 1 }));
      setBumpKey((k) => k + 1);
      showToast(`${product.nameEn} added to cart`);
    },
    [showToast]
  );

  const changeQty = useCallback((slug, delta) => {
    setCart((c) => {
      const next = { ...c, [slug]: (c[slug] || 0) + delta };
      if (next[slug] < 1) delete next[slug];
      return next;
    });
  }, []);

  const removeItem = useCallback((slug) => {
    setCart((c) => {
      const next = { ...c };
      delete next[slug];
      return next;
    });
  }, []);

  const value = useMemo(() => {
    const items = Object.entries(cart)
      .map(([slug, qty]) => ({ product: products.find((p) => p.slug === slug), qty }))
      .filter((i) => i.product);
    const count = Object.values(cart).reduce((a, b) => a + b, 0);
    return {
      items,
      count,
      open,
      toast,
      bumpKey,
      showToast,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      addToCart,
      changeQty,
      removeItem,
      whatsappUrl: items.length ? wa(cartMessage(items)) : '',
    };
  }, [cart, products, open, toast, bumpKey, showToast, addToCart, changeQty, removeItem, wa]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
