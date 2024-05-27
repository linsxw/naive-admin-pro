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
      <n-grid x-gap="12" y-gap="12" :cols="2">
        <n-gi>
          <n-card segmented :bordered="false" title="我的项目" size="small">
            <div class="project-wrapper">
              <div v-for="item in 8" :key="item" class="project-item">
                <n-avatar shape="square" src="https://pic.imgdb.cn/item/634f902116f2c2beb11a3cc7.jpg" />
                <div class="project-item-content">
                  <div class="project-item-title">
                    项目名称
                  </div>
                  <div class="project-item-description">
                    项目描述
                  </div>
                </div>
              </div>
            </div>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card segmented :bordered="false" title="快捷操作" size="small">
            <div class="project-wrapper">
              <div v-for="item in 8" :key="item" class="flex justify-center items-center flex-col space-y-2 bg-#f5f7fa dark:bg-dark p-2 cursor-pointer rounded-1 hover:shadow">
                <n-avatar size="small" shape="square" src="https://pic.imgdb.cn/item/634f902116f2c2beb11a3cc7.jpg" />
                <div>系统管理</div>
              </div>
            </div>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card segmented :bordered="false" title="我的动态" size="small">
            <n-timeline>
              <n-timeline-item type="success" content="哪里成功" time="2018-04-03 20:46" />
              <n-timeline-item type="success" content="哪里成功" time="2018-04-03 20:46" />
              <n-timeline-item type="success" content="哪里成功" time="2018-04-03 20:46" />
              <n-timeline-item type="success" content="哪里成功" time="2018-04-03 20:46" />
              <n-timeline-item type="success" content="哪里成功" time="2018-04-03 20:46" />
              <n-timeline-item type="success" content="哪里成功" time="2018-04-03 20:46" />
            </n-timeline>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card segmented :bordered="false" title="最新评论" size="small">
            <div v-for="item in 6" :key="item" class="flex bg-#f5f7fa dark:bg-dark mb-1 items-center p-2">
              <n-avatar shape="square" src="https://pic.imgdb.cn/item/634f902116f2c2beb11a3cc7.jpg" />
              <div class="ml-2">
                <div class="text-md flex justify-between w-full">
                  小伟同学：针不错
                </div>
                <div class="text-xs text-gray-500">
                  2024-01-01 12:00
                </div>
              </div>
            </div>
          </n-card>
        </n-gi>
      </n-grid>
    </div>
  </Container>
</template>

<style scoped lang="scss">
.project-wrapper {
  // grid
display: grid;
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
grid-gap: 12px;
  .project-item {
    display: flex;
    align-items: center;
    padding: 12px;
    border-radius: 4px;
    background-color: #f5f7fa;
    @apply dark:bg-dark;
    .project-item-content {
      margin-left: 12px;
      .project-item-title {
        font-size: 14px;
        font-weight: 500;
      }
      .project-item-description {
        font-size: 12px;
        color: #666;
        @apply dark:text-gray-400;
      }
    }
  }
}
</style>
