var gulp = require('gulp');
var gutil = require('gulp-util');
var jade = require('gulp-jade');

var config = require('./../config').jade;


// Tasks
gulp.task('jade', () => {
	return gulp.src(config.src, {base: './src/jade/'})
			   .on('error', (error) => {
			   		gutil.log("Jade Compile Error");
			   		gutil.log(error.toString());
			   })
			   .pipe(jade())
			   .pipe(gulp.dest(config.dest));
});

gulp.task('jade:watch', () => {
	return gulp.watch(config.src, ['jade']);
});


module.exports.tasks = ['jade'];
module.exports.watchers = ['jade:watch'];
