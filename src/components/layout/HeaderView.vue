<template>
  <div class="header">
    <div class="left">
      <div class="logo">
        <img src="@/assets/images/logo.png" alt="" />
      </div>
      <span class="title mobile">E1son's</span>
      <span class="title pc">E1son's Home</span>
    </div>

    <div class="right">
      模式
      <!-- 解决@change TS报错问题 -->
      <!-- 文档中TS指定类型为(val: boolean | string | number) => void -->
      <el-switch v-model="theme" @change="onThemeChange"></el-switch>
    </div>
  </div>
</template>

<script setup lang="ts">
const theme = ref(false);
const onThemeChange = (e: boolean | string | number) => {
  if (typeof e === 'boolean') {
    document.querySelector('html')!.setAttribute('theme', e ? 'dark' : 'light');
  }
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
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
      'Lucida Sans', Arial, sans-serif;
    &.pc {
      // color: yellow;

      @include respond-to(mobile) {
        display: none;
      }
    }
    &.mobile {
      // color: red;
      @include respond-to(pc) {
        display: none;
      }
    }
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
