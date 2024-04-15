<script setup lang="ts">
import { MoonOutline, SunnyOutline } from '@vicons/ionicons5'

const active = defineModel({ type: Boolean, default: false })
const configSetting = ref()
const animateOptions = [
  {
    label: '无',
    value: 'none',
  },
  {
    label: '淡入淡出',
    value: 'fade',
  },
  {
    label: '滑动',
    value: 'slide',
  },
]
</script>

<template>
  <n-drawer v-model:show="active" :width="300" placement="right">
    <n-drawer-content title="系统配置">
      <n-divider>主题配置</n-divider>
      <div class="drawer-config-item justify-center">
        <n-tabs type="segment" animated>
          <n-tab-pane name="sun">
            <template #tab>
              <n-icon><SunnyOutline /></n-icon>
            </template>
          </n-tab-pane>
          <n-tab-pane name="moon">
            <template #tab>
              <n-icon><MoonOutline /></n-icon>
            </template>
          </n-tab-pane>
        </n-tabs>
      </div>

      <n-divider>其他配置</n-divider>
      <div class="drawer-config-item">
        <div class="drawer-config-item-title">
          固定菜单
        </div>
        <div class="drawer-config-item-action">
          <n-switch v-model="configSetting" />
        </div>
      </div>

      <div class="drawer-config-item">
        <div class="drawer-config-item-title">
          动画类型
        </div>
        <div class="drawer-config-item-select">
          <n-select v-model:value="configSetting" :options="animateOptions" placeholder="选择动画类型" />
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<style lang="scss" scoped>
.drawer-config-item {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 14px 0;
  flex-wrap: wrap;

  &-title {
    flex: 1 1;
    font-size: 14px;
  }

  &-action {
    flex: 0 0 auto;
  }

  &-select {
    flex: 1;
  }
}
</style>
