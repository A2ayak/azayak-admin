// 此处无法使用import.meta.glob
import { MockMethod } from 'vite-plugin-mock'

import user from './modules/user'

const mockModules: MockMethod[] = [...user]

export default mockModules
