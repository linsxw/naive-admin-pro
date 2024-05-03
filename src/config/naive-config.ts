import type { GlobalThemeOverrides } from 'naive-ui'

export const naiveThemeConfig: GlobalThemeOverrides = {
  common: {
    primaryColor: '#165DFF',
    primaryColorHover: '#165DFF',
    primaryColorPressed: '#165DFF',
    primaryColorSuppl: '#165DFF',
    infoColor: '#86909c',
    infoColorHover: '#86909c',
    infoColorPressed: '#86909c',
    infoColorSuppl: '#86909c',
    successColor: '#00B42A',
    successColorHover: '#00B42A',
    successColorPressed: '#00B42A',
    successColorSuppl: '#00B42A',
    warningColor: '#F9CC45',
    warningColorHover: '#F9CC45',
    warningColorPressed: '#F9CC45',
    warningColorSuppl: '#F9CC45',
    errorColor: '#A11069',
    errorColorHover: '#A11069',
    errorColorPressed: '#A11069',
    errorColorSuppl: '#A11069',
    borderRadius: '3px',
    fontSizeMedium: '12px',
    heightMedium: '30px',
  },
  Message: {
    padding: '8px 14px',
    fontSize: '14px',
  },
}

export const primaryColor = naiveThemeConfig.common?.primaryColor
