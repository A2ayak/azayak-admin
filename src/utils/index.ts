export function range(start: number, end: number) {
	return new Array(end - start + 1).fill(0).map((i, idx) => start + idx)
}

export function sleep(time: number) {
	return new Promise((resolve) => setTimeout(resolve, time))
}
