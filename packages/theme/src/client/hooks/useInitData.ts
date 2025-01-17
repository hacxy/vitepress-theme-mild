import type { NProgress } from 'nprogress';
import { inject, provide } from 'vue';
import { data } from '../datas/base.data';

export function useInitData() {
  const np = inject<NProgress>('progress');
  provide('baseData', data);
  return {
    np
  };
}
