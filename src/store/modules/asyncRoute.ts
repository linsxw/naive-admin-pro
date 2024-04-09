import type { RouteRecordRaw } from 'vue-router'
import { store } from '@/store'

export const ASYNC_ROUTE_STORE = 'app-async-route'

export interface IAsyncRouteState {
  /** 菜单 */
  menus: RouteRecordRaw[]
  /** 路由 */
  routers: any[]
  /** 已添加的路由 */
  routersAdded: any[]
  /** 需要缓存的组件 */
  keepAliveComponents: string[]
  /** 是否动态路由已添加 */
  isDynamicRouteAdded: boolean
}

export const useAsyncRouteStore = defineStore(ASYNC_ROUTE_STORE, {
  state: (): IAsyncRouteState => ({
    menus: [],
    routers: [],
    routersAdded: [],
    keepAliveComponents: [],
    isDynamicRouteAdded: false,
  }),
  getters: {
    /** 获取菜单 */
    getMenus(): any[] {
      return this.menus
    },
  },
  actions: {

  },
})

export function useAsyncRoute() {
  return useAsyncRouteStore(store)
}
