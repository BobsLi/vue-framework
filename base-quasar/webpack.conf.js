const path = require('path')
module.exports = {
  entry: path.resolve(__dirname, '.quasar/app.js'),
  modules: ['node_modules'],
  resolve: {
    alias: {
      app: path.resolve(__dirname),
      src: path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components'),
      layouts: path.resolve(__dirname, 'src/layouts'),
      pages: path.resolve(__dirname, 'src/pages'),
      assets: path.resolve(__dirname, 'src/assets'),
      boot: path.resolve(__dirname, 'src/boot')
    }
  }
}
