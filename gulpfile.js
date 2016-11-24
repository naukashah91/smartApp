'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir');
requireDir('./gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

//BrowserSync
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./src/"
        }
    });
    gulp.watch("./src/*.html").on("change", browserSync.reload);
});

gulp.task('build', function(callback) {
  runSequence('clean','styles','views','css','index','bowerInject','distInject','distBower','js','css','copyfonts','images','serve', callback);
});

