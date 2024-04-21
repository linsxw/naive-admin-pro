<script setup lang="ts">
const jsonStr = ref({
  userList: [
    {
      id: 1,
      name: '张三',
    },
    {
      id: 2,
      name: '李四',
    },
  ],
})
</script>

<template>
  <Container title="Json预览组件" description="JSON预览编辑">
    <n-grid x-gap="12" y-gap="12" :cols="2">
      <n-gi>
        <n-card title="预览">
          <JsonPreview :data="jsonStr" />
        </n-card>
      </n-gi>
    </n-grid>
  </Container>
</template>

<style scoped lang="scss">

</style>
