// WhatsApp deep links. The number comes from the backend (/api/site).
export const waLink = (number, text) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

export const productEnquiryText = (p) =>
  `Hello Arusuvai Foods, I would like to enquire about ${p.nameEn} (${p.nameTa}). Please share the current price, available pack sizes and delivery details.`;

export const GENERAL_ENQUIRY = 'Hello Arusuvai Foods, I would like to enquire about your products.';
export const MORE_INFO = 'Hello Arusuvai Foods, I would like to know more about your products.';
export const TALK_TO_US = 'Hello Arusuvai Foods, I would like to talk to you about your products.';

export const cartMessage = (items) =>
  'Hello Arusuvai Foods, I would like to enquire about these products:\n' +
  items.map(({ product: p, qty }, i) => `${i + 1}. ${p.nameEn} (${p.nameTa}) x ${qty}`).join('\n') +
  '\nPlease share current prices, pack sizes and delivery details.';

// Same text the backend builds; used as a fallback if the API is unreachable.
export const enquiryMessage = (v) =>
  [
    'Hello Arusuvai Foods, wholesale enquiry:',
    `Name: ${v.name}`,
    `Business: ${v.business}`,
    `Buyer type: ${v.buyerType}`,
    `Phone: ${v.phone}`,
    `Email: ${v.email || '-'}`,
    `Country: ${v.country}`,
    `Products: ${v.products}`,
    `Quantities: ${v.quantities}`,
    `Pack sizes: ${v.packSizes || '-'}`,
    `Delivery location: ${v.deliveryLocation}`,
    `Notes: ${v.notes || '-'}`,
  ].join('\n');
