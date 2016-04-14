(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var app = require('./app');

var PlaylistController = function () {
	function PlaylistController(PlaylistService, PlaylistItemFormService) {
		_classCallCheck(this, PlaylistController);

		this.selectedItem = null;
		this.visiblePlaylist = true;
		this.visibleSeriesForm = false;

		this.PlaylistService = PlaylistService;
		this.PlaylistItemFormService = PlaylistItemFormService;
	}

	_createClass(PlaylistController, [{
		key: 'addItem',
		value: function addItem() {
			this.PlaylistItemFormService.clear();
			this.displaySeriesForm();
		}
	}, {
		key: 'editItem',
		value: function editItem(item) {
			this.PlaylistItemFormService.setValues(item);
			this.displaySeriesForm();
		}
	}, {
		key: 'getListItems',
		value: function getListItems() {
			return this.PlaylistService.list();
		}
	}, {
		key: 'displayPlaylist',
		value: function displayPlaylist() {
			this.visiblePlaylist = true;
			this.visibleSeriesForm = false;
		}
	}, {
		key: 'displaySeriesForm',
		value: function displaySeriesForm() {
			this.visiblePlaylist = false;
			this.visibleSeriesForm = true;
		}
	}, {
		key: 'openNextURL',
		value: function openNextURL(item) {
			item.url = item.nextURL;
			this.PlaylistService.checkForUpdates(function () {
				chrome.tabs.create({ url: item.nextURL.stringify() });
			});
		}
	}]);

	return PlaylistController;
}();

PlaylistController.$inject = ['PlaylistService', 'PlaylistItemFormService'];

module.exports = PlaylistController;

},{"./app":2}],2:[function(require,module,exports){
'use strict';

var _ = require('lodash');

// Define the Angular App
var dependencies = ['mui'];
var app = angular.module('PlaylistTrackerEx', dependencies);

// Define the Controllers
app.controller('PlaylistController', require('./PlaylistController'));

// Define the Services
app.service('PlaylistItemFormService', require('./services/PlaylistItemFormService'));
app.service('PlaylistService', require('./services/PlaylistService'));
app.service('URLFactory', require('./services/URLFactory'));
app.service('URLValidatorService', require('./services/URLValidatorService'));

// Define the Directives
app.directive('playlistItemForm', require('./directives/PlaylistItemForm'));

angular.bootstrap(document, ['PlaylistTrackerEx']);

},{"./PlaylistController":1,"./directives/PlaylistItemForm":3,"./services/PlaylistItemFormService":6,"./services/PlaylistService":7,"./services/URLFactory":8,"./services/URLValidatorService":9,"lodash":undefined}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlaylistItemForm = function () {
	function PlaylistItemForm(PlaylistService, PlaylistItemFormService, URLFactory, URLValidatorService) {
		_classCallCheck(this, PlaylistItemForm);

		this.restrict = "E";
		this.templateUrl = "templates/playlist_item_form.html";
		this.scope = {};
		this.replace = true;
		this.link = this.link.bind(this);

		this.PlaylistService = PlaylistService;
		this.PlaylistItemFormService = PlaylistItemFormService;
		this.URLFactory = URLFactory;
		this.URLValidatorService = URLValidatorService;
	}

	_createClass(PlaylistItemForm, [{
		key: "setSeasonIndex",
		value: function setSeasonIndex(index) {
			if (this.$scope.selectedSeasonIndex == index) {
				this.$scope.selectedSeasonIndex = null;
				return;
			}
			this.$scope.selectedSeasonIndex = index;
			this.PlaylistItemFormService.data.seasonIndex = index;
		}
	}, {
		key: "setEpisodeIndex",
		value: function setEpisodeIndex(index) {
			if (this.$scope.selectedEpisodeIndex == index) {
				this.$scope.selectedEpisodeIndex = null;
				return;
			}
			this.$scope.selectedEpisodeIndex = index;
			this.PlaylistItemFormService.data.episodeIndex = index;
		}
	}, {
		key: "clear",
		value: function clear() {
			this.PlaylistItemFormService.clear();
		}
	}, {
		key: "save",
		value: function save() {
			var itemData = this.PlaylistItemFormService.getValues();
			this.PlaylistService.saveItem(itemData);
			this.clear();
		}
	}, {
		key: "link",
		value: function link($scope) {
			this.$scope = $scope;

			this.$scope.hasSeason = false;
			this.$scope.hasEpisode = false;
			this.$scope.selectedSeasonIndex = null;
			this.$scope.selectedEpisodeIndex = null;

			this.$scope.PlaylistItemFormService = this.PlaylistItemFormService;
			this.$scope.setSeasonIndex = this.setSeasonIndex.bind(this);
			this.$scope.setEpisodeIndex = this.setEpisodeIndex.bind(this);
			this.$scope.clear = this.clear.bind(this);
			this.$scope.save = this.save.bind(this);
		}
	}], [{
		key: "export",
		value: function _export(PlaylistService, PlaylistItemFormService, URLFactory, URLValidatorService) {
			return new PlaylistItemForm(PlaylistService, PlaylistItemFormService, URLFactory, URLValidatorService);
		}
	}]);

	return PlaylistItemForm;
}();

PlaylistItemForm.export.$inject = ['PlaylistService', 'PlaylistItemFormService', 'URLFactory', 'URLValidatorService'];

module.exports = PlaylistItemForm.export;

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');
var URL = require('./URL');

var PlaylistItem = function () {
	function PlaylistItem() {
		_classCallCheck(this, PlaylistItem);

		this.id = null;
		this.name = null;
		this.url = null;
		this.nextURL = null;
		this.seasonIndex = null;
		this.episodeIndex = null;

		this.hasOne = {
			url: URL,
			nextURL: URL
		};
	}

	_createClass(PlaylistItem, [{
		key: 'getSeason',
		value: function getSeason() {
			if (!this.seasonIndex) {
				return;
			}
			return this.url.components[this.seasonIndex];
		}
	}, {
		key: 'getEpisode',
		value: function getEpisode() {
			if (!this.episodeIndex) {
				return;
			}
			return this.url.components[this.episodeIndex];
		}
	}, {
		key: 'getUpdateOptions',
		value: function getUpdateOptions() {
			var updateURLComponents = [];
			if (this.episodeIndex) {
				var components = [].concat(_toConsumableArray(this.url.components));
				var currentEpisode = parseInt(this.getEpisode());
				components[this.episodeIndex] = currentEpisode + 1;
				updateURLComponents.push(components);
			}
			if (this.seasonIndex) {
				var _components = [].concat(_toConsumableArray(this.url.components));
				var currentSeason = parseInt(this.getSeason());
				_components[this.seasonIndex] = currentSeason + 1;
				_components[this.episodeIndex] = 1;
				updateURLComponents.push(_components);
			}
			return updateURLComponents;
		}
	}, {
		key: 'update',
		value: function update(data) {
			var _this = this;

			_.forOwn(data, function (value, key) {
				var dataValue = value;

				var relation = _this.hasOne[key];
				if (relation) {
					dataValue = relation.createFromDataArray(value);
				}
				if (_.has(_this, key)) {
					_.set(_this, key, dataValue);
				}
			});
		}
	}], [{
		key: 'createFromDataArray',
		value: function createFromDataArray(data) {
			var item = new PlaylistItem();
			item.update(data);

			return item;
		}
	}]);

	return PlaylistItem;
}();

module.exports = PlaylistItem;

},{"./URL":5,"lodash":undefined}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');

