<script setup lang="ts">

</script>

<template>
  <Container>
    <n-grid x-gap="12" :cols="2">
      <n-gi>
        <n-card title="基础按钮">
          <n-space>
            <n-button>Default</n-button>
            <n-button type="tertiary">
              Tertiary
            </n-button>
            <n-button type="primary">
              Primary
            </n-button>
            <n-button type="info">
              Info
            </n-button>
            <n-button type="success">
              Success
            </n-button>
            <n-button type="warning">
              Warning
            </n-button>
            <n-button type="error">
              Error
            </n-button>
          </n-space>
        </n-card>
      </n-gi>
    </n-grid>
  </Container>
</template>

<style scoped lang="scss">

</style>
