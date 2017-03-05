'use strict';

const gulp         = require('gulp');
const connect      = require('gulp-connect');
const pug          = require('gulp-pug');
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const paths = {
  src:  './src',
  dst:  './build',
  sass: './src/**/*.sass',
  jade: ['./src/**/*.jade', '!./src/layouts/**/*.jade']
};

gulp.task('reload', function () {
  return gulp.src(paths.src, { read: false })
    .pipe(connect.reload());
});

gulp.task('pug', () => {
  return gulp.src(paths.jade)
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(paths.dst));
})

gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe(sass()
    .on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.dst));
});

gulp.task('watch', () => {
  gulp.watch(paths.jade, ['pug', 'reload']);
  gulp.watch(paths.sass, ['sass', 'reload']);
});

gulp.task('connect', () => {
  connect.server({
    root: paths.dst,
    livereload: true,
    port: 8080
  });
});

gulp.task('default', [
  'pug',
  'sass',
  'watch',
  'connect'
]);
