<template>
  <div>
    <div>歌词轮播</div>
    <div class="main">
      <div class="audio-container">
        <audio controls ref="audioPlayer" @timeupdate="handleTimeUpdate">
          <source :src="src" type="audio/mp3" />
        </audio>
      </div>
      <div class="lyric-container">
        <div class="lyric-content" ref="lyricArea">
          <p
            v-for="(item, index) in lyric"
            ref="lyricLine"
            :class="{ actived: item.actived }"
            :key="item.time"
            @click="activeClick($event, index)"
          >
            {{ item.centence }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { throttle } from 'lodash';
import audioFile from '@/assets/music/yequ.mp3';
import { lyric_yequ as lyricFile } from '@/assets/music/lyric/yequ.ts';
let src = ref(audioFile);

// 转换lyric时间单位
const convertTimeToSeconds = (timeStr: string): number => {
  // 分割字符串为分钟、秒和百分之一秒
  const parts = timeStr.split(':');
  const secondsParts = parts[1].split('.');

  // 将分钟转换为秒，并加上原始的秒数和百分之一秒
  const minutesToSeconds = parseInt(parts[0]) * 60;
  const seconds = parseInt(secondsParts[0]);
  const hundredthsToSeconds = parseInt(secondsParts[1]) / 100;

  // 计算总秒数
  const totalSeconds = minutesToSeconds + seconds + hundredthsToSeconds;
  return totalSeconds - 1; // 返回增加延迟校对
};

// 生成歌词对象，用于渲染和实践定位
let lyricObject = lyricFile.split('\n').map((item) => {
  let [time, centence] = item.slice(1).split(']');
  return {
    time: convertTimeToSeconds(time),
    centence: centence,
    actived: false,
  };
});

let lyric = ref(lyricObject);
// 歌词数据处理结束

// 音频处理开始
const audioPlayer = ref<HTMLAudioElement | null>(null);

// 定义事件处理函数
const handlePlay = () => {
  console.log('Audio is playing');
};

const handlePause = () => {
  console.log('Audio is paused');
};

const lyricArea = ref<HTMLDivElement | null>(null);
const lyricLine = ref<HTMLElement[]>([]);
const scrolledByUser = ref<boolean>(false);
const scrolledByCode = ref<boolean>(false);

// 处理播放时间更新歌词
const handleTimeUpdate = throttle((event: Event) => {
  const target = event.target as HTMLAudioElement;
  for (let i = 0; i < lyric.value.length; i++) {
    const element = lyric.value[i];
    console.log('element.time', element.time);
    console.log('currentTime', target.currentTime);

    if (element.time < target.currentTime) {
      continue;
    } else {
      lyric.value.forEach((item) => {
        item.actived = false;
      });
      lyric.value[i > 1 ? i - 1 : 0].actived = true;
      if (!scrolledByUser.value) {
        scrolledByCode.value = true;
        lyricArea.value?.scrollTo(
          0,
          lyricLine.value[i > 1 ? i - 1 : 0].offsetTop - 240,
        );
        scrolledByUser.value = false;
        setTimeout(() => {
          scrolledByCode.value = false; // 重置标志
        }, 100);
      }
      break;
    }
  }
}, 500);

// 歌词点击处理

const activeClick = (e: Event, index: number) => {
  const target = e.target as HTMLElement;
  lyric.value.forEach((item, i) => {
    item.actived = i === index;
  });
  // 将当前点击的元素的offsetTop作为滚动的目标
  lyricArea.value?.scrollTo(0, target.offsetTop - 240);
  scrolledByUser.value = false;
};

onMounted(() => {
  audioPlayer.value?.addEventListener('play', handlePlay);
  audioPlayer.value?.addEventListener('pause', handlePause);
  // 处理手动滚动
  let scrollTimer: number | undefined;
  lyricArea.value?.addEventListener('scroll', () => {
    if (scrolledByCode.value) {
      return;
    }
    scrolledByUser.value = true;
    scrollTimer && clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      scrolledByUser.value = false;
    }, 1000);
  });
});
onUnmounted(() => {
  audioPlayer.value?.removeEventListener('play', handlePlay);
  audioPlayer.value?.removeEventListener('pause', handlePause);
});
</script>
<style lang="scss" scoped>
.main {
  height: 100%;
}
.audio-container {
  width: 300px;
  margin: 0 auto;
}

.lyric-container {
  height: 500px;
  position: relative;
  &::after {
    content: '======================';
    color: blue;
    @include absolute-center();
  }
  .lyric-content {
    background-color: var(--bg-color-primary);
    text-align: center;
    padding-top: 240px;
    padding-bottom: 240px;
    box-sizing: border-box;
    height: 100%;
    overflow-y: auto;
    .actived {
      font-weight: 600;
      font-size: 18px;
      color: red;
    }
  }
}
</style>
