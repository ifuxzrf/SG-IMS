import { useMemo, useState } from 'react'
import './App.css'

const MOCK_INVENTORY = [
  { id: 'SKU-001', name: '光纤收发模块', warehouse: 'A-01', qty: 128, status: '正常' },
  { id: 'SKU-014', name: '工业交换机', warehouse: 'B-03', qty: 42, status: '正常' },
  { id: 'SKU-027', name: 'PDU 电源条', warehouse: 'A-02', qty: 9, status: '低库存' },
  { id: 'SKU-033', name: '机柜理线架', warehouse: 'C-01', qty: 0, status: '缺货' },
  { id: 'SKU-041', name: '温湿度传感器', warehouse: 'B-01', qty: 76, status: '正常' },
]

const STATUS_CLASS = {
  正常: 'ok',
  低库存: 'warn',
  缺货: 'danger',
}

function formatTime(date) {
  return date.toLocaleString('zh-CN', { hour12: false })
}

export default function App() {
  const [query, setQuery] = useState('')
  const [pingCount, setPingCount] = useState(0)
  const [lastPing, setLastPing] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return MOCK_INVENTORY
    return MOCK_INVENTORY.filter(
      (item) =>
        item.id.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.warehouse.toLowerCase().includes(q),
    )
  }, [query])

  const stats = useMemo(() => {
    const totalQty = MOCK_INVENTORY.reduce((sum, item) => sum + item.qty, 0)
    const lowStock = MOCK_INVENTORY.filter((item) => item.status !== '正常').length
    return { skus: MOCK_INVENTORY.length, totalQty, lowStock }
  }, [])

  function handlePing() {
    setPingCount((n) => n + 1)
    setLastPing(formatTime(new Date()))
  }

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">SG-IMS · 测试环境</p>
          <h1>库存管理测试界面</h1>
          <p className="subtitle">
            用于验证 GitHub → Vercel 自动部署链路。推送 <code>main</code> 分支后应触发新版本构建。
          </p>
        </div>
        <div className="hero-card">
          <span className="badge live">LIVE</span>
          <p className="deploy-label">部署探测</p>
          <button type="button" className="btn primary" onClick={handlePing}>
            模拟 API 心跳
          </button>
          <p className="meta">
            心跳次数：<strong>{pingCount}</strong>
            {lastPing && <> · 最近：{lastPing}</>}
          </p>
        </div>
      </header>

      <section className="stats">
        <article>
          <p>SKU 数量</p>
          <strong>{stats.skus}</strong>
        </article>
        <article>
          <p>库存总量</p>
          <strong>{stats.totalQty}</strong>
        </article>
        <article>
          <p>预警 SKU</p>
          <strong className="warn-num">{stats.lowStock}</strong>
        </article>
        <article>
          <p>构建版本</p>
          <strong>v0.1.0-test</strong>
        </article>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>库存列表（Mock）</h2>
          <input
            type="search"
            placeholder="搜索 SKU / 名称 / 库位…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>SKU</th>
                <th>物料名称</th>
                <th>库位</th>
                <th>数量</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td><code>{item.id}</code></td>
                  <td>{item.name}</td>
                  <td>{item.warehouse}</td>
                  <td>{item.qty}</td>
                  <td>
                    <span className={`pill ${STATUS_CLASS[item.status]}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="empty">无匹配结果</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="footer">
        <span>SG-IMS Test UI</span>
        <span>·</span>
        <span>Vercel 自动部署验证页</span>
      </footer>
    </div>
  )
}
