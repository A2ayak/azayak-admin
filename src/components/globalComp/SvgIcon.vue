<template>
	<svg aria-hidden="true" :type="type" :class="['svg-icon', className]" :style="iconStyle">
		<use :href="symbolId" />
	</svg>
</template>

<script setup lang="ts" name="SvgIcon">
import { computed, CSSProperties } from 'vue'
interface SvgProps {
	icon: string
	type?: string
	prefix?: string
	size?: number | string
	className?: string
}
const props = withDefaults(defineProps<SvgProps>(), {
	type: 'default',
	prefix: 'icon',
	className: '',
	size: 16,
})

const iconStyle = computed((): CSSProperties => {
	const { size } = props
	const formatSize = `${size}`.replace('px', '').concat('px')
	return {
		width: formatSize,
		height: formatSize,
	}
})

const symbolId = computed(() => `#${props.prefix}-${props.icon}`)
</script>
<style lang="less" scope>
.svg-icon {
	width: 1rem;
	height: 1rem;
	vertical-align: -0.1em; /* 因icon大小被设置为和字体大小一致，而span等标签的下边缘会和字体的基线对齐，故需设置一个往下的偏移比例，来纠正视觉上的未对齐效果 */
	display: inline-block;
	&[type='default'],
	&[type='primary'] {
		@apply fill-primary;
	}
}
</style>
