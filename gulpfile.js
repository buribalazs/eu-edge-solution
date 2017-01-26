var gulp = require('gulp'),
    gutil = require('gulp-util'),
    livereload = require('gulp-livereload'),
    htmlmin = require('gulp-htmlmin'),
    minify = require('gulp-minify'),
    sass = require('gulp-sass');

console.log(gutil.env);

gulp.task('html', function () {
    var process = gutil.env.dist ? htmlmin : gutil.noop;
    gulp.src('src/**/*.html')
        .pipe(process({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/'))
        .pipe(livereload());
});

gulp.task('asset', function () {
    gulp.src('src/asset/**/*.*')
        .pipe(gulp.dest('dist/asset'))
        .pipe(livereload());
});

gulp.task('sass', function () {
    gulp.src('src/sass/*.scss')
        .pipe(sass({outputStyle: gutil.env.dist ? 'compressed' : undefined}).on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
});

gulp.task('js-project', function () {
    var process = gutil.env.dist ? minify : gutil.noop;
    gulp.src('src/js/**/*.js')
        .pipe(process({noSource: true, ext: {min: '.js'}}))
        .pipe(gulp.dest('dist/js/'))
        .pipe(livereload());
});

gulp.task('default', ['js-project', 'html', 'asset', 'sass'], function () {
    livereload.listen();
    gulp.watch('**/*.html', {cwd: './src'}, ['html']);
    gulp.watch('sass/**/*.scss', {cwd: './src'}, ['sass']);
    gulp.watch('js/**/*.js', {cwd: './src'}, ['js-project']);
});