<script lang="ts" setup>
import { NTime } from 'naive-ui';
import { useRoute } from 'vitepress';
import { ref, watchEffect } from 'vue';
import { useArticleListStore } from '../store/article';
import IconCalendar from './icons/IconCalendar.vue';
import IconClock from './icons/IconClock.vue';
import IconWords from './icons/IconWords.vue';

const { articleList } = useArticleListStore();
const docsHeaderInfo = ref<{ words: number, minutes: number, date: number }>();
const route = useRoute();

watchEffect(() => {
  docsHeaderInfo.value = articleList.value.find((item: any) => route.path === item.path);
});
</script>

<template>
  <div class="VMDocsHeaderInfo">
    <div class="info">
      <IconCalendar />
      <NTime :time="docsHeaderInfo?.date" format="yyyy-MM-dd" />
    </div>
    <div class="info">
      <IconWords />
      <div>{{ docsHeaderInfo?.words }} words</div>
    </div>
    <div class="info">
      <IconClock />
      <div>{{ docsHeaderInfo?.minutes }} min</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.VMDocsHeaderInfo {
  display: flex;
  align-items: center;
  margin-top: 6px;
  flex-wrap: wrap;
  .info {
    display: flex;
    align-items: center;
    margin-right: 16px;
    font-size: 14px;
    color: var(--vp-c-text-2);
    svg {
      margin-right: 3px;
    }
  }
}
</style>
