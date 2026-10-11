import { defineConfig } from 'vite'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
    plugins: [
        Sitemap({
            hostname: 'https://www.pigmalionconsultora.com.ar/',
            changefreq: 'monthly',
            priority: 1.0,
            generateRobotsTxt: true
        })
    ]
})