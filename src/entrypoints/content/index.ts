import { createDomExtractor } from '../../services/dom-extractor'
import { createChromeMessaging } from '../../services/chrome-messaging'

const domExtractor = createDomExtractor({ document })
const messaging = createChromeMessaging({ runtime: chrome.runtime })

messaging.onMessage((_m, _s, sendResponse) => {
  const pageInfo = domExtractor.extractPageInfo()
  sendResponse(pageInfo)
})
