'use strict';

const path = require('path');
const webpack = require('webpack');

/* eslint-disable */

const isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod';
const CMS_SERVER_URL = process.env.CMS_SERVER_URL || 'http://localhost';
const EXTERNAL_PORT = process.env.EXTERNAL_PORT || '8011';

const config = {
  debug: !isProduction,
  profile: !isProduction,
  cache: !isProduction,
  devtool: isProduction ? 'source-map' : 'eval',
  context: __dirname + '/src',
  entry: {
    app: ['app.js', 'app.config.js'],
    dsConst: 'dsConst.js',
    adminpanel: 'administrator/adminpanel.routing.js',
    fancybox: 'fancyboxInit.js',
    // 'angular-google-maps': 'angular-google-maps/dist/angular-google-maps.js',
    angular: 'angular/angular.min.js',
    jquery: 'jquery/dist/jquery.min.js',
    tinymce: 'tinymce-dist/tinymce.js',
    common: [
      'lodash/lodash.min.js', 'jquery.fancybox.pack.js', 'metisMenu/jquery.metisMenu.js',
      'angular-file-upload-shim.min.js', 'angular-ui-tinymce/src/tinymce.js',
      'angular-resource/angular-resource.min.js', 'angular-sanitize/angular-sanitize.min.js', 'ngInfiniteScroll/build/ng-infinite-scroll.min.js',
      'angular-file-upload.min.js', 'angular-ui-router/release/angular-ui-router.min.js',
      'dndLists/angular-drag-and-drop-lists.min.js', 'ng-breadcrumbs.min.js', 'angular-bootstrap/ui-bootstrap-tpls.min.js',
      'angular-xeditable/dist/js/xeditable.min.js', 'ng-tags-input/ng-tags-input.min.js', 'device.js/lib/device.min.js',
      'angular-ui-select/dist/select.min.js', 'photo-area.js', 'async/lib/async.js', 'angular-notify/dist/angular-notify.js',
      'ng-cropper/dist/ngCropper.all.js',
      'common.js'
    ]
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: '[name]'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      isProduction: isProduction,
      S3_BUCKET: JSON.stringify(process.env.S3_BUCKET),
      CMS_SERVER_API: JSON.stringify(CMS_SERVER_URL + ':' + EXTERNAL_PORT),
      CMS_SOCKETS_API: JSON.stringify(CMS_SERVER_URL),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    })
  ],

  resolve: {
    modulesDirectories: ['assets/js', 'components', 'libs', 'node_modules'],
    extensions: ['', '.js', '.png', '.gif', '.jpg'],
    alias: {
      'angular-google-maps': 'angular-google-maps/dist/angular-google-maps.min.js',
      'ng-infinite-scroll': 'ng-infinite-scroll/build/ng-infinite-scroll.js',
      datamaps: 'datamaps/dist/datamaps.all.js'
    }
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js'],
  },

  module: {
    noParse: [
      /jquery|angular-google-maps|bootstrap/ig,
      /min\.css$/
    ],
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      options: {
        presets: ["es2015", "env", "angular"],
        compact: true
      },
      query: {compact: true, optional: ['runtime']},
      target: "es5",
      exclude: [
        path.join(__dirname, 'src/libs'),
        path.join(__dirname, 'node_modules')
      ]
    }]
  },

  stats: {colors: true, progress: true, children: false},
};

module.exports = config;

if (isProduction) {
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
    parallel: true,
    extractComments: 'all',
    uglifyOptions: {
      warnings: false,
      compress: {
        drop_console: true,
        unsafe: true
      }
    }
  }));
}
/* eslint-enable */
