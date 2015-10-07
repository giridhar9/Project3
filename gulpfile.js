var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var connect = require('gulp-connect');

gulp.task('compress-js', function() {
 gulp.src('js/*.js')
    .pipe(concat('main.min.js'))
 	.pipe(uglify())
 	.pipe(gulp.dest('build/js'))
});

gulp.task('compress-css', function(){
	gulp.src('css/*.css')
	.pipe(concat('main.min.css'))
 	.pipe(gulp.dest('build/css'))
});
gulp.task('watch', function(){
	gulp.watch('js/*.js', ['compress-js']);
	gulp.watch('css/*.css', ['compress-css']);
});
gulp.task('browser-sync', ['compress-css', 'compress-js'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
gulp.watch('css/*.css', ['compress-css']);
gulp.watch('css/*.css').on('change', browserSync.reload);

gulp.watch('js/*.js', ['compress-js']);
gulp.watch('js/*.js').on('change', browserSync.reload);
});

gulp.task('connect', function(){
	connect.server();
});