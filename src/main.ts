import { createApp } from 'vue'
import App from './App.vue'

import 'uno.css'
import '@/styles/scss/index.scss'
import { setupStore } from './store'
import { setupRouter } from './router'

function bootstrap() {
  const app = createApp(App)

  // 配置store
  setupStore(app)

  // 配置路由
  setupRouter(app)

  app.mount('#app')
}
bootstrap()
