import { createApp } from 'vue'
import App from './App.vue'

import 'uno.css'
import { setupStore } from './store'
import { setupRouter } from './router'

async function bootstrap() {
  const app = createApp(App)

  // 配置store
  setupStore(app)

  // 配置路由
  setupRouter(app)

  app.mount('#app')
}
bootstrap()
