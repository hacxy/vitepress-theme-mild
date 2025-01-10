<!-- https://giscus.app/zh-CN -->
<script lang="ts" setup>
import Giscus from '@giscus/vue';
import { useData, useRoute } from 'vitepress';
import { nextTick, onMounted, ref, watch } from 'vue';

const show = ref(false);
const route = useRoute();
const { theme, isDark } = useData();
const commentTheme = ref();
watch(route, () => {
  show.value = false;
  nextTick(() => {
    show.value = true;
  });
});

function handleSwitchTheme() {
  if (isDark.value) {
    commentTheme.value = theme.value?.comment?.darkTheme;
  }
  else {
    commentTheme.value = theme.value?.comment?.lightTheme;
  }
}
watch(isDark, () => {
  handleSwitchTheme();
});
onMounted(() => {
  show.value = true;
  handleSwitchTheme();
});
</script>

<template>
  <div v-if="show && theme?.comment" class="VMComment">
    <Giscus
      v-bind="theme?.comment"
      :theme="commentTheme"
    />
  </div>
</template>

<style lang="scss" scoped>
.VMComment {
  margin-top: 30px;
}
</style>
