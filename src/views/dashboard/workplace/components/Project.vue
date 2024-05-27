<script setup lang="ts">

</script>

<template>
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
