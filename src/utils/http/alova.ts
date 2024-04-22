import { createAlova } from 'alova'
import VueHook from 'alova/vue'
import GlobalFetch from 'alova/GlobalFetch'

export const useHttp = createAlova({
  baseURL: import.meta.env.VITE_BASE_API,
  statesHook: VueHook,
  requestAdapter: GlobalFetch(),
  timeout: 10000,
  localCache: null,

  /**
   * 执行请求之前的钩子
   * @param method
   */
  beforeRequest(method) {
    console.log('beforeRequest', method)
  },

  responded: {
    /**
     * 请求成功的钩子
     * @param response
     * @param method
     */
    onSuccess: async (response, method) => {
      const json = await response.json()
      console.log('onSuccess', json, method, response)
      return json.data
    },

    /**
     * 请求失败的钩子
     * @param err
     * @param method
     */
    onError: (err, method) => {
      console.log('onError', err, method)
    },

    /**
     * 请求完成的钩子
     * @param method
     */
    onComplete: (method) => {
      console.log('onComplete', method)
    },
  },

  // /**
  //  * 请求成功的钩子(简写)
  //  * @param response
  //  * @param methodInstance
  //  */
  // responsed: (response, methodInstance) => {
  //   console.log('responsed', response, methodInstance)
  // },

})
