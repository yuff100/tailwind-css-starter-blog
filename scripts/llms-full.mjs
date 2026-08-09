import { writeFileSync } from 'fs'
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { sortPosts } from 'pliny/utils/contentlayer.js'
import siteMetadata from '../data/siteMetadata.js'

const outputFolder = process.env.EXPORT ? 'out' : 'public'

/**
 * Generate llms-full.txt — a single file containing the full text of all
 * published blog posts so AI search engines and LLM tools can ingest the
 * site's content in one request.
 *
 * Follows the llms.txt convention (https://llmstxt.org).
 */
function generateLlmsFull() {
  const publishPosts = allBlogs.filter((post) => post.draft !== true)
  const sortedPosts = sortPosts(publishPosts)

  const sections = sortedPosts.map((post) => {
    const url = `${siteMetadata.siteUrl}/${post._raw.flattenedPath}`
    const meta = [
      `URL: ${url}`,
      `Published: ${post.date}`,
      post.lastmod ? `Modified: ${post.lastmod}` : null,
      post.tags && post.tags.length > 0 ? `Tags: ${post.tags.join(', ')}` : null,
    ]
      .filter(Boolean)
      .join('\n')

    return `## ${post.title}

${post.summary ? `> ${post.summary}\n` : ''}${meta}

${post.body.raw}`
  })

  const content = `# ${siteMetadata.title} — 完整文章内容

> ${siteMetadata.description}

站点地址: ${siteMetadata.siteUrl}
作者: ${siteMetadata.author}

以下是本站所有已发布文章的完整内容，供 AI 搜索引擎和工具引用。

---

${sections.join('\n\n---\n\n')}
`

  writeFileSync(`./${outputFolder}/llms-full.txt`, content)
}

const llmsFull = () => {
  generateLlmsFull()
  console.log('llms-full.txt generated...')
}

export default llmsFull
