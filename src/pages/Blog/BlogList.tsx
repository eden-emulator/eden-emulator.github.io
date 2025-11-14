import { useState, useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { format, parseISO } from 'date-fns'
import { Search, Calendar, User, Clock, Tag } from 'lucide-react'
import PageWrapper from '@/components/PageWrapper'
import HeadingText from '@/components/HeadingText'
import type { BlogIndex, BlogPostMeta } from '@/types/blog'

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
        post =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Filter by selected tag
    if (selectedTag) {
      posts = posts.filter(post => post.tags.includes(selectedTag))
    }

    return posts
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
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-black/40 backdrop-blur-xs border border-pink-500/30 rounded-lg text-white placeholder-cyan-400/50 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all font-orbitron"
            />
          </div>

          {/* Tags Filter */}
          {blogIndex.tags.length > 0 && (
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-5 py-2 rounded-full text-sm font-bold font-orbitron uppercase tracking-wider transition-all ${
                  selectedTag === null
                    ? 'bg-pink-500/20 text-pink-300 border-2 border-pink-500/50 shadow-lg shadow-pink-500/20'
                    : 'bg-black/30 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-400/10 hover:border-cyan-400/50'
                }`}
              >
                All Posts
              </button>
              {blogIndex.tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-5 py-2 rounded-full text-sm font-bold font-orbitron uppercase tracking-wider transition-all ${
                    selectedTag === tag
                      ? 'bg-pink-500/20 text-pink-300 border-2 border-pink-500/50 shadow-lg shadow-pink-500/20'
                      : 'bg-black/30 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-400/10 hover:border-cyan-400/50'
                  }`}
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
              {searchQuery || selectedTag ? 'No posts found matching your filters.' : 'No blog posts yet. Check back soon!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
      <div className="h-16" />
    </PageWrapper>
  )
}

function PostCard({ post }: { post: BlogPostMeta }) {
  const formattedDate = format(parseISO(post.date), 'MMMM d, yyyy')

  return (
    <article className="group relative bg-black/40 backdrop-blur-xs border border-pink-500/30 rounded-xl p-8 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 will-change-transform"
      style={{
        background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(139,69,19,0.1) 50%, rgba(0,0,0,0.8) 100%)'
      }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 opacity-0 group-hover:opacity-15 rounded-xl blur-sm transition-opacity duration-300 will-change-opacity" />

      <div className="relative">
        <Link to="/blog/$slug" params={{ slug: post.slug }} className="block">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-cyan-300 mb-4 tracking-wider font-orbitron">
            {post.title}
          </h2>

          <div className="flex flex-wrap gap-3 text-sm text-cyan-400 mb-4 font-orbitron">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              <time dateTime={post.date}>{formattedDate}</time>
            </span>
            <span className="text-pink-400 font-bold">•</span>
            <span className="flex items-center gap-1">
              <User size={14} />
              {post.author}
            </span>
            <span className="text-pink-400 font-bold">•</span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {post.readingTime}
            </span>
          </div>

          <p className="text-cyan-100 mb-4 line-clamp-3 leading-relaxed font-light">{post.excerpt}</p>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-pink-500/20 text-pink-300 border border-pink-500/50 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-pink-500/30 transition-all font-orbitron"
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          )}

          <span className="inline-flex items-center text-cyan-400 font-semibold uppercase tracking-wider group-hover:gap-2 transition-all font-orbitron">
            Read more →
          </span>
        </Link>
      </div>
    </article>
  )
}
