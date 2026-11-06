import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';
import { waLink } from '../utils/whatsapp';

const CatalogContext = createContext(null);

// Loads site info, categories and products once and shares them with every page.
export function CatalogProvider({ children }) {
  const [state, setState] = useState({ site: null, categories: [], products: [], loading: true, error: null });

  const load = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const [site, categories, products] = await Promise.all([api.getSite(), api.getCategories(), api.getProducts()]);
      setState({ site, categories, products, loading: false, error: null });
    } catch (error) {
      setState((s) => ({ ...s, loading: false, error }));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const value = useMemo(() => {
    const colorOf = Object.fromEntries(state.categories.map((c) => [c.name, c.color]));
    const featured = state.products.filter((p) => p.featured).sort((a, b) => a.featuredOrder - b.featuredOrder);
    return {
      ...state,
      featured,
      reload: load,
      colorOf: (category) => colorOf[category],
      wa: (text) => waLink(state.site?.whatsappNumber || '919003631699', text),
      findProduct: (slug) => state.products.find((p) => p.slug === slug),
    };
  }, [state, load]);

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export const useCatalog = () => useContext(CatalogContext);
