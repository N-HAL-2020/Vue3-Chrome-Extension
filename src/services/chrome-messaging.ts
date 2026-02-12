export interface ChromeMessagingDeps {
  runtime: typeof chrome.runtime
}

export function createChromeMessaging(deps: ChromeMessagingDeps) {
  return {
    onMessage: (callback: Parameters<typeof chrome.runtime.onMessage.addListener>[0]) => {
      deps.runtime.onMessage.addListener(callback)
    },
    sendMessage: (message: any): Promise<any> => {
      return deps.runtime.sendMessage(message)
    },
  }
}
