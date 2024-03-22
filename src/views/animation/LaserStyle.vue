<template>
	<!-- <div>laserStyle</div> -->
	<div ref="wrapperRef" class="laser-style-wrapper h-full w-full bg-black">
		<canvas ref="canvasRef" class="canvas" :width="w" :height="h" />
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const props = withDefaults(
	defineProps<{
		w?: number
		h?: number
		n?: number
		v?: number
		lineWidth?: number
		tail?: number
		showCircle?: boolean
	}>(),
	{
		n: 40, // 射线条数
		v: 5, // 速度
		lineWidth: 2, // 射线宽度
		tail: 60, // 射线尾长
		showCircle: false, // 是否渲染射线头部圆形
	}
)

function randomRange(min: number, max: number) {
	return Math.floor(Math.random() * (max - min)) + min
}
function laserStyle(canvasDom: HTMLCanvasElement) {
	const ctx = canvasDom.getContext('2d')
	const w = canvasDom.width
	const h = canvasDom.height
	// 创建射线
	function createLasers(n: number) {
		const lasers = []
		for (let i = 0; i < n; ++i) {
			lasers.push({
				x: randomRange(props.lineWidth, w - props.lineWidth - 1), // 防止左右越界
				y: Math.floor(h + Math.random() * 500),
				v: Math.random() * props.v,
				opacity: 1,
			})
		}
		return lasers
	}
	// 渲染射线
	function renderLaser(line: ReturnType<typeof createLasers>[number]) {
		const grad = ctx!.createLinearGradient(line.x, line.y, line.x, line.y + props.tail)
		grad!.addColorStop(0, 'rgba(0, 223, 227, 1)')
		grad!.addColorStop(1, 'rgba(24, 60, 86, 0.01)')
		ctx!.strokeStyle = grad!
		ctx!.lineWidth = props.lineWidth
		ctx!.globalAlpha = line.opacity
		ctx!.beginPath()
		ctx!.moveTo(line.x, line.y)
		ctx!.lineTo(line.x, line.y + props.tail)
		ctx!.stroke()
		ctx!.closePath()
		// 射线头部的圆形
		if (props.showCircle) {
			ctx?.beginPath()
			ctx?.arc(line.x, line.y - 5, 5, 0, Math.PI * 2)
			ctx!.fillStyle = 'rgba(0, 223, 227, 1)'
			ctx!.globalAlpha = line.opacity
			ctx!.shadowBlur = 12 // 模糊尺寸
			ctx!.shadowColor = 'rgba(0, 223, 227, .3)'
			ctx!.fill()
			ctx!.closePath()
		}
	}
	// 更新射线
	function updateLaser() {
		// 清除画布
		ctx!.clearRect(0, 0, w, h)
		// 重新画图
		lasers.map((line) => {
			line.y -= line.v
			if (line.y < -0.5 * h) {
				line.x = randomRange(props.lineWidth, w - props.lineWidth - 1)
				line.y = h + Math.random() * 200
				line.opacity = 1
			}
			// 射线淡出
			const triggerPercent = line.y / (0.1 * h + props.tail) // 开始淡出的百分比
			if (line.y < 0.1 * h + props.tail && triggerPercent > 0) {
				line.opacity = triggerPercent
			}
		})
		lasers.map((line) => {
			renderLaser(line)
		})
		window.requestAnimationFrame(updateLaser)
	}

	// 渲染
	// const lasers = createLasers(props.n)
	// lasers.map((line) => {
	// 	renderLaser(line)
	// })
	// updateLaser()
}

const wrapperRef = ref()
const canvasRef = ref()
onMounted(() => {
	const canvas = canvasRef.value
	const wrapper = wrapperRef.value
	if (!props.w) {
		canvas.width = wrapper.clientWidth
	}
	if (!props.h) {
		canvas.height = wrapper.clientHeight
	}
	console.log(canvas, canvas.width, canvas.height)
	setTimeout(() => {
		laserStyle(canvas)
	})
})
</script>
<style scoped lang="less"></style>
