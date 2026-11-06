import { SITE } from '../config/site.js';

export const whatsappLink = (text) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const buildEnquiryMessage = (e) =>
  [
    'Hello Arusuvai Foods, wholesale enquiry:',
    `Name: ${e.name}`,
    `Business: ${e.business}`,
    `Buyer type: ${e.buyerType}`,
    `Phone: ${e.phone}`,
    `Email: ${e.email || '-'}`,
    `Country: ${e.country}`,
    `Products: ${e.products}`,
    `Quantities: ${e.quantities}`,
    `Pack sizes: ${e.packSizes || '-'}`,
    `Delivery location: ${e.deliveryLocation}`,
    `Notes: ${e.notes || '-'}`,
  ].join('\n');
