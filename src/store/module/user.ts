import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { login, getUserInfo } from '@/api/user'
import { localCache } from '@/utils/webStorage'
import type { IAccount } from '@/components/login/type'

export const useUserStore = defineStore({
	id: 'userStore',
	state: (): any => {
		return {
			user: null,
			userId: '',
			permissionRoutes: [],
			routes: [],
			token: '',
		}
	},
	getters: {
		getRoutes(): RouteRecordRaw[] {
			return this.routes
		},
		getUser(): string {
			return this.user
		},
	},
	actions: {
		async getUserInfo() {
			const { result } = await getUserInfo()
			localCache.setCache('token', result.token)
			this.user = result.user
			this.setPermissionRoutes(result.permissionRoutes)
		},
		async loginAction(account: IAccount) {
			//1.账号登录，获取token等信息
			const { result } = await login(account)
			// console.log(loginResult)
			this.userId = result.userId
			this.token = result.token
			//进行本地缓存
			localCache.setCache('token', this.token)
			// router.push('/charts/lineChart')
			return true

			// //2. 获取登录用户详细身份信息（角色信息）
			// const userInfoResult = await getUserInfoById(id)
			// const userInfo = userInfoResult.data
			// this.userInfo = userInfo

			// //3.根据角色请求用户的权限（菜单menus）
			// const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
			// const userMenus = userMenusResult.data
			// this.userMenus = userMenus

			// //4. 进行本地缓存
			// localCache.setCache('userInfo', userInfo)
			// localCache.setCache('userMenus', userMenus)

			// //5.请求所用的roles/departments
			// const mainStore = useMainStore()
			// await mainStore.fetchEntireDataAction()

			// //重要：获取登录用户的所有按钮权限
			// const permissions = mapMenusToPermissions(userMenus)
			// this.permissions = permissions

			// //重要步骤：动态添加路由
			// const routes = mapMenusToRoutes(userMenus)
			// routes.forEach((route) => router.addRoute('main', route))

			// //3. 页面跳转（main页面）
			// await router.push('/main')
		},
		setRoutes(routes: RouteRecordRaw[]) {
			this.routes = routes
		},
		setPermissionRoutes(routesName: string[]) {
			this.permissionRoutes = routesName
		},
		logout() {
			this.user = null
		},
	},
})
