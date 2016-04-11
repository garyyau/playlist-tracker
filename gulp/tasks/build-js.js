var _ = require('lodash');
var browserify = require('browserify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

var config = require('./../config').js;


const bundleConfig = _.assign({}, watchify.args, {
	entries: [config.main],
	transform: [['babelify', {
		presets: ['es2015'],
	}]],
	debug: true,
	bundleExternal: false,
});
const bundle = browserify(bundleConfig);

const build = () => {
	bundle.bundle()
		.on('error', (error) => {
			gutil.log("Browserify Error");
			gutil.log(error.toString());
		})
		.pipe(source(config.outputName))
		.pipe(gulp.dest(config.dest));
};


gulp.task('build-js', build());


module.exports.bundle = bundle;
module.exports.build = build;
