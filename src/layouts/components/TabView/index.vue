<script setup lang="ts">
import { CloseOutlined, LeftOutlined, RightOutlined } from '@vicons/antd'
import type { ITabViewStore, RouteItem } from '@/store/modules/tabView.ts'
import { TAB_VIEW_STORE, useTabViewStore } from '@/store/modules/tabView.ts'

const route = useRoute()
const tabViewStore = useTabViewStore()
const activeKey = ref<string>(route.fullPath)

let cacheTabList: RouteItem[] = []

try {
  const tabViewStoreStr = localStorage.getItem(TAB_VIEW_STORE)
  if (tabViewStoreStr) {
    cacheTabList = (JSON.parse(tabViewStoreStr) as ITabViewStore).tabList
  }
}
catch {
  cacheTabList = []
}

// 初始化标签页列表
tabViewStore.initTabList(cacheTabList)

function getSimpleRoute(route: RouteItem): RouteItem {
  return JSON.parse(JSON.stringify(route))
}

// 白名单
const whiteList: string[] = []

watch(
  () => route.fullPath,
  (to) => {
    if (whiteList.includes(to)) {
      return
    }

    tabViewStore.addTab(getSimpleRoute(route))
    activeKey.value = route.fullPath
  },
  { immediate: true },
)
</script>

<template>
  <div class="tab-view">
    <div class="tab-view-left">
      <n-icon size="18">
        <LeftOutlined />
      </n-icon>
    </div>
    <div class="tab-view-content">
      <n-scrollbar x-scrollable>
        <div class="tab-view-content-wrapper">
          <div v-for="(item, index) in tabViewStore.tabList" :key="index" class="tab-view-item" :class="{ 'active-tab-view': item.fullPath === activeKey }" @click="$router.push(item.fullPath)">
            <span>{{ item.meta.title }}</span>
            <n-icon :size="14" class="ml-2">
              <CloseOutlined />
            </n-icon>
          </div>
        </div>
      </n-scrollbar>
    </div>
    <div class="tab-view-right">
      <n-icon size="18">
        <RightOutlined />
      </n-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tab-view {
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  &-left {
    display: flex;
    align-content: center;
  }
  &-content {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &-wrapper {
      display: flex;
      align-items: center;
      .tab-view-item {
        display: flex;
        align-items: center;
        padding: 3px 10px;
        border-radius: 4px;
        margin-right: 10px;
        cursor: pointer;
        background: #f5f7f9;
        font-size: 13px;
        transition: color .3s;
      }
      .active-tab-view {
        color: #42b8f1;
      }
    }
  }

  &-right {
    display: flex;
    align-content: center;
  }
}
</style>
