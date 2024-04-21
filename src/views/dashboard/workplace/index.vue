<script setup lang="ts">
import Header from './components/Header.vue'
import { Container } from '@/components/Container'
</script>

<template>
  <Container>
    <n-card :bordered="false">
      <Header />
    </n-card>
    <div class="mt-4">
      <n-grid x-gap="12" :cols="2">
        <n-gi>
          <n-card segmented :bordered="false" title="我的项目" size="small">
            内容
          </n-card>
        </n-gi>
        <n-gi>
          <n-card segmented :bordered="false" title="快捷操作" size="small">
            内容
          </n-card>
        </n-gi>
      </n-grid>
    </div>
  </Container>
</template>

<style scoped lang="scss">

</style>
