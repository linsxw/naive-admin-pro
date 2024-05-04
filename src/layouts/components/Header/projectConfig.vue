<script setup lang="ts">
import { MoonOutline, SunnyOutline } from '@vicons/ionicons5'
import { useLayoutStore, useLayoutStoreRefs } from '@/store/modules/layout.ts'

const active = defineModel({ type: Boolean, default: false })

const { appearance, crumbsConfig, sidebarConfig, pageAnimateType, themeColorConfig } = useLayoutStoreRefs()
const layoutStore = useLayoutStore()
const colorPickerSwatches = [
  '#FFFFFF',
  '#18A058',
  '#2080F0',
  '#F0A020',
]

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
        <n-tabs v-model:value="appearance" type="segment" animated>
          <n-tab-pane name="auto">
            <template #tab>
              自动
            </template>
          </n-tab-pane>
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
      <div class="drawer-config-item">
        <div class="drawer-config-item-title">
          深色侧边栏
        </div>
        <div class="drawer-config-item-action">
          <n-switch v-model:value="sidebarConfig.theme" checked-value="dark" unchecked-value="light" />
        </div>
      </div>

      <n-divider>主题配置</n-divider>
      <div class="drawer-config-item">
        <div class="drawer-config-item-title">
          主色
        </div>
        <div class="drawer-config-item-action">
          <n-color-picker v-model:value="themeColorConfig.primaryColor" :swatches="colorPickerSwatches" />
        </div>
      </div>
      <div class="drawer-config-item">
        <div class="drawer-config-item-title">
          信息色
        </div>
        <div class="drawer-config-item-action">
          <n-color-picker v-model:value="themeColorConfig.infoColor" :swatches="colorPickerSwatches" />
        </div>
      </div>
      <div class="drawer-config-item">
        <div class="drawer-config-item-title">
          成功色
        </div>
        <div class="drawer-config-item-action">
          <n-color-picker v-model:value="themeColorConfig.successColor" :swatches="colorPickerSwatches" />
        </div>
      </div>
      <div class="drawer-config-item">
        <div class="drawer-config-item-title">
          警告色
        </div>
        <div class="drawer-config-item-action">
          <n-color-picker v-model:value="themeColorConfig.warningColor" :swatches="colorPickerSwatches" />
        </div>
      </div>
      <div class="drawer-config-item">
        <div class="drawer-config-item-title">
          错误色
        </div>
        <div class="drawer-config-item-action">
          <n-color-picker v-model:value="themeColorConfig.errorColor" :swatches="colorPickerSwatches" />
        </div>
      </div>

      <n-divider>页面功能</n-divider>
      <div class="drawer-config-item">
        <div class="drawer-config-item-title">
          侧边栏宽度
        </div>
        <div class="drawer-config-item-action">
          <n-input-number v-model:value="sidebarConfig.width" />
        </div>
      </div>
      <div class="drawer-config-item">
        <div class="drawer-config-item-title">
          显示面包屑
        </div>
        <div class="drawer-config-item-action">
          <n-switch v-model:value="crumbsConfig.show" />
        </div>
      </div>
      <div class="drawer-config-item">
        <div class="drawer-config-item-title">
          显示面包屑图标
        </div>
        <div class="drawer-config-item-action">
          <n-switch v-model:value="crumbsConfig.showIcon" />
        </div>
      </div>

      <div class="drawer-config-item">
        <div class="drawer-config-item-title">
          动画类型
        </div>
        <div class="drawer-config-item-action">
          <n-select v-model:value="pageAnimateType" :options="animateOptions" placeholder="选择动画类型" />
        </div>
      </div>
      <template #footer>
        <div class="w-full flex justify-between">
          <n-button secondary type="primary" @click="layoutStore.reloadLayoutConfig()">
            重载配置
          </n-button>
          <n-button type="primary" @click="layoutStore.copyLayoutConfig()">
            复制配置
          </n-button>
        </div>
      </template>
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
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
