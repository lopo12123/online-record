import { createWebHashHistory, RouteRecordRaw, RouterOptions } from "vue-router";

import Index from "@/views/Index.vue";

const routes: RouteRecordRaw[] = [
    // region redirect
    {
        path: '/',
        redirect: {
            name: 'Index'
        }
    },
    // endregion
    {
        path: '/index',
        name: 'Index',
        component: Index,
        children: [
            {
                path: '',
                redirect: {
                    name: 'Home'
                }
            },
            {
                path: 'home',
                name: 'Home',
                component: () => import("@/views/Home.vue")
            }
        ]
    }
]

if(process.env.NODE_ENV === 'development') {
    routes[1].children?.push({
        path: '/test',
        name: 'TestPage',
        component: () => import('@/test/TestPage.vue')
    })
}

export const router: RouterOptions = {
    history: createWebHashHistory(),
    routes
}
