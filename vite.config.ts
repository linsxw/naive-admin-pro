import { resolve } from 'node:path'
import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import ViteSvgLoader from 'vite-svg-loader'
import progress from 'vite-plugin-progress'
import { visualizer } from 'rollup-plugin-visualizer'
import type { PreRenderedAsset } from 'rollup'

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
            '@vueuse/core': ['useMediaQuery', 'useDark', 'useFullscreen'],
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

    experimental: {
      renderBuiltUrl(filename) {
        // 由于下面打包后对应的文件名称会打包在不同的目录 filename 的值就是css/xxx.css 这样
        // 如果需要cdn 那应该就是域名+filename 路径就好了
        // 例如这样 `https://www.linasan.cn/css/index.css` css/index.css 就是filename的值
        return filename
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // 使用现代编译器 API
        },
      },
    },
    build: {
      cssCodeSplit: true,
      assetsInlineLimit: 5000,
      rollupOptions: {
        output: {
          // 具体文档参考 https://rollupjs.org/configuration-options
          chunkFileNames: 'js/[name].[hash].js',
          entryFileNames: 'js/[name].[hash].js',
          assetFileNames(assetsInfo: PreRenderedAsset) {
            if (assetsInfo.name && assetsInfo.name.endsWith('.css')) {
              return 'css/[name].[hash].css'
            }
            const imgExits = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.ico']
            if (imgExits.some(ext => assetsInfo.name && assetsInfo.name.endsWith(ext))) {
              return 'images/[name]-[hash].[ext]'
            }
            const videoExits = ['.mp4', '.ogg']
            if (videoExits.some(ext => assetsInfo.name && assetsInfo.name.endsWith(ext))) {
              return 'video/[ext]/[name]-[hash].[ext]'
            }
            return 'assets/[name]-[hash].[ext]'
          },
        },
      },
    },
  })
}
