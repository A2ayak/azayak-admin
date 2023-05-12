import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
	{ path: '/', component: () => import('../components/HelloWorld.vue') },
	{ path: '/home', component: () => import('../components/Home.vue') },
]

const WHITE_LIST: string[] = []

const router = createRouter({
	// hash 或者 history 模式
	history: createWebHashHistory(),
	// history: createWebHistory(),
	routes,
	strict: false,
	scrollBehavior: () => ({ left: 0, top: 0 }),
})

//路由全局前置守卫
router.beforeEach((to, from, next) => {
	// console.log('路由全局前置守卫', to, from)
	next()
})
//路由全局后置守卫
router.afterEach((to, from) => {
	// console.log('路由全局后置守卫', to, from)
})

// 重置路由
export function resetRouter() {
	router.getRoutes().forEach((route) => {
		const { name } = route
		if (name && !WHITE_LIST.includes(name as string)) {
			router.hasRoute(name) && router.removeRoute(name)
		}
	})
}

export default router
