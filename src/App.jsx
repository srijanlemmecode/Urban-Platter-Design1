import { useEffect, useMemo, useState } from 'react'
import { HERO_SLIDES, TRENDING, SHOP_BEST, CHINI_BANNER_IMAGE, SHOP_BY_LIFESTYLE, SHOP_BY_CUISINES, REVIEWS, FAQS, NAV, TABS, inr } from './data/home.js'

function initials(name) {
  const words = name.replace(/[^A-Za-z ]/g, '').split(' ').filter(Boolean)
  return (words[0]?.[0] || 'U') + (words[1]?.[0] || '')
}

function ProductImage({ product }) {
  const [failed, setFailed] = useState(false)
  if (failed || !product.image) return <span className="monogram">{initials(product.name)}</span>
  return <img src={product.image} alt={product.name} loading="lazy" onError={() => setFailed(true)} />
}

function ProductCard({ p, onAdd }) {
  return (
    <article className="card">
      <div className="card-image">
        <ProductImage product={p} />
        {p.off && <span className="badge">{p.off}</span>}
      </div>
      <div className="card-body">
        <h3>{p.name}</h3>
        <p className="desc">{p.desc}</p>
        {p.rating ? <p className="rating">★ {p.rating} ({p.reviews})</p> : <p className="rating muted">0 Reviews</p>}
        {p.bought && <p className="bought">{p.bought} bought in last 30 days</p>}
        <p className="price">{p.fromPrice ? 'From ' : ''}{inr(p.price)}{p.mrp && <s>{inr(p.mrp)}</s>}</p>
        <button type="button" className="btn-lime btn-block" onClick={() => onAdd(p)}>
          {p.options ? 'Choose options' : 'Add to cart'}
        </button>
      </div>
    </article>
  )
}

