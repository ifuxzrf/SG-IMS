# SG-IMS

新加坡库存管理系统（SG-IMS）测试前端，用于验证 **GitHub → Vercel** 自动部署。

## 本地开发

```bash
npm install
npm run dev
```

浏览器打开终端提示的本地地址（默认 `http://localhost:5173`）。

## 构建

```bash
npm run build
npm run preview
```

## Vercel 自动部署（首次需关联）

1. 登录 [Vercel](https://vercel.com)，点击 **Add New → Project**。
2. 选择 GitHub 仓库 `ifuxzrf/SG-IMS`，授权访问。
3. 框架会自动识别为 **Vite**；保持默认即可：
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. 点击 **Deploy**。之后每次推送到 `main` 分支都会自动触发新部署。

仓库内已包含 `vercel.json`，与 Vercel 默认 Vite 配置一致。

## 测试界面说明

- Mock 库存列表与搜索
- 统计卡片与「模拟 API 心跳」按钮
- 用于确认线上版本是否已更新
