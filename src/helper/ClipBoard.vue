<template>
  <div class="copy-url-container">
    <button @click="OncopyToClipboardHandler">Copy URL to Clipboard</button>
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
    if (tab.url) {
      await navigator.clipboard.writeText(tab.url)
      successMessage.value = 'URL copied to clipboard!'
    }
  } catch (error) {
    errorMessage.value = 'Failed to copy URL.'
    console.error('Error copying URL to clipboard:', error)
  }
}
</script>

<style></style>
