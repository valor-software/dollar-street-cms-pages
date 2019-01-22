'use strict';

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const esLint = require('gulp-eslint');
const clean = require('gulp-clean');
const exec = require('child_process').exec;

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

gulp.task('watch', () => {
  gulp.watch('src/**/*.*', ['build']);
});

gulp.task('build', (cb) => {
  exec('npm run build', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('env', () => {
  const prodEnvFile = './src/components/app.config.js';
  const CMS_SERVER_URL = process.env.CMS_SERVER_URL || 'http://localhost';
  const EXTERNAL_PORT = process.env.EXTERNAL_PORT || 8011;

  fs.readFile(prodEnvFile, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

    let textByLine = data.split("\n");

    textByLine.forEach((line, index) => {
      if(line.match(/serverApi:/g)) {
        textByLine[index] = `  serverApi: \'${CMS_SERVER_URL}:${EXTERNAL_PORT}\',`;
      }

      if(line.match(/socketsApi:/g)) {
        textByLine[index] = `  socketsApi: \'${CMS_SERVER_URL}\'`;
      }
    });

    fs.writeFile(prodEnvFile, textByLine.join('\n'), 'utf8', function (err) {
      if (err) {
        return console.log(err);
      }
    });
  });
});
