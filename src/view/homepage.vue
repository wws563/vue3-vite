<template>
  <div class="layout">
    <HeaderView :show-menu="false"></HeaderView>
    <div class="main">
      <swiper
        :key="key"
        ref="swiperRef"
        :style="{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }"
        :speed="600"
        :parallax="isSmallSize"
        :pagination="{
          clickable: true,
        }"
        :direction="isSmallSize ? 'vertical' : 'horizontal'"
        :modules="modules"
        class="mySwiper"
      >
        <template v-slot:container-start>
          <div class="parallax-bg" data-swiper-parallax="-23%"></div>
        </template>

        <swiper-slide>
          <div class="slide-card">
            <div class="title" data-swiper-parallax="-300">我的简历</div>
            <div class="subtitle" data-swiper-parallax="-200">
              {{ isSmallSize }}
            </div>
            <div class="text" data-swiper-parallax="-100">
              <p>
                <span>姓名：王禕淼</span>
                <span>姓名：王禕淼</span>
                <span>姓名：王禕淼</span>
                <span>姓名：王禕淼</span>
                <span>姓名：王禕淼</span>
              </p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="title" data-swiper-parallax="-300">Slide 2</div>
          <div class="subtitle" data-swiper-parallax="-200">Subtitle</div>
          <div class="text" data-swiper-parallax="-100">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
              laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
              Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
              Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
              ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
              tincidunt ut libero. Aenean feugiat non eros quis feugiat.
            </p>
          </div> </swiper-slide
        ><swiper-slide>
          <div class="title" data-swiper-parallax="-300">Slide 3</div>
          <div class="subtitle" data-swiper-parallax="-200">Subtitle</div>
          <div class="text" data-swiper-parallax="-100">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
              laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
              Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
              Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
              ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
              tincidunt ut libero. Aenean feugiat non eros quis feugiat.
            </p>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
// == 轮播 ==
// import Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { Parallax, Pagination, Navigation } from 'swiper/modules';
let modules = ref([Parallax, Pagination, Navigation]);

// == 监控屏幕 ==
import { bsInfo } from '@/utils/browserScreenInfo';
//  监听 bsInfo.size 属性
// 屏幕尺寸发生变化就修改抽屉宽
let key = ref<number>(1); // EXP:swiper11的swiper组件使用key重载
let isSmallSize = computed(() => {
  // 小设备
  return bsInfo.size.sm;
});

watch(isSmallSize, (val, oldVal) => {
  if (val != oldVal) {
    key.value++;
  }
});
// const router = useRouter();

// const jump = (page: string) => {
//   router.push('/' + page);
// };
</script>

<style scoped lang="scss">
#app {
  height: 100%;
}
html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family:
    Helvetica Neue,
    Helvetica,
    Arial,
    sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .main {
    flex: 1;
  }
}

.swiper {
  width: 100%;
  height: 100vh;
  background: #000;
}

.swiper-slide {
  position: relative;
  font-size: 18px;
  color: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 40px 60px;
}

.parallax-bg {
  background-image: url(@/assets/images/home-bg4.jpeg);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 130%;
  -webkit-background-size: cover;
  background-size: cover;
  background-position-x: center;
}

.swiper-slide .title {
  font-size: 41px;
  font-weight: 300;
}

.swiper-slide .subtitle {
  font-size: 21px;
}

.swiper-slide .text {
  font-size: 14px;
  max-width: 300px;
  line-height: 1.3;
}
.slide-card {
  @include absolute-center();
  background-color: rgba(222, 222, 222, 0.5);
  padding: 3rem;
  border-radius: 1rem;
  height: auto;
  color: red;
  box-shadow: 0 0 10px 5px rgba(244, 244, 244, 0.3);
}
</style>
