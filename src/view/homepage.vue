<template>
  <div class="layout">
    <div class="header">
      <HeaderView :show-menu="false"></HeaderView>
    </div>
    <div class="main">
      <div>welcome</div>
      <van-button type="primary" @click="jump('doc/toy/lotterySpinner')"
        >主要按钮</van-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderView from '@/components/layout/HeaderView.vue';
const router = useRouter();

const jump = (page: string) => {
  router.push('/' + page);
};
</script>

<style scoped lang="scss"></style>
