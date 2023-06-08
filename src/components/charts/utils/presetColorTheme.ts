const themes: Recordable = {
	default: {
		seriesColors: ['#00B0E6', '#35CEDE'],
		tooltipTitleColor: '#606266',
		tooltipTextColor: '#606266',
		tooltipLineColor: 'rgba(#000, .15)',
		tooltipBGColor: '#fff',
		xAxisLineColor: '#E4E7ED',
		xAxisLabelColor: '#606266',
		yAxisSplitLineColor: '#373D50',
		yAxisLineColor: '#373D50',
		yAxisLabelColor: '#373D50',
		legendTextColor: '#373D50',
	},
}

export function switchColorTheme(theme: string) {
	return themes[theme] ?? themes.default
}
