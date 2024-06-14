import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend' // 支持setup内写name属性，利于keepAlive
import AutoImport from 'unplugin-auto-import/vite' // 自动导入某些包的Api, 生成auto-import.d.ts
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { generateThemeVars } from './src/style/theme'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
// vxe-table
import { createStyleImportPlugin, VxeTableResolve } from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	const { VITE_APP_NAME } = loadEnv(mode, process.cwd()) // 加载环境变量
	console.log('当前模式', mode)

	return {
		// base: VITE_APP_NAME,
		server: {
			host: true,
			port: 8080,
			open: true,
			// proxy: {
			//   '/api': {
			//     target: 'http://192.168.1.1',
			//     changeOrigin: true
			//   }
			// }
		},
		plugins: [
			vue(),
			vueJsx(),
			VueSetupExtend(),
			createSvgIconsPlugin({
				iconDirs: [resolve(__dirname, 'src/assets/svg')],
				symbolId: 'icon-[dir]-[name]',
			}),
			AutoImport({
				// dts: 'src/auto-imports.d.ts', // 可以自定义文件生成的位置，默认是根目录下
				imports: ['vue'],
			}),
			Components({
				dirs: ['src/components/globalComp'],
				resolvers: [
					AntDesignVueResolver({
						importStyle: false,
						exclude: ['ADatePicker', 'ARangePicker'],
					}),
				],
			}),
			// https://github.com/vbenjs/vite-plugin-mock/blob/v2.9.1/README.zh_CN.md
			viteMockServe({
				mockPath: 'mock',
				supportTs: true,
				prodEnabled: true,
			}),
			createStyleImportPlugin({
				resolves: [VxeTableResolve()],
			}),
		],
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src'),
				assets: resolve(__dirname, 'src/assets'),
			},
		},
		css: {
			preprocessorOptions: {
				less: {
					modifyVars: generateThemeVars(mode),
					javascriptEnabled: true,
					additionalData: mode === 'theme' ? '@import "@/style/otherTheme.less";' : '',
				},
			},
		},
	}
})
