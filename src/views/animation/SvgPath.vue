<template>
	<div class="wrapper" @mouseenter="isHover = true" @mouseleave="isHover = false">
		<div class="move-item anim5"></div>

		<!-- 动画轨迹辅助线 -->
		<!-- viewBox: x y w h；M (moveto)、L (lineto)、H (horizontal lineto)、V (vertical lineto)、C (curveto) -->
		<svg viewBox="0 0 1672 500" xmlns="http://www.w3.org/2000/svg" class="run-path">
			<path d="M120,150 C530,670 1080,290 1060,80" stroke-width="5" stroke="#409eff" fill="none"></path>
		</svg>
	</div>
	<div class="w-full h-[200px] bg-black">
		<div class="line-animation"></div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
import { debounce } from 'lodash-es'
import { message } from 'ant-design-vue'

const allData = ref(
	Array(20)
		.fill(0)
		.map((i, idx) => idx)
)
const curPage = ref(0)
const originPage = ref(0)
const totalPage = ref(4)
const SHOW_NUM = 5
const isHover = ref(false)
const curIndex = ref(1)

function activeAnimation() {
	nextTick(() => {
		const className = 'move-item'
		const domCollection = document.getElementsByClassName(className)
		for (let i = 0; i < domCollection.length; i++) {
			const animClassName = `anim${curIndex.value++}`
			// const animClassName = `anim${i + 1}`
			// domCollection[i].classList.add(animClassName)
			domCollection[i].setAttribute('class', `${className}`)
			setTimeout(() => {
				domCollection[i].setAttribute('class', `${className} ${animClassName}`)
			}, 100)
		}
	})
}

function changePageData() {
	allData.value = allData.value.slice((curPage.value - 1) * SHOW_NUM, curPage.value * SHOW_NUM)
}

function jumpPage() {
	debounce(() => {
		if (curPage.value > totalPage.value || curPage.value < 1) {
			message.warning('请输入正确的页码')
			curPage.value = originPage.value
		}
		changePageData()
		activeAnimation()
		originPage.value = curPage.value
	}, 500)()
}

function nextPage() {
	if (curPage.value === totalPage.value) {
		if (curPage.value === 1) return
		if (isHover.value) {
			return
		} else {
			curPage.value = 0
		}
	}
	curPage.value++
	changePageData()
	activeAnimation()
}

let timer: ReturnType<typeof setInterval> // 浏览器环境下为number，NodeJS环境为NodeJS.Timer
onMounted(() => {
	// timer = setInterval(() => {
	// 	activeAnimation()
	// }, 3 * 1000)
})
onUnmounted(() => {
	// clearInterval(timer)
})
</script>
<style scoped lang="less">
.wrapper {
	@apply ~"relative w-full h-[500px] bg-gray-400";
	.run-path {
		@apply absolute;
	}
	.move-item {
		position: absolute;
		z-index: 4080;
		transition: all 0.3s;
		width: 20px;
		height: 20px;
		background-color: #ff5563;

		offset-path: path('M120,150 C530,670 1080,290 1060,80'); // 上方svg-path值
		offset-distance: 0%; // path距离起点的百分比
		offset-anchor: 50% 50%; // 中心
		offset-rotate: 0deg; // 旋转

		@animation-time: 1s;
		.loop(@i) when (@i > 0) {
			&.anim@{i} {
				animation: ~'move@{i}' @animation-time ease-in-out forwards;
			}
			@keyframes ~"move@{i}" {
				to {
					offset-distance: 10% * @i;
				}
			}
			.loop(@i - 1);
		}
		.loop(5);

		// &.anim1 { animation: move1 @animation-time ease-in-out forwards;  }
		// &.anim2 { animation: move2 @animation-time ease-in-out forwards;  }
		// &.anim3 { animation: move3 @animation-time ease-in-out forwards;  }
		// &.anim4 { animation: move4 @animation-time ease-in-out forwards;  }
		// &.anim5 { animation: move5 @animation-time ease-in-out forwards;  }

		// @keyframes move1 {
		// 	to {
		// 		offset-distance: 10%;
		// 	}
		// }
	}
}

.line-animation {
	@keyframes centerMove {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}
	@apply ~"w-[378px]" h-2 overflow-hidden left-12 top-12 z-0 relative bg-transparent;
	&:before {
		content: '';
		width: 375px;
		height: 8px;
		border-radius: 4px;
		position: absolute;
		background-image: linear-gradient(to left, #a7e5e6, rgba(24, 118, 132, 0.7), rgba(24, 118, 132, 0.3));
		transform: translateX(-100%);
		animation: centerMove 5s ease-in-out infinite 1.5s;
	}
}
</style>
