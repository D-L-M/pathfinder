var gulp       = require('gulp');
var browserify = require('browserify');
var tsify      = require('tsify');
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

    var bundler = browserify({entries: './src/ts/Pathfinder.ts', standalone: 'Pathfinder'});

    bundler.plugin(tsify, {noImplicitAny: true});
    bundler.bundle().pipe(source('Pathfinder.ts')).pipe(buffer()).pipe(uglify()).pipe(rename('pathfinder.min.js')).pipe(gulp.dest('./dist/'));

});


gulp.task('all', ['copyHtml', 'compileJavaScript']);


gulp.task('watch', function()
{
    gulp.watch('src/**/*', ['all']);
});


gulp.task('default', ['all', 'watch']);