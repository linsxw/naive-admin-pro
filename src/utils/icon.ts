import { NIcon } from 'naive-ui'

/**
 * render图标
 */
export function renderMenuIcon(icon: Component): VNode {
  return h(NIcon, { size: 16 }, { default: () => h(icon) })
}
/**
 *  render 图标
 * @param icon
 * @returns
 */

export function renderIcon(icon: Component) {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    })
  }
}
