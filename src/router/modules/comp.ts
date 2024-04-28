import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/comp',
    name: 'Component',
    component: Layout,
    redirect: '/comp/button',
    meta: { title: '组件', orderNo: 3, icon: 'component' },
    children: [
      {
        path: 'button',
        name: 'CompButton',
        component: () => import('@/views/comp/button/index.vue'),
        meta: { title: '按钮', icon: 'star' },
      },
      {
        path: 'form',
        name: 'CompForm',
        component: () => import('@/views/comp/form/index.vue'),
        meta: { title: '表单', icon: 'star' },
      },
    ],
  },
]

export default routes