var URL = function () {
	function URL() {
		_classCallCheck(this, URL);

		this.components = [];
		this.matches = [];
	}

	_createClass(URL, [{
		key: 'addComponent',
		value: function addComponent(component) {
			this.components.push(component);
		}
	}, {
		key: 'addMatch',
		value: function addMatch(component) {
			this.matches.push(component);
		}
	}, {
		key: 'isMatch',
		value: function isMatch(component) {
			return _.includes(this.matches, component);
		}
	}, {
		key: 'stringify',
		value: function stringify() {
			return _.join(this.components, '');
		}
	}, {
		key: 'update',
		value: function update(data) {
			var _this = this;

			_.forOwn(data, function (value, key) {
				var dataValue = value;

				if (_.has(_this, key)) {
					_.set(_this, key, dataValue);
				}
			});
		}
	}], [{
		key: 'createFromDataArray',
		value: function createFromDataArray(data) {
			var item = new URL();
			item.update(data);
			return item;
		}
	}]);

	return URL;
}();

module.exports = URL;

},{"lodash":undefined}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');

var PlaylistItemFormService = function () {
	function PlaylistItemFormService(URLFactory) {
		_classCallCheck(this, PlaylistItemFormService);

		this.data = {};
		this.URLFactory = URLFactory;
	}

	_createClass(PlaylistItemFormService, [{
		key: 'createURL',
		value: function createURL(urlString) {
			if (!urlString || urlString.length == 0) {
				return;
			}
			this.data.url = this.URLFactory.createFromString(urlString);
		}
	}, {
		key: 'getValues',
		value: function getValues() {
			return this.data;
		}
	}, {
		key: 'setValues',
		value: function setValues(item) {
			var _this = this;

			this.reset();
			_.forOwn(item, function (value, key) {
				_.set(_this.data, key, value);
			});
		}
	}, {
		key: 'clear',
		value: function clear() {
			this.data = {
				id: this.id
			};
		}
	}, {
		key: 'reset',
		value: function reset() {
			this.data = {};
		}
	}]);

	return PlaylistItemFormService;
}();

PlaylistItemFormService.$inject = ['URLFactory'];

module.exports = PlaylistItemFormService;

},{"lodash":undefined}],7:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');
var PlaylistItem = require('./../models/PlaylistItem');

var PlaylistService = function () {
	function PlaylistService($q, $rootScope, URLFactory, URLValidatorService) {
		_classCallCheck(this, PlaylistService);

		this.uid = 1;
		this.items = [];
		this.load();

		this.$q = $q;
		this.$rootScope = $rootScope;
		this.URLFactory = URLFactory;
		this.URLValidatorService = URLValidatorService;
	}

	_createClass(PlaylistService, [{
		key: 'createFromDataArray',
		value: function createFromDataArray(data) {
			var _this = this;

			_.forEach(data, function (itemData) {
				_this.items.push(PlaylistItem.createFromDataArray(itemData));
				_this.checkForUpdates();
			});
		}
	}, {
		key: 'load',
		value: function load() {
			var _this2 = this;

			try {
				chrome.storage.sync.get('playlist', function (storage) {
					if (!storage['playlist']) {
						return;
					}
					_this2.$rootScope.$apply(function () {
						_this2.createFromDataArray(JSON.parse(storage['playlist']));
					});
				});
			} catch (e) {
				console.log("Failed loading data.", e);
			}
		}
	}, {
		key: 'save',
		value: function save() {
			chrome.storage.sync.set({ playlist: JSON.stringify(this.items) }, function () {});
		}
	}, {
		key: 'saveItem',
		value: function saveItem(itemData) {
			if (itemData.id) {
				var _item = this.getItem(itemData.id);
				_item.update(itemData);
				return;
			}
			var item = new PlaylistItem();
			itemData.id = this.uid++;
			item.update(itemData);
			this.items.push(item);
			this.save();
		}
	}, {
		key: 'getItem',
		value: function getItem(id) {
			return _.find(this.items, { id: id });
		}
	}, {
		key: 'deleteItem',
		value: function deleteItem(id) {
			_.remove(this.items, { id: id });
			this.save();
		}
	}, {
		key: 'checkForUpdates',
		value: function checkForUpdates(callback) {
			var _this3 = this;

			_.forEach(this.items, function (item) {
				var updateOptions = item.getUpdateOptions();
				var promises = [];

				_.forEach(updateOptions, function (components) {
					var url = _this3.URLFactory.createFromComponents(components);
					promises.push(_this3.URLValidatorService.isValid(url.stringify()));
				});

				_this3.$q.all(promises).then(function (values) {
					var results = _.zip(values, updateOptions);
					_.each(results, function (result) {
						if (result[0]) {
							var url = _this3.URLFactory.createFromComponents(result[1]);
							item.nextURL = url;
							return false;
						}
						item.nextURL = null;
					});
					_this3.save();
					if (callback) {
						callback();
					}
				});
			});
		}
	}, {
		key: 'list',
		value: function list() {
			return this.items;
		}
	}]);

	return PlaylistService;
}();

