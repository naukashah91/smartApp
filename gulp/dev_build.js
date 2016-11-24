'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');
var sass = require('gulp-sass');
//var gutil = require('gulp-util');
var cleanCSS = require('gulp-clean-css');
var bowerFiles = require('main-bower-files');

gulp.task('styles', function() {
    gulp.src('./src/app/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/assets/css/'))
});

gulp.task('index',['styles'], function () {
  var target = gulp.src('./src/index.html');
  var sources = gulp.src(['./src/app/**/*.js', './src/assets/css/*.css']);
  var injectOptions = {ignorePath: 'src', addRootSlash: false, relative: true};
  return target.pipe(inject(sources, injectOptions))
    .pipe(gulp.dest('./src'));
});

gulp.task('bowerInject',['index'], function () {
  var target = gulp.src('./src/index.html');
  var sources = gulp.src(['./bower_components/angular/**/*.js', './bower_components/angular/**/*.css', '!./bower_components/angular/**/*.min.js']);
  var injectOptions = { addRootSlash: false, relative: true, name :'bower'};
  return target.pipe(inject(sources, injectOptions))
  .pipe(gulp.dest('./src'));
});
