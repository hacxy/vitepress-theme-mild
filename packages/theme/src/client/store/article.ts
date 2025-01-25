import type { ArticlesData } from '../datas/base.data';
import { useStore } from '@nanostores/vue';
import { atom } from 'nanostores';
import { useRoute } from 'vitepress';
import { computed } from 'vue';

export const $articleList = atom<ArticlesData[]>([]);

export function useArticleListStore() {
  const articleList = useStore($articleList);
  const route = useRoute();
  const currentArticle = computed(() => {
    return articleList.value.find(item => item.path === route.path);
  });

  return {
    currentArticle,
    articleList
  };
}
