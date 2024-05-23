import { SidebarThemeEnum } from '@/store/constant.ts'

const projectConfig = {
  // 导航模式 vertical 左侧菜单模式 horizontal 顶部菜单模式
  navMode: 'vertical',
  // 导航风格，可选值为 light/dark
  navTheme: 'dark',
  // 头部设置
  headerConfig: {
    // 是否固定头部
    fixed: true,
    // 是否显示刷新
    showRefresh: true,
  },
  tabViewConfig: {
    // 是否显示
    show: true,
    // 是否固定多标签
    fixed: true,
  },
  sidebarConfig: {
    width: 240,
    theme: SidebarThemeEnum.Dark,
  },
  // 面包屑
  crumbsConfig: {
    // 是否显示
    show: true,
    // 显示图标
    showIcon: false,
  },
  // 主题颜色配置
  themeColorConfig: {
    primaryColor: '#165DFF',
    infoColor: '#86909c',
    successColor: '#00B42A',
    warningColor: '#F9CC45',
    errorColor: '#A11069',
  },
  // 是否开启路由动画
  isPageAnimate: true,
  // 路由动画类型
  pageAnimateType: 'fade',
}

export default projectConfig
