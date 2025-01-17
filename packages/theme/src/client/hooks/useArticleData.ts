import { useRoute } from 'vitepress';
import { onMounted, ref, watchEffect } from 'vue';
import { data } from '../datas/base.data';

export function useArticleData() {
  const articleData = ref(data?.list || []);
  const docsHeaderInfo = ref<{ words: number, minutes: number, date: number }>();
  const route = useRoute();

  onMounted(() => {
    articleData.value = data.list;
  });

  watchEffect(() => {
    docsHeaderInfo.value = articleData.value.find(item => route.path === item.path);
  });

  return {
    articleData,
    docsHeaderInfo
  };
}

