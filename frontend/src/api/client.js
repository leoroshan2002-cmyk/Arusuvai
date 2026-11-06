// Tiny fetch wrapper. In dev, Vite proxies /api to the Express server (see vite.config.js).
const BASE = import.meta.env.VITE_API_URL || '/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(json.message || `Request failed (${res.status})`);
    err.status = res.status;
    err.errors = json.errors;
    throw err;
  }
  return json;
}

export const api = {
  getSite: () => request('/site').then((r) => r.data),
  getProducts: (params = {}) => request(`/products?${new URLSearchParams(params)}`).then((r) => r.data),
  getProduct: (slug) => request(`/products/${encodeURIComponent(slug)}`).then((r) => r.data),
  getCategories: () => request('/categories').then((r) => r.data),
  getFaqs: () => request('/faqs').then((r) => r.data),
  getPolicy: (key) => request(`/policies/${encodeURIComponent(key)}`).then((r) => r.data),
  createEnquiry: (body) => request('/enquiries', { method: 'POST', body: JSON.stringify(body) }),
};
