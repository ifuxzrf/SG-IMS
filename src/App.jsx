import { useMemo, useState } from 'react'
import './App.css'

const CATEGORIES = ['全部', '网络设备', '机房配件', '环境监测']

const MOCK_PRODUCTS = [
  {
    id: 'SKU-001',
    name: '光纤收发模块 SFP+ 10G',
    category: '网络设备',
    warehouse: 'A-01',
    qty: 128,
    status: '正常',
    price: 289,
    originalPrice: 359,
    rating: 4.8,
    sales: 1206,
    emoji: '📡',
  },
  {
    id: 'SKU-014',
    name: '工业级千兆交换机 8口',
    category: '网络设备',
    warehouse: 'B-03',
    qty: 42,
    status: '正常',
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    sales: 532,
    emoji: '🔌',
  },
  {
    id: 'SKU-027',
    name: 'PDU 机柜电源分配单元',
    category: '机房配件',
    warehouse: 'A-02',
    qty: 9,
    status: '低库存',
    price: 468,
    originalPrice: 528,
    rating: 4.6,
    sales: 89,
    emoji: '⚡',
  },
  {
    id: 'SKU-033',
    name: '标准机柜理线架 1U',
    category: '机房配件',
    warehouse: 'C-01',
    qty: 0,
    status: '缺货',
    price: 89,
    originalPrice: 119,
    rating: 4.5,
    sales: 2103,
    emoji: '🗄️',
  },
  {
    id: 'SKU-041',
    name: '机房温湿度传感器',
    category: '环境监测',
    warehouse: 'B-01',
    qty: 76,
    status: '正常',
    price: 198,
    originalPrice: 238,
    rating: 4.7,
    sales: 876,
    emoji: '🌡️',
  },
]

const STATUS_LABEL = {
  正常: { className: 'tag-ok', text: '现货' },
  低库存: { className: 'tag-warn', text: '仅剩少量' },
  缺货: { className: 'tag-sold', text: '暂时缺货' },
}

const APP_VERSION = 'v0.2.0'
const SITE_URL = 'https://sgims.huozzz1123.top'

function formatPrice(n) {
  return n.toLocaleString('zh-CN')
}

export default function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('全部')
  const [cartCount, setCartCount] = useState(0)
  const [toast, setToast] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return MOCK_PRODUCTS.filter((item) => {
      const matchCat = category === '全部' || item.category === category
      const matchQ =
        !q ||
        item.id.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      return matchCat && matchQ
    })
  }, [query, category])

  function showToast(msg) {
    setToast(msg)
    window.setTimeout(() => setToast(''), 2200)
  }

  function addToCart(item) {
    if (item.status === '缺货') {
      showToast('该商品暂时缺货')
      return
    }
    setCartCount((n) => n + 1)
    showToast(`已加入购物车：${item.name}`)
  }

  return (
    <div className="mall">
      {toast && <div className="toast">{toast}</div>}

      <header className="mall-header">
        <div className="header-inner">
          <div className="brand">
            <span className="logo">SG</span>
            <div>
              <strong>SG-IMS 商城</strong>
              <span className="slogan">工业品供应链</span>
            </div>
          </div>

          <div className="search-bar">
            <input
              type="search"
              aria-label="搜索商品"
              placeholder="搜索商品、SKU、品类…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="button" className="search-btn">
              搜索
            </button>
          </div>

          <div className="header-actions">
            <button type="button" className="cart-btn" aria-label="购物车">
              🛒
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      <section className="promo-banner">
        <div className="promo-inner">
          <div className="promo-text">
            <span className="promo-tag">限时特惠</span>
            <h1>机房好物节</h1>
            <p>网络设备 · 机房配件 · 环境监测 一站采购</p>
            <span className="promo-meta">{APP_VERSION} · 库存实时同步</span>
          </div>
          <div className="promo-deals">
            <div className="deal-card">
              <em>满减</em>
              <span>满 999 减 80</span>
            </div>
            <div className="deal-card">
              <em>包邮</em>
              <span>指定 SKU 包邮</span>
            </div>
            <div className="deal-card highlight">
              <em>热销</em>
              <span>{MOCK_PRODUCTS.length} 款在售</span>
            </div>
          </div>
        </div>
      </section>

      <main className="mall-main">
        <nav className="category-nav" aria-label="商品分类">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`cat-chip ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </nav>

        <div className="toolbar">
          <h2>
            {category === '全部' ? '全部商品' : category}
            <span className="count">（{filtered.length} 件）</span>
          </h2>
          <select
            className="sort-select"
            defaultValue="default"
            aria-label="排序方式"
          >
            <option value="default">综合排序</option>
            <option value="sales">销量优先</option>
            <option value="price-asc">价格从低到高</option>
            <option value="price-desc">价格从高到低</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📦</span>
            <p>没有找到相关商品</p>
            <button
              type="button"
              className="btn-outline"
              onClick={() => {
                setQuery('')
                setCategory('全部')
              }}
            >
              查看全部商品
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filtered.map((item) => {
              const tag = STATUS_LABEL[item.status]
              const soldOut = item.status === '缺货'
              return (
                <article key={item.id} className="product-card">
                  <div className="card-thumb">
                    <span className="thumb-emoji">{item.emoji}</span>
                    <span className={`stock-tag ${tag.className}`}>{tag.text}</span>
                    {item.status === '低库存' && (
                      <span className="flash-tag">抢购</span>
                    )}
                  </div>
                  <div className="card-body">
                    <p className="card-cat">{item.category}</p>
                    <h3 className="card-title">{item.name}</h3>
                    <p className="card-meta">
                      <span className="stars">★ {item.rating}</span>
                      <span>已售 {item.sales}</span>
                      <span>库位 {item.warehouse}</span>
                    </p>
                    <div className="price-row">
                      <span className="price">
                        <small>¥</small>
                        {formatPrice(item.price)}
                      </span>
                      <span className="price-old">¥{formatPrice(item.originalPrice)}</span>
                    </div>
                    <p className="sku-line">
                      <code>{item.id}</code>
                      <span>库存 {item.qty}</span>
                    </p>
                    <button
                      type="button"
                      className={`btn-cart ${soldOut ? 'disabled' : ''}`}
                      disabled={soldOut}
                      onClick={() => addToCart(item)}
                    >
                      {soldOut ? '补货中' : '加入购物车'}
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </main>

      <footer className="mall-footer">
        <div className="footer-links">
          <span>关于我们</span>
          <span>配送说明</span>
          <span>售后服务</span>
          <a href={SITE_URL} target="_blank" rel="noreferrer">
            {SITE_URL.replace('https://', '')}
          </a>
        </div>
        <p className="footer-copy">
          © SG-IMS 工业品商城 {APP_VERSION} · Mock 数据仅供演示 · Vercel 自动部署
        </p>
      </footer>
    </div>
  )
}
