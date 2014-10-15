var gulp = require('gulp')
  , replace = require('gulp-replace')
  , config = require('./config.json')
  , gitterApiParams = require('./src/gitterApiParams')

gulp.task('build', function() {
  var params = JSON.stringify(gitterApiParams(config))
  return gulp.src(['./src/ayouken.js'])
    .pipe(replace('{botName}', config.botName))
    .pipe(replace('{gitterApiParams}', params))
    .pipe(gulp.dest('dist/'))
})

gulp.task('default', function() {
  gulp.start('build')
})
