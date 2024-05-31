<script setup lang="ts">
import { Reload, ResizeOutline, SettingsOutline } from '@vicons/ionicons5'
import { computed } from 'vue'
import type { ProTableProps } from '@/components/ProTable/table.ts'
import { useProTable } from '@/components/ProTable/table.ts'

const props = defineProps<ProTableProps>()
const emits = defineEmits(['search'])
const slots = useSlots()
const {
  tableData,
  tableLoading,
  tableColumns,
  pagination,
  reloadTableData,
  onPageChange,
  onPageSizeChange,
} = useProTable(props, slots)

// 查询参数处理
const searchForm = ref<Record<string, any>>({})
const params = computed(() => {
  const processedSearchForm: Record<string, any> = {}
  for (const key in searchForm.value) {
    // 检查属性值是否为空
    if (searchForm.value[key] === null || searchForm.value[key] === undefined || searchForm.value[key] === '') {
      processedSearchForm[key] = undefined
    }
    else {
      processedSearchForm[key] = searchForm.value[key]
    }
  }
  return {
    pageNum: pagination.page,
    pageSize: pagination.pageSize,
    ...processedSearchForm,
    ...props.query,
  }
})

// 搜索触发
function onSearch(searchForm: Record<string, any>) {
  if (props.request) {
    reloadTableData(params.value)
  }
  emits('search', searchForm)
}

defineExpose({
  /**
   * 重新加载表格数据
   */
  reload: (first?: boolean) => {
    if (first) {
      pagination.page = 1
    }
    reloadTableData(params.value)
  },
  tableLoading,
})
</script>

<template>
  <div class="pro-table">
    <n-card :bordered="false" h-full flex-1>
      <div class="h-full flex flex-col">
        <ProTableSearch v-model:form="searchForm" :columns="columns" :loading="tableLoading" @search="onSearch" />
        <div class="toolbar">
          <slot name="toolbar">
            <div />
          </slot>
          <n-space>
            <n-button tertiary circle @click="onSearch({})">
              <template #icon>
                <n-icon><Reload /></n-icon>
              </template>
            </n-button>
            <n-button tertiary circle>
              <template #icon>
                <n-icon><ResizeOutline /></n-icon>
              </template>
            </n-button>
            <n-button tertiary circle>
              <template #icon>
                <n-icon><SettingsOutline /></n-icon>
              </template>
            </n-button>
          </n-space>
        </div>
        <n-data-table
          v-bind="$attrs"
          :indent="30"
          flex-height
          class="flex-1"
          :columns="tableColumns"
          :data="request ? tableData : data"
          :pagination="false"
          :bordered="false"
          :loading="loading ? loading : tableLoading"
        />

        <div v-if="request" class="mt-3 flex justify-end">
          <n-pagination
            v-model:page="pagination.page"
            :item-count="pagination.total"
            :page-sizes="pagination.pageSizes"
            show-size-picker
            show-quick-jumper
            :on-update:page="onPageChange"
            :on-update:page-size="onPageSizeChange"
          />
        </div>
      </div>
    </n-card>
  </div>
</template>

<style scoped lang="scss">
.pro-table {
  height: 100%;
  display: flex;
  .toolbar {
    display: flex;
    justify-content: space-between;
    margin: 30px 0 10px 0;
  }
}
</style>
