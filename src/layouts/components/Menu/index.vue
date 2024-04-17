<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { NIcon } from 'naive-ui'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
} from '@vicons/ionicons5'
import { onMounted } from 'vue'
import { useLayoutStoreRefs } from '@/store/modules/layout.ts'

defineProps<{
  collapsed: boolean
}>()
const { getSidebarTheme } = useLayoutStoreRefs()
const router = useRouter()

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: 'Dashboard',
    key: 'Dashboard',
    icon: renderIcon(BookIcon),
    children: [
      {
        label: '工作台',
        key: 'DashboardWorkplace',
        icon: renderIcon(PersonIcon),
      },
      {
        label: '分析页',
        key: 'DashboardAnalysis',
        icon: renderIcon(PersonIcon),
      },
    ],
  },
  {
    label: '功能',
    key: 'Feature',
    icon: renderIcon(BookIcon),
    children: [
      {
        label: 'JSON预览',
        key: 'JsonPreview',
        icon: renderIcon(PersonIcon),
      },
    ],
  },
  {
    label: '组件',
    key: 'Component',
    icon: renderIcon(BookIcon),
    children: [
      {
        label: '按钮',
        key: 'CompButton',
        icon: renderIcon(PersonIcon),
      },
    ],
  },
]
const defaultExpandedKeys = computed(() => {
  // 获取当前打开页面的路由的name
  return ['Dashboard', 'DashboardWorkplace', 'DashboardAnalysis']
})

const defaultValue = computed(() => {
  // TODO: as string 如何优化？
  return router.currentRoute.value.name as string
})

function handleUpdateExpandedKeys(keys: string[]) {
  console.log(keys)
}

function onUpdateMenuValue(value: string) {
  router.push({ name: value })
}

onMounted(() => {
  console.log(router.getRoutes())
})
</script>

<template>
  <n-menu
    :collapsed="collapsed"
    :inverted="getSidebarTheme"
    :options="menuOptions"
    :collapsed-width="64"
    :indent="18"
    :show-trigger="false"
    :default-value="defaultValue"
    :collapsed-icon-size="22"
    :default-expanded-keys="defaultExpandedKeys"
    :on-update:value="onUpdateMenuValue"
    @update:expanded-keys="handleUpdateExpandedKeys"
  />
</template>

<style scoped>

</style>
