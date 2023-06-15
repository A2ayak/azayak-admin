// 数组转tree
export function arrToTree(arrData: any[], rootId = 0) {
	const result: any[] = []
	const itemMap: Recordable = {}
	arrData.map((item) => {
		const id = item.id
		const pid = item.pid
		if (!itemMap[id]) itemMap[id] = []
		if (!itemMap[pid]) itemMap[pid] = []
		itemMap[pid].push(item)
		item['children'] = itemMap[id]
		if (pid === rootId) {
			result.push(item)
		}
	})
	return result
}
