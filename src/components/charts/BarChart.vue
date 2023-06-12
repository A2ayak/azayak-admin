<template>
	<div ref="barChartDom" style="width: 100%; height: 100%"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { mergeOptions } from './utils'
import { switchColorTheme } from './utils/presetColorTheme'
import * as echarts from 'echarts'
import { BarSeriesOption } from 'echarts'
import { useChartResize } from '@/hooks/useChartResize'

const barChartDom = ref()
let chartInstance: Nullable<echarts.ECharts> = null

interface BarProps {
	// 图表数据，默认传入格式为 seriesData: [[series1数据], [series2数据], ...]，数据顺序与legendName数组顺序一致
	seriesData: any[]
	// 横坐标Label
	xAxisData: any[]
	// 图例/series名
	seriesName: string[]
	// 额外配置
	extraOptions?: Recordable
	// 主题颜色
	theme?: string
	// 自定义个别主题的颜色，一般用不到
	extraColors?: Recordable<string>
	// 柱状图类型，目前只有不填和log（type="log"），表示使用手动模拟指数类型
	type?: string
	// 是否开启dataZoom
	dataZoom?: boolean
	// 是否为左右对比图，用于调整tooltip里的负值
	isLeftRightCompare?: boolean
	// 是否为上下对比图，有一个系列的值会被取反为负值
	isTopBottomCompare?: boolean
}

const props = withDefaults(defineProps<BarProps>(), {
	seriesData: () => [],
	xAxisData: () => [],
	seriesName: () => [],
	extraOptions: () => ({}),
	theme: '',
	extraColors: () => ({}),
	type: '',
	dataZoom: true,
	isLeftRightCompare: false,
	isTopBottomCompare: false,
})

