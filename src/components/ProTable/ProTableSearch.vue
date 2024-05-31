<script setup lang="ts">
import { ChevronDown, ChevronUp, Reload, Search } from '@vicons/ionicons5'
import type { ProTableColumns } from '@/components/ProTable/table.ts'

const props = defineProps({
  columns: {
    type: Array as PropType<ProTableColumns>,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['search'])

const searchForm = defineModel('form', {
  type: Object,
  default: {},
})

const searchItems = computed(() => {
  return props.columns.filter(item => item.search)
})

/**
 * 重置
 */
function handlerReset() {
  window.$message.success('重置！')
}
/** 收起展开状态 */
const isCollapsed = ref(false)

/** 搜索重置按钮左间隔 */
const formBtnOffset = ref(0)

/** 搜索列 */
const searchColumns = computed(() => {
  return isCollapsed.value ? searchItems.value : searchItems.value.slice(0, 3)
})

/** 监听 isCollapsed 的变化 */
watch(isCollapsed, (newValue) => {
  const columnLength = searchItems.value.length
  if (newValue) {
    /** 展开 */
    formBtnOffset.value = columnLength % 4 === 0 ? 18 : (3 - (columnLength % 4)) * 6
  }
  else {
    /** 未展开的 */
    formBtnOffset.value = 0
  }
})

const beginTimeName = encodeURIComponent('params[beginTime]')
const endTimeName = encodeURIComponent('params[endTime]')
function onDateRangeConfirm(_value: number[], formattedValue: string[]) {
  const params = {
    [beginTimeName]: formattedValue[0],
    [endTimeName]: formattedValue[1],
  }
  searchForm.value = {
    ...searchForm.value,
    ...params,
  }
  emits('search', searchForm)
}

function onDateRangeClear() {
  delete searchForm.value[beginTimeName]
  delete searchForm.value[endTimeName]
  emits('search', searchForm)
}

function onClear() {
  nextTick(() => emits('search', searchForm.value))
}
</script>

<template>
  <n-form v-if="searchColumns.length !== 0" label-placement="left" inline :show-feedback="false">
    <n-grid x-gap="12" :cols="24" y-gap="12">
      <n-gi v-for="(item, index) in searchColumns" :key="index" :span="6">
        <n-form-item v-if="item.key" :label="item.title">
          <n-input v-if="item.searchType === 'text'" v-model:value="searchForm[item.key]" clearable :placeholder="`请输入${item.title}`" :on-clear="onClear" />
          <n-date-picker v-else-if="item.searchType === 'date'" :value="searchForm[item.key]" value-format="yyyy-MM-dd" type="datetimerange" clearable w-full :on-confirm="onDateRangeConfirm" :on-clear="onDateRangeClear" />
          <!--          <NSelect -->
          <!--            v-else-if="item?.type === 'select'" -->
          <!--            v-model:value="searchForm[item.key!]" -->
          <!--            clearable -->
          <!--            :options="item.searchOptions.options" -->
          <!--          /> -->
        </n-form-item>
      </n-gi>
      <n-gi :offset="formBtnOffset" :span="6">
        <n-form-item>
          <n-space :wrap="false">
            <n-button type="primary" :loading @click="emits('search', searchForm)">
              <template #icon>
                <Search />
              </template>
              查询
            </n-button>
            <n-button @click="handlerReset">
              <template #icon>
                <Reload />
              </template>
              重置
            </n-button>
            <n-button v-if="searchItems.length > 3" quaternary @click="isCollapsed = !isCollapsed">
              {{ !isCollapsed ? '展开' : '收起' }}
              <template #icon>
                <ChevronDown v-if="!isCollapsed" />
                <ChevronUp v-else />
              </template>
            </n-button>
          </n-space>
        </n-form-item>
      </n-gi>
    </n-grid>
  </n-form>
</template>
