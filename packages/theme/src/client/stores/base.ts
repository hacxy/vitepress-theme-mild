import type { ArticlesData } from '../datas/base.data';
import { defineStore } from 'pinia';

interface baseStore {
  autoSidebar: any
  articleList: ArticlesData[]
}

export const useBaseStore = defineStore('baseData', {
  state: (): baseStore => {
    return {
      autoSidebar: {},
      articleList: []
    };
  },
});

