import { useStore } from '@nanostores/vue';
import { atom } from 'nanostores';

export const $autoSidebar = atom<any>({});

export function useAutoSidebarStore() {
  const autoSidebar = useStore($autoSidebar);
  return {
    autoSidebar
  };
}
