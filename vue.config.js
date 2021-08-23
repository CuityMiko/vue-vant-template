'use strict'
const path = require('path')
const defaultSettings = require('./config/index.js')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
// 打包分析
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const resolve = dir => path.join(__dirname, dir)
// 页面标题
const name = defaultSettings.title || 'lyzh fed'
// 生产环境，测试和正式
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
// externals
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  vant: 'vant',
  axios: 'axios'
}
// CDN外链，会插入到index.html中
const cdn = require('./config/cdn')
const proxy = require('./config/proxy')

module.exports = {
  publicPath: './', // 署应用包时的基本 URL。 vue-router hash 模式使用
  // publicPath: '/app/', //署应用包时的基本 URL。  vue-router history模式使用
  outputDir: 'build', //  生产环境构建文件的目录
  assetsDir: 'static', //  outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: !IS_PROD,
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  devServer: {
    port: defaultSettings.port, // 端口
    open: false, // 启动后打开浏览器
    overlay: {
      // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
      warnings: false,
      errors: true
    },
    proxy
  },
  css: {
    extract: IS_PROD, // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
    sourceMap: !IS_PROD,
    loaderOptions: {
      scss: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: `
          @import "assets/css/mixin.scss";
          @import "assets/css/variables.scss";
          $cdn: "${defaultSettings.$cdn}";
          `
      }
    }
  },
  configureWebpack: config => {
    config.name = name
    // 骨架屏
    config.plugins.push(
      new SkeletonWebpackPlugin({
        webpackConfig: {
          entry: {
            app: path.join(__dirname, './src/common/entry-skeleton.js')
          }
        },
        minimize: true,
        quiet: true,
        router: {
          mode: 'hash',
          routes: [
            { path: '/', skeletonId: 'skeleton1' },
            { path: '/about', skeletonId: 'skeleton2' }
          ]
        }
      })
    )

    // 为生产环境修改配置
    if (IS_PROD && cdn.enable) {
      // externals
      config.externals = externals
    }
    if (IS_PROD) {
      // 配置webpack 压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css$/,
          // 超过4kb压缩
          threshold: 4096
        })
      )
    }
  },

  chainWebpack: config => {
    // 页面标题
    config.plugin('html').tap(args => {
      args[0].title = name
      return args
    })

    // 别名 alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@config', resolve('config'))
      .set('assets', resolve('src/assets'))
      .set('controllers', resolve('src/controllers'))
      .set('services', resolve('src/services'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))

    /**
     * 添加CDN参数到htmlWebpackPlugin配置中
     */
    if (IS_PROD && cdn.enable) {
      config.plugin('html').tap(args => {
        if (IS_PROD) {
          args[0].cdn = cdn.build
        } else {
          args[0].cdn = cdn.dev
        }
        return args
      })
    }

    /**
     * 设置保留空格
     */
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
    /**
     * 打包分析
     */
    // if (IS_PROD) {
    //   config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
    //     {
    //       analyzerMode: 'static'
    //     }
    //   ])
    // }
    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(!IS_PROD, config => config.devtool('cheap-source-map'))

    config.when(IS_PROD, config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // 将 runtime 作为内联引入不单独存在
            inline: /runtime\..*\.js$/
          }
        ])
        .end()

      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            minChunks: 3, //  被至少用三次以上打包分离
            priority: 5, // 优先级
            reuseExistingChunk: true // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
          },
          node_vendors: {
            name: 'chunk-libs',
            chunks: 'initial', // 只打包初始时依赖的第三方
            test: /[\\/]node_modules[\\/]/,
            priority: 10
          },
          vantUI: {
            name: 'chunk-vantUI', // 单独将 vantUI 拆包
            priority: 20, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重高的
            test: /[\\/]node_modules[\\/]_?vant(.*)/
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
