var gulp = require('gulp')
  , replace = require('gulp-replace')
  , mocha = require('gulp-mocha')
  , config = require('./config.json')
  , gitterApiParams = require('./src/gitterApiParams')

gulp.task('build', function() {
  var params = JSON.stringify(gitterApiParams(config))
  return gulp.src(['./src/ayouken.old.js'])
    .pipe(replace('{botName}', config.botName))
    .pipe(replace('{gitterApiParams}', params))
    .pipe(replace('{apiUrl}', config.apiUrl))
    .pipe(replace('{apiPort}', config.apiPort))
    .pipe(gulp.dest('dist/'))
})

gulp.task('test', function() {
  return gulp.src('test/test.js', { read: false })
    .pipe(mocha({ reporter: 'nyan' }))
})

gulp.task('default', function() {
  gulp.start('build')
})
