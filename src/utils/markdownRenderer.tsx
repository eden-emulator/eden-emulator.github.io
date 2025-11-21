import { type ReactElement } from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeReact from 'rehype-react'
import { createElement, Fragment } from 'react'

/**
 * Work in progress (Producdevity)
 * Process markdown content and return React elements
 */
export async function renderMarkdown(content: string): Promise<ReactElement> {
  const result = await unified()
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
    .use(rehypeReact, {
      createElement,
      Fragment,
    })
    .process(content)

  return result.result as ReactElement
}
