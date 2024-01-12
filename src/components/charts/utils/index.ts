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

/**
 * 最大余额法（用于和echarts数据百分比一致，加上所有百分比应为100）
 * @param valueListArr 数组数据
 * @param idx 数组下标
 * @param precision 精度
 * @returns {number}
 * @example
 * const arr = [1, 1, 5]
 * console.log(getPercentValue(arr, 0, 2)) // 14.29
 * console.log(getPercentValue(arr, 1, 2)) // 14.28
 * console.log(getPercentValue(arr, 2, 2)) // 71.4314.29 + 14.28 + 71.43 = 100
 */
export function getPercentValue(valueListArr, idx, precision) {
	// 判断是否为空
	if (!valueListArr[idx]) {
		return 0
	}

	// 数组数据求和，若和为0则返回0
	const sum = valueListArr.reduce((a, c) => {
		return (a += isNaN(c) ? 0 : c)
	}, 0)
	if (sum === 0) {
		return 0
	}

	// 10的二次幂是100， 用于计算精度
	const digits = Math.pow(10, precision)
	// 扩大比例100
	const votesPerQuota = valueListArr.map((val) => {
		return ((isNaN(val) ? 0 : val) / sum) * digits * 100
	})

	// 总数，扩大比例意味总数要扩大
	const targetSeats = digits * 100
	// 再向下取值，组成数组
	const seats = votesPerQuota.map((votes) => {
		return Math.floor(votes)
	})

	// 在新计算合计，用于判断与总数量是否相同，相同则占比会100%
	let currentSum = seats.reduce((a, c) => {
		return a + c
	}, 0)

	// 余数部分的数组：原先数组减去向下取值的数组，得到余数部分的数组
	const remainder = votesPerQuota.map((votes, idx) => {
		return votes - seats[idx]
	})

	while (currentSum < targetSeats) {
		let max = Number.NEGATIVE_INFINITY
		let maxId = null
		for (let i = 0; i < remainder.length; i++) {
			if (remainder[i] > max) {
				max = remainder[i]
				maxId = i
			}
		}

		// 对最大余额项加1
		++seats[maxId]
		// 已经对最大余数加1，则下次判断就跳过该余额数
		remainder[maxId] = 0
		// 总的也要加1，用来结束循环
		++currentSum
	}

	return seats[idx] / digits
}
