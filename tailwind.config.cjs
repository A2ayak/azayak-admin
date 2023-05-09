/** @type {import('tailwindcss').Config} */
// import { generateThemeVars } from './src/style/theme'

module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			spacing: generateSpacing(),
			colors: {
				primary: 'rgba(var(--color-primary), <alpha-value>)',
			},
		},
	},
	plugins: [],
}

// 自定义间距
function generateSpacing() {
	const temObj = {}
	for (let i = 1; i < 12; i++) {
		temObj[i] = i * 4 + 'px'
	}
	return temObj
}
