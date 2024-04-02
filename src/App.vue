<script setup lang="ts">
import { Application } from '@/components/Application'
</script>

<template>
  <n-config-provider>
    <Application>
      <RouterView />
    </Application>
  </n-config-provider>
</template>
