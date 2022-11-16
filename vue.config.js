module.exports = {
  // 关闭eslint校验工具
  lintOnSave: false,
  //配置代理服务器
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
      },
    },
  },
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', resolve('src/app'))
  //     .set('VIEW', resolve('src/app/view'))
  //     .set('UTIL', resolve('src/app/util'))
  //     .set('SERVICE', resolve('src/app/service'))
  //     .set('MODEL', resolve('src/app/model'))
  //     .set('ROUTER', resolve('src/app/router'))
  //     .set('CONFIG', resolve('src/app/config'))
  // }
};