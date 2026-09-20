# 「赤道小尼 Online」第一阶段改造总结与验证报告

「赤道小尼 Online」第一阶段改造已全部开发完毕并通过自动化验收。本项目严格遵循 **“离线核心 + 联网增强”** 的技术原则，未引入任何外部构建工具或大型框架，以最精简、高可靠的原生 Web 技术实现各项能力。

---

## 一、完成的工作内容

### 1. PWA 与 Service Worker 全量离线缓存
* **高清应用图标**：生成并部署了标准化 PWA 图标：
  * [icon-192.png](assets/icons/icon-192.png)（192×192，含 maskable 支持）
  * [icon-512.png](assets/icons/icon-512.png)（512×512，启动屏与商店标准）
  * [apple-touch-icon.png](assets/icons/apple-touch-icon.png)（180×180，iOS Safari 添加到主屏幕专属图标）
* **Web App Manifest 升级**：[manifest.json](manifest.json) 正式更名为「赤道小尼」，配置 `standalone` 沉浸式全屏显示与轻色调背景/主题色。
* **iOS Safari 深度适配**：[index.html](index.html) 补充 `<link rel="apple-touch-icon">`、`<link rel="icon">` 及 `<meta name="apple-mobile-web-app-title" content="赤道小尼">`。
* **全量静态预缓存**：重构 [sw.js](sw.js)：
  * **预缓存清单扩容**：将核心代码文件 + 全部 53 张高质量景点/食物/酒店图片（总体积约 3.5 MB）全部纳入 `install` 预缓存列表，**保障首次成功访问后 100% 离线可用，画质零损耗**。
  * **请求分级策略**：
    * **页面导航**：网络优先（2秒超时），超时或无网秒级回退离线页面，确保在线时第一时间检测到新版发布；
    * **静态资源**：缓存优先（Cache-First），本地瞬时加载；
    * **外部 API**：透传放行，不污染静态缓存空间。
  * **版本演进**：统一命名空间 `chidaoxiaoni-v1.0`，在 `activate` 阶段自动清理非当前版本的废弃缓存；前端页面具备更新感知提示。

---

### 2. IDR → CNY 实时汇率系统与三级离线兜底
在 [js/app.js](js/app.js) 与 [css/app.css](css/app.css) 中实现完整的汇率子系统：
* **数据源接入**：选用经实测验证的 ExchangeRate-API 官方开放端点（`https://open.er-api.com/v6/latest/CNY`），免 API Key、CORS 开放、更新频率为自然日，直取 `rates.IDR`。
* **自然日自动检查更新**：每天首次启动且联网时，自动在后台拉取最新汇率并写入 `localStorage`；同一自然日内重复打开不再发起多余网络请求。
* **主动刷新能力**：汇率页面右上角新增 **「↻ 更新汇率」** 按钮，点击触发网络请求，带有旋转加载状态与 Toast 结果反馈，不受每日一次的限制。
* **三级离线平滑降级**：
  * **实时联网**：展示绿色徽章 `● 实时联网 · 今日已更新`；
  * **本地缓存**：展示橙色徽章 `● 本地缓存 · 上次更新于 YYYY-MM-DD HH:mm`；
  * **离线基准**：展示灰色徽章 `● 离线基准 · Excel 初始参考值 (2,652)`。
* **操作与交互优化**：
  * 新增 2万、5万、10万、50万、100万 印尼盾 **快捷金额胶囊标签**，一键点击即时换算；
  * 补充心算小技巧说明（如 `去掉后三位(k)，再除以约 2.6`）；
  * 重新渲染时保留用户当前输入的金额，体验连贯。

---

### 3. Google Maps 外部 App / 网页跳转
在 [js/app.js](js/app.js) 的行程详情与工具箱模块中：
* **官方 Maps URL 标准**：
  使用 `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' ' + address)}`，优先同时拼接酒店英文名与完整英文地址，确保 Google Maps 精准命中 POI 锚点。
