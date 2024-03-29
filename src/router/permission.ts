import type { Router, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/store/module/user'
import { generatePermissionRoutes } from './utils/generatePermissionRoutes'
import { localCache } from '@/utils/webStorage'

const WHITE_LIST = ['/login']

export default function permissionGuards(router: Router) {
	router.beforeEach(async (to, from, next) => {
		console.log('to', to)
		const token = localCache.getCache('token')
		if (token) {
			const userStore = useUserStore()
			const user = userStore.getUser
			if (user) {
				next()
			} else {
				try {
					await userStore.getUserInfo()
					const permissionRoutes = generatePermissionRoutes(userStore.routeNames)
					console.log(permissionRoutes)
					userStore.setRoutes(permissionRoutes)
					permissionRoutes.forEach((route) => {
						router.addRoute(route)
					})
					next({ name: 'svgPath', replace: true })
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
