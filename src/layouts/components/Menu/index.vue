<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useLayoutStoreRefs } from '@/store/modules/layout.ts'
import { useAsyncRouteStoreRefs } from '@/store/modules/asyncRoute.ts'

defineProps<{
  collapsed: boolean
}>()
const { getSidebarTheme } = useLayoutStoreRefs()

const { menus } = useAsyncRouteStoreRefs()
const router = useRouter()
const route = useRoute()
const openKeys = ref(route.matched.map(item => item.name as string))

const defaultExpandedKeys = computed(() => {
  // 获取当前打开页面的路由的name
  return ['Dashboard', 'DashboardWorkplace', 'DashboardAnalysis']
})

const defaultValue = computed(() => {
  // TODO: as string 如何优化？
  return router.currentRoute.value.name as string
})

function handleUpdateExpandedKeys(keys: string[]) {
  openKeys.value = keys
}

function onUpdateMenuValue(value: string) {
  router.push({ name: value })
}

router.afterEach((to) => {
  openKeys.value = to.matched.map(item => item.name as string)
})

onMounted(() => {
  console.log(router.getRoutes())
})
</script>

<template>
  <n-menu
    accordion
    :collapsed="collapsed"
    :inverted="getSidebarTheme"
    :options="menus"
    :collapsed-width="64"
    :indent="18"
    :show-trigger="false"
    :default-value="defaultValue"
    :value="defaultValue"
    :collapsed-icon-size="22"
    :expanded-keys="openKeys"
    :default-expanded-keys="defaultExpandedKeys"
    :on-update:value="onUpdateMenuValue"
    @update:expanded-keys="handleUpdateExpandedKeys"
  />
</template>

<style scoped>

</style>
