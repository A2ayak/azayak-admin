export function isType(type: string) {
	return Object.prototype.toString.call(type).slice(8, -1)
}

export function rgbToRgba(rgb: string, opacity = 0.3) {
	if (!rgb.startsWith('rgb(')) return rgb
	let r, g, b
	const rgbArr = rgb.match(/[\d.]+/g)
	if (rgbArr && rgbArr.length >= 3) {
		r = rgbArr[0]
		g = rgbArr[1]
		b = rgbArr[2]
		return `rgba(${r}, ${g}, ${b}, ${opacity})`
	}
	console.warn('检查参数是否为合法的rgb')
	return rgb
}

export function hexToRgba(hex: string, opacity = 0.3) {
	if (!hex.startsWith('#')) return hex
	hex = hex.replace('#', '')
	const r = parseInt(hex.substring(0, 2), 16)
	const g = parseInt(hex.substring(2, 4), 16)
	const b = parseInt(hex.substring(4, 6), 16)
	return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

export function formatToRgba(color: string, opacity = 0.3) {
	if (color.startsWith('#')) {
		return hexToRgba(color, opacity)
	}
	if (color.startsWith('rgb(')) {
		return rgbToRgba(color, opacity)
	}
	console.warn('检查参数')
	return color
}

export function mergeOptions(target: any, source: Recordable, chartType = '') {
	if (isType(target) !== 'Object') {
		target = {}
	}
	const sourceKeys = Object.keys(source)
	if (!sourceKeys.length) {
		return target
	}
	sourceKeys.forEach((property) => {
		const sourceProperty = source[property]
		const type = isType(sourceProperty)
		if (type === 'Object') {
			target[property] = mergeOptions(target[property], sourceProperty, chartType)
		} else if (type === 'Array' && (property !== 'data' || chartType === 'pie')) {
			// 处理property为数组的情况，position、padding等，后续完善
			if (['position', 'padding', 'radius'].includes(property)) {
				target[property] = sourceProperty
				return
			}
			// 此处一般处理option的series，饼图配置都在series的data里，手动实现对数轴的柱状图的data为简单数组，走else直接替换
			sourceProperty.map((item: any, index: number) => {
				if (item.name) {
					const targetIndex = target[property].findIndex((target) => target.name === item.name)
					mergeOptions(target[property][targetIndex], item, chartType)
				} else {
					mergeOptions(target[property][index], item, chartType)
				}
			})
		} else {
			target[property] = sourceProperty
		}
	})
	return target
}
