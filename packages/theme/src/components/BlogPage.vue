<script lang="ts" setup>
import ArticlesList from './ArticlesList.vue';
</script>

<template>
  <div class="articles-list-wrapper">
    <articles-list />
  </div>
</template>

<style lang="scss" scoped>
.articles-list-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    padding: 0 32px 15px;
  }

  @media (min-width: 601px) and (max-width: 1024px) {
    padding: 0 64px 15px;
  }
}
</style>
