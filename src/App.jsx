import { useMemo, useState } from 'react'
import { CATEGORIES, INVENTORY_PRODUCTS, STATUS_STYLE } from './data/products'
import './App.css'

const SITE_URL = 'https://sgims.huozzz1123.top'
const CONTACT_HINT = '欢迎来电或邮件咨询采购与报价'

function formatPrice(n) {
  return n.toLocaleString('zh-CN')
}

export default function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('全部')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return INVENTORY_PRODUCTS.filter((item) => {
      const matchCat = category === '全部' || item.category === category
      const matchQ =
        !q ||
        item.id.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.model.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q)
      return matchCat && matchQ
    })
  }, [query, category])

  const overview = useMemo(() => {
    const inStock = INVENTORY_PRODUCTS.filter((p) => p.status === '现货').length
    const totalQty = INVENTORY_PRODUCTS.reduce((s, p) => s + p.qty, 0)
    return {
      total: INVENTORY_PRODUCTS.length,
      inStock,
      totalQty,
      categories: CATEGORIES.length - 1,
    }
  }, [])

  const featured = useMemo(
    () => INVENTORY_PRODUCTS.filter((p) => p.highlight).slice(0, 3),
    [],
  )

  return (
    <div className="showcase">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand">
            <span className="logo">SG</span>
            <div>
              <strong>SG-IMS 产品展厅</strong>
              <span className="slogan">库存现货 · 宣传展示</span>
            </div>
          </div>
          <div className="search-bar">
            <input
              type="search"
              aria-label="搜索产品"
              placeholder="搜索品名、型号、SKU、品类…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="button" className="search-btn">搜索</button>
          </div>
          <a className="header-cta" href="#contact">
            咨询采购
          </a>
        </div>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="hero-badge">Inventory Showcase</span>
            <h1>库存产品在线展厅</h1>
            <p>
              集中展示仓库现货与可售 SKU，客户可浏览型号、规格、库存与参考价，
              便于对外宣传与售前沟通。
            </p>
            <div className="hero-stats">
              <div>
                <strong>{overview.total}</strong>
                <span>在售 SKU</span>
              </div>
              <div>
                <strong>{overview.inStock}</strong>
                <span>现货品类</span>
              </div>
              <div>
                <strong>{overview.totalQty}</strong>
                <span>库存总量</span>
              </div>
              <div>
                <strong>{overview.categories}</strong>
                <span>产品大类</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <p className="visual-title">本周推荐</p>
            {featured.map((p) => (
              <button
                key={p.id}
                type="button"
                className="featured-item"
                onClick={() => setSelected(p)}
              >
                <span>{p.emoji}</span>
                <div>
                  <strong>{p.name}</strong>
                  <small>{p.highlight} · 库存 {p.qty}{p.unit}</small>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="catalog">
        <nav className="category-nav" aria-label="产品分类">
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
            {category === '全部' ? '全部库存产品' : category}
            <span className="count">共 {filtered.length} 款</span>
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📦</span>
            <p>未找到匹配产品</p>
            <button
              type="button"
              className="btn-outline"
              onClick={() => {
                setQuery('')
                setCategory('全部')
              }}
            >
              查看全部产品
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filtered.map((item) => (
              <article key={item.id} className="product-card">
                <div className={`card-thumb cat-${STATUS_STYLE[item.status]}`}>
                  <span className="thumb-emoji">{item.emoji}</span>
                  {item.highlight && (
                    <span className="highlight-tag">{item.highlight}</span>
                  )}
                  <span className={`stock-tag tag-${STATUS_STYLE[item.status]}`}>
                    {item.status}
                  </span>
                </div>
                <div className="card-body">
                  <p className="card-cat">{item.category}</p>
                  <h3 className="card-title">{item.name}</h3>
                  <p className="card-model">型号 {item.model}</p>
                  <p className="card-desc">{item.desc}</p>
                  <ul className="spec-tags">
                    {item.specs.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <div className="card-footer">
                    <div>
                      <span className="price">
                        <small>参考价 ¥</small>
                        {formatPrice(item.price)}
                      </span>
                      <span className="unit">/{item.unit}</span>
                    </div>
                    <p className="inventory-line">
                      <code>{item.id}</code>
                      <span>库位 {item.warehouse}</span>
                      <span className="qty">库存 {item.qty}</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-detail"
                    onClick={() => setSelected(item)}
                  >
                    查看详情
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <section className="contact" id="contact">
        <div className="contact-inner">
          <h2>采购咨询</h2>
          <p>{CONTACT_HINT}</p>
          <div className="contact-cards">
            <div>
              <span>📞</span>
              <strong>400-XXX-XXXX</strong>
              <small>工作日 9:00–18:00</small>
            </div>
            <div>
              <span>✉️</span>
              <strong>sales@sg-ims.example</strong>
              <small>24 小时内回复</small>
            </div>
            <div>
              <span>🌐</span>
              <a href={SITE_URL} target="_blank" rel="noreferrer">
                sgims.huozzz1123.top
              </a>
              <small>在线产品展厅</small>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <p>© SG-IMS 库存产品展厅 · 数据为演示库存，仅供宣传展示</p>
      </footer>

      {selected && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setSelected(null)}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              aria-label="关闭"
              onClick={() => setSelected(null)}
            >
              ×
            </button>
            <div className="modal-thumb">{selected.emoji}</div>
            <div className="modal-body">
              <span className={`stock-tag tag-${STATUS_STYLE[selected.status]}`}>
                {selected.status}
              </span>
              <h2 id="modal-title">{selected.name}</h2>
              <p className="modal-model">
                {selected.id} · 型号 {selected.model} · {selected.category}
              </p>
              <p className="modal-desc">{selected.desc}</p>
              <ul className="modal-specs">
                {selected.specs.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <div className="modal-meta">
                <div>
                  <em>参考价</em>
                  <strong>¥{formatPrice(selected.price)}</strong>
                  <span>/{selected.unit}</span>
                </div>
                <div>
                  <em>库存</em>
                  <strong>{selected.qty}</strong>
                  <span>{selected.unit}</span>
                </div>
                <div>
                  <em>库位</em>
                  <strong>{selected.warehouse}</strong>
                </div>
              </div>
              <a className="btn-inquiry" href="#contact" onClick={() => setSelected(null)}>
                咨询此款产品的报价与交期
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
