# Eden Emulator Blog Implementation Plan

Fully static markdown-based blog that works in both React SPA and noscript versions for the 7 people using that.

---

## Architecture Overview

**Dual-Output Strategy**: Build-time generation of both React components and static HTML from the same markdown sources.

```
    Markdown Files (.md)
             ↓
       [Build Script]
             ↓
    ┌────────┴────────┐
    ↓                ↓
React Data      Static HTML
(JSON index)    (noscript/*.html)
     ↓                ↓
React Router    Direct Access
(/blog/*)       (/noscript/blog/*)
```

---

## Tech Stack

### Core Dependencies
- **`gray-matter`**: Parse frontmatter metadata from markdown
- **`unified`**: Unified processor for markdown/HTML transformation
- **`remark-parse`**: Parse Markdown into a syntax tree
- **`remark-gfm`**: GitHub-flavored markdown (tables, task lists, strikethrough)
- **`remark-rehype`**: Transform markdown AST → HTML AST
- **`rehype-slug`**: Add IDs to headings for anchor links
- **`rehype-autolink-headings`**: Auto-link headings
- **`rehype-highlight`**: Syntax highlighting for code blocks
- **`rehype-stringify`**: Serialize HTML AST → HTML string
- **`rehype-react`**: Transform HTML AST → React components
- **`rehype-sanitize`**: Sanitize HTML to prevent XSS
- **`reading-time`**: Estimate reading time
- **`feed`**: Generate RSS/Atom feeds
- **`tsx`**: Run TypeScript build scripts
- **`date-fns`**: Date formatting utilities

---

## File Structure

```
/blog                          # New directory for blog content
├── posts/                     # Markdown blog posts
│   ├── 2025-11-15-welcome.md
│   └── ...
└── images/                    # Blog-specific images
    ├── welcome-banner.jpg
    └── ...

/src
├── pages/
│   └── Blog/                  # React blog components
│       ├── BlogList.tsx       # Blog listing page
│       ├── BlogPost.tsx       # Individual post component
│       └── BlogLayout.tsx     # Blog-specific layout
├── data/
│   └── blog.json              # Generated: blog index/metadata
├── types/
│   └── blog.ts                # TypeScript types for blog
└── utils/
    └── blogRenderer.tsx       # Markdown → React renderer

/scripts
└── build-blog.ts              # Build script for blog generation

/public/noscript
├── blog/                      # Generated static blog
│   ├── index.html             # Blog listing
│   ├── 2025-11-15-welcome.html
│   └── ...
├── css/
│   └── blog_styles.css        # Blog-specific styles
└── blog.html                  # Redirect to blog/index.html

/dist                          # Build output
├── blog.json                  # Blog metadata for React
├── rss.xml                    # Generated RSS feed
├── atom.xml                   # Generated Atom feed
└── noscript/blog/             # Copied from public/noscript/blog/
```

---

## Markdown Frontmatter Schema

```yaml
---
title: "Welcome to Eden Emulator Blog"
slug: "welcome-to-eden-emulator"
description: "Announcing the official Eden Emulator blog"
author: "Your Mom"
date: "2025-01-15"
tags: ["announcement", "news"]
image: "/blog/images/welcome-banner.jpg"
draft: false
---

Your markdown content here...
```

## Build Process Integration

To build the blog, run `npm run build:blog`. This will generate the React blog data and static HTML files in `dist/`. 
During development, run `npm run watch:blog` to automatically rebuild the blog on changes.

---

## Roadmap, maybe?

- MDX support for React components in markdown
- Draft previews in development mode
- Comments integration (giscus/utterances)
- View count analytics
- Newsletter export functionality
- Multi-language support (i18n)
- Full-text search (Pagefind)
- Related posts suggestions
- Author pages
- Tag taxonomy pages
