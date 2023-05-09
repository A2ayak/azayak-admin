// import { resolve } from "path"

export function generateThemeVars(mode: string) {
	switch (mode) {
		case 'theme': {
			return {
				'primary-color': '#C3916A',
			}
		}
		default: {
			return {
				'primary-color': '#409eff',
			}
		}
	}
	// return {
	// 	// hack: `true; @import (reference) "${resolve("src/style/theme.less")}";`,
	// 	'primary-color': '#409eff',
	// }
}