function initChart() {
	chartInstance = echarts.init(barChartDom.value as HTMLElement)
	const {
		seriesColors,
		tooltipTitleColor,
		tooltipTextColor,
		tooltipLineColor,
		tooltipBGColor,
		xAxisLineColor,
		xAxisLabelColor,
		yAxisSplitLineColor,
		yAxisLineColor,
		yAxisLabelColor,
		legendTextColor,
	} = Object.assign(switchColorTheme(props.theme), props.extraColors)

	function tooltipFormatterFn(item: any) {
		const seriesIndex = item.seriesIndex
		const dataIndex = item.dataIndex

		let str = ''
		if (props.isLeftRightCompare) {
			str += `<div style="font-size: 16px; font-weight: 600; color: ${tooltipTitleColor}; margin-bottom: 8px">${item.name}</div>`
			props.seriesData.map((i, index) => {
				let tempStr = ''
				tempStr += `<span style="width: 8px; height: 8px; border-radius: 50%; background-color: ${seriesColors[index]}; display: inline-block; vertical-align: middle; margin-right: 10px;"></span>`
				tempStr += `<span style="color: ${tooltipTextColor}">${props.seriesName[index]}: ${
					props.isTopBottomCompare && index === 0 ? 0 - props.seriesData[index][item.dataIndex] : props.seriesData[index][item.dataIndex]
				} </span>`
				str += `<div style="display: flex; align-items: center">${tempStr}</div>`
			})
		} else {
			str += `<span style="color: ${tooltipTextColor}">${item.name}</span>`
			str += `<span style="color: ${tooltipTextColor}; margin-left: 8px">${props.seriesData[seriesIndex][dataIndex]}</span>`
		}
		return str
	}

	const seriesData = props.seriesData.map((data, index) => {
		return {
			name: props.seriesName[index],
			data: data,
			type: 'bar',
			barMaxWidth: 24, // 柱状条最大宽度
			itemStyle: {
				color: seriesColors[index], // 柱状条颜色
				label: {
					textStyle: {
						fontSize: 15,
						color: xAxisLabelColor,
					},
				},
			},
			label: {
				// 通常状态，即不选中状态
				normal: {
					show: false, // 显示数字
					position: 'top',
					color: '#606266',
					fontSize: 14,
					// formatter: (i) => {
					// 	return i.value > 10000 ? (i.value / 10000).toFixed(2) + 'w' : i.value
					// },
				},
			},
			showBackground: false, // 背景框
			backgroundStyle: {
				color: '#142D4B', //背景柱状条
			},
		}
	}) as BarSeriesOption[]

	let initOptions: echarts.EChartsOption = {
		// 全局颜色，与图例颜色相关
		color: seriesColors,
		grid: {
			top: 16,
			left: 10,
			bottom: 10,
			right: 10,
			containLabel: true,
		},
		xAxis: {
			data: props.xAxisData,
			type: 'category',
			splitLine: {
				show: false,
				lineStyle: {
					width: 1,
					type: 'solid',
					color: yAxisSplitLineColor,
				},
			},
			axisLabel: {
				show: true,
				color: xAxisLabelColor,
				fontSize: 12,
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: xAxisLineColor,
					width: 1,
				},
			},
			axisTick: { show: false },
		},
		yAxis: {
			show: true,
			// data: {
			// 	value: props.xAxisData,
			// },
			type: 'value',
			splitLine: {
				show: false,
				lineStyle: {
					width: 1,
					type: 'solid',
					color: yAxisSplitLineColor,
				},
			},
			axisLabel: {
				show: true,
				color: yAxisLabelColor,
				fontSize: 12,
			},
			axisLine: {
				show: false,
				lineStyle: {
					color: yAxisLineColor,
					width: 1,
				},
			},
			axisTick: { show: false },
		},
		series: seriesData,
		tooltip: {
			trigger: 'item',
			axisPointer: {
				type: 'shadow',
				label: {
					show: true,
					backgroundColor: '#6C7285',
					fontWeight: 600,
					color: '#6C7285',
					borderWidth: 0,
				},
				lineStyle: {
					type: 'solid',
					width: 1,
					color: tooltipLineColor,
				}, // 数据竖线样式
				z: 1,
			}, // 显示tooltip时label加深样式
			backgroundColor: tooltipBGColor,
			padding: 16,
			borderColor: tooltipLineColor,
			formatter: tooltipFormatterFn,
		},
		// 图例
		legend: {
			show: false,
			icon: 'circle',
			top: 7,
			right: 30,
			itemGap: 32,
			data: props.seriesName,
			textStyle: { color: legendTextColor },
			inactiveColor: '#ccc',
		},
	}
	// 类型type为log时则手动模拟对数轴
	if (props.type === 'log') {
		const logBase = 10
		const max = Math.max(...props.seriesData.flat())
		const min = Math.min(...props.seriesData.flat().filter((e) => e > 0))

		let dMax = 0
		let dMin = 0
		while (Math.pow(logBase, dMax) <= max) {
			dMax++
		}
		while (Math.pow(logBase, dMin) >= min && dMin > -10) {
			dMin--
		}
		const interval = logBase / Math.abs(dMax)
		const logSeriesData = props.seriesData.map((sData) => {
			return {
				data: sData.map((e: any) => {
					return e !== 0 ? Math.log(e / Math.log(logBase)) * interval + interval * Math.abs(dMin) : 0
				}),
			}
		})
		const logTypeOptions = {
			series: logSeriesData,
			yAxis: {
				type: 'value',
				max: logBase + interval * Math.abs(dMin),
				interval: interval,
				min: 0,
				axisLabel: {
					formatter: (e: any) => {
						return e === 0 ? 0 : Math.pow(logBase, (e - interval * Math.abs(dMin)) / interval).toFixed(0)
					},
				},
			},
		}
		initOptions = mergeOptions(initOptions, logTypeOptions)
	}
	if (Object.keys(props.extraOptions).length) {
		initOptions = mergeOptions(initOptions, props.extraOptions)
	}
	if (props.dataZoom) {
		// @ts-ignore
		initOptions.dataZoom = [{ type: 'inside', minValueSpan: 2, maxValueSpan: 10 }]
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
	[() => props.seriesData, () => props.seriesName],
	() => {
		initChart()
	},
	{ deep: true }
)

onMounted(() => {
	initChart()
	useChartResize(barChartDom.value, chartInstance)
})
</script>
<style scoped lang="less"></style>
