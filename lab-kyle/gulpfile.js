'use strict';

const gulp = require('gulp');
const lint = require('gulp-eslint');
const mocha = require('gulp-mocha');

gulp.task('test', function() {
  // run mocha
});

gulp.tast('lint', function() {
  // run eslint
});

gulp.task('dev', function() {
  // gulp watch files to test/lint
});

gulp. task('default', ['dev']);
