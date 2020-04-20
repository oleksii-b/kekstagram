const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = (env) => {
  const isBuild = env ==='build';

  return {
    entry: {
      'polyfills': 'babel-polyfill',
      'main': './src/index.js',
    },

    output: {
      path: path.join(__dirname, '/build'),
      publicPath: isBuild ? '' : '/',
      filename: isBuild ? 'js/[name].[hash].js' : '[name].js',
    },

    plugins: [
      isBuild ? (
        new MiniCssExtractPlugin({
          filename: 'css/[name].[hash].css',
        })
      ) : (
        new webpack.HotModuleReplacementPlugin()
      ),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './assets/index.html',
      }),
    ],

    resolve: {
      modules: [
        'node_modules',
        'assets',
        'src',
      ],
      extensions: [
        '.js',
        '.css',
        '.less',
      ],
    },

    devServer: {
      historyApiFallback: true,
      port: 8800,
      publicPath: '/',
      compress: false,
      hot: true,
      inline: true,
    },

    devtool: 'inline-source-map',

    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        },
        {
          test: /assets\/fonts/,
          exclude: /node_modules/,
          loader: isBuild ? 'url-loader?limit=1024&name=fonts/[name].[ext]' : 'file-loader',
        },
        {
          test: /assets\/img/,
          exclude: /node_modules/,
          loader: isBuild ? 'url-loader?limit=10000&name=img/[name].[ext]' : 'file-loader',
        },
        {
          test: /\.ico$/,
          exclude: /node_modules/,
          loader: 'url-loader?limit=1024&name=[name].[ext]',
        },
        {
          test: /\.(css|less)$/,
          exclude: [
            /node_modules?!(\/rc-slider)/,
          ],
          use: [
            isBuild ? (
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../',
                  fallback: 'style-loader',
                }
              }
            ) : (
              {
                loader: 'style-loader',
              }
            ),
            {
              loader: 'css-loader',
            },
            {
              loader: 'scoped-css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer({
                    browsers: [
                      'ie >= 8',
                      'last 3 version',
                    ],
                  }),
                ],
              },
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
  };
};
