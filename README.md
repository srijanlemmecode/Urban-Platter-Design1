# Urban Platter — All Products, Minimal Premium redesign

A standalone Vite + React landing page. Same content as
https://urbanplatter.com/collections/all, completely new Minimal Premium design.

Content is real, from the live page on 21 Nov 2026:
- 1,753 products in the full collection; this build shows the first 30 in Featured order
- Promo: Get 10% OFF on orders above ₹2,500/-
- Tagline: Simply Good Food
- Same nav, filters, sort options, product names, prices, MRPs, discounts and ratings
- Real product photos: the first/featured image for each of the 30 products, taken from the live Urban Platter page (urbanplatter.com CDN). Images load from the internet; if an image fails to load, the card falls back to a letter placeholder.
- Prices may change on the live site

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints, usually http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

Requires Node 18+.
