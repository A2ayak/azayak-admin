import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const chartsRoute: RouteRecordRaw = {
	path: '/charts',
	name: 'charts',
	component: Layout,
	meta: {
		hidden: false,
		title: '可视化图表',
		icon: 'chart',
	},
	children: [
		{
			path: 'lineChart',
			name: 'lineChart',
			component: () => import('@/views/charts/lineChart.vue'),
			meta: {
				hidden: false,
				title: '折线图',
			},
		},
		{
			path: 'pieChart',
			name: 'pieChart',
			component: () => import('@/views/charts/pieChart.vue'),
			meta: {
				hidden: false,
				title: '饼图',
			},
		},
	],
}

export default chartsRoute
