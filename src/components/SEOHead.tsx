import { useEffect } from 'react'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string[]
}

export default function SEOHead({
  title = 'Crod Babylon - Digital Storytelling Universe',
  description = 'Entdecke 12 einzigartige Welten voller Leidenschaft, Magie und Abenteuer. Moderne digitale Geschichten mit faszinierenden Charakteren.',
  keywords = ['Romance', 'Fantasy', 'Thriller', 'Digital Stories', 'Interactive Fiction', 'Manhwa', 'Web Stories']
}: SEOHeadProps) {
  
  useEffect(() => {
    // Update document title
    const fullTitle = title === 'Crod Babylon - Digital Storytelling Universe' 
      ? title 
      : `${title} | Crod Babylon`
    
    document.title = fullTitle
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', description)
    } else {
      const newMeta = document.createElement('meta')
      newMeta.name = 'description'
      newMeta.content = description
      document.head.appendChild(newMeta)
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords.join(', '))
    } else {
      const newMeta = document.createElement('meta')
      newMeta.name = 'keywords'
      newMeta.content = keywords.join(', ')
      document.head.appendChild(newMeta)
    }
    
    // Update Open Graph meta tags
    const updateOrCreateOGMeta = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`)
      if (meta) {
        meta.setAttribute('content', content)
      } else {
        meta = document.createElement('meta')
        meta.setAttribute('property', property)
        meta.setAttribute('content', content)
        document.head.appendChild(meta)
      }
    }
    
    updateOrCreateOGMeta('og:title', fullTitle)
    updateOrCreateOGMeta('og:description', description)
    updateOrCreateOGMeta('og:type', 'website')
    updateOrCreateOGMeta('og:site_name', 'Crod Babylon')
    
  }, [title, description, keywords])
  
  return null
}