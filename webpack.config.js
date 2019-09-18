var path = require('path');
var env = require('dotenv');
var HtmlWebPackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
env.config();

var appName = process.env.APP;
var appPublicPath = '/' + appName;
var devServerPort = 4001;
var devServerProxy = {
  '/api': 'http://127.0.0.1:4000'
};

function resolve(name) {
  return path.resolve(__dirname, name);
}

module.exports = {
  entry: resolve(path.join(appName, 'index.jsx')),
  output: {
    path: resolve(path.join('builds', appName)),
    filename: 'bundle.js',
    publicPath: appPublicPath
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': resolve(appName)
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/';
              }
            }
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]', //[path][name].[ext] or [contenthash].[ext]
          outputPath: 'assets',
          publicPath: path.join(appPublicPath, 'assets')
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(appName, 'index.html'),
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  devServer: {
    publicPath: appPublicPath,
    historyApiFallback: {
      index: appPublicPath + '/'
    },
    proxy: devServerProxy,
    host: '0.0.0.0',
    port: devServerPort,
    inline: true,
  }
}
