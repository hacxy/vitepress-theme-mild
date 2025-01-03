<script lang="ts" setup>
import type { ArticlesData } from '../datas/articles.data.js';
import { NIcon, NList, NListItem, NSpace, NTag, NThing, NTime } from 'naive-ui';
import { useRouter } from 'vitepress';
import IconCalendar from './icons/IconCalendar.vue';
import IconClock from './icons/IconClock.vue';
import IconWords from './icons/IconWords.vue';

const props = defineProps<{ listData: ArticlesData[], title?: string }>();
const router = useRouter();
</script>

<template>
  <div class="VMListWrapper">
    <NList
      :hoverable="true"
      :clickable="true"
      :show-divider="false"
    >
      <template v-if="props.title" #header>
        <div v-motion-slide-visible-left>
          {{ props.title }}
        </div>
      </template>

      <template v-if="props.listData">
        <NListItem
          v-for="(article, index) in props.listData"
          :key="article.path"
          v-motion
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
          @click="router.go(article.path)"
        >
          <NThing
            :title="article.title"
            :description="article.description"
          >
            <div class="VMArticleInfo">
              <div class="VMArticleInfoLeft">
                <div class="text">
                  <IconCalendar />
                  <span>
                    <NTime :time="article.date" format="yyyy-MM-dd" />
                  </span>
                </div>
                <div class="text">
                  <IconWords />
                  {{ article.words }} words
                </div>
                <div class="text">
                  <IconClock />
                  {{ article.minutes }} min
                </div>
              </div>
              <div class="VMArticleInfoRight">
                <NSpace>
                  <NTag
                    v-for="tag in article.tags"
                    :key="tag"
                    size="tiny"
                    :bordered="false"
                  >
                    {{ tag }}
                  </NTag>
                  <div v-if="article.category" class="VMArticleCategory">
                    <NIcon>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                      ><path fill="currentColor" fill-rule="evenodd" d="M4 4h5v5H4zm-2 7V2h9v9zm2 4h5v5H4zm-2 7v-9h9v9zM20 4h-5v5h5zm-7-2v9h9V2zm2 13h5v5h-5zm-2 7v-9h9v9z" /></svg>
                    </NIcon>
                    {{ article.category }}
                  </div>
                </NSpace>
              </div>
            </div>
          </NThing>
        </NListItem>
      </template>
      <template v-else>
        <div class="VMEmpty">
          暂无文章...
        </div>
      </template>
    </NList>
  </div>
</template>

<style lang="scss" scoped>
.VMListWrapper {
  .VMArticleInfo {
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
    .VMArticleInfoLeft {
      display: flex;
      align-items: center;
      font-size: 13px;
      color: var(--vp-c-text-3);
      .text {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 24px;
        vertical-align: middle;
        svg {
          display: block;
          justify-content: center;
          align-items: center;
          font-size: 13px;
          margin-right: 3px;
          height: 100%;
        }
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
    }
    .VMArticleInfoRight {
      .VMArticleCategory {
        display: flex;
        align-items: center;
        color: var(--vp-c-text-2);
        font-style: italic;
        :deep(.n-icon) {
          margin-right: 4px;
        }
      }
      :deep(.n-tag) {
        background-color: var(--vp-c-brand-1);
        color: var(--vp-c-default-1);
      }
    }
  }
  .VMEmpty {
    color: var(--vp-c-text-2);
    text-align: center;
  }
}
:deep(.n-list) {
  .n-list__header {
    color: var(--vp-c-text-1);
    font-weight: 800;
    font-size: 2.25em;
    border-color: var(--vp-c-text-3);
    margin-bottom: 15px;
  }
  background-color: #00000000;
  // --n-border-color: var(--vp-c-text-3);
  .n-thing-main {
    .n-thing-main__content {
      margin-top: 4px;
    }
    .n-thing-header__title {
      color: var(--vp-c-text-1);
      font-size: 1.15rem;
    }
    .n-thing-header__extra {
      color: var(--vp-c-text-1);
      font-style: italic;
    }

    .n-thing-main__description {
      color: var(--vp-c-text-2);
    }
  }
  .n-list-item {
    border-color: var(--vp-c-text-3) !important;
    margin-bottom: 10px;
  }
  .n-list-item:hover {
    background-color: var(--vp-c-bg-alt) !important;
  }
}
</style>
