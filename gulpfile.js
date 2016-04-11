var _ = require('lodash');
var gulp = require('gulp');
var requireDir = require('require-dir');


const modules = requireDir('./gulp/tasks');

const moduleTasks = _.map(modules, (module) => module.tasks);
const tasks = _.flatten(moduleTasks);

const moduleWatchers = _.map(modules, (module) => module.watchers);
const watchers = _.flatten(moduleWatchers);


gulp.task('default', tasks);
gulp.task('watch', watchers);
