const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const zopfli = require('@gfx/zopfli')
const TerserPlugin = require('terser-webpack-plugin')
const SriPlugin = require('webpack-subresource-integrity');
const RobotstxtPlugin = require('robotstxt-webpack-plugin');

module.exports = (env, argv) => {

  const productionOptimizationsEnabled = argv.mode === 'production' ? true : false
  let plugins = [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      favicon: './src/favicon.ico'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
    new CopyWebpackPlugin([
      { from: 'config' }
    ]),
    new RobotstxtPlugin({policy: [
      {
        disallow: "/",
        userAgent: "*",
      },
    ],
    filePath: './robots.txt'})
  ]

  if (productionOptimizationsEnabled) {
    plugins.push(new CompressionPlugin({
      exclude: /config/,
      compressionOptions: {
        numiterations: 15,
      },
      algorithm(input, compressionOptions, callback) {
        return zopfli.gzip(input, compressionOptions, callback);
      },
    }))
    plugins.push(new SriPlugin({
      hashFuncNames: ['sha256', 'sha384']
    }))
  }

  return {
    entry: {
      main: ['@babel/polyfill', path.join(__dirname, 'src', 'index.js')]
    },
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      crossOriginLoading: 'anonymous'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{ loader: 'babel-loader' }]
        },
        {
          test: /\.(pdf|jpg|png|gif|ico)$/,
          use: [{ loader: 'file-loader' }]
        },
        {
          test: /\.svg$/,
          use: [{ loader: 'svg-inline-loader' }]
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [require('autoprefixer')()]
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
      contentBase: path.join(__dirname, 'dist'),
      compress: productionOptimizationsEnabled,
      open: true,
      port: 9001,
      host: 'localhost'
    },
    plugins: plugins,
    optimization: {
      minimize: productionOptimizationsEnabled,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              typeofs: false
            }
          }
        }),
      ],
      moduleIds: 'hashed',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          }
        }
      }
    }
  }
}
