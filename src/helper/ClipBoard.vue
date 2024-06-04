<template>
  <div class="copy-url-container">
    <button @click="OncopyToClipboardHandler">Copy URL to Clipboard</button>
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const successMessage = ref<string>('')
const errorMessage = ref<string>('')
// コピーボタンを押したときにクリップボードにコピーする
const OncopyToClipboardHandler = async () => {
  try {
    const queryOptions = { active: true, currentWindow: true }
    const [tab] = await chrome.tabs.query(queryOptions)
    // タブのURLが存在する場合のみクリップボードにコピーする
    if (tab.url) {
      await navigator.clipboard.writeText(tab.url)
      successMessage.value = 'URL copied to clipboard!'
    }
  } catch (error) {
    // クリップボードへのコピーに失敗した場合
    errorMessage.value = 'Failed to copy URL.'
    console.error('Error copying URL to clipboard:', error)
  }
}
</script>

<style></style>
