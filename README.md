# Arusuvai Foods – React + Vite + Tailwind / Node + Express + MongoDB

Same design and behaviour as the original `index.html`, rebuilt as a full-stack app.

## Run it
You need Node 18+ and MongoDB running locally (or an Atlas URI).

```bash
# 1. install
npm run install:all

# 2. backend config + sample data
cp backend/.env.example backend/.env      # edit MONGODB_URI if needed
npm run seed                              # loads 15 products, 5 categories, FAQs, policies

# 3. start (two terminals)
npm run dev:backend      # http://localhost:5000
npm run dev:frontend     # http://localhost:5173  (proxies /api to :5000)
```

## Deploy to Render
The included `render.yaml` configures one Node web service that builds the frontend and serves it from the Express backend.

1. Create a Render Blueprint from this repository and deploy the `arusuvai` web service.
2. Provide `MONGODB_URI` when prompted, using a reachable MongoDB Atlas connection string. Ensure your Atlas network access rules allow connections from Render.
3. Render generates `ADMIN_API_KEY` automatically. Set `CLIENT_URL` only if you later host the frontend on a separate domain.

Render builds with `npm run install:all && npm run build`, starts with `npm start`, and checks `/healthz`.

## Structure
```
backend/                     MVC
  server.js                  start-up
  src/app.js                 express app
  src/config/                db connection, business details (phone, address…)
  src/models/                Product, Category, Enquiry, Faq, Policy      (M)
  src/controllers/           request logic                                (C)
  src/routes/                URL → controller;  JSON responses are the "view" (V)
  src/middleware/            validation, admin key, errors
  src/seed/                  data copied from index.html + seed script

frontend/src/
  pages/                     Home, About, Products, ProductDetail, Quality, Wholesale, Contact, Policy, NotFound
  components/layout/         Header, Footer, CartDrawer, Toast, Loader, PageCurtain, ScrollProgress
  components/home/           Hero, ProductDeck, Marquee, Stats, StorySection, Journey, Categories, Featured
  components/common/         Section, Heading, ProductCard, ProductGrid, FormField, CtaBand, …
  context/                   CatalogContext (API data), CartContext (cart + toast)
  hooks/                     useReveal, useParallax, useGlobalEffects, useFetch, …
  utils/                     whatsapp links, helpers, art/ (SVG illustrations)
  styles/arusuvai.css        original design CSS, ported 1:1
```

## API
| Method | URL | Purpose |
|---|---|---|
| GET | `/api/products?category=&search=&featured=true` | list / filter |
| GET | `/api/products/:slug` | product + prev/next + related |
| GET | `/api/categories` | categories with product counts |
| GET | `/api/faqs`, `/api/policies/:key`, `/api/site` | content |
| POST | `/api/enquiries` | save wholesale enquiry, returns `whatsappUrl` |
| GET / PATCH | `/api/enquiries`, `/api/enquiries/:id` | admin (header `x-admin-key`) |

## Everyday edits
- **Change a price / pack size:** set `price`, `pack`, `approved: true` on the product in MongoDB (shown automatically).
- **Phone, WhatsApp number, address:** `backend/src/config/site.js`.
- **Add a product:** add a document to `products` and drop its image in `frontend/public/images/<image>.webp`.

## Notes
- The optional day-to-night hero **video** from the original (`hero.mp4`) isn't included because the file wasn't provided; the animated landscape (the original's fallback) is used.
- Policy text was adjusted: enquiries are now stored in the database, so the privacy wording and the wholesale form note say so.
