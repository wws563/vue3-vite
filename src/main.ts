import { createApp } from "vue";
import router from "./router/index.ts";
import "./style.css";
import "@/styles/index.scss";
import App from "./App.vue";

const app = createApp(App);
app.use(router).mount("#app");
