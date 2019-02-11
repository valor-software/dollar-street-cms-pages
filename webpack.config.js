'use strict';

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  template: 'index.tmpl.html',
  index: 'index.html',
  src: './src',
  dest: './dist'
};

/* eslint-disable */

const isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod';
const S3_BUCKET = process.env.S3_BUCKET || 'static3.dollarstreet.org';
const CMS_SERVER_URL = process.env.CMS_SERVER_URL || 'http://localhost';
const EXTERNAL_PORT = process.env.EXTERNAL_PORT || '8011';
const absSrc = path.join(__dirname, config.src);
const absDest = path.join(__dirname, config.dest);

const wConfig = {
  debug: true,
  profile: true,
  cache: true,
  devtool: isProduction ? 'sourcemaps' : 'eval',
  context: absSrc,
  entry: {
    'app': ['app.js', 'app.config.js'],
    'fancyboxInit': 'js/fancyboxInit.js'
  },
  output: {
    path: absDest,
    filename: '[name].js',
    library: '[name]',
    publicPath: '/'
  },
  resolve: {
    modulesDirectories: ['components', 'assets', 'libs', 'node_modules'],
    extensions: ['', '.js', '.png', '.gif', '.jpg'],
  },
  plugins: [
    new CleanWebpackPlugin(config.dest),
    new webpack.DefinePlugin({
      isProduction: isProduction,
      S3_BUCKET: JSON.stringify(S3_BUCKET),
      CMS_SERVER_API: JSON.stringify(CMS_SERVER_URL + ':' + EXTERNAL_PORT),
      CMS_SOCKETS_API: JSON.stringify(CMS_SERVER_URL),
    }),
    new CopyWebpackPlugin([
      { from: './index.tmpl.html', to: './index.html'},
      { from: './components', to: './components'},
      { from: './assets', to: './assets'},
      { from: './assets/js/jquery.fancybox.pack.js', to: './assets/js/jquery.fancybox.pack.js' },
      { from: './assets/js/angular-file-upload-shim.min.js', to: './assets/js/angular-file-upload-shim.min.js' },
      { from: './assets/js/angular-file-upload.min.js', to: './assets/js/angular-file-upload.min.js' },
      { from: './assets/js/ng-breadcrumbs.min.js', to: './assets/js/ng-breadcrumbs.min.js' },
      { from: './assets/js/photo-area.js', to: './assets/js/photo-area.js' },
      { from: './libs/**/*.css', to: '.'},
      { from: './libs/**/*.gif', to: '.'},
      { from: './libs/**/*.png', to: '.'},
      { from: './libs/**/*.svg', to: '.'},
      { from: './libs/**/*.jpg', to: '.'},
      { from: './libs/bootstrap', to: './libs/bootstrap'},
      { from: './libs/lodash/lodash.min.js', to: './libs/lodash/lodash.min.js' },
      { from: './libs/async/lib/async.js', to: './libs/async/lib/async.js' },
      { from: './libs/components-font-awesome', to: './libs/components-font-awesome'},
      { from: './libs/jquery/dist/jquery.min.js', to: './libs/jquery/dist/jquery.min.js' },
      { from: './libs/angular/angular.min.js', to: './libs/angular/angular.min.js' },
      { from: './libs/metisMenu/jquery.metisMenu.js', to: './libs/metisMenu/jquery.metisMenu.js' },
      { from: './libs/tinymce-dist/tinymce.js', to: './libs/tinymce-dist/tinymce.js' },
      { from: './libs/angular-ui-tinymce/src/tinymce.js', to: './libs/angular-ui-tinymce/src/tinymce.js' },
      { from: './libs/angular-resource/angular-resource.min.js', to: './libs/angular-resource/angular-resource.min.js' },
      { from: './libs/angular-sanitize/angular-sanitize.min.js', to: './libs/angular-sanitize/angular-sanitize.min.js' },
      { from: './libs/ngInfiniteScroll/build/ng-infinite-scroll.min.js', to: './libs/ngInfiniteScroll/build/ng-infinite-scroll.min.js' },
      { from: './libs/angular-google-maps/dist/angular-google-maps.min.js', to: './libs/angular-google-maps/dist/angular-google-maps.min.js' },
      { from: './libs/angular-ui-router/release/angular-ui-router.min.js', to: './libs/angular-ui-router/release/angular-ui-router.min.js' },
      { from: './libs/dndLists/angular-drag-and-drop-lists.min.js', to: './libs/dndLists/angular-drag-and-drop-lists.min.js' },
      { from: './libs/angular-bootstrap/ui-bootstrap-tpls.min.js', to: './libs/angular-bootstrap/ui-bootstrap-tpls.min.js' },
      { from: './libs/angular-xeditable/dist/js/xeditable.min.js', to: './libs/angular-xeditable/dist/js/xeditable.min.js' },
      { from: './libs/ng-tags-input/ng-tags-input.min.js', to: './libs/ng-tags-input/ng-tags-input.min.js' },
      { from: './libs/device.js/lib/device.min.js', to: './libs/device.js/lib/device.min.js' },
      { from: './libs/angular-ui-select/dist/select.min.js', to: './libs/angular-ui-select/dist/select.min.js' },
      { from: './libs/async/lib/async.js', to: './libs/async/lib/async.js' },
      { from: './libs/angular-notify/dist/angular-notify.js', to: './libs/angular-notify/dist/angular-notify.js' },
      { from: './libs/ng-cropper/dist/ngCropper.all.js', to: './libs/ng-cropper/dist/ngCropper.all.js' },
      { from: './libs/socket.io-client/dist/socket.io.js', to: './libs/socket.io-client/dist/socket.io.js' },
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
    ]);
  },
  stats: {colors: true, progress: true, children: false}
};

/* eslint-enable */

wConfig.pushPlugins();

module.exports = wConfig;
