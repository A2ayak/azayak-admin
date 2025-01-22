import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const chartsRoute: RouteRecordRaw = {
	path: '/charts',
	name: 'Charts',
	component: Layout,
	meta: {
		hidden: false,
		title: '可视化图表',
		icon: 'vue',
		order: 3,
	},
	children: [
		{
			path: '/charts/barChart',
			name: 'BarChart',
			component: () => import('@/views/charts/BarChart.vue'),
			meta: {
				hidden: false,
				title: '柱状图',
				icon: 'vue',
			},
		},
		{
			path: '/charts/lineChart',
			name: 'LineChart',
			component: () => import('@/views/charts/LineChart.vue'),
			meta: {
				hidden: false,
				title: '折线图',
				icon: 'vue',
			},
		},
		{
			path: '/charts/pieChart',
			name: 'PieChart',
			component: () => import('@/views/charts/PieChart.vue'),
			meta: {
				hidden: false,
				title: '饼图',
				icon: 'vue',
			},
		},
		{
			path: '/charts/linkageDemo',
			name: 'LinkageDemo',
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
