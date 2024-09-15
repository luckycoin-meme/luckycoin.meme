import { defineConfig } from 'vitepress'
export default defineConfig({
  title: "CAT420",
  description: "The first meta-universe protocol is based on the OP_CAT opcode of the",
  head: [
    ['link', 
      { 
        rel: 'icon', 
        href: '/cat.png' 
      }
    ]
  ],
  vite:{
    server:{
      port: 5177,
    }
  },
  themeConfig: {
    logo: '/cat.png',
    darkModeSwitchLabel: 'auto',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/introduction' }
    ],
    sidebar: [
      {
        text: 'introduction',
        link: '/introduction'
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/CAT420Protocol' },
      { icon: 'x', link: 'https://x.com/CAT420Protocol' }      
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present cat420.com'
    }
  }
})
