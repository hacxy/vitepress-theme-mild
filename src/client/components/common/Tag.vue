<script lang="ts" setup>
interface Props {
  text: string
}
defineProps<Props>();
</script>

<template>
  <span class="VPTTag">
    {{ text }}
  </span>
</template>

<style lang="scss" scoped>
.VPTTag {
  font-size: 12px;
  line-height: 26px;
  background-color: var(--vpt-bg-opacity);
  border-radius: 6px;
  padding: 0 12px;
  box-sizing: border-box;
  margin-right: 12px;
  margin-bottom: 12px;
}
</style>
