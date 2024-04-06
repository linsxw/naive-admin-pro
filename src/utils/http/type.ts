/**
 * @description: 请求接口类型
 */
export interface ApiResult<T> {
  code: number
  data?: T
  message: string
}

/**
 * @description: 分页请求接口类型
 */
// export interface ApiPageResult<T> extends ApiResult<T> {
//   data?: ApiPage<T>
// }

/**
 * @description: 分页数据类型
 */
export interface ApiPage<T> {
  list?: T[]
  total?: number
}
