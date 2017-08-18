'use strict';

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const esLint = require('gulp-eslint');
const clean = require('gulp-clean');

const opts = {minify: false};

gulp.task('lint', () =>
  gulp.src([
    '**/*.js',
    '!src/libs/**/*',
    '!src/assets/js/*',
    '!src/**/*',
    '!node_modules/**/*',
    '!platotest/**/*',
    '!coverage/**/*',
    '!configs/*',
    '!scripts/*',
    '!gulpfile.js'
  ])
    .pipe(esLint({useEslintrc: true}))
    .pipe(esLint.format())
    .pipe(esLint.failOnError())
);

gulp.task('env', () => {
  const prodEnvFile = './src/components/app.config.js';
  const serverUrl = 'CMS_SERVER_URL';
  const socketsUrl = 'CMS_SOCKETS_URL';

  fs.readFile(prodEnvFile, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

    let textByLine = data.split("\n");

    textByLine.forEach((line, index) => {
      if(line.match(/serverApi:/g)) {
        textByLine[index] = `  serverApi: \'${process.env[serverUrl]}\',`;
      }

      if(line.match(/socketsApi:/g)) {
        textByLine[index] = `  socketsApi: \'${process.env[socketsUrl]}\'`;
      }
    });

    fs.writeFile(prodEnvFile, textByLine.join('\n'), 'utf8', function (err) {
      if (err) {
        return console.log(err);
      }
    });
  });
});
