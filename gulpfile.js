
// gulp.task('compress', function() {
//     gulp.src('lib/*.js')
//         .pipe(minify({
//             ext:{
//                 src:'-debug.js',
//                 min:'.js'
//             },
//             exclude: ['tasks'],
//             ignoreFiles: ['.combo.js', '-min.js']
//         }))
//         .pipe(gulp.dest('dist'))
// });


var gulp = require('gulp'),
    gutil = require('gulp-util'),
    livereload = require('gulp-livereload'),
    minify = require('gulp-minify'),
    sass = require('gulp-sass');

console.log(gutil.env);

gulp.task('html', function () {
    gulp.src('src/**/*.html')
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
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
});

gulp.task('js-project', function () {
    var process = gutil.env.dist ? minify : gutil.noop;
    gulp.src('src/js/**/*.js')
        .pipe(process({noSource:true, ext:{min:'.js'}}))
        .pipe(gulp.dest('dist/js/'))
        .pipe(livereload());
});

gulp.task('default', ['js-project', 'html', 'asset', 'sass'], function () {
    livereload.listen();
    gulp.watch('**/*.html', {cwd: './src'}, ['html']);
    gulp.watch('sass/**/*.scss', {cwd: './src'}, ['sass']);
    gulp.watch('js/**/*.js', {cwd: './src'}, ['js-project']);
});