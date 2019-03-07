const { resolve } = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rxPaths = require('rxjs/_esm5/path-mapping');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

module.exports = {
  entry: {
    main: './src/main.ts',
    polyfills: './src/polyfills.ts',
  },
  output: {
    path: resolve('./dist'),
    filename: '[name].[contenthash].js',
  },
  performance: {
    hints: false,
  },
  stats: {
    modules: false,
    warnings: false,
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: rxPaths(),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: '@ngtools/webpack',
      },
      {
        test: /\.js$/,
        exclude: /(ngfactory|ngstyle).js$/,
        enforce: 'pre',
        use: 'source-map-loader',
      },
      {
        test: /\.html$/,
        use: 'raw-loader',
      },
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader'],
        include: resolve('src', 'assets'),
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'to-string-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
        include: [resolve('src', 'app')],
      },
      {
        test: /\.(eot|svg|cur)$/,
        loader: 'file-loader',
        options: {
          name: `[name].[ext]`,
          limit: 10000,
        },
      },
      {
        test: /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
        loader: 'url-loader',
        options: {
          name: `[name].[ext]`,
          limit: 10000,
        },
      },
      {
        test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
        parser: { system: true },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('src/index.html'),
    }),
    new AngularCompilerPlugin({
      mainPath: resolve('./src/main.ts'),
      sourceMap: true,
      nameLazyFiles: false,
      tsConfigPath: resolve('./tsconfig.json'),
      skipCodeGeneration: false,
      skipMetadataEmit: true,
    }),
    new ProgressPlugin(),
    new CircularDependencyPlugin({
      exclude: /[\\\/]node_modules[\\\/]/,
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets',
      },
    ]),
  ],
};
