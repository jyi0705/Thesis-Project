const path = require('path');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const SRC_DIR = path.resolve(__dirname, 'public');
const BUILD_DIR = path.resolve(__dirname, 'public');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(SRC_DIR, 'index.js'),
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR
  },
  devtool: 'source-map',
  plugins: [
    new SWPrecacheWebpackPlugin(
      {
        cacheId: 'Gennuity',
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'service-worker.js',
        minify: true,
        navigateFallback: './public/index.html',
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      }
    ),
    new UglifyJSPlugin(
      {
        sourceMap: true
      }
    ),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }) 
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015', 'react'] }
        }],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test   : /\.css$/,
        loader : 'style-loader!css-loader'
      },
      {
        test   : /\.(html)$/,
        loader : 'html-loader'
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        test   : /\.(png|jpg)$/,
        loader : 'url-loader?limit=8192'
      }, 
      {
        test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: 65,
              },
              svggo: {},
              webp: {
                quality: 65
              }
            }
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}