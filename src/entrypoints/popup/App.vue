<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { PageInfo } from '../../types/pageInfo'
import ClipBoard from '../../helper/clipBoard.vue'
import { createTabsService } from '../../services/tabs'

const tabsService = createTabsService({ tabs: chrome.tabs })

const pageInfo = ref<PageInfo | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const fetchPageInfo = async () => {
  loading.value = true
  error.value = null
  pageInfo.value = null

  try {
    const tab = await tabsService.getActiveTab()
    if (!tab?.id) {
      error.value = 'アクティブなタブが見つかりません'
      return
    }

    const response = await tabsService.sendMessage(tab.id, {})
    pageInfo.value = response as PageInfo
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'ページ情報の取得に失敗しました'
  } finally {
    loading.value = false
  }
}

const truncateUrl = (url: string, max = 50): string => {
  return url.length > max ? url.slice(0, max) + '...' : url
}

onMounted(() => {
  fetchPageInfo()
})
</script>

<template>
  <div class="popup-container">
    <header class="popup-header">
      <h1>Page Info</h1>
      <button class="icon-button" title="再取得" @click="fetchPageInfo">
        <span :class="{ spinning: loading }">&#x21bb;</span>
      </button>
    </header>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <span>取得中...</span>
    </div>

    <div v-else-if="error" class="error-message">
      <p>{{ error }}</p>
      <button class="retry-button" @click="fetchPageInfo">再試行</button>
    </div>

    <div v-else-if="pageInfo" class="content">
      <section class="info-card">
        <div class="card-label">タイトル</div>
        <div class="card-value title-value">{{ pageInfo.title }}</div>
      </section>

      <section class="info-card">
        <div class="card-label">URL</div>
        <div class="card-value">
          <a :href="pageInfo.url" target="_blank" rel="noopener" class="url-link">
            {{ truncateUrl(pageInfo.url) }}
          </a>
        </div>
      </section>

      <section class="info-card">
        <div class="card-label">Meta Description</div>
        <div class="card-value" :class="{ muted: !pageInfo.description }">
          {{ pageInfo.description || 'なし' }}
        </div>
      </section>

      <section class="info-card">
        <div class="card-label">h1 要素</div>
        <ul v-if="pageInfo.h1List.length > 0" class="h1-list">
          <li v-for="(h1, index) in pageInfo.h1List" :key="index">
            <a v-if="h1.href" :href="h1.href" target="_blank" rel="noopener" class="h1-link">
              {{ h1.text }}
              <span class="link-icon">&#x1F517;</span>
            </a>
            <span v-else>{{ h1.text }}</span>
          </li>
        </ul>
        <div v-else class="card-value muted">h1 要素なし</div>
      </section>

      <footer class="popup-footer">
        <ClipBoard :page-info="pageInfo" />
      </footer>
    </div>

    <div v-else class="empty-state">
      <p>ページ情報がありません</p>
    </div>
  </div>
</template>
