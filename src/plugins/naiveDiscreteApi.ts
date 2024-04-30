import type { ConfigProviderProps } from 'naive-ui'
import { createDiscreteApi } from 'naive-ui'
import { naiveThemeConfig } from '@/config/naive-config.ts'

export function setupNaiveDiscreteApi() {
  const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
    themeOverrides: {
      ...naiveThemeConfig,
    },
    LoadingBar: {
      colorLoading: '#42b8f1',
    },
  }))
  const { message, dialog, notification, loadingBar } = createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar'],
    {
      configProviderProps: configProviderPropsRef,
    },
  )
  window.$message = message
  window.$dialog = dialog
  window.$notification = notification
  window.$loadingBar = loadingBar
}
