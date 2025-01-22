import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const animationRoute: RouteRecordRaw = {
	path: '/animation',
	name: 'Animation',
	component: Layout,
	meta: {
		hidden: false,
		title: '动画',
		icon: 'vue',
		order: 2,
	},
	children: [
		{
			path: '/animation/laserStyle',
			name: 'LaserStyle',
			component: () => import('@/views/animation/LaserStyle.vue'),
			meta: {
				hidden: false,
				title: '上升射线',
				icon: 'vue',
			},
		},
		{
			path: '/animation/svgPath',
			name: 'SvgPath',
			component: () => import('@/views/animation/SvgPath.vue'),
			meta: {
				hidden: false,
				title: '路径动画',
				icon: 'vue',
			},
		},
	],
}

export default animationRoute
