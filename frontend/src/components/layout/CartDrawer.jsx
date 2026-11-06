import { useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { imgSrc } from '../../utils/helpers';

export default function CartDrawer() {
  const { open, closeCart, items, changeQty, removeItem, whatsappUrl } = useCart();
  const closeBtn = useRef(null);

  useEffect(() => {
    if (open) closeBtn.current?.focus();
  }, [open]);

  return (
    <>
      <div id="ov" onClick={closeCart} />
      <aside id="dr" role="dialog" aria-modal="true" aria-label="Your cart" aria-hidden={!open}>
        <div className="dh">
          <h3>
            <svg viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="#D9A441" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 12v-2a5 5 0 0 1 10 0v2" />
              <path d="M5.5 12h21l-1.8 14.2a2 2 0 0 1-2 1.8H9.3a2 2 0 0 1-2-1.8L5.5 12Z" />
            </svg>{' '}
            Your Cart
          </h3>
          <button id="cx" ref={closeBtn} aria-label="Close cart" onClick={closeCart}>
            ✕
          </button>
        </div>
        <p className="note" style={{ margin: '0 20px' }}>
          No payment here. Send your list on WhatsApp and Arusuvai confirms price, stock and delivery.
        </p>

        <div id="cl">
          {items.length ? (
            items.map(({ product: p, qty }) => (
              <div className="ci" key={p.slug}>
                <img src={imgSrc(p.image)} alt="" />
                <div>
                  <b>{p.nameEn}</b>
                  <br />
                  <span className="ta" style={{ color: 'var(--br)', fontSize: '.9rem' }}>
                    {p.nameTa}
                  </span>
                </div>
                <div className="qt">
                  <button aria-label={`Decrease ${p.nameEn}`} onClick={() => changeQty(p.slug, -1)}>−</button>
                  <span>{qty}</span>
                  <button aria-label={`Increase ${p.nameEn}`} onClick={() => changeQty(p.slug, 1)}>+</button>
                  <button aria-label={`Remove ${p.nameEn}`} onClick={() => removeItem(p.slug)}>✕</button>
                </div>
              </div>
            ))
          ) : (
            <p className="empty">
              <span className="eb">🧺</span>
              <br />
              Your cart is empty.
              <br />
              Add products to send one enquiry.
            </p>
          )}
        </div>

        <div className="df">
          <a className="btn wa" id="cs" href={whatsappUrl || '#'} target="_blank" rel="noopener noreferrer" hidden={!whatsappUrl} style={{ width: '100%', justifyContent: 'center' }}>
            Send Enquiry on WhatsApp
          </a>
        </div>
      </aside>
    </>
  );
}
