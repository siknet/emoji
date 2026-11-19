import locale from './locale'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  devServer: {
    port: 4000
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@nuxtjs/eslint-module', '@nuxtjs/i18n', 'nuxt-gtag', '@nuxtjs/google-fonts', '@nuxtjs/seo'],
  site: {
    url: 'https://searchemoji.app',
    name: 'SearchEmoji',
    description: '\uD83D\uDD0DSearch for Emoji, \uD83D\uDDB1\uFE0FClick to Copy - Emoji Search Engine Supporting 30 Languages'
  },
  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'SearchEmoji',
      url: 'https://searchemoji.app',
      logo: 'https://searchemoji.app/logo.png',
      founder: {
        type: 'Person',
        name: 'dongnaebi',
        sameAs: ['https://twitter.com/dongnaebi', 'https://github.com/dongnaebi']
      }
    },
    minify: true
  },
  sitemap: {
    enabled: false
  },
  robots: {
    enabled: false
  },
  ogImage: {
    enabled: false
  },
  linkChecker: {
    enabled: false
  },
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark'
  },
  googleFonts: {
    download: false,
    families: {
      Roboto: [300, 500, 700]
    }
  },
  gtag: {
    id: 'G-XR9C57QYQ0'
  },
  eslint: {
    lintOnStart: false
  },
  i18n: {
    baseUrl: 'https://searchemoji.app',
    strategy: 'prefix_except_default',
    defaultLocale: 'zh-hans',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lang',
      cookieCrossOrigin: true
    },
    langDir: './lang',
    locales: locale
  },
  nitro: {
    // preset: 'cloudflare_pages'
  },
  routeRules: {
    // 1. All language homepages statically prerendered at build time
    '/': { prerender: true },
    '/zh-hans': { prerender: true },
    '/en': { prerender: true },
    '/es': { prerender: true },
    '/zh-hant': { prerender: true },
    '/de': { prerender: true },
    '/ja': { prerender: true },
    '/fr': { prerender: true },
    '/ko': { prerender: true },
    '/pt': { prerender: true },
    '/ru': { prerender: true },
    '/tr': { prerender: true },
    '/ar': { prerender: true },
    '/it': { prerender: true },
    '/hi': { prerender: true },
    '/pl': { prerender: true },
    '/bn': { prerender: true },
    '/nl': { prerender: true },
    '/uk': { prerender: true },
    '/id': { prerender: true },
    '/ms': { prerender: true },
    '/vi': { prerender: true },
    '/th': { prerender: true },
    '/sv': { prerender: true },
    '/el': { prerender: true },
    '/he': { prerender: true },
    '/fi': { prerender: true },
    '/no': { prerender: true },
    '/da': { prerender: true },
    '/ro': { prerender: true },
    '/hu': { prerender: true },

    // 2. API edge CDN caching
    '/api/**': {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=604800, stale-while-revalidate=86400'
      }
    },

    // 3. All dynamic emoji detail pages use Vercel ISR (7 days revalidation)
    '/**': {
      isr: 604800
    }
  }
})
