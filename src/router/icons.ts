import dashboard from '@vicons/antd/DashboardOutlined'
import pieChart from '@vicons/antd/PieChartOutlined'
import user from '@vicons/antd/UserOutlined'
import editor from '@vicons/antd/EditFilled'
import system from '@vicons/antd/SettingTwotone'
import treeTable from '@vicons/antd/ApartmentOutlined'
import component from '@vicons/antd/AppstoreOutlined'
import feature from '@vicons/antd/BulbOutlined'
import code from '@vicons/antd/CodeOutlined'
import star from '@vicons/antd/StarOutlined'
import { renderMenuIcon } from '@/utils/icon.ts'

export const constantRouterIcon: Record<string, Component> = {
  dashboard,
  pieChart,
  user,
  editor,
  system,
  treeTable,
  component,
  feature,
  code,
  star,
}

export function renderIconByConstant(icon: string | undefined) {
  if (!icon) {
    return null
  }
  const Icon = constantRouterIcon[icon]
  return renderMenuIcon(Icon)
}
