<script setup lang="ts">
defineProps<{
  collapsed: boolean
}>()
</script>

<template>
  <div class="h-50px flex items-center justify-center">
    <img src="https://pic.imgdb.cn/item/660573f29f345e8d035f9c83.png" alt="logo" class="w-40px">
    <h1 v-show="!collapsed">
      Admin
    </h1>
  </div>
</template>

<style scoped>

</style>
