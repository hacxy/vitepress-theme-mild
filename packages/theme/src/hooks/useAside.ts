import { useMediaQuery } from '@vueuse/core';
import { computed } from 'vue';
import { useSidebarStore } from '../stores/sidebar';

export function useAside() {
  const sidebarStore = useSidebarStore();
  const is960 = useMediaQuery('(min-width: 960px)');
  const is1280 = useMediaQuery('(min-width: 1280px)');

  const isAsideEnabled = computed(() => {
    if (!is1280.value && !is960.value) {
      return false;
    }

    return sidebarStore.hasSidebar ? is1280.value : is960.value;
  });

  return {
    isAsideEnabled
  };
}
