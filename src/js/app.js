var _ = require('lodash');


// Define the Angular App
var dependencies = ['mui'];
var app = angular.module('PlaylistTrackerEx', dependencies);

// Define the Controllers
app.controller('PlaylistController', require('./PlaylistController'));

// Define the Services
app.service('PlaylistItemFormService', require('./services/PlaylistItemFormService'));
app.service('PlaylistService', require('./services/PlaylistService'));
app.service('URLParserService', require('./services/URLParserService'));
app.service('URLValidatorService', require('./services/URLValidatorService'));

// Define the Directives
app.directive('playlistItemForm', require('./directives/PlaylistItemForm'));


angular.bootstrap(document, ['PlaylistTrackerEx']);
