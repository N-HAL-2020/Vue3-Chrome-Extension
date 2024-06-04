chrome.runtime.onMessage.addListener((_m: any, _s: any, sendResponse: any) => {
  const title = document.title
  const description = document.querySelector('meta[name="description"]')?.getAttribute('content')
  const h1 = Array.from(document.querySelectorAll('h1')).map((h1) => h1.textContent)
  const h2 = Array.from(document.querySelectorAll('h2')).map((h2) => h2.textContent)
  const h3 = Array.from(document.querySelectorAll('h3')).map((h3) => h3.textContent)
  const p = Array.from(document.querySelectorAll('p')).map((p) => p.textContent)

  const response = [
    {
      label: 'ページタイトル',
      value: title,
    },
    {
      label: 'ページ説明',
      value: description,
    },
    {
      label: 'h1',
      value: h1,
    },
    {
      label: 'h2',
      value: h2,
    },
    {
      label: 'h3',
      value: h3,
    },
    {
      label: 'p',
      value: p,
    },
    {
      label: 'span',
      value: Array.from(document.querySelectorAll('span')).map((span) => span.textContent),
    },
  ]

  sendResponse(response)
})
