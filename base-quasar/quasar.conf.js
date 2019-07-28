// Configuration for your app

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'i18n',
      'axios',
      'permission',
      'iconfont'
    ],

    css: [
      '~normalize.css/normalize.css',
      '~assets/iconfont/iconfont.css',
      'app.styl'
    ],

    extras: [
      'roboto-font',
      'material-icons' // optional, you are not bound to it
      // 'ionicons-v4',
      // 'mdi-v3',
      // 'fontawesome-v5',
      // 'eva-icons'
    ],

    framework: {
      // all: true, // --- includes everything; for dev only!

      components: [
        'QLayout',
        'QHeader',
        'QFooter',
        'QTabs',
        'QRouteTab',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QField',
        'QInput',
        'QCard',
        'QCardSection',
        'QCardActions',
        'QPagination',
        'QSlideTransition'
      ],

      directives: [
        'Ripple'
      ],

      // Quasar plugins
      plugins: [
        'Notify',
        'LoadingBar'
      ],
      config: [{
        loadingBar: {
          color: '#027BE3'
        }
      }]

      // iconSet: 'ionicons-v4'
      // lang: 'de' // Quasar language
    },

    supportIE: true,
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
      },
      env: ctx.dev
        ? {
          // so on dev we'll have
          API_ROOT: JSON.stringify('/api/v1')
        }
        : {
          // and on build (production):
          API_ROOT: JSON.stringify('/api/v1')
        }
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true, // opens browser window automatically
      proxy: {
        '/api/v1': {
          target: 'http://jangene.io',
          // target: 'http://192.168.0.10:3000/mock/10',
          changeOrigin: true
          // pathRewrite: {
          // '^/api': ''
          // }
        }
      }
    },

    // animations: 'all', // --- includes all animations
    animations: [],

    ssr: {
      pwa: false
    }
  }
}
