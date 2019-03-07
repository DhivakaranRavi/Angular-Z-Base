'use strict';

const common = require('./webpack.common');
const merge = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    historyApiFallback: true,
    stats: {
      modules: false,
      warnings: false,
    },
  },
  optimization: {
    noEmitOnErrors: true,
    runtimeChunk: 'single',
    splitChunks: {
      maxAsyncRequests: Infinity,
      cacheGroups: {
        default: {
          chunks: 'async',
          minChunks: 2,
          priority: 10,
        },
        common: {
          name: 'common',
          chunks: 'async',
          minChunks: 2,
          enforce: true,
          priority: 5,
        },
        vendors: false,
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          enforce: true,
          test: (module, chunks) => {
            const moduleName = module.nameForCondition
              ? module.nameForCondition()
              : '';
            return (
              /[\\/]node_modules[\\/]/.test(moduleName) &&
              !chunks.some(
                ({ name }) => name === 'polyfills' || 'styles.css' === name,
              )
            );
          },
        },
      },
    },
  },
});
