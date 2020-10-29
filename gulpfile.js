// Include Gulp and all required plugins

var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var sourcePath = 'public/static/style/less/Shell.less';
var targetPath = 'public/static/css';

gulp.task('less', function () {
    return gulp.src([sourcePath])
        .pipe(less({
            compress: false
        }).on('error', gutil.log))
        .pipe(autoprefixer('last 10 versions', 'ie 9'))
        .pipe(minifyCSS({
            keepBreaks: true
        }))
        .pipe(rename('main.css'))
        .pipe(gulp.dest(targetPath));
});