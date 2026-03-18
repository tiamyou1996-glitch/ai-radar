# AI Radar

一个每天自动更新的 AI 开源项目雷达站点。

它会从 GitHub 抓取近期活跃的 AI 仓库，过滤掉资源集合和明显噪音项，生成中文摘要、标签和推荐理由，再用 Next.js 静态站点展示：

- 今日精选
- 历史归档
- 项目详情页

## 本地运行

```bash
npm install
npm run generate:data
npm run dev
```

打开 `http://127.0.0.1:3000`

## 常用命令

```bash
npm run generate:data
npm run lint
npm run build
```

## 项目结构

```text
app/                 页面路由
components/          站点 UI 组件
lib/                 数据读取、类型、格式化工具
scripts/             数据生成脚本
deploy/              服务器更新脚本与定时任务安装脚本
data/generated/      每日生成的数据与项目详情 JSON
.github/workflows/   GitHub Pages 自动更新与部署
```

## 当前两种部署方式

### 1. GitHub Pages

仓库已经内置 GitHub Actions 工作流：

- 每天定时抓取 GitHub 项目
- 生成最新数据到 `data/generated/`
- 自动提交更新后的数据
- 构建静态站点
- 发布到 GitHub Pages

工作流文件：

- [daily-update.yml](./.github/workflows/daily-update.yml)

### 2. 阿里云服务器

如果你希望网站跑在自己的服务器上，推荐流程是：

1. 在本地开发和提交代码
2. 服务器执行一次 `git pull`
3. 服务器运行更新脚本完成：
   - 拉最新代码
   - 生成数据
   - 构建静态站点
   - 覆盖 Nginx 的站点目录

相关脚本：

- [server-update.sh](./deploy/server-update.sh)
- [install-cron.sh](./deploy/install-cron.sh)

## 服务器自动更新

在服务器上执行一次：

```bash
cd /var/www/ai-radar
chmod +x deploy/server-update.sh deploy/install-cron.sh
./deploy/install-cron.sh
```

默认会安装一条定时任务：

- 每天早上 `09:05`
- 自动执行 `deploy/server-update.sh`
- 日志写入 `/var/log/ai-radar-update.log`

查看日志：

```bash
tail -n 50 /var/log/ai-radar-update.log
```

手动执行一次更新：

```bash
cd /var/www/ai-radar
./deploy/server-update.sh
```

## 上线步骤

### GitHub Pages

1. 新建一个 GitHub 仓库，把当前目录推上去。
2. 在 GitHub 仓库里开启 `Actions`。
3. 在 GitHub 仓库里开启 `Pages`。
4. Pages Source 选择 `GitHub Actions`。
5. 推送到默认分支后，工作流会自动部署。

### 自己的服务器

1. 在服务器安装 `nodejs`、`nginx`、`git`
2. 把仓库克隆到 `/var/www/ai-radar`
3. 执行一次 `npm ci && npm run generate:data && npm run build`
4. 把 `out/` 复制到 `/var/www/html`
5. 安装并验证定时更新脚本

## 当前技术栈

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- GitHub Actions
- GitHub Pages
- Nginx

## 备注

当前版本已经是一个闭环 MVP：

- 本地可以直接访问
- 数据可以自动生成
- 页面已经接入真实数据
- GitHub Pages 可以自动部署
- 阿里云服务器也可以独立托管并自动更新

后续最值得继续做的是：

- 提高筛选质量
- 引入 README 深度分析
- 增加更稳定的评分模型
- 增加按标签和时间维度的筛选
