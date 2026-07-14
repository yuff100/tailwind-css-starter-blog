/**
 * JSON-LD structured data components for search engines and LLMs.
 *
 * Follows Schema.org vocabulary so crawlers and AI tools understand
 * what the site is, who runs it, and how to navigate it.
 */
import siteMetadata from '@/data/siteMetadata'

/**
 * Root-level schema graph shared by all pages.
 */
function getBaseGraph() {
  const baseUrl = siteMetadata.siteUrl
  return [
    {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      name: siteMetadata.title,
      description: siteMetadata.description,
      url: baseUrl,
      inLanguage: siteMetadata.language,
    },
    {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: siteMetadata.title,
      url: baseUrl,
      logo: {
        '@id': `${baseUrl}/static/favicons/logo-144x144.png`,
      },
      sameAs: [siteMetadata.github || ''].filter(Boolean),
    },
  ]
}

/* ------------------------------------------------------------------ */
/*  Landing page (WebSite + Organization)                             */
/* ------------------------------------------------------------------ */
export function LandingSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [...getBaseGraph()],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Projects page (WebSite + SoftwareApplication per project)         */
/* ------------------------------------------------------------------ */
interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

export function ProjectsSchema({ projects }: { projects: Project[] }) {
  const baseUrl = siteMetadata.siteUrl
  const projectItems = projects
    .filter((p) => p.href)
    .map((p, i) => ({
      '@type': 'SoftwareApplication',
      '@id': `${baseUrl}/projects#${encodeURIComponent(p.title)}#${i}`,
      name: p.title,
      description: p.description,
      url: p.href,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
    }))

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      ...getBaseGraph(),
      {
        '@type': 'CollectionPage',
        '@id': `${baseUrl}/projects/#website`,
        name: '项目',
        description: siteMetadata.description,
        url: `${baseUrl}/projects`,
        isPartOf: { '@id': `${baseUrl}/#website` },
        about: { '@id': `${baseUrl}/#organization` },
        ...(projectItems.length > 0 ? { mainEntity: projectItems } : {}),
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  About page (Person)                                               */
/* ------------------------------------------------------------------ */
interface AuthorData {
  name: string
  occupation?: string
  company?: string
  github?: string
  twitter?: string
  linkedin?: string
  email?: string
  avatar?: string
}

export function AboutSchema({ author }: { author: AuthorData }) {
  const baseUrl = siteMetadata.siteUrl
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      ...getBaseGraph(),
      {
        '@type': 'ProfilePage',
        '@id': `${baseUrl}/about/#profile`,
        name: author.name,
        description: siteMetadata.description,
        url: `${baseUrl}/about`,
        isPartOf: { '@id': `${baseUrl}/#website` },
        about: {
          '@type': 'Person',
          name: author.name,
          ...(author.occupation ? { jobTitle: author.occupation } : {}),
          ...(author.company
            ? { worksFor: { '@type': 'Organization', name: author.company } }
            : {}),
          ...(author.github ? { sameAs: [author.github] } : {}),
          ...(author.twitter
            ? { sameAs: [...(author.github ? [author.github] : []), author.twitter] }
            : {}),
          ...(author.linkedin
            ? {
                sameAs: [
                  ...(author.twitter ? [author.github, author.twitter] : [author.github || '']),
                  author.linkedin,
                ].filter(Boolean),
              }
            : {}),
          mainEntityOfPage: { '@id': `${baseUrl}/about` },
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
