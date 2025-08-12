<script lang="ts" setup>
import { isBoolean, isPlainObject } from '@hacxy/utils';
import { onMounted, ref } from 'vue';
import { useThemeConfig } from '../hooks/useThemeConfig';

const themeConfig = useThemeConfig();
const wrapperRef = ref<HTMLDivElement>();

onMounted(() => {
  wrapperRef.value?.style.setProperty('--enter-step', `${themeConfig.docContentSlideEnter?.delay || 150}ms`);
});

const classes = { 'slide-enter-content': !((import.meta as any).env.DEV) };
if (isBoolean(themeConfig.docContentSlideEnter?.enable)) {
  classes['slide-enter-content'] = themeConfig.docContentSlideEnter?.enable;
}
else if (isPlainObject(themeConfig.docContentSlideEnter?.enable)) {
  if (import.meta.env.DEV) {
    classes['slide-enter-content'] = themeConfig.docContentSlideEnter?.enable.development;
  }
  if (import.meta.env.PROD) {
    classes['slide-enter-content'] = themeConfig.docContentSlideEnter?.enable.production;
  }
}
</script>

<template>
  <div ref="wrapperRef" class="vm-content-wrapper" :class="classes">
    <slot />
  </div>
</template>
