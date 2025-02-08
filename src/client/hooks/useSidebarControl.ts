import type { DefaultTheme } from 'vitepress';
import type { ComputedRef, Ref } from 'vue';
import { useData } from 'vitepress';
import { computed, onMounted, ref, watch, watchEffect, watchPostEffect } from 'vue';
import { hasActiveLink as containsActiveLink } from '../utils/client/common';

import { isActive } from '../utils/common';

export interface SidebarControl {
  collapsed: Ref<boolean>
  collapsible: ComputedRef<boolean>
  isLink: ComputedRef<boolean>
  isActiveLink: Ref<boolean>
  hasActiveLink: ComputedRef<boolean>
  hasChildren: ComputedRef<boolean>
  toggle: () => void
}

export function useSidebarControl(
  item: ComputedRef<DefaultTheme.SidebarItem>
): SidebarControl {
  const { page, hash } = useData();
  const collapsed = ref(false);

  const collapsible = computed(() => {
    return item.value.collapsed !== undefined;
  });

  const isLink = computed(() => {
    return !!item.value.link;
  });

  const isActiveLink = ref(false);
  const updateIsActiveLink = () => {
    isActiveLink.value = isActive(page.value.relativePath, item.value.link);
  };

  watch([page, item, hash], updateIsActiveLink);
  onMounted(updateIsActiveLink);

  const hasActiveLink = computed(() => {
    if (isActiveLink.value) {
      return true;
    }

    return item.value.items
      ? containsActiveLink(page.value.relativePath, item.value.items)
      : false;
  });

  const hasChildren = computed(() => {
    return !!(item.value.items && item.value.items.length);
  });

  watchEffect(() => {
    collapsed.value = !!(collapsible.value && item.value.collapsed);
  });

  watchPostEffect(() => {
    ;(isActiveLink.value || hasActiveLink.value) && (collapsed.value = false);
  });

  function toggle() {
    if (collapsible.value) {
      collapsed.value = !collapsed.value;
    }
  }

  return {
    collapsed,
    collapsible,
    isLink,
    isActiveLink,
    hasActiveLink,
    hasChildren,
    toggle
  };
}
