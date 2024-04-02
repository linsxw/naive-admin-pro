import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layouts/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Index',
        component: () => import('@/views/index.vue'),
      },
    ],
  },
]

/**
 * 创建路由对象
 */
export const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

/**
 * 注册路由
 * @param app
 */
export function setupRouter(app: App) {
  app.use(router)
}
