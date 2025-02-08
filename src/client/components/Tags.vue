<script lang="ts" setup>
import type { ArticlesData } from 'src/client/datas/base.data';
import { useUrlSearchParams } from '@vueuse/core';
import { computed, nextTick, ref, watchEffect } from 'vue';
import { useArticleListStore } from '../store/article';
import { handleTagsData } from '../utils/client/tags';
import ArticlesList from './ArticlesList.vue';

const { articleList } = useArticleListStore();
const tagsData = computed(() => {
  return handleTagsData(articleList.value);
});

const params = useUrlSearchParams<{ tag: string }>();
const selectTag = ref<string>(params.tag);
const currentArticle = ref<ArticlesData[]>([]);
watchEffect(() => {
  const articles = tagsData.value.find(item => item.name === selectTag.value || '')?.articles || [];
  currentArticle.value = [];
  nextTick(() => {
    currentArticle.value = articles;
  });
});
function toggleTag(tag: string) {
  selectTag.value = tag;
  params.tag = tag;
}
</script>

<template>
  <div class="VMPage">
    <div class="VMContent">
      <div v-if="tagsData.length">
        <div class="tags-wrapper">
          <span
            v-for="(tag) in tagsData"
            :key="tag.name"
            class="tag"
            @click="() => toggleTag(tag.name)"
          >
            {{ tag.name }} <strong>({{ tag.articles.length }})</strong>
          </span>
        </div>
        <ArticlesList :list-data="currentArticle" :title="selectTag" />
      </div>
      <div v-else class="empty">
        空空如也~
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.empty {
  padding-top: 20px;
  text-align: center;
}
.tags-wrapper {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
}

.tag {
  display: inline-block;
  padding: 4px 16px;
  margin: 6px 8px;
  font-size: 0.875rem;
  line-height: 25px;
  background-color: var(--vp-c-bg-alt);
  transition: 0.4s;
  border-radius: 2px;
  color: var(--vp-c-text-1);
  cursor: pointer;
  border: 1px #00000000 solid;
}
.tag:hover {
  border: 1px var(--vp-c-text-3) solid;
}

.tag strong {
  color: var(--vp-c-text-2);
}

.tag-header {
  font-size: 1.5rem;
  font-weight: 500;
  margin: 1rem 0;
  text-align: left;
}

@media screen and (max-width: 768px) {
  .tag-header {
    font-size: 1.5rem;
  }

  .date {
    font-size: 0.75rem;
  }
}
</style>
