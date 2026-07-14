# 三个技巧提升 Web 应用的 AI 可见性

\>*在 AI 驱动搜索的时代，仅靠传统 SEO 已经不够了。本文介绍预渲染、JSON-LD 结构化数据和 `llms.txt` 三个关键技巧，帮助 Web 应用在搜索引擎 和 AI 工具中都能被更好的发现和推荐。*





![image](assets/pasted-image-1784024317808.png)

大多数 Web 应用在对待「可发现性」这件事上，还停留在 2015 年的思维。设好 `<title>`，写一段 meta description，每季度去 Google Search Console 看一眼，然后就觉得自己做得够好了。但在今天这个由 AI 主导的时代，越来越多的产品发现流量来自 AI 智能体和大语言模型（比如 ChatGPT 搜索、Perplexity、Claude），而这些工具寻找的信号，与 Googlebot 的关注点并不完全相同。

好消息是，这些改进并不难做。基本上只需要加上三项东西，一旦做到位，你的 Web 应用在传统搜索引擎和 AI 侧的表现都会好很多。

## 简介

2026 年每个 Web 应用都应该具备的三样东西：

1. **营销页面（如着陆页）的预渲染 HTML**，让爬虫无需执行 JavaScript 就能看到内容。
2. **JSON-LD 结构化数据**，让搜索引擎和 LLM 理解该 Web 应用到底是做什么的。
3. **一个** **`llms.txt`** **文件**，让 AI 工具拥有经过精心编排的网站地图。

## 为什么传统做法已经不够了

![image](assets/pasted-image-1784024612439.png)

如果你的应用是单页应用（大部分 React、Next.js、Vue 和 Svelte 应用默认都是），服务器返回的初始 HTML 大多是空的。真正的内容是在浏览器加载页面后，由 JavaScript 动态注入的。

Googlebot（谷歌的网站索引器）现在处理这个问题其实已经做得不错了，它会执行 JS，等待页面稳定下来，然后索引其中的内容。问题在于，其他大多数爬虫没有这么多耐心：

- Bingbot、DuckDuckBot 和其他经典爬虫要么跳过 JS，要么渲染不可靠。

- AI 侧的爬虫（OAI-SearchBot、PerplexityBot、ClaudeBot 等）与 Googlebot 相比，JS 渲染能力不一致且普遍有限，所以不应该假设客户端渲染的内容对所有爬虫都是可达的。

- LLM 在回答用户问题时，经常从缓存快照或 `curl` 请求中提取信息，而这些请求根本没有执行 JS。

所以，如果你的核心价值主张、定价和常见问题解答只存在于客户端挂载的 React 组件中，那么在很大程度上，你对那些想触达的流量来说就是不可见的。

以下是可以做的三件事，按影响程度排序：

1. 把最有价值的内容放到服务器返回的 HTML 中。
2. 使用结构化数据告诉爬虫你的应用/网站是什么类型。
3. 给 LLM 一个干净、精心编排的网站索引。

## 1. 预渲染你的营销页面

预渲染意味着在构建时生成页面的真实 HTML，然后在浏览器中让 React（或其他框架）进行水合（hydration）。访问者和爬虫都能在第一次请求时就获得完整页面，不需要执行 JS。此外，页面加载起来感觉快了很多。

*在开启预渲染前后，分别运行 Lighthouse 审计（Chrome DevTools → Lighthouse 标签页），看看页面在加载速度和渲染性能上的改善。*

只需要对公开的、内容密集的页面做这件事：着陆页、定价页、FAQ、博客索引页等等。不要把认证后的任何东西预渲染，因为那里没有值得预渲染的内容 —— 全是用户特定数据。

具体机制取决于技术栈，但每个主流框架都有成熟的路径：

- **Next.js**：通过 `generateStaticParams` 进行静态生成，或使用 `output: 'export'` 进行完整静态导出。

- **Astro**：它默认就是静态站点生成器，所以你已经在免费享受这个好处了。

- **Remix / React Router**：按需服务端渲染或预渲染路由。

- **Vite + React**：添加预渲染插件，比如 `vite-plugin-ssr` 或 `vike`。

- **Wasp**：给路由加上 `prerender: true`，它会自动为你写出静态 HTML。

具体用什么工具其实没那么重要，重要的是结果：着陆页在首个字节就返回真实内容，而客户端框架仍然会进行水合并接管交互 —— 这样链接、弹窗和任何交互部分都能继续正常工作。

## 2. 添加 JSON-LD 结构化数据

Meta 标签告诉爬虫关于页面的*信息*。结构化数据告诉它们页面*是什么*。这之间的区别好比："这个页面的标题里有'定价'这个词"和"这是一个 SoftwareApplication，附带以下报价信息"。

![image](assets/pasted-image-1784025164345.png)

大多数开发者都知道前者，即 HTML `<head>` 中的 meta 标签，也就是 `<title>`、`<meta name="description">`，以及决定分享时链接样式的 Open Graph 和 Twitter Card 标签。这些值得认真写好。

但大多数人都会忽略后者，它远没有 meta 标签那么常见，但却同样重要 —— 尤其是 LLM 现在依赖它来判断和推荐你的产品到底是什么。

