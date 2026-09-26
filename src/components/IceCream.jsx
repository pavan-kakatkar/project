import { useMemo, useState } from 'react'
import Icon from './Icon.jsx'
import chocolateKulfiImage from '../kulfi/chocolate_kulfi.jpg'
import gulkandKulfiImage from '../kulfi/gulkand_kulfi.jpg'
import kesarPistaKulfiImage from '../kulfi/Kesar-Pista-Kulfi.webp'
import classicKulfiImage from '../kulfi/Kulfi.jpg'
import malaiKulfiImage from '../kulfi/malai_kulfi.jpg'
import mangoKulfiImage from '../kulfi/Mango-Kulfi.jpg'
import paanKulfiImage from '../kulfi/pan_kulfi.jpeg'

const scoopImages = import.meta.glob('../scoop/*.webp', { eager: true, query: '?url', import: 'default' })
const scoopImage = (filename) => scoopImages[`../scoop/${filename}`]
const traditionalImages = import.meta.glob('../reginol/*', { eager: true, query: '?url', import: 'default' })
const traditionalImage = (filename) => traditionalImages[`../reginol/${filename}`]
const products = [
  { id: 'banana', name: 'Banana', note: 'Ripe banana', price: 5.5, category: 'Fruity', image: scoopImage('banana-530x530.webp'), tone: 'yellow', available: true },
  { id: 'black-cherry', name: 'Black Cherry', note: 'Dark cherry', price: 6, category: 'Fruity', image: scoopImage('black-cherry-530x530.webp'), tone: 'pink', available: true },
  { id: 'blackberry', name: 'Blackberry', note: 'Ripe blackberry', price: 6, category: 'Fruity', image: scoopImage('blackberry-530x530.webp'), tone: 'pink', available: true },
  { id: 'chocolate', name: 'Chocolate', note: 'Rich chocolate', price: 6.25, category: 'Chocolate', image: scoopImage('chocolate-530x530.webp'), tone: 'cream', available: true },
  { id: 'coconut', name: 'Coconut', note: 'Creamy coconut', price: 5.75, category: 'Classic', image: scoopImage('coconut-530x530.webp'), tone: 'cream', available: true },
  { id: 'creme-caramel', name: 'Creme Caramel', note: 'Caramel custard', price: 6, category: 'Classic', image: scoopImage('creme-caramel-530x530.webp'), tone: 'yellow', available: true },
  { id: 'group-394', name: 'Scoop of the Day', note: 'Ask us for today’s flavour', price: 5.75, category: 'Classic', image: scoopImage('Group-394-e1660914561623.webp'), tone: 'mint', available: true },
  { id: 'honeycomb', name: 'Honeycomb', note: 'Honeycomb pieces', price: 6, category: 'Classic', image: scoopImage('honeycomb-530x530.webp'), tone: 'yellow', available: true },
  { id: 'mint-choc-chip', name: 'Mint Choc Chip', note: 'Mint and chocolate chips', price: 6, category: 'Chocolate', image: scoopImage('mint-choc-chip-530x530.webp'), tone: 'mint', available: true },
  { id: 'pineapple', name: 'Pineapple', note: 'Bright pineapple', price: 5.75, category: 'Fruity', image: scoopImage('pineapple-530x530.webp'), tone: 'yellow', available: true },
  { id: 'raspberry', name: 'Raspberry', note: 'Tart raspberry', price: 5.75, category: 'Fruity', image: scoopImage('raspberry-530x530.webp'), tone: 'pink', available: true },
  { id: 'strawberry', name: 'Strawberry', note: 'Sweet strawberry', price: 5.75, category: 'Fruity', image: scoopImage('strawberry-530x530.webp'), tone: 'pink', available: true },
  { id: 'toffee-fudge', name: 'Toffee Fudge', note: 'Toffee and fudge', price: 6.25, category: 'Chocolate', image: scoopImage('toffee-fudge-530x530.webp'), tone: 'cream', available: true },
  { id: 'vanilla', name: 'Vanilla', note: 'Classic vanilla', price: 5.5, category: 'Classic', image: scoopImage('vanilla-530x530.webp'), tone: 'cream', available: true },
]

