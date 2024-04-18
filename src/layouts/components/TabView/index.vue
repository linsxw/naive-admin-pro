<script setup lang="ts">
import { CloseOutlined, LeftOutlined, RightOutlined } from '@vicons/antd'
import type { ITabViewStore, RouteItem } from '@/store/modules/tabView.ts'
import { TAB_VIEW_STORE, useTabViewStore } from '@/store/modules/tabView.ts'
import { useLayoutStoreRefs } from '@/store/modules/layout.ts'

const props = defineProps({
  collapsed: Boolean,
})

const route = useRoute()
const tabViewStore = useTabViewStore()
const { isMobile } = useLayoutStoreRefs()
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

const computedWidth = computed(() => {
  if (isMobile.value) {
    return '100%'
  }
  else {
    return `calc(100% - ${props.collapsed ? '64px' : '270px'})`
  }
})

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
  <n-el tag="div" class="tab-view tab-view-fixed" :style="{ width: computedWidth }">
    <div class="tab-view-left">
      <n-icon size="18">
        <LeftOutlined />
      </n-icon>
    </div>
    <div class="tab-view-content">
      <n-scrollbar x-scrollable>
        <div class="tab-view-content-wrapper">
          <n-el v-for="(item, index) in tabViewStore.tabList" :key="index" tag="div" class="tab-view-item" :class="{ 'active-tab-view': item.fullPath === activeKey }" @click="$router.push(item.fullPath)">
            <span>{{ item.meta.title }}</span>
            <n-icon :size="14" class="ml-2">
              <CloseOutlined />
            </n-icon>
          </n-el>
        </div>
      </n-scrollbar>
    </div>
    <div class="tab-view-right">
      <n-icon size="18">
        <RightOutlined />
      </n-icon>
    </div>
  </n-el>
</template>

<style scoped lang="scss">
.tab-view {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--card-color);
  height: 40px;
  border-top: 1px solid var(--divider-color);
  border-bottom: 1px solid var(--divider-color);
  &-fixed {
    position: fixed;
    top: 64px;
    margin: 0;
    z-index: 10;
  }

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
        background: var(--tag-color);
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
