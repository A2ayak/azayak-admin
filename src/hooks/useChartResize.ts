import { debounce } from 'lodash-es'
import elementResizeDetectorMaker from 'element-resize-detector'
import { EChartsType } from 'echarts'

export function useChartResize(chartDom: HTMLElement, chartInstance: EChartsType) {
	console.log(chartInstance, 'zxc')

	const resizeChart = debounce(
		() =>
			chartInstance.resize({
				animation: {
					duration: 300,
					easing: 'linear',
				},
			}),
		500
	)
	const erd = elementResizeDetectorMaker()
	erd.listenTo(chartDom, resizeChart)
}
