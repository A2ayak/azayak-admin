/// <reference types="vite/client" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
	export default component
}

declare type Nullable<T> = T | null
declare type Recordable<T = any> = Record<string, T>
declare type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>

declare interface Response<T = any> {
	code: number
	result: T
	[key: string]: any
}

// 深层次可选属性
declare type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends Record<string, unknown> ? DeepPartial<T[P]> : T[P]
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
