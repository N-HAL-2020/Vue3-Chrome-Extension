import type { PageInfo, HeadingWithLink } from '../types/pageInfo'

export interface DomExtractorDeps {
  document: Document
}

export function createDomExtractor(deps: DomExtractorDeps) {
  return {
    extractPageInfo: (): PageInfo => {
      const title = deps.document.title
      const description = deps.document.querySelector('meta[name="description"]')?.getAttribute('content') || null
      const url = window.location.href
      const h1List = extractH1WithLinks(deps.document)
      return { title, description, url, h1List }
    },
  }
}

function extractH1WithLinks(doc: Document): HeadingWithLink[] {
  return Array.from(doc.querySelectorAll('h1')).map((h1) => {
    const text = h1.textContent?.trim() || ''
    const parentLink = h1.closest('a')
    const childLink = h1.querySelector('a')
    const href = parentLink?.getAttribute('href') || childLink?.getAttribute('href') || null
    return { text, href }
  })
}
