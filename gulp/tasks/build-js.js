var _ = require('lodash');
var browserify = require('browserify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

var config = require('./../config').js;


const build = (bundle) => {
	bundle.bundle()
		.on('error', (error) => {
			gutil.log("Browserify Error");
			gutil.log(error.toString());
		})
		.pipe(source(config.outputName))
		.pipe(gulp.dest(config.dest));
};

const bundleConfig = _.assign({}, watchify.args, {
	entries: [config.main],
	transform: [['babelify', {
		presets: ['es2015'],
	}]],
	debug: true,
	bundleExternal: false,
});


// Tasks
gulp.task('js', () => {
	const bundle = browserify(bundleConfig);
	build(bundle);
});

gulp.task('js:watch', () => {
	const bundle = browserify(bundleConfig);
	const watcher = watchify(bundle);
	watcher.on('update', () => build(watcher));
});


module.exports.tasks = ['js'];
module.exports.watchers = ['js:watch'];
