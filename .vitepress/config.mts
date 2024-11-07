import { defineConfig } from 'vitepress'
export default defineConfig({
  title: "LuckyCoin",
  description: "The world's first meme coin, a proof-of-work token that can be mined by anyone! This token is mined on the Solana blockchain!",
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
      { icon: 'x', link: 'https://x.com/TheBridgeHsu' },
      { icon: 'github', link: 'https://github.com/luckycoin-meme' }
    ],
    footer: {
      message: 'DISCLAIMER:All resources provided on this website are sourced from the internet and are for learning and communication purposes only, and the copyright belongs to the original author. Issuing tokens involves risks, please ensure compliance with local laws and regulations. This website does not assume any legal responsibility and is not liable for any compensation.',
      copyright: 'Copyright © 2024-present luckycoin.meme'
    }
  }
})
