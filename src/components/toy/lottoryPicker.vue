<template>
  <div>
    <div>
      <span>目标</span>
      <input v-model.number="target" />
    </div>
    <div class="grid">
      <div :class="currentIndex == 1 ? 'active' : ''">1</div>
      <div :class="currentIndex == 2 ? 'active' : ''">2</div>
      <div :class="currentIndex == 3 ? 'active' : ''">3</div>
      <div :class="currentIndex == 8 ? 'active' : ''">8</div>
      <div class="center" @click="roll">抽奖</div>
      <div :class="currentIndex == 4 ? 'active' : ''">4</div>
      <div :class="currentIndex == 7 ? 'active' : ''">7</div>
      <div :class="currentIndex == 6 ? 'active' : ''">6</div>
      <div :class="currentIndex == 5 ? 'active' : ''">5</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const currentIndex = ref(1);
const target = ref(4);

// 执行抽奖步骤
let stepIndex = 1;
const fakeRoundNum = 2; // 空转圈数
const secondTime = 1000;
const runStep = () => {
  let speed = 1 / 100; // speed越大越快
  let step = Math.log2(stepIndex * speed + 1) * secondTime; // log函数让旋转速度逐渐变慢
  currentIndex.value = currentIndex.value == 8 ? 1 : currentIndex.value + 1;
  stepIndex++;
  if (stepIndex <= fakeRoundNum * 8 + target.value - 1) {
    setTimeout(runStep, step);
  } else {
    stepIndex = 1;
  }
};

const roll = () => {
  if (stepIndex != 1) {
    return;
  }
  currentIndex.value = 1;
  runStep();
};
</script>
<style lang="scss">
.grid {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  width: 500px;
  height: 500px;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  > div {
    background-color: burlywood;
    @include flex-center;
    &.active {
      filter: drop-shadow(0 0 10px #000);
    }
    &.center {
      font-size: 30px;
      color: white;
      background-color: brown;
    }
  }
}
</style>
