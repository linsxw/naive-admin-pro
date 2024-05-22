<script setup lang="ts">
import { Menu } from '@vicons/ionicons5'
import { FullscreenOutlined, GithubOutlined, SettingOutlined } from '@vicons/antd'
import { Breadcrumb } from '../Breadcrumb'
import ProjectConfig from './projectConfig.vue'
import { useUserStore, useUserStoreRefs } from '@/store/modules/user.ts'
import { useLayoutStoreRefs } from '@/store/modules/layout.ts'

const collapsed = defineModel<boolean>('collapsed')

const activeProjectConfig = ref(false)
const { username, avatar } = useUserStoreRefs()
const userStore = useUserStore()
const { crumbsConfig } = useLayoutStoreRefs()
const router = useRouter()

const avatarOptions = [
  {
    label: '个人设置',
    key: 'setting',
  },
  {
    label: '退出登录',
    key: 'logout',
  },
]

function onDropdownSelect(key: string) {
  switch (key) {
    case 'setting':
      router.push('/profile')
      break
    case 'logout': {
      userStore.logout()
      window.$message.success('退出登录成功')
      setTimeout(() => {
        window.location.reload()
      }, 500)
      break
    }
  }
}
</script>

<template>
  <div class="layout-header">
    <div class="layout-header-left">
      <n-flex :size="12" align="center">
        <!-- 菜单收起 -->
        <n-icon :size="22" class="layout-header-trigger" @click="collapsed = !collapsed">
          <Menu />
        </n-icon>
        <!-- 面包屑 -->
        <Breadcrumb v-if="crumbsConfig.show" />
      </n-flex>
    </div>
    <div class="layout-header-right">
      <n-flex :size="4">
        <n-button quaternary class="layout-header-trigger">
          <template #icon>
            <n-icon>
              <FullscreenOutlined />
            </n-icon>
          </template>
        </n-button>
        <n-button
          tag="a" quaternary class="layout-header-trigger" target="_blank"
          href="https://github.com/linsxw/naive-admin-pro"
        >
          <template #icon>
            <n-icon>
              <GithubOutlined />
            </n-icon>
          </template>
        </n-button>
        <n-button quaternary class="layout-header-trigger" @click="activeProjectConfig = true">
          <template #icon>
            <n-icon>
              <SettingOutlined />
            </n-icon>
          </template>
        </n-button>
        <n-dropdown :options="avatarOptions" @select="onDropdownSelect">
          <div class="flex cursor-pointer items-center pl-4 space-x-1">
            <n-avatar round :size="35" :src="avatar" />
            <span>{{ username }}</span>
          </div>
        </n-dropdown>
      </n-flex>
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
