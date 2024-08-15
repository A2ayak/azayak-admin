<template>
	<div ref="wrapperRef" class="roll" @mouseenter="isHover = true" @mouseleave="isHover = false">
		<el-scrollbar wrap-class="overflow-x-hidden" style="height: 100%">
			<div
				class="roll-ul"
				:class="{ animationCls: isAnimation }"
				:style="{
					marginTop: isAnimation ? `-${lineHeight + itemGap}px` : '',
					'padding-right': scrollPaddingRight + 'px',
					'--scrollTime': scrollTime + 'ms',
				}"
			>
				<div v-for="item in compScrollData" :key="item.keyIndex" class="roll-li" :style="{ height: `${lineHeight}px`, '--itemGap': `${itemGap}px` }">
					<slot :item="item.data" :index="item.keyIndex"></slot>
				</div>
			</div>
		</el-scrollbar>
	</div>
</template>

<script lang="ts" setup name="AutoScroll">
const props = withDefaults(
	defineProps<{
		scrollData: unknown[] // 滚动数据
		showNum?: number // 列表显示的数据数量
		isScroll?: boolean // 是否开启滚动
		waitTime?: number // 滚动等待时间
		scrollPaddingRight?: number // 右侧padding，为滚动条预留宽度
		itemGap?: number // 滚动item的上下间隔
		scrollTime?: number // 滚动动画时间
	}>(),
	{
		showNum: 5,
		isScroll: true,
		waitTime: 5500,
		scrollPaddingRight: 12,
		itemGap: 0,
		scrollTime: 600,
	}
)

interface CompScrollData {
	keyIndex: number
	data: unknown
}

const wrapperRef = ref()
const isHover = ref(false)
const timer = ref<NodeJS.Timeout>()
const lineHeight = ref(0) // 每行行高
const isAnimation = ref(false) // 是否开启动画
const compScrollData = ref<CompScrollData[]>([])

function move() {
	if (!isHover.value && props.scrollData.length > props.showNum) {
		isAnimation.value = true
		setTimeout(() => {
			compScrollData.value.push(compScrollData.value[0])
			compScrollData.value.shift()
			isAnimation.value = false
		}, props.scrollTime + 500)
	}
}

watch(
	props.scrollData,
	(newVal) => {
		if (newVal) {
			compScrollData.value = newVal.map((data, index) => {
				return { keyIndex: index + 1, data }
			})
		}
	},
	{ deep: true, immediate: true }
)

onMounted(() => {
	lineHeight.value = (wrapperRef.value.offsetHeight - props.itemGap * (props.showNum - 1)) / props.showNum
	if (props.isScroll) {
		timer.value = setInterval(move, props.waitTime)
	}
})

onUnmounted(() => {
	clearInterval(timer.value as NodeJS.Timeout)
})
</script>
<style lang="less" scoped>
.roll {
	border: none;
	width: 100%;
	height: 100%;

	&:hover {
		overflow-y: auto;
	}

	::v-deep .el-scrollbar__view {
		height: 100%;
	}

	.roll-ul {
		width: 100%;
		will-change: margin;

		&.animationCls {
			transition: all ease var(--scrollTime);
		}

		li {
			list-style: none;

			&.roll-li {
				widows: 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				justify-content: center;
				margin-top: var(--itemGap);

				&:first-child {
					margin-top: 0;
				}
			}
		}
	}
}
</style>
