import { getUserInfo, login } from '@/api/login.ts'

export const USER_STORE = 'app-user'

export interface IUserState {
  token: string
  username: string
  avatar: string
  permissions: string[]
  roles: string[]
  info: any
}

export const useUserStore = defineStore(USER_STORE, {
  state: (): IUserState => ({
    token: '',
    username: '',
    avatar: '',
    permissions: [],
    roles: [],
    info: {},
  }),
  getters: {
    getToken(): string {
      return this.token
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUsername(username: string) {
      this.username = username
    },
    setAvatar(avatar: string) {
      this.avatar = avatar
    },
    setRoles(roles: string[]) {
      this.roles = roles
    },
    setPermissions(permissions: string[]) {
      this.permissions = permissions
    },

    // 登录
    async login(param: Login.LoginParam) {
      const { accessToken } = await login(param)
      this.setToken(accessToken)
      return accessToken
    },
    // 获取登录用户信息
    async getUserInfo() {
      const { username, avatar, roles, permissions } = await getUserInfo()
      this.setUsername(username)
      this.setAvatar(avatar)
      this.setRoles(roles)
      this.setPermissions(permissions)
    },
    // 登出
    logout() {
      this.setToken('')
      this.setUsername('')
      this.setAvatar('')
      this.setRoles([])
      this.setPermissions([])
    },
  },
  persist: {
    paths: ['token'],
  },
})

/**
 * 通过 storeToRefs 将 store 的属性转换为 ref
 */
export const useUserStoreRefs = () => storeToRefs(useUserStore())
