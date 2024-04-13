import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'

export const LAYOUT_STORE = 'app-layout'

interface ILayoutStore {
  // 是否收起菜单
  collapsed: boolean
  // 导航菜单模式
  navMode: 'vertical' | 'horizontal'
  // 头部固定
  headerFixed: boolean
  // 头部主题
  headerTheme: 'light' | 'dark'
  // 页签显示
  tabsShow: boolean
  // 页签固定
  tabsFixed: boolean
  // 是否移动端
  isMobile: boolean
  // 页面是否开启切换动画
  pageAnimate: boolean
  // 切换动画类型
  pageAnimateType: string
  // 侧边栏主题
  sidebarTheme: 'light' | 'dark'

}

const useLayoutStore = defineStore(LAYOUT_STORE, {
  state(): ILayoutStore {
    return {
      collapsed: false,
      navMode: 'vertical',
      headerFixed: true,
      headerTheme: 'light',
      tabsShow: true,
      tabsFixed: true,
      isMobile: false,
      pageAnimate: true,
      pageAnimateType: 'fade',
      sidebarTheme: 'dark',
    }
  },
  getters: {
    getIsMobile(): boolean {
      return this.isMobile
    },
  },
  actions: {
    setIsMobile(isMobile: boolean) {
      this.isMobile = isMobile
    },
  },
  persist: true,
})

/**
 * 通过 storeToRefs 将 store 的属性转换为 ref
 */
export const useLayoutStoreRefs = () => storeToRefs(useLayoutStore())

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot))
}

export {
  useLayoutStore,
}
