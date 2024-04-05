import type { RouteLocationNormalized } from 'vue-router'

export const TAB_VIEW_STORE = 'app-tab-view'

// 不需要出现在标签页中的路由
const whiteList: string[] = []

export const useTabViewStore = defineStore(TAB_VIEW_STORE, {
  state(): ITabViewStore {
    return {
      tabList: [],
    }
  },
  actions: {
    /**
     * 初始化tabList
     * @param routes
     */
    initTabList(routes: RouteItem[]) {
      this.tabList = routes
    },

    /**
     * 添加tab
     * @param route
     */
    addTab(route: RouteItem) {
      const isExist = this.tabList.some(item => item.fullPath === route.fullPath)
      if (isExist) {
        return
      }
      if (whiteList.includes(route.fullPath)) {
        return
      }
      this.tabList.push(route)
    },

    /**
     * 移除tab
     * @param route
     */
    removeTab(route: RouteItem) {
      const index = this.tabList.findIndex(item => item.path === route.path)
      this.tabList.splice(index, 1)
    },

    /**
     * 清空tab
     */
    clearTab() {
      this.tabList = []
    },
  },
  persist: true,
})

export type RouteItem = RouteLocationNormalized

export interface ITabViewStore {
  tabList: Array<RouteItem>
}
