import { createWebHashHistory, RouteRecordRaw, RouterOptions } from "vue-router";

import ForkRoad from "@/views/ForkRoad.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'ForkRoad',
        component: ForkRoad,
    },
    {
        path: '/pc',
        name: 'PC',
        component: () => import("@/views/PC.vue"),
        redirect: {
            name: 'Home'
        },
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import("@/views/PC/Home.vue")
            },
            {
                path: 'music',
                name: 'Music',
                component: () => import("@/views/PC/Music.vue")
            },
            {
                path: 'record',
                name: 'Record',
                component: () => import("@/views/PC/Record.vue"),
                redirect: {
                    name: 'RecordOverview'
                },
                children: [
                    {
                        path: 'record-overview',
                        name: 'RecordOverview',
                        component: () => import("@/layouts/Record/RecordOverview.vue")
                    }
                ]
            },
            {
                path: 'resize',
                name: 'Resize',
                component: () => import("@/views/PC/Resize.vue")
            }
        ]
    },
    {
        path: '/mobile',
        name: 'Mobile',
        component: () => import("@/views/Mobile.vue"),
        redirect: {
            name: 'MHome'
        },
        children: [
            {
                path: 'home',
                name: 'MHome',
                component: () => import("@/views/Mobile/MHome.vue")
            },
            {
                path: 'record',
                name: 'MRecord',
                component: () => import("@/views/Mobile/MRecord.vue")
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
