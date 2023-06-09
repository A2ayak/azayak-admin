import { debounce } from 'lodash-es'
import elementResizeDetectorMaker from 'element-resize-detector'

export function useChartResize(chartDom, chartInstance) {
	console.log(chartInstance, 'zxc')

	const resizeChart = debounce(
		() =>
			chartInstance.resize({
				animation: {
					duration: 300,
					easing: 'ease',
				},
			}),
		500
	)
	const erd = elementResizeDetectorMaker()
	erd.listenTo(chartDom.value, resizeChart)
}
