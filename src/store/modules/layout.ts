import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { darkTheme } from 'naive-ui'
import type { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface'
import { Appearance } from '@/store/constant'

export const LAYOUT_STORE = 'app-layout-store'

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
  // 外观
  appearance: Appearance
  // 是否是暗黑模式
  appearanceTheme: boolean
  // naive外观包
  naiveDarkTheme: BuiltInGlobalTheme | null
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
      appearance: Appearance.Auto,
      appearanceTheme: false,
      naiveDarkTheme: null,
    }
  },
  getters: {
    getIsMobile(): boolean {
      return this.isMobile
    },
    getSidebarTheme(): boolean {
      return this.sidebarTheme === 'dark' || this.appearanceTheme
    },
    getHeaderDarkTheme(): boolean {
      return this.headerTheme === 'dark' || this.appearanceTheme
    },
  },
  actions: {
    setIsMobile(isMobile: boolean) {
      this.isMobile = isMobile
    },
    initAppearance() {
      const darkMode = ref<boolean>(false)

      const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

      const setDarkMode = () => {
        if (this.appearance === Appearance.Auto) {
          darkMode.value = isDarkMode.value
          return
        }
        darkMode.value = this.appearance === Appearance.Moon
      }

      watch(() => isDarkMode.value, () => {
        setDarkMode()
        if (isDarkMode.value) {
          this.appearance = Appearance.Moon
          return
        }
        this.appearance = Appearance.Sun
      })

      watch(() => darkMode.value, () => {
        this.naiveDarkTheme = darkMode.value ? darkTheme : null
        this.appearanceTheme = darkMode.value
      }, {
        immediate: true,
      })

      watch(() => this.appearance, () => {
        setDarkMode()
      }, {
        immediate: true,
      })
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
