<script setup lang="ts">
import { Logo } from './components/Logo'
import { AsideMenu } from './components/Menu'
import { PageHeader } from './components/Header'
import { MainView } from './components/Main'
import { TabView } from './components/TabView'
import { useLayoutsStore } from '@/hooks/layouts'

const layoutsStore = useLayoutsStore()

const { collapsed } = storeToRefs(layoutsStore)
</script>

<template>
  <n-layout class="layout" position="absolute" has-sider>
    <n-layout-sider
      position="absolute" :collapsed="collapsed" collapse-mode="width"
      :collapsed-width="64" :width="240" :native-scrollbar="false" inverted class="layout-sider"
      @collapse="collapsed = true" @expand="collapsed = false"
    >
      <Logo :collapsed="collapsed" />
      <AsideMenu :collapsed="collapsed" />
    </n-layout-sider>

    <n-layout>
      <n-layout-header position="absolute">
        <PageHeader v-model:collapsed="collapsed" />
      </n-layout-header>

      <n-layout-content class="layout-content layout-default-background">
        <div class="layout-content-main">
          <TabView />
          <div class="main-view main-view-fix">
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
    background: #f5f7f9;
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
