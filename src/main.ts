import { createApp } from 'vue';
import router from './router/index.ts';
import { createPinia } from 'pinia';
import './style.css';
import '@/styles/index.scss';
// 日期
import dayjs from 'dayjs';
import ElementPlus from 'element-plus';
import { ElMessage } from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import 'element-plus/dist/index.css';
import App from './App.vue';

const pinia = createPinia();

const app = createApp(App);
// 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.config.globalProperties.$dayjs = dayjs;
app.config.globalProperties.$message = ElMessage;
app.use(router).use(pinia).use(ElementPlus).mount('#app');
