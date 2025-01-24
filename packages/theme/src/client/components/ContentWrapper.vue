<script lang="ts" setup>
import { useImagePreview } from '../hooks/useImagePreview';

const props = defineProps<{
  imgsStr: string
}>();
const classes = { 'slide-enter-content': !((import.meta as any).env.DEV) };
const imgs = props.imgsStr.split(',');
const { $images } = useImagePreview();
$images.set(imgs);
</script>

<template>
  <div class="vm-content-wrapper" :class="classes">
    <slot />
  </div>
</template>
