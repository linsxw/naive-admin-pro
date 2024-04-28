import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/feat',
    name: 'Feature',
    component: Layout,
    redirect: '/feat/json-preview',
    meta: { title: '外部组件', orderNo: 5, icon: 'feature' },
    children: [
      {
        path: 'json-preview',
        name: 'JsonPreview',
        component: () => import('@/views/feat/json-preview/index.vue'),
        meta: { title: 'JSON预览', icon: 'code' },
      },
      {
        path: 'markdown',
        name: 'Markdown',
        component: () => import('@/views/feat/markdown/index.vue'),
        meta: { title: 'Markdown编辑器', icon: 'editor' },
      },
    ],
  },
]

export default routes