PlaylistService.$inject = ['$q', '$rootScope', 'URLFactory', 'URLValidatorService'];

module.exports = PlaylistService;

},{"./../models/PlaylistItem":4,"lodash":undefined}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');
var URL = require('./../models/URL');

var URLFactory = function () {
	function URLFactory() {
		_classCallCheck(this, URLFactory);
	}

	_createClass(URLFactory, [{
		key: 'createFromString',
		value: function createFromString(string) {
			var regex = /(.+?)(\d+)/g;
			var url = new URL();

			var pieces = void 0;
			var lastIndex = 0;
			while ((pieces = regex.exec(string)) !== null) {
				var parsed = pieces[0];
				var component = pieces[1];
				var match = pieces[2];
				lastIndex = pieces['index'] + parsed.length;

				url.addComponent(component);
				url.addComponent(match);
				url.addMatch(match);
			}
			if (string.length == 1 || lastIndex < string.length - 1) {
				var remain = string.substring(lastIndex, string.length);
				url.addComponent(remain);
			}
			return url;
		}
	}, {
		key: 'createFromComponents',
		value: function createFromComponents(components) {
			var url = new URL();
			_.forEach(components, function (component) {
				if (component) {
					url.addComponent(component);
				}
			});
			return url;
		}
	}]);

	return URLFactory;
}();

module.exports = URLFactory;

},{"./../models/URL":5,"lodash":undefined}],9:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URLValidatorService = function () {
	function URLValidatorService($http) {
		_classCallCheck(this, URLValidatorService);

		this.$http = $http;
	}

	_createClass(URLValidatorService, [{
		key: 'isValid',
		value: function isValid(url) {
			return this.$http.get(url).then(function (res) {
				return true;
			}).catch(function (e) {
				return false;
			});
		}
	}]);

	return URLValidatorService;
}();

URLValidatorService.$inject = ['$http'];

