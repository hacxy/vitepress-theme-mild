<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useSize } from '../hooks/useSize';

interface Props {
  /**
   * aid
   */
  aid?: string
  /**
   * bvid
   */
  bvid?: string
  /**
   * cid
   */
  cid?: string
  /**
   * 是否开启自动播放
   */
  autoplay?: boolean
  /**
   * 指定播放时间
   */
  time?: number | string
  /**
   * 指定视频分p
   */
  page?: number
  /**
   * 宽度
   */
  width?: number
  /**
   * 高度
   */
  height?: number
  /**
   * 尺寸比例
   */
  ratio?: number

  /**
   * 是否展示封面
   * @default true
   */
  poster?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  ratio: 16 / 9,
  poster: true
});

const VIDEO_LINK = 'https://player.bilibili.com/player.html';
const { el, width, height, resize } = useSize<HTMLIFrameElement>(props);
const loaded = ref(false);

const videoLink = computed(() => {
  const { aid, bvid, cid, autoplay, time, page, poster } = props;

  return aid && cid
    ? `${VIDEO_LINK}?aid=${aid}&cid=${cid}&t=${time}&autoplay=${
      autoplay ? 1 : 0
    }&p=${page}&poster=${poster ? 1 : 0}`
    : bvid
      ? `${VIDEO_LINK}?bvid=${bvid}&t=${time}&autoplay=${autoplay ? 1 : 0}&poster=${poster ? 1 : 0}`
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
