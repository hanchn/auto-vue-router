import { createRouter, createWebHistory } from "vue-router"
export default createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/Aaa',
        component: import ('/Users/yuanjing/Desktop/vite-portal/src/view/Aaa/index.vue')
    }, {
        path: '/Bbb',
        component: import ('/Users/yuanjing/Desktop/vite-portal/src/view/Bbb/index.vue')
    }, {
        path: '/',
        component: import ('/Users/yuanjing/Desktop/vite-portal/src/view/Index/index.vue')
    }, {
        path: '/Test',
        component: import ('/Users/yuanjing/Desktop/vite-portal/src/view/Test/index.vue')
    }]
})