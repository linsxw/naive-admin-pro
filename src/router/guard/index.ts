import type { Router } from 'vue-router'
import { createPageTitleGuard } from './page-title-guard'
import { createPageLoadingGuard } from '@/router/guard/page-loading-guard.ts'

export function setupRouterGuard(router: Router) {
  createPageTitleGuard(router)
  createPageLoadingGuard(router)
}
