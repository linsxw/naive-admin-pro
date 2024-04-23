import type { Router } from 'vue-router'
import { createPageTitleGuard } from './page-title-guard'
import { createPagePermissionGuard } from '@/router/guard/page-permission-guard.ts'

/**
 * 初始化路由拦截守卫
 */
export function setupRouterGuard(router: Router) {
  createPageTitleGuard(router)
  createPagePermissionGuard(router)
}
