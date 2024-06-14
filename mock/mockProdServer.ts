import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// 逐一导入您的mock.ts文件
// 如果使用vite.mock.config.ts，只需直接导入文件
// 可以使用 import.meta.glob功能来进行全部导入
import { MockMethod } from 'vite-plugin-mock'

import user from './modules/user'

const mockModules: MockMethod[] = [...user]

export function setupProdMockServer() {
	createProdMockServer([...mockModules])
}
