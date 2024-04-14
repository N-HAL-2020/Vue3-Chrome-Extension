<script setup lang="ts">
import HelloWorld from '../../components/HelloWorld.vue'

const onClick = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
    chrome.tabs.sendMessage(tabs[0].id!, {}, (response: any) => {
      console.log(response)
    })
  })
}
</script>

<template>
  <div>
    <button @click="onClick">Click me</button>
  </div>
  <HelloWorld msg="Vite + Vue" />
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
