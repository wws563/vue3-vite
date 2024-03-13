<template>
  <div>
    <div class="content">
      <div class="gift-table">
        <p style="font-weight: bold; font-size: 20px">礼物数据</p>
        <el-table :data="giftList">
          <el-table-column prop="id" label="ID" width="180" />
          <el-table-column prop="text" label="礼物名称" width="180" />
        </el-table>
      </div>
      <div class="lottery-container">
        <div>
          <el-input v-model.number="target">
            <template #prepend>中奖编号</template>
          </el-input>
        </div>
        <div>
          <el-input v-model.number="splitNum">
            <template #prepend>分割数量</template>
          </el-input>
        </div>
        <div>
          <el-button type="primary" @click="refresh">重新生成</el-button>
        </div>

        <LottorySpinner
          ref="lsp"
          :gift-list="giftList"
          :target="target"
        ></LottorySpinner>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LottorySpinner from '@/components/toy/lottorySpinner.vue';

// 类型声明
type gift = { id: string; text: string };

// 生成轮盘
// EXP: 通过继承声明子组件类型，避免出现未定义类型的TS报错。同时可以获得组件的属性和方法。
const lsp = ref<InstanceType<typeof LottorySpinner>>();
const refresh = () => {
  setupList();
  // EXP: 响应式原理，props更新后，会等待下一次tick出现数据更新了，子组件中未更新。有三种办法：
  // 1. 给子组件加key，并更新key
  // 2. nextTick
  // 3. 子组件通过watch进行监听
  // 4. 子组件暴露方法，参数获取新数据
  nextTick(() => {
    lsp.value?.makePizza();
  });
};
let splitNum = ref('12');
let giftList = ref<gift[]>([]);

const setupList = () => {
  giftList.value = [];
  for (let id = 1; id <= parseInt(splitNum.value) - 1; id++) {
    const gift: gift = {
      id: 'id' + id,
      text: `父礼物${id}`,
    };
    giftList.value.push(gift);
  }
  giftList.value.push({
    id: 'id' + parseInt(splitNum.value),
    text: '这是大奖！',
  });
  console.log('new giftList', giftList.value);
};
setupList();

const target = ref<number>(4);
</script>
<style lang="scss">
.content {
  display: flex;
  height: 3000px;
  @include respond-to(mobile) {
    flex-direction: column;
  }
  .lottery-container {
    text-align: left;
    > div {
      margin: 10px;
    }
  }
}
</style>
