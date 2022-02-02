import { createWebHashHistory, RouteRecordRaw, RouterOptions } from "vue-router";

import PC from "@/views/PC.vue";

const routes: RouteRecordRaw[] = [
    // region redirect
    {
        path: '/',
        redirect: {
            name: 'PC'
        }
    },
    // endregion
    {
        path: '/pc',
        name: 'PC',
        component: PC,
        redirect: {
            name: 'Home'
        },
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import("@/views/Home.vue")
            },
            {
                path: 'music',
                name: 'Music',
                component: () => import("@/views/Music.vue")
            }
        ]
    }
]

if(process.env.NODE_ENV === 'development') {
    routes.push({
        path: '/test',
        name: 'TestPage',
        component: () => import('@/test/TestPage.vue')
    })
}

export const router: RouterOptions = {
    history: createWebHashHistory(),
    routes
}
