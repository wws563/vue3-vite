import { createApp } from 'vue';
import router from './router/index.ts';
import { createPinia } from 'pinia';
import './style.css';
import '@/styles/index.scss';
import App from './App.vue';
// 日期
import dayjs from 'dayjs';

const pinia = createPinia();

const app = createApp(App);
app.config.globalProperties.$dayjs = dayjs;
app.use(router).use(pinia).mount('#app');
