import type { RouteRecordRaw } from 'vue-router'
import { store } from '@/store'
import { getMenus } from '@/api/login.ts'
import { Layout, ParentLayout } from '@/router/constants.ts'

export const ASYNC_ROUTE_STORE = 'app-async-route'

export interface IAsyncRouteState {
  /** 菜单 */
  menus: any[]
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
    getIsDynamicRouteAdded(): boolean {
      return this.isDynamicRouteAdded
    },
  },
  actions: {

    setDynamicRouteAdded(added: boolean) {
      this.isDynamicRouteAdded = added
    },
    /** 设置动态路由 */
    setRouters(routers: RouteRecordRaw[]) {
      this.routersAdded = routers
      this.routers = routers
    },
    /** 设置菜单 */
    setMenus(menus: any[]) {
      this.menus = menus
    },
    /** 设置需要缓存的组件 */
    setKeepAliveComponents(componentNames: string[]) {
      this.keepAliveComponents = componentNames
    },
    /** 生成路由 */
    async generateRoutes() {
      const userRouters = await generateDynamicRoutes()
      const accessRoutes = [...userRouters]
      return accessRoutes
    },

  },
})

const viewsModules = import.meta.glob('../../views/**/*.vue')
function dynamicImport(viewsModules: Record<string, () => Promise<any>>, component: string | any) {
  const keys = Object.keys(viewsModules)
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../../views/', '')
    return k.startsWith(component)
  })
  if (matchKeys.length > 0) {
    return viewsModules[matchKeys[0]]
  }
  if (matchKeys?.length > 1) {
    console.warn('请不要创建`.vue `和`.tsx`视图文件夹下同一层次目录中具有相同文件名的文件。这将导致动态导入失败')
  }
}

/**
 * 动态获取路由
 */
export async function generateDynamicRoutes() {
  const result = await getMenus()
  const dynamicRouters = generateRoutes(result)
  asyncImportRoute(dynamicRouters)
  return dynamicRouters
}

/**
 * 格式化后端返回的菜单
 */
export function generateRoutes(routerMap: Login.Menus, parent?: any): any[] {
  return routerMap.map((item) => {
    const currentRoute: any = {
      // 路由地址 动态拼接生成如 /dashboard/workplace
      path: `${(parent && parent.path) ?? ''}/${item.path}`,
      // 路由名称，建议唯一
      name: item.name ?? '',
      // 该路由对应页面的 组件
      component: item.component,
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        ...item.meta,
        label: item.meta.title,
        icon: item.meta.icon || null,
      },
    }

    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    currentRoute.path = currentRoute.path.replace('//', '/')
    // 重定向
    item.redirect && (currentRoute.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // 如果未定义 redirect 默认第一个子路由为 redirect
      !item.redirect && (currentRoute.redirect = `${item.path}/${item.children[0].path}`)
      // Recursion
      currentRoute.children = generateRoutes(item.children, currentRoute)
    }
    return currentRoute
  })
}

/**
 * 查找views中对应的组件文件
 */
export function asyncImportRoute(routes: any[] | undefined): void {
  if (!routes) {
    return
  }

  routes.forEach((item) => {
    const { component } = item
    const { children } = item
    if (component) {
      if (component === 'Layout') {
        item.component = Layout
      }
      else if (component === 'ParentView') {
        item.component = ParentLayout
      }
      else {
        item.component = dynamicImport(viewsModules, component)
      }
    }
    children && asyncImportRoute(children)
  })
}

export function useAsyncRoute() {
  return useAsyncRouteStore(store)
}
