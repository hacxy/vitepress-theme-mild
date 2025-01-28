import { useMediaQuery } from '@vueuse/core';
import { useData } from 'vitepress';
import { computed, onMounted, onUnmounted, ref, watch, watchEffect } from 'vue';
import { NOT_ARTICLE_LAYOUTS } from '../../shared/constants';
import { useAutoSidebarStore } from '../store/sidebar';
import { getSidebar, getSidebarGroups } from '../utils/client/sidebar';

export function useSidebar() {
  const { frontmatter, page, theme } = useData();
  const is960 = useMediaQuery('(min-width: 960px)');
  const { autoSidebar } = useAutoSidebarStore();
  const isOpen = ref(false);
  const _sidebar = computed(() => {
    const sidebarConfig = theme.value.sidebar;
    const relativePath = page.value.relativePath;
    return sidebarConfig ? getSidebar(sidebarConfig, relativePath, autoSidebar.value) : [];
  });

  const sidebar = ref(_sidebar.value);

  watch(_sidebar, (next, prev) => {
    if (JSON.stringify(next) !== JSON.stringify(prev))
      sidebar.value = _sidebar.value;
  });

  const hasSidebar = computed(() => {
    return (
      frontmatter.value.sidebar !== false
      && sidebar.value.length > 0
      && frontmatter.value.layout !== 'home'
    );
  });

  const hasAside = computed(() => {
    if (NOT_ARTICLE_LAYOUTS.includes(frontmatter.value.layout)) {
      return false;
    }
    if (frontmatter.value.aside !== undefined && frontmatter.value.aside !== null)
      return !!frontmatter.value.aside;

    return theme.value.aside !== false;
  });

  const leftAside = computed(() => {
    if (hasAside) {
      return frontmatter.value.aside === null
        ? theme.value.aside === 'left'
        : frontmatter.value.aside === 'left';
    }
    return false;
  });

  const isSidebarEnabled = computed(() => hasSidebar.value && is960.value);

  const sidebarGroups = computed(() => {
    return hasSidebar.value ? getSidebarGroups(sidebar.value) : [];
  });

  function open() {
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
  }

  function toggle() {
    isOpen.value ? close() : open();
  }

  return {
    isOpen,
    sidebar,
    sidebarGroups,
    hasSidebar,
    hasAside,
    leftAside,
    isSidebarEnabled,
    open,
    close,
    toggle
  };
}

export function useCloseSidebarOnEscape() {
  let triggerElement: HTMLButtonElement | undefined;
  const { isOpen, close } = useSidebar();

  watchEffect(() => {
    triggerElement = isOpen.value
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
    if (e.key === 'Escape' && isOpen.value) {
      close();
      triggerElement?.focus();
    }
  }
}

