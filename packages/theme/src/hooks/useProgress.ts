import type { NProgress as NP } from 'nprogress';
import NProgress from 'nprogress';
import { ref } from 'vue';

export function useProgress() {
  const np = ref<NP>(NProgress);
  np.value.configure({ showSpinner: false, speed: 500 });
  return {
    np
  };
}
