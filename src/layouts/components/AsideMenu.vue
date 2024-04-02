<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { NIcon } from 'naive-ui'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
} from '@vicons/ionicons5'

defineProps<{
  collapsed: boolean
}>()

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: 'Dashboard',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon),
    children: [
      {
        label: '分析页',
        key: 'rat',
        icon: renderIcon(PersonIcon),
      },
      {
        label: '工作台',
        key: 'rat',
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
        key: 'dance',
        icon: renderIcon(PersonIcon),
      },
      {
        label: '角色管理',
        key: 'dance',
        icon: renderIcon(PersonIcon),
      },
      {
        label: '菜单管理',
        key: 'dance',
        icon: renderIcon(PersonIcon),
      },
    ],
  },
]
const defaultExpandedKeys = ['dance-dance-dance', 'food']
function handleUpdateExpandedKeys(keys: string[]) {
  console.log(keys)
}
</script>

<template>
  <n-menu
    :collapsed="collapsed"
    inverted
    :options="menuOptions"
    :collapsed-width="64"
    :indent="18"
    :collapsed-icon-size="22"
    :default-expanded-keys="defaultExpandedKeys"
    @update:expanded-keys="handleUpdateExpandedKeys"
  />
</template>

<style scoped>

</style>
