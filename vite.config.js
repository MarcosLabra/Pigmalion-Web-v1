import { defineConfig } from 'vite'
import { ghPages } from 'vite-plugin-gh-pages'

export default defineConfig({
  base: '/Pigmalion-Web-V1/',
  plugins: [ghPages()],
})