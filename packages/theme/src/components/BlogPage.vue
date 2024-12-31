<script lang="ts" setup>
import { useUrlSearchParams } from '@vueuse/core';
import { NPagination } from 'naive-ui';
import { useData, useRouter } from 'vitepress';
import { computed, ref, watchEffect } from 'vue';
import { DEFAULT_PAGE_SIZE } from '../constants';
import { useArticleData } from '../hooks/useArticleData';
import { paginate } from '../utils/client/article';
import ArticlesList from './ArticlesList.vue';

const router = useRouter();
const { frontmatter } = useData();
const articleTitle = ref(frontmatter.value?.article?.title);
const pageSize = ref(frontmatter.value?.article?.pageSize || DEFAULT_PAGE_SIZE);
const params = useUrlSearchParams();
const currentPage = ref(Number(params.pageNum) || 1);
const { articleData } = useArticleData();

const totalPages = computed(() => {
  const total = articleData.value.length || 0;
  return Math.ceil(total / pageSize.value);
});

const posts = computed(() => {
  return paginate(articleData.value, pageSize.value, currentPage.value);
});

watchEffect(() => {
  if (currentPage.value <= 0 || currentPage.value > totalPages.value) {
    currentPage.value = 1;
  }
  params.pageNum = String(currentPage.value);
  window.scrollTo({ top: 0, behavior: 'auto' });
});

router.onBeforeRouteChange = to => {
  if (to === '/') {
    currentPage.value = 1;
    return true;
  }
};
</script>

<template>
  <div class="VMPage">
    <div class="VMContent VMBlogWrapper">
      <div class="VMArticlesListWrapper">
        <articles-list :list-data="posts" :title="articleTitle" />
      </div>
      <n-pagination v-if="totalPages" v-model:page="currentPage" :page-count="totalPages" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.n-pagination) {
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
  .n-pagination-item.n-pagination-item--disabled {
    background-color: #00000000 !important;
  }
  .n-pagination-item--button {
    border: none !important;
  }
  .n-pagination-item {
    color: var(--vp-c-text-2);
  }
  .n-pagination-item--active {
    border-color: var(--vp-c-text-1) !important;
    color: var(--vp-c-text-1) !important;
  }
  .n-pagination-item:hover {
    color: var(--vp-c-text-1);
  }
}

.VMArticlesListWrapper {
  min-height: 600px;
}
</style>
