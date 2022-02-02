import "element-plus/dist/index.css";
import "@/fonts/iconfont.css";
import "@/styles/index.scss";

import { createApp } from "vue";
import { createRouter } from "vue-router";
import { router } from "@/router";
import { ElLoading } from "element-plus";

import App from "./App.vue";

const _router = createRouter(router)

createApp(App)
    .use(_router)
    .use(ElLoading)
    .mount('#app')
