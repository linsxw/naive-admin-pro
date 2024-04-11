<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { NIcon } from 'naive-ui'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
} from '@vicons/ionicons5'
import { useLayoutStoreRefs } from '@/store/modules/layout.ts'

defineProps<{
  collapsed: boolean
}>()
const { sidebarTheme } = useLayoutStoreRefs()
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
        label: '分析页',
        key: 'DashboardWorkplace',
        icon: renderIcon(PersonIcon),
      },
      {
        label: '工作台',
        key: 'DashboardAnalysis',
        icon: renderIcon(PersonIcon),
      },
    ],
  },
  {
    label: '系统管理',
    key: 'dance-dance-dance',
    icon: renderIcon(BookIcon),
    children: [
      {
        label: '用户管理',
        key: 'user',
        icon: renderIcon(PersonIcon),
      },
      {
        label: '角色管理',
        key: 'roles',
        icon: renderIcon(PersonIcon),
      },
      {
        label: '菜单管理',
        key: 'menu',
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
</script>

<template>
  <n-menu
    :collapsed="collapsed"
    :inverted="sidebarTheme === 'dark'"
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
