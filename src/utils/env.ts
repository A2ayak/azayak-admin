export function getMode(): string {
	return import.meta.env.MODE
}

export function setTheme() {
	const mode: string = getMode()
	const theme: string = ['development', 'production'].includes(mode) ? 'default' : mode
	const htmlDom: HTMLElement = document.getElementsByTagName('html')[0]
	htmlDom.setAttribute('data-theme', theme)
	// 设置不同主题系统的图标，图标应保存于public文件夹内
	// if (theme === 'theme') {
	//   document.getElementsByTagName('link')[0].setAttribute('href', './xxx.ico')
	// }
}
