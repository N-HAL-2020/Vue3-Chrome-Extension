import type { PageInfo } from '../types/pageInfo'

export function formatPageInfo(info: PageInfo): string {
  const h1Section = info.h1List.length > 0 ? info.h1List.map((h1) => `- ${h1.text} (${h1.href || 'リンクなし'})`).join('\n') : '- なし'

  return ['【ページタイトル】', info.title, '', '【URL】', info.url, '', '【説明】', info.description || 'なし', '', '【h1要素】', h1Section].join(
    '\n'
  )
}
