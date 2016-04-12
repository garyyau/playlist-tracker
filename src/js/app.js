var _ = require('lodash');
var angular = require('angular');


// Define the Angular App
var dependencies = [];
var app = angular.module('PlaylistTrackerEx', dependencies);

// Define the Controllers
app.controller('PlaylistController', require('./PlaylistController'));

// Define the Services
app.service('PlaylistService', require('./services/PlaylistService'));
app.service('PlaylistItemFormService', require('./services/PlaylistItemFormService'));

// Define the Directives
app.directive('playlistItemForm', require('./directives/PlaylistItemForm'));


angular.bootstrap(document, ['PlaylistTrackerEx']);
