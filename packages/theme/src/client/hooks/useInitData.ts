import type { NProgress } from 'nprogress';
import { inject } from 'vue';
import { data } from '../datas/base.data';
import { useBaseStore } from '../stores/base';

export function useInitData() {
  const np = inject<NProgress>('progress');
  const baseStore = useBaseStore();
  baseStore.autoSidebar = data.autoSidebar;
  baseStore.articleList = data.list;

  return {
    np
  };
}
