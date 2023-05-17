import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const animationRoute: RouteRecordRaw = {
	path: '/animation',
	name: 'animation',
	component: Layout,
	meta: {
		hidden: false,
		title: '动画',
		icon: 'animation',
	},
	children: [
		{
			path: 'laserStyle',
			name: 'laserStyle',
			component: () => import('@/views/animation/laserStyle.vue'),
			meta: {
				hidden: false,
				title: '上升射线',
			},
		},
	],
}

export default animationRoute
