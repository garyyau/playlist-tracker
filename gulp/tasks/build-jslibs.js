var _ = require('lodash');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');

var config = require('./../config').jslibs;
var pkg = require('./../../package.json');


gulp.task('build-jslibs', () => {
	const libs = _.keys(pkg.dependencies);
	const bundle = browserify({ debug: true, require: libs });

	bundle.bundle()
		  .pipe(source(config.outputName))
		  .pipe(gulp.dest(config.dest))
});
