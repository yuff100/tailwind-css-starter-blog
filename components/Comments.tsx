'use client'

import { Comments as CommentsComponent } from 'pliny/comments'
import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import dynamic from 'next/dynamic'

const Waline = dynamic(() => import('./WalineComponent'), { ssr: false })

export default function Comments({ slug }: { slug: string }) {
  const [loadComments, setLoadComments] = useState(true)

  if (!siteMetadata.comments?.provider) {
    return null
  }
  
  const provider = siteMetadata.comments?.provider as string
  
  return (
    <div>
      {loadComments && provider === 'waline' ? (
        <Waline serverURL={siteMetadata.comments.walineConfig?.serverURL} />
      ) : (
        loadComments && (
          <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
        )
      )}
    </div>
  )
}
