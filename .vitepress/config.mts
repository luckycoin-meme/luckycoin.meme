import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "CAT420",
  description: "The first meta-universe protocol is based on the OP_CAT opcode of the",
  vite:{
    server:{
      port: 5177,
    }
  },
  themeConfig: {
    logo: '/cat.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/markdown-examples' }
    ],
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present cat420.com'
    }
  }
})
