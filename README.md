# DSAMotion — Animated DSA & System Design (plain React)

Standalone React + Vite + Tailwind CSS app. All lesson content lives in plain JSON
files under `src/data/` (`topics.json`, `systemDesign.json`) — no framework-specific
data layer, no TanStack.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview
```

## Structure

- `src/pages/*` — one folder per page, with a local `components/` folder where needed
- `src/utils/*` — shared components, hooks, types and the JSON loaders
- `src/data/*` — all topic + system design content as JSON
- `public/` — static assets
# DSA_VisuLearn
