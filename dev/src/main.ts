import "element-plus/dist/index.css";
import "@/styles/index.scss";

import { createApp } from "vue";
import { createRouter } from "vue-router";
import { router } from "@/router";

import App from "./App.vue";

const _router = createRouter(router)

createApp(App)
    .use(_router)
    .mount('#app')
