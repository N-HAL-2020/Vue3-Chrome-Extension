chrome.runtime.onMessage.addListener((_m: any, _s: any, sendResponse: any) => {
  const title = document.title
  const description = document.querySelector('meta[name="description"]')?.getAttribute('content')

  const response = [
    {
      label: 'ページタイトル',
      value: title,
    },
    {
      label: 'ページ説明',
      value: description,
    },
  ]

  sendResponse(response)
})
