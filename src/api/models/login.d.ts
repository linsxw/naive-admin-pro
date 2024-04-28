declare namespace Login {

  /**
   * 登录参数
   */
  interface LoginParam {
    username: string
    password: string
    code: string
  }

  /**
   * 登录返回参数
   */
  interface LoginResult {
    accessToken: string
  }

  interface UserInfo {
    username: string
    avatar: string
    roles: string[]
    permissions: string[]
  }

  interface Menu {
    name: string
    path: string
    hidden: boolean
    redirect: string
    component: string
    alwaysShow: boolean
    meta: {
      title: string
      icon: string
      noCache: boolean
      link: string | null
      orderNo: number
    }
    children: Menu[]
  }

  type Menus = Array<Menu>

}
