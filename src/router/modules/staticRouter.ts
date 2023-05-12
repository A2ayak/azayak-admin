import { RouteRecordRaw } from 'vue-router'
import { DEFAULT_URL } from '@/config'

// staticRouter(静态路由)
export const staticRouter: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: DEFAULT_URL,
	},
	{
		path: DEFAULT_URL,
		name: 'login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: '登录',
		},
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
		path: '/:pathMatch(.*)*',
		name: 'notFound',
		redirect: { name: '404' },
	},
]
