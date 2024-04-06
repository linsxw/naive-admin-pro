<script setup lang="ts">
import { useRequest } from 'alova'
import { testApi } from '@/api/test.ts'

const { data, loading, send } = useRequest(() => testApi())
</script>

<template>
  <div>
    <n-button @click="send">
      Reload
    </n-button>
    <h1>Home{{ loading }}</h1>
    <div v-for="(item, index) in data?.list" :key="index">
      {{ item.pdNum }}
    </div>
  </div>
</template>

<style scoped>

</style>
