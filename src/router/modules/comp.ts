import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/comp',
    name: 'Component',
    component: Layout,
    redirect: '/comp/button',
    children: [
      {
        path: 'button',
        name: 'CompButton',
        component: () => import('@/views/comp/button/index.vue'),
        meta: {
          title: '按钮',
        },
      },
    ],
  },
]

export default routes
