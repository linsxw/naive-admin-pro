import { createApp } from 'vue'
import App from './App.vue'

// import '@unocss/reset/tailwind.css'
import '@unocss/reset/tailwind-compat.css'

import 'uno.css'
import '@/styles/scss/index.scss'
import { setupStore } from './store'
import { setupRouter } from './router'
import { setupNaiveDiscreteApi } from '@/plugins'

function bootstrap() {
  const app = createApp(App)

  // 配置store
  setupStore(app)

  // 配置NaiveUI 全局API
  setupNaiveDiscreteApi()

  // 配置路由
  setupRouter(app)

  app.mount('#app')
}
bootstrap()
