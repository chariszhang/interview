const isDev = process.env.NODE_ENV === 'development'
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: path.resolve(__dirname, '/src/main.js'), // 打包入口文件
  output: { // 输出结构
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  mode: 'production', // 打包环境
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg)$/,
      //   // type: 'asset/resource'
      //   use: {
      //     loader: 'file-loader',
      //     options: { // 额外的配置，⽐比如资源名称
      //       name: '[name]_[hash].[ext]',
      //       outputPath: 'images/'
      //     }
      //   }
      // },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'url-loader', // url-loader依赖file-loader
          options: {
            limit: 1024, // 少于limit将图片转为base64,否则使用file-loader加载图片
            name: '[name]-[hash:8].[ext]',
            outputPath: 'images/'
          }
        }
      }

    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new htmlWebpackPlugin({
      title: 'My App',
      filename: 'index.html',
      template: './src/index.html'
    })
  ]
}
