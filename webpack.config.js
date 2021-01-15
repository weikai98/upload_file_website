const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'cheap-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  devServer: {
    port: 8000,
    hot: true,
    proxy: {
      '/': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          // options: {
          //   presets: ['@babel/preset-env']
          // }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(c|le|sa|sc)ss$/,
        use: [
          "style-loader",
          "css-loader",
          // "postcss-loader",
          "less-loader",
        ],
      }
    ]
  },
  resolve: {
    // alias: {
    //   'vue$': 'vue/dist/vue.esm.js'
    // }
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        include: /\/src/,
      }),
    ],
  }
}