<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useSize } from '../hooks/useSize';

const props = defineProps<{
  aid?: string
  bvid?: string
  cid?: string
  autoplay?: boolean
  time?: number
  page?: number
  width?: number
  height?: number
  ratio?: number
}>();

const VIDEO_LINK = 'https://player.bilibili.com/player.html';
const { el, width, height, resize } = useSize<HTMLIFrameElement>(props);
const loaded = ref(false);

const videoLink = computed(() => {
  const { aid, bvid, cid, autoplay, time, page } = props;

  return aid && cid
    ? `${VIDEO_LINK}?aid=${aid}&cid=${cid}&t=${time}&autoplay=${
      autoplay ? 1 : 0
    }&p=${page}`
    : bvid
      ? `${VIDEO_LINK}?bvid=${bvid}&t=${time}&autoplay=${autoplay ? 1 : 0}`
      : '';
});

function handleLoad() {
  loaded.value = true;
  resize();
}
</script>

<template>
  <iframe
    ref="el"
    class="bili-iframe"
    :src="videoLink"
    :style="{ width, height }"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
    @load="handleLoad"
  />
</template>

<style lang="scss" scoped>
.bili-iframe {
  border-radius: 8px;
  border: none;
  background-color: #000;
  transition: all 0.3s;
}
</style>
