const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const bundleFileName = '[name].js';

const getStyleLoaders = (options) => {
  const isScoped = options && options.isScoped;

  return [
    {
      loader: 'css-loader',
    },
    {
      loader: isScoped ? 'scoped-css-loader' : 'noop-loader',
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
  ];
};

module.exports = (env) => {
  const common = {
    entry: {
      'polyfills': 'babel-polyfill',
      'main': 'index.js',
    },

    output: {
      path: path.join(__dirname, '/build'),
      publicPath: (env === 'build') ? '' : '/',
      filename: (env === 'build') ? `js/${bundleFileName}` : bundleFileName,
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/assets/index.html',
      }),
      new webpack.HotModuleReplacementPlugin(),
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
          test: /fonts/,
          exclude: /node_modules/,
          loader: (env === 'build') ? 'url-loader?limit=1024&name=fonts/[name].[ext]' : 'file-loader',
        },
        {
          test: /img/,
          exclude: /node_modules/,
          loader: (env === 'build') ? 'url-loader?limit=10000&name=img/[name].[ext]' : 'file-loader',
        },
        {
          test: /\.ico$/,
          exclude: /node_modules/,
          loader: 'url-loader?limit=1024&name=[name].[ext]',
        },
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
            publicPath: '/',
            compress: false,
            hot: true,
            inline: true,
          },

          devtool: 'inline-source-map',

          module: {
            rules: [
              {
                test: /\.(css|less)$/,
                exclude: [
                  /node_modules?!(\/rc-slider)/,
                  /\.scoped\.(css|less)$/,
                ],
                use: [
                  {
                    loader: 'style-loader',
                  },
                  ...getStyleLoaders(),
                ],
              },
              {
                test: /\.scoped\.(css|less)$/,
                exclude: /node_modules/,
                use: [
                  {
                    loader: 'style-loader',
                  },
                  ...getStyleLoaders({isScoped: true}),
                ],
              },
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
                test: /\.(css|less)$/,
                exclude: [
                  /node_modules?!(\/rc-slider)/,
                  /\.scoped\.(css|less)$/,
                ],
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      publicPath: '../',
                      fallback: 'style-loader',
                    }
                  },
                  ...getStyleLoaders(),
                ],
              },
              {
                test: /\.scoped\.(css|less)$/,
                exclude: /node_modules/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      publicPath: '../',
                      fallback: 'style-loader',
                    }
                  },
                  ...getStyleLoaders({isScoped: true}),
                ],
              },
            ],
          },
        },
      ]);
  }
};
