var gulp = require('gulp');
var config = require('./../config');


gulp.task('watch-sass', () => {
	gulp.watch(config.src, ['sass']);
});
