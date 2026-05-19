# SG-IMS

库存产品在线展厅（Vite + React），部署于 Vercel。

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
npm run preview
```

## 自动部署

### 方式 A：Vercel 关联 GitHub（推荐）

1. [Vercel Dashboard](https://vercel.com/dashboard) → 进入 **SG-IMS** 项目  
2. **Settings → Git**  
3. 若显示 *No Git Repository* 或仓库不对：点 **Connect Git Repository** → 选 `ifuxzrf/SG-IMS`  
4. **Settings → Git → Production Branch** 设为 `main`  
5. 确认未开启 **Ignored Build Step** 导致始终跳过构建  

关联成功后，每次 `git push origin main` 会在 Deployments 里出现新记录。

### 方式 B：GitHub Actions（Vercel 未关联时）

仓库已包含 `.github/workflows/vercel-deploy.yml`。在 GitHub：

**Settings → Secrets and variables → Actions** 添加：

| Secret | 获取位置 |
|--------|----------|
| `VERCEL_TOKEN` | [Vercel Account Tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | 项目 Settings → General |
| `VERCEL_PROJECT_ID` | 项目 Settings → General |

保存后重新 push 或到 Actions 页手动 **Run workflow**。

## 部署未更新？快速排查

| 现象 | 可能原因 |
|------|----------|
| push 后 Vercel 无新 Deployment | 项目未连接 GitHub，或连错仓库 |
| 域名能打开但是旧页面 | 域名绑在**旧项目**上，新代码在另一项目 |
| 只改了 DNS，从未连 Git | 仅手动部署过一次，需按方式 A 重新关联 |

线上应为 **库存产品展厅**；若仍看到「SKU 数量 / v0.1.0-test」表格页，说明生产环境未部署最新 `main`。

## 产品数据

编辑 `src/data/products.js` 更新展示库存。
