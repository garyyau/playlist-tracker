var _ = require('lodash');
var gulp = require('gulp');
var requireDir = require('require-dir');


const tasks = requireDir('./gulp/tasks');
const taskList = _.keys(tasks);
gulp.task('default', taskList);

const watchers = requireDir('./gulp/watcher-tasks');
const watcherList = _.keys(watchers);
gulp.task('watch', watcherList);
