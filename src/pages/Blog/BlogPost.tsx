import { useState, useEffect } from 'react'
import { Link, useParams } from '@tanstack/react-router'
import { format, parseISO } from 'date-fns'
import { ArrowLeft, Calendar, User, Clock, Tag } from 'lucide-react'
import PageWrapper from '@/components/PageWrapper'
import HeadingText from '@/components/HeadingText'
import SEO from '@/components/SEO'
import type { BlogIndex, BlogPostMeta } from '@/types/blog'
import { getPostBySlug, getRelatedPosts } from '@/utils/blogLoader'

interface BlogPostProps {
  blogIndex: BlogIndex
}

export default function BlogPost({ blogIndex }: BlogPostProps) {
  const { slug } = useParams({ from: '/blog/$slug' })
  const post = getPostBySlug(blogIndex, slug)
  const [htmlContent, setHtmlContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!post) return

    // Fetch the pre-rendered HTML content from the build output
    fetch(`/noscript/blog/${slug}.html`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load post content')
        return res.text()
      })
      .then((html) => {
        // Extract just the post content from the full HTML
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        const content = doc.querySelector('.post-content')
        if (content) {
          setHtmlContent(content.innerHTML)
        } else {
          throw new Error('Post content not found')
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error loading post:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [post, slug])

  if (!post) {
    return (
      <PageWrapper>
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="text-blue-400 hover:text-blue-300">
            <ArrowLeft size={18} />
            <span>Back to Blog</span>
          </Link>
        </div>
      </PageWrapper>
    )
  }

  const formattedDate = format(parseISO(post.date), 'MMMM d, yyyy')
  const relatedPosts = getRelatedPosts(blogIndex, post)

  return (
    <>
      <SEO title={post.title} description={post.description} image={post.image} />
      <PageWrapper>
        <div className="h-24 md:h-34" />
        {/* Background Effects */}
        <div className="absolute inset-0" aria-hidden={true}>
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-pink-500/8 rounded-full blur-xl animate-subtle-pulse will-change-transform" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-500/8 rounded-full blur-xl animate-subtle-pulse-delay-2 will-change-transform" />
        </div>

        <article className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to Blog</span>
          </Link>

          {/* Post Header */}
          <header className="mb-8">
            <HeadingText title={post.title} center={false} />

            <div className="flex flex-wrap gap-4 text-cyan-400 mb-6 font-orbitron">
              <span className="flex items-center gap-2">
                <Calendar size={18} />
                <time dateTime={post.date}>{formattedDate}</time>
              </span>
              <span className="text-pink-400 font-bold">•</span>
              <span className="flex items-center gap-2">
                <User size={18} />
                {post.author}
              </span>
              <span className="text-pink-400 font-bold">•</span>
              <span className="flex items-center gap-2">
                <Clock size={18} />
                {post.readingTime}
              </span>
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-4 py-2 bg-pink-500/20 text-pink-300 border border-pink-500/50 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-pink-500/30 transition-all font-orbitron"
                  >
                    <Tag size={14} />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Post Content */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent"></div>
              <p className="text-cyan-400 mt-4 font-orbitron">Loading post...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-pink-500/10 border border-pink-500/30 rounded-xl p-8">
              <p className="text-pink-400 mb-4 font-orbitron">Error: {error}</p>
              <Link to="/blog" className="text-cyan-400 hover:text-cyan-300 font-orbitron">
                <ArrowLeft size={18} />
                <span>Back to Blog</span>
              </Link>
            </div>
          ) : (
            <div className="bg-black/60 backdrop-blur-xs border border-pink-500/20 rounded-xl p-8 md:p-12 mb-12">
              <div
                className="prose prose-invert prose-lg max-w-none blog-content"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
          )}

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-cyan-300 uppercase tracking-wider font-orbitron">
                Related Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <RelatedPostCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          )}
        </article>
        <div className="h-16" />
      </PageWrapper>
    </>
  )
}

function RelatedPostCard({ post }: { post: BlogPostMeta }) {
  const formattedDate = format(parseISO(post.date), 'MMM d, yyyy')

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="block bg-black/40 backdrop-blur-xs border border-pink-500/30 rounded-xl p-5 hover:border-cyan-400/50 hover:-translate-y-1 hover:scale-105 transition-all duration-300 will-change-transform"
      style={{
        background:
          'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(139,69,19,0.1) 50%, rgba(0,0,0,0.8) 100%)',
      }}
    >
      <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-cyan-300 mb-3 line-clamp-2 font-orbitron">
        {post.title}
      </h3>
      <p className="text-sm text-cyan-100 mb-3 line-clamp-2 leading-relaxed font-light">
        {post.excerpt}
      </p>
      <time className="text-xs text-cyan-400 font-semibold font-orbitron" dateTime={post.date}>
        {formattedDate}
      </time>
    </Link>
  )
}