详细词汇表可以参考 [Schema.org](https://schema.org) ，JSON-LD 是 Google（以及大多数 LLM）偏好的格式。只需要在 HTML 中放入一个 `<script type="application/ld+json">`，就行了，没有渲染影响，没有布局偏移，不需要任何样式。

对于一个着陆页来说，值得包含的类型有：

- `SoftwareApplication`：名称、描述、URL、类别、图片、定价、许可证。如果你的应用完全在浏览器中运行，可以使用更具体的 `WebApplication` 子类型。

- `WebSite`：站点级别的身份信息和社交媒体链接。

- `Organization`：应用背后的组织或个人。

- `FAQPage`：把你的 FAQ 板块变成 Google 的富媒体摘要，同时给 LLM 提供干净的问答对，方便它们在有人询问你的产品时引用。

LLM 非常喜欢这种明确的东西。与其从营销文案中推断你的产品是什么，LLM 可以直接读取一条结构化记录，明确告诉你它是什么、花多少钱、谁做的。这基本上就是一个机器可读的"电梯演讲"。

下面是一个可以直接放入任何 React 应用的完整示例，没有任何框架特定的东西 —— 同一个 JSON 对象作为普通的 `<script>` 标签放在任何 HTML 页面中都能工作：

```tsx
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://your-saas-app.com/#software",
      name: "你的 SaaS 应用",
      description: "你应用的主要描述和功能。",
      url: "https://your-saas-app.com",
      applicationCategory: "BusinessApplication",
      operatingSystem: "跨平台",
      image: "https://your-saas-app.com/public-banner.webp",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },    },
    {
      "@type": "WebSite",
      "@id": "https://your-saas-app.com/#website",
      url: "https://your-saas-app.com",
      name: "你的 SaaS 应用",
      description: "你应用的主要描述和功能。",
    },
  ],
};

export function SchemaMarkup() {
  return <script type='application/ld+json'>{JSON.stringify(schema)}</script>;
}
```



在着陆页中导入一次，就再也不用管了。因为着陆页是预渲染的（见第一步），这个脚本最终会被内联到静态 HTML 中 —— 这正是爬虫和 LLM 希望看到它的位置。

如果着陆页有一个 FAQ 板块，再加上一个 `FAQPage` 条目。这是对 Google 富媒体摘要和 AI 回答都最具杠杆效应的添加之一，因为问答本来就是 LLM 想要引用的形式。

完成之后，在部署前使用 [Google 的富媒体摘要测试工具](https://search.google.com/test/rich-results) 和 [Schema.org 验证器](https://validator.schema.org/) 进行验证。

## 3. 发布 llms.txt 文件

[`llms.txt`](https://llmstxt.org/) 是一个比较新的约定，是位于网站根目录的一个 Markdown 文件，为 LLM 提供经过精心编排的页面和资源索引 —— 也就是你真正希望它们了解的那些内容。

它故意不设计成网站地图（sitemap）。网站地图是详尽无遗，面向爬虫的。`llms.txt` 简短、手工挑选，面向的是试图回答关于你问题的语言模型。把它想象成为网站写的 README，只不过读者是 AI。

最低限度的有用版本如下：

```
# 你的 Web 应用
> 一句话描述你的 Web 是做什么的，以及面向谁。
一段更长的文字提供背景：你的应用解决的问题、服务的用户类型，以及交付的核心价值。
## 核心页面- 首页: 包含功能、定价和 FAQ 的着陆页- 定价: 订阅计划和价格
## 文档
- 文档: 产品文档和指南
## 资源
- 博客: 更新、教程和公告- GitHub: 开源代码
```

把它放在 `public/llms.txt`，它就会在 `https://your-saas-app.com/llms.txt` 提供服务。

如果你有文档站或博客，值得在构建时生成这个文件以保持最新。用一个小的 Node 脚本读取博客的 frontmatter，在每次部署前写出更新后的 `llms.txt` 即可。大约 90 行代码，零依赖，很容易移植到任何项目中。也有一些插件和 npm 包可以自动完成这件事，但我发现手动控制里面放什么更好，从而保持文件简短且有意图。把它想象成索引或地图，让 LLM 和智能体知道去哪里找到最相关的内容。

## 三者如何协同

简单回顾一下为什么这三个技巧放在一起如此有效：

- **预渲染**让内容对所有爬虫和 AI 机器人可见，并改善网站性能（比如加载速度）。

- **JSON-LD**让内容对搜索引擎和 AI 可理解。

- \*\*`llms.txt`\*\*让网站对 AI 工具易于导航。

需要注意的是，如果没有预渲染，结构化数据只会躺在 JS bundle 里 —— 经典爬虫和 AI 爬虫可能永远看不到它。所以我的建议是：先把着陆页的预渲染做好，然后再逐步加上另外两项。

## 总结

如果只选其中一项来做，那就选预渲染，它解决了所有其他事情所依赖的基础问题（内容不在 HTML 中）。一旦这个到位了，JSON-LD 和 `llms.txt` 都是小而独立的补充，却能带来超出比例的回报。
