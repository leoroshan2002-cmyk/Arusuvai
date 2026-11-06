// Wholesale form rules (the backend enforces the same ones).
export function validateEnquiry(v) {
  const t = (k) => String(v[k] ?? '').trim();
  const errors = {};
  if (t('name').length < 2) errors.name = 'Please enter your name.';
  if (t('business').length < 2) errors.business = 'Please enter your business name.';
  if (!/^\+?[0-9 ()-]{8,16}$/.test(t('phone'))) errors.phone = 'Enter a valid phone number.';
  if (t('email') && !/^\S+@\S+\.\S+$/.test(t('email'))) errors.email = 'Enter a valid email or leave blank.';
  if (!t('country')) errors.country = 'Please enter your country.';
  if (!t('buyerType')) errors.buyerType = 'Please select a buyer type.';
  if (t('products').length < 3) errors.products = 'List the products you need.';
  if (!t('quantities')) errors.quantities = 'Enter required quantities.';
  if (!t('deliveryLocation')) errors.deliveryLocation = 'Enter a delivery location.';
  return errors;
}
