import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),

    Unocss(),

    // 自动导入api
    AutoImport({
      imports: [
        'vue',
        'vue-router',
      ],
      dts: 'types/auto-imports.d.ts',
      dirs: ['src/composables'],
    }),
    // 自动导入组件
    Components({
      resolvers: [NaiveUiResolver()],
      dts: 'types/components.d.ts',
      types: [{
        from: 'vue-router',
        names: ['RouterLink', 'RouterView'],
      }],
    }),

    // vue 调试工具
    VueDevTools(),
  ],
})
