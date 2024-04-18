<script setup lang="ts">
import { CashOutline as CashIcon, TrainOutline as TrainIcon } from '@vicons/ionicons5'
</script>

<template>
  <Container title="基础组件" description="基于Naive Ui的Button组件">
    <n-grid x-gap="12" y-gap="12" :cols="2">
      <n-gi>
        <n-card>
          <h3>基础按钮</h3>
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

          <h3>虚线按钮</h3>
          <n-space>
            <n-button dashed>
              Default
            </n-button>
            <n-button type="primary" dashed>
              Primary
            </n-button>
            <n-button type="info" dashed>
              Info
            </n-button>
            <n-button type="success" dashed>
              Success
            </n-button>
            <n-button type="warning" dashed>
              Warning
            </n-button>
            <n-button type="error" dashed>
              Error
            </n-button>
          </n-space>

          <h3>文本按钮</h3>
          <n-space>
            <n-button text>
              <template #icon>
                <n-icon>
                  <TrainIcon />
                </n-icon>
              </template>
              那车头依然吐着烟
            </n-button>
          </n-space>
          <h3>Loading</h3>
          <n-space>
            <n-button :loading="true">
              Loading
            </n-button>
          </n-space>
        </n-card>
      </n-gi>

      <n-gi>
        <n-card>
          <h3>次要按钮</h3>
          <n-space>
            <n-button strong secondary>
              Default
            </n-button>
            <n-button strong secondary type="tertiary">
              Tertiary
            </n-button>
            <n-button strong secondary type="primary">
              Primary
            </n-button>
            <n-button strong secondary type="info">
              Info
            </n-button>
            <n-button strong secondary type="success">
              Success
            </n-button>
            <n-button strong secondary type="warning">
              Warning
            </n-button>
            <n-button strong secondary type="error">
              Error
            </n-button>
            <n-button strong secondary round>
              Default
            </n-button>
            <n-button strong secondary round type="primary">
              Primary
            </n-button>
            <n-button strong secondary round type="info">
              Info
            </n-button>
            <n-button strong secondary round type="success">
              Success
            </n-button>
            <n-button strong secondary round type="warning">
              Warning
            </n-button>
            <n-button strong secondary round type="error">
              Error
            </n-button>
            <n-button strong secondary circle>
              <template #icon>
                <n-icon><CashIcon /></n-icon>
              </template>
            </n-button>
            <n-button strong secondary circle type="primary">
              <template #icon>
                <n-icon><CashIcon /></n-icon>
              </template>
            </n-button>
            <n-button strong secondary circle type="info">
              <template #icon>
                <n-icon><CashIcon /></n-icon>
              </template>
            </n-button>
            <n-button strong secondary circle type="success">
              <template #icon>
                <n-icon><CashIcon /></n-icon>
              </template>
            </n-button>
            <n-button strong secondary circle type="warning">
              <template #icon>
                <n-icon><CashIcon /></n-icon>
              </template>
            </n-button>
            <n-button strong secondary circle type="error">
              <template #icon>
                <n-icon><CashIcon /></n-icon>
              </template>
            </n-button>
          </n-space>

          <h3>次次要按钮</h3>
          <n-space>
            <n-button tertiary>
              Default
            </n-button>
            <n-button tertiary type="primary">
              Primary
            </n-button>
            <n-button tertiary type="info">
              Info
            </n-button>
            <n-button tertiary type="success">
              Success
            </n-button>
            <n-button tertiary type="warning">
              Warning
            </n-button>
            <n-button tertiary type="error">
              Error
            </n-button>
            <n-button tertiary round>
              Default
            </n-button>
            <n-button tertiary round type="primary">
              Primary
            </n-button>
            <n-button tertiary round type="info">
              Info
            </n-button>
            <n-button tertiary round type="success">
              Success
            </n-button>
            <n-button tertiary round type="warning">
              Warning
            </n-button>
            <n-button tertiary round type="error">
              Error
            </n-button>
            <n-button tertiary circle>
              <template #icon>
                <n-icon><CashIcon /></n-icon>
              </template>
            </n-button>
            <n-button tertiary circle type="primary">
              <template #icon>
                <n-icon><CashIcon /></n-icon>
              </template>
            </n-button>
            <n-button tertiary circle type="info">
              <template #icon>
                <n-icon><CashIcon /></n-icon>
              </template>
            </n-button>
            <n-button tertiary circle type="success">
              <n-icon><CashIcon /></n-icon>
            </n-button>
            <n-button tertiary circle type="warning">
              <template #icon>
                <n-icon><CashIcon /></n-icon>
              </template>
            </n-button>
            <n-button tertiary circle type="error">
              <template #icon>
                <n-icon><CashIcon /></n-icon>
              </template>
            </n-button>
          </n-space>

          <h3>次次次要按钮</h3>
          <n-space>
            <n-button quaternary>
              Default
            </n-button>
            <n-button quaternary type="primary">
              Primary
            </n-button>
            <n-button quaternary type="info">
              Info
            </n-button>
            <n-button quaternary type="success">
              Success
            </n-button>
            <n-button quaternary type="warning">
              Warning
            </n-button>
            <n-button quaternary type="error">
              Error
            </n-button>
            <n-button quaternary round>
              Default
            </n-button>
            <n-button quaternary round type="primary">
              Primary
            </n-button>
            <n-button quaternary round type="info">
              Info
            </n-button>
            <n-button quaternary round type="success">
              Success
            </n-button>
            <n-button quaternary round type="warning">
              Warning
            </n-button>
            <n-button quaternary round type="error">
              Error
            </n-button>
            <n-button quaternary circle>
              <template #icon>
                <n-icon><CashIcon /></n-icon>
              </template>
            </n-button>
            <n-button quaternary circle type="primary">
              <template #icon>
                <n-icon><CashIcon /></n-icon>
              </template>
            </n-button>
            <n-button quaternary circle type="info">
              <template #icon>
                <n-icon><CashIcon /></n-icon>
              </template>
            </n-button>
            <n-button quaternary circle type="success">
              <template #icon>
                <n-icon><CashIcon /></n-icon>
              </template>
            </n-button>
            <n-button quaternary circle type="warning">
              <template #icon>
                <n-icon><CashIcon /></n-icon>
              </template>
            </n-button>
            <n-button quaternary circle type="error">
              <template #icon>
                <n-icon><CashIcon /></n-icon>
              </template>
            </n-button>
          </n-space>
        </n-card>
      </n-gi>
    </n-grid>
  </Container>
</template>

<style scoped lang="scss">

</style>
