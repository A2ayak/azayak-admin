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
			path: '/charts/barChart',
			name: 'barChart',
			component: () => import('@/views/charts/BarChart.vue'),
			meta: {
				hidden: false,
				title: '柱状图',
				icon: 'vue',
			},
		},
		{
			path: '/charts/lineChart',
			name: 'lineChart',
			component: () => import('@/views/charts/LineChart.vue'),
			meta: {
				hidden: false,
				title: '折线图',
				icon: 'vue',
			},
		},
		{
			path: '/charts/pieChart',
			name: 'pieChart',
			component: () => import('@/views/charts/PieChart.vue'),
			meta: {
				hidden: false,
				title: '饼图',
				icon: 'vue',
			},
		},
		{
			path: '/charts/linkageDemo',
			name: 'linkageDemo',
			component: () => import('@/views/charts/ZLinkageDemo.vue'),
			meta: {
				hidden: false,
				title: 'ECharts联动实例',
				icon: 'vue',
			},
		},
	],
}

export default chartsRoute
