<script lang="ts" setup>
const classes = { 'slide-enter-content': !((import.meta as any).env.DEV) };
</script>

<template>
  <div class="vm-content-wrapper" :class="classes">
    <slot />
  </div>
</template>