export default function App() {
  const [slide, setSlide] = useState(4)
  const [heroFallback, setHeroFallback] = useState(false)
  const [tab, setTab] = useState('Trending')
  const [shopBy, setShopBy] = useState('lifestyle')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState({})
  const [cartOpen, setCartOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const [teaCups, setTeaCups] = useState(3)
  const [teaTsp, setTeaTsp] = useState(2)
  const [juice, setJuice] = useState(0)
  const [cola, setCola] = useState(0)
  const [calcDone, setCalcDone] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 6000)
    return () => clearInterval(t)
  }, [])
  useEffect(() => { setHeroFallback(false) }, [slide])
  const heroSrc = heroFallback ? hero.image.replace('?format=webp&', '?') : hero.image

  const allProducts = useMemo(() => [...TRENDING, ...SHOP_BEST], [])
  const searched = query.trim()
    ? allProducts.filter((p) => (p.name + ' ' + p.desc).toLowerCase().includes(query.trim().toLowerCase()))
    : null

  const cartItems = Object.entries(cart)
    .map(([id, qty]) => ({ product: allProducts.find((p) => p.id === id), qty }))
    .filter((x) => x.product)
  const cartCount = cartItems.reduce((s, x) => s + x.qty, 0)
  const subtotal = cartItems.reduce((s, x) => s + x.product.price * x.qty, 0)
  const discount = subtotal >= 2500 ? Math.round(subtotal * 0.1) : 0
  function addToCart(p) { setCart((c) => ({ ...c, [p.id]: (c[p.id] || 0) + 1 })) }
  function setQty(id, qty) {
    setCart((c) => { const n = { ...c }; if (qty <= 0) delete n[id]; else n[id] = qty; return n })
  }

  // Chini Kam calculator — live page formula: 1 tsp = 4 g = 16 kcal,
  // juice 200 ml = 5 tsp, cola 300 ml = 8 tsp
  const tspPerDay = teaCups * teaTsp + juice * 5 + cola * 8
  const gramsPerDay = tspPerDay * 4
  const kcalPerDay = tspPerDay * 16
  const kgPerYear = (gramsPerDay * 365) / 1000
  const kcalPerYear = kcalPerDay * 365

  const hero = HERO_SLIDES[slide]

  return (
    <div className="page">
      <div className="promo">GET 10% OFF ON ORDERS ABOVE ₹2,500/-</div>

      <header className="header">
        <div className="header-inner">
          <div className="logo">URBAN <span>PLATTER</span></div>
          <label className="search">
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for products" aria-label="Search for products" />
          </label>
          <button className="bag" onClick={() => setCartOpen(true)} type="button">BAG {cartCount > 0 ? `(${cartCount})` : ''}</button>
        </div>
        <nav className="nav" aria-label="Primary">
          {NAV.map((item) => <button key={item} type="button">{item}</button>)}
        </nav>
        <div className="nav2">
          <span className="edamame">Edamame</span>
          <span>About Us</span><span>HoReCa</span><span>Experiences</span><span>Partnerships</span><span>Careers</span><span>Read Blogs</span>
        </div>
      </header>

      {searched && (
        <section className="search-results">
          <h2>Search results for “{query}” — {searched.length} found</h2>
          <div className="grid">{searched.map((p) => <ProductCard key={p.id} p={p} onAdd={addToCart} />)}</div>
          <button type="button" className="btn-ghost" onClick={() => setQuery('')}>Clear search</button>
        </section>
      )}

      <main>
        <section className="hero" aria-label="Featured">
          <h1 className="sr-only">Urban Platter — Simply Good Food</h1>
          <picture>
            <source media="(max-width: 700px)" srcSet={hero.mobileImage} />
            <img className="hero-image" src={heroSrc} alt="" onError={() => setHeroFallback(true)} />
          </picture>
          <div className="hero-overlay">
            <p className="hero-tag">{hero.tag}</p>
            <p className="hero-detail">{hero.detail}</p>
            <div className="hero-actions">
              <a className="btn-lime" href="#trending">{hero.cta} →</a>
              <div className="hero-dots">
                {HERO_SLIDES.map((s, i) => (
                  <button key={s.tag} type="button" aria-label={`Load slide ${i + 1} of 6`} className={i === slide ? 'dot active' : 'dot'} onClick={() => setSlide(i)} />
                ))}
                <span className="slide-count">Slide {slide + 1} of 6</span>
              </div>
            </div>
          </div>
        </section>

        <section id="trending" className="section">
          <p className="eyebrow">Welcome to Urban Platter</p>
          <h2>ALL THE INGREDIENTS YOU REACH FOR — AND THE ONES YOU DISCOVER.</h2>
          <div className="chips" role="group" aria-label="Collections">
            {TABS.map((t) => (
              <button key={t} type="button" className={tab === t ? 'chip active' : 'chip'} onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>
          {tab === 'Trending' ? (
            <div className="grid">{TRENDING.map((p) => <ProductCard key={p.id} p={p} onAdd={addToCart} />)}</div>
          ) : (
            <p className="empty">Products under “{tab}” weren’t shown on the home page on first load, so they’re not listed here — no products invented.</p>
          )}
        </section>

        <section className="section chini">
          <img className="chini-banner" src={CHINI_BANNER_IMAGE} alt="Chini Kam. Mithaas wahi." onError={(e) => { e.currentTarget.style.display = 'none' }} />
          <h2>CHINI KAM. MITHAAS WAHI.</h2>
          <p className="section-sub">That “bas 2 chammach” adds up. See how much sugar your day really holds, and what switching would change.</p>
          <p className="chini-points">1:1 Sugar Replacement · Zero Calories · No Aftertaste · Keto &amp; Diabetic Friendly · 100% Fruit Based · No Erythritol</p>

          <div className="calc">
            <h3>CHINI KAM CALCULATOR</h3>
            <p>Tell us what you have in a typical day. Numbers update as you go.</p>
            <div className="calc-rows">
              <label>Tea / Coffee — cups a day
                <input type="number" min="0" max="10" value={teaCups} onChange={(e) => setTeaCups(Number(e.target.value) || 0)} />
              </label>
              <label>Tsp per cup
                <select value={teaTsp} onChange={(e) => setTeaTsp(Number(e.target.value))}>
                  {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n} tsp</option>)}
                </select>
              </label>
              <label>Packaged Juice — 200 ml glasses a day
                <input type="number" min="0" max="10" value={juice} onChange={(e) => setJuice(Number(e.target.value) || 0)} />
              </label>
              <label>Soft Drink / Cola — 300 ml a day
                <input type="number" min="0" max="10" value={cola} onChange={(e) => setCola(Number(e.target.value) || 0)} />
              </label>
            </div>
            <button type="button" className="btn-lime" onClick={() => setCalcDone(true)}>Check My Sugar</button>
            {calcDone && (
              <div className="calc-result">
                <p><strong>{tspPerDay} tsp a day</strong> — {gramsPerDay} g sugar, {kcalPerDay} calories a day.</p>
                <p>That’s about <strong>{kgPerYear.toFixed(1)} kg a year</strong> ({(kgPerYear).toFixed(0)} one-kg sugar packs) and <strong>{kcalPerYear.toLocaleString('en-IN')} calories a year</strong>.</p>
                <p>WHO suggests about 25 g (6 tsp) of free sugars a day at most. With Monk Fruit Sweetener, same spoons a day could save up to {kcalPerYear.toLocaleString('en-IN')} kcal a year.</p>
                <p className="fine">Estimates: 1 tsp sugar ≈ 4 g ≈ 16 kcal. Drink values are typical averages and vary by brand.</p>
              </div>
            )}
            <p className="fine">Select your daily quantities, then click Check My Sugar to see your results. <a href="#trending">Shop the Monk Fruit Collection →</a></p>
          </div>
        </section>

        <section className="banner-strip">
          <h2>SHIRATAKI</h2>
          <p>LOW CALORIE • LOW CARB • KETO FRIENDLY</p>
        </section>

        <section className="section">
          <p className="eyebrow">Shoppable Videos</p>
          <h2>SHOP THE BEST</h2>
          <div className="grid grid-3">{SHOP_BEST.map((p) => <ProductCard key={p.id} p={p} onAdd={addToCart} />)}</div>
        </section>

        <section className="section">
          <h2>SHOP BY</h2>
          <div className="shopby-toggle">
            <button type="button" className={shopBy === 'lifestyle' ? 'chip active' : 'chip'} onClick={() => setShopBy('lifestyle')}>Shop By Lifestyle and Diet</button>
            <button type="button" className={shopBy === 'cuisines' ? 'chip active' : 'chip'} onClick={() => setShopBy('cuisines')}>Shop By Cuisines</button>
          </div>
          <div className="tiles">
            {(shopBy === 'lifestyle' ? SHOP_BY_LIFESTYLE : SHOP_BY_CUISINES).map((t) => (
              <div className="tile" key={t}><span>{t}</span></div>
            ))}
          </div>
        </section>

        <section className="banner-strip juices">
          <h2>100% FRUIT JUICES FOR EVERYDAY WELLNESS</h2>
          <p>Dark Cherry Juice · Blueberry Juice · Plum Juice</p>
        </section>

        <section className="section">
          <h2>MAKE EVERY GIFT SPECIAL WITH URBAN PLATTER</h2>
          <p className="section-sub">Gifting with Urban Platter is more than just a gesture — It’s an experience of love, care, and joy wrapped in every gourmet delight. Whether for a special occasion or a simple gesture of appreciation, our curated premium products create lasting memories and bring smiles.</p>
          <a className="btn-lime" href="#faq">Contact Us →</a>
          <div className="gift-grid">
            <div className="gift-card"><h3>BULK ORDERS</h3><p>Deliciously Delivered in Bulk — Perfect for Events, Celebrations…</p></div>
            <div className="gift-card"><h3>THE ART OF GIFTING</h3><p>A personal touch for every occasion.</p></div>
            <div className="gift-card"><h3>CORPORATE GIFTING</h3><p>Make every connection memorable — from festive cheer to milestone celebrations.</p></div>
          </div>
        </section>

        <section className="section">
          <h2>WHAT PEOPLE SAY</h2>
          <div className="reviews">
            {REVIEWS.map((r) => (
              <blockquote key={r.name} className="review">
                <p className="stars">★★★★★</p>
                <p>“{r.text}”</p>
                <footer>{r.name} — {r.place}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section id="faq" className="section faq">
          <h2>FREQUENTLY ASKED QUESTIONS</h2>
          {FAQS.map((f, i) => (
            <div className="faq-item" key={f.q}>
              <button type="button" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>{f.q}<span>{openFaq === i ? '−' : '+'}</span></button>
              {openFaq === i && <p>{f.a}</p>}
            </div>
          ))}
        </section>
      </main>

      <footer className="footer">
        <p className="footer-mission">Welcome to Urban Platter — the home of Simply Good Food! At Urban Platter, we are on a mission to change the way you experience food. We believe that great food is more than just a meal, it’s a journey, a story, and an experience that connects people, cultures, and moments. Our mission is simple: to make gourmet and healthy food products easily available and accessible for everyone. Our tagline, “Simply Good Food”, embodies everything we stand for — authentic, high-quality, and thoughtfully sourced ingredients that bring joy to every plate.</p>
        <div className="footer-grid">
          <div><h4>Shop</h4><p>All Products<br />New Arrivals<br />Kitchen<br />Recipes<br />Blogs<br />Events<br />Workshops</p></div>
          <div><h4>Support</h4><p>FAQs<br />Shipping<br />Returns<br />Payments<br />Orders<br />Accounts<br />Contact</p></div>
          <div><h4>About</h4><p>About Us<br />Careers<br />Stores<br />Blogs<br />Recipes</p></div>
          <div><h4>Follow</h4><p>YouTube<br />Instagram<br />LinkedIn</p></div>
        </div>
        <p className="fine">Payment methods accepted · © 2026 Urban Platter · Privacy Policy · Terms &amp; Conditions · Shipping Policy · Refund Policy · Free shipping on orders above Rs. 500</p>
      </footer>

      {cartOpen && (
        <div className="drawer-backdrop" onClick={() => setCartOpen(false)}>
          <aside className="drawer" onClick={(e) => e.stopPropagation()} aria-label="Your bag">
            <div className="drawer-head"><h2>YOUR BAG</h2><button type="button" onClick={() => setCartOpen(false)}>Close ✕</button></div>
            {cartItems.length === 0 ? (
              <p>Your bag is empty. Add something good.</p>
            ) : (
              <>
                {cartItems.map(({ product, qty }) => (
                  <div className="cart-line" key={product.id}>
                    <div><strong>{product.name}</strong><p>{inr(product.price)} each</p></div>
                    <div className="qty">
                      <button type="button" onClick={() => setQty(product.id, qty - 1)} aria-label="Decrease quantity">−</button>
                      <span>{qty}</span>
                      <button type="button" onClick={() => setQty(product.id, qty + 1)} aria-label="Increase quantity">+</button>
                    </div>
                    <strong>{inr(product.price * qty)}</strong>
                  </div>
                ))}
                <p className="total-line"><span>Subtotal</span><span>{inr(subtotal)}</span></p>
                <p className="total-line"><span>10% off (orders above ₹2,500)</span><span>{discount ? '− ' + inr(discount) : '—'}</span></p>
                <p className="total-line grand"><span>Total</span><span>{inr(subtotal - discount)}</span></p>
                <p className="fine">{subtotal >= 500 ? 'Free shipping unlocked (above Rs. 500).' : `Add ${inr(500 - subtotal)} more for free shipping.`}</p>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  )
}
