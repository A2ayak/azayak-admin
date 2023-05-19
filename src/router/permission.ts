import type { Router, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/store/module/user'
import { generatePermissionRoutes } from './utils/generatePermissionRoutes'
import { localCache } from '@/utils/webStorage'

const WHITE_LIST = ['/login']

export default function permissionGuards(router: Router) {
	router.beforeEach(async (to, from, next) => {
		console.log('to', to)
		const token = localCache.getCache('token')
		console.log('token', token)
		if (token) {
			const userStore = useUserStore()
			const user = userStore.getUser
			if (user) {
				next()
			} else {
				try {
					await userStore.getUserInfo()
					const permissionRoutes = generatePermissionRoutes(userStore.getRoutes)
					console.log(permissionRoutes)
					permissionRoutes.forEach((route) => {
						router.addRoute(route)
					})
					console.log(router)
					next({ name: 'lineChart', replace: true })
				} catch (error) {
					console.warn(error)
					next('/login')
				}
			}
		} else {
			if (WHITE_LIST.includes(to.path)) {
				next()
			} else {
				next('/login')
			}
		}
	})
	return
}
