/**
 * 接口代理配置
 */
const defaultSettings = require('./index.js')

module.exports = {
  // 配置跨域
  '/gbase': {
    target: defaultSettings.baseApi,
    // ws:true,
    changOrigin: true,
    pathRewrite: {
      '^/gbase': '/gbase'
    }
  }
}
