<script setup lang="ts">
import { Home, Menu } from '@vicons/ionicons5'
import { FullscreenOutlined, GithubOutlined, SettingOutlined } from '@vicons/antd'
import ProjectConfig from './projectConfig.vue'

defineProps({
  collapsed: Boolean,
})

const activeProjectConfig = ref(false)

const avatarOptions = [
  {
    label: '个人设置',
    key: 1,
  },
  {
    label: '退出登录',
    key: 2,
  },
]
</script>

<template>
  <div class="layout-header">
    <div class="layout-header-left">
      <!-- 菜单收起 -->
      <n-button tertiary circle class="layout-header-trigger" @click="() => $emit('update:collapsed', !collapsed)">
        <template #icon>
          <n-icon><Menu /></n-icon>
        </template>
      </n-button>
      <!-- 面包屑 -->
      <n-breadcrumb>
        <n-breadcrumb-item>
          <n-icon :component="Home" size="16" /> 首页
        </n-breadcrumb-item>
        <n-breadcrumb-item>
          xx
        </n-breadcrumb-item>
      </n-breadcrumb>
    </div>
    <div class="layout-header-right">
      <n-button tertiary circle class="layout-header-trigger">
        <template #icon>
          <n-icon><FullscreenOutlined /></n-icon>
        </template>
      </n-button>
      <n-button tag="a" tertiary circle class="layout-header-trigger" target="_blank" href="https://github.com/linsxw/naive-admin-pro">
        <template #icon>
          <n-icon><GithubOutlined /></n-icon>
        </template>
      </n-button>
      <n-button tertiary circle class="layout-header-trigger" @click="activeProjectConfig = true">
        <template #icon>
          <n-icon><SettingOutlined /></n-icon>
        </template>
      </n-button>
      <n-divider vertical class="layout-header-trigger" />

      <n-dropdown :options="avatarOptions">
        <div class="flex cursor-pointer items-center space-x-1">
          <n-avatar round :size="35" src="https://pic.imgdb.cn/item/634f902116f2c2beb11a3cc7.jpg" />
          <span>小伟同学.</span>
        </div>
      </n-dropdown>
    </div>

    <ProjectConfig v-model="activeProjectConfig" />
  </div>
</template>

<style lang="scss" scoped>
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  transition: all 0.2s ease-in-out;
  width: 100%;
  z-index: 11;
  &-left {
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

  &-right {
    padding-right: 20px;
    display: flex;
    align-items: center;
  }

  .layout-header-trigger {
    margin: 0px 8px 0;
    cursor: pointer;
    transition: all .2s ease-in-out;
  }

  .layout-header-fix {
    position: fixed;
    top: 0;
    right: 0;
    left: 200px;
    z-index: 11;
  }

}
</style>
