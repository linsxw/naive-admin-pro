import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { darkTheme } from 'naive-ui'
import type { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface'
import type { SidebarThemeEnum } from '@/store/constant'
import { AppearanceEnum } from '@/store/constant'
import projectConfig from '@/config/projectConfig.ts'

export const LAYOUT_STORE = 'app-layout-store'
const {
  navMode,
  headerConfig,
  tabViewConfig,
  crumbsConfig,
  isPageAnimate,
  pageAnimateType,
  sidebarConfig,
  themeColorConfig,
} = projectConfig

interface ILayoutStore {
  // 导航菜单模式
  navMode: string
  // 头部设置
  headerConfig: {
    // 是否固定头部
    fixed: boolean
    // 是否显示刷新
    showRefresh: boolean
  }
  // 标签页设置
  tabViewConfig: {
    // 是否显示
    show: boolean
    // 是否固定
    fixed: boolean
  }
  sidebarConfig: {
    // 侧边栏宽度
    width: number
    // 侧边栏主题
    theme: SidebarThemeEnum
  }
  // 面包屑配置
  crumbsConfig: {
    // 是否显示
    show: boolean
    // 显示图标
    showIcon: boolean
  }
  // 主题颜色配置
  themeColorConfig: {
    primaryColor: string
    infoColor: string
    successColor: string
    warningColor: string
    errorColor: string
  }
  // 是否移动端
  isMobile: boolean
  // 页面是否开启切换动画
  isPageAnimate: boolean
  // 切换动画类型
  pageAnimateType: string
  // 外观
  appearance: AppearanceEnum
  // 是否是暗黑模式
  appearanceTheme: boolean
  // naive外观包
  naiveDarkTheme: BuiltInGlobalTheme | null
}

const useLayoutStore = defineStore(LAYOUT_STORE, {
  state(): ILayoutStore {
    return {
      navMode,
      headerConfig,
      tabViewConfig,
      sidebarConfig,
      crumbsConfig,
      themeColorConfig,
      isMobile: false,
      isPageAnimate,
      pageAnimateType,
      appearance: AppearanceEnum.Auto,
      appearanceTheme: false,
      naiveDarkTheme: null,
    }
  },
  getters: {
    getIsMobile(): boolean {
      return this.isMobile
    },
    getSidebarTheme(): boolean {
      return this.sidebarConfig.theme === 'dark' || this.appearanceTheme
    },
    getHeaderDarkTheme(): boolean {
      return false
    },
  },
  actions: {
    setIsMobile(isMobile: boolean) {
      this.isMobile = isMobile
    },
    initAppearance() {
      const darkMode = ref<boolean>(false)

      const isDark = useDark({
        selector: 'body',
        attribute: 'class',
        valueDark: 'dark',
        valueLight: 'light',
      })

      const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

      const setDarkMode = () => {
        if (this.appearance === AppearanceEnum.Auto) {
          darkMode.value = isDarkMode.value
          return
        }
        darkMode.value = this.appearance === AppearanceEnum.Moon
      }

      watch(() => isDarkMode.value, () => {
        setDarkMode()
        if (isDarkMode.value) {
          this.appearance = AppearanceEnum.Moon
          return
        }
        this.appearance = AppearanceEnum.Sun
      })

      watch(() => darkMode.value, () => {
        this.naiveDarkTheme = darkMode.value ? darkTheme : null
        this.appearanceTheme = darkMode.value
        isDark.value = !!darkMode.value
      }, {
        immediate: true,
      })

      watch(() => this.appearance, () => {
        setDarkMode()
      }, {
        immediate: true,
      })
    },
    /**
     * 重载配置
     */
    reloadLayoutConfig() {
      localStorage.removeItem(LAYOUT_STORE)
      window.location.reload()
    },
    /**
     * 复制配置
     */
    copyLayoutConfig() {
      window.$message.success('待开发')
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
