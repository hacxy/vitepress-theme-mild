<script lang="ts" setup>
import { useUrlSearchParams } from '@vueuse/core';
import { NPagination } from 'naive-ui';
import { useData, useRouter } from 'vitepress';
import { computed, inject, onMounted, ref, watch } from 'vue';
import { DEFAULT_PAGE_SIZE } from '../../shared/constants';
import { paginate } from '../utils/client/article';
import ArticlesList from './ArticlesList.vue';

const router = useRouter();
const { frontmatter } = useData();
const articleTitle = ref(frontmatter.value?.article?.title);
const pageSize = ref(frontmatter.value?.article?.pageSize || DEFAULT_PAGE_SIZE);
const params = useUrlSearchParams<{ pageNum: string }>();
const currentPage = ref(1);
const baseData = inject<any>('baseData');

const totalPages = computed(() => {
  const total = baseData.list.length || 0;
  return Math.ceil(total / pageSize.value);
});

const posts = computed(() => {
  return paginate(baseData.list, pageSize.value, currentPage.value);
});

onMounted(() => {
  if (currentPage.value <= 0 || currentPage.value > totalPages.value) {
    currentPage.value = 1;
  }
  currentPage.value = Number(params.pageNum || 0);
});
watch(currentPage, () => {
  window.scrollTo({ top: 0, behavior: 'auto' });
  if (currentPage.value <= 0 || currentPage.value > totalPages.value) {
    currentPage.value = 1;
  }
  params.pageNum = String(currentPage.value);
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
        <ArticlesList :list-data="posts" :title="articleTitle" />
      </div>
      <NPagination v-if="totalPages" v-model:page="currentPage" :page-count="totalPages" />
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
    border-radius: 8px;
  }
  .n-pagination-item--active {
    border-color: var(--vp-c-brand-1) !important;
    color: var(--vp-c-brand-1) !important;
  }
  .n-pagination-item:hover {
    color: var(--vp-c-text-1);
  }
  .n-pagination-item--button:hover {
    color: var(--vp-c-text-1) !important;
  }
}

.VMArticlesListWrapper {
  min-height: 600px;
}
</style>
