import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'

import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dts: true
    }),
    Icons({
      compiler: 'vue3',
      iconCustomizer(_collection, _icon, props) {
        props.width = '1.5em'
        props.height = '1.5em'
      }
    }),
    svgLoader({
      svgoConfig: {
        multipass: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
