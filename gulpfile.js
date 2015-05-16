var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
 
gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe(reload({ stream: true }))
});

var browserify = require('gulp-browserify');
 
gulp.task('browserify', function() {
    return gulp.src('./js/main.js')
        .pipe(browserify())
        .pipe(gulp.dest('./build/js'))
});

gulp.task('serve', ['less'], function() {
  browserSync({
    server: {
      baseDir: '.'
    }
  });

  gulp.watch('less/**/*.less', ['less']);
  gulp.watch('js/**/*.js', ['browserify']);
});

gulp.task('default', ['less', 'browserify']);