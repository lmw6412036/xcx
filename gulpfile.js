var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

require('./modules/make')(gulp);


gulp.task('wxml', () => {
    return gulp.src('./src/**/*.html')
        .pipe(rename({
            extname: ".wxml"
        }))
        .pipe(gulp.dest('./build'))
});

gulp.task('wxss', () => {
    return gulp.src('./src/**/*.scss')
        .pipe(sass())
        .pipe(rename({
            extname: '.wxss'
        }))
        .pipe(gulp.dest('./build'))
});

gulp.task('copy:images', () => {
    return gulp.src('./src/images/**/*', {
        base: "./src"
    })
        .pipe(gulp.dest("./build"))
});

gulp.task('copy:js', () => {
    return gulp.src("./src/**/*.+(json|js)")
        .pipe(gulp.dest("./build"))
});

gulp.task("default", ['wxss', 'wxml', 'copy:js','copy:images'], () => {

});