<script setup lang="ts">
import { useLayoutStoreRefs } from '@/store/modules/layout.ts'

defineProps<{
  icon: Component
  title: string
}>()

const emits = defineEmits(['click'])
const { themeColorConfig } = useLayoutStoreRefs()
</script>

<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-icon :size="16" :color="themeColorConfig.primaryColor" class="cursor-pointer" :component="icon" @click="emits('click')" />
    </template>
    {{ title }}
  </n-tooltip>
</template>

<style scoped lang="scss">

</style>
