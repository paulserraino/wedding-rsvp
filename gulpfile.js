var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var browserify = require('gulp-browserify');
var webserver = require('gulp-webserver');
var watch = require('gulp-watch');
 
gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./build/css'))
});

gulp.task('browserify', function() {
    return gulp.src('./app/pages/**/*.js')
        .pipe(browserify())
        .pipe(gulp.dest('./build/js'))
});

gulp.task('watch', function () {
  gulp.watch('./js/**/*.js', ['browserify']);
  gulp.watch('./less/**/*.less', ['less']);
});

gulp.task('webserver', function() {
return gulp.src('.')
    .pipe( webserver({ port: 8000}) );
});

gulp.task('serve', ['less', 'browserify', 'watch', 'webserver']);
gulp.task('default', ['less', 'browserify', 'watch']);
