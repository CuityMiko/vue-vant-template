// 记录所有cdn的路径，生产环境使用，可根据生产环境不同切换不同的cdn数据源
module.exports = {
  // 是否启用CDN
  enable: false,
  // 开发环境
  dev: {
    css: [],
    js: []
  },
  // 生产环境
  build: {
    css: ['https://cdn.jsdelivr.net/npm/vant@2.4.7/lib/index.css'],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.1.5/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.1.2/dist/vuex.min.js',
      'https://cdn.jsdelivr.net/npm/vant@2.4.7/lib/index.min.js'
    ]
  }
}
