import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/feat',
    name: 'Feature',
    component: Layout,
    redirect: '/feat/json-preview',
    children: [
      {
        path: 'json-preview',
        name: 'JsonPreview',
        component: () => import('@/views/feat/json-preview/index.vue'),
        meta: {
          title: 'JSON预览',
        },
      },
    ],
  },
]

export default routes
