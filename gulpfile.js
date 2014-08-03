var gulp = require('gulp');
var exec = require('child_process').exec;
var mocha = require('gulp-mocha');


gulp.task('deploy', function(cb) {
	exec('fly deploy:production', function (err, stdout, stderr) {

    if (err) {
    	return cb(err);
    }
        console.log(stdout);
    cb();
  });
});



gulp.task('test', function(cb) {
    gulp.src('test/**/*.js').pipe(mocha());
});