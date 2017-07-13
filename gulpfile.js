var gulp = require('gulp'),
    minify = require('gulp-minify'),
    uglify = require('gulp-uglify'),
    pump = require('pump');

gulp.task('default', function (callback) {
    gulp.src('resources/assets/js/*')
        .pipe(minify({
            ext: {
                src: '.js'
            }
        }))
        .pipe(gulp.dest('public/js'));

    pump([
        gulp.src('resources/assets/js/*'),
        uglify(),
        gulp.dest('public/js')
    ], callback);

    gulp.src('resources/assets/css/*')
        .pipe(gulp.dest('public/css'));
});
