import { defineConfig } from 'vite'
import { ghPages } from 'vite-plugin-gh-pages'

export default defineConfig({
  base: '/Pigmalion-Web-v1/',
  plugins: [ghPages()],
})