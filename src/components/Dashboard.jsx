import { useState } from 'react'
import './Dashboard.css'
import IceCream, { allProducts } from './IceCream.jsx'
import Icon from './Icon.jsx'
const modules = [
  { name: 'Ice Cream', icon: '✳' },
  { name: 'Events', icon: '♡', soon: true },
  { name: 'Photography', icon: '▧', soon: true },
  { name: 'Tourism', icon: '⌖', soon: true },
]

function Dashboard({ onLogout }) {
  const [activeModule, setActiveModule] = useState('')
  const [cart, setCart] = useState({})
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [toast, setToast] = useState('')

  const cartItems = allProducts.filter((product) => cart[product.id])
  const cartCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0)
  const cartTotal = cartItems.reduce((total, product) => total + product.price * cart[product.id], 0)

  function updateCart(productId, change) {
    setCart((current) => {
      const nextQuantity = (current[productId] || 0) + change
      const next = { ...current }
      if (nextQuantity <= 0) delete next[productId]
      else next[productId] = nextQuantity
      return next
    })
    if (change > 0) {
      setToast('A little joy added to your bag.')
      window.setTimeout(() => setToast(''), 2400)
    }
  }

  function handleModuleClick(module) {
    if (module.soon) {
      setToast(`${module.name} is coming soon.`)
      window.setTimeout(() => setToast(''), 2400)
    } else {
      setActiveModule(module.name)
    }
    setMobileNavOpen(false)
  }

  return (
    <main className="shop-dashboard">
      <aside className={`shop-sidebar ${mobileNavOpen ? 'shop-sidebar--open' : ''}`}>
        <a className="shop-brand" href="#shop-home" aria-label="Sunday Scoops home">
          <span className="shop-brand-mark">s</span>
          <span><strong>sunday</strong><small>SCOOPS & GELATO</small></span>
        </a>

        <p className="sidebar-label">YOUR LITTLE WORLD</p>
        <nav className="shop-nav" aria-label="Main navigation">
          {modules.map((module) => (
            <button
              className={`shop-nav-link ${activeModule === module.name ? 'is-active' : ''}`}
              type="button"
              key={module.name}
              onClick={() => handleModuleClick(module)}
            >
              <span className="nav-icon">{module.icon}</span>
              <span>{module.name}</span>
              {module.soon && <small>SOON</small>}
            </button>
          ))}
        </nav>

        <div className="sidebar-note">
          <span className="note-sun">☼</span>
          <p>Made slowly.<br />Enjoyed fully.</p>
          <span>SMALL BATCH, BIG JOY</span>
        </div>

        <button className="profile-card" type="button" onClick={onLogout} aria-label="Sign out">
          <span className="profile-avatar">J</span>
          <span className="profile-copy"><strong>Jamie Parker</strong><small>Sunday regular</small></span>
          <span className="profile-menu">⋯</span>
        </button>
      </aside>

      {mobileNavOpen && <button className="nav-backdrop" type="button" aria-label="Close menu" onClick={() => setMobileNavOpen(false)} />}

      <section className="shop-main" id="shop-home">
        <header className="shop-header">
          <button className="mobile-menu-button" type="button" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}><Icon name="menu" /></button>
          <div className="breadcrumb"><span>Sunday Scoops</span><span className="breadcrumb-dot">/</span><strong>{activeModule || 'Dashboard'}</strong></div>
          <div className="header-actions">
            <span className="open-status"><i /> Open until 10 PM</span>
            <button className="cart-trigger" type="button" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${cartCount} items`}>
              <Icon name="bag" /><span className="cart-trigger-label">My bag</span><b>{cartCount}</b>
            </button>
            <button className="header-avatar" type="button" onClick={onLogout} aria-label="Sign out">J</button>
          </div>
        </header>

        {activeModule === 'Ice Cream' ? <IceCream onAddToCart={updateCart} /> : <div className="dashboard-welcome"><span className="section-kicker"><span /> YOUR SUNDAY SCOOPS DASHBOARD</span><h1>Welcome back, Jamie.</h1><p>Your little world of freshly churned scoops is ready.</p><button type="button" onClick={() => setActiveModule('Ice Cream')}>Browse ice cream <Icon name="arrow" size={17} /></button></div>}
      </section>

      {cartOpen && <>
        <button className="cart-backdrop" type="button" aria-label="Close cart" onClick={() => setCartOpen(false)} />
        <aside className="cart-panel" aria-label="Shopping bag">
          <div className="cart-header"><div><span className="section-kicker"><span /> YOUR LITTLE TREATS</span><h2>Your bag <small>({cartCount})</small></h2></div><button type="button" className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close cart"><Icon name="close" /></button></div>
          {cartItems.length ? <>
            <div className="cart-items">{cartItems.map((product) => <div className="cart-item" key={product.id}>
              <img src={product.image} alt="" />
              <div className="cart-item-info"><strong>{product.name}</strong><small>{product.note}</small><b>${(product.price * cart[product.id]).toFixed(2)}</b></div>
              <div className="quantity-control"><button type="button" onClick={() => updateCart(product.id, -1)} aria-label={`Remove one ${product.name}`}><Icon name="minus" size={14} /></button><span>{cart[product.id]}</span><button type="button" onClick={() => updateCart(product.id, 1)} aria-label={`Add one ${product.name}`}><Icon name="plus" size={14} /></button></div>
            </div>)}</div>
            <div className="cart-summary"><p><span>Subtotal</span><strong>${cartTotal.toFixed(2)}</strong></p><small>Taxes and pickup options calculated at checkout.</small><button type="button" onClick={() => { setToast('Your scoops are being saved for checkout.'); setCartOpen(false); window.setTimeout(() => setToast(''), 2600) }}>Continue to checkout <Icon name="arrow" size={17} /></button></div>
          </> : <div className="empty-cart"><span>♡</span><h3>Your bag is still dreaming.</h3><p>Add a scoop or two and make its day.</p><button type="button" onClick={() => setCartOpen(false)}>Explore flavours</button></div>}
        </aside>
      </>}

      {toast && <div className="shop-toast" role="status">✳ &nbsp; {toast}</div>}
    </main>
  )
}

export default Dashboard
