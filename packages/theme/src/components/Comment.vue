<!-- https://giscus.app/zh-CN -->
<script lang="ts" setup>
import Giscus from '@giscus/vue';
import { useData, useRoute } from 'vitepress';
import { nextTick, onMounted, ref, watch } from 'vue';

const show = ref(false);
const route = useRoute();
const { theme } = useData();

watch(route, () => {
  show.value = false;
  nextTick(() => {
    show.value = true;
  });
});
onMounted(() => {
  show.value = true;
});
</script>

<template>
  <div v-if="show && theme?.comment" class="VMComment">
    <Giscus
      v-bind="theme?.comment"
    />
  </div>
</template>

<style lang="scss" scoped>
.VMComment {
  margin-top: 30px;
}
</style>
