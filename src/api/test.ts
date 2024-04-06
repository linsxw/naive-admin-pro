import { useHttp } from '@/utils/http'
import type { ApiPage } from '@/utils/http/type.ts'

interface PurchaseVo {
  pdName: string
  pdNum: number
}

export function testApi() {
  return useHttp.Get<ApiPage<PurchaseVo>>('/get-purchase-list')
}
