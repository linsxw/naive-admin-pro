<script setup lang="ts">
import Header from './components/Header.vue'
import Project from './components/Project.vue'
import Quick from './components/Quick.vue'
import Dynamic from './components/Dynamic.vue'
import Comment from './components/Comment.vue'
import { Container } from '@/components/Container'
</script>

<template>
  <Container>
    <n-card :bordered="false">
      <Header />
    </n-card>
    <div class="mt-4">
      <n-grid x-gap="12" y-gap="12" :cols="2">
        <n-gi>
          <n-card segmented :bordered="false" title="我的项目" size="small">
            <Project />
          </n-card>
        </n-gi>
        <n-gi>
          <n-card segmented :bordered="false" title="快捷操作" size="small">
            <Quick />
          </n-card>
        </n-gi>
        <n-gi>
          <n-card segmented :bordered="false" title="我的动态" size="small">
            <Dynamic />
          </n-card>
        </n-gi>
        <n-gi>
          <n-card segmented :bordered="false" title="最新评论" size="small">
            <Comment />
          </n-card>
        </n-gi>
      </n-grid>
    </div>
  </Container>
</template>
