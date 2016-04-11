var gulp = require('gulp');


gulp.task('watch-jslibs', () => {
	gulp.watch('./../../package.json', ['jslibs:watch']);
})
