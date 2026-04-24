#!/usr/bin/env tsx

import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import readingTime from 'reading-time'
import { Feed } from 'feed'
import { format, parseISO } from 'date-fns'
import type {
  BlogFrontmatter,
  BlogPostMeta,
  BlogIndex,
  TocEntry,
  BlogPost,
} from '../src/types/blog'

const BLOG_DIR = path.join(process.cwd(), 'blog')
const POSTS_DIR = path.join(BLOG_DIR, 'posts')
const IMAGES_SRC_DIR = path.join(BLOG_DIR, 'images')
const IMAGES_DEST_DIR = path.join(process.cwd(), 'public', 'blog', 'images')
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'noscript', 'blog')
const DATA_DIR = path.join(process.cwd(), 'src', 'data')

const SITE_URL = 'https://eden-emu.dev'
const SITE_TITLE = 'Eden Blog'
const SITE_DESCRIPTION = 'News, updates, and announcements from the Eden team'

/**
 * Extract table of contents from HTML
 */
function extractToc(htmlContent: string): TocEntry[] {
  const toc: TocEntry[] = []
  const headingRegex = /<h([2-3])[^>]*id="([^"]+)"[^>]*>([^<]+)<\/h\1>/g
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(htmlContent)) !== null) {
    const [, level, id, text] = match
    toc.push({ level: parseInt(level), id, text })
  }

  return toc
}

function createExcerpt(content: string, maxLength = 200): string {
  // Remove Markdown syntax
  const plainText = content
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links but keep text
    .replace(/[#*_`~]/g, '') // Remove markdown formatting
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim()

  if (plainText.length <= maxLength) return plainText

  return plainText.slice(0, maxLength).trim() + '...'
}

async function processMarkdownFile(filePath: string): Promise<BlogPost | null> {
  const content = await fs.readFile(filePath, 'utf-8')
  const { data, content: markdownContent } = matter(content)

  // Validate frontmatter
  const frontmatter = data as BlogFrontmatter
  if (!frontmatter.title || !frontmatter.slug || !frontmatter.date || !frontmatter.author) {
    console.warn(`⚠️  Skipping ${path.basename(filePath)}: missing required frontmatter`)
    return null
  }

  // Skip drafts
  if (frontmatter.draft) {
    console.log(`📝 Skipping draft: ${frontmatter.title}`)
    return null
  }

  // Process markdown to HTML
  const processedHtml = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: { className: ['heading-link'] },
    })
    .use(rehypeHighlight)
    .use(rehypeSanitize, {
      ...defaultSchema,
      attributes: {
        ...defaultSchema.attributes,
        code: [...(defaultSchema.attributes?.code || []), ['className', /^language-/]],
        span: [...(defaultSchema.attributes?.span || []), ['className']],
      },
    })
    .use(rehypeStringify)
    .process(markdownContent)

  const htmlContent = String(processedHtml)
  const readingTimeResult = readingTime(markdownContent)
  const toc = extractToc(htmlContent)
  const excerpt = createExcerpt(markdownContent)

  return {
    ...frontmatter,
    htmlContent,
    readingTime: readingTimeResult.text,
    excerpt,
    url: `/blog/${frontmatter.slug}`,
    noscriptUrl: `/noscript/blog/${frontmatter.slug}.html`,
    toc,
  }
}

