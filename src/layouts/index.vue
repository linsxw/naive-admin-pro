<script setup lang="ts">
import PageView from './components/PageView.vue'
import Logo from '@/layouts/components/Logo.vue'
import AsideMenu from '@/layouts/components/AsideMenu.vue'

const collapsed = ref(false)
</script>

<template>
  <n-layout class="layout" position="absolute" has-sider>
    <n-layout-sider
      show-trigger="bar"

      width="220"
      inverted bordered
      collapse-mode="width"
      :on-update:collapsed="val => collapsed = val"
      :collapsed-width="64"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <Logo :collapsed="collapsed" />
      <AsideMenu :collapsed="collapsed" />
    </n-layout-sider>

    <n-layout>
      <n-layout-header>
        头部
      </n-layout-header>

      <n-layout-content
        class="layout-content"
      >
        <div
          class="layout-content-main"
        >
          <div>tagview</div>
          <div
            class="main-view"
          >
            <PageView />
          </div>
        </div>
      </n-layout-content>
      <n-back-top :right="100" />
    </n-layout>
  </n-layout>
</template>
