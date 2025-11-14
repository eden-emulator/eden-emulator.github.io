/**
 * Blog post frontmatter metadata
 */
export interface BlogFrontmatter {
  title: string
  slug: string
  description: string
  author: string
  date: string // ISO 8601 date string
  tags: string[]
  image?: string
  draft: boolean
}

/**
 * Table of contents entry
 */
export interface TocEntry {
  id: string
  text: string
  level: number
}

/**
 * Blog post metadata (for listing)
 */
export interface BlogPostMeta extends BlogFrontmatter {
  readingTime: string
  excerpt: string
  url: string
  noscriptUrl: string
}

/**
 * Full blog post data
 */
export interface BlogPost extends BlogPostMeta {
  htmlContent: string
  toc: TocEntry[]
}

/**
 * Blog index data (generated at build time)
 */
export interface BlogIndex {
  posts: BlogPostMeta[]
  tags: string[]
  authors: string[]
  generatedAt: string
}
