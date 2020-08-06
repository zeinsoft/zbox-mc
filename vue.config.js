const path = require('path');
const webpack = require('webpack');
function resolveSrc(_path) {
  return path.join(__dirname, _path)
}
module.exports = {
  configureWebpack: {
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        'src': resolveSrc('src'),
        'chart.js': 'chart.js/dist/Chart.js'
      }
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      })
    ]
  },
  pwa: {
    name: 'Z-BOX',
    themeColor: '#66615B',
    msTileColor: '#66615B',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#66615B'
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  },
  devServer: {
    port: 8081,
    proxy: {
      '/oauth': {
        target: 'http://localhost:8080',
        ws: true,
        changeOrigin: true
      },
      '/api': {
        target: 'http://localhost:8086',
        ws: true,
        changeOrigin: true
      },
      '/v1': {
        target: 'http://ec2-3-34-120-207.ap-northeast-2.compute.amazonaws.com:8000',
        ws: true,
        changeOrigin: true
      }
    }
  }
};
