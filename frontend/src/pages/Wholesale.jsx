import { useState } from 'react';
import Section from '../components/common/Section';
import Heading from '../components/common/Heading';
import FormField from '../components/common/FormField';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { api } from '../api/client';
import { useCatalog } from '../context/CatalogContext';
import { useCart } from '../context/CartContext';
import { validateEnquiry } from '../utils/validateEnquiry';
import { enquiryMessage } from '../utils/whatsapp';

const BUYER_TYPES = ['Retailer', 'Grocery store / Supermarket', 'Wholesaler / Distributor', 'Caterer', 'Food-service buyer', 'Other'];

// key = API field name, id = DOM id (same ids as the original page)
const FIELDS = [
  { key: 'name', id: 'name', label: 'Name *' },
  { key: 'business', id: 'biz', label: 'Business name *' },
  { key: 'phone', id: 'phone', label: 'Phone *', type: 'tel', autoComplete: 'tel' },
  { key: 'email', id: 'email', label: 'Email', type: 'email' },
  { key: 'country', id: 'country', label: 'Country *' },
  { key: 'buyerType', id: 'bt', label: 'Buyer type *', as: 'select', options: BUYER_TYPES },
  { key: 'products', id: 'prod', label: 'Products required *', as: 'textarea', rows: 2, full: true },
  { key: 'quantities', id: 'qty', label: 'Required quantities *' },
  { key: 'packSizes', id: 'pack', label: 'Preferred pack sizes' },
  { key: 'deliveryLocation', id: 'loc', label: 'Delivery location *', full: true },
  { key: 'notes', id: 'more', label: 'Additional requirements', as: 'textarea', rows: 3, full: true },
];

const EMPTY = { name: '', business: '', phone: '', email: '', country: 'India', buyerType: '', products: '', quantities: '', packSizes: '', deliveryLocation: '', notes: '' };

export default function Wholesale() {
  useDocumentTitle('Arusuvai Foods | Wholesale');
  const { wa } = useCatalog();
  const { showToast } = useCart();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const setValue = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);
    const firstKey = Object.keys(found)[0];
    if (firstKey) return document.getElementById(FIELDS.find((f) => f.key === firstKey).id)?.focus();

    setSubmitting(true);
    // Open the tab right now (inside the click) so pop-up blockers allow it, then point it at WhatsApp.
    const tab = window.open('', '_blank');
    let url;
    try {
      const res = await api.createEnquiry(values);
      url = res.whatsappUrl;
      showToast('Enquiry saved – opening WhatsApp');
      setValues(EMPTY);
    } catch (err) {
      if (err.errors) {
        // server-side validation message
        setErrors(err.errors);
        tab?.close();
        setSubmitting(false);
        return;
      }
      // API unreachable: still let the buyer send the enquiry on WhatsApp
      url = wa(enquiryMessage(values));
    }
    if (tab) {
      tab.opener = null;
      tab.location.href = url;
    } else {
      window.location.href = url;
    }
    setSubmitting(false);
  };

  return (
    <Section k={0} className="pg">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <div className="eye">Wholesale &amp; Bulk</div>
        <Heading as="h1" style={{ fontSize: 'clamp(2.4rem,6vw,4.4rem)' }}>
          Your Requirements. <em>Our Attention.</em>
        </Heading>
        <p className="lead">
          Looking for pantry essentials in larger quantities? Tell us which products you need, the required quantities and your delivery location. Arusuvai will confirm availability and share a suitable quotation.
        </p>

        {/* animated delivery truck */}
        <div className="tkw" aria-hidden="true">
          <div className="tkr" />
          <div className="tkt">
            <i />
            <i />
            <i />
          </div>
        </div>

        <form id="wf" noValidate onSubmit={handleSubmit}>
          {FIELDS.map(({ key, ...field }, i) => (
            <FormField key={key} {...field} index={i} value={values[key]} error={errors[key]} onChange={setValue(key)} />
          ))}
          <div className="full" style={{ '--x': '36px', animation: `fin .7s ${0.2 + FIELDS.length * 0.07}s cubic-bezier(.2,.7,.2,1) both` }}>
            <button className="btn wa" type="submit" disabled={submitting}>
              {submitting ? 'Saving…' : 'Prepare WhatsApp Enquiry'} <i>→</i>
            </button>
            <p className="note" style={{ marginTop: 16 }}>
              Your enquiry is saved so Arusuvai can follow up, and WhatsApp opens with your message ready to send. Prices, minimum orders and delivery charges are confirmed in the quotation.
            </p>
          </div>
        </form>
      </div>
    </Section>
  );
}
