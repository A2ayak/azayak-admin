import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
	{ path: '/', component: () => import('../components/HelloWorld.vue') },
	{ path: '/home', component: () => import('../components/Home.vue') },
]

const router = createRouter({
	// hash 或者 history 模式
	history: createWebHashHistory(),
	// history: createWebHistory(),
	routes,
})
// 全局路由守卫的方法跟vue-router3一样
//路由全局前置守卫
router.beforeEach((to, from, next) => {
	console.log('路由全局前置守卫', to, from)
	next()
})
//路由全局后置守卫
router.afterEach((to, from) => {
	console.log('路由全局后置守卫', to, from)
})

export default router
