<template>
  <div class="header-box">
    <div class="header">
      <div class="left pc">
        <div class="logo" @click="backHome">
          <img src="@/assets/images/logo.png" alt="" />
        </div>
        <div class="title">E1son's Home</div>
        <!-- <span class="title pc">E1son's Home</span> -->
      </div>
      <div class="left mobile">
        <div class="logo" @click="backHome">
          <img src="@/assets/images/logo.png" alt="" />
        </div>
        <div class="title">E1son's</div>
        <!-- <span class="title pc">E1son's Home</span> -->
      </div>

      <div class="right">
        <div class="pc">
          模式
          <!-- EXP:解决@change TS报错问题 -->
          <!-- 文档中TS指定类型为(val: boolean | string | number) => void -->
          <el-switch v-model="theme" @change="onThemeChange"></el-switch>
        </div>
        <div v-if="props.showMenu" class="mobile" @click="togglePopup">
          <van-icon class="wap-navi" name="wap-nav" size="30" />
        </div>
        <van-popup
          v-model:show="rightPopVisible"
          position="right"
          :style="{ width: '80%', height: '100%' }"
        >
          <RouterMenu @link-click="togglePopup" prefix="doc"></RouterMenu>
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RouterMenu from '@/components/layout/RouterMenu.vue';

const props = defineProps<{
  showMenu?: boolean;
}>();
// 返回首页
const router = useRouter();
const backHome = () => {
  router.push({ path: '/home' });
};

const theme = ref(false);
const onThemeChange = (e: boolean | string | number) => {
  if (typeof e === 'boolean') {
    document.querySelector('html')!.setAttribute('theme', e ? 'dark' : 'light');
  }
};

onMounted(() => {
  theme.value =
    document.querySelector('html')!.getAttribute('theme') === 'dark'
      ? true
      : false;
});

const rightPopVisible = ref(false);
const togglePopup = () => {
  rightPopVisible.value = !rightPopVisible.value;
};

defineExpose({
  togglePopup,
});
</script>

<style lang="scss" scoped>
.header-box {
  position: relative;
  height: 5rem;
}
.header {
  position: fixed;
  z-index: 99;
  top: 0;
  height: 5rem;
  background-image: linear-gradient(#f1e3ce, #e6d7c5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.1);

  .left {
    .title {
      font-size: 40px;
      font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
        'Lucida Sans', Arial, sans-serif;
    }
    @include flex-center();
    @include respond-to(mobile) {
      &.pc {
        display: none;
      }

      .logo {
        height: 60px;
        width: 60px;
      }
      .title {
        font-size: 30px;
      }
    }
    @include respond-to(pc) {
      &.mobile {
        display: none;
      }
      .logo {
        cursor: pointer;
        height: 80px;
        width: 80px;
      }
    }
    .logo img {
      height: 100%;
      width: 100%;
    }
  }

  .right {
    @include respond-to(mobile) {
      margin-right: 10px;
      .pc {
        display: none;
      }
      .wap-navi:focus,
      .wap-navi:hover {
        opacity: 50%;
      }
    }
    @include respond-to(pc) {
      margin-right: 20px;
      .mobile {
        display: none;
      }
    }
  }
}
</style>
