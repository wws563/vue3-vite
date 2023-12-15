<template>
  <div class="header">
    <div class="left">
      <div class="logo">
        <img src="@/assets/images/logo.png" alt="" />
      </div>
      <span class="title">E1son的Vue3 Demo</span>
    </div>

    <div class="right">
      模式
      <el-switch v-model="theme" @change="onThemeChange"></el-switch>
    </div>
  </div>
</template>

<script setup lang="ts">
const theme = ref(false);
const onThemeChange = (e) => {
  document.querySelector("html").setAttribute("theme", e ? "dark" : "light");
};
</script>

<style lang="scss" scoped>
.header {
  background-image: linear-gradient(#f1e3ce, #e6d7c5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.1);

  .left {
    @include flex-center();
  }
  .right {
    margin-right: 20px;
  }
  .title {
    font-size: 40px;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
  }
}

.logo {
  height: 80px;
  width: 80px;

  img {
    height: 100%;
    width: 100%;
  }
}
</style>
