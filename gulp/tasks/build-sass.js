var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var gulp = require('gulp');
var minify = require('gulp-minify-css');
var sass = require('gulp-sass');

var config = require('./../config').sass;


// Tasks
gulp.task('sass', () => {
	gulp.src(config.src)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer('last 2 versions'))
		.pipe(concat(config.outputName))
		.pipe(minify())
		.pipe(gulp.dest(config.dest));
});

gulp.task('sass:watch', () => {
	gulp.watch(config.src, ['sass']);
});


module.exports.tasks = ['sass']
module.exports.watchers = ['sass:watch']
