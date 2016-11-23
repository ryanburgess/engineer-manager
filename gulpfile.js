const gulp = require('gulp');
const jsonlint = require('gulp-jsonlint');
const jshintStyle = require('jshint-stylish');

// JSON lint
gulp.task('jsonlint', function() {
   return gulp.src(['./content/*.json', './*.json'])
     .pipe(jsonlint())
     .pipe(jsonlint.reporter(jshintStyle));
});

gulp.task('test', ['jsonlint']);
