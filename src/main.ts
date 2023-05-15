import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/index.css'
import '@/style/index.less'
import 'ant-design-vue/dist/antd.less'
import 'virtual:svg-icons-register' // svg

import { setAntdvCompConfig } from './plugins/antdvCompConfig'
import { setTheme } from './utils/env'

setTheme()

const app = createApp(App)
app.use(store)
app.use(router)

// antdv全局配置
setAntdvCompConfig(app)
document.title = import.meta.env.VITE_APP_NAME

app.mount('#app')
