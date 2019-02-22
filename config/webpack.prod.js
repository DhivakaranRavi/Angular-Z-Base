const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const {
  CleanCssWebpackPlugin,
} = require('@angular-devkit/build-angular/src/angular-cli-files/plugins/cleancss-webpack-plugin');
const {
  SuppressExtractedTextChunksWebpackPlugin,
} = require('@angular-devkit/build-angular/src/angular-cli-files/plugins/suppress-entry-chunks-webpack-plugin');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const { HashedModuleIdsPlugin } = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
module.exports = merge(common, {
  mode: 'production',
  devtool: '',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: '@angular-devkit/build-optimizer/webpack-loader',
        options: { sourceMap: true },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        include: [resolve('./src/styles.css')],
      },
    ],
  },
  optimization: {
    noEmitOnErrors: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];
            return `angular-z-base.${packageName.replace('@', '')}`;
          },
        },
      },
    },
    minimizer: [
      new HashedModuleIdsPlugin(),
      new UglifyJSPlugin({
        sourceMap: true,
        cache: true,
        parallel: true,
        uglifyOptions: {
          safari10: true,
          output: {
            ascii_only: true,
            comments: false,
            webkit: true,
          },
          compress: {
            pure_getters: true,
            passes: 3,
            inline: 3,
          },
        },
      }),
      new CleanCssWebpackPlugin({
        sourceMap: true,
        test: file => /\.(?:css)$/.test(file),
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new SuppressExtractedTextChunksWebpackPlugin(),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.7,
    }),
  ],
});
