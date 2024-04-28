import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Layout,
    redirect: '/dashboard/workplace',
    meta: { title: 'Dashboard', orderNo: 1, icon: 'dashboard' },
    children: [
      {
        path: 'workplace',
        name: 'DashboardWorkplace',
        component: () => import('@/views/dashboard/workplace/index.vue'),
        meta: { title: '工作台', affix: true, icon: 'dashboard' },
      },
      {
        path: 'analysis',
        name: 'DashboardAnalysis',
        component: () => import('@/views/dashboard/analysis/index.vue'),
        meta: { title: '分析页', icon: 'pieChart' },
      },
    ],
  },
]

export default routes
