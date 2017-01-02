'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const plumber = require('gulp-plumber');

const LIB_PATH = './lib/**/*.js';
const TEST_PATH = './test/**/*.js';

gulp.task('lint', function () {
  gulp.src(['**/*.js','!node_modules/**'])
  .pipe(plumber())
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('mocha', function () {
  gulp.src(TEST_PATH, {read:false})
  .pipe(plumber())
  .pipe(mocha());
});

gulp.task('dev', function () {
  gulp.watch([LIB_PATH, TEST_PATH], ['lint', 'mocha']);
});

// run through lint and mocha the first time, and then start watching the files
gulp.task('default', ['lint','mocha','dev']);
