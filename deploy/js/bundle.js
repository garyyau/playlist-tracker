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
app.service('URLParserService', require('./services/URLParserService'));
app.service('URLValidatorService', require('./services/URLValidatorService'));

// Define the Directives
app.directive('playlistItemForm', require('./directives/PlaylistItemForm'));

angular.bootstrap(document, ['PlaylistTrackerEx']);

},{"./PlaylistController":1,"./directives/PlaylistItemForm":3,"./services/PlaylistItemFormService":4,"./services/PlaylistService":5,"./services/URLParserService":6,"./services/URLValidatorService":7,"lodash":undefined}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlaylistItemForm = function () {
	function PlaylistItemForm(PlaylistService, PlaylistItemFormService, URLParserService, URLValidatorService) {
		_classCallCheck(this, PlaylistItemForm);

		this.restrict = "E";
		this.templateUrl = "templates/playlist_item_form.html";
		this.scope = {};
		this.replace = true;
		this.link = this.link.bind(this);

		this.PlaylistService = PlaylistService;
		this.PlaylistItemFormService = PlaylistItemFormService;
		console.log(this.PlaylistItemFormService.URLParserService);
		this.URLParserService = URLParserService;
		this.URLValidatorService = URLValidatorService;
	}

	_createClass(PlaylistItemForm, [{
		key: "clear",
		value: function clear() {
			this.PlaylistItemFormService.clear();
		}
	}, {
		key: "save",
		value: function save() {
			var urlString = this.PlaylistItemFormService.url;
			console.log(this.URLParserService.createURL(urlString));
			return;
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

			this.$scope.PlaylistItemFormService = this.PlaylistItemFormService;
			this.$scope.clear = this.clear.bind(this);
			this.$scope.save = this.save.bind(this);
		}
	}], [{
		key: "export",
		value: function _export(PlaylistService, PlaylistItemFormService, URLParserService, URLValidatorService) {
			return new PlaylistItemForm(PlaylistService, PlaylistItemFormService, URLParserService, URLValidatorService);
		}
	}]);

	return PlaylistItemForm;
}();

PlaylistItemForm.export.$inject = ['PlaylistService', 'PlaylistItemFormService', 'URLParserService', 'URLValidatorService'];

module.exports = PlaylistItemForm.export;

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');

var PlaylistItemFormService = function () {
	function PlaylistItemFormService(URLParserService) {
		_classCallCheck(this, PlaylistItemFormService);

		this.id = null;
		this.name = null;
		this.url = null;
		this.urlString = null;
		this.URLParserService = URLParserService;
	}

	_createClass(PlaylistItemFormService, [{
		key: 'createURL',
		value: function createURL(urlString) {
			this.url = this.URLParserService.createURL(urlString);
		}
	}, {
		key: 'getValues',
		value: function getValues() {
			var item = {};
			_.forOwn(this, function (value, key) {
				_.set(item, key, value);
			});
			return item;
		}
	}, {
		key: 'setValues',
		value: function setValues(item) {
			var _this = this;

			_.forOwn(item, function (value, key) {
				if (_.has(_this, key)) {
					_.set(_this, key, value);
				}
			});
		}
	}, {
		key: 'clear',
		value: function clear() {
			var _this2 = this;

			_.forOwn(this, function (value, key) {
				if (key != 'id') {
					_.set(_this2, key, null);
				}
			});
		}
	}, {
		key: 'reset',
		value: function reset() {
			var _this3 = this;

			_.forOwn(this, function (value, key) {
				_.set(_this3, key, null);
			});
		}
	}]);

	return PlaylistItemFormService;
}();

PlaylistItemFormService.$inject = ['URLParserService'];

module.exports = PlaylistItemFormService;

},{"lodash":undefined}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');

