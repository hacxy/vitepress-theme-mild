<script setup lang="ts">
import VueEaseLightBox from 'vue-easy-lightbox';
import { useImagePreview } from '../hooks/useImagePreview';

const { visible, hide, currentIndex, imgs } = useImagePreview();
</script>

<template>
  <VueEaseLightBox
    move-disabled
    loop
    :imgs="imgs"
    :visible="visible"
    :index="currentIndex"
    @hide="hide"
  />
</template>
