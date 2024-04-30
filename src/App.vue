<script setup lang="ts">
import { dateZhCN, zhCN } from 'naive-ui'
import { Application } from '@/components/Application'
import { useLayoutStore } from '@/store/modules/layout.ts'
import { naiveThemeConfig } from '@/config/naive-config.ts'

const layoutStore = useLayoutStore()

layoutStore.initAppearance()
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="naiveThemeConfig" :theme="layoutStore.naiveDarkTheme">
    <Application>
      <RouterView />
    </Application>
    <n-global-style />
  </n-config-provider>
</template>
