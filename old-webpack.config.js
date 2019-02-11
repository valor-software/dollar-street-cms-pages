'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
  template: 'index.tmpl.html',
  index: 'index.html',
  src: './src',
  dest: './dist'
};

/* eslint-disable */

const isProduction = process.env.NODE_ENV === 'production';
const absSrc = path.join(__dirname, config.src);
const absDest = path.join(__dirname, config.dest);

const wConfig = {
  debug: true,
  profile: true,
  cache: true,
  devtool: isProduction ? 'sourcemaps' : 'eval',
  context: path.join(__dirname, config.src),
  /*entry: {
    dollarstreet: './components',
    angular: ['jquery', 'angular', 'angular-ui-router', 'angular-touch', 'oclazyload', 'angular-bootstrap']
  },*/
  output: {
    path: absDest,
    publicPath: './',
    filename: 'components/[name]-[hash:6].js',
    chunkFilename: 'components/[name]-[hash:6].js'
  },
  resolve: {
    root: [absSrc],
    modulesDirectories: ['./components', 'node_modules'],
    extensions: ['', '.js', '.png', '.gif', '.jpg'],
    alias: {
      'angular-google-maps': 'angular-google-maps/dist/angular-google-maps.min.js',
      'ng-infinite-scroll': 'ng-infinite-scroll/build/ng-infinite-scroll.js',
      datamaps: 'datamaps/dist/datamaps.all.js'
    }
  },
  module: {
    noParse: [
      /jquery|angular-google-maps|bootstrap/ig,
      /min\.css$/
    ],
    loaders: [
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap&root=' + absSrc + '!less-loader')
      }, {
        test: /\.css$/,
        exclude: /bootstrap/ig,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?root=' + absSrc)
      }, {
        test: /.*\.(gif|png|jpe?g)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }, {
        test: /\.html$/,
        loader: 'html?name=[name].[ext]&root=' + absSrc
      }, {
        test: [/fontawesome-webfont\.svg/, /fontawesome-webfont\.eot/],
        loader: 'file?name=assets/fonts/[name].[ext]'
      },
      // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
      // loads bootstrap's css.
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?name=assets/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?name=assets/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?name=assets/fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream'
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file?name=assets/fonts/[name].[ext]'
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?name=assets/fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(config.dest),
    new webpack.DefinePlugin({
      S3_BUCKET: JSON.stringify(process.env.S3_BUCKET || 'static3.dollarstreet.org'),
      CMS_SERVER_API: JSON.stringify('test'),
      CMS_SOCKETS_API: JSON.stringify('test')
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new ExtractTextPlugin('[name]-[hash:6].css'),
    new webpack.optimize.CommonsChunkPlugin('angular', 'vendor/angular-[hash:6].bundle.js'),
    new HtmlWebpackPlugin({
      filename: config.index,
      template: path.join(config.src, config.template),
      chunks: ['angular', 'dollarstreet'],
      minify: {}
    }),
    new CopyWebpackPlugin([
      { from: './assets', to: './assets'},
      { from: './components', to: './components'},
      { from: './libs', to: './libs'}
    ])
  ],
  pushPlugins: function () {
    if (!isProduction) {
      return;
    }

    console.log('Adding production plugins');
    this.plugins.push.apply(this.plugins, [
      // production only
      new webpack.optimize.UglifyJsPlugin(),
      /*new CompressionPlugin({
        asset: '{file}.gz',
        algorithm: 'gzip',
        regExp: /\.js$|\.html|\.css|.map$/,
        threshold: 10240,
        minRatio: 0.8
      })*/
    ]);
  }
};

/* eslint-enable */

wConfig.pushPlugins();

module.exports = wConfig;
