const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

const commonConfig = require('./webpack.common');
const { ENV, dir, APP_VERSION } = require('./helpers');

const banner =
`/**
 * @swimlane/ngx-dnd v${APP_VERSION} (https://github.com/swimlane/ngx-dnd)
 * Copyright 2017
 * Licensed under MIT
 */`;

module.exports = function(env) {
  return webpackMerge(commonConfig({ env: ENV }), {
    devtool: 'source-map',
    module: {
      exprContextCritical: false,
      rules: [
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader',
            'angular2-template-loader'
          ],
          exclude: [/\.(spec|e2e|d)\.ts$/]
        }
      ]
    },
    entry: {
      'index': './src/index.ts'
    },
    output: {
      path: dir('release'),
      libraryTarget: 'umd',
      library: 'ngx-dnd',
      umdNamedDefine: true
    },
    externals: {
      '@angular/platform-browser-dynamic': '@angular/platform-browser-dynamic',
      '@angular/platform-browser': '@angular/platform-browser',
      '@angular/core': '@angular/core',
      '@angular/common': '@angular/common',
      '@angular/forms': '@angular/forms',
      'core-js': 'core-js',
      'core-js/es6': 'core-js/es6',
      'core-js/es7/reflect': 'core-js/es7/reflect',
      'rxjs': 'rxjs',
      'rxjs/Rx': 'rxjs/Rx',
      'rxjs/Observable': 'rxjs/Observable',
      'rxjs/add/observable/fromEvent': 'rxjs/add/observable/fromEvent',
      'rxjs/add/operator/debounceTime': 'rxjs/add/operator/debounceTime',
      'zone.js/dist/zone': 'zone.js/dist/zone'
    },
    plugins: [
      new CheckerPlugin(),
      new webpack.BannerPlugin({
        banner: banner,
        raw: true,
        entryOnly: true
      })
    ]
  });

};
