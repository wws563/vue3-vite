<!-- <script setup lang="ts">
</script> -->

<template>
  <div>
    <indexPage></indexPage>
  </div>
</template>

<script lang="ts" setup>
import indexPage from '@/view/index.vue';
</script>
<style scoped lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.testscss {
  color: black;
  p {
    color: red;
  }
}
</style>
