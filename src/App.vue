<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import { Application } from '@/components/Application'
import { useLayoutStore } from '@/store/modules/layout.ts'

const layoutStore = useLayoutStore()

const themeOverride: GlobalThemeOverrides = {
  common: {
    primaryColor: '#42b8f1',
    primaryColorHover: '#42b8f1',
    primaryColorPressed: '#42b8f1',
    primaryColorSuppl: '#42b8f1',
    infoColor: '#5aa9e6',
    infoColorHover: '#5aa9e6',
    infoColorPressed: '#5aa9e6',
    infoColorSuppl: '#5aa9e6',
    successColor: '#8ac926',
    successColorHover: '#8ac926',
    successColorPressed: '#8ac926',
    successColorSuppl: '#8ac926',
    warningColor: '#ffc300',
    warningColorHover: '#ffc300',
    warningColorPressed: '#ffc300',
    warningColorSuppl: '#ffc300',
    errorColor: '#c75146',
    errorColorHover: '#c75146',
    errorColorPressed: '#c75146',
    errorColorSuppl: '#c75146',
    borderRadius: '6px',
    fontSizeMedium: '13px',
    heightMedium: '32px',
  },
  Message: {
    padding: '8px 14px',
    fontSize: '14px',
  },

}
layoutStore.initAppearance()
</script>

<template>
  <n-config-provider :theme-overrides="themeOverride" :theme="layoutStore.naiveDarkTheme">
    <Application>
      <RouterView />
    </Application>
  </n-config-provider>
</template>
