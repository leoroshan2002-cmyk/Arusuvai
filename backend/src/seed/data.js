// Seed data copied from the original index.html (products, categories, FAQ, policies).
export const categories = [
  { name: 'Spices', title: 'Everyday Spices', color: '#C8402A', image: 'Green_Cardamom' },
  { name: 'Dals & Pulses', title: 'Dals & Pulses', color: '#E39B16', image: 'Golden_Split_Peas' },
  { name: 'Seasonings & Mixes', title: 'Seeds & Seasonings', color: '#2F9E6B', image: 'Mustard_Seed' },
  { name: 'Traditional Pantry', title: 'Traditional Pantry', color: '#B8742A', image: 'Country_Sugar' },
  { name: 'Nuts & Mixes', title: 'Nuts & Mixes', color: '#D4785A', image: 'Cashew_nut' },
].map((c, i) => ({ ...c, order: i }));

const FEATURED = ['cardamom', 'turmeric-powder', 'cashew-nuts', 'black-pepper', 'toor-dal', 'country-jaggery'];

export const products = [
  ['cardamom', 'Cardamom', 'ஏலக்காய்', 'Spices', 'Green_Cardamom'],
  ['black-pepper', 'Black Pepper', 'மிளகு', 'Spices', 'Black_Peppercorns'],
  ['urad-dal', 'Urad Dal', 'உளுத்தம் பருப்பு', 'Dals & Pulses', 'Cream_Beans'],
  ['toor-dal', 'Toor Dal', 'துவரம் பருப்பு', 'Dals & Pulses', 'Golden_Split_Peas'],
  ['moong-dal', 'Moong Dal', 'பாசிப்பருப்பு', 'Dals & Pulses', 'Green_Mung_Beans'],
  ['chana-dal', 'Chana Dal', 'கடலைப் பருப்பு', 'Dals & Pulses', 'Golden_Lentils'],
  ['black-chickpeas', 'Black Chickpeas', 'கருப்பு கொண்டைக்கடலை', 'Dals & Pulses', 'Black_Chickpeas'],
  ['country-jaggery', 'Country Jaggery', 'நாட்டு வெல்லம்', 'Traditional Pantry', 'Country_Sugar'],
  ['turmeric-powder', 'Turmeric Powder', 'மஞ்சள் தூள்', 'Spices', 'Turmeric_Powder'],
  ['cumin-seeds', 'Cumin Seeds', 'சீரகம்', 'Spices', 'Cumin_Seed'],
  ['fennel-seeds', 'Fennel Seeds', 'பெருஞ்சீரகம்', 'Spices', 'Fennel_Seeds'],
  ['fenugreek-seeds', 'Fenugreek Seeds', 'வெந்தயம்', 'Spices', 'Fenugreek_Seeds'],
  ['coriander-seeds', 'Coriander Seeds', 'கொத்தமல்லி விதை', 'Spices', 'Coriander_Seeds'],
  ['cashew-nuts', 'Cashew Nuts', 'முந்திரி பருப்பு', 'Nuts & Mixes', 'Cashew_nut'],
  ['mustard-urad-mix', 'Mustard & Urad Dal Mix', 'கடுகு உளுத்தம் பருப்பு கலவை', 'Seasonings & Mixes', 'Mustard_Seed'],
].map(([slug, nameEn, nameTa, category, image], order) => ({
  slug, nameEn, nameTa, category, image, order,
  price: null, currency: 'INR', pack: '500 g (to be confirmed)', approved: false,
  featured: FEATURED.includes(slug),
  featuredOrder: FEATURED.indexOf(slug),
}));

export const faqs = [
  ['What products does Arusuvai offer?', 'Spices, dals and pulses, seeds, nuts and traditional pantry items. See Our Products for all 15.'],
  ['How can I check current prices?', 'Prices are confirmed by Arusuvai on request. Use the Enquire button on any product to ask on WhatsApp.'],
  ['Which pack sizes are available?', 'Pack sizes are being confirmed. Please ask us for the sizes available for your product.'],
  ['How do I enquire about a product?', 'Tap Enquire on a product; WhatsApp opens with the product name filled in.'],
  ['Can I request a wholesale quotation?', 'Yes. Use the Wholesale page to share products, quantities and delivery location.'],
  ['How are delivery charges confirmed?', 'Delivery details and charges are confirmed by Arusuvai after you send an enquiry.'],
  ['How can I contact Arusuvai?', 'Call or WhatsApp +91 90036 31699, or write to us from the Contact page.'],
].map(([question, answer], order) => ({ question, answer, order }));

export const policies = [
  {
    key: 'privacy',
    title: 'Privacy Policy',
    sections: [
      { heading: 'Information we receive', body: 'When you submit the wholesale form, the details you enter (name, business, phone, email, requirements) are saved by Arusuvai so the team can follow up, and a WhatsApp message is prepared for you to send. Product enquiry links open WhatsApp with a pre-filled message that is sent only when you press Send. [Review: confirm retention period and any analytics or other third-party services before publication.]' },
      { heading: 'How we use it', body: 'To reply to enquiries, confirm availability, prices and delivery. [To be confirmed by Arusuvai]' },
      { heading: 'Contact', body: 'Questions: +91 90036 31699.' },
    ],
  },
  {
    key: 'shipping',
    title: 'Shipping & Delivery Policy',
    sections: [
      { heading: 'Delivery', body: 'Delivery locations, timelines and charges are confirmed by Arusuvai after an enquiry. [To be confirmed – no timelines or charges published yet.]' },
      { heading: 'Wholesale', body: 'Delivery for bulk orders is agreed with each quotation. [To be confirmed]' },
    ],
  },
  {
    key: 'returns',
    title: 'Returns, Refunds & Damaged Goods',
    sections: [
      { heading: 'Returns and refunds', body: 'Eligibility, periods and refund method are not yet confirmed. [To be confirmed before publication]' },
      { heading: 'Damaged or incorrect products', body: 'If a product arrives damaged or incorrect, contact Arusuvai on +91 90036 31699 with details. [Process to be confirmed]' },
    ],
  },
  {
    key: 'terms',
    title: 'Terms & Conditions',
    sections: [
      { heading: 'Enquiries, not checkout', body: 'This website does not process payments. Orders are confirmed directly with Arusuvai after availability, price and delivery are agreed.' },
      { heading: 'Prices', body: 'Prices shown as "Ask for Current Price" are confirmed on request. Any proposed price is subject to change. [Payment terms, minimum orders, cancellation: to be confirmed]' },
    ],
  },
];
