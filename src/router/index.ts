import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import { staticRouter } from './staticRouter'
import { useUserStore } from '@/store/module/user'

const routes: RouteRecordRaw[] = [...staticRouter]
let routeModules: Recordable
if (import.meta.env.VITE_IS_FE_ROUTE) {
	routeModules = import.meta.glob('./modules/**/*.ts', { eager: true })
	for (const routePath in routeModules) {
		const module: RouteRecordRaw = routeModules[routePath].default ?? {}
		routes.push(module)
	}
}

console.log('当前路由:', routes)

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
	if (import.meta.env.VITE_IS_FE_ROUTE) {
		const userStore = useUserStore()
		userStore.setRoutes(routeModules)
	}
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
