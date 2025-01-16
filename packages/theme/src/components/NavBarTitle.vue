<script setup lang="ts">
import { useData } from 'vitepress';
import VPImage from 'vitepress/dist/client/theme-default/components/VPImage.vue';
import { computed } from 'vue';
import { useLangs } from '../hooks/useLangs';
import { useSidebarStore } from '../stores/sidebar';
import { normalizeLink } from '../utils/shared';

const { site, theme } = useData();
const { currentLang } = useLangs();
const sidebarStore = useSidebarStore();

const link = computed(() =>
  typeof theme.value.logoLink === 'string'
    ? theme.value.logoLink
    : theme.value.logoLink?.link
);

const rel = computed(() =>
  typeof theme.value.logoLink === 'string'
    ? undefined
    : theme.value.logoLink?.rel
);

const target = computed(() =>
  typeof theme.value.logoLink === 'string'
    ? undefined
    : theme.value.logoLink?.target
);
</script>

<template>
  <div class="VPNavBarTitle" :class="{ 'has-sidebar': sidebarStore.hasSidebar }">
    <a
      class="title"
      :href="link ?? normalizeLink(currentLang.link)"
      :rel="rel"
      :target="target"
    >
      <slot name="nav-bar-title-before" />
      <VPImage v-if="theme.logo" class="logo" :image="theme.logo" />
      <span v-if="theme.siteTitle" v-html="theme.siteTitle" />
      <span v-else-if="theme.siteTitle === undefined">{{ site.title }}</span>
      <slot name="nav-bar-title-after" />
    </a>
  </div>
</template>

<style scoped lang="scss">
.title {
  display: flex;
  align-items: center;
  border-bottom: 1px solid transparent;
  width: 100%;
  height: var(--vp-nav-height);
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: opacity 0.25s;
}

@media (min-width: 960px) {
  .title {
    flex-shrink: 0;
  }

  .VPNavBarTitle.has-sidebar .title {
    border-bottom-color: var(--vp-c-divider);
  }
}

:deep(.logo) {
  margin-right: 8px;
  height: var(--vp-nav-logo-height);
}
</style>
