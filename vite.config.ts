import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import visualizer from 'rollup-plugin-visualizer'
import importElementPlus from 'vite-plugin-element-plus'
import { resolve } from 'path'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true
    }),
    visualizer(),
    // @ts-ignore 此处暂时需要使用 ignore
    // 原因是包内部的 options 未做非必填兼容
    // 目前已有人提了 PR，未合并，使用可以观望下
    importElementPlus()
  ],
  resolve: {
    alias: {
      '@': pathResolve('src'),
    },
  },
  server: {
    port: 4000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
      },
    },
  },
})
