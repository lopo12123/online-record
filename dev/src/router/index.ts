import { createWebHashHistory, RouteRecordRaw, RouterOptions } from "vue-router";

import Home from "@/views/Home.vue";

const routes: RouteRecordRaw[] = [
    // region redirect
    {
        path: '/',
        redirect: {
            name: 'Home'
        }
    },
    // endregion
    {
        path: '/home',
        name: 'Home',
        component: Home
    }
]

export const router: RouterOptions = {
    history: createWebHashHistory(),
    routes
}
