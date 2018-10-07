const path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve("../example-mmo/js/plugins"),
    filename: 'RPGCosmos_Bridge.js'
  },
  devtool: "inline-source-map",
    resolve: {
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules')
        ]
    },
    module: {
    rules: [
      {
        test: /\.js$/, //Check for all js files
        loader: 'babel-loader',
        query: {
          presets: ["babel-preset-es2015"].map(require.resolve)
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
       {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'base64-inline-loader?limit=1000&name=[name].[ext]',
            options: {}
          }
        ]
      }
    ]
  },
   plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ]
}
