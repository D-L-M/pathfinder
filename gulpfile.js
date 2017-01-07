var gulp       = require('gulp');
var browserify = require('browserify');
var babelify   = require('babelify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var uglify     = require('gulp-uglify');
var rename     = require('gulp-rename');


gulp.task('copyHtml', function()
{
    gulp.src('./src/*.html').pipe(gulp.dest('./dist/'));
});


gulp.task('compileJavaScript', function()
{

    var bundler = browserify({entries: './src/js/index.js', standalone: 'Pathfinder'});

    bundler.transform('babelify', {presets: ['es2015']});
    bundler.bundle().pipe(source('index.js')).pipe(buffer()).pipe(uglify()).pipe(rename('pathfinder.min.js')).pipe(gulp.dest('./dist/'));

});


gulp.task('all', ['copyHtml', 'compileJavaScript']);


gulp.task('watch', function()
{
    gulp.watch('src/**/*', ['all']);
});


gulp.task('default', ['all', 'watch']);