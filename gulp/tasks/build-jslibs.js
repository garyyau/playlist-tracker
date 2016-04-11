var _ = require('lodash');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var fs = require('fs');


var config = require('./../config').jslibs;


// Tasks
gulp.task('jslibs', () => {
	const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
	const libs = _.keys(pkg.dependencies);
	const bundle = browserify({ debug: true, require: libs });

	bundle.bundle()
		  .pipe(source(config.outputName))
		  .pipe(gulp.dest(config.dest))
});

gulp.task('jslibs:watch', () => {
	gulp.watch('./package.json', ['jslibs']);
});


module.exports.tasks = ['jslibs'];
module.exports.watchers = ['jslibs:watch'];
