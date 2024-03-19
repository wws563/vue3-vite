import { createApp } from 'vue';
import router from './router/index.ts';
import { createPinia } from 'pinia';
import '@/styles/index.scss';
// 日期
import dayjs from 'dayjs';
import ElementPlus from 'element-plus';
import { ElMessage } from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import 'element-plus/dist/index.css';
import 'normalize.css/normalize.css';
import App from './App.vue';

// EXP:使用resize监控屏幕，优化为usevue的useBreakpoints
// import { screenWidthMixin } from '@/utils/mixin/listenScreen'; // 注意文件后缀

const pinia = createPinia();
const app = createApp(App);

// 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 全局监听屏幕宽度
app.config.globalProperties.$screenWidth = window.innerWidth;
// app.mixin(screenWidthMixin);

app.config.globalProperties.$dayjs = dayjs;
app.config.globalProperties.$message = ElMessage;
app.use(router).use(pinia).use(ElementPlus).mount('#app');
