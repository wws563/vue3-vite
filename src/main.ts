import { createApp } from 'vue';
import router from './router/index.ts';
import './style.css';
import '@/styles/index.scss';
import App from './App.vue';
// 日期
import dayjs from 'dayjs';

const app = createApp(App);
app.config.globalProperties.$dayjs = dayjs;
app.use(router).mount('#app');
