import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const animationRoute: RouteRecordRaw = {
	path: '/animation',
	name: 'animation',
	component: Layout,
	meta: {
		hidden: false,
		title: '动画',
		icon: 'vue',
	},
	children: [
		{
			path: '/animation/laserStyle',
			name: 'laserStyle',
			component: () => import('@/views/animation/LaserStyle.vue'),
			meta: {
				hidden: false,
				title: '上升射线',
				icon: 'vue',
			},
		},
	],
}

export default animationRoute
