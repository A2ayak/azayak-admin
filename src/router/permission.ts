import type { Router } from 'vue-router'
import { useUserStore } from '@/store/module/user'

export default function permissionGuards(router: Router) {
	const userStore = useUserStore()
	router.beforeEach(async (to, from, next) => {
		await userStore.getUserInfo()
		next()
	})
}
