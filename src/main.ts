import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import 'ant-design-vue/dist/antd.less'
import '@/style/index.css'
import '@/style/index.less'
import 'virtual:svg-icons-register' // svg
import permissionGuards from '@/router/permission'

import { setAntdvCompConfig } from './plugins/antdvCompConfig'
import { setVxeTableConfig } from './plugins/vxeTableConfig'
import { setTheme } from './utils/env'

setTheme()

const app = createApp(App)
app.use(store)
app.use(router)

// 权限-路由守卫
permissionGuards(router)

// antdv全局配置
setAntdvCompConfig(app)
// vxe-table配置
setVxeTableConfig(app)
document.title = import.meta.env.VITE_APP_NAME

app.mount('#app')
