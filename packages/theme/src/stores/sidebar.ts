import { defineStore } from 'pinia';

interface SidebarStore { hasSidebar: boolean, hasAside: boolean, leftAside: boolean, isOpen: boolean, sidebar: any[], sidebarGroups: any[] }

export const useSidebarStore = defineStore('sidebar', {
  state: (): SidebarStore => {
    return {
      hasSidebar: false,
      hasAside: false,
      leftAside: false,
      isOpen: false,
      sidebar: [],
      sidebarGroups: []
    };
  },
  actions: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    toggle() {
      this.isOpen ? this.open() : this.close();
    },
  }
});

