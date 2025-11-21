import type { BlogPostMeta } from '@/types/blog.ts'
import { format, parseISO } from 'date-fns'
import { Link } from '@tanstack/react-router'
import { Calendar, Clock, Tag, User } from 'lucide-react'

interface BlogPostCardProps {
  post: BlogPostMeta
}
export function BlogPostCard(props: BlogPostCardProps) {
  const formattedDate = format(parseISO(props.post.date), 'MMMM d, yyyy')

  return (
    <article
      className="group relative bg-black/40 backdrop-blur-xs border border-pink-500/30 rounded-xl p-8 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 will-change-transform"
      style={{
        background:
          'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(139,69,19,0.1) 50%, rgba(0,0,0,0.8) 100%)',
      }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 opacity-0 group-hover:opacity-15 rounded-xl blur-sm transition-opacity duration-300 will-change-opacity" />

      <div className="relative">
        <Link to="/blog/$slug" params={{ slug: props.post.slug }} className="block">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-cyan-300 mb-4 tracking-wider font-orbitron">
            {props.post.title}
          </h2>

          <div className="flex flex-wrap gap-3 text-sm text-cyan-400 mb-4 font-orbitron">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              <time dateTime={props.post.date}>{formattedDate}</time>
            </span>
            <span className="text-pink-400 font-bold">•</span>
            <span className="flex items-center gap-1">
              <User size={14} />
              {props.post.author}
            </span>
            <span className="text-pink-400 font-bold">•</span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {props.post.readingTime}
            </span>
          </div>

          <p className="text-cyan-100 mb-4 line-clamp-3 leading-relaxed font-light">
            {props.post.excerpt}
          </p>

          {props.post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {props.post.tags.map((tag) => (
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
