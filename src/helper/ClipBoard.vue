<template>
  <div>
    <div class="clipboard-container">
      <button class="copy-button primary" :disabled="!pageInfo" @click="copyAll">すべてコピー</button>
      <button class="copy-button secondary" @click="copyUrl">URLのみコピー</button>
    </div>
    <div v-if="successMessage" class="copy-success">{{ successMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PageInfo } from '../types/pageInfo'
import { formatPageInfo } from '../services/page-info-formatter'
import { createClipboardService } from '../services/clipboard'
import { createTabsService } from '../services/tabs'

const clipboardService = createClipboardService({ clipboard: navigator.clipboard })
const tabsService = createTabsService({ tabs: chrome.tabs })

const props = defineProps<{
  pageInfo: PageInfo | null
}>()

const successMessage = ref('')

let hideTimer: ReturnType<typeof setTimeout> | null = null

const showSuccess = (msg: string) => {
  if (hideTimer) clearTimeout(hideTimer)
  successMessage.value = msg
  hideTimer = setTimeout(() => {
    successMessage.value = ''
  }, 2000)
}

const copyAll = async () => {
  if (!props.pageInfo) return
  const text = formatPageInfo(props.pageInfo)
  const ok = await clipboardService.writeText(text)
  showSuccess(ok ? '\u2713 コピーしました' : 'コピーに失敗しました')
}

const copyUrl = async () => {
  const tab = await tabsService.getActiveTab()
  if (tab?.url) {
    const ok = await clipboardService.writeText(tab.url)
    showSuccess(ok ? '\u2713 URLをコピーしました' : 'コピーに失敗しました')
  }
}
</script>
