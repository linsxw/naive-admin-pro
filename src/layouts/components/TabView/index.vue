<script setup lang="ts">
import { CloseOutlined, LeftOutlined, RightOutlined } from '@vicons/antd'
import type { ITabViewStore, RouteItem } from '@/store/modules/tabView.ts'
import { TAB_VIEW_STORE, useTabViewStore } from '@/store/modules/tabView.ts'
import { useLayoutStoreRefs } from '@/store/modules/layout.ts'

const props = defineProps({
  collapsed: Boolean,
})

const route = useRoute()
const router = useRouter()
const tabViewStore = useTabViewStore()
const { isMobile, themeColorConfig, sidebarConfig } = useLayoutStoreRefs()
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
  const { fullPath, hash, meta, name, params, path, query } = route
  return { fullPath, hash, meta, name, params, path, query } as RouteItem
}

function onRemoveTabView(item: RouteItem): void {
  const index = tabViewStore.tabList.findIndex(tab => tab.fullPath === item.fullPath)
  if (index >= 0) {
    // 从标签页列表中移除要移除的标签页
    tabViewStore.removeTab(item)

    // 更新活动标签页
    if (tabViewStore.tabList.length > 0) {
      let newIndex = index
      if (index === tabViewStore.tabList.length) {
        // 如果移除的是最后一个标签页，则更新为前一个标签页
        newIndex--
      }
      const newActiveKey = tabViewStore.tabList[newIndex].fullPath
      activeKey.value = newActiveKey

      // 立即将路由跳转到新的活动标签页
      router.push(newActiveKey)
    }
  }
}

const primaryColor = computed(() => {
  const { primaryColor } = unref(themeColorConfig)
  return primaryColor
})

const computedWidth = computed(() => {
  if (isMobile.value) {
    return '100%'
  }
  else {
    return `calc(100% - ${props.collapsed ? '64px' : `${sidebarConfig.value.width}px`})`
  }
})

// 白名单
const whiteList: string[] = []

// 右键菜单
const dropdownX = ref(0)
const dropdownY = ref(0)
const showDropdown = ref(false)
const currentTab = ref<RouteItem | null>(null)
const options = [
  { label: '关闭当前标签页', key: 'close' },
  { label: '关闭其他标签页', key: 'close-others' },
  { label: '关闭所有标签页', key: 'close-all' },
]

function onClickOutside() {
  showDropdown.value = false
}

async function handleSelect(key: string) {
  switch (key) {
    case 'close':
      if (currentTab.value && !currentTab.value.meta.affix) {
        onRemoveTabView(currentTab.value)
      }
      break
    case 'close-others':
      tabViewStore.closeOtherTabs(route)
      break
    case 'close-all':
      tabViewStore.clearTab()
      await router.replace('/')
      // 添加一个
      tabViewStore.addTab(getSimpleRoute(route))
      break
  }
  showDropdown.value = false
}

function handleContextMenu(e: MouseEvent, item: RouteItem) {
  e.preventDefault()
  currentTab.value = item
  showDropdown.value = false
  nextTick(() => {
    showDropdown.value = true
    dropdownX.value = e.clientX
    dropdownY.value = e.clientY
  })
}

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
  <n-el tag="div" class="tab-view tab-view-fixed w-full" :style="{ width: computedWidth }">
    <div class="tab-view-left">
      <n-icon size="18">
        <LeftOutlined />
      </n-icon>
    </div>
    <div class="tab-view-content">
      <n-scrollbar x-scrollable>
        <div class="tab-view-content-wrapper">
          <n-el
            v-for="(item, index) in tabViewStore.tabList"
            :key="index" tag="div"
            class="tab-view-item"
            :class="{ 'active-tab-view': item.fullPath === activeKey }"
            @click="$router.push(item.fullPath)"
            @contextmenu="handleContextMenu($event, item)"
          >
            <span>{{ item.meta.title }}</span>
            <div v-if="!item.meta.affix" class="close-icon ml-2">
              <n-icon :size="14" @click.stop="onRemoveTabView(item)">
                <CloseOutlined />
              </n-icon>
            </div>
          </n-el>
        </div>
      </n-scrollbar>
    </div>
    <div class="tab-view-right">
      <n-icon size="18">
        <RightOutlined />
      </n-icon>
    </div>

    <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :x="dropdownX"
      :y="dropdownY"
      :options="options"
      :show="showDropdown"
      :on-clickoutside="onClickOutside"
      @select="handleSelect"
    />
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
        .close-icon {
          display: flex;
          align-items: center;
          border-radius: 50%;
          padding: 2px;
          &:hover {
            background: var(--primary-color);
            color: white;
            transition: all .3s;
          }
        }
      }
      .active-tab-view {
        color: v-bind('primaryColor');
      }
    }
  }

  &-right {
    display: flex;
    align-content: center;
  }
}
</style>
