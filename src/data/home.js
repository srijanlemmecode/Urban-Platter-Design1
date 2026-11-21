// Real home page content from https://urbanplatter.com/
// Fetched live 21 Nov 2026. Nothing invented.
// Images — all real, fetched live 21 Nov 2026.
// Hero images were read from the slideshow section markup (picture/img,
// empty alt, which is why the first fetch missed them). The 4 Trending
// product images were taken from each product page's first gallery image.
// A letter fallback remains only if an image fails to load.
// - The Chini Kam results panel is blurred/hidden on the live page until
//   submitted; the calculator here uses the live page's own formula
//   (1 tsp sugar = 4 g = 16 kcal; juice 200 ml = 5 tsp; cola 300 ml = 8 tsp)
//   and its default inputs, which reproduce its stated default result.

export const HERO_SLIDES = [
  { image: 'https://urbanplatter.com/cdn/shop/files/1000067313.jpg?format=webp&v=1793866590&width=1400', tag: 'Edamame', title: 'HIGH PROTEIN SUPERSNACK', sub: '38%+ protein · 17%+ fiber', detail: 'Peri Peri · Chaat Masala · Tandoori Tikka · Kimchi · Roasted Salted', cta: 'Edamame Personality' },
  { image: 'https://urbanplatter.com/cdn/shop/files/Monk_Fruit_SweetnersArtboard_1.jpg?format=webp&v=1792145048&width=1400', tag: 'Monk Fruit Sweetener', title: 'SWEETEN EVERY RECIPE JUST THE WAY YOU LIKE', sub: 'From your morning chai to your favourite bakes', detail: 'Get all the goodness of sugar, minus calories or carbs · 1:1 sugar replacement · No bitter aftertaste · Zero calorie', cta: 'Shop Sweeteners' },
  { image: 'https://urbanplatter.com/cdn/shop/files/Banners2Artboard_1.jpg?format=webp&v=1792145290&width=1400', tag: 'Brazil Nuts', title: 'THE NUT NOBODY TALKS ABOUT (BUT SHOULD)', sub: 'Rich, buttery & one of nature’s richest sources of selenium', detail: 'selenium', cta: 'Shop Brazil Nuts' },
  { image: 'https://urbanplatter.com/cdn/shop/files/Banner2Artboard_1_2_0f78ce6f-6e22-4ada-8361-74bf376e0bf4.jpg?format=webp&v=1795006539&width=1400', tag: 'Korean Pastes', title: 'THREE PASTES. ENDLESS KOREAN CRAVINGS.', sub: 'Bring home the bold, spicy and savoury flavours of Korea', detail: 'Ssamjang · Gochujang · Doenjang', cta: 'Shop Pastes' },
  { image: 'https://urbanplatter.com/cdn/shop/files/Banner3Artboard_1_1.jpg?format=webp&v=1795006539&width=1400', tag: 'Cold Pressed Oils', title: 'GOOD COOKING BEGINS WITH A GOOD POUR', sub: 'Make every tadka, drizzle & fry richer — naturally cold-pressed, zero additives', detail: 'Mustard · Groundnut · Sesame · Coconut · Gingelly', cta: 'Shop Cold Pressed Oils' },
  { image: 'https://urbanplatter.com/cdn/shop/files/Banner3Artboard_2.jpg?format=webp&v=1795006539&width=1400', tag: 'Beans', title: 'BEAN THERE. EATEN THAT?', sub: 'Discover five new varieties packed with protein, fibre and possibilities!', detail: 'Speckled Beans · Red Kidney Beans · Lima Beans · Field Beans · Black Eyed Beans', cta: 'Shop Beans' },
]

export const TRENDING = [
  { id: 't1', name: 'Shirataki Konjac Noodles, 270g', desc: 'Fat-free, Gluten-free, Low Carb, Keto, Ready to Use', price: 150, mrp: 200, off: '25% off', rating: 4.55, reviews: 56, bought: 267, image: 'https://urbanplatter.com/cdn/shop/files/701098284821_1.jpg?format=webp&v=1762584094&width=460' },
  { id: 't2', name: 'Tofu Cubes, 800g', desc: 'Drained Weight: 450g | 14% Plant Protein | Ready-to-Use for Stir-Fries, Curries, Salads & Soups', price: 299, mrp: 350, off: '15% off', rating: null, reviews: 0, bought: 44, image: 'https://urbanplatter.com/cdn/shop/files/14036_01_-TofuCubes800g.jpg?format=webp&v=1783424867&width=460' },
  { id: 't3', name: 'Monk Fruit Sweetener Drops, 15ml', desc: 'Zero Calorie | No Erythritol | No Bitter Aftertaste | For Tea, Coffee & Beverages', price: 299, mrp: 400, off: '25% off', rating: 3.75, reviews: 4, bought: 346, image: 'https://urbanplatter.com/cdn/shop/files/14066_01_-MonkFruitSweetenerDrops15ml.jpg?format=webp&v=1785153839&width=460' },
  { id: 't4', name: 'V60 Coffee Filter Paper, White, Size 02, 100 Pieces', desc: 'Naturally Bleached, Clean Neutral Flavour, Ideal for Pour Over Brewing, Biodegradable', price: 399, mrp: 500, off: '20% off', rating: null, reviews: 0, bought: 18, image: 'https://urbanplatter.com/cdn/shop/files/13953_01_-V60CoffeeFilterWhitePaper100N.jpg?format=webp&v=1773729640&width=460' },
  { id: 't5', name: 'Soya Chaap, 800g', desc: 'High Protein | No Maida | Ready-to-Cook Chaap on Sticks', price: 260, mrp: 325, off: '20% off', rating: 4.84, reviews: 119, bought: 140, image: 'https://urbanplatter.com/cdn/shop/files/13431_01_-SoyaChaap800g.jpg?format=webp&v=1762595970&width=460' },
  { id: 't6', name: 'Isabgol, 150g', desc: 'Whole Psyllium Husk | High in Soluble Fiber | Unflavoured | Single Ingredient', price: 295, mrp: 300, off: '2% off', rating: null, reviews: 0, bought: 35, image: 'https://urbanplatter.com/cdn/shop/files/14011_01_-_Isabgol_Whole_Psyllium_Husk_150g.jpg?format=webp&v=1781171398&width=460' },
  { id: 't7', name: 'Black Seed Oil', desc: 'Consume daily for overall well being and vitality', price: 99, mrp: 200, off: 'Up to 51% off', rating: 4.86, reviews: 7, bought: 106, fromPrice: true, options: true, image: 'https://urbanplatter.com/cdn/shop/files/Asset_7-removebg-preview.png?format=webp&v=1766751257&width=460' },
  { id: 't8', name: 'Roasted Salted Edamame', desc: '46% Protein, 20% Fiber, Lightly Salted Young Green Soybeans, Highest Plant Protein Supersnack', price: 225, mrp: 250, off: 'Up to 33% off', rating: 4.43, reviews: 42, bought: 315, fromPrice: true, options: true, image: 'https://urbanplatter.com/cdn/shop/files/14128_01_-_Roasted_Salted_Edamame_150g.jpg?format=webp&v=1790600827&width=460' },
]

