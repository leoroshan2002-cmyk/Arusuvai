// Same rules as the frontend wholesale form, enforced again on the server.
const phoneRx = /^\+?[0-9 ()-]{8,16}$/;
const emailRx = /^\S+@\S+\.\S+$/;

export const validateEnquiry = (req, res, next) => {
  const b = req.body || {};
  const v = (k) => String(b[k] ?? '').trim();
  const errors = {};

  if (v('name').length < 2) errors.name = 'Please enter your name.';
  if (v('business').length < 2) errors.business = 'Please enter your business name.';
  if (!phoneRx.test(v('phone'))) errors.phone = 'Enter a valid phone number.';
  if (v('email') && !emailRx.test(v('email'))) errors.email = 'Enter a valid email or leave blank.';
  if (!v('country')) errors.country = 'Please enter your country.';
  if (!v('buyerType')) errors.buyerType = 'Please select a buyer type.';
  if (v('products').length < 3) errors.products = 'List the products you need.';
  if (!v('quantities')) errors.quantities = 'Enter required quantities.';
  if (!v('deliveryLocation')) errors.deliveryLocation = 'Enter a delivery location.';

  if (Object.keys(errors).length) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors });
  }
  next();
};
