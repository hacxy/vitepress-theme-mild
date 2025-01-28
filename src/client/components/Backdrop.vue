<script lang="ts" setup>
import { useSidebar } from '../hooks/useSidebar';

const { isOpen, close } = useSidebar();
</script>

<template>
  <transition name="fade">
    <div v-if="isOpen" class="VPBackdrop" @click="close()" />
  </transition>
</template>

<style scoped lang="scss">
.VPBackdrop {
  position: fixed;
  top: 0;
  /*rtl:ignore*/
  right: 0;
  bottom: 0;
  /*rtl:ignore*/
  left: 0;
  z-index: var(--vp-z-index-backdrop);
  background: var(--vp-backdrop-bg-color);
  transition: opacity 0.5s;
}

.VPBackdrop.fade-enter-from,
.VPBackdrop.fade-leave-to {
  opacity: 0;
}

.VPBackdrop.fade-leave-active {
  transition-duration: 0.25s;
}

@media (min-width: 1280px) {
  .VPBackdrop {
    display: none;
  }
}
</style>
