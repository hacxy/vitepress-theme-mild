import type { NProgress as NP, NProgressOptions } from 'nprogress';
import NProgress from 'nprogress';
import { ref } from 'vue';

export function useProgress(config?: Partial<NProgressOptions>) {
  const defaultConfig: Partial<NProgressOptions> = { showSpinner: false, speed: 500 };
  const finalConfig = Object.assign(defaultConfig, config);
  const np = ref<NP>(NProgress);
  np.value.configure(finalConfig);
  return {
    np
  };
}
