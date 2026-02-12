export interface TabsDeps {
  tabs: typeof chrome.tabs
}

export function createTabsService(deps: TabsDeps) {
  return {
    getActiveTab: async (): Promise<chrome.tabs.Tab | null> => {
      const [tab] = await deps.tabs.query({ active: true, currentWindow: true })
      return tab || null
    },
    sendMessage: async (tabId: number, message: any): Promise<any> => {
      return deps.tabs.sendMessage(tabId, message)
    },
  }
}
