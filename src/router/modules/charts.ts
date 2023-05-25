import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const chartsRoute: RouteRecordRaw = {
	path: '/charts',
	name: 'charts',
	component: Layout,
	meta: {
		hidden: false,
		title: '可视化图表',
		icon: 'vue',
	},
	children: [
		{
			path: '/charts/lineChart',
			name: 'lineChart',
			component: () => import('@/views/charts/lineChart.vue'),
			meta: {
				hidden: false,
				title: '折线图',
				icon: 'vue',
			},
		},
		{
			path: '/charts/pieChart',
			name: 'pieChart',
			component: () => import('@/views/charts/pieChart.vue'),
			meta: {
				hidden: false,
				title: '饼图',
				icon: 'vue',
			},
		},
	],
}

export default chartsRoute
