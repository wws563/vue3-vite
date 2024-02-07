<template>
  <div class="layout">
    <div class="header">
      <HeaderView></HeaderView>
    </div>
    <div class="left">wx专属</div>
    <!-- <button @click="jump">圆盘</button> -->
    <RouterMenu></RouterMenu>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import RouterMenu from '@/components/layout/RouterMenu.vue';
import HeaderView from '@/components/layout/HeaderView.vue';
// DEMO:使用pinia
import { useStore } from '@/store/main.ts';
const store = useStore();
let { name } = store;
console.log(name);
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  background-color: rgb(91, 67, 119);
}

.left {
  @include respond-to(pc) {
    display: none;
  }
}
</style>
