const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge');
const path = require('path');

const bundleFileName = 'bundle.js';
const cssLoaders = [
  {
    loader: 'css-loader',
  }, {
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
];


module.exports = (env) => {
  const common = {
    entry: [
      'babel-polyfill',
      'index.js',
    ],

    output: {
      path: path.join(__dirname, '/build'),
      publicPath: (env === 'build') ? '' : '/',
      filename: (env === 'build') ? `js/${bundleFileName}` : bundleFileName,
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'public/index.html',
      }),
    ],

    resolve: {
      modules: [
        'node_modules',
        'src',
      ],
      extensions: [
        '.js',
        '.css',
      ],
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          }
        }, {
          test: /fonts/,
          exclude: /node_modules/,
          loader: (env === 'build') ? 'url-loader?limit=1024&name=fonts/[name].[ext]' : 'file-loader',
        }, {
          test: /img/,
          exclude: /node_modules/,
          loader: (env === 'build') ? 'url-loader?limit=10000&name=img/[name].[ext]' : 'file-loader',
        },
      ]
    }
  };

  switch (env) {
    case 'dev':
      return merge([
        common,
        {
          plugins: [
            new HardSourceWebpackPlugin(),
          ],

          devServer: {
            historyApiFallback: true,
            port: 8800,
            publicPath: '/',
          },

          devtool: 'inline-source-map',

          module: {
            rules: [
              {
                test: /\.css$/,
                exclude: /node_modules?!(\/rc-slider)/,
                use: [
                  {
                    loader: 'style-loader',
                  },
                  ...cssLoaders
                ],
              }
            ],
          },
        }
      ]);
    case 'build':
      return merge([
        common,
        {
          plugins: [
            new MiniCssExtractPlugin({
              filename: 'css/[name].css',
            }),
          ],

          module: {
            rules: [
              {
                test: /\.css$/,
                exclude: /node_modules?!(\/rc-slider)/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      publicPath: '../',
                      fallback: 'style-loader',
                    }
                  },
                  ...cssLoaders,
                ],
              }
            ],
          },
        }
      ]);
  }
};
