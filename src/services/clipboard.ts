export interface ClipboardDeps {
  clipboard: Clipboard
}

export function createClipboardService(deps: ClipboardDeps) {
  return {
    writeText: async (text: string): Promise<boolean> => {
      try {
        await deps.clipboard.writeText(text)
        return true
      } catch {
        return false
      }
    },
  }
}