var PlaylistItem = function () {
	function PlaylistItem() {
		_classCallCheck(this, PlaylistItem);

		this.id = null;
		this.name = null;
		this.url = null;
		this.season = null;
		this.episode = null;
	}

	_createClass(PlaylistItem, [{
		key: 'update',
		value: function update(data) {
			var _this = this;

			_.forOwn(data, function (value, key) {
				if (_.has(_this, key)) {
					_.set(_this, key, value);
				}
			});
		}
	}]);

	return PlaylistItem;
}();

var PlaylistService = function () {
	function PlaylistService($rootScope) {
		_classCallCheck(this, PlaylistService);

		this.uid = 1;
		this.items = [];
		this.load();
		this.$rootScope = $rootScope;
	}

	_createClass(PlaylistService, [{
		key: 'load',
		value: function load() {
			var _this2 = this;

			try {
				chrome.storage.sync.get('playlist', function (storage) {
					_this2.$rootScope.$apply(function () {
						_this2.items = JSON.parse(storage['playlist']);
					});
				});
			} catch (e) {
				console.log("Failed loading data.", e);
			}
		}
	}, {
		key: 'save',
		value: function save() {
			var _this3 = this;

			chrome.storage.sync.set({ playlist: JSON.stringify(this.items) }, function () {
				console.log("Saved Items: ", _this3.items);
			});
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
		key: 'list',
		value: function list() {
			return this.items;
		}
	}]);

	return PlaylistService;
}();

PlaylistService.$inject = ['$rootScope'];

module.exports = PlaylistService;

},{"lodash":undefined}],6:[function(require,module,exports){
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
	}]);

	return URL;
}();

var URLParserService = function () {
	function URLParserService() {
		_classCallCheck(this, URLParserService);
	}

	_createClass(URLParserService, [{
		key: 'createURL',
		value: function createURL(string) {
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
			if (lastIndex < string.length - 1) {
				var remain = string.substring(lastIndex, string.length);
				url.addComponent(remain);
			}
			return url;
		}
	}]);

	return URLParserService;
}();

module.exports = URLParserService;

},{"lodash":undefined}],7:[function(require,module,exports){
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
			return this.$http.get(url).then(function () {
				return true;
			}, function () {
				return false;
			});
		}
	}]);

	return URLValidatorService;
}();

URLValidatorService.$inject = ['$http'];

