<template>
  <div>
    <div>子组件widthToref:{{ target }}</div>
    <!-- <div>子组件:{{ noRefTarget }}</div> -->
    <div>
      <button @click="reset">重置</button>
      （状态：{{ animating ? '进行中' : '已结束' }}）
    </div>
    <div class="spinner">
      <canvas ref="pizzaCanvas" width="400" height="400"></canvas>
      <div class="arrow-container" @click="animeStart">
        <div class="arrow"></div>
        <div class="arrow-text">抽奖</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入依赖
import { ComponentInternalInstance } from 'vue';
import anime from 'animejs/lib/anime.es.js';
// 数据准备
const props = defineProps({
  target: {
    type: Number,
    default: 1,
  },
  giftList: {
    type: Object,
    default: () => {
      // 默认值
      let res = [];
      for (let id = 1; id <= 11; id++) {
        const gift = { id: id, text: `父礼物${id}` };
        res.push(gift);
      }
      res.push({ id: 5, text: '这是大奖！' });
      return res;
    },
  },
});

// 声明周期
onMounted(() => {
  makePizza();
});

// 方法声明
// 重置箭头动画
const giftComputation = computed((): { num: number; size: number } => {
  return {
    num: props.giftList.length,
    size: 360 / props.giftList.length,
  };
});

let animeIndex = 3;
const animating = ref<boolean>(false);
const reset = () => {
  if (!animating.value) {
    anime({
      targets: '.arrow-container .arrow',
      rotate: {
        value: 0,
        duration: 1,
      },
    });
  }
};

// 开始箭头动画
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const animeStart = () => {
  if (animating.value) {
    return;
  }
  anime({
    targets: '.arrow-container .arrow',
    // 旋转N圈后，定位到指定奖品
    rotate: {
      value:
        360 * animeIndex +
        90 +
        giftComputation.value.size * props.target -
        giftComputation.value.size / 2,
      duration: 3000,
    },
    easing: 'cubicBezier(0.000, 0.255, 0.000, 1.000)',

    begin: function () {
      animating.value = true;
    },
    complete: function () {
      animating.value = false;
      proxy?.$message({
        message: `恭喜你获得${
          props.giftList.find((item: any) => item.id == 'id1').text
        }`,
        type: 'success',
      });
    },
  });
  animeIndex++;
};

// 创建Canvas元素的引用
// EXP:vue3 ref获取dom的TS类型定义方法
// 官网说明：https://cn.vuejs.org/guide/typescript/composition-api.html#typing-template-refs
const pizzaCanvas = ref<HTMLCanvasElement | null>(null); // ref断言 HTMLCanvasElement | null
// 可选定义方式
// const pizzaCanvas: Ref<HTMLCanvasElement | null> = ref(null);

const makePizza = () => {
  // 获取Canvas元素的引用
  const canvas = pizzaCanvas.value;
  if (!canvas || canvas.width === 0 || canvas.height === 0) {
    console.error('Canvas is not properly mounted or has zero dimensions.');
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Failed to get context for the canvas.');
    return;
  }
  // 圆心坐标
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  // 圆半径
  const radius = 150;

  // 画12块扇形
  for (let i = 0; i < giftComputation.value.num; i++) {
    ctx.beginPath();
    // 计算每个扇形的起始角度和结束角度
    const startAngle = (i * 2 * Math.PI) / giftComputation.value.num;
    const endAngle = ((i + 1) * 2 * Math.PI) / giftComputation.value.num;

    // 绘制扇形
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();

    // 设置每块的颜色
    ctx.fillStyle = i % 2 === 0 ? '#aacf53' : '#f7fcfe';
    ctx.fill();
    ctx.stroke();

    // 在每个扇形中添加文字
    const angle = (startAngle + endAngle) / 2.04; // 中间角度
    const textX = centerX + Math.cos(angle) * (radius / 1.2); // 文字X坐标
    const textY = centerY + Math.sin(angle) * (radius / 1.2); // 文字Y坐标

    ctx.save(); // 保存当前状态
    ctx.translate(textX, textY); // 平移坐标系到文字位置
    ctx.rotate(angle + Math.PI / 2); // 旋转坐标系，使文字方向指向圆心

    const text: string = props.giftList[i].text; // 替换为你想要显示的文字
    drawText(ctx, text); // 绘制文字
    ctx.restore(); // 恢复之前保存的状态，防止对后续绘制的影响
  }
};
function drawText(ctx: any, text: string) {
  ctx.fillStyle = '#000'; // 设置文字颜色
  ctx.font = '12px Arial'; // 设置文字字体和大小
  // 逐个绘制中文字符
  let enCahrs = [];
  let currentLine = 0;
  let enEnd = true;
  for (let j = 0; j < text.length; j++) {
    const character = text.charAt(j);
    // 检查是否为中文字符
    if (/[\u4e00-\u9fa5]/.test(character)) {
      if (!enEnd) {
        console.log('drawEn 触发');
        drawEn(ctx, enCahrs, currentLine);
        enEnd = true;
        currentLine += enCahrs.length;
        enCahrs = [];
      }
      // 对于中文字符，直接绘制
      ctx.fillText(character, 0, currentLine * 12);
      currentLine++;
    } else {
      enEnd = false;
      enCahrs.push(character);
    }
  }
  if (enCahrs.length > 0) {
    currentLine += enCahrs.length;
    drawEn(ctx, enCahrs, currentLine);
  }
}

const drawEn = (ctx: any, enCahrs: string[], currentLine: number) => {
  if (enCahrs.length > 0) {
    const enText = enCahrs.join('');
    ctx.save();
    ctx.translate(0, (currentLine - 1) * 10);
    ctx.rotate((90 * Math.PI) / 180); // 旋转90度
    ctx.fillText(enText, 0, 0);
    ctx.restore();
  }
};

// 指定暴露的方法
defineExpose({
  makePizza,
});
</script>
<style lang="scss">
.spinner {
  position: relative;
}

.arrow-container {
  @include flex-center();
  @include absolute-center();
  width: 100px;
  height: 100px;
  padding: 10px;
  cursor: pointer;
  // position: relative;
  .arrow {
    @include flex-center();
    border-radius: 100%;
    width: 100%;
    height: 100%;
    background-color: #ec6800;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: -18px;
      left: 50%;
      transform: translate(-50%);
      border: 10px solid transparent;
      border-bottom: 10px solid #ec6800;
    }
  }
  .arrow-text {
    @include absolute-center();
    color: #fff;
  }
}
</style>
