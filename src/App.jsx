import { useMemo, useState } from 'react'
import { PRODUCTS, NAV, GROUPS, TOTAL_PRODUCTS, PRICE_RANGE, inr } from './data/products.js'

const SORTS = [
  'Featured', 'Best selling', 'Price, low to high', 'Price, high to low',
  'Alphabetically, A-Z', 'Alphabetically, Z-A',
]

function initials(name) {
  const words = name.replace(/[^A-Za-z ]/g, '').split(' ').filter(Boolean)
  return (words[0]?.[0] || 'U') + (words[1]?.[0] || '')
}

export default function App() {
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState('All')
  const [sort, setSort] = useState('Featured')
  const [cart, setCart] = useState({})
  const [cartOpen, setCartOpen] = useState(false)
  const [notified, setNotified] = useState({})
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const q = query.trim().toLowerCase()
      const matchesQuery = !q || (p.name + ' ' + p.desc).toLowerCase().includes(q)
      const matchesGroup = group === 'All' || p.group === group
      return matchesQuery && matchesGroup
    })
    if (sort === 'Price, low to high') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'Price, high to low') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'Alphabetically, A-Z') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'Alphabetically, Z-A') list = [...list].sort((a, b) => b.name.localeCompare(a.name))
    return list
  }, [query, group, sort])

  const cartItems = Object.entries(cart)
    .map(([id, qty]) => ({ product: PRODUCTS.find((p) => p.id === Number(id)), qty }))
    .filter((x) => x.product)
  const cartCount = cartItems.reduce((s, x) => s + x.qty, 0)
  const subtotal = cartItems.reduce((s, x) => s + x.product.price * x.qty, 0)
  const discount = subtotal >= 2500 ? Math.round(subtotal * 0.1) : 0

  function addToCart(p) {
    setCart((c) => ({ ...c, [p.id]: (c[p.id] || 0) + 1 }))
  }
  function setQty(id, qty) {
    setCart((c) => {
      const next = { ...c }
      if (qty <= 0) delete next[id]
      else next[id] = qty
      return next
    })
  }

  return (
    <div className="page">
      <div className="promo">Get 10% OFF on orders above ₹2,500/-</div>

      <header className="header">
        <div className="header-inner">
          <div className="logo">Urban <span>Platter</span></div>
          <label className="search">
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for" aria-label="Search for products" />
          </label>
          <button className="bag" onClick={() => setCartOpen(true)} type="button">
            Bag {cartCount > 0 ? `(${cartCount})` : ''}
          </button>
        </div>
        <nav className="nav" aria-label="Primary">
          {NAV.map((item) => (
            <button key={item} type="button" onClick={() => {
              const match = GROUPS.find((g) => g === item)
              if (match) setGroup(match)
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
            }}>{item}</button>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">All Products &nbsp;·&nbsp; {TOTAL_PRODUCTS.toLocaleString('en-IN')} products</p>
            <h1>Simply<br />Good Food.</h1>
            <p className="hero-text">
              Welcome to Urban Platter — the home of Simply Good Food. We are on a mission
              to change the way you experience food. Great food is more than ingredients —
              it is authentic, high-quality, and thoughtfully sourced.
            </p>
            <div className="hero-actions">
              <a className="btn-primary" href="#products">Shop all products</a>
              <span className="hero-note">10% off above ₹2,500</span>
            </div>
          </div>
          <div className="hero-card" aria-hidden="true">
            <p className="hero-card-label">Featured</p>
            <p className="hero-card-name">Brazil Nuts, 250g</p>
            <p className="hero-card-desc">Rich in Selenium · Superfood · Product of Peru</p>
            <p className="hero-card-price">{inr(925)} <s>{inr(1200)}</s> <em>23% off</em></p>
            <p className="hero-card-rating">★ 4.7 (149 reviews)</p>
          </div>
        </section>

        <section className="values" aria-label="Why Urban Platter">
          <div><strong>Authentic</strong><span>Thoughtfully sourced ingredients</span></div>
          <div><strong>High-quality</strong><span>Simply Good Food, every time</span></div>
          <div><strong>1,753 products</strong><span>Nuts, seeds, flours, snacks &amp; more</span></div>
        </section>

        <section id="products" className="collection">
          <div className="collection-head">
            <div>
              <p className="eyebrow">The Collection</p>
              <h2>All Products</h2>
              <p className="count">Showing {filtered.length} of {TOTAL_PRODUCTS.toLocaleString('en-IN')} products</p>
            </div>
            <label className="sort">
              Sort by
              <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort by">
                {SORTS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
          </div>

          <div className="chips" role="group" aria-label="Filter by category">
            {GROUPS.map((g) => (
              <button key={g} type="button" className={group === g ? 'chip active' : 'chip'} onClick={() => setGroup(g)}>
                {g}
              </button>
            ))}
          </div>
          <p className="price-range">Price: {inr(PRICE_RANGE.min)} – {inr(PRICE_RANGE.max)}</p>

          {filtered.length === 0 ? (
            <p className="empty">No products match “{query}” in {group}. Try a different search.</p>
          ) : (
            <div className="grid">
              {filtered.map((p) => (
                <article className="card" key={p.id}>
                  <div className="card-image">
                    <span className="monogram">{initials(p.name)}</span>
                    <span className="card-group">{p.group}</span>
                    {p.off && <span className="badge">{p.off}</span>}
                    {p.arrivingSoon && <span className="badge soon">Arriving soon</span>}
                  </div>
                  <div className="card-body">
                    <h3>{p.name}</h3>
                    <p className="desc">{p.desc}</p>
                    {p.rating && <p className="rating">★ {p.rating} ({p.reviews})</p>}
                    <p className="price">
                      {p.fromPrice ? 'From ' : ''}{inr(p.price)}
                      {p.mrp && <s>{inr(p.mrp)}</s>}
                    </p>
                    {p.arrivingSoon ? (
                      <button type="button" className="btn-secondary" onClick={() => setNotified((n) => ({ ...n, [p.id]: true }))}>
                        {notified[p.id] ? 'We’ll notify you ✓' : 'Notify Me'}
                      </button>
                    ) : (
                      <button type="button" className="btn-primary btn-block" onClick={() => addToCart(p)}>
                        {p.options ? 'Choose options' : 'Add to cart'}
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
          <p className="source-note">
            First 30 products in Featured order, as shown live on urbanplatter.com/collections/all on 21 Nov 2026.
            Prices may change. The full collection has {TOTAL_PRODUCTS.toLocaleString('en-IN')} products.
          </p>
        </section>

        <section className="signup">
          <h2>Get 5% Off on your First Order</h2>
          <p>Subscribe to our mailing list and receive 5% off your first order, plus exclusive access to new products, sales &amp; promotions.</p>
          {subscribed ? (
            <p className="subscribed">Thank you — you’re subscribed.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (email.includes('@')) setSubscribed(true) }}>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" aria-label="Email address" />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          )}
        </section>
      </main>

      <footer className="footer">
        <div className="footer-grid">
          <div>
            <p className="logo">Urban <span>Platter</span></p>
            <p>Simply Good Food.</p>
            <p>YouTube · Instagram · LinkedIn</p>
          </div>
          <div><h4>Shop</h4><p>All Products<br />New Arrivals<br />Kitchen<br />Recipes<br />Blogs<br />Events<br />Workshops</p></div>
          <div><h4>Support</h4><p>FAQs<br />Shipping<br />Returns<br />Payments<br />Orders<br />Accounts<br />Contact</p></div>
          <div><h4>About</h4><p>About Us<br />Careers<br />Stores<br />Blogs<br />Recipes</p></div>
        </div>
        <p className="fine">Payment methods accepted · © 2026 Urban Platter · Privacy Policy · Terms &amp; Conditions · Shipping Policy · Refund Policy</p>
      </footer>

      {cartOpen && (
        <div className="drawer-backdrop" onClick={() => setCartOpen(false)}>
          <aside className="drawer" onClick={(e) => e.stopPropagation()} aria-label="Your bag">
            <div className="drawer-head"><h2>Your Bag</h2><button type="button" onClick={() => setCartOpen(false)}>Close ✕</button></div>
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
                {subtotal < 2500 && <p className="promo-hint">Add {inr(2500 - subtotal)} more to get 10% off.</p>}
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  )
}
