import { useHttp } from '@/utils/http'

/**
 * 后台登录
 * @param param
 */
export function login(param: Login.LoginParam) {
  return useHttp.Post<Login.LoginResult>('/login', param)
}

/**
 * 获取登录用户信息
 */
export function getUserInfo() {
  return useHttp.Get<Login.UserInfo>('/getProfile')
}

/**
 * 获取当前用户权限菜单
 */
export function getMenus() {
  return useHttp.Get<Login.Menus>('/getMenus')
}
