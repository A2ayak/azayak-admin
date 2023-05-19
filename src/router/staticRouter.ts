import { RouteRecordRaw } from 'vue-router'
import { DEFAULT_REDIRECT } from '@/config'

// staticRouter(静态路由)
export const staticRouter: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/200',
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
	},
	{
		path: '/404',
		name: '404',
		component: () => import('@/components/404.vue'),
		meta: {
			title: '404页面',
		},
	},
	{
		path: '/:pathMatch(.*)',
		name: 'notFound',
		component: () => import('@/components/404.vue'),
	},
]
