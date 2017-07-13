var gulp = require('gulp'),
    minify = require('gulp-minify'),
    uglify = require('gulp-uglify'),
    pump = require('pump');

gulp.task('minify', function () {
    gulp.src('resources/assets/js/*')
        .pipe(minify({
            ext: {
                src: '.js'
            }
        }))
        .pipe(gulp.dest('public/js'));
});

gulp.task('uglify', function (callback) {
    pump([
        gulp.src('resources/assets/js/*'),
        uglify(),
        gulp.dest('public/js')
    ], callback);
});

gulp.task('copy', function () {
    gulp.src('resources/assets/css/*')
        .pipe(gulp.dest('public/css'));
});

gulp.task('default', ['minify', 'uglify', 'copy']);
