import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    name: 'dashboard',
    meta: {
      title: '仪表盘',
      icon: '',
      orderNo: 0,
    },
    children: [
      {
        path: 'index',
        name: 'DashboardBase',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '主控台',
        },
      },
    ],
  },
]

export default routes
