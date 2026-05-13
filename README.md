# TRID — Manufacturing as a Service

> Premium 3D printing platform. Upload → Configure → Quote → Order.

## Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State**: Zustand (persist + immer + devtools)
- **Animations**: Framer Motion
- **3D Viewer**: react-three-fiber + drei

## Local Development

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deploy to Render

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Render auto-detects `render.yaml` — click **Deploy**

Or manually:
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Node Version**: 18+

## User Flow

```
/ (Landing)
  → /upload         Upload STL/OBJ/STEP + 3D viewer
  → /category       Industry segment selection
  → /material       Material family + grade
  → /use-case       Use case + smart warning
  → /environment    Environment + quantity chips
  → /pricing        Instant quote screen
  → /checkout       7-step checkout (Login→OTP→Address→Delivery→Review→Payment→Confirm→Track)
```

## Folder Structure

```
app/                  Pages (App Router)
components/
  ui/                 Button, Card, Container, Section, FileUpload
  layout/             Navbar, Footer
  landing/            Hero, HowItWorks, PricingTransparency, CategorySelect,
                      MaterialSelect, UseCaseSelect, EnvironmentQuantity, PricingResult
  viewer/             ModelViewer (Three.js)
  checkout/           7-step checkout screens
hooks/
  useOrderFlow.ts     Single hook for all flow navigation + state
store/
  order.store.ts      Full order flow state (persisted)
  ui.store.ts         Ephemeral UI state
  app.store.ts        User/auth state
lib/
  utils.ts            cn() helper
types/
  index.ts            Shared TypeScript types
```
