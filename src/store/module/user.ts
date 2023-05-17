import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { getUserInfo } from '@/api/user'
import { localCache } from '@/utils/webStorage'

export const useUserStore = defineStore({
	id: 'userStore',
	state: (): any => {
		return {
			user: null,
			authRoutes: [],
			token: '',
			permission: [],
		}
	},
	getters: {
		getAuthRoutes(): RouteRecordRaw[] {
			return this.authRoutes
		},
		getPermission(): string[] {
			return this.permission
		},
	},
	actions: {
		async getUserInfo() {
			const { result } = await getUserInfo()
			localCache.setCache('token', result.token)
			console.log(result)
		},
	},
})
