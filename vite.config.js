import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

export default defineConfig({
  plugins: [tsconfigPaths()],
  build: {
    target: 'esnext',
    rollupOptions: {
      external: /\.skel$/,
      // input : {
      //   main: resolve(__dirname, 'index.html'),
      // },
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  preview: {
    host: true,
    port: 8080,
  },
})
