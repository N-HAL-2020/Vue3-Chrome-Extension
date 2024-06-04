<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ClipBoard from '../../helper/clipBoard.vue'

const responseData = ref<null>(null)

const onClick = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
    chrome.tabs.sendMessage(tabs[0].id!, {}, (response: any) => {
      console.log(response)
      responseData.value = response
    })
  })
}
// TODO クリップボード機能の実装
const setupClipboardListener = () => {
  chrome.runtime.onMessage.addListener(function (message) {
    if (message.command === 'copy') {
      navigator.clipboard
        .writeText(message.text)
        .then(() => {
          console.log('Copied to clipboard')
        })
        .catch((err) => {
          console.error('Failed to copy: ', err)
        })
    }
  })
}

onMounted(() => {
  setupClipboardListener()
})
</script>

<template>
  <div>
    <button @click="onClick">Click me</button>
  </div>
  <div v-if="responseData">
    {{ responseData }}
  </div>
  <div v-else>No response data</div>
  <ClipBoard />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
