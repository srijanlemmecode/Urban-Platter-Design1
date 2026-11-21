import { useEffect, useMemo, useRef, useState } from 'react'
import { PRODUCTS, NAV, GROUPS, TOTAL_PRODUCTS, PRICE_RANGE, inr } from './data/products.js'

const SORTS = [
  'Featured', 'Best selling', 'Price, low to high', 'Price, high to low',
  'Alphabetically, A-Z', 'Alphabetically, Z-A', 'Discount, high to low', 'Top rated',
]

function initials(name) {
  const words = name.replace(/[^A-Za-z ]/g, '').split(' ').filter(Boolean)
  return (words[0]?.[0] || 'U') + (words[1]?.[0] || '')
}

function ProductImage({ product }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  if (failed || !product.image) return <span className="monogram">{initials(product.name)}</span>
  return <img src={product.image} alt={product.name} loading="lazy" className={loaded ? 'loaded' : ''} onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />
}

function discountPct(p) {
  const m = p.off ? p.off.match(/(\d+)/) : null
  return m ? Number(m[1]) : 0
}

function ProductCard({ p, onAdd, onQuick, wished, onWish, notified, onNotify }) {
  return (
    <article className="card">
      <div className="card-image" onClick={() => onQuick(p)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') onQuick(p) }} aria-label={`Quick view ${p.name}`}>
        <ProductImage product={p} />
        <span className="card-group">{p.group}</span>
        {p.off && <span className="badge">{p.off}</span>}
        {p.arrivingSoon && <span className="badge soon">Arriving soon</span>}
        <button type="button" className={wished ? 'wish active' : 'wish'} aria-label={wished ? `Remove ${p.name} from wishlist` : `Save ${p.name} to wishlist`} onClick={(e) => { e.stopPropagation(); onWish(p.id) }}>{wished ? '♥' : '♡'}</button>
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
          <button type="button" className="btn-secondary" onClick={() => onNotify(p.id)}>
            {notified ? 'We’ll notify you ✓' : 'Notify Me'}
          </button>
        ) : (
          <button type="button" className="btn-primary btn-block" onClick={() => onAdd(p)}>
            {p.options ? 'Choose options' : 'Add to cart'}
          </button>
        )}
      </div>
    </article>
  )
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
  const [quickView, setQuickView] = useState(null)
  const [quickQty, setQuickQty] = useState(1)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)
  const [wishlist, setWishlist] = useState([])
  const [showTop, setShowTop] = useState(false)
  const progressRef = useRef(null)
  const [countdown, setCountdown] = useState({ h: 0, m: 0, s: 0 })
  const [maxPrice, setMaxPrice] = useState(1600)
  const [discountOnly, setDiscountOnly] = useState(false)
  const [ratedOnly, setRatedOnly] = useState(false)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [visibleCount, setVisibleCount] = useState(12)
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const end = new Date(now)
      end.setHours(24, 0, 0, 0)
      const diff = Math.max(0, end - now)
      setCountdown({ h: Math.floor(diff / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const el = document.documentElement
        const max = el.scrollHeight - el.clientHeight
        const pct = max > 0 ? Math.min((el.scrollTop / max) * 100, 100) : 0
        if (progressRef.current) progressRef.current.style.width = `${pct}%`
        setShowTop(el.scrollTop > 600)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => { setVisibleCount(12) }, [query, group, sort, maxPrice, discountOnly, ratedOnly, inStockOnly])

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const q = query.trim().toLowerCase()
      const matchesQuery = !q || (p.name + ' ' + p.desc).toLowerCase().includes(q)
      const matchesGroup = group === 'All' || p.group === group
      const matchesPrice = p.price <= maxPrice
      const matchesDiscount = !discountOnly || discountPct(p) > 0
      const matchesRated = !ratedOnly || (p.rating && p.rating >= 4)
      const matchesStock = !inStockOnly || !p.arrivingSoon
      return matchesQuery && matchesGroup && matchesPrice && matchesDiscount && matchesRated && matchesStock
    })
    if (sort === 'Price, low to high') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'Price, high to low') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'Alphabetically, A-Z') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'Alphabetically, Z-A') list = [...list].sort((a, b) => b.name.localeCompare(a.name))
    if (sort === 'Discount, high to low') list = [...list].sort((a, b) => discountPct(b) - discountPct(a))
    if (sort === 'Top rated') list = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0))
    return list
  }, [query, group, sort, maxPrice, discountOnly, ratedOnly, inStockOnly])

  const visible = filtered.slice(0, visibleCount)

  const cartItems = Object.entries(cart)
    .map(([id, qty]) => ({ product: PRODUCTS.find((p) => p.id === Number(id)), qty }))
    .filter((x) => x.product)
  const cartCount = cartItems.reduce((s, x) => s + x.qty, 0)
  const subtotal = cartItems.reduce((s, x) => s + x.product.price * x.qty, 0)
  const discount = subtotal >= 2500 ? Math.round(subtotal * 0.1) : 0

  function addToCart(p, qty = 1) {
    setCart((c) => ({ ...c, [p.id]: (c[p.id] || 0) + qty }))
    setToast(`Added ${p.name} to your bag`)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2600)
  }
  function toggleWish(id) { setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])) }
  function openQuick(p) { setQuickView(p); setQuickQty(1) }
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
      <div className="scroll-progress" aria-hidden="true"><div ref={progressRef} /></div>
      <div className="promo">Get 10% OFF on orders above ₹2,500/- &nbsp;·&nbsp; Ends in {String(countdown.h).padStart(2, '0')}:{String(countdown.m).padStart(2, '0')}:{String(countdown.s).padStart(2, '0')}</div>

      <header className="header">
        <div className="header-inner">
          <div className="logo">Urban <span>Platter</span></div>
          <label className="search">
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for" aria-label="Search for products" />
          </label>
          <span className="wish-count" title="Wishlist">♥ {wishlist.length}</span>
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
        <section className="hero reveal in">
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
            <img className="hero-image" src={PRODUCTS[0].image} alt="" onError={(e) => { e.currentTarget.style.display = 'none' }} />
            <p className="hero-card-label">Featured</p>
            <p className="hero-card-name">Brazil Nuts, 250g</p>
            <p className="hero-card-desc">Rich in Selenium · Superfood · Product of Peru</p>
            <p className="hero-card-price">{inr(925)} <s>{inr(1200)}</s> <em>23% off</em></p>
            <p className="hero-card-rating">★ 4.7 (149 reviews)</p>
          </div>
        </section>

        <section className="values reveal" aria-label="Why Urban Platter">
          <div><strong>Authentic</strong><span>Thoughtfully sourced ingredients</span></div>
          <div><strong>High-quality</strong><span>Simply Good Food, every time</span></div>
          <div><strong>1,753 products</strong><span>Nuts, seeds, flours, snacks &amp; more</span></div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            <span>Free shipping above ₹500 ✦ 10% off above ₹2,500 ✦ Simply Good Food ✦ 1,753 products ✦&nbsp;</span>
            <span>Free shipping above ₹500 ✦ 10% off above ₹2,500 ✦ Simply Good Food ✦ 1,753 products ✦&nbsp;</span>
          </div>
        </div>

        <section id="products" className="collection reveal">
          <div className="collection-head">
            <div>
              <p className="eyebrow">The Collection</p>
              <h2>All Products</h2>
              <p className="count">Showing {visible.length} of {filtered.length} products · {TOTAL_PRODUCTS.toLocaleString('en-IN')} in the full collection</p>
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
          <div className="filters">
            <label className="price-filter">
              <span>Up to {inr(maxPrice)}</span>
              <span className="slider-wrap">
                <span className="slider-bubble" style={{ left: `${Math.min(Math.max((maxPrice / 1600) * 100, 9), 91)}%` }}>{inr(maxPrice)}</span>
                <input type="range" min="0" max="1600" step="50" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} aria-label="Maximum price" />
              </span>
              <span className="slider-ends"><span>{inr(0)}</span><span>{inr(1600)}</span></span>
            </label>
            <button type="button" className={discountOnly ? 'chip active' : 'chip'} onClick={() => setDiscountOnly((v) => !v)}>Discounted</button>
            <button type="button" className={ratedOnly ? 'chip active' : 'chip'} onClick={() => setRatedOnly((v) => !v)}>4★ &amp; above</button>
            <button type="button" className={inStockOnly ? 'chip active' : 'chip'} onClick={() => setInStockOnly((v) => !v)}>In stock only</button>
          </div>
          <p className="price-range">Price: {inr(PRICE_RANGE.min)} – {inr(PRICE_RANGE.max)}</p>

          {filtered.length === 0 ? (
            <p className="empty">No products match “{query}” in {group}. Try a different search or clear the filters.</p>
          ) : (
            <>
              <div className="grid">
                {visible.map((p) => (
                  <ProductCard key={p.id} p={p} onAdd={addToCart} onQuick={openQuick} wished={wishlist.includes(p.id)} onWish={toggleWish} notified={notified[p.id]} onNotify={(id) => setNotified((n) => ({ ...n, [id]: true }))} />
                ))}
              </div>
              {visibleCount < filtered.length && (
                <button type="button" className="load-more" onClick={() => setVisibleCount((c) => c + 12)}>
                  Load more ({filtered.length - visibleCount} remaining)
                </button>
              )}
            </>
          )}
          <p className="source-note">
            First 30 products in Featured order, as shown live on urbanplatter.com/collections/all on 21 Nov 2026.
            Prices may change. The full collection has {TOTAL_PRODUCTS.toLocaleString('en-IN')} products.
          </p>
        </section>

        <section className="signup reveal">
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

      <footer className="footer reveal">
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
                    <div className="cart-thumb"><ProductImage product={product} /></div>
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
                <p className="ship-note">{subtotal >= 500 ? 'Free shipping unlocked (above Rs. 500).' : `Add ${inr(500 - subtotal)} more for free shipping.`}</p>
                <div className="ship-progress" aria-hidden="true"><div style={{ width: `${Math.min(subtotal / 500, 1) * 100}%` }} /></div>
              </>
            )}
          </aside>
        </div>
      )}

      {cartCount > 0 && (
        <button type="button" className="float-bag" onClick={() => setCartOpen(true)} aria-label={`Open your bag, ${cartCount} items, total ${inr(subtotal - discount)}`}>
          🛍 Bag ({cartCount}) · {inr(subtotal - discount)}
        </button>
      )}
      {showTop && (
        <button type="button" className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">↑</button>
      )}
      {toast && (
        <div className="toast" role="status">✓ {toast}</div>
      )}
      {quickView && (
        <div className="modal-backdrop" onClick={() => setQuickView(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={`Quick view ${quickView.name}`}>
            <button type="button" className="modal-close" onClick={() => setQuickView(null)} aria-label="Close quick view">✕</button>
            <div className="modal-image"><ProductImage product={quickView} /></div>
            <div className="modal-body">
              <h3>{quickView.name}</h3>
              <p className="desc">{quickView.desc}</p>
              {quickView.rating ? <p className="rating">★ {quickView.rating} ({quickView.reviews})</p> : <p className="rating muted">0 Reviews</p>}
              <p className="price">{quickView.fromPrice ? 'From ' : ''}{inr(quickView.price)}{quickView.mrp && <s>{inr(quickView.mrp)}</s>}</p>
              {quickView.arrivingSoon ? (
                <button type="button" className="btn-secondary" onClick={() => { setNotified((n) => ({ ...n, [quickView.id]: true })); setQuickView(null) }}>
                  {notified[quickView.id] ? 'We’ll notify you ✓' : 'Notify Me'}
                </button>
              ) : (
                <>
                  <div className="qty modal-qty">
                    <button type="button" onClick={() => setQuickQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
                    <span>{quickQty}</span>
                    <button type="button" onClick={() => setQuickQty((q) => q + 1)} aria-label="Increase quantity">+</button>
                  </div>
                  <button type="button" className="btn-primary btn-block" onClick={() => { addToCart(quickView, quickQty); setQuickView(null) }}>Add {quickQty} to cart · {inr(quickView.price * quickQty)}</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
