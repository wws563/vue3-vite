<template>
  <div class="page">
    <el-card>
      <div style="padding: 20px">这是404，啥也没有。</div>
      <div class="buttons">
        <el-button type="primary" @click="back"
          ><el-icon><RefreshLeft /></el-icon>返回</el-button
        >
        <el-button type="primary" @click="home"
          ><el-icon><House /></el-icon>首页</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const back = function () {
  router.back();
};
const home = function () {
  router.push('/');
};
</script>

<style scoped lang="scss">
.page {
  height: 100vh;
  @include flex-center();
}
.buttons {
  @include flex-center();
}
</style>
