<template>
	<div class="w-full h-full relative">
		<div
			ref="pieChartDom"
			class="w-full h-full"
			style="
				 {
					left: leftPosPercent;
				}
			"
		></div>
		<div v-if="showCustomText" class="absolute top-3/5 transform -translate-x-1/2 -translate-y-1/2 text-center">
			<div class="total">{{ total }}</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue'
import { mergeOptions } from './utils'
import { switchColorTheme } from './utils/presetColorTheme'
import { init } from 'echarts'
import { PieSeriesOption, EChartsType, EChartsOption } from 'echarts'
import { useChartResize } from '@/hooks/useChartResize'

const pieChartDom = ref()
let chartInstance: Nullable<EChartsType> = null

const total = computed(() => {
	return props.seriesData.reduce((pre: number, cur: any) => pre + Number(cur.value), 0)
})

interface pieProps {
	// 图表数据，默认传入格式为 seriesData: [{ name: 'xx', value: 'xxx' }, ...]
	seriesData: Recordable[]
	// 额外配置
	extraOptions?: Recordable
	// 主题颜色
	theme?: string
	// 自定义个别主题的颜色，一般用不到
	extraColors?: Recordable<string>
	// 饼图中间标题
	showCustomText: boolean
	// 饼图距离左侧的百分比位置
	leftPosPercent: string
	// 饼图距离上方的百分比位置
	topPosPercent: string
}
const props = withDefaults(defineProps<pieProps>(), {
	seriesData: () => [],
	extraOptions: () => ({}),
	theme: '',
	extraColors: () => ({}),
	showCustomText: false,
	leftPosPercent: '50%',
	topPosPercent: '60%',
})

function initChart() {
	chartInstance = init(pieChartDom.value as HTMLElement)
	const { seriesColors, tooltipTextColor, tooltipBGColor, legendTextColor } = Object.assign(switchColorTheme(props.theme), props.extraColors)

	function tooltipFormatterFn(item: any) {
		let str = ''
		str += `<span
       style="width: 8px; height: 8px; border-radius: 50%; background-color: ${item.color}; display: inline-block; vertical-align: middle; margin-right: 8px;">
      </span>`
		str += `<span style="color: ${tooltipTextColor}; font-weight: bold">
        ${item.name}：${item.value} (${item.percent}%)
      </span>`
		return str
	}

	const seriesData: any[] = []
	const legendData: any[] = []
	props.seriesData.map((item, index) => {
		seriesData.push({
			name: item.name,
			value: item.value,
			label: {
				show: true,
				fontSize: 16,
				overflow: 'break',
				formatter: '{b}: {c}',
				// position: 'center',
			},
			labelLine: {
				show: true,
				// smooth: true,
			},
			// emphasis: {} // 高亮状态样式
		})
		legendData.push({
			name: item.name,
			// icon: 'circle'
		})
	})

	let initOptions: EChartsOption = {
		// 全局颜色，与图例颜色相关
		color: seriesColors,
		grid: {
			top: 16,
			left: 10,
			bottom: 10,
			right: 10,
			containLabel: true,
		},
		series: {
			type: 'pie',
			radius: ['40%', '55%'],
			center: [props.leftPosPercent, props.topPosPercent], // 饼图位置
			data: seriesData,
			// avoidLabelOverlap: false,
		} as PieSeriesOption,
		tooltip: {
			trigger: 'item',
			position: 'inside',
			padding: 16,
			backgroundColor: tooltipBGColor,
			formatter: tooltipFormatterFn,
		},
		// 图例
		legend: {
			show: false,
			type: 'scroll',
			orient: 'vertical',
			icon: 'circle', // 或自定义svg
			top: 7,
			right: 30,
			itemWidth: 20,
			itemGap: 32,
			data: legendData,
			textStyle: {
				color: legendTextColor,
				// rich: {
				//   styleOne: {
				//     color: '#606266',
				//     fontSize: 16
				//   }
				// }
			},
			// inactiveColor: '#ccc',
			formatter: function (name) {
				for (const item of props.seriesData) {
					if (item.name === name) {
						return name.length > 7 ? name.slice(0, 5) + '...' : name
					}
				}
				// return `{styleOne|${name}}` + '\n' + `{styleOne|${name}}`
				return name
			},
		},
	}
	if (Object.keys(props.extraOptions).length) {
		initOptions = mergeOptions(initOptions, props.extraOptions)
	}
	chartInstance.setOption(initOptions)
	chartInstance.on('click', (params: any) => {
		emits('click', params)
	})
}

const emits = defineEmits<{
	(e: 'click', params: any): void
}>()

watch(
	[() => props.seriesData],
	() => {
		initChart()
	},
	{ deep: true }
)

onMounted(() => {
	initChart()
	useChartResize(pieChartDom.value, chartInstance!)
})
</script>
<style scoped lang="less"></style>
