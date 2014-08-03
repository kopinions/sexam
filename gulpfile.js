var gulp = require('gulp');
var exec = require('child_process').exec;
var mocha = require('gulp-mocha');


gulp.task('deploy', ['build'], function(cb) {
	 exec('fly production', function (err, stdout, stderr) {
    if (err) {
    	return cb(err);
    }

    cb();
  });
});



gulp.task('test', function(cb) {
    gulp.src('test/**/*.js').pipe(mocha());
});