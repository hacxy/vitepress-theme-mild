import { onMounted, ref } from 'vue';
import { data } from '../datas/articles.data';

export function useArticleData() {
  const articleData = ref(data || []);

  onMounted(() => {
    articleData.value = data;
  });

  return {
    articleData
  };
}
