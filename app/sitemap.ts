import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  const routes = [
    { route: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { route: 'blog', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: 'projects', priority: 0.7, changeFrequency: 'monthly' as const },
    { route: 'tags', priority: 0.6, changeFrequency: 'weekly' as const },
    { route: 'about', priority: 0.5, changeFrequency: 'yearly' as const },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency,
    priority,
  }))

  const tagKeys = Object.keys(tagData as Record<string, number>)
  const tagRoutes = tagKeys.map((tag) => ({
    url: `${siteUrl}/tags/${tag}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  return [...routes, ...blogRoutes, ...tagRoutes]
}
