'use client'

import { Comments as CommentsComponent } from 'pliny/comments'
import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'

export default function Comments({ slug }: { slug: string }) {
  const [loadComments, setLoadComments] = useState(true)

  if (!siteMetadata.comments?.provider) {
    return null
  }
  return (
    <div
      style={{
        // 覆盖 oklch 颜色，使用传统 RGB 格式以兼容 Disqus
        // @ts-ignore
        '--color-gray-700': 'rgb(55, 65, 81)',
        '--color-gray-800': 'rgb(31, 41, 55)',
        '--color-gray-900': 'rgb(17, 24, 39)',
      }}
    >
      {loadComments ? (
        <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
      ) : (
        <button onClick={() => setLoadComments(true)}>Load Comments</button>
      )}
    </div>
  )
}
