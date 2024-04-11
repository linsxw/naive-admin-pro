import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Layout,
    redirect: '/dashboard/workplace',
    children: [
      {
        path: 'workplace',
        name: 'DashboardWorkplace',
        component: () => import('@/views/dashboard/workplace/index.vue'),
        meta: {
          title: '工作台',
        },
      },
      {
        path: 'analysis',
        name: 'DashboardAnalysis',
        component: () => import('@/views/dashboard/analysis/index.vue'),
        meta: {
          title: '分析页',
        },
      },
    ],
  },
]

export default routes
