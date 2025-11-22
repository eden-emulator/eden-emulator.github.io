import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import PageWrapper from '@/components/PageWrapper'
import HeadingText from '@/components/HeadingText'
import type { BlogIndex } from '@/types/blog'
import { cn } from '@/utils/style'
import { BlogPostCard } from '@/pages/Blog/BlogPostCard'

interface BlogListProps {
  blogIndex: BlogIndex
}

export default function BlogList({ blogIndex }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredPosts = useMemo(() => {
    let posts = blogIndex.posts

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Filter by selected tag
    return selectedTag ? posts.filter((post) => post.tags.includes(selectedTag)) : posts
  }, [blogIndex.posts, searchQuery, selectedTag])

  return (
    <PageWrapper>
      <div className="h-24 md:h-34" />
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-pink-500/8 rounded-full blur-xl animate-subtle-pulse will-change-transform" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-500/8 rounded-full blur-xl animate-subtle-pulse-delay-2 will-change-transform" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeadingText
          title="Blog"
          description="News, updates, and announcements from the Eden Emulator team"
        />

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400" size={20} />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-black/40 backdrop-blur-xs border border-pink-500/30 rounded-lg text-white placeholder-cyan-400/50 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all font-orbitron"
            />
          </div>

          {/* Tags Filter */}
          {blogIndex.tags.length > 0 && (
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setSelectedTag(null)}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-bold font-orbitron uppercase tracking-wider transition-all',
                  selectedTag === null
                    ? 'bg-pink-500/20 text-pink-300 border-2 border-pink-500/50 shadow-lg shadow-pink-500/20'
                    : 'bg-black/30 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-400/10 hover:border-cyan-400/50',
                )}
              >
                All Posts
              </button>
              {blogIndex.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={cn(
                    'px-5 py-2 rounded-full text-sm font-bold font-orbitron uppercase tracking-wider transition-all',
                    selectedTag === tag
                      ? 'bg-pink-500/20 text-pink-300 border-2 border-pink-500/50 shadow-lg shadow-pink-500/20'
                      : 'bg-black/30 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-400/10 hover:border-cyan-400/50',
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 border-2 border-pink-500/20 rounded-xl bg-pink-500/5">
            <p className="text-cyan-300 text-xl font-orbitron">
              {searchQuery || selectedTag
                ? 'No posts found matching your filters.'
                : 'No blog posts yet. Check back soon!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
      <div className="h-16" />
    </PageWrapper>
  )
}
