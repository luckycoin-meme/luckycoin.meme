import { defineConfig } from 'vitepress'
export default defineConfig({
  title: "LuckyCoin",
  description: "The first meme coin in the world.",
  head: [
    ['link', 
      { 
        rel: 'icon', 
        href: '/logo.png' 
      }
    ]
  ],
  vite:{
    server:{
      port: 5177,
    }
  },
  themeConfig: {
    logo: '/logo.png',
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

    socialLinks: [],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present luckycoin.meme'
    }
  }
})
