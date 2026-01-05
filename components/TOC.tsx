'use client'

import { useEffect, useState } from 'react'

interface TocItem {
  value: string
  url: string
  depth: number
}

interface TOCProps {
  toc: TocItem[]
}

export default function TOC({ toc }: TOCProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (!toc || toc.length === 0) return

    // 监听滚动以高亮当前章节
    const headingIds = toc.map((item) => item.url.slice(1)) // 移除 # 前缀
    const headingElements = headingIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (headingElements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -80% 0px',
      }
    )

    headingElements.forEach((heading) => {
      observer.observe(heading)
    })

    return () => {
      headingElements.forEach((heading) => {
        observer.unobserve(heading)
      })
    }
  }, [toc])

  if (!toc || toc.length === 0) {
    return null
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault()
    const id = url.slice(1) // 移除 # 前缀
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // header高度
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <nav className="toc">
      <h3 className="mb-3 text-sm font-bold tracking-wide text-gray-900 uppercase dark:text-gray-100">
        目录
      </h3>
      <ul className="space-y-2 text-sm">
        {toc.map((item) => (
          <li
            key={item.url}
            style={{
              paddingLeft: `${(item.depth - 2) * 1}rem`,
            }}
          >
            <a
              href={item.url}
              onClick={(e) => handleClick(e, item.url)}
              className={`hover:text-primary-500 dark:hover:text-primary-400 block py-1 transition-colors ${
                activeId === item.url.slice(1)
                  ? 'dark:text-primary-400 font-medium text-primary-600'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {item.value}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
