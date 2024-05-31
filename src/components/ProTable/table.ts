import type { Method } from 'alova'
import { computed, onMounted } from 'vue'
import { NAvatar, NTag } from 'naive-ui'
import dayJs from 'dayjs'
import type { DataTableProps, TableColumn } from 'naive-ui/lib/data-table/src/interface'

/**
 * 值类型
 */
export type ValueType = 'date' | 'number' | 'dateTime' | 'avatar' | 'tag' | 'status'
export type FormType = 'text' | 'select' | 'date'
export type ProTableColumns = Array<ProTableColumn & ProTableForm>

/**
 * 表格列
 */
export type ProTableColumn = TableColumn & {
  // 列渲染模式
  valueType?: ValueType
  // 插槽模式
  slot?: string
}

/**
 * 搜索配置
 */
export interface ProTableForm {
  // 是否显示搜索
  search?: boolean
  // 标题
  title?: string
  // key
  key?: string
  // 类型
  searchType?: FormType
  // 默认值
  defaultValue?: string | number | boolean
  // 数据接口 动态获取数据
  request?: (data: any) => Method

}

export interface ProTableProps extends Omit<DataTableProps, 'columns'> {
  // 接口
  request?: (data: any) => Method<globalThis.Ref<unknown>, globalThis.Ref<unknown>, Api.PageResult<any>, unknown, any, Response, Headers>
  // 列
  columns: ProTableColumns
  // 查询参数
  query?: Record<string, any>
  // 数据
  data?: any[]
  // loading
  loading?: boolean
}

/**
 * 表格
 */
export function useProTable(props: ProTableProps, slots: any) {
  const { request, columns } = toRefs(props)
  const pagination = reactive({
    page: 1,
    pageSize: 10,
    total: 20,
    pageSizes: [10, 20, 50],
  })

  const loading = ref(false)
  const data = ref<any[]>([])

  async function loadDataList(params?: any) {
    if (request?.value) {
      loading.value = true
      try {
        const result = await request.value({ ...params, ...props.query })
        pagination.total = result.total
        data.value = result.rows
      }
      finally {
        loading.value = false
      }
    }
  }

  // 自定义渲染
  const tableColumns = computed<Array<ProTableColumn>>(() => {
    return columns.value.map((column) => {
      if (!column.valueType && !column.slot) {
        return {
          ...column,
          align: 'center',
        }
      }

      // 插槽模式
      if (column.slot) {
        return {
          ...column,
          align: 'center',
          render: (row, index) => slots[column.key!]({ row, index, column }),
        }
      }

      return {
        ...column,
        align: 'center',
        // 列渲染模式
        render: (rowData) => {
          const value = rowData[column.key as string]
          switch (column.valueType) {
            case 'avatar': {
              const url = value as string
              return h(NAvatar, { src: url })
            }
            case 'status': {
              const status = value as string
              const type = status === '0' ? 'success' : 'error'
              const defaultValue = status === '0' ? '正常' : '禁用'
              return h(NTag, { type, bordered: false }, () => defaultValue)
            }
            case 'dateTime': {
              return h('span', value ? dayJs(value as string).format('YYYY-MM-DD HH:mm:ss') : '')
            }
          }
        },
      }
    })
  })

  /**
   * 页码改变触发
   * @param page
   */
  async function onPageChange(page: number) {
    pagination.page = page
    await loadDataList({ pageNum: page, pageSize: pagination.pageSize })
  }

  /**
   * 每页条数改变触发
   * @param pageSize
   */
  async function onPageSizeChange(pageSize: number) {
    pagination.pageSize = pageSize
    await loadDataList({ pageNum: pagination.page, pageSize })
  }

  onMounted(async () => {
    await loadDataList({ pageNum: pagination.page, pageSize: pagination.pageSize })
  })
  return {
    pagination,
    onPageChange,
    onPageSizeChange,
    tableData: data,
    tableLoading: loading,
    reloadTableData: loadDataList,
    tableColumns,
  }
}
