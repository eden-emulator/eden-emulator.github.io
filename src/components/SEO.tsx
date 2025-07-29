import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
}

function SEO({
  title = 'Eden - Open Source Nintendo Switch Emulator',
  description = 'Eden is an experimental open-source emulator for the Nintendo Switch, built with performance and stability in mind. It is written in C++ with cross-platform support for Windows, Linux and Android. ',
  keywords = 'Eden, Nintendo Switch emulator, Switch emulator, open source emulator, gaming emulator',
  image = '/og-image.png',
  url = 'https://eden-emulator.github.io/',
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title

    // Update meta tags
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name'
      let element = document.querySelector(`meta[${attribute}="${property}"]`)

      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, property)
        document.head.appendChild(element)
      }

      element.setAttribute('content', content)
    }

    // Update standard meta tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)

    // Update Open Graph tags
    updateMetaTag('og:title', title, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:image', image, true)
    updateMetaTag('og:url', url, true)

    // Update Twitter tags
    updateMetaTag('twitter:title', title, true)
    updateMetaTag('twitter:description', description, true)
    updateMetaTag('twitter:image', image, true)
    updateMetaTag('twitter:url', url, true)

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.rel = 'canonical'
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.href = url
  }, [title, description, keywords, image, url])

  return null
}

export default SEO
