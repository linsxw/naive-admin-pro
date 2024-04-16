<script setup lang="ts">
import { Logo } from './components/Logo'
import { AsideMenu } from './components/Menu'
import { PageHeader } from './components/Header'
import { MainView } from './components/Main'
import { TabView } from './components/TabView'
import { useLayoutStore, useLayoutStoreRefs } from '@/store/modules/layout.ts'

const { collapsed, getHeaderDarkTheme, getSidebarTheme } = useLayoutStoreRefs()
const layoutStore = useLayoutStore()

/** 是否是移动端 */
const isMobile = computed<boolean>({
  get: () => layoutStore.getIsMobile,
  set: val => layoutStore.setIsMobile(val),
})

/** 是否显示手机端菜单侧边栏 */
const showSideDrawer = computed({
  get: () => isMobile.value && collapsed.value,
  set: (val: boolean) => (collapsed.value = val),
})

/** 判断是否触发移动端模式 */
function checkMobileMode() {
  isMobile.value = document.body.clientWidth <= 675
  collapsed.value = false
}

function watchWidth() {
  const Width = document.body.clientWidth
  collapsed.value = Width <= 950
  checkMobileMode()
}

onMounted(() => {
  checkMobileMode()
  window.addEventListener('resize', watchWidth)
})
</script>

<template>
  <n-layout class="layout" position="absolute" has-sider>
    <n-layout-sider
      v-if="!isMobile"
      position="absolute"
      :collapsed="collapsed"
      collapse-mode="width"
      :collapsed-width="64"
      :width="270"
      :native-scrollbar="false"
      :inverted="getSidebarTheme"
      class="layout-sider"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <Logo :collapsed="collapsed" />
      <AsideMenu :collapsed="collapsed" />
    </n-layout-sider>

    <!-- 手机端菜单 -->
    <n-drawer
      v-model:show="showSideDrawer"
      :width="200"
      placement="left"
      class="layout-side-drawer"
    >
      <n-layout-sider
        position="absolute"
        :collapsed="false"
        :width="200"
        :native-scrollbar="false"
        :inverted="getSidebarTheme"
        class="layout-sider"
      >
        <Logo :collapsed="collapsed" />
        <AsideMenu :collapsed="!collapsed" />
      </n-layout-sider>
    </n-drawer>

    <n-layout>
      <n-layout-header position="absolute" :inverted="getHeaderDarkTheme">
        <PageHeader v-model:collapsed="collapsed" />
      </n-layout-header>

      <n-layout-content class="layout-content layout-default-background">
        <div class="layout-content-main">
          <div class="main-view main-view-fix">
            <TabView :collapsed="collapsed" />
            <MainView />
          </div>
        </div>
      </n-layout-content>
      <n-back-top :right="100" />
    </n-layout>
  </n-layout>
</template>

<style lang="scss" scoped>
.layout {

  &-default-background {
    background: var(--app-bg);
  }

  .layout-sider {
    min-height: 100vh;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    position: relative;
    z-index: 13;
    transition: all 0.2s ease-in-out;
  }

  .layout-sider-fix {
    position: fixed;
    top: 0;
    left: 0;
  }

  .layout-content {
    flex: auto;
    min-height: 100vh;
  }

  .n-layout-header.n-layout-header--absolute-positioned {
    z-index: 11;
  }
}

.layout-content-main {
  position: relative;
  padding-top: 64px;
}

.layout-content-main-fix {
  padding-top: 64px;
}

.main-view-fix {
  padding-top: 40px;
}
</style>
