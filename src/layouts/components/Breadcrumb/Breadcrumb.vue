<script setup lang="ts">
import { renderIconByConstant } from '@/router/icons.ts'
import { useLayoutStoreRefs } from '@/store/modules/layout.ts'

const router = useRouter()
const { crumbsConfig } = useLayoutStoreRefs()

const breadcrumb = computed(() => router.currentRoute.value.matched.map(item => ({
  name: item.name,
  path: item.path,
  title: item.meta.title,
  icon: item.meta.icon,
})).filter(item => item.title))
</script>

<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="item in breadcrumb" :key="item.name">
      <component :is="renderIconByConstant(item.icon) " v-if="crumbsConfig.showIcon" />
      {{ item.title }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