function generatePostHtml(post: BlogPost): string {
  const formattedDate = format(parseISO(post.date), 'MMMM d, yyyy')
  const tocHtml =
    post.toc.length > 0
      ? `
    <nav class="toc">
      <h2>Table of Contents</h2>
      <ul>
        ${post.toc
          .map(
            (entry) => `
          <li class="toc-level-${entry.level}">
            <a href="#${entry.id}">${entry.text}</a>
          </li>
        `,
          )
          .join('')}
      </ul>
    </nav>
  `
      : ''

  return `<!doctype html>
<html lang="en-GB">
  <head>
    <meta property="og:title" content="${post.title} - Eden Blog" />
    <meta property="og:description" content="${post.description}" />
    ${post.image ? `<meta property="og:image" content="${post.image}" />` : '<meta property="og:image" content="../img/logofavicon2.png" />'}
    <meta property="og:url" content="${SITE_URL}${post.noscriptUrl}" />
    <meta property="og:type" content="article" />
    <meta property="article:published_time" content="${post.date}" />
    <meta property="article:author" content="${post.author}" />
    ${post.tags.map((tag) => `<meta property="article:tag" content="${tag}" />`).join('\n    ')}
    <meta charset="UTF-8" />
    <meta name="color-scheme" content="dark" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${post.description}" />
    <meta name="author" content="${post.author}" />
    <title>${post.title} - Eden Blog</title>
    <!-- Preload important assets -->
    <link rel="preload" as="style" href="../css/core_styles.css?202505131513" />
    <link rel="preload" as="style" href="../css/mobile_styles.css?202505131513" />
    <link rel="preload" as="style" href="../css/blog_styles.css" />
    <link rel="preload" as="image" href="../favicon.ico?202505100214" />
    <link rel="preload" as="image" href="../icon.svg?202505100214" />
    <!-- Favicon -->
    <link rel="manifest" href="../manifest.webmanifest?202505100214" />
    <link rel="icon" href="../favicon.ico?202505100214" sizes="32x32" />
    <link rel="icon" href="../icon.svg?202505100214" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="../apple-touch-icon.png?202505100214" />
    <!-- Stylesheets -->
    <link rel="stylesheet" type="text/css" href="../css/core_styles.css?202505131513" />
    <link rel="stylesheet" type="text/css" href="../css/mobile_styles.css?202505131513" media="screen and (max-width: 768px)" />
    <link rel="stylesheet" type="text/css" href="../css/blog_styles.css" />
    <!-- Syntax highlighting -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css">
    <!-- RSS Feed -->
    <link rel="alternate" type="application/rss+xml" title="${SITE_TITLE}" href="${SITE_URL}/rss.xml" />
    <link rel="alternate" type="application/atom+xml" title="${SITE_TITLE}" href="${SITE_URL}/atom.xml" />
  </head>

  <body>
    <header>
      <div class="logo">
        <a href="../index.html">
          <img src="../img/logofavicon2.png" alt="Eden" width="75" height="75" />
        </a>
      </div>
      <button class="hamburger" aria-label="Menu">
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
      <nav class="nav-mobile">
        <a href="index.html">Blog</a>
        <a href="../privacy.html">Privacy</a>
        <a href="https://git.eden-emu.dev/eden-emu/eden/releases">Download</a>
        <a href="../compatibility.html">Compatibility</a>
        <a href="../devs.html">Developers</a>
        <a href="../donations.html">Donations</a>
        <a href="https://discord.gg/MHaYRW2rxy">Join Our Discord</a>
      </nav>
    </header>

    <main class="blog-post">
      <article>
        <header class="post-header">
          <a href="index.html" class="back-link">← Back to Blog</a>
          <h1>${post.title}</h1>
          <div class="post-meta">
            <time datetime="${post.date}">${formattedDate}</time>
            <span class="separator">•</span>
            <span class="author">${post.author}</span>
            <span class="separator">•</span>
            <span class="reading-time">${post.readingTime}</span>
          </div>
          ${
            post.tags.length > 0
              ? `
          <div class="post-tags">
            ${post.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
          </div>
          `
              : ''
          }
        </header>

        <div class="content-container">
          <div class="post-content">
            ${tocHtml}
            ${post.htmlContent}
          </div>
        </div>
      </article>
    </main>

    <div class="spacer"></div>
    <footer>
      <a href="../devs.html">Eden Emulator, Developed by The Eden Team</a>
      <h6>Website Made by Bix, Refined by Feles</h6>
      <a href="https://x.com/edenemuofficial" class="social-link">
        <img src="../img/twitter.png" alt="X logo" class="social-icon" />
        Follow us on X
      </a>
    </footer>
    <script src="../js/mobile-navbar.js"></script>
  </body>
</html>`
}

function generateListingHtml(posts: BlogPostMeta[]): string {
  return `<!doctype html>
<html lang="en-GB">
  <head>
    <meta property="og:title" content="Eden - Blog" />
    <meta property="og:description" content="${SITE_DESCRIPTION}" />
    <meta property="og:image" content="../img/logofavicon2.png" />
    <meta property="og:url" content="${SITE_URL}/noscript/blog/" />
    <meta property="og:type" content="website" />
    <meta charset="UTF-8" />
    <meta name="color-scheme" content="dark" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${SITE_DESCRIPTION}" />
    <title>Eden - Blog</title>
    <!-- Preload important assets -->
    <link rel="preload" as="style" href="../css/core_styles.css?202505131513" />
    <link rel="preload" as="style" href="../css/mobile_styles.css?202505131513" />
    <link rel="preload" as="style" href="../css/blog_styles.css" />
    <link rel="preload" as="image" href="../favicon.ico?202505100214" />
    <link rel="preload" as="image" href="../icon.svg?202505100214" />
    <link rel="preload" as="image" href="../img/bg1.jpg" />
    <!-- Favicon -->
    <link rel="manifest" href="../manifest.webmanifest?202505100214" />
    <link rel="icon" href="../favicon.ico?202505100214" sizes="32x32" />
    <link rel="icon" href="../icon.svg?202505100214" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="../apple-touch-icon.png?202505100214" />
    <!-- Stylesheets -->
    <link rel="stylesheet" type="text/css" href="../css/core_styles.css?202505131513" />
    <link rel="stylesheet" type="text/css" href="../css/mobile_styles.css?202505131513" media="screen and (max-width: 768px)" />
    <link rel="stylesheet" type="text/css" href="../css/blog_styles.css" />
    <!-- RSS Feed -->
    <link rel="alternate" type="application/rss+xml" title="${SITE_TITLE}" href="${SITE_URL}/rss.xml" />
    <link rel="alternate" type="application/atom+xml" title="${SITE_TITLE}" href="${SITE_URL}/atom.xml" />
  </head>

  <body>
    <header>
      <div class="logo">
        <a href="../index.html">
          <img src="../img/logofavicon2.png" alt="Eden" width="75" height="75" />
        </a>
      </div>
      <button class="hamburger" aria-label="Menu">
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
      <nav class="nav-mobile">
        <a href="index.html">Blog</a>
        <a href="../privacy.html">Privacy</a>
        <a href="https://git.eden-emu.dev/eden-emu/eden/releases">Download</a>
        <a href="../compatibility.html">Compatibility</a>
        <a href="../devs.html">Developers</a>
        <a href="../donations.html">Donations</a>
        <a href="https://discord.gg/MHaYRW2rxy">Join Our Discord</a>
      </nav>
    </header>

    <section class="hero-header">
      <h1>Blog</h1>
      <p class="hero-subtitle">${SITE_DESCRIPTION}</p>
    </section>

    <main class="blog-listing">
      ${
        posts.length === 0
          ? `
        <div class="no-posts">
          <p>No blog posts yet. Check back soon!</p>
        </div>
      `
          : `
        <div class="posts-grid">
          ${posts
            .map((post) => {
              const formattedDate = format(parseISO(post.date), 'MMMM d, yyyy')
              return `
            <article class="post-card">
              <h2><a href="${post.slug}.html">${post.title}</a></h2>
              <div class="post-meta">
                <time datetime="${post.date}">${formattedDate}</time>
                <span class="separator">•</span>
                <span class="author">${post.author}</span>
                <span class="separator">•</span>
                <span class="reading-time">${post.readingTime}</span>
              </div>
              <p class="post-excerpt">${post.excerpt}</p>
              ${
                post.tags.length > 0
                  ? `
              <div class="post-tags">
                ${post.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
              </div>
              `
                  : ''
              }
              <a href="${post.slug}.html" class="read-more">Read more →</a>
            </article>
            `
            })
            .join('')}
        </div>
      `
      }
    </main>

    <div class="spacer"></div>
    <footer>
      <a href="../devs.html">Eden Emulator, Developed by The Eden Team</a>
      <h6>Website Made by Bix, Refined by Feles</h6>
      <a href="https://x.com/edenemuofficial" class="social-link">
        <img src="../img/twitter.png" alt="X logo" class="social-icon" />
        Follow us on X
      </a>
    </footer>
    <script src="../js/mobile-navbar.js"></script>
  </body>
</html>`
}

async function generateFeeds(posts: BlogPostMeta[]) {
  const feed = new Feed({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    id: SITE_URL,
    link: SITE_URL,
    language: 'en',
    image: `${SITE_URL}/noscript/img/logofavicon2.png`,
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, The Eden Team`,
    updated: new Date(posts[0]?.date || Date.now()),
    feedLinks: {
      rss: `${SITE_URL}/rss.xml`,
      atom: `${SITE_URL}/atom.xml`,
    },
    author: {
      name: 'The Eden Team',
      link: SITE_URL,
    },
  })

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${SITE_URL}${post.url}`,
      link: `${SITE_URL}${post.url}`,
      description: post.description,
      content: post.excerpt,
      author: [{ name: post.author }],
      date: parseISO(post.date),
      image: post.image,
    })
  }

  const publicDir = path.join(process.cwd(), 'public')

  // Write RSS feed to public (will be copied by Vite)
  await fs.writeFile(path.join(publicDir, 'rss.xml'), feed.rss2())
  console.log('✅ Generated RSS feed')

  // Write Atom feed to public (will be copied by Vite)
  await fs.writeFile(path.join(publicDir, 'atom.xml'), feed.atom1())
  console.log('✅ Generated Atom feed')
}

async function copyBlogImages() {
  try {
    await fs.access(IMAGES_SRC_DIR)
  } catch {
    return
  }
  await fs.rm(IMAGES_DEST_DIR, { recursive: true, force: true })
  await fs.mkdir(IMAGES_DEST_DIR, { recursive: true })
  await fs.cp(IMAGES_SRC_DIR, IMAGES_DEST_DIR, { recursive: true })
  console.log('✅ Copied blog images')
}

async function buildBlog() {
  console.log('🚀 Building blog...\n')

  // Ensure output directories exist
  await fs.mkdir(OUTPUT_DIR, { recursive: true })
  await fs.mkdir(DATA_DIR, { recursive: true })

  await copyBlogImages()

  // Read all markdown files
  let files: string[]
  try {
    files = await fs.readdir(POSTS_DIR)
  } catch {
    console.log('📁 No posts directory found, creating it...')
    await fs.mkdir(POSTS_DIR, { recursive: true })
    files = []
  }

  const markdownFiles = files.filter((f) => f.endsWith('.md'))

  if (markdownFiles.length === 0) {
    console.log('⚠️  No markdown files found in blog/posts/')
    console.log('📝 Creating blog index with zero posts...')
  }

  // Process all posts
  const posts: BlogPost[] = []
  for (const file of markdownFiles) {
    const filePath = path.join(POSTS_DIR, file)
    const post = await processMarkdownFile(filePath)
    if (post) {
      posts.push(post)
      console.log(`✅ Processed: ${post.title}`)
    }
  }

  // Sort by date (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Extract metadata
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const postsMeta: BlogPostMeta[] = posts.map(({ htmlContent, toc, ...meta }) => meta)
  const tags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort()
  const authors = Array.from(new Set(posts.map((p) => p.author))).sort()

  // Generate blog index JSON
  const blogIndex: BlogIndex = {
    posts: postsMeta,
    tags,
    authors,
    generatedAt: new Date().toISOString(),
  }

  // Write to src/data for type imports
  await fs.writeFile(path.join(DATA_DIR, 'blog.json'), JSON.stringify(blogIndex, null, 2))

  // Also write to public for runtime access
  await fs.writeFile(
    path.join(process.cwd(), 'public', 'blog.json'),
    JSON.stringify(blogIndex, null, 2),
  )
  console.log(`\n📦 Generated blog index with ${posts.length} post(s)`)

  // Generate noscript HTML files
  for (const post of posts) {
    const html = generatePostHtml(post)
    await fs.writeFile(path.join(OUTPUT_DIR, `${post.slug}.html`), html)
  }
  console.log(`✅ Generated ${posts.length} noscript blog post(s)`)

  // Generate blog listing
  const listingHtml = generateListingHtml(postsMeta)
  await fs.writeFile(path.join(OUTPUT_DIR, 'index.html'), listingHtml)
  console.log('✅ Generated blog listing page')

  if (posts.length > 0) {
    await generateFeeds(postsMeta)
  }

  console.log('\n✨ Blog build complete!\n')
}

buildBlog().catch((error) => {
  console.error('❌ Build failed:', error)
  process.exit(1)
})
