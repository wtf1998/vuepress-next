import { defineConfig } from 'vitest/config'
import { readdirSync } from 'fs'
import { resolve } from 'path'

const packagesDir = resolve(__dirname, 'packages/@vuepress')
const packages = readdirSync(resolve(__dirname, packagesDir), {
  withFileTypes: true,
})
  .filter((item) => item.isDirectory())
  .map(({ name }) => name)

const commonPackages = packages.filter(
  (item) => !item.startsWith('plugin-') && !item.startsWith('theme-')
)
const pluginAndThemePackages = packages.filter(
  (item) => item.startsWith('plugin-') || item.startsWith('theme-')
)

export default defineConfig({
  define: {
    __VUEPRESS_VERSION__: '""',
    __VUEPRESS_DEV__: false,
    __VUEPRESS_SSR__: false,
  },
  resolve: {
    alias: [
      ...commonPackages.map((item) => ({
        find: `@vuepress/${item}`,
        replacement: `${packagesDir}/${item}/src`,
      })),
      ...pluginAndThemePackages.map((item) => ({
        find: `@vuepress/${item}`,
        replacement: `${packagesDir}/${item}/src/node`,
      })),
    ],
  },
  test: {
    globals: true,
  },
})
