import type { Router } from 'vue-router'
import { useUserStore } from '@/store/modules/user.ts'
import { useAsyncRouteStore } from '@/store/modules/asyncRoute.ts'

/**
 * 创建路由权限拦截守卫
 */
export function createPagePermissionGuard(router: Router) {
  const userStore = useUserStore()
  const asyncRouteStore = useAsyncRouteStore()
  const whitePathList = ['/login']
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  router.beforeEach(async (to, form, next) => {
    window.$loadingBar?.start()
    const token = userStore.getToken
    if (token) {
      /* has token */
      if (to.path === '/login') {
        next({ path: '/' })
        window.$loadingBar?.finish()
      }
      else if (whitePathList.includes(to.path)) {
        next()
      }
      else {
        if (!asyncRouteStore.getIsDynamicRouteAdded && !userStore.username) {
          // 初始化用户信息
          await userStore.getUserInfo()
          // 初始化动态路由
          const routers = await asyncRouteStore.generateRoutes()
          routers.forEach((r) => {
            router.addRoute(r)
          })
          asyncRouteStore.setDynamicRouteAdded(true)
          next({ ...to, replace: true })
        }
        else {
          next()
        }
      }
    }
    else {
      // 没有token
      if (whitePathList.includes(to.path)) {
        // 在免登录白名单，直接进入
        next()
      }
      else {
        next(`/login?redirect=${encodeURIComponent(to.fullPath)}`) // 否则全部重定向到登录页
        window.$loadingBar?.finish()
      }
    }
  })

  router.afterEach(() => {
    setTimeout(() => {
      window.$loadingBar?.finish()
    }, 200)
  })

  router.onError(() => {
    window.$loadingBar?.error()
  })
}
