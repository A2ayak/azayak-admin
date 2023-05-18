/// <reference types="vite/client" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}

declare type Nullable<T> = T | null
declare type Recordable<T = any> = Record<string, T>

declare interface response {
	code: number
	result: any
	[key: string]: any
}

interface ImportMetaEnv {
	readonly VITE_APP_NAME: string
	readonly VITE_API_PREFIX: string
	readonly VITE_MOCK_API_PREFIX: string
	// 更多环境变量...
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
