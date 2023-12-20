<template>
  <div>
    <div class="content">
      <div>
        <span>父组件</span>
        <input v-model="target" />
      </div>
      <div>
        <span>分割数量</span>
        <input v-model="splitNum" />
        <button @click="refresh">重新生成</button>
      </div>
      <lottory-spinner
        ref="lsp"
        :gift-list="giftList"
        :target="compTarget"
      ></lottory-spinner>
    </div>
  </div>
</template>

<script setup lang="ts">
import lottorySpinner from '@/components/toy/lottorySpinner.vue';

// 默认值
const lsp = ref(null);
const refresh = () => {
  console.log('refresh');
  setupList();
  nextTick(() => {
    lsp.value.makePizza();
  });
};

let splitNum = ref('12');
let giftList = ref<any[]>([]);

const setupList = () => {
  giftList.value = [];
  for (let id = 1; id <= parseInt(splitNum.value) - 1; id++) {
    const gift: object = { id: 'id' + id, text: `父礼物${id}` };
    giftList.value.push(gift);
  }
  giftList.value.push({
    id: 'id' + parseInt(splitNum.value),
    text: '这是大奖！',
  });
  console.log('new giftList', giftList.value);
};
setupList();

const target = ref('4');
const compTarget = computed(() => {
  return target.value != '' ? parseInt(target.value.trim()) : 0;
});
</script>
<style lang="scss"></style>
