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
