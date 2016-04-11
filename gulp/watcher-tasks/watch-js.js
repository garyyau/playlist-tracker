var _ = require('lodash');
const gulp = require('gulp');
const watchify = require('watchify');

const config = require('./../config').js;
const bundle = require('./../tasks/build-js').bundle;
const build = require('./../tasks/build-js').build;


gulp.task('watch-js', () => {
	const watcher = watchify(bundle);
	watcher.on('update', () => build(watcher));
});