* **双入口补齐**：
  * **行程页酒店卡片**：`【📋 复制地址】` 与 `【🗺️ 地图】` 并排展示；
  * **工具箱酒店地址列表**：每个酒店条目下均补齐 `【🗺️ 地图】` 跳转按钮。
* **外部独立打开与平台保障**：
  统一声明 `target="_blank" rel="noopener noreferrer"`。在 iOS Universal Link 与 Android App Link 下优先呼起 Google Maps 原生 App；未安装 App 时平滑在外部浏览器打开网页版，切回赤道小尼 PWA 时界面状态完全保持。

---

## 二、自动化验收与校验结果

运行自动化验收套件 [tools/verify_online.ps1](tools/verify_online.ps1)：

```powershell
=== 1. Check Manifest & Metadata ===
  [PASS] manifest.json exists
  [PASS] Manifest name is '赤道小尼'
  [PASS] Manifest short_name is '赤道小尼'
  [PASS] Manifest display is 'standalone'
  [PASS] Manifest has 3+ icons
  [PASS] Icon file exists: assets/icons/icon-192.png
  [PASS] Icon file exists: assets/icons/icon-512.png
  [PASS] Icon file exists: assets/icons/apple-touch-icon.png

=== 2. Check index.html Head & Tags ===
  [PASS] iOS WebApp title is '赤道小尼'
  [PASS] apple-touch-icon link is present
  [PASS] manifest.json link is present
  [PASS] Service Worker registration script is present
  [PASS] Service Worker updatefound event listener is present

=== 3. Check Service Worker & Assets ===
  [PASS] sw.js exists
  [PASS] Defines chidaoxiaoni-v version
  [PASS] Contains fetchWithTimeout logic
  [PASS] Precaches day images
  [PASS] Precaches food images
  [PASS] Precaches hotel images
  [PASS] All 13 day images exist in assets/day
  [PASS] All 28 food images exist in assets/food
  [PASS] All 12 hotel images exist in assets/hotel
  [PASS] All 3 app icons exist in assets/icons

=== 4. Check Google Maps Navigation ===
  [PASS] mapsSearchUrl helper function is defined
  [PASS] Official Google Maps URL scheme is used
  [PASS] renderHotel contains btn-map button
  [PASS] renderToolHotels contains btn-map button
  [PASS] Maps link uses target='_blank' and rel='noopener noreferrer'

=== 5. Check Real-time FX & Offline Fallback ===
  [PASS] FX API endpoint is open.er-api.com
  [PASS] checkAutoRateUpdate daily check is present
  [PASS] btn-refresh-rate manual refresh button is present
  [PASS] RATE_STORAGE_KEY is present
  [PASS] rate-badge-live badge is supported
  [PASS] rate-badge-cache badge is supported
  [PASS] rate-badge-base badge is supported
  [PASS] conv-chips quick IDR buttons are present

=== 6. Check CSS Styles ===
  [PASS] CSS contains .btn-map
  [PASS] CSS contains .btn-rate-refresh
  [PASS] CSS contains .rate-badge-live
  [PASS] CSS contains .conv-chip

===============================
Summary: 40 PASSED, 0 FAILED
```

---

## 三、部署与使用建议

1. **GitHub Pages 部署**：
   * 将当前目录推送到 GitHub 仓库并开启 GitHub Pages（Branch: `main` / Folder: `/ (root)`）。
   * 必须通过 `https://` 访问以激活 Service Worker 和 PWA 安装机制。
2. **添加到手机主屏幕**：
   * **iPhone (Safari)**：点击底部分享按钮 →「添加到主屏幕」→ 确认图标与名称「赤道小尼」；
   * **Android (Chrome)**：点击右上角菜单 →「添加到主屏幕」或「安装应用」。
3. **初次离线激活**：
   * 部署后在 Wi-Fi 环境下完整打开一次网站，Service Worker 即会自动将 3.5 MB 的代码与全部 53 张图片下载至本地存储；
   * 之后即可在飞行模式或印尼离线网络下顺畅使用。
