export const adminAuth = (req, res, next) => {
  const key = process.env.ADMIN_API_KEY;
  if (!key || req.get('x-admin-key') !== key) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  next();
};
