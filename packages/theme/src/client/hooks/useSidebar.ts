import { useMediaQuery } from '@vueuse/core';
import { isEqual } from 'lodash';
import { useData } from 'vitepress';
import { computed, onMounted, onUnmounted, watchEffect } from 'vue';
import { useSidebarStore } from '../stores/sidebar';
import { getSidebar, getSidebarGroups } from '../utils/client/sidebar';

export function useSidebar() {
  const { frontmatter, page, theme } = useData();
  const sidebarStore = useSidebarStore();
  const is960 = useMediaQuery('(min-width: 960px)');

  watchEffect(() => {
    const sidebarConfig = theme.value.sidebar;
    const relativePath = page.value.relativePath;
    const sidebar = sidebarConfig ? getSidebar(sidebarConfig, relativePath) : [];
    if (!(isEqual(sidebarStore.sidebar, sidebar))) {
      sidebarStore.sidebar = sidebar;
    }
  });
  watchEffect(() => {
    sidebarStore.hasSidebar = frontmatter.value.sidebar !== false
    && sidebarStore.sidebar.length > 0
    && frontmatter.value.layout !== 'home';
  });

  watchEffect(() => {
    if (frontmatter.value.layout === 'home')
      sidebarStore.hasAside = false;
    if (frontmatter.value.aside !== undefined && frontmatter.value.aside !== null)
      sidebarStore.hasAside = !!frontmatter.value.aside;

    sidebarStore.hasAside = theme.value.aside !== false;
  });

  watchEffect(() => {
    if (sidebarStore.hasAside) {
      sidebarStore.leftAside = frontmatter.value.aside === null
        ? theme.value.aside === 'left'
        : frontmatter.value.aside === 'left';
    }
    sidebarStore.leftAside = false;
  });

  const isSidebarEnabled = computed(() => sidebarStore.hasSidebar && is960.value);

  watchEffect(() => {
    sidebarStore.sidebarGroups = sidebarStore.hasSidebar ? getSidebarGroups(sidebarStore.sidebar) : [];
  });

  return {
    isSidebarEnabled,
  };
}

export function useCloseSidebarOnEscape() {
  let triggerElement: HTMLButtonElement | undefined;
  const sidebarStore = useSidebarStore();
  watchEffect(() => {
    triggerElement = sidebarStore.isOpen
      ? (document.activeElement as HTMLButtonElement)
      : undefined;
  });

  onMounted(() => {
    window.addEventListener('keyup', onEscape);
  });

  onUnmounted(() => {
    window.removeEventListener('keyup', onEscape);
  });

  function onEscape(e: KeyboardEvent) {
    if (e.key === 'Escape' && sidebarStore.isOpen) {
      sidebarStore.close();
      triggerElement?.focus();
    }
  }
}

