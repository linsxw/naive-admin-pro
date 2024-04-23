import { createProdMockServer } from 'vite-plugin-mock/client'
import type { MockMethod } from 'vite-plugin-mock'

const modules = import.meta.glob('../../../mock/*.ts', { eager: true })

export function mapMockModuleList(modules: Record<string, unknown>): Array<MockMethod> {
  const modeList: Array<MockMethod> = []
  Object.keys(modules).forEach((key) => {
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    const mod = modules[key].default || {}
    const modList = Array.isArray(mod) ? [...mod] : [mod]
    modeList.push(...modList)
  })
  return modeList
}

export function setupProdMockServer() {
  if (import.meta.env.MODE === 'production') {
    createProdMockServer([...mapMockModuleList(modules)]).then(() => {
      console.log('启动Mock成功')
    })
  }
}