module.exports = URLValidatorService;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzXFxQbGF5bGlzdENvbnRyb2xsZXIuanMiLCJzcmNcXGpzXFxhcHAuanMiLCJzcmNcXGpzXFxkaXJlY3RpdmVzXFxQbGF5bGlzdEl0ZW1Gb3JtLmpzIiwic3JjXFxqc1xcbW9kZWxzXFxQbGF5bGlzdEl0ZW0uanMiLCJzcmNcXGpzXFxtb2RlbHNcXFVSTC5qcyIsInNyY1xcanNcXHNlcnZpY2VzXFxQbGF5bGlzdEl0ZW1Gb3JtU2VydmljZS5qcyIsInNyY1xcanNcXHNlcnZpY2VzXFxQbGF5bGlzdFNlcnZpY2UuanMiLCJzcmNcXGpzXFxzZXJ2aWNlc1xcVVJMRmFjdG9yeS5qcyIsInNyY1xcanNcXHNlcnZpY2VzXFxVUkxWYWxpZGF0b3JTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUEsSUFBSSxNQUFNLFFBQVEsT0FBUixDQUFOOztJQUdFO0FBQ0wsVUFESyxrQkFDTCxDQUNDLGVBREQsRUFFQyx1QkFGRCxFQUdFO3dCQUpHLG9CQUlIOztBQUNELE9BQUssWUFBTCxHQUFvQixJQUFwQixDQURDO0FBRUQsT0FBSyxlQUFMLEdBQXVCLElBQXZCLENBRkM7QUFHRCxPQUFLLGlCQUFMLEdBQXlCLEtBQXpCLENBSEM7O0FBS0QsT0FBSyxlQUFMLEdBQXVCLGVBQXZCLENBTEM7QUFNRCxPQUFLLHVCQUFMLEdBQStCLHVCQUEvQixDQU5DO0VBSEY7O2NBREs7OzRCQVlLO0FBQ1QsUUFBSyx1QkFBTCxDQUE2QixLQUE3QixHQURTO0FBRVQsUUFBSyxpQkFBTCxHQUZTOzs7OzJCQUlELE1BQU07QUFDZCxRQUFLLHVCQUFMLENBQTZCLFNBQTdCLENBQXVDLElBQXZDLEVBRGM7QUFFZCxRQUFLLGlCQUFMLEdBRmM7Ozs7aUNBSUE7QUFDZCxVQUFPLEtBQUssZUFBTCxDQUFxQixJQUFyQixFQUFQLENB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RCxRQUFJLFlBQUosQ0FBaUIsTUFBakIsRUFGd0Q7SUFBekQ7QUFJQSxVQUFPLEdBQVAsQ0FwQndCOzs7O3VDQXNCSixZQUFZO0FBQ2hDLE9BQU0sTUFBTSxJQUFJLEdBQUosRUFBTixDQUQwQjtBQUVoQyxLQUFFLE9BQUYsQ0FBVSxVQUFWLEVBQXNCLFVBQUMsU0FBRCxFQUFlO0FBQ3BDLFFBQUksU0FBSixFQUFlO0FBQ2QsU0FBSSxZQUFKLENBQWlCLFNBQWpCLEVBRGM7S0FBZjtJQURxQixDQUF0QixDQUZnQztBQU9oQyxVQUFPLEdBQVAsQ0FQZ0M7Ozs7UUF2QjVCOzs7QUFrQ04sT0FBTyxPQUFQLEdBQWlCLFVBQWpCOzs7Ozs7Ozs7SUN0Q007QUFDTCxVQURLLG1CQUNMLENBQVksS0FBWixFQUFtQjt3QkFEZCxxQkFDYzs7QUFDbEIsT0FBSyxLQUFMLEdBQWEsS0FBYixDQURrQjtFQUFuQjs7Y0FESzs7MEJBSUcsS0FBSztBQUNaLFVBQU8sS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEdBQWYsRUFDRCxJQURDLENBQ0ksVUFBQyxHQUFEO1dBQVM7SUFBVCxDQURKLENBRUQsS0FGQyxDQUVLLFVBQUMsQ0FBRCxFQUFPO0FBQ2QsV0FBTyxLQUFQLENBRGM7SUFBUCxDQUZaLENBRFk7Ozs7UUFKUjs7O0FBWU4sb0JBQW9CLE9BQXBCLEdBQThCLENBQUMsT0FBRCxDQUE5Qjs7QUFHQSxPQUFPLE9BQVAsR0FBaUIsbUJBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBhcHAgPSByZXF1aXJlKCcuL2FwcCcpO1xyXG5cclxuXHJcbmNsYXNzIFBsYXlsaXN0Q29udHJvbGxlciB7XHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRQbGF5bGlzdFNlcnZpY2UsXHJcblx0XHRQbGF5bGlzdEl0ZW1Gb3JtU2VydmljZVxyXG5cdCkge1xyXG5cdFx0dGhpcy5zZWxlY3RlZEl0ZW0gPSBudWxsO1xyXG5cdFx0dGhpcy52aXNpYmxlUGxheWxpc3QgPSB0cnVlO1xyXG5cdFx0dGhpcy52aXNpYmxlU2VyaWVzRm9ybSA9IGZhbHNlO1xyXG5cclxuXHRcdHRoaXMuUGxheWxpc3RTZXJ2aWNlID0gUGxheWxpc3RTZXJ2aWNlO1xyXG5cdFx0dGhpcy5QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZSA9IFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlO1xyXG5cdH1cclxuXHRhZGRJdGVtKCkge1xyXG5cdFx0dGhpcy5QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZS5jbGVhcigpO1xyXG5cdFx0dGhpcy5kaXNwbGF5U2VyaWVzRm9ybSgpO1xyXG5cdH1cclxuXHRlZGl0SXRlbShpdGVtKSB7XHJcblx0XHR0aGlzLlBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLnNldFZhbHVlcyhpdGVtKTtcclxuXHRcdHRoaXMuZGlzcGxheVNlcmllc0Zvcm0oKTtcclxuXHR9XHJcblx0Z2V0TGlzdEl0ZW1zKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuUGxheWxpc3RTZXJ2aWNlLmxpc3QoKTtcclxuXHR9XHJcblx0ZGlzcGxheVBsYXlsaXN0KCkge1xyXG5cdFx0dGhpcy52aXNpYmxlUGxheWxpc3QgPSB0cnVlO1xyXG5cdFx0dGhpcy52aXNpYmxlU2VyaWVzRm9ybSA9IGZhbHNlO1xyXG5cdH1cclxuXHRkaXNwbGF5U2VyaWVzRm9ybSgpIHtcclxuXHRcdHRoaXMudmlzaWJsZVBsYXlsaXN0ID0gZmFsc2U7XHJcblx0XHR0aGlzLnZpc2libGVTZXJpZXNGb3JtID0gdHJ1ZTtcclxuXHR9XHJcblx0b3Blbk5leHRVUkwoaXRlbSkge1xyXG5cdFx0aXRlbS51cmwgPSBpdGVtLm5leHRVUkw7XHJcblx0XHR0aGlzLlBsYXlsaXN0U2VydmljZS5jaGVja0ZvclVwZGF0ZXMoKCkgPT4ge1xyXG5cdFx0XHRjaHJvbWUudGFicy5jcmVhdGUoeyB1cmw6IGl0ZW0ubmV4dFVSTC5zdHJpbmdpZnkoKSB9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuUGxheWxpc3RDb250cm9sbGVyLiRpbmplY3QgPSBbXHJcblx0J1BsYXlsaXN0U2VydmljZScsXHJcblx0J1BsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlJyxcclxuXTtcclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5bGlzdENvbnRyb2xsZXI7XHJcbiIsInZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcblxyXG5cclxuLy8gRGVmaW5lIHRoZSBBbmd1bGFyIEFwcFxyXG52YXIgZGVwZW5kZW5jaWVzID0gWydtdWknXTtcclxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdQbGF5bGlzdFRyYWNrZXJFeCcsIGRlcGVuZGVuY2llcyk7XHJcblxyXG4vLyBEZWZpbmUgdGhlIENvbnRyb2xsZXJzXHJcbmFwcC5jb250cm9sbGVyKCdQbGF5bGlzdENvbnRyb2xsZXInLCByZXF1aXJlKCcuL1BsYXlsaXN0Q29udHJvbGxlcicpKTtcclxuXHJcbi8vIERlZmluZSB0aGUgU2VydmljZXNcclxuYXBwLnNlcnZpY2UoJ1BsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZScpKTtcclxuYXBwLnNlcnZpY2UoJ1BsYXlsaXN0U2VydmljZScsIHJlcXVpcmUoJy4vc2VydmljZXMvUGxheWxpc3RTZXJ2aWNlJykpO1xyXG5hcHAuc2VydmljZSgnVVJMRmFjdG9yeScsIHJlcXVpcmUoJy4vc2VydmljZXMvVVJMRmFjdG9yeScpKTtcclxuYXBwLnNlcnZpY2UoJ1VSTFZhbGlkYXRvclNlcnZpY2UnLCByZXF1aXJlKCcuL3NlcnZpY2VzL1VSTFZhbGlkYXRvclNlcnZpY2UnKSk7XHJcblxyXG4vLyBEZWZpbmUgdGhlIERpcmVjdGl2ZXNcclxuYXBwLmRpcmVjdGl2ZSgncGxheWxpc3RJdGVtRm9ybScsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9QbGF5bGlzdEl0ZW1Gb3JtJykpO1xyXG5cclxuXHJcbmFuZ3VsYXIuYm9vdHN0cmFwKGRvY3VtZW50LCBbJ1BsYXlsaXN0VHJhY2tlckV4J10pO1xyXG4iLCJjbGFzcyBQbGF5bGlzdEl0ZW1Gb3JtIHtcclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdFBsYXlsaXN0U2VydmljZSxcclxuXHRcdFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLFxyXG5cdFx0VVJMRmFjdG9yeSxcclxuXHRcdFVSTFZhbGlkYXRvclNlcnZpY2VcclxuXHQpIHtcclxuXHRcdHRoaXMucmVzdHJpY3QgPSBcIkVcIjtcclxuXHRcdHRoaXMudGVtcGxhdGVVcmwgPSBcInRlbXBsYXRlcy9wbGF5bGlzdF9pdGVtX2Zvcm0uaHRtbFwiO1xyXG5cdFx0dGhpcy5zY29wZSA9IHt9O1xyXG5cdFx0dGhpcy5yZXBsYWNlID0gdHJ1ZTtcclxuXHRcdHRoaXMubGluayA9IHRoaXMubGluay5iaW5kKHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuUGxheWxpc3RTZXJ2aWNlID0gUGxheWxpc3RTZXJ2aWNlO1xyXG5cdFx0dGhpcy5QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZSA9IFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlO1xyXG5cdFx0dGhpcy5VUkxGYWN0b3J5ID0gVVJMRmFjdG9yeTtcclxuXHRcdHRoaXMuVVJMVmFsaWRhdG9yU2VydmljZSA9IFVSTFZhbGlkYXRvclNlcnZpY2U7XHJcblx0fVxyXG5cdHNldFNlYXNvbkluZGV4KGluZGV4KSB7XHJcblx0XHRpZiAodGhpcy4kc2NvcGUuc2VsZWN0ZWRTZWFzb25JbmRleCA9PSBpbmRleCkge1xyXG5cdFx0XHR0aGlzLiRzY29wZS5zZWxlY3RlZFNlYXNvbkluZGV4ID0gbnVsbDtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy4kc2NvcGUuc2VsZWN0ZWRTZWFzb25JbmRleCA9IGluZGV4O1xyXG5cdFx0dGhpcy5QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZS5kYXRhLnNlYXNvbkluZGV4ID0gaW5kZXg7XHJcblx0fVxyXG5cdHNldEVwaXNvZGVJbmRleChpbmRleCkge1xyXG5cdFx0aWYgKHRoaXMuJHNjb3BlLnNlbGVjdGVkRXBpc29kZUluZGV4ID09IGluZGV4KSB7XHJcblx0XHRcdHRoaXMuJHNjb3BlLnNlbGVjdGVkRXBpc29kZUluZGV4ID0gbnVsbDtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy4kc2NvcGUuc2VsZWN0ZWRFcGlzb2RlSW5kZXggPSBpbmRleDtcclxuXHRcdHRoaXMuUGxheWxpc3RJdGVtRm9ybVNlcnZpY2UuZGF0YS5lcGlzb2RlSW5kZXggPSBpbmRleDtcclxuXHR9XHJcblx0Y2xlYXIoKSB7XHJcblx0XHR0aGlzLlBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLmNsZWFyKCk7XHJcblx0fVxyXG5cdHNhdmUoKSB7XHJcblx0XHRjb25zdCBpdGVtRGF0YSA9IHRoaXMuUGxheWxpc3RJdGVtRm9ybVNlcnZpY2UuZ2V0VmFsdWVzKCk7XHJcblx0XHR0aGlzLlBsYXlsaXN0U2VydmljZS5zYXZlSXRlbShpdGVtRGF0YSk7XHJcblx0XHR0aGlzLmNsZWFyKCk7XHJcblx0fVxyXG5cdGxpbmsoJHNjb3BlKSB7XHJcblx0XHR0aGlzLiRzY29wZSA9ICRzY29wZTtcclxuXHJcblx0XHR0aGlzLiRzY29wZS5oYXNTZWFzb24gPSBmYWxzZTtcclxuXHRcdHRoaXMuJHNjb3BlLmhhc0VwaXNvZGUgPSBmYWxzZTtcclxuXHRcdHRoaXMuJHNjb3BlLnNlbGVjdGVkU2Vhc29uSW5kZXggPSBudWxsO1xyXG5cdFx0dGhpcy4kc2NvcGUuc2VsZWN0ZWRFcGlzb2RlSW5kZXggPSBudWxsO1xyXG5cclxuXHRcdHRoaXMuJHNjb3BlLlBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlID0gdGhpcy5QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZTtcclxuXHRcdHRoaXMuJHNjb3BlLnNldFNlYXNvbkluZGV4ID0gdGhpcy5zZXRTZWFzb25JbmRleC5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy4kc2NvcGUuc2V0RXBpc29kZUluZGV4ID0gdGhpcy5zZXRFcGlzb2RlSW5kZXguYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuJHNjb3BlLmNsZWFyID0gdGhpcy5jbGVhci5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy4kc2NvcGUuc2F2ZSA9IHRoaXMuc2F2ZS5iaW5kKHRoaXMpO1xyXG5cdH1cclxuXHRzdGF0aWMgZXhwb3J0KFxyXG5cdFx0UGxheWxpc3RTZXJ2aWNlLFxyXG5cdFx0UGxheWxpc3RJdGVtRm9ybVNlcnZpY2UsXHJcblx0XHRVUkxGYWN0b3J5LFxyXG5cdFx0VVJMVmFsaWRhdG9yU2VydmljZVxyXG5cdCkge1xyXG5cdFx0cmV0dXJuIG5ldyBQbGF5bGlzdEl0ZW1Gb3JtKFxyXG5cdFx0XHRQbGF5bGlzdFNlcnZpY2UsXHJcblx0XHRcdFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLFxyXG5cdFx0XHRVUkxGYWN0b3J5LFxyXG5cdFx0XHRVUkxWYWxpZGF0b3JTZXJ2aWNlXHJcblx0XHQpO1xyXG5cdH1cclxufVxyXG5QbGF5bGlzdEl0ZW1Gb3JtLmV4cG9ydC4kaW5qZWN0ID0gW1xyXG5cdCdQbGF5bGlzdFNlcnZpY2UnLFxyXG5cdCdQbGF5bGlzdEl0ZW1Gb3JtU2VydmljZScsXHJcblx0J1VSTEZhY3RvcnknLFxyXG5cdCdVUkxWYWxpZGF0b3JTZXJ2aWNlJyxcclxuXTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGxheWxpc3RJdGVtRm9ybS5leHBvcnQ7XHJcbiIsInZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcbnZhciBVUkwgPSByZXF1aXJlKCcuL1VSTCcpO1xyXG5cclxuXHJcbmNsYXNzIFBsYXlsaXN0SXRlbSB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLmlkID0gbnVsbDtcclxuXHRcdHRoaXMubmFtZSA9IG51bGw7XHJcblx0XHR0aGlzLnVybCA9IG51bGw7XHJcblx0XHR0aGlzLm5leHRVUkwgPSBudWxsO1xyXG5cdFx0dGhpcy5zZWFzb25JbmRleCA9IG51bGw7XHJcblx0XHR0aGlzLmVwaXNvZGVJbmRleCA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy5oYXNPbmUgPSB7XHJcblx0XHRcdHVybDogVVJMLFxyXG5cdFx0XHRuZXh0VVJMOiBVUkwsXHJcblx0XHR9O1xyXG5cdH1cclxuXHRnZXRTZWFzb24oKSB7XHJcblx0XHRpZiAoIXRoaXMuc2Vhc29uSW5kZXgpIHtcclxuXHRcdFx0IHJldHVybjtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLnVybC5jb21wb25lbnRzW3RoaXMuc2Vhc29uSW5kZXhdO1xyXG5cdH1cclxuXHRnZXRFcGlzb2RlKCkge1xyXG5cdFx0aWYgKCF0aGlzLmVwaXNvZGVJbmRleCkge1xyXG5cdFx0XHQgcmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMudXJsLmNvbXBvbmVudHNbdGhpcy5lcGlzb2RlSW5kZXhdO1xyXG5cdH1cclxuXHRnZXRVcGRhdGVPcHRpb25zKCkge1xyXG5cdFx0Y29uc3QgdXBkYXRlVVJMQ29tcG9uZW50cyA9IFtdO1xyXG5cdFx0aWYgKHRoaXMuZXBpc29kZUluZGV4KSB7XHJcblx0XHRcdGNvbnN0IGNvbXBvbmVudHMgPSBbLi4udGhpcy51cmwuY29tcG9uZW50c107XHJcblx0XHRcdGNvbnN0IGN1cnJlbnRFcGlzb2RlID0gcGFyc2VJbnQodGhpcy5nZXRFcGlzb2RlKCkpO1xyXG5cdFx0XHRjb21wb25lbnRzW3RoaXMuZXBpc29kZUluZGV4XSA9IGN1cnJlbnRFcGlzb2RlICsgMTtcclxuXHRcdFx0dXBkYXRlVVJMQ29tcG9uZW50cy5wdXNoKGNvbXBvbmVudHMpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuc2Vhc29uSW5kZXgpIHtcclxuXHRcdFx0Y29uc3QgY29tcG9uZW50cyA9IFsuLi50aGlzLnVybC5jb21wb25lbnRzXTtcclxuXHRcdFx0Y29uc3QgY3VycmVudFNlYXNvbiA9IHBhcnNlSW50KHRoaXMuZ2V0U2Vhc29uKCkpO1xyXG5cdFx0XHRjb21wb25lbnRzW3RoaXMuc2Vhc29uSW5kZXhdID0gY3VycmVudFNlYXNvbiArIDE7XHJcblx0XHRcdGNvbXBvbmVudHNbdGhpcy5lcGlzb2RlSW5kZXhdID0gMTtcclxuXHRcdFx0dXBkYXRlVVJMQ29tcG9uZW50cy5wdXNoKGNvbXBvbmVudHMpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHVwZGF0ZVVSTENvbXBvbmVudHM7XHJcblx0fVxyXG5cdHVwZGF0ZShkYXRhKSB7XHJcblx0XHRfLmZvck93bihkYXRhLCAodmFsdWUsIGtleSkgPT4ge1xyXG5cdFx0XHRsZXQgZGF0YVZhbHVlID0gdmFsdWU7XHJcblxyXG5cdFx0XHRjb25zdCByZWxhdGlvbiA9IHRoaXMuaGFzT25lW2tleV07XHJcblx0XHRcdGlmIChyZWxhdGlvbikge1xyXG5cdFx0XHRcdGRhdGFWYWx1ZSA9IHJlbGF0aW9uLmNyZWF0ZUZyb21EYXRhQXJyYXkodmFsdWUpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChfLmhhcyh0aGlzLCBrZXkpKSB7XHJcblx0XHRcdFx0Xy5zZXQodGhpcywga2V5LCBkYXRhVmFsdWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblx0c3RhdGljIGNyZWF0ZUZyb21EYXRhQXJyYXkoZGF0YSkge1xyXG5cdFx0Y29uc3QgaXRlbSA9IG5ldyBQbGF5bGlzdEl0ZW0oKTtcclxuXHRcdGl0ZW0udXBkYXRlKGRhdGEpO1xyXG5cclxuXHRcdHJldHVybiBpdGVtO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5bGlzdEl0ZW07XHJcbiIsInZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcblxyXG5cclxuY2xhc3MgVVJMIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMuY29tcG9uZW50cyA9IFtdO1xyXG5cdFx0dGhpcy5tYXRjaGVzID0gW107XHJcblx0fVxyXG5cdGFkZENvbXBvbmVudChjb21wb25lbnQpIHtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XHJcblx0fVxyXG5cdGFkZE1hdGNoKGNvbXBvbmVudCkge1xyXG5cdFx0dGhpcy5tYXRjaGVzLnB1c2goY29tcG9uZW50KTtcclxuXHR9XHJcblx0aXNNYXRjaChjb21wb25lbnQpIHtcclxuXHRcdHJldHVybiBfLmluY2x1ZGVzKHRoaXMubWF0Y2hlcywgY29tcG9uZW50KTtcclxuXHR9XHJcblx0c3RyaW5naWZ5KCkge1xyXG5cdFx0cmV0dXJuIF8uam9pbih0aGlzLmNvbXBvbmVudHMsICcnKTtcclxuXHR9XHJcblx0dXBkYXRlKGRhdGEpIHtcclxuXHRcdF8uZm9yT3duKGRhdGEsICh2YWx1ZSwga2V5KSA9PiB7XHJcblx0XHRcdGxldCBkYXRhVmFsdWUgPSB2YWx1ZTtcclxuXHJcblx0XHRcdGlmIChfLmhhcyh0aGlzLCBrZXkpKSB7XHJcblx0XHRcdFx0Xy5zZXQodGhpcywga2V5LCBkYXRhVmFsdWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblx0c3RhdGljIGNyZWF0ZUZyb21EYXRhQXJyYXkoZGF0YSkge1xyXG5cdFx0Y29uc3QgaXRlbSA9IG5ldyBVUkwoKTtcclxuXHRcdGl0ZW0udXBkYXRlKGRhdGEpO1xyXG5cdFx0cmV0dXJuIGl0ZW07XHJcblx0fVxyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBVUkw7XHJcbiIsInZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcblxyXG5cclxuY2xhc3MgUGxheWxpc3RJdGVtRm9ybVNlcnZpY2Uge1xyXG5cdGNvbnN0cnVjdG9yKFVSTEZhY3RvcnkpIHtcclxuXHRcdHRoaXMuZGF0YSA9IHt9O1xyXG5cdFx0dGhpcy5VUkxGYWN0b3J5ID0gVVJMRmFjdG9yeTtcclxuXHR9XHJcblx0Y3JlYXRlVVJMKHVybFN0cmluZykge1xyXG5cdFx0aWYgKCF1cmxTdHJpbmcgfHwgdXJsU3RyaW5nLmxlbmd0aCA9PSAwKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHRoaXMuZGF0YS51cmwgPSB0aGlzLlVSTEZhY3RvcnkuY3JlYXRlRnJvbVN0cmluZyh1cmxTdHJpbmcpO1xyXG5cdH1cclxuXHRnZXRWYWx1ZXMoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYXRhO1xyXG5cdH1cclxuXHRzZXRWYWx1ZXMoaXRlbSkge1xyXG5cdFx0dGhpcy5yZXNldCgpO1xyXG5cdFx0Xy5mb3JPd24oaXRlbSwgKHZhbHVlLCBrZXkpID0+IHtcclxuXHRcdFx0Xy5zZXQodGhpcy5kYXRhLCBrZXksIHZhbHVlKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHRjbGVhcigpIHtcclxuXHRcdHRoaXMuZGF0YSA9IHtcclxuXHRcdFx0aWQ6IHRoaXMuaWQsXHJcblx0XHR9O1xyXG5cdH1cclxuXHRyZXNldCgpIHtcclxuXHRcdHRoaXMuZGF0YSA9IHt9O1xyXG5cdH1cclxufVxyXG5QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZS4kaW5qZWN0ID0gWydVUkxGYWN0b3J5J107XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5bGlzdEl0ZW1Gb3JtU2VydmljZTtcclxuIiwidmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxudmFyIFBsYXlsaXN0SXRlbSA9IHJlcXVpcmUoJy4vLi4vbW9kZWxzL1BsYXlsaXN0SXRlbScpO1xyXG5cclxuXHJcbmNsYXNzIFBsYXlsaXN0U2VydmljZSB7XHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHQkcSxcclxuXHRcdCRyb290U2NvcGUsXHJcblx0XHRVUkxGYWN0b3J5LFxyXG5cdFx0VVJMVmFsaWRhdG9yU2VydmljZVxyXG5cdCkge1xyXG5cdFx0dGhpcy51aWQgPSAxO1xyXG5cdFx0dGhpcy5pdGVtcyA9IFtdO1xyXG5cdFx0dGhpcy5sb2FkKCk7XHJcblxyXG5cdFx0dGhpcy4kcSA9ICRxO1xyXG5cdFx0dGhpcy4kcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuXHRcdHRoaXMuVVJMRmFjdG9yeSA9IFVSTEZhY3Rvcnk7XHJcblx0XHR0aGlzLlVSTFZhbGlkYXRvclNlcnZpY2UgPSBVUkxWYWxpZGF0b3JTZXJ2aWNlO1xyXG5cdH1cclxuXHRjcmVhdGVGcm9tRGF0YUFycmF5KGRhdGEpIHtcclxuXHRcdF8uZm9yRWFjaChkYXRhLCAoaXRlbURhdGEpID0+IHtcclxuXHRcdFx0dGhpcy5pdGVtcy5wdXNoKFBsYXlsaXN0SXRlbS5jcmVhdGVGcm9tRGF0YUFycmF5KGl0ZW1EYXRhKSk7XHJcblx0XHRcdHRoaXMuY2hlY2tGb3JVcGRhdGVzKCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblx0bG9hZCgpIHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KCdwbGF5bGlzdCcsIChzdG9yYWdlKSA9PiB7XHJcblx0XHRcdFx0aWYgKCFzdG9yYWdlWydwbGF5bGlzdCddKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuJHJvb3RTY29wZS4kYXBwbHkoKCkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5jcmVhdGVGcm9tRGF0YUFycmF5KEpTT04ucGFyc2Uoc3RvcmFnZVsncGxheWxpc3QnXSkpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gY2F0Y2goZSkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIkZhaWxlZCBsb2FkaW5nIGRhdGEuXCIsIGUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzYXZlKCkge1xyXG5cdFx0Y2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe3BsYXlsaXN0OiBKU09OLnN0cmluZ2lmeSh0aGlzLml0ZW1zKX0sICgpID0+IHt9KTtcclxuXHR9XHJcblx0c2F2ZUl0ZW0oaXRlbURhdGEpIHtcclxuXHRcdGlmIChpdGVtRGF0YS5pZCkge1xyXG5cdFx0XHRjb25zdCBpdGVtID0gdGhpcy5nZXRJdGVtKGl0ZW1EYXRhLmlkKTtcclxuXHRcdFx0aXRlbS51cGRhdGUoaXRlbURhdGEpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRjb25zdCBpdGVtID0gbmV3IFBsYXlsaXN0SXRlbSgpO1xyXG5cdFx0aXRlbURhdGEuaWQgPSB0aGlzLnVpZCsrO1xyXG5cdFx0aXRlbS51cGRhdGUoaXRlbURhdGEpO1xyXG5cdFx0dGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xyXG5cdFx0dGhpcy5zYXZlKCk7XHJcblx0fVxyXG5cdGdldEl0ZW0oaWQpIHtcclxuXHRcdHJldHVybiBfLmZpbmQodGhpcy5pdGVtcywge2lkOiBpZH0pO1xyXG5cdH1cclxuXHRkZWxldGVJdGVtKGlkKSB7XHJcblx0XHRfLnJlbW92ZSh0aGlzLml0ZW1zLCB7aWQ6IGlkfSk7XHJcblx0XHR0aGlzLnNhdmUoKTtcclxuXHR9XHJcblx0Y2hlY2tGb3JVcGRhdGVzKGNhbGxiYWNrKSB7XHJcblx0XHRfLmZvckVhY2godGhpcy5pdGVtcywgKGl0ZW0pID0+IHtcclxuXHRcdFx0Y29uc3QgdXBkYXRlT3B0aW9ucyA9IGl0ZW0uZ2V0VXBkYXRlT3B0aW9ucygpO1xyXG5cdFx0XHRjb25zdCBwcm9taXNlcyA9IFtdO1xyXG5cclxuXHRcdFx0Xy5mb3JFYWNoKHVwZGF0ZU9wdGlvbnMsIChjb21wb25lbnRzKSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgdXJsID0gdGhpcy5VUkxGYWN0b3J5LmNyZWF0ZUZyb21Db21wb25lbnRzKGNvbXBvbmVudHMpO1xyXG5cdFx0XHRcdHByb21pc2VzLnB1c2godGhpcy5VUkxWYWxpZGF0b3JTZXJ2aWNlLmlzVmFsaWQodXJsLnN0cmluZ2lmeSgpKSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dGhpcy4kcS5hbGwocHJvbWlzZXMpLnRoZW4oKHZhbHVlcykgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IHJlc3VsdHMgPSBfLnppcCh2YWx1ZXMsIHVwZGF0ZU9wdGlvbnMpO1xyXG5cdFx0XHRcdF8uZWFjaChyZXN1bHRzLCAocmVzdWx0KSA9PiB7XHJcblx0XHRcdFx0XHRpZiAocmVzdWx0WzBdKSB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IHVybCA9IHRoaXMuVVJMRmFjdG9yeS5jcmVhdGVGcm9tQ29tcG9uZW50cyhyZXN1bHRbMV0pO1xyXG5cdFx0XHRcdFx0XHRpdGVtLm5leHRVUkwgPSB1cmw7XHJcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGl0ZW0ubmV4dFVSTCA9IG51bGw7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0dGhpcy5zYXZlKCk7XHJcblx0XHRcdFx0aWYgKGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHRjYWxsYmFjaygpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblx0bGlzdCgpIHtcclxuXHRcdHJldHVybiB0aGlzLml0ZW1zO1xyXG5cdH1cclxufVxyXG5QbGF5bGlzdFNlcnZpY2UuJGluamVjdCA9IFtcclxuXHQnJHEnLFxyXG5cdCckcm9vdFNjb3BlJyxcclxuXHQnVVJMRmFjdG9yeScsXHJcblx0J1VSTFZhbGlkYXRvclNlcnZpY2UnLFxyXG5dO1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGxheWxpc3RTZXJ2aWNlO1xyXG4iLCJ2YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG52YXIgVVJMID0gcmVxdWlyZSgnLi8uLi9tb2RlbHMvVVJMJyk7XHJcblxyXG5cclxuY2xhc3MgVVJMRmFjdG9yeSB7XHJcblx0Y3JlYXRlRnJvbVN0cmluZyhzdHJpbmcpIHtcclxuXHRcdGNvbnN0IHJlZ2V4ID0gLyguKz8pKFxcZCspL2c7XHJcblx0XHRjb25zdCB1cmwgPSBuZXcgVVJMKCk7XHJcblxyXG5cdFx0bGV0IHBpZWNlcztcclxuXHRcdGxldCBsYXN0SW5kZXggPSAwO1xyXG5cdFx0d2hpbGUgKChwaWVjZXMgPSByZWdleC5leGVjKHN0cmluZykpICE9PSBudWxsKSB7XHJcblx0XHRcdGNvbnN0IHBhcnNlZCA9IHBpZWNlc1swXTtcclxuXHRcdFx0Y29uc3QgY29tcG9uZW50ID0gcGllY2VzWzFdO1xyXG5cdFx0XHRjb25zdCBtYXRjaCA9IHBpZWNlc1syXTtcclxuXHRcdFx0bGFzdEluZGV4ID0gcGllY2VzWydpbmRleCddICsgcGFyc2VkLmxlbmd0aDtcclxuXHJcblx0XHRcdHVybC5hZGRDb21wb25lbnQoY29tcG9uZW50KTtcclxuXHRcdFx0dXJsLmFkZENvbXBvbmVudChtYXRjaCk7XHJcblx0XHRcdHVybC5hZGRNYXRjaChtYXRjaCk7XHJcblx0XHR9XHJcblx0XHRpZiAoc3RyaW5nLmxlbmd0aCA9PSAxIHx8IGxhc3RJbmRleCA8IHN0cmluZy5sZW5ndGggLSAxKSB7XHJcblx0XHRcdGNvbnN0IHJlbWFpbiA9IHN0cmluZy5zdWJzdHJpbmcobGFzdEluZGV4LCBzdHJpbmcubGVuZ3RoKTtcclxuXHRcdFx0dXJsLmFkZENvbXBvbmVudChyZW1haW4pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHVybDtcclxuXHR9XHJcblx0Y3JlYXRlRnJvbUNvbXBvbmVudHMoY29tcG9uZW50cykge1xyXG5cdFx0Y29uc3QgdXJsID0gbmV3IFVSTCgpO1xyXG5cdFx0Xy5mb3JFYWNoKGNvbXBvbmVudHMsIChjb21wb25lbnQpID0+IHtcclxuXHRcdFx0aWYgKGNvbXBvbmVudCkge1xyXG5cdFx0XHRcdHVybC5hZGRDb21wb25lbnQoY29tcG9uZW50KTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gdXJsO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBVUkxGYWN0b3J5O1xyXG4iLCJjbGFzcyBVUkxWYWxpZGF0b3JTZXJ2aWNlIHtcclxuXHRjb25zdHJ1Y3RvcigkaHR0cCkge1xyXG5cdFx0dGhpcy4kaHR0cCA9ICRodHRwO1xyXG5cdH1cclxuXHRpc1ZhbGlkKHVybCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuJGh0dHAuZ2V0KHVybClcclxuXHRcdFx0XHRcdFx0IC50aGVuKChyZXMpID0+IHRydWUpXHJcblx0XHRcdFx0XHRcdCAuY2F0Y2goKGUpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHRcdCB9KTtcclxuXHR9XHJcbn1cclxuVVJMVmFsaWRhdG9yU2VydmljZS4kaW5qZWN0ID0gWyckaHR0cCddO1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVVJMVmFsaWRhdG9yU2VydmljZTtcclxuIl19
