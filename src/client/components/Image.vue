<script setup lang="ts">
import { useImagePreview } from "../hooks/useImagePreview";

const props = defineProps<{
  src: string;
  alt: string;
  index: string | number;
}>();
const idx = Number(props.index);
const { show } = useImagePreview();
</script>

<template>
  <img class="VMImage" :src="src" :alt="alt" @click="show(idx)" />
</template>

<style lang="scss" scoped>
.VMImage {
  cursor: pointer;
}
</style>
