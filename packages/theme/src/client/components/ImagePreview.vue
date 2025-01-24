<script setup lang="ts">
import VueEaseLightBox from 'vue-easy-lightbox';
import { useImagePreview } from '../hooks/useImagePreview';

const { visible, hide, currentIndex, images } = useImagePreview();
</script>

<template>
  <VueEaseLightBox
    move-disabled
    loop
    :imgs="images"
    :visible="visible"
    :index="currentIndex"
    @hide="hide"
  />
</template>
