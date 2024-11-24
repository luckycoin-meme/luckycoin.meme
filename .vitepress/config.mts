import { defineConfig } from 'vitepress'
export default defineConfig({
  title: "LUCKYCOIN",
  description: "The world's first meme coin!",
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
      { text: 'Home', link: '/' }
    ],
    socialLinks: [
      { icon: 'x', link: 'https://x.com/TheXiaoKuiGe' },
    ],
    footer: {
      message: 'Thank you LKY for making me free!',
      copyright: 'Copyright © 2024-present luckycoin.meme'
    }
  }
})
