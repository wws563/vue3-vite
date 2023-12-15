<template>
  <div>
    <div class="header">hahaha</div>
    <div class="left">wx专属</div>
  </div>
</template>

<script setup lang="ts">
// DEMO:使用pinia
import { useStore } from '@/store/main.ts';
const store = useStore();
let { name } = store;
console.log(name);
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 100vh;

  @include respond-to(phone) {
    height: 100px;
  }

  @include respond-to(pc) {
    height: 200px;
  }

  background-color: rgb(91, 67, 119);
}

.left {
  @include respond-to(pc) {
    display: none;
  }
}
</style>