const traditionalProducts = [
  { id: 'fresh-fruit', name: 'Fresh Fruit', note: 'Seasonal fruit ice cream', price: 6, category: 'Fruity', image: traditionalImage('fresh-fruit.jpg'), available: true },
  { id: 'gajar-halwa', name: 'Gajar Halwa', note: 'Carrot halwa inspired', price: 6.5, category: 'Classic', image: traditionalImage('Gajar-Halwa.jpg'), available: true },
  { id: 'modak', name: 'Modak', note: 'A festive Indian favourite', price: 6.5, category: 'Classic', image: traditionalImage('modak_icecream.webp'), available: true },
  { id: 'motichoor', name: 'Motichoor', note: 'Sweet boondi-inspired flavour', price: 6.5, category: 'Classic', image: traditionalImage('Motichoor.jpg'), available: true },
  { id: 'regional-special', name: 'Regional Special', note: 'A traditional house flavour', price: 6, category: 'Classic', image: traditionalImage('reginol_flavor.jpg'), available: true },
  { id: 'sitaphal', name: 'Sitaphal', note: 'Creamy custard apple', price: 6.5, category: 'Fruity', image: traditionalImage('sitaphal.jpg'), available: true },
  { id: 'thandai', name: 'Thandai', note: 'Aromatic spiced milk flavour', price: 6.5, category: 'Classic', image: traditionalImage('Thandai-ice-cream.jpg'), available: true },
]

const kulfiProducts = [
  { id: 'chocolate-kulfi', name: 'Chocolate Kulfi', note: 'Rich chocolate kulfi', price: 6.5, category: 'Classic', image: chocolateKulfiImage, available: true },
  { id: 'gulkand-kulfi', name: 'Gulkand Kulfi', note: 'Rose petal preserve kulfi', price: 6.5, category: 'Classic', image: gulkandKulfiImage, available: true },
  { id: 'kesar-pista-kulfi', name: 'Kesar Pista Kulfi', note: 'Saffron and pistachio', price: 6.5, category: 'Classic', image: kesarPistaKulfiImage, available: true },
  { id: 'classic-kulfi', name: 'Classic Kulfi', note: 'Traditional creamy kulfi', price: 6.5, category: 'Classic', image: classicKulfiImage, available: true },
  { id: 'malai-kulfi', name: 'Malai Kulfi', note: 'Creamy milk kulfi', price: 6.5, category: 'Classic', image: malaiKulfiImage, available: true },
  { id: 'mango-kulfi', name: 'Mango Kulfi', note: 'Sweet mango kulfi', price: 6.5, category: 'Fruity', image: mangoKulfiImage, available: true },
  { id: 'paan-kulfi', name: 'Paan Kulfi', note: 'Aromatic paan flavour', price: 6.5, category: 'Classic', image: paanKulfiImage, available: true },
]

const categories = ['All scoops', 'Classic', 'Fruity', 'Chocolate']
export const allProducts = [...products, ...traditionalProducts, ...kulfiProducts]

