import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const dashboardRoute: RouteRecordRaw = {
	path: '/dashboard',
	name: 'Dashboard',
	component: Layout,
	meta: {
		hidden: false,
		title: '总览页',
		icon: 'vue',
		order: 0,
	},
	children: [
		{
			path: '/dashboard/index',
			name: 'Dashboard',
			component: () => import('@/views/dashboard/index.vue'),
			meta: {
				hidden: false,
				title: '总览页',
				icon: 'vue',
			},
		},
	],
}

export default dashboardRoute
