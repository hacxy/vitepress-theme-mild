import { useMediaQuery } from '@vueuse/core';
import { isEqual } from 'lodash';
import { useData } from 'vitepress';
import { computed, onMounted, onUnmounted, watch, watchEffect } from 'vue';
import { useSidebarStore } from '../stores/sidebar';
import { getSidebar, getSidebarGroups } from '../utils/client/sidebar';

export function useSidebar() {
  const { frontmatter, page, theme } = useData();
  const sidebarStore = useSidebarStore();
  const is960 = useMediaQuery('(min-width: 960px)');
  // const isOpen = ref(false);

  const _sidebar = computed(() => {
    const sidebarConfig = theme.value.sidebar;
    const relativePath = page.value.relativePath;
    return sidebarConfig ? getSidebar(sidebarConfig, relativePath) : [];
  });

  if (!(isEqual(sidebarStore.sidebar, _sidebar.value))) {
    sidebarStore.sidebar = _sidebar.value;
  }

  watch(_sidebar, (next, prev) => {
    if (JSON.stringify(next) !== JSON.stringify(prev)) {
      if (!(isEqual(sidebarStore.sidebar, _sidebar.value))) {
        sidebarStore.sidebar = _sidebar.value;
      }
    }
  });

  const hasSidebar = computed(() => {
    return (
      frontmatter.value.sidebar !== false
      && sidebarStore.sidebar.length > 0
      && frontmatter.value.layout !== 'home'
    );
  });

  sidebarStore.hasSidebar = hasSidebar.value;

  const hasAside = computed(() => {
    if (frontmatter.value.layout === 'home')
      return false;
    if (frontmatter.value.aside !== undefined && frontmatter.value.aside !== null)
      return !!frontmatter.value.aside;

    return theme.value.aside !== false;
  });

  sidebarStore.hasAside = hasAside.value;

  const leftAside = computed(() => {
    if (hasAside) {
      return frontmatter.value.aside === null
        ? theme.value.aside === 'left'
        : frontmatter.value.aside === 'left';
    }
    return false;
  });

  sidebarStore.leftAside = leftAside.value;

  const isSidebarEnabled = computed(() => sidebarStore.hasSidebar && is960.value);

  const sidebarGroups = computed(() => {
    return sidebarStore.hasSidebar ? getSidebarGroups(sidebarStore.sidebar) : [];
  });
  sidebarStore.sidebarGroups = sidebarGroups.value;
  return {
    // isOpen,
    // sidebar,
    sidebarGroups,
    hasSidebar,
    hasAside,
    leftAside,
    isSidebarEnabled,
    open,
    close,
    // toggle
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

