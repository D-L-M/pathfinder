var gulp   = require('gulp');
var babel  = require('gulp-babel');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');


gulp.task('copyHtml', function()
{
    gulp.src('./src/*.html').pipe(gulp.dest('./dist/'));
});


gulp.task('compileJavaScript', function()
{
    gulp.src('src/**/*.js').pipe(babel({presets: ['es2015']})).pipe(concat('pathfinder.min.js')).pipe(uglify()).pipe(gulp.dest('./dist/'));
});


gulp.task('all', ['copyHtml', 'compileJavaScript']);


gulp.task('watch', function()
{
    gulp.watch('src/**/*', ['all']);
});


gulp.task('default', ['all', 'watch']);