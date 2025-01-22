import { RouteRecordRaw } from 'vue-router'
import { DEFAULT_REDIRECT } from '@/config'

// staticRouter(静态路由)
export const staticRouter: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: import.meta.env.VITE_DEFAULT_REDIRECT,
	},
	// {
	// 	path: DEFAULT_URL,
	// 	name: 'login',
	// 	component: () => import('@/views/login/index.vue'),
	// 	meta: {
	// 		title: '登录',
	// 	},
	// },
	{
		path: '/login',
		name: 'login',
		component: () => import('@/components/login/index.vue'),
		meta: {
			title: 'login',
		},
	},
	{
		path: '/404',
		name: 'NotFoundPage',
		component: () => import('@/components/NotFoundPage.vue'),
		meta: {
			title: '404 not found',
		},
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'notFound',
		component: () => import('@/components/NotFoundPage.vue'),
		meta: {
			title: 'not found',
		},
	},
]
