# DeepNoMind 官方网站

[![GitHub stars](https://img.shields.io/github/stars/yuff100/tailwind-nextjs-starter-blog?style=social)](https://github.com/yuff100/tailwind-nextjs-starter-blog/stargazers/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/yuff100/tailwind-nextjs-starter-blog)

基于 Next.js 和 Tailwind CSS 构建的现代化个人技术博客平台，专注于分享深度技术文章和项目实战经验。

## ✨ 特性

- 🚀 **Next.js 15** - 基于 React Server Components 的最新 App Router 架构
- 🎨 **Tailwind CSS 4.0** - 现代化的原子级 CSS 框架，支持深色/浅色主题切换
- 📝 **Contentlayer** - 类型安全的 Markdown/MDX 内容管理
- 🔍 **全文搜索** - 集成 Kbar 命令面板搜索
- 💬 **Waline 评论** - 支持匿名评论的云端评论系统
- 📱 **响应式设计** - 完美适配桌面端和移动端
- ⚡ **性能优化** - 静态站点生成，Lighthouse 满分
- 🌐 **SEO 友好** - 自动生成 sitemap、RSS feed
- 🏷️ **标签系统** - 文章分类和标签页面
- 👥 **多作者支持** - 灵活的作者管理
- 📊 **分析集成** - 支持 Google Analytics、Umami 等

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router)
- **样式**: Tailwind CSS 4.0
- **内容**: Contentlayer + MDX
- **语言**: TypeScript
- **部署**: Vercel/Netlify
- **评论**: Waline (LeanCloud/Vercel)
- **搜索**: Kbar
- **包管理**: Yarn 3.6.1

## 📁 项目结构

```
├── app/                    # Next.js App Router 页面
│   ├── blog/              # 博客相关页面
│   ├── projects/          # 项目展示页面
│   ├── tags/              # 标签页面
│   └── about/             # 关于页面
├── data/                  # 站点数据和内容
│   ├── blog/              # 博客文章 (MDX)
│   ├── authors/           # 作者信息
│   └── projectsData.ts    # 项目数据
├── layouts/               # 页面布局组件
├── components/            # 可复用组件
├── css/                   # 样式文件
└── public/                # 静态资源
```

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/yuff100/tailwind-nextjs-starter-blog.git
cd tailwind-nextjs-starter-blog
```

### 2. 安装依赖

```bash
yarn install
```

### 3. 配置站点信息

编辑 `data/siteMetadata.js` 文件，修改站点相关信息：

```javascript
const siteMetadata = {
  title: '你的博客标题',
  author: '你的名字',
  headerTitle: '你的博客标题',
  description: '你的博客描述',
  siteUrl: 'https://your-domain.com',
  // ... 其他配置
}
```

### 4. 配置作者信息

编辑 `data/authors/default.md` 文件，设置默认作者信息。

### 5. 添加项目数据

修改 `data/projectsData.ts` 文件，添加你的项目信息。

### 6. 启动开发服务器

```bash
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

## 📝 内容管理

### 添加博客文章

在 `data/blog/` 目录下创建新的 `.mdx` 文件：

```markdown
---
title: '文章标题'
date: '2024-01-01'
tags: ['标签1', '标签2']
summary: '文章摘要'
authors: ['default']
---

文章内容...
```

### 支持的前置字段

- `title` (必需) - 文章标题
- `date` (必需) - 发布日期
- `tags` (可选) - 标签数组
- `summary` (可选) - 文章摘要
- `authors` (可选) - 作者数组
- `draft` (可选) - 是否为草稿
- `images` (可选) - 文章图片数组

## 🎨 自定义配置

### 主题配置

在 `tailwind.config.js` 中自定义主题色彩：

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
      },
    },
  },
}
```

### 导航链接

修改 `data/headerNavLinks.ts` 自定义导航菜单。

### 评论系统

在 `siteMetadata.js` 中配置 Waline 评论系统：

```javascript
comments: {
  provider: 'waline',
  walineConfig: {
    serverURL: 'your-waline-server-url',
  }
}
```

如果使用环境变量方式（推荐），请在部署平台中配置：

```bash
NEXT_PUBLIC_WALINE_SERVER_URL=https://your-waline-domain
```

## 🚀 部署

### Vercel 部署 (推荐)

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 配置环境变量
4. 部署完成

### 其他部署方式

#### 静态导出

```bash
EXPORT=1 UNOPTIMIZED=1 yarn build
```

生成的 `out` 目录可以部署到任何静态托管服务。

#### Docker 部署

参考 [Docker 部署文档](faq/deploy-with-docker.md)

## 📊 性能指标

- **Lighthouse 分数**: 100+
- **首次加载 JS**: 85KB
- **构建时间**: < 30s
- **CDN 优化**: 全球加速

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- 基于 [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) 模板
- 设计灵感来自 [Tailwindlabs blog](https://github.com/tailwindlabs/blog.tailwindcss.com)
- 感谢所有贡献者和社区支持

## 📞 联系方式

- **邮箱**: yuff100@163.com
- **GitHub**: [@yuff100](https://github.com/yuff100)
- **网站**: [https://www.deepnomind.com](https://www.deepnomind.com)

---

⭐ 如果这个项目对你有帮助，请给个 Star！
