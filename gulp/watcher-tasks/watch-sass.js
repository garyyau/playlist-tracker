var gulp = require('gulp');
var config = require('./../config').sass;


gulp.task('watch-sass', () => {
	console.log(config);
	gulp.watch(config.src, ['build-sass']);
});