export const SHOP_BEST = [
  { id: 'b1', name: 'Bajra Rava, 500g', desc: 'Naturally Gluten-Free | Source of Protein & Fibre | A Smart Swap for Regular Sooji | Perfect for Upma, Khichdi, Porridge, Halwa, Laddoos & More', price: 170, mrp: 175, off: '3% off', image: 'https://cdn.shopify.com/s/files/1/0659/7283/0359/files/14064_01_-BajraRava500g.jpg?v=1785217071' },
  { id: 'b2', name: 'A2 Ghee, 500ml', desc: 'Curd-Churned Bilona Desi Ghee for Cooking, Tadka & Daily Meals | Made from A2 Cow Milk', price: 799, mrp: 1250, off: '36% off', image: 'https://cdn.shopify.com/s/files/1/0659/7283/0359/files/14055_13.jpg?v=1787562976' },
  { id: 'b3', name: 'Roasted Salted Edamame', desc: '46% Protein, 20% Fiber, Lightly Salted Young Green Soybeans, Highest Plant Protein Supersnack', price: 225, mrp: 250, off: '10% off', image: 'https://urbanplatter.com/cdn/shop/files/14128_01_-_Roasted_Salted_Edamame_150g.jpg?format=webp&v=1790600827&width=460' },
  { id: 'b4', name: 'Mexican Blue Agave Syrup, 300g', desc: 'Plant-Based Sweetener, Refined Sugar Alternative, Easy to Mix in Hot & Cold Recipes', price: 444, mrp: 445, off: null, image: 'https://cdn.shopify.com/s/files/1/0659/7283/0359/files/13661_01_-MexicanBlueAgaveSyrup300g_8e99c0c2-401e-4bc9-95bf-d9f372463894.jpg?v=1772879054' },
  { id: 'b5', name: 'Coconut Milk, 250ml', desc: '18% Fat, 100% Natural & Unsweetened, Ideal for Curries, Baking & Desserts', price: 135, mrp: 150, off: '10% off', image: 'https://cdn.shopify.com/s/files/1/0659/7283/0359/files/13296_01_-_Coconut_Milk_250ml_0606c221-058c-4e17-a096-6a010baafb71.jpg?v=1785998371' },
  { id: 'b6', name: 'Brazil Nuts, 1Kg', desc: 'Rich in Selenium, Superfood, Have 1 Daily, Product of Peru', price: 3399, mrp: 4300, off: '21% off', image: 'https://cdn.shopify.com/s/files/1/0659/7283/0359/files/13202-01-Shelled-Brazil-Nuts-1Kg.jpg?v=1749106853' },
]

export const CHINI_BANNER_IMAGE = 'https://urbanplatter.com/cdn/shop/files/1000067310.png?v=1793866592&width=2000'

export const SHOP_BY_LIFESTYLE = ['KETO-FRIENDLY', 'GUT-FRIENDLY', 'JAIN-FRIENDLY', 'KID FRIENDLY']
export const SHOP_BY_CUISINES = ['K-TOWN', 'ASIAN FUSION', 'MIDDLE EASTERN', 'FRENCH BISTRO', 'INDIAN FEAST']

export const REVIEWS = [
  { name: 'TANVI M.', place: 'Noida, Uttar Pradesh', text: 'As a vegan this is the best product. Best part is no need to store is refrigerator.' },
  { name: 'DORABJEE FIROZA', place: 'Pune, Maharashtra', text: 'Very fresh n crunchy.' },
  { name: 'BALARAMDAS KALIYEV', place: 'Goa', text: 'These are really good. So are the other flavors.' },
  { name: 'BEVERLEY P.', place: 'Karnataka', text: 'Cheesy and perfect as a salad dressing.' },
]

export const FAQS = [
  { q: 'Where are Urban Platter products sourced from?', a: 'We source ingredients from trusted suppliers worldwide, including Europe, Asia, and the Middle East, to bring you the finest gourmet selections.' },
  { q: 'How does Urban Platter ensure product quality?', a: 'We prioritize quality by sourcing premium ingredients and conducting thorough checks at every step of production to ensure the finest products reach your table.' },
  { q: 'Do you offer vegan or plant-based options?', a: 'Yes, Urban Platter offers vegan, plant-based, and allergen-friendly products for all dietary preferences.' },
  { q: 'What are the shipping charges for Urban Platter orders?', a: 'We offer free shipping on all orders above Rs. 500. For orders below Rs. 500, a minimal shipping charge will apply based on the cart items.' },
  { q: 'Do you offer international shipping?', a: 'Yes, we ship internationally through DHL, FedEx, and Aramex. Please note that additional customs duties and taxes may apply in some cases.' },
  { q: 'What is Urban Platter’s return policy?', a: 'We accept returns if a product is damaged or defective. Shipping charges for returned items will not be refunded. For accounts with a high return rate, a delivery charge may apply on future orders.' },
]

export const NAV = ['New Arrivals', 'Nuts & Snacks', 'Baking', 'Beverages & Super Foods', 'Condiments & Sauces', 'Spices & Seasonings', 'Pantry', 'Everything Else', 'Brands']
export const TABS = ['Trending', 'Baking', 'Beverages & Super Foods', 'Nuts & Snacks', 'Spices & Seasonings', 'Condiments & Sauces', 'Pantry']

export function inr(n) {
  return '₹' + n.toLocaleString('en-IN')
}
