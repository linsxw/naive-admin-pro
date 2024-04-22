import { resolve } from 'node:path'
import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
import ViteSvgLoader from 'vite-svg-loader'
import progress from 'vite-plugin-progress'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  console.log('当前环境 =>', mode)
  // eslint-disable-next-line node/prefer-global/process
  const { VITE_PORT, VITE_PUBLIC_PATH } = loadEnv(mode, process.cwd())
  return defineConfig({
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      open: true,
      port: +VITE_PORT,
    },
    plugins: [
      VueMacros({
        plugins: {
          vue: Vue(),
        },
      }),

      Unocss(),

      // 自动导入api
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'pinia',
          {
            '@vueuse/core': ['useMediaQuery', 'useDark'],
          },
        ],
        dts: 'types/auto-imports.d.ts',
        dirs: ['src/composables'],
      }),
      // 自动导入组件
      Components({
        resolvers: [NaiveUiResolver()],
        dts: 'types/components.d.ts',
      }),

      // svg
      ViteSvgLoader(),

      // mock
      viteMockServe({
        mockPath: 'mock',
        enable: true,
      }),

      // vue 调试工具
      // VueDevTools(),

      progress(),

      // 依赖分析
      visualizer({
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
    ],

    build: {
      cssCodeSplit: true,
      assetsInlineLimit: 5000,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // 从 node_modules 中引入的模块会被打包到一个独立的文件中
            if (id.includes('/node_modules/')) {
              // 以 node_modules 作为分割点，只分割 node_modules 中的模块
              const dirArray = id.toString().split('/node_modules/')
              const difFile = dirArray[2].split('/')[0].toString()
              return `${difFile}/${difFile}`
            }
          },
        },
      },
    },
  })
}
