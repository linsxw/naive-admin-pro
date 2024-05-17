import type { GlobalThemeOverrides } from 'naive-ui'
import { useLayoutStoreRefs } from '@/store/modules/layout.ts'

export const naiveThemeConfig = computed<GlobalThemeOverrides>(() => {
  const { themeColorConfig } = useLayoutStoreRefs()
  return {
    common: {
      primaryColor: themeColorConfig.value.primaryColor,
      primaryColorHover: themeColorConfig.value.primaryColor,
      primaryColorPressed: themeColorConfig.value.primaryColor,
      primaryColorSuppl: themeColorConfig.value.primaryColor,
      infoColor: themeColorConfig.value.infoColor,
      infoColorHover: themeColorConfig.value.infoColor,
      infoColorPressed: themeColorConfig.value.infoColor,
      infoColorSuppl: themeColorConfig.value.infoColor,
      successColor: themeColorConfig.value.successColor,
      successColorHover: themeColorConfig.value.successColor,
      successColorPressed: themeColorConfig.value.successColor,
      successColorSuppl: themeColorConfig.value.successColor,
      warningColor: themeColorConfig.value.warningColor,
      warningColorHover: themeColorConfig.value.warningColor,
      warningColorPressed: themeColorConfig.value.warningColor,
      warningColorSuppl: themeColorConfig.value.warningColor,
      errorColor: themeColorConfig.value.errorColor,
      errorColorHover: themeColorConfig.value.errorColor,
      errorColorPressed: themeColorConfig.value.errorColor,
      errorColorSuppl: themeColorConfig.value.errorColor,
      borderRadius: '3px',
      fontSizeMedium: '12px',
      heightMedium: '30px',
      fontFamily: 'HarmonyOS_Sans_SC_Medium',
    },
    Message: {
      padding: '8px 14px',
      fontSize: '14px',
    },
  }
})
