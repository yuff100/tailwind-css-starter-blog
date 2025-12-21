'use client'

import { init } from '@waline/client'
import '@waline/client/style'
import { useEffect, useRef } from 'react'

interface WalineProps {
  serverURL: string
  path?: string
  lang?: string
  reaction?: boolean
  login?: 'enable' | 'disable' | 'force'
}

export default function WalineComponent({
  serverURL,
  path,
  lang = 'zh-CN',
  reaction = true,
  login = 'enable',
}: WalineProps) {
  const walineInstanceRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || walineInstanceRef.current || !serverURL) return

    const timer = setTimeout(() => {
      walineInstanceRef.current = init({
        el: containerRef.current!,
        serverURL,
        path: path || (typeof window !== 'undefined' ? window.location.pathname : undefined),
        lang,
        reaction,
        login,
        recaptchaV3Key: '',
        turnstileKey: '',
        search: false,
        pageSize: 10,
        wordLimit: [0, 1000],
        requiredMeta: [],
        emoji: ['//unpkg.com/@waline/emojis@1.2.0/weibo'],
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      if (walineInstanceRef.current) {
        walineInstanceRef.current = null
      }
    }
  }, [serverURL, path, lang, reaction, login])

  if (!serverURL) {
    return <div style={{ padding: '20px', color: 'red' }}>Waline serverURL not configured</div>
  }

  return <div ref={containerRef} />
}
