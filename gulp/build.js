'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jsmin = require('gulp-jsmin');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var bowerFiles = require('main-bower-files');
var clean = require('gulp-clean');
var gutil = require('gulp-util');


//js concat in one file
var jsFiles = './src/app/**/*.js', jsDest = 'dist/js';
gulp.task('js', function() {
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(jsmin())
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest(jsDest));
});

//css concat in one file
var cssFiles = './src/assets/css/*.css', cssDest = 'dist/css';
gulp.task('css', function () {
  return gulp.src(cssFiles)
         .pipe(concat('stylesheet.css'))
         .pipe(gulp.dest(cssDest))
         .pipe(rename('stylesheets.min.css'))
         .pipe(cleanCSS({compatibility: 'ie8'}))
         .pipe(gulp.dest(cssDest))
});

//build html too in - dist if run index html from built should run
gulp.task('views', function() {
    gulp.src('./src/index.html')  // Get our index.html
    .pipe(gulp.dest('dist/')); // And put it in the dist folder

    gulp.src('./src/views/**/*') // Any other view files from app/views
         .pipe(gulp.dest('dist/views/')); // Will be put in the dist/views folder
});

gulp.task('distInject',['views'],function(){
    //Now inject all js from dist folder into dist/index.html
             var target = gulp.src('./dist/index.html');
             var sources = gulp.src(['./dist/css/*.css','./dist/js/**.*.js']);
             var injectOptions = {addRootSlash: false, relative: true};
             return target.pipe(inject(sources, injectOptions))
             .pipe(gulp.dest('./dist'));
    //Inject done
});

gulp.task('distBower', function () {
  var target = gulp.src('./dist/index.html');
  var sources = gulp.src(['./bower_components/angular/**/*.css', './bower_components/angular/**/*.min.js']);
  var injectOptions = { addRootSlash: false, relative: true, name :'bower'};
  return target.pipe(inject(sources, injectOptions))
  .pipe(gulp.dest('./dist'));
});

gulp.watch(['./src/index.html', './src/views/**/*.html'], [
  'views'
]);

gulp.task('copyfonts', function() {
   gulp.src('./src/assets/fonts/**/*.{ttf,woff,eof,svg}')
   .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('images', function () {
    return gulp.src('./src/assets/img/**/*')
        .pipe(gulp.dest('./dist/images'))
});

gulp.task('webserver', function() {
  gulp.src('./dist')
    .pipe(webserver({
        fallback: 'index.html'
    }));
});

gulp.task('clean', function () {
    return gulp.src(['./dist/css', '.dist/js', './dist/images','./dist/*.html'], { read: false }).pipe(clean());
});


//gulp.task('build', ['js' , 'css' , 'views' , 'copyfonts' , 'images', 'clean']);