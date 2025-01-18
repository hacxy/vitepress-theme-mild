import type { ArticlesData } from '../datas/base.data';
import { useStore } from '@nanostores/vue';
import { atom } from 'nanostores';

export const $articleList = atom<ArticlesData[]>([]);

export function useArticleListStore() {
  const articleList = useStore($articleList);
  return {
    articleList
  };
}
