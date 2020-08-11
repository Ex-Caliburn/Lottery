const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const StyleLintPlugin = require('stylelint-webpack-plugin')
const path = require('path')

const gzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV !== 'development'

module.exports = {
  lintOnSave: 'warning',
  outputDir: 'docs',
  publicPath: './',
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/styles/mixin.scss";@import "~@/assets/styles/_var.scss";`
      }
    }
  },
  chainWebpack: config => {
    // 移除 prefetch 插件
    if (isProduction) {
      config.plugins.delete('prefetch')
      // https://github.com/tcoopman/image-webpack-loader
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          mozjpeg: {
            progressive: true,
            quality: 65
          },
          // optipng.enabled: false will disable optipng
          optipng: {
            enabled: false
          },
          pngquant: {
            quality: [0.65, 0.9],
            speed: 4
          },
          gifsicle: {
            interlaced: false
          }
        })
        .end()
    }
    config.when(process.env.NODE_ENV !== 'development', config => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          // elementUI: {
          //   name: 'chunk-elementUI', // split elementUI into a single package
          //   priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          //   test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          // },
          commons: {
            name: 'chunk-commons',
            test: path.resolve(__dirname, 'src/components'),
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      // https://webpack.docschina.org/configuration/optimization/#optimizationruntimechunk
      // The value 'single' instead creates a runtime file to be shared for all generated chunks. This setting is an alias for:
      config.optimization.runtimeChunk('single')
    })
  },
  configureWebpack: config => {
    if (isProduction) {
      if (process.env.ANALYZ_ENV) {
        config.plugins.push(new BundleAnalyzerPlugin())
      }
      // 开启生产环境Gzip压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(`\\.(${gzipExtensions.join('|')})$`),
          threshold: 0, // 只有大小大于该值的资源会被处理
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        })
      )
    }
    config.plugins.push(
      new StyleLintPlugin({
        configFile: './.stylelintrc.json',
        files: ['src/**/*.{vue,html,css,scss}'],
        failOnError: false,
        cache: true,
        maxWarnings: 20,
        fix: true
      })
    )
  },
  devServer: {
    proxy: {
      '/bg/': {
        target: 'https://XXX.com',
        changeOrigin: true
      }
    }
  }
}
