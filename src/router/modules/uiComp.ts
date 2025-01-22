import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const uiCompRoute: RouteRecordRaw = {
	path: '/uiComp',
	name: 'UiComp',
	component: Layout,
	meta: {
		hidden: false,
		title: 'UI组件',
		icon: 'vue',
		order: 1,
	},
	children: [
		{
			path: '/uiComp/scrollBar',
			name: 'ScrollBar',
			component: () => import('@/views/uiComp/ScrollBarDemo.vue'),
			meta: {
				hidden: false,
				title: 'scrollBar',
				icon: 'vue',
			},
		},
		{
			path: '/uiComp/terminal',
			name: 'Terminal',
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
