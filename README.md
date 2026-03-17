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
data/generated/      每日生成的数据与项目详情 JSON
.github/workflows/   自动更新与部署
```

## 自动更新

仓库已经内置 GitHub Actions 工作流：

- 每天定时抓取 GitHub 项目
- 生成最新数据到 `data/generated/`
- 自动提交更新后的数据
- 构建静态站点
- 发布到 GitHub Pages

工作流文件：

- [daily-update.yml](./.github/workflows/daily-update.yml)

## 上线步骤

1. 新建一个 GitHub 仓库，把当前目录推上去。
2. 在 GitHub 仓库里开启 `Actions`。
3. 在 GitHub 仓库里开启 `Pages`。
4. Pages Source 选择 `GitHub Actions`。
5. 推送到默认分支后，工作流会自动部署。

如果你的仓库不是用户主页仓库，比如不是 `xxx.github.io`，当前配置也会自动处理子路径部署。

## 当前技术栈

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- GitHub Actions
- GitHub Pages

## 备注

当前版本已经是一个闭环 MVP：

- 本地可以直接访问
- 数据可以自动生成
- 页面已经接入真实数据
- 自动更新和自动部署流程已经准备好

后续最值得继续做的是：

- 提高筛选质量
- 引入 README 深度分析
- 增加更稳定的评分模型
- 增加按标签和时间维度的筛选
