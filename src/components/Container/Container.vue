<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div class="app-container">
    <n-el v-if="title" tag="div" class="app-container-header">
      <div class="header-left">
        <div class="title">
          {{ title }}
        </div>
        <div class="content">
          {{ description }}
        </div>
      </div>
      <div class="header-right">
        <slot name="extra" />
      </div>
    </n-el>
    <div class="app-container-main">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  box-sizing: border-box;
  &-header {
    background-color: var(--card-color);
    display: flex;
    justify-content: space-between;
    padding: 20px;
    .header-left {
      .title {
        font-size: 20px;
        font-weight: bold;
      }
      .content {
        font-size: 14px;
        color: #666;
        margin-top: 10px;
      }
    }
  }
  &-main {
    padding: 14px;
  }
}
</style>
