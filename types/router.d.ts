import 'vue-router'

export {}

declare module 'vue-router' {
  interface RouteMeta {
    /** 标题 */
    title?: string
    /** 图标 */
    icon?: string
    /** 排序 */
    orderNo?: number
    /** 是否隐藏 */
    hidden?: boolean
    /** 是否缓存 */
    keepAlive?: boolean
    /** 固定标签栏 */
    affix?: boolean
  }
}
