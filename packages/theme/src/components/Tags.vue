<script lang="ts" setup>
import { useUrlSearchParams } from '@vueuse/core';
import { NList, NListItem, NThing } from 'naive-ui';
import { useRouter } from 'vitepress';
import { computed, ref } from 'vue';
import { useArticleData } from '../hooks/useArticleData';
import { handleTagsData } from '../utils/client/tags';

const router = useRouter();
const { articleData } = useArticleData();
const tagsData = computed(() => {
  return handleTagsData(articleData.value);
});
const params = useUrlSearchParams();
const selectTag = ref(params.tag);
const currentArticle = computed(() => {
  return tagsData.value.find(item => item.name === selectTag.value || '')?.articles || [];
});

function toggleTag(tag: string) {
  selectTag.value = tag;
  params.tag = tag;
}
</script>

<template>
  <div class="VSPage">
    <div class="VSContent">
      <div class="tags-wrapper">
        <span
          v-for="(tag) in tagsData"
          :key="tag.name"
          class="tag"
          @click="() => toggleTag(tag.name)"
        >
          {{ tag.name }} <strong>({{ tag.count }})</strong>
        </span>
      </div>
      <div class="tag-header">
        {{ selectTag }}
      </div>

      <n-list
        :hoverable="true"
        :clickable="true"
        :show-divider="false"
      >
        <n-list-item
          v-for="(article) in currentArticle"
          :key="article.path"
          @click="router.go(article.path)"
        >
          <n-thing :title="article.title" :title-extra="article.date" :description="article.description" />
        </n-list-item>
      </n-list>
    </div>
  </div>
  <!-- <a
    v-for="(article, index) in selectTag ? data[selectTag] : []"
    :key="index"
    :href="withBase(article.path)"
    class="posts"
  >
    <div class="post-container">
      <div class="post-dot" />
      {{ article.title }}
    </div>
    <div class="date">{{ article.date }}</div>
  </a> -->
</template>

<style scoped lang="scss">
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
:deep(.n-list) {
  background-color: #00000000;
  // --n-border-color: var(--vp-c-text-3);
  .n-thing-main {
    .n-thing-header__title {
      color: var(--vp-c-text-1);
    }
    .n-thing-header__extra {
      color: var(--vp-c-text-1);
    }
    .n-thing-main__description {
      color: var(--vp-c-text-2);
    }
  }
  .n-list-item {
    border-color: var(--vp-c-text-3) !important;
  }
  .n-list-item:hover {
    background-color: var(--vp-c-bg-alt) !important;
  }
}
</style>
