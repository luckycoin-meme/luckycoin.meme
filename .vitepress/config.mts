import { defineConfig } from 'vitepress'
export default defineConfig({
  title: "Luckycoin",
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

    socialLinks: [
      { icon: 'x', link: 'https://x.com/bridge_hsu' },
      { icon: 'github', link: 'https://github.com/luckycoin-meme' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present luckycoin.meme'
    }
  }
})
