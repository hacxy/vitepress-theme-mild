<script lang="ts" setup>
import type { ArticlesData } from '../datas/articles.data.js';
import { useUrlSearchParams } from '@vueuse/core';
import { useRouter } from 'vitepress';
import { computed, ref, watchEffect } from 'vue';
import { data } from '../datas/articles.data.js';

const router = useRouter();
const params = useUrlSearchParams();
const currentPage = ref(Number(params.pageNum) || 1);
const pageSize = ref(4);

function paginate(data: ArticlesData[], pageSize: number, currentPage: number) {
  // 参数校验，如果数据不是数组或者没有数据，直接返回空数组
  if (!Array.isArray(data) || data?.length === 0) {
    return [];
  }
  // 如果每页显示数量小于等于0，默认设置为1
  if (pageSize <= 0) {
    pageSize = 1;
  }
  // 如果当前页小于1，默认设置为1
  if (currentPage < 1) {
    currentPage = 1;
  }
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return data.slice(startIndex, endIndex);
}

const totalPages = computed(() => {
  const total = data?.length || 0;
  return Math.ceil(total / pageSize.value);
});
const posts = computed(() => {
  return paginate(data, pageSize.value, currentPage.value);
});

function handleChangePage(i: number) {
  currentPage.value = i;
  params.pageNum = String(i);
  window.scrollTo({ top: 0, behavior: 'auto' });
}
function handleClick(path: string) {
  router.go(path);
}

watchEffect(() => {
  if (currentPage.value <= 0 || currentPage.value > totalPages.value) {
    currentPage.value = 0;
    params.pageNum = String(1);
  }
});
</script>

<template>
  <div class="post">
    <div
      v-for="(article, index) in posts"
      :key="article.path + article.title"
      v-motion
      class="post-item"
      :initial="{
        opacity: 0,
      }"
      :enter="{
        opacity: 1,
        transition: {
          duration: 500,
          delay: index * 200,
        },
      }"
      @click="handleClick(article.path)"
    >
      <div class="post-header">
        <div class="post-title">
          <a> {{ article?.title }}</a>
        </div>
      </div>
      <p class="describe" v-html="article.description" />
      <div class="post-info">
        <span class="text">
          {{ article.date }}
        </span>
        <span class="text">{{ article.words }} words</span>
        <span class="text">{{ article.minutes }} min
        </span>
      </div>
    </div>
    <APagination
      :current="currentPage"
      :page-size="4"
      :total="data.length"
      @change="handleChangePage"
    />
  </div>
</template>

<style lang="scss" scoped>
:deep(.arco-pagination) {
  color: var(--vp-c-text-1);
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);

  .arco-pagination-item {
    transition: all 0.2s;
  }
  .arco-pagination-item-active {
    color: #000;
  }
  .arco-pagination-item:hover {
    background-color: #ffffff6c;
    color: #000;
  }
  .arco-pagination-item-active:hover {
    background-color: #fff;
  }
}

.post {
  padding-bottom: 75px;
  position: relative;
  min-height: 665px;

  .post-item {
    padding: 14px 14px;
    transition: box-shadow 0.5s;
    cursor: pointer;
    border-radius: 10px;
    margin-bottom: 10px;
  }

  .post-info {
    display: flex;
    align-items: center;
    font-size: 13px;
    color: var(--vp-c-text-3);
    .text {
      flex-shrink: 0;
    }
    .text:not(:last-child)::after {
      content: '';
      display: inline-block;
      width: 1px;
      height: 10px;
      margin: 0 8px;
      background-color: var(--vp-c-text-3);
      opacity: 0.7;
    }
    .tag-item {
      transition: color 0.5s;
    }
    .tag-item:hover {
      color: var(--vp-c-text-1);
    }
  }
}

@media (min-width: 601px) and (max-width: 1024) {
  .post {
    width: 600px;
  }
}

@media (min-width: 1025px) {
  .post {
    width: 800px;
  }
}

.post-item a,
.pagination a {
  color: var(--vp-c-text-1);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
}
.post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post-title {
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0.1rem 0;
}
.describe {
  font-size: 0.9375rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  overflow: hidden;
  color: var(--vp-c-text-2);
  margin: 10px 0;
  line-height: 1.5rem;
}

.link {
  display: inline-block;
  width: 24px;
  text-align: center;
  border: 1px var(--vp-c-divider-light) solid;
  border-right: none;
  font-weight: 400;
}
.link.active {
  background: var(--vp-c-text-1);
  color: var(--vp-c-neutral-inverse);
  border: 1px solid var(--vp-c-text-1) !important;
}
.link:first-child {
  border-bottom-left-radius: 2px;
  border-top-left-radius: 2px;
}
.link:last-child {
  border-bottom-right-radius: 2px;
  border-top-right-radius: 2px;
  border-right: 1px var(--vp-c-divider-light) solid;
}

@media screen and (max-width: 768px) {
  .post-item {
    padding: 14px 0 14px 0;
  }
  .post-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .post-title {
    font-size: 1.0625rem;
    font-weight: 400;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    overflow: hidden;
    width: 17rem;
  }
  .describe {
    font-size: 0.9375rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-clamp: 3;
    overflow: hidden;
    margin: 0.5rem 0 1rem;
  }
}
</style>
