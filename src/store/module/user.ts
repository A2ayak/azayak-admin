import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { getUserInfo } from '@/api/user'
import { localCache } from '@/utils/webStorage'

export const useUserStore = defineStore({
	id: 'userStore',
	state: (): any => {
		return {
			user: null,
			routes: [],
			token: '',
			permission: [],
		}
	},
	getters: {
		getRoutes(): RouteRecordRaw[] {
			return this.routes
		},
		getPermission(): string[] {
			return this.permission
		},
	},
	actions: {
		async getUserInfo() {
			const { result } = await getUserInfo()
			localCache.setCache('token', result.token)
			this.routes = result.routes
		},
	},
})
