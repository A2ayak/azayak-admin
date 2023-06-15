export function mapToSelectOptions(map: Map<any, any>) {
	const res = []
	for (const [value, label] of map) {
		res.push({ label, value })
	}
	return res
}
