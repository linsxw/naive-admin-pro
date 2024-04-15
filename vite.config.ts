import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
import ViteSvgLoader from 'vite-svg-loader'
import progress from 'vite-plugin-progress'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    open: true,
  },
  plugins: [
    vue(),

    Unocss(),

    // 自动导入api
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          '@vueuse/core': ['useMediaQuery'],
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
    VueDevTools(),

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
