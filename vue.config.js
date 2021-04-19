const path = require("path"); //引入path
function resolve(dir) { //封装一个通用方法
  return path.resolve(__dirname, dir);
}

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('assets', resolve('./src/assets'))
      .set('commonjs', resolve('./src/commonjs'))
      .set('common', resolve('./src/common'))
      .set('network', resolve('./src/network'))
      .set('views', resolve('./src/views'))
      .set('store', resolve('./src/store'))
    //set第一个参数：设置的别名，第二个参数：设置的路径
  }
}