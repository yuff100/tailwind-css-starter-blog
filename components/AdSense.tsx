'use client'

import { useEffect, useRef } from 'react'
import siteMetadata from '@/data/siteMetadata'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

interface AdSenseProps {
  slot?: string
  className?: string
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical'
  layout?: 'in-article'
  minHeight?: number
}

function normalizePublisherId(value?: string) {
  if (!value) return ''
  return value.startsWith('ca-pub-') ? value : `ca-pub-${value}`
}

export default function AdSense({
  slot,
  className,
  format = 'auto',
  layout,
  minHeight = 90,
}: AdSenseProps) {
  const pushedRef = useRef(false)
  const adsenseConfig = siteMetadata?.ads?.adsense
  const publisherId = normalizePublisherId(adsenseConfig?.publisherId)
  const enabled = Boolean(adsenseConfig?.enabled && publisherId && slot)
  const showDebugPlaceholder =
    process.env.NODE_ENV !== 'production' &&
    process.env.NEXT_PUBLIC_ADSENSE_DEBUG_PLACEHOLDER === 'true'

  useEffect(() => {
    if (!enabled || pushedRef.current) {
      return
    }

    if (typeof window === 'undefined') {
      return
    }

    const maxAttempts = 12
    let attempts = 0

    const tryPush = () => {
      if (pushedRef.current) {
        return true
      }

      if (!window.adsbygoogle) {
        return false
      }

      try {
        window.adsbygoogle.push({})
        pushedRef.current = true
        return true
      } catch {
        // Keep rendering non-blocking when AdSense is unreachable or blocked.
        return false
      }
    }

    if (tryPush()) {
      return
    }

    const timer = window.setInterval(() => {
      attempts += 1
      const loaded = tryPush()
      if (loaded || attempts >= maxAttempts) {
        window.clearInterval(timer)
      }
    }, 500)

    return () => {
      window.clearInterval(timer)
    }
  }, [enabled, slot])

  if (!enabled) {
    if (!showDebugPlaceholder) {
      return null
    }

    const reason = !adsenseConfig?.enabled
      ? 'NEXT_PUBLIC_ADSENSE_ENABLED is false'
      : !publisherId
        ? 'NEXT_PUBLIC_ADSENSE_PUBLISHER_ID is missing'
        : 'Ad slot is missing'

    return (
      <div className={className} aria-label="advertisement-debug">
        <div
          className="w-full rounded border border-dashed border-gray-400 px-3 py-2 text-xs text-gray-500 dark:border-gray-600 dark:text-gray-400"
          style={{ minHeight: `${minHeight}px` }}
        >
          <div className="font-medium">AdSense debug placeholder</div>
          <div>{reason}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={className} aria-label="advertisement">
      <ins
        className="adsbygoogle block w-full overflow-hidden"
        style={{ display: 'block', minHeight: `${minHeight}px`, textAlign: 'center' }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-layout={layout}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
