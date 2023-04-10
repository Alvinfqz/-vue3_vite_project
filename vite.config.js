import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname)
  return {
    plugins: [vue(), vueJsx()],
    // envPrefix: 'VUE_APP_', //VUE_APP_ 为自定义开头名
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: env.VITE_APP_NETWORK || '127.0.0.1',
      port: 8089,
      open: true,
      https: false, //是否开启https
    },
    // 设置反向代理，跨域
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8090', // 后台地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 带选项写法
        configure: (proxy, options) => {
          // proxy 是 ‘http-proxy’  的实例
        }
      }
    }
  }
})
