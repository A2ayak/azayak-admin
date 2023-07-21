/** @type {import('tailwindcss').Config} */
// import { generateThemeVars } from './src/style/theme'

module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			spacing: generateSpacing(),
			colors: {
				primary: 'rgba(var(--color-primary), <alpha-value>)',
				success: 'rgba(var(--color-success), <alpha-value>)',
				warning: 'rgba(var(--color-warning), <alpha-value>)',
				danger: 'rgba(var(--color-danger), <alpha-value>)',
				info: 'rgba(var(--color-info), <alpha-value>)',
				'text-one': 'rgba(var(--color-text-one), <alpha-value>)',
				'text-two': 'rgba(var(--color-text-two), <alpha-value>)',
				'text-three': 'rgba(var(--color-text-three), <alpha-value>)',
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
