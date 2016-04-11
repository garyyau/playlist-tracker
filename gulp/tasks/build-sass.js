var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var gulp = require('gulp');
var minify = require('gulp-minify-css');
var sass = require('gulp-sass');

var config = require('./../config').sass;


gulp.task('build-sass', () => {
	gulp.src(config.src)
		.pipe(sass())
		.pipe(autoprefixer('last 2 versions'))
		.pipe(concat(config.outputName))
		.pipe(minify())
		.pipe(gulp.dest(config.dest));
});

