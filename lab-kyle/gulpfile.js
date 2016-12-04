'use strict';

const gulp = require('gulp');
const lint = require('gulp-eslint');
const mocha = require('gulp-mocha');

gulp.task('test', function() {
  gulp.src('./test/test-server.js', {read: false})
  .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('lint', function() {
  // run eslint
});

gulp.task('dev', function() {
  // gulp watch files to test/lint
});

gulp. task('default', ['dev']);
