declare namespace Env {

  interface ImportMeta {
    /** 环境变量 */
    MODE: 'development' | 'production'
    /** 项目启动端口 */
    VITE_PORT: number
    /** 标题 */
    VITE_APP_TITLE: string
    /** 项目公共路径 */
    VITE_PUBLIC_PATH: string
    /** 项目接口基础地址 */
    VITE_BASE_API: string
    /** 是否使用hash路由 */
    VITE_USE_HASH: string
  }
}
