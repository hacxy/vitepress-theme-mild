<script setup lang="ts">
import { useData, useRoute } from 'vitepress';
import VPBackdrop from 'vitepress/dist/client/theme-default/components/VPBackdrop.vue';
import VPNav from 'vitepress/dist/client/theme-default/components/VPNav.vue';
import VPSkipLink from 'vitepress/dist/client/theme-default/components/VPSkipLink.vue';
import { computed, nextTick, provide, useSlots, watch } from 'vue';
import Content from './components/Content.vue';
import VMFooter from './components/Footer.vue';
import LocalNav from './components/LocalNav.vue';
import Sidebar from './components/Sidebar.vue';
import { useCloseSidebarOnEscape, useSidebar } from './hooks/useSidebar';

import('virtual:group-icons.css');

const {
  isOpen: isSidebarOpen,
  open: openSidebar,
  close: closeSidebar
} = useSidebar();

const route = useRoute();
watch(() => route.path, closeSidebar);

useCloseSidebarOnEscape(isSidebarOpen, closeSidebar);

const { frontmatter, isDark } = useData();

const slots = useSlots();
const heroImageSlotExists = computed(() => !!slots['home-hero-image']);

provide('hero-image-slot-exists', heroImageSlotExists);

//  ---------- transition start
function enableTransitions() {
  return 'startViewTransition' in document
    && window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
}

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value;
    return;
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ];

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  );
});
//  ---------- transition end
</script>

<template>
  <div v-if="frontmatter.layout !== false" class="Layout VMLayout" :class="frontmatter.pageClass">
    <slot name="layout-top" />
    <VPSkipLink />
    <VPBackdrop class="backdrop" :show="isSidebarOpen" @click="closeSidebar" />
    <VPNav>
      <template #nav-bar-title-before>
        <slot name="nav-bar-title-before" />
      </template>
      <template #nav-bar-title-after>
        <slot name="nav-bar-title-after" />
      </template>
      <template #nav-bar-content-before>
        <slot name="nav-bar-content-before" />
      </template>
      <template #nav-bar-content-after>
        <slot name="nav-bar-content-after" />
      </template>
      <template #nav-screen-content-before>
        <slot name="nav-screen-content-before" />
      </template>
      <template #nav-screen-content-after>
        <slot name="nav-screen-content-after" />
      </template>
    </VPNav>
    <LocalNav :open="isSidebarOpen" @open-menu="openSidebar" />

    <Sidebar :open="isSidebarOpen">
      <template #sidebar-nav-before>
        <slot name="sidebar-nav-before" />
      </template>
      <template #sidebar-nav-after>
        <slot name="sidebar-nav-after" />
      </template>
    </Sidebar>

    <content>
      <template #page-top>
        <slot name="page-top" />
      </template>
      <template #page-bottom>
        <slot name="page-bottom" />
      </template>

      <template #not-found>
        <slot name="not-found" />
      </template>
      <template #home-hero-before>
        <slot name="home-hero-before" />
      </template>
      <template #home-hero-info-before>
        <slot name="home-hero-info-before" />
      </template>
      <template #home-hero-info>
        <slot name="home-hero-info" />
      </template>
      <template #home-hero-info-after>
        <slot name="home-hero-info-after" />
      </template>
      <template #home-hero-actions-after>
        <slot name="home-hero-actions-after" />
      </template>
      <template #home-hero-image>
        <slot name="home-hero-image" />
      </template>
      <template #home-hero-after>
        <slot name="home-hero-after" />
      </template>
      <template #home-features-before>
        <slot name="home-features-before" />
      </template>
      <template #home-features-after>
        <slot name="home-features-after" />
      </template>

      <template #doc-footer-before>
        <slot name="doc-footer-before" />
      </template>
      <template #doc-before>
        <slot name="doc-before" />
      </template>
      <template #doc-after>
        <slot name="doc-after" />
      </template>
      <template #doc-top>
        <slot name="doc-top" />
      </template>
      <template #doc-bottom>
        <slot name="doc-bottom" />
      </template>

      <template #aside-top>
        <slot name="aside-top" />
      </template>
      <template #aside-bottom>
        <slot name="aside-bottom" />
      </template>
      <template #aside-outline-before>
        <slot name="aside-outline-before" />
      </template>
      <template #aside-outline-after>
        <slot name="aside-outline-after" />
      </template>
      <template #aside-ads-before>
        <slot name="aside-ads-before" />
      </template>
      <template #aside-ads-after>
        <slot name="aside-ads-after" />
      </template>
    </content>

    <VMFooter />
    <slot name="layout-bottom" />
  </div>
  <content v-else />
</template>

<style scoped lang="scss">
.Layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
