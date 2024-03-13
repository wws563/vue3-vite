<template>
  <div class="layout">
    <div class="header">
      <HeaderView></HeaderView>
    </div>
    <div class="main">
      <div class="left">
        <RouterMenu prefix="doc"></RouterMenu>
      </div>
      <div class="route">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RouterMenu from '@/components/layout/RouterMenu.vue';
import HeaderView from '@/components/layout/HeaderView.vue';
// DEMO:使用pinia
import { useStore } from '@/store/main.ts';

defineOptions({
  name: 'indexPage',
});

const store = useStore();
let { name } = store;
console.log(name);
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  background-color: rgb(91, 67, 119);
  position: fixed;
  top: 0;
}
.main {
  margin-top: 80px;
  height: calc(100vh - 80px);
  @include respond-to(mobile) {
    margin-top: 60px;
    height: calc(100vh - 60px);
  }
  @include flex-center(flex-start, flex-start);
  overflow: hidden;
  .left {
    height: 100%;
    padding: 5px;
    flex-basis: 150px;
    @include respond-to(mobile) {
      display: none;
    }
  }
  .route {
    padding: 10px;
    max-height: 100%;
    overflow: auto;
    flex: 1;
    background-color: #fff;
  }
}
</style>
