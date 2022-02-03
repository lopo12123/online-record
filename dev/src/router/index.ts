import { createWebHashHistory, RouteRecordRaw, RouterOptions } from "vue-router";

import ForkRoad from "@/views/ForkRoad.vue";
import PC from "@/views/PC.vue";
import Mobile from "@/views/Mobile.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'ForkRoad',
        component: ForkRoad,
    },
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
                    name: 'AccountCheck'
                },
                children: [
                    {
                        path: 'account-check',
                        name: 'AccountCheck',
                        component: () => import("@/layouts/Record/AccountCheck.vue")
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
        component: Mobile,
        children: [

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
