const title = 'note.ztrehagem.dev'
const description = 'ただのメモ。'
const publicPath = 'https://note.ztrehagem.dev/'

module.exports = {
  title,
  description,

  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: publicPath }],
    ['meta', { property: 'og:image', content: 'https://github.com/ztrehagem.png' }],
    ['meta', { property: 'og:locale', content: 'ja_JP' }],
    ['meta', { property: 'og:site_name', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:site', content: '@ztrehagem' }],
    ['meta', { name: 'theme-color', content: '#3C3C3C' }],
    ['meta', { name: 'msapplication-navbutton-color', content: '#3C3C3C' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: '#3C3C3C' }],
  ],

  locales: {
    '/': {
      lang: 'ja',
    },
  },

  markdown: {
    extendMarkdown: (md) => {
      md.use(require('markdown-it-footnote'))
    },
  },

  plugins: [
    [
      require('./plugins/blog'),
    ],
    [
      '@vuepress/last-updated',
      {
        dateOptions:{
          hours12: false,
        },
      },
    ],
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-129758740-2',
      },
    ],
  ],

  themeConfig: {
    nav: [
      { text: 'ztrehagem.dev', link: 'https://ztrehagem.dev/' },
    ],
    sidebar: 'auto',
    lastUpdated: 'Last Updated',
  },
}