function IceCream({ onAddToCart }) {
  const [activeMenu, setActiveMenu] = useState('scoops')
  const [activeCategory, setActiveCategory] = useState('All scoops')
  const [search, setSearch] = useState('')
  const [priceSort, setPriceSort] = useState('featured')
  const [priceRange, setPriceRange] = useState('any')

  const visibleProducts = useMemo(() => {
    const menuProducts = activeMenu === 'traditional'
      ? traditionalProducts
      : activeMenu === 'kulfi' ? kulfiProducts : products
    const filtered = menuProducts.filter((product) => {
      const matchesCategory = activeCategory === 'All scoops' || product.category === activeCategory
      const matchesSearch = `${product.name} ${product.note} ${product.category}`.toLowerCase().includes(search.toLowerCase())
      const matchesPrice = priceRange === 'any'
        || (priceRange === 'under-six' && product.price < 6)
        || (priceRange === 'six-to-six-fifty' && product.price >= 6 && product.price <= 6.5)
        || (priceRange === 'over-six-fifty' && product.price > 6.5)
      return matchesCategory && matchesSearch && matchesPrice
    })
    if (priceSort === 'low') filtered.sort((first, second) => first.price - second.price)
    if (priceSort === 'high') filtered.sort((first, second) => second.price - first.price)
    return filtered
  }, [activeMenu, activeCategory, search, priceRange, priceSort])

  const featuredProduct = products.find((product) => product.id === 'honeycomb')

  return (
    <div className="shop-content">
      <section className="welcome-row">
        <div>
          <span className="section-kicker"><span /> CHURNED FRESH THIS MORNING</span>
          <h1>A little joy,<br className="mobile-title-break" /> scooped fresh.</h1>
          <p>Handcrafted in small batches, just for your kind of day.</p>
        </div>
        <div className="today-stamp"><span>✳</span><small>SUNDAY<br />SCOOPS</small></div>
      </section>

      <section className="featured-scoop" aria-label="Featured flavor">
        <img src={featuredProduct.image} alt="Honeycomb ice cream" />
        <div className="featured-shade" />
        <div className="featured-copy">
          <span className="featured-tag"><span>✦</span> A COUNTER FAVOURITE</span>
          <h2>Golden honeycomb<br />& creamy vanilla</h2>
          <p>Little honeycomb pieces in every creamy scoop.<br className="desktop-only" /> Available by the scoop today.</p>
          <button type="button" onClick={() => onAddToCart(featuredProduct.id, 1)}>Scoop this one <Icon name="arrow" size={17} /></button>
        </div>
        <span className="featured-number">01 / 06</span>
      </section>

      <section className="flavour-section" aria-labelledby="flavours-heading">
        <div className="flavour-heading-row">
          <div>
            <span className="section-kicker"><span /> SCOOPED FRESH</span>
            <div className="flavour-title-tabs">
              <h2 id="flavours-heading">{activeMenu === 'traditional' ? 'Traditional favourites.' : activeMenu === 'kulfi' ? 'Kulfi favourites.' : 'Scoops at the counter.'}</h2>
              <div className="flavour-tabs" aria-label="Ice cream menu">
                <button className={activeMenu === 'scoops' ? 'is-active' : ''} type="button" aria-pressed={activeMenu === 'scoops'} onClick={() => setActiveMenu('scoops')}>Scoops</button>
                <button className={activeMenu === 'traditional' ? 'is-active' : ''} type="button" aria-pressed={activeMenu === 'traditional'} onClick={() => { setActiveMenu('traditional'); setActiveCategory('All scoops') }}>Traditional Ice Cream</button>
                <button className={activeMenu === 'kulfi' ? 'is-active' : ''} type="button" aria-pressed={activeMenu === 'kulfi'} onClick={() => { setActiveMenu('kulfi'); setActiveCategory('All scoops') }}>Kulfies</button>
              </div>
            </div>
          </div>
          <label className="sort-control">Sort by
            <select value={priceSort} onChange={(event) => setPriceSort(event.target.value)} aria-label="Sort products by price">
              <option value="featured">Our favourites</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </label>
        </div>

        <div className="product-tools">
          <div className="category-list" aria-label="Filter by flavor category">
            {categories.map((category) => (
              <button className={activeCategory === category ? 'category-chip is-selected' : 'category-chip'} type="button" key={category} onClick={() => setActiveCategory(category)}>{category}</button>
            ))}
          </div>
          <div className="product-search-tools">
            <label className="price-filter">Price
              <select value={priceRange} onChange={(event) => setPriceRange(event.target.value)} aria-label="Filter by price range">
                <option value="any">Any price</option>
                <option value="under-six">Under $6</option>
                <option value="six-to-six-fifty">$6 – $6.50</option>
                <option value="over-six-fifty">Over $6.50</option>
              </select>
            </label>
            <label className="product-search"><Icon name="search" size={17} /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a scoop..." aria-label="Search flavors" /></label>
          </div>
        </div>

        <div className={`product-grid ${activeMenu !== 'scoops' ? 'product-grid--traditional' : ''}`}>
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className={`product-image-wrap tone-${product.tone}`}>
                <img src={product.image} alt={`${product.name} gelato`} loading="lazy" />
                {product.badge && <span className="product-badge">{product.badge}</span>}
                <button className="quick-add" type="button" onClick={() => onAddToCart(product.id, 1)} aria-label={`Add ${product.name} to cart`}><Icon name="plus" size={19} /></button>
              </div>
              <div className="product-details">
                <div className="product-name-row"><h3>{product.name}</h3><strong>${product.price.toFixed(2)} <small>/ scoop</small></strong></div>
                <p className="product-note">{product.note}</p>
                <div className="product-card-footer"><span className={product.available ? '' : 'is-unavailable'}><i /> {product.available ? 'Available today' : 'Sold out'}</span><button type="button" disabled={!product.available} onClick={() => onAddToCart(product.id, 1)}>Add to bag <span>+</span></button></div>
              </div>
            </article>
          ))}
          {visibleProducts.length === 0 && <p className="empty-results">No scoops found. Try another flavour or search.</p>}
        </div>
      </section>

      <footer className="shop-footer"><span>GOOD THINGS TAKE A LITTLE TIME.</span><span>CHURNED WITH CARE IN THE WEST VILLAGE&nbsp; · &nbsp;NYC</span></footer>
    </div>
  )
}

export default IceCream