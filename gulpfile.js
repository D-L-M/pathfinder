var gulp   = require('gulp');
var babel  = require('gulp-babel');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');


gulp.task('compileJavaScript', function()
{
    gulp.src('src/**/*.js').pipe(babel({presets: ['es2015']})).pipe(concat('pathfinder.min.js')).pipe(uglify()).pipe(gulp.dest('./dist/'));
});


gulp.task('all', ['compileJavaScript']);


gulp.task('watch', function()
{
    gulp.watch('src/**/*', ['all']);
});


gulp.task('default', ['all', 'watch']);