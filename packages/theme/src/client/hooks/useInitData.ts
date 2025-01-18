import type { NProgress } from 'nprogress';
import { inject } from 'vue';
import { data } from '../datas/base.data';
import { $articleList } from '../store/article';
import { $autoSidebar } from '../store/sidebar';

export function useInitData() {
  const np = inject<NProgress>('progress');
  $autoSidebar.set(data.autoSidebar);
  $articleList.set(data.list);
  // provide('baseData', data);
  return {
    np
  };
}
