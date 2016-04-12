var _ = require('lodash');
var palettes = require('./palettes');


// Define the Angular App
var dependencies = ['ngMaterial'];
var app = angular.module('PlaylistTrackerEx', dependencies);

// Configuration
app.config(($mdThemingProvider) => {
	_.forOwn(palettes, (value, key) => {
		$mdThemingProvider.definePalette(key, value);
	});

	$mdThemingProvider.theme('default')
					  .primaryPalette('turquoise')
					  .accentPalette('cloudburst');
});

// Define the Controllers
app.controller('PlaylistController', require('./PlaylistController'));

// Define the Services
app.service('PlaylistService', require('./services/PlaylistService'));
app.service('PlaylistItemFormService', require('./services/PlaylistItemFormService'));

// Define the Directives
app.directive('playlistItemForm', require('./directives/PlaylistItemForm'));


angular.bootstrap(document, ['PlaylistTrackerEx']);
