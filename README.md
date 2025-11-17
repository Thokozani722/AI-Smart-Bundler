# AI Smart Bundler

Full-stack Shopify solution that recommends inventory-aware bundles in real time for Black Friday. The repository ships three deployable artifacts:

- `backend/`: Node.js + Express API with AI bundle logic, Supabase analytics logging, and inventory endpoints.
- `frontend/`: React + Shopify Polaris embedded app that visualizes bundle performance and injects product/cart recommendations.
- `landing/`: Next.js marketing site with hero, features, pricing, and FAQ sections that follow the blue/white/black palette.

## Folder Structure

```
workspace/
├── backend/        # Express API, AI engine, Supabase integration
├── frontend/       # Shopify Polaris admin app (Vite + React)
├── landing/        # Public marketing site (Next.js + Tailwind)
└── README.md
```

---

## Backend (Node.js + Express)

**Endpoints**

- `GET /api/products` – sample product catalog with inventory levels.
- `POST /api/bundles/recommend` – AI-assisted bundle generation (OpenAI optional, heuristic fallback included).
- `POST /api/bundles/feedback` – log bundle performance events to Supabase.
- `GET /api/inventory/:productId` – quick inventory health check.
- `GET /health` – uptime probe.

**Environment**

Copy `.env.example` to `.env` inside `backend/` and set:

```
PORT=4000
OPENAI_API_KEY=...
SUPABASE_URL=...
SUPABASE_ANON_KEY=... (or SERVICE_ROLE)
```

**Run locally**

```
cd backend
npm install
npm run dev
```

---

## Frontend (React + Shopify Polaris)

- Provides dashboard for bundle metrics, light/dark mode toggle, product & cart recommendation embeds.
- Connects to backend via `VITE_BACKEND_URL`.

**Setup**

```
cd frontend
npm install
cp .env.example .env      # create if needed, set VITE_BACKEND_URL=http://localhost:4000
npm run dev
```

Access at `http://localhost:5173`. Embed inside Shopify using App Bridge after configuring OAuth (scaffolding ready for Polaris components).

---

## Landing Page (Next.js)

- Responsive hero, features, FAQ, and pricing tiers (Free, Pro, Enterprise).
- Tailwind CSS with color palette #1E40AF, #FFFFFF, #000000.

**Run**

```
cd landing
npm install
npm run dev
```

Deploy to Vercel, Netlify, or Shopify-hosted domain as a marketing microsite.

---

## Deployment Tips

- **Backend**: Deploy to Render, Railway, Fly.io, or AWS. Ensure env vars (OpenAI + Supabase) are set, and expose HTTPS endpoint for Shopify.
- **Frontend**: Build (`npm run build`) and deploy to Shopify App Hosting or any static host (Vercel, Netlify). Update App Bridge config for production domain.
- **Landing**: `npm run build` then `npm run start` (self-host) or push to Vercel for zero-config deploy.

Add CI/CD to run `npm run lint` or tests per package as you expand coverage. Feel free to extend Supabase schema (`bundle_events` table) for richer analytics.
