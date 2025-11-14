import type { BlogIndex, BlogPostMeta } from '@/types/blog'

/**
 * Load blog index data
 */
export async function loadBlogIndex(): Promise<BlogIndex> {
  const response = await fetch('/blog.json')
  if (!response.ok) {
    throw new Error('Failed to load blog index')
  }
  return response.json()
}

/**
 * Work in progress (Producdevity)
 * Get all blog posts
 */
export function getAllPosts(blogIndex: BlogIndex): BlogPostMeta[] {
  return blogIndex.posts
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(blogIndex: BlogIndex, slug: string): BlogPostMeta | undefined {
  return blogIndex.posts.find((post) => post.slug === slug)
}

/**
 * Work in progress (Producdevity)
 * Get posts by tag
 */
export function getPostsByTag(blogIndex: BlogIndex, tag: string): BlogPostMeta[] {
  return blogIndex.posts.filter((post) => post.tags.includes(tag))
}

/**
 * Work in progress (Producdevity)
 * Get posts by author
 */
export function getPostsByAuthor(blogIndex: BlogIndex, author: string): BlogPostMeta[] {
  return blogIndex.posts.filter((post) => post.author === author)
}

/**
 * Work in progress (Producdevity)
 * Search posts by title or description
 */
export function searchPosts(blogIndex: BlogIndex, query: string): BlogPostMeta[] {
  const lowerQuery = query.toLowerCase()
  return blogIndex.posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.description.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  )
}

/**
 * Get related posts (by shared tags)
 */
export function getRelatedPosts(
  blogIndex: BlogIndex,
  post: BlogPostMeta,
  limit = 3,
): BlogPostMeta[] {
  return blogIndex.posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      sharedTags: p.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .filter(({ sharedTags }) => sharedTags > 0)
    .sort((a, b) => b.sharedTags - a.sharedTags)
    .slice(0, limit)
    .map(({ post }) => post)
}
