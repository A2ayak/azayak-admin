import type { Router, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/store/module/user'
import { generatePermissionRoutes } from './utils/generatePermissionRoutes'
import { localCache } from '@/utils/webStorage'
import { userInfo } from '../../mock/modules/user'

const WHITE_LIST = ['/login']

export default function setupPermission(router: Router) {
	router.beforeEach(async (to, from, next) => {
		const userStore = useUserStore()
		const token = localCache.getCache('token')
		// 白名单和已登录情况
		if (WHITE_LIST.includes(to.path)) {
			// if (token && to.path === '/login') {
			// 	return next(from.fullPath)
			// }
			return next()
		}

		// 前端开发情况，无权限
		if (import.meta.env.VITE_IS_FE_ROUTE) {
			console.log('前端开发情况，无权限')
			const permissionRoutes = generatePermissionRoutes(userInfo.permissionRoutes)
			userStore.setRoutes(permissionRoutes)
			userStore.setPermissionRoutes(userInfo.permissionRoutes)
			next()
			return
		}

		// 未登录情况
		if (token) {
			const user = userStore.getUser
			console.log(user)
			if (user) {
				next()
			} else {
				try {
					await userStore.getUserInfo()
					const permissionRoutes = generatePermissionRoutes(userStore.permissionRoutes)
					console.log('权限路由:', permissionRoutes)
					userStore.setRoutes(permissionRoutes)
					permissionRoutes.forEach((route) => {
						router.addRoute(route)
					})
					next({ path: to.fullPath, replace: true })
				} catch (error) {
					console.warn(error)
					next({ path: '/login', replace: true })
				}
			}
		} else {
			next('/login')
		}
	})
	return
}
