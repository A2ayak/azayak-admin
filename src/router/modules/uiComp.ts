import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const uiCompRoute: RouteRecordRaw = {
	path: '/uiComp',
	name: 'uiComp',
	component: Layout,
	meta: {
		hidden: false,
		title: 'UI组件',
		icon: 'vue',
	},
	children: [
		{
			path: '/uiComp/scrollBar',
			name: 'scrollBar',
			component: () => import('@/views/uiComp/ScrollBarDemo.vue'),
			meta: {
				hidden: false,
				title: 'scrollBar',
				icon: 'vue',
			},
		},
		{
			path: '/uiComp/terminal',
			name: 'terminal',
			component: () => import('@/views/uiComp/TerminalDemo.vue'),
			meta: {
				hidden: false,
				title: 'web终端',
				icon: 'vue',
			},
		},
	],
}

export default uiCompRoute
