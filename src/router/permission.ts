import type { Router, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/store/module/user'
import { generatePermissionRoutes } from './utils/generatePermissionRoutes'
import { localCache } from '@/utils/webStorage'

export default function permissionGuards(router: Router) {
	router.beforeEach(async (to, from, next) => {
		console.log('to', to)
		const token = localCache.getCache('token')
		console.log('token', token)
		if (token) {
			next()
		} else {
			const userStore = useUserStore()
			await userStore.getUserInfo()
			const permissionRoutes = generatePermissionRoutes(userStore.getRoutes)
			console.log(permissionRoutes)

			permissionRoutes.forEach((route) => {
				router.addRoute(route)
			})
			console.log(router)

			// next()
			return next({ ...to, replace: true })
		}
	})
	return
}
