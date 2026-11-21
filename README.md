# Urban Platter — Home Page, Dark Modern redesign (Design 2)

A standalone Vite + React landing page. Same content as
https://urbanplatter.com/, completely new Dark Modern design.

This is Design 2, for branch `design-2`. Design 1 (Minimal Premium,
All collections page) stays on `main` in
srijanlemmecode/Urban-Platter-Design1 and is untouched here.

Content is real, from the live home page on 21 Nov 2026:
- 6-slide hero: Edamame, Monk Fruit Sweetener, Brazil Nuts, Korean pastes, Cold-pressed oils, Beans
- Welcome / Trending: 8 products with real prices, MRPs, discounts, ratings and units bought
- Chini Kam banner + sugar calculator (live page formula: 1 tsp = 4 g = 16 kcal)
- Shop the Best: 6 products with real prices and images
- Shop By Lifestyle / Cuisines, Gifting, customer reviews, 6 FAQs, footer
- Promo: Get 10% OFF on orders above ₹2,500/-; free shipping above Rs. 500 (per FAQ)

Image gaps, stated honestly: none left. All 6 hero images and all 8
Trending product photos are now real, fetched live 21 Nov 2026 from
the home page slideshow markup and each product page. A letter
fallback remains only if an image fails to load.

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

Requires Node 18+. Do NOT push yet — Srijan wants to view it first.
