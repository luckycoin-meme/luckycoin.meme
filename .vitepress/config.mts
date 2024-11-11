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
      { text: 'Guide', link: '/docs/welcome' }
    ],
    sidebar: [
      {
        text: 'WELCOME',
        link: '/docs/welcome.md'
      },
      {
        text: 'CA',
        items: [
          { text: 'Open', link: '/docs/ca/open.md' },
          { text: 'mine', link: '/guide/advanced/deployment.md' },
          { text: 'stake', link: '/guide/advanced/deployment.md' },
          { text: 'claim', link: '/guide/advanced/deployment.md' },
          { text: 'close', link: '/guide/advanced/deployment.md' },
          { text: 'update', link: '/guide/advanced/deployment.md' },
        ],
      },
      {
        text: 'CLI',
        items: [
          { text: 'Mine', link: '/docs/cli/mine.md' },
          { text: 'Balance', link: '/docs/cli/balance.md' },
          { text: 'Benchmark', link: '/docs/cli/benchmark.md' },
          { text: 'Busses', link: '/docs/cli/busses.md' },
          { text: 'Claim', link: '/docs/cli/claim.md' },
          { text: 'Close', link: '/docs/cli/close.md' },
          { text: 'Proof', link: '/docs/cli/proof.md' },
          { text: 'Rewards', link: '/docs/cli/rewards.md' },
          { text: 'Stake', link: '/docs/cli/stake.md' },
          { text: 'Transfer', link: '/docs/cli/transfer.md' },
          { text: 'Upgrade', link: '/docs/cli/upgrade.md' },
          { text: 'Initialize', link: '/docs/cli/initialize.md' },
        ],
      },
      {
        text: 'APP',
        link: '/docs/welcome.md'
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
