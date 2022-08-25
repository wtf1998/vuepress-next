import type { Plugin } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export const themeDataPlugin = (): Plugin => ({
  name: '@vuepress/plugin-theme-data',

  alias: {
    // workaround for https://github.com/vitejs/vite/issues/7621
    '@vuepress/plugin-theme-data/client': path.resolve(
      __dirname,
      '../client/index.js'
    ),
  },

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),
})