module.exports = URLValidatorService;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzXFxQbGF5bGlzdENvbnRyb2xsZXIuanMiLCJzcmNcXGpzXFxhcHAuanMiLCJzcmNcXGpzXFxkaXJlY3RpdmVzXFxQbGF5bGlzdEl0ZW1Gb3JtLmpzIiwic3JjXFxqc1xcc2VydmljZXNcXFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLmpzIiwic3JjXFxqc1xcc2VydmljZXNcXFBsYXlsaXN0U2VydmljZS5qcyIsInNyY1xcanNcXHNlcnZpY2VzXFxVUkxQYXJzZXJTZXJ2aWNlLmpzIiwic3JjXFxqc1xcc2VydmljZXNcXFVSTFZhbGlkYXRvclNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSxJQUFJLE1BQU0sUUFBUSxPQUFSLENBQU47O0lBR0U7QUFDTCxVQURLLGtCQUNMLENBQ0MsZUFERCxFQUVDLHVCQUZELEVBR0U7d0JBSkcsb0JBSUg7O0FBQ0QsT0FBSyxZQUFMLEdBQW9CLElBQXBCLENBREM7QUFFRCxPQUFLLGVBQUwsR0FBdUIsSUFBdkIsQ0FGQztBQUdELE9BQUssaUJBQUwsR0FBeUIsS0FBekIsQ0FIQzs7QUFLRCxPQUFLLGVBQUwsR0FBdUIsZUFBdkIsQ0FMQztBQU1ELE9BQUssdUJBQUwsR0FBK0IsdUJBQS9CLENBTkM7RUFIRjs7Y0FESzs7NEJBWUs7QUFDVCxRQUFLLHVCQUFMLENBQTZCLEtBQTdCLEdBRFM7QUFFVCxRQUFLLGlCQUFMLEdBRlM7Ozs7MkJBSUQsTUFBTTtBQUNkLFFBQUssdUJBQUwsQ0FBNkIsU0FBN0IsQ0FBdUMsSUFBdkMsRUFEYztBQUVkLFFBQUssaUJBQUwsR0FGYzs7OztpQ0FJQTtBQUNkLFVBQU8sS0FBSyxlQUFMLENBQXFCLElBQXJCLEVBQVAsQ0FEYzs7OztvQ0FHRztBQUNqQixRQUFLLGVBQUwsR0FBdUIsSUFBdkIsQ0FEaUI7QUFFakIsUUFBSyxpQkFBTCxHQUF5QixLQUF6QixDQUZp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QVAsQ0FBUixDQUh3QztBQUk5QyxnQkFBWSxPQUFPLE9BQVAsSUFBa0IsT0FBTyxNQUFQLENBSmdCOztBQU05QyxRQUFJLFlBQUosQ0FBaUIsU0FBakIsRUFOOEM7QUFPOUMsUUFBSSxZQUFKLENBQWlCLEtBQWpCLEVBUDhDO0FBUTlDLFFBQUksUUFBSixDQUFhLEtBQWIsRUFSOEM7SUFBL0M7QUFVQSxPQUFJLFlBQVksT0FBTyxNQUFQLEdBQWdCLENBQWhCLEVBQW1CO0FBQ2xDLFFBQU0sU0FBUyxPQUFPLFNBQVAsQ0FBaUIsU0FBakIsRUFBNEIsT0FBTyxNQUFQLENBQXJDLENBRDRCO0FBRWxDLFFBQUksWUFBSixDQUFpQixNQUFqQixFQUZrQztJQUFuQztBQUlBLFVBQU8sR0FBUCxDQXBCaUI7Ozs7UUFEYjs7O0FBeUJOLE9BQU8sT0FBUCxHQUFpQixnQkFBakI7Ozs7Ozs7OztJQzVDTTtBQUNMLFVBREssbUJBQ0wsQ0FBWSxLQUFaLEVBQW1CO3dCQURkLHFCQUNjOztBQUNsQixPQUFLLEtBQUwsR0FBYSxLQUFiLENBRGtCO0VBQW5COztjQURLOzswQkFJRyxLQUFLO0FBQ1osVUFBTyxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsR0FBZixFQUFvQixJQUFwQixDQUF5QjtXQUFNO0lBQU4sRUFBWTtXQUFNO0lBQU4sQ0FBNUMsQ0FEWTs7OztRQUpSOzs7QUFRTixvQkFBb0IsT0FBcEIsR0FBOEIsQ0FBQyxPQUFELENBQTlCOztBQUdBLE9BQU8sT0FBUCxHQUFpQixtQkFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGFwcCA9IHJlcXVpcmUoJy4vYXBwJyk7XHJcblxyXG5cclxuY2xhc3MgUGxheWxpc3RDb250cm9sbGVyIHtcclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdFBsYXlsaXN0U2VydmljZSxcclxuXHRcdFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlXHJcblx0KSB7XHJcblx0XHR0aGlzLnNlbGVjdGVkSXRlbSA9IG51bGw7XHJcblx0XHR0aGlzLnZpc2libGVQbGF5bGlzdCA9IHRydWU7XHJcblx0XHR0aGlzLnZpc2libGVTZXJpZXNGb3JtID0gZmFsc2U7XHJcblxyXG5cdFx0dGhpcy5QbGF5bGlzdFNlcnZpY2UgPSBQbGF5bGlzdFNlcnZpY2U7XHJcblx0XHR0aGlzLlBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlID0gUGxheWxpc3RJdGVtRm9ybVNlcnZpY2U7XHJcblx0fVxyXG5cdGFkZEl0ZW0oKSB7XHJcblx0XHR0aGlzLlBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLmNsZWFyKCk7XHJcblx0XHR0aGlzLmRpc3BsYXlTZXJpZXNGb3JtKCk7XHJcblx0fVxyXG5cdGVkaXRJdGVtKGl0ZW0pIHtcclxuXHRcdHRoaXMuUGxheWxpc3RJdGVtRm9ybVNlcnZpY2Uuc2V0VmFsdWVzKGl0ZW0pO1xyXG5cdFx0dGhpcy5kaXNwbGF5U2VyaWVzRm9ybSgpO1xyXG5cdH1cclxuXHRnZXRMaXN0SXRlbXMoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5QbGF5bGlzdFNlcnZpY2UubGlzdCgpO1xyXG5cdH1cclxuXHRkaXNwbGF5UGxheWxpc3QoKSB7XHJcblx0XHR0aGlzLnZpc2libGVQbGF5bGlzdCA9IHRydWU7XHJcblx0XHR0aGlzLnZpc2libGVTZXJpZXNGb3JtID0gZmFsc2U7XHJcblx0fVxyXG5cdGRpc3BsYXlTZXJpZXNGb3JtKCkge1xyXG5cdFx0dGhpcy52aXNpYmxlUGxheWxpc3QgPSBmYWxzZTtcclxuXHRcdHRoaXMudmlzaWJsZVNlcmllc0Zvcm0gPSB0cnVlO1xyXG5cdH1cclxufVxyXG5cclxuUGxheWxpc3RDb250cm9sbGVyLiRpbmplY3QgPSBbXHJcblx0J1BsYXlsaXN0U2VydmljZScsXHJcblx0J1BsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlJyxcclxuXTtcclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5bGlzdENvbnRyb2xsZXI7XHJcbiIsInZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcblxyXG5cclxuLy8gRGVmaW5lIHRoZSBBbmd1bGFyIEFwcFxyXG52YXIgZGVwZW5kZW5jaWVzID0gWydtdWknXTtcclxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdQbGF5bGlzdFRyYWNrZXJFeCcsIGRlcGVuZGVuY2llcyk7XHJcblxyXG4vLyBEZWZpbmUgdGhlIENvbnRyb2xsZXJzXHJcbmFwcC5jb250cm9sbGVyKCdQbGF5bGlzdENvbnRyb2xsZXInLCByZXF1aXJlKCcuL1BsYXlsaXN0Q29udHJvbGxlcicpKTtcclxuXHJcbi8vIERlZmluZSB0aGUgU2VydmljZXNcclxuYXBwLnNlcnZpY2UoJ1BsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZScpKTtcclxuYXBwLnNlcnZpY2UoJ1BsYXlsaXN0U2VydmljZScsIHJlcXVpcmUoJy4vc2VydmljZXMvUGxheWxpc3RTZXJ2aWNlJykpO1xyXG5hcHAuc2VydmljZSgnVVJMUGFyc2VyU2VydmljZScsIHJlcXVpcmUoJy4vc2VydmljZXMvVVJMUGFyc2VyU2VydmljZScpKTtcclxuYXBwLnNlcnZpY2UoJ1VSTFZhbGlkYXRvclNlcnZpY2UnLCByZXF1aXJlKCcuL3NlcnZpY2VzL1VSTFZhbGlkYXRvclNlcnZpY2UnKSk7XHJcblxyXG4vLyBEZWZpbmUgdGhlIERpcmVjdGl2ZXNcclxuYXBwLmRpcmVjdGl2ZSgncGxheWxpc3RJdGVtRm9ybScsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9QbGF5bGlzdEl0ZW1Gb3JtJykpO1xyXG5cclxuXHJcbmFuZ3VsYXIuYm9vdHN0cmFwKGRvY3VtZW50LCBbJ1BsYXlsaXN0VHJhY2tlckV4J10pO1xyXG4iLCJjbGFzcyBQbGF5bGlzdEl0ZW1Gb3JtIHtcclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdFBsYXlsaXN0U2VydmljZSxcclxuXHRcdFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLFxyXG5cdFx0VVJMUGFyc2VyU2VydmljZSxcclxuXHRcdFVSTFZhbGlkYXRvclNlcnZpY2VcclxuXHQpIHtcclxuXHRcdHRoaXMucmVzdHJpY3QgPSBcIkVcIjtcclxuXHRcdHRoaXMudGVtcGxhdGVVcmwgPSBcInRlbXBsYXRlcy9wbGF5bGlzdF9pdGVtX2Zvcm0uaHRtbFwiO1xyXG5cdFx0dGhpcy5zY29wZSA9IHt9O1xyXG5cdFx0dGhpcy5yZXBsYWNlID0gdHJ1ZTtcclxuXHRcdHRoaXMubGluayA9IHRoaXMubGluay5iaW5kKHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuUGxheWxpc3RTZXJ2aWNlID0gUGxheWxpc3RTZXJ2aWNlO1xyXG5cdFx0dGhpcy5QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZSA9IFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlO1xyXG5cdFx0Y29uc29sZS5sb2codGhpcy5QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZS5VUkxQYXJzZXJTZXJ2aWNlKTtcclxuXHRcdHRoaXMuVVJMUGFyc2VyU2VydmljZSA9IFVSTFBhcnNlclNlcnZpY2U7XHJcblx0XHR0aGlzLlVSTFZhbGlkYXRvclNlcnZpY2UgPSBVUkxWYWxpZGF0b3JTZXJ2aWNlO1xyXG5cdH1cclxuXHRjbGVhcigpIHtcclxuXHRcdHRoaXMuUGxheWxpc3RJdGVtRm9ybVNlcnZpY2UuY2xlYXIoKTtcclxuXHR9XHJcblx0c2F2ZSgpIHtcclxuXHRcdGNvbnN0IHVybFN0cmluZyA9IHRoaXMuUGxheWxpc3RJdGVtRm9ybVNlcnZpY2UudXJsO1xyXG5cdFx0Y29uc29sZS5sb2codGhpcy5VUkxQYXJzZXJTZXJ2aWNlLmNyZWF0ZVVSTCh1cmxTdHJpbmcpKTtcclxuXHRcdHJldHVybjtcclxuXHRcdGNvbnN0IGl0ZW1EYXRhID0gdGhpcy5QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZS5nZXRWYWx1ZXMoKTtcclxuXHRcdHRoaXMuUGxheWxpc3RTZXJ2aWNlLnNhdmVJdGVtKGl0ZW1EYXRhKTtcclxuXHRcdHRoaXMuY2xlYXIoKTtcclxuXHR9XHJcblx0bGluaygkc2NvcGUpIHtcclxuXHRcdHRoaXMuJHNjb3BlID0gJHNjb3BlO1xyXG5cclxuXHRcdHRoaXMuJHNjb3BlLmhhc1NlYXNvbiA9IGZhbHNlO1xyXG5cdFx0dGhpcy4kc2NvcGUuaGFzRXBpc29kZSA9IGZhbHNlO1xyXG5cclxuXHRcdHRoaXMuJHNjb3BlLlBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlID0gdGhpcy5QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZTtcclxuXHRcdHRoaXMuJHNjb3BlLmNsZWFyID0gdGhpcy5jbGVhci5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy4kc2NvcGUuc2F2ZSA9IHRoaXMuc2F2ZS5iaW5kKHRoaXMpO1xyXG5cdH1cclxuXHRzdGF0aWMgZXhwb3J0KFxyXG5cdFx0UGxheWxpc3RTZXJ2aWNlLFxyXG5cdFx0UGxheWxpc3RJdGVtRm9ybVNlcnZpY2UsXHJcblx0XHRVUkxQYXJzZXJTZXJ2aWNlLFxyXG5cdFx0VVJMVmFsaWRhdG9yU2VydmljZVxyXG5cdCkge1xyXG5cdFx0cmV0dXJuIG5ldyBQbGF5bGlzdEl0ZW1Gb3JtKFxyXG5cdFx0XHRQbGF5bGlzdFNlcnZpY2UsXHJcblx0XHRcdFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLFxyXG5cdFx0XHRVUkxQYXJzZXJTZXJ2aWNlLFxyXG5cdFx0XHRVUkxWYWxpZGF0b3JTZXJ2aWNlXHJcblx0XHQpO1xyXG5cdH1cclxufVxyXG5QbGF5bGlzdEl0ZW1Gb3JtLmV4cG9ydC4kaW5qZWN0ID0gW1xyXG5cdCdQbGF5bGlzdFNlcnZpY2UnLFxyXG5cdCdQbGF5bGlzdEl0ZW1Gb3JtU2VydmljZScsXHJcblx0J1VSTFBhcnNlclNlcnZpY2UnLFxyXG5cdCdVUkxWYWxpZGF0b3JTZXJ2aWNlJyxcclxuXTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGxheWxpc3RJdGVtRm9ybS5leHBvcnQ7XHJcbiIsInZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcblxyXG5cclxuY2xhc3MgUGxheWxpc3RJdGVtRm9ybVNlcnZpY2Uge1xyXG5cdGNvbnN0cnVjdG9yKFVSTFBhcnNlclNlcnZpY2UpIHtcclxuXHRcdHRoaXMuaWQgPSBudWxsO1xyXG5cdFx0dGhpcy5uYW1lID0gbnVsbDtcclxuXHRcdHRoaXMudXJsID0gbnVsbDtcclxuXHRcdHRoaXMudXJsU3RyaW5nID0gbnVsbDtcclxuXHRcdHRoaXMuVVJMUGFyc2VyU2VydmljZSA9IFVSTFBhcnNlclNlcnZpY2U7XHJcblx0fVxyXG5cdGNyZWF0ZVVSTCh1cmxTdHJpbmcpIHtcclxuXHRcdHRoaXMudXJsID0gdGhpcy5VUkxQYXJzZXJTZXJ2aWNlLmNyZWF0ZVVSTCh1cmxTdHJpbmcpO1xyXG5cdH1cclxuXHRnZXRWYWx1ZXMoKSB7XHJcblx0XHRsZXQgaXRlbSA9IHt9O1xyXG5cdFx0Xy5mb3JPd24odGhpcywgKHZhbHVlLCBrZXkpID0+IHtcclxuXHRcdFx0Xy5zZXQoaXRlbSwga2V5LCB2YWx1ZSk7XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBpdGVtO1xyXG5cdH1cclxuXHRzZXRWYWx1ZXMoaXRlbSkge1xyXG5cdFx0Xy5mb3JPd24oaXRlbSwgKHZhbHVlLCBrZXkpID0+IHtcclxuXHRcdFx0aWYgKF8uaGFzKHRoaXMsIGtleSkpIHtcclxuXHRcdFx0XHRfLnNldCh0aGlzLCBrZXksIHZhbHVlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cdGNsZWFyKCkge1xyXG5cdFx0Xy5mb3JPd24odGhpcywgKHZhbHVlLCBrZXkpID0+IHtcclxuXHRcdFx0aWYgKGtleSAhPSAnaWQnKSB7XHJcblx0XHRcdFx0Xy5zZXQodGhpcywga2V5LCBudWxsKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cdHJlc2V0KCkge1xyXG5cdFx0Xy5mb3JPd24odGhpcywgKHZhbHVlLCBrZXkpID0+IHtcclxuXHRcdFx0Xy5zZXQodGhpcywga2V5LCBudWxsKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZS4kaW5qZWN0ID0gWydVUkxQYXJzZXJTZXJ2aWNlJ107XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5bGlzdEl0ZW1Gb3JtU2VydmljZTtcclxuIiwidmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxuXHJcblxyXG5jbGFzcyBQbGF5bGlzdEl0ZW0ge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5pZCA9IG51bGw7XHJcblx0XHR0aGlzLm5hbWUgPSBudWxsO1xyXG5cdFx0dGhpcy51cmwgPSBudWxsO1xyXG5cdFx0dGhpcy5zZWFzb24gPSBudWxsO1xyXG5cdFx0dGhpcy5lcGlzb2RlID0gbnVsbDtcclxuXHR9XHJcblx0dXBkYXRlKGRhdGEpIHtcclxuXHRcdF8uZm9yT3duKGRhdGEsICh2YWx1ZSwga2V5KSA9PiB7XHJcblx0XHRcdGlmIChfLmhhcyh0aGlzLCBrZXkpKSB7XHJcblx0XHRcdFx0Xy5zZXQodGhpcywga2V5LCB2YWx1ZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgUGxheWxpc3RTZXJ2aWNlIHtcclxuXHRjb25zdHJ1Y3Rvcigkcm9vdFNjb3BlKSB7XHJcblx0XHR0aGlzLnVpZCA9IDE7XHJcblx0XHR0aGlzLml0ZW1zID0gW107XHJcblx0XHR0aGlzLmxvYWQoKTtcclxuXHRcdHRoaXMuJHJvb3RTY29wZSA9ICRyb290U2NvcGU7XHJcblx0fVxyXG5cdGxvYWQoKSB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRjaHJvbWUuc3RvcmFnZS5zeW5jLmdldCgncGxheWxpc3QnLCAoc3RvcmFnZSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMuJHJvb3RTY29wZS4kYXBwbHkoKCkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5pdGVtcyA9IEpTT04ucGFyc2Uoc3RvcmFnZVsncGxheWxpc3QnXSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSBjYXRjaChlKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiRmFpbGVkIGxvYWRpbmcgZGF0YS5cIiwgZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHNhdmUoKSB7XHJcblx0XHRjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7cGxheWxpc3Q6IEpTT04uc3RyaW5naWZ5KHRoaXMuaXRlbXMpfSwgKCkgPT4ge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIlNhdmVkIEl0ZW1zOiBcIiwgdGhpcy5pdGVtcyk7XHJcblx0XHR9KTtcclxuXHR9XHJcblx0c2F2ZUl0ZW0oaXRlbURhdGEpIHtcclxuXHRcdGlmIChpdGVtRGF0YS5pZCkge1xyXG5cdFx0XHRjb25zdCBpdGVtID0gdGhpcy5nZXRJdGVtKGl0ZW1EYXRhLmlkKTtcclxuXHRcdFx0aXRlbS51cGRhdGUoaXRlbURhdGEpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRjb25zdCBpdGVtID0gbmV3IFBsYXlsaXN0SXRlbSgpO1xyXG5cdFx0aXRlbURhdGEuaWQgPSB0aGlzLnVpZCsrO1xyXG5cdFx0aXRlbS51cGRhdGUoaXRlbURhdGEpO1xyXG5cdFx0dGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xyXG5cdFx0dGhpcy5zYXZlKCk7XHJcblx0fVxyXG5cdGdldEl0ZW0oaWQpIHtcclxuXHRcdHJldHVybiBfLmZpbmQodGhpcy5pdGVtcywge2lkOiBpZH0pO1xyXG5cdH1cclxuXHRkZWxldGVJdGVtKGlkKSB7XHJcblx0XHRfLnJlbW92ZSh0aGlzLml0ZW1zLCB7aWQ6IGlkfSk7XHJcblx0XHR0aGlzLnNhdmUoKTtcclxuXHR9XHJcblx0bGlzdCgpIHtcclxuXHRcdHJldHVybiB0aGlzLml0ZW1zO1xyXG5cdH1cclxufVxyXG5QbGF5bGlzdFNlcnZpY2UuJGluamVjdCA9IFsnJHJvb3RTY29wZSddO1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGxheWxpc3RTZXJ2aWNlO1xyXG4iLCJ2YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG5cclxuXHJcbmNsYXNzIFVSTCB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLmNvbXBvbmVudHMgPSBbXTtcclxuXHRcdHRoaXMubWF0Y2hlcyA9IFtdO1xyXG5cdH1cclxuXHRhZGRDb21wb25lbnQoY29tcG9uZW50KSB7XHJcblx0XHR0aGlzLmNvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xyXG5cdH1cclxuXHRhZGRNYXRjaChjb21wb25lbnQpIHtcclxuXHRcdHRoaXMubWF0Y2hlcy5wdXNoKGNvbXBvbmVudCk7XHJcblx0fVxyXG5cdGlzTWF0Y2goY29tcG9uZW50KSB7XHJcblx0XHRyZXR1cm4gXy5pbmNsdWRlcyh0aGlzLm1hdGNoZXMsIGNvbXBvbmVudCk7XHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBVUkxQYXJzZXJTZXJ2aWNlIHtcclxuXHRjcmVhdGVVUkwoc3RyaW5nKSB7XHJcblx0XHRjb25zdCByZWdleCA9IC8oLis/KShcXGQrKS9nO1xyXG5cdFx0Y29uc3QgdXJsID0gbmV3IFVSTCgpO1xyXG5cclxuXHRcdGxldCBwaWVjZXM7XHJcblx0XHRsZXQgbGFzdEluZGV4ID0gMDtcclxuXHRcdHdoaWxlICgocGllY2VzID0gcmVnZXguZXhlYyhzdHJpbmcpKSAhPT0gbnVsbCkge1xyXG5cdFx0XHRjb25zdCBwYXJzZWQgPSBwaWVjZXNbMF07XHJcblx0XHRcdGNvbnN0IGNvbXBvbmVudCA9IHBpZWNlc1sxXTtcclxuXHRcdFx0Y29uc3QgbWF0Y2ggPSBwaWVjZXNbMl07XHJcblx0XHRcdGxhc3RJbmRleCA9IHBpZWNlc1snaW5kZXgnXSArIHBhcnNlZC5sZW5ndGg7XHJcblxyXG5cdFx0XHR1cmwuYWRkQ29tcG9uZW50KGNvbXBvbmVudCk7XHJcblx0XHRcdHVybC5hZGRDb21wb25lbnQobWF0Y2gpO1xyXG5cdFx0XHR1cmwuYWRkTWF0Y2gobWF0Y2gpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGxhc3RJbmRleCA8IHN0cmluZy5sZW5ndGggLSAxKSB7XHJcblx0XHRcdGNvbnN0IHJlbWFpbiA9IHN0cmluZy5zdWJzdHJpbmcobGFzdEluZGV4LCBzdHJpbmcubGVuZ3RoKTtcclxuXHRcdFx0dXJsLmFkZENvbXBvbmVudChyZW1haW4pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHVybDtcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVVJMUGFyc2VyU2VydmljZTtcclxuIiwiY2xhc3MgVVJMVmFsaWRhdG9yU2VydmljZSB7XHJcblx0Y29uc3RydWN0b3IoJGh0dHApIHtcclxuXHRcdHRoaXMuJGh0dHAgPSAkaHR0cDtcclxuXHR9XHJcblx0aXNWYWxpZCh1cmwpIHtcclxuXHRcdHJldHVybiB0aGlzLiRodHRwLmdldCh1cmwpLnRoZW4oKCkgPT4gdHJ1ZSwgKCkgPT4gZmFsc2UpO1xyXG5cdH1cclxufVxyXG5VUkxWYWxpZGF0b3JTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJ107XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBVUkxWYWxpZGF0b3JTZXJ2aWNlO1xyXG4iXX0=
