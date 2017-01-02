'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');



gulp.task('welcome', function() {
  console.log('Welcome to the TCP/CHAT');
});

gulp.task('test', function() {
  gulp.src('./test/test-*.js', {read: false})
  .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('eslint', function() {
  return gulp.src(['**/*.js', '!node_modules/**'])
  .pipe(eslint({ fix: true}))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('dev', function() {
  gulp.watch(['**/*.js', '!node_modules/**'], ['test', 'eslint']);
});

gulp.task('default', ['welcome', 'dev']);
console.log('DEFAULT RAN');