const ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  autoprefixer = require('autoprefixer'),
  merge = require('webpack-merge'),
  path = require('path');

const bundleFileName = 'bundle.js',
  cssLoaders = [
    {
      loader: 'css-loader'
    }, {
      loader: 'postcss-loader',
      options: {
        plugins: [
          autoprefixer({
            browsers: [
              'ie >= 8',
              'last 3 version'
            ]
          })
        ]
      }
    }
  ];


module.exports = (env) => {
  const common = {
    entry: [
      'babel-polyfill',
      'index.js'
    ],

    output: {
      path: path.join(__dirname, '/build'),
      publicPath: (env === 'build') ? '' : '/',
      filename: (env === 'build') ? `js/${bundleFileName}` : bundleFileName
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'public/index.html'
      })
    ],

    resolve: {
      modules: [
        'node_modules',
        'src'
      ],
      extensions: [
        '.js',
        '.css'
      ]
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties'
              ]
            }
          }
        }, {
          test: /(fonts)/,
          exclude: /(node_modules)/,
          loader: (env === 'build') ? 'url-loader?limit=1024&name=/fonts/[name].[ext]' : 'file-loader'
        }, {
          test: /(img)/,
          exclude: /(node_modules)/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000,
              fallback: 'file-loader',
              name: '[name].[ext]',
              useRelativePath: true,
              publicPath: 'img',
              outputPath: 'img'
            }
          }
        }, {
          test: /(photos)/,
          exclude: /(node_modules)/,
          // loader: 'url-loader?limit=1024&name=/photos/[name].[ext]' : 'file-loader',
          // options: {
          //   name: 'photos/[name].[ext]'
          // }
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000,
              fallback: 'file-loader',
              name: 'photos/[name].[ext]',
              useRelativePath: true,
              publicPath: '/',
              outputPath: '/'
            }
          }
        }
      ]
    }
  };

  switch (env) {
    case 'dev':
      return merge([
        common,
        {
          devServer: {
            historyApiFallback: true,
            port: 8800,
            publicPath: '/'
          },

          devtool: 'inline-source-map',

          module: {
            rules: [
              {
                test: /\.css$/,
                exclude: /(node_modules)/,
                use: [
                  {
                    loader: 'style-loader'
                  },
                  ...cssLoaders
                ]
              }
            ]
          }
        }
      ]);
    case 'build':
      return merge([
        common,
        {
          plugins: [
            new ExtractTextPlugin('css/[name].css')
          ],

          module: {
            rules: [
              {
                test: /\.css$/,
                exclude: /(node_modules)/,
                use: ExtractTextPlugin.extract({
                  publicPath: '../',
                  fallback: 'style-loader',
                  use: [...cssLoaders]
                })
              }
            ]
          }
        }
      ]);
  }
};
