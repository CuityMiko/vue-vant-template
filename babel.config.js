// 获取 VUE_APP_ENV 非 NODE_ENV，测试环境依然 console
const IS_PROD = ['production', 'prod'].includes(process.env.VUE_APP_ENV)
const plugins = [
  [
    'import',
    {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    },
    'vant'
  ]
]
// 去除 console.log
if (IS_PROD) {
  // 如果是生产环境，则自动清理掉打印的日志，但保留error 与 warn
  plugins.push([
    'transform-remove-console',
    {
      exclude: ['error', 'warn']
    }
  ])
}

module.exports = {
  presets: [['@vue/cli-plugin-babel/preset', { useBuiltIns: 'usage', corejs: 3 }]],
  plugins
}
