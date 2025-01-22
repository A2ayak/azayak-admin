import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import 'ant-design-vue/dist/antd.less'
import '@/style/index.css'
import '@/style/index.less'
import 'virtual:svg-icons-register' // svg
import setupPermission from '@/router/permission'

import { setupAntdvCompConfig } from './plugins/antdvCompConfig'
import { setupVxeTableConfig } from './plugins/vxeTableConfig'
import { setupTheme } from './utils/env'
import { setupProdMockServer } from '../mock/mockProdServer'

setupTheme()

const app = createApp(App)
app.use(store)
app.use(router)

// 权限-路由守卫
setupPermission(router)

// antdv全局配置
setupAntdvCompConfig(app)
// vxe-table配置
setupVxeTableConfig(app)
document.title = import.meta.env.VITE_APP_NAME

if (process.env.NODE_ENV === 'production') {
	setupProdMockServer()
}

app.mount('#app')
