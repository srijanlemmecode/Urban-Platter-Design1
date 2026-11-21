// Real products from https://urbanplatter.com/collections/all
// First 30 in Featured order, as shown live on 21 Nov 2026.
// Prices are the selling prices shown that day, with MRP where shown.
// Long titles were ellipsised in the live grid itself, so descriptors
// below use only the wording visible on the page — nothing invented.
// "group" is only a grouping for this redesign's category chips,
// derived from the product name. The live page shows no per-card category.
export const PRODUCTS = [
  { id: 1, name: 'Brazil Nuts, 250g', desc: 'Rich in Selenium | Superfood | Product of Peru | Have 1 Daily', price: 925, mrp: 1200, off: '23% off', rating: 4.7, reviews: 149, group: 'Nuts & Snacks' },
  { id: 2, name: 'Shirataki Konjac Noodles, 270g', desc: 'Fat-free, Gluten-free, Low Carb, Keto, Ready to Use', price: 150, mrp: 200, off: '25% off', rating: 4.55, reviews: 56, group: 'Noodles & Rice' },
  { id: 3, name: 'Classic Korean Gochujang, 170g', desc: 'Plant-Based Fermented Hot Chilli Paste | Unique Umami Flavour', price: 240, mrp: 300, off: '20% off', rating: null, reviews: null, group: 'Condiments & Sauces' },
  { id: 4, name: 'Nutritional Yeast Flakes, 100g', desc: 'Rich in Vitamin B12, Gluten-free, Plant-Based, Nutty Cheesy Nooch', price: 375, mrp: 450, off: '17% off', rating: null, reviews: null, group: 'Beverages & Super Foods' },
  { id: 5, name: 'Shirataki Long-Grain Rice, 220g', desc: 'Keto-friendly, Low-Carb, Low-Calories, Fat-free, Gluten-free', price: 195, mrp: 200, off: '3% off', rating: null, reviews: null, group: 'Noodles & Rice' },
  { id: 6, name: 'American Pecan Nuts', desc: 'Rich in fibre & Healthy Fats | Antioxidant-Rich | Ideal for Snacking & Baking', price: 367, mrp: 375, off: '2% off', rating: null, reviews: null, options: true, group: 'Nuts & Snacks' },
  { id: 7, name: 'Rolled Oats', desc: 'Wholegrain Oats | High Protein & High In Fibre | Single Ingredient', price: 270, mrp: 300, off: 'Up to 10% off', rating: null, reviews: null, options: true, group: 'Pantry' },
  { id: 8, name: 'Pure Cranberry Juice, 946ml', desc: 'Single Ingredient | Not from Concentrate | No Added Sugar', price: 1599, mrp: 1650, off: '3% off', rating: null, reviews: null, group: 'Beverages & Super Foods' },
  { id: 9, name: 'Jaggery Powder, 1kg', desc: 'Soft & Moist Gud Powder | Unrefined & Additive-Free', price: 275, mrp: 300, off: '8% off', rating: null, reviews: null, group: 'Pantry' },
  { id: 10, name: 'Shirataki Short-Grain Rice, 220g', desc: 'Ultra Low-carb, Low-calorie, Keto-friendly, Fat-free, Gluten-free', price: 175, mrp: 185, off: '5% off', rating: null, reviews: null, group: 'Noodles & Rice' },
  { id: 11, name: 'Almond Milk, 1 Litre', desc: 'Unsweetened | Lactose-Free | Plant-Based Milk Alternative', price: 224, mrp: 250, off: '10% off', rating: null, reviews: null, group: 'Beverages & Super Foods' },
  { id: 12, name: 'Gond Katira Crystals', desc: 'Traditional Cooling Ingredient, Badam Pisin, Edible Gum', price: 299, mrp: 350, off: '15% off', rating: null, reviews: null, options: true, group: 'Pantry' },
  { id: 13, name: 'Coconut Milk, 250ml', desc: '18% Fat, 100% Natural & Unsweetened, Ideal for Curries, Baking & Desserts', price: 135, mrp: 150, off: '10% off', rating: null, reviews: null, group: 'Pantry' },
  { id: 14, name: 'Bakers Active Dry Yeast', desc: 'From ₹184', price: 184, mrp: 185, off: 'Up to 17% off', rating: null, reviews: null, options: true, fromPrice: true, group: 'Baking' },
  { id: 15, name: 'Bold and Exotic Macadamia Nuts', desc: 'Grade A, Premium Quality, Crunchy, perfect for guilt-free snacking', price: 515, mrp: null, off: null, rating: null, reviews: null, options: true, group: 'Nuts & Snacks' },
  { id: 16, name: 'Korean Kimchi Shirataki Noodles, 288g', desc: 'Keto-friendly, Low-Carb, Fat-free, Instant Noodles', price: 199, mrp: 230, off: '13% off', rating: null, reviews: null, group: 'Noodles & Rice' },
  { id: 17, name: 'Tahini Paste, 250g', desc: 'Smooth & Creamy White Sesame Paste, No Additives, Ideal for Hummus', price: 299, mrp: 350, off: '15% off', rating: null, reviews: null, group: 'Condiments & Sauces' },
  { id: 18, name: 'Spicy Seaweed Nori Chips Crispy Snack, 35g', desc: 'Product of Korea', price: 315, mrp: 325, off: '3% off', rating: null, reviews: null, group: 'Nuts & Snacks' },
  { id: 19, name: 'Pure Cranberry Juice, 350ml', desc: 'Single Ingredient | Not from Concentrate | No Added Sugar', price: 599, mrp: 845, off: '29% off', rating: null, reviews: null, arrivingSoon: true, group: 'Beverages & Super Foods' },
  { id: 20, name: 'Dehydrated Garlic Powder', desc: 'Ready to Use, Instant Garlic Flavour, Additive Free, All Natural', price: 99, mrp: 100, off: '1% off', rating: null, reviews: null, arrivingSoon: true, group: 'Spices & Seasonings' },
  { id: 21, name: 'Pitted California Prunes, 250g', desc: 'Dried Plums | Unsweetened | Rich in fibre | Great for Digestion', price: 270, mrp: 330, off: '18% off', rating: null, reviews: null, group: 'Nuts & Snacks' },
  { id: 22, name: 'Portuguese Peri Peri Seasoning', desc: 'Signature African-Style spice blend | Fiery and Zesty', price: 128, mrp: 140, off: '9% off', rating: null, reviews: null, options: true, group: 'Spices & Seasonings' },
  { id: 23, name: 'Everything Bagel Seasoning, 100g', desc: 'Classic American Seasoning Blend with Onion Flakes, Garlic, Sesame', price: 220, mrp: 235, off: '6% off', rating: null, reviews: null, group: 'Spices & Seasonings' },
  { id: 24, name: 'Cheddar Cheese Style Seasoning, 100g', desc: 'Perfectly Plant-based | Ideal for Pop Corn, Fries, Pasta', price: 125, mrp: 140, off: '11% off', rating: null, reviews: null, group: 'Spices & Seasonings' },
  { id: 25, name: 'Date Syrup, 400g', desc: 'Natural Sweetener | 100% Dates | Refined Sugar Alternative', price: 235, mrp: 250, off: '6% off', rating: null, reviews: null, group: 'Pantry' },
  { id: 26, name: 'Indian Mast Masala Shirataki Noodles, 279g', desc: 'Keto-friendly, Low-Carb, Fat-free, Instant Noodles', price: 199, mrp: 230, off: '13% off', rating: null, reviews: null, group: 'Noodles & Rice' },
  { id: 27, name: 'Pizza Pasta Seasoning, 80g', desc: 'Signature Italian-Style Seasoning | Multipurpose Herb & Spice Blend', price: 138, mrp: 140, off: '1% off', rating: null, reviews: null, options: true, group: 'Spices & Seasonings' },
  { id: 28, name: 'OatWOW! Classic Oat Beverage, 1L', desc: 'Plant-Based Milk Alternative | Dairy-Free & Lactose-Free', price: 350, mrp: null, off: null, rating: null, reviews: null, group: 'Beverages & Super Foods' },
  { id: 29, name: 'Japanese Ceremonial-grade Matcha Green Tea Powder, 20g', desc: 'First-harvest leaves | Premium-grade', price: 370, mrp: 400, off: '8% off', rating: null, reviews: null, group: 'Beverages & Super Foods' },
  { id: 30, name: 'Cajun Spice Seasoning', desc: 'Bold Blend of French, African and Southern American Flavours', price: 129, mrp: 140, off: '8% off', rating: null, reviews: null, options: true, group: 'Spices & Seasonings' },
]

export const NAV = [
  'New Arrivals', 'Nuts & Snacks', 'Baking', 'Beverages & Super Foods',
  'Condiments & Sauces', 'Spices & Seasonings', 'Pantry', 'Everything Else', 'Brands',
]

export const GROUPS = ['All', 'Nuts & Snacks', 'Noodles & Rice', 'Baking', 'Beverages & Super Foods', 'Condiments & Sauces', 'Spices & Seasonings', 'Pantry']

export const TOTAL_PRODUCTS = 1753
export const PRICE_RANGE = { min: 0, max: 98700 }

export function inr(n) {
  return '₹' + n.toLocaleString('en-IN')
}
