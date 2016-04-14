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
	function PlaylistItemFormService() {
		_classCallCheck(this, PlaylistItemFormService);

		this.id = null;
		this.name = null;
		this.url = null;
	}

	_createClass(PlaylistItemFormService, [{
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

PlaylistItemFormService.$inject = [];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzXFxQbGF5bGlzdENvbnRyb2xsZXIuanMiLCJzcmNcXGpzXFxhcHAuanMiLCJzcmNcXGpzXFxkaXJlY3RpdmVzXFxQbGF5bGlzdEl0ZW1Gb3JtLmpzIiwic3JjXFxqc1xcc2VydmljZXNcXFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLmpzIiwic3JjXFxqc1xcc2VydmljZXNcXFBsYXlsaXN0U2VydmljZS5qcyIsInNyY1xcanNcXHNlcnZpY2VzXFxVUkxQYXJzZXJTZXJ2aWNlLmpzIiwic3JjXFxqc1xcc2VydmljZXNcXFVSTFZhbGlkYXRvclNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSxJQUFJLE1BQU0sUUFBUSxPQUFSLENBQU47O0lBR0U7QUFDTCxVQURLLGtCQUNMLENBQ0MsZUFERCxFQUVDLHVCQUZELEVBR0U7d0JBSkcsb0JBSUg7O0FBQ0QsT0FBSyxZQUFMLEdBQW9CLElBQXBCLENBREM7QUFFRCxPQUFLLGVBQUwsR0FBdUIsSUFBdkIsQ0FGQztBQUdELE9BQUssaUJBQUwsR0FBeUIsS0FBekIsQ0FIQzs7QUFLRCxPQUFLLGVBQUwsR0FBdUIsZUFBdkIsQ0FMQztBQU1ELE9BQUssdUJBQUwsR0FBK0IsdUJBQS9CLENBTkM7RUFIRjs7Y0FESzs7NEJBWUs7QUFDVCxRQUFLLHVCQUFMLENBQTZCLEtBQTdCLEdBRFM7QUFFVCxRQUFLLGlCQUFMLEdBRlM7Ozs7MkJBSUQsTUFBTTtBQUNkLFFBQUssdUJBQUwsQ0FBNkIsU0FBN0IsQ0FBdUMsSUFBdkMsRUFEYztBQUVkLFFBQUssaUJBQUwsR0FGYzs7OztpQ0FJQTtBQUNkLFVBQU8sS0FBSyxlQUFMLENBQXFCLElBQXJCLEVBQVAsQ0FEYzs7OztvQ0FHRztBQUNqQixRQUFLLGVBQUwsR0FBdUIsSUFBdkIsQ0FEaUI7QUFFakIsUUFB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LFFBQU0sU0FBUyxPQUFPLFNBQVAsQ0FBaUIsU0FBakIsRUFBNEIsT0FBTyxNQUFQLENBQXJDLENBRDRCO0FBRWxDLFFBQUksWUFBSixDQUFpQixNQUFqQixFQUZrQztJQUFuQztBQUlBLFVBQU8sR0FBUCxDQXBCaUI7Ozs7UUFEYjs7O0FBeUJOLE9BQU8sT0FBUCxHQUFpQixnQkFBakI7Ozs7Ozs7OztJQzVDTTtBQUNMLFVBREssbUJBQ0wsQ0FBWSxLQUFaLEVBQW1CO3dCQURkLHFCQUNjOztBQUNsQixPQUFLLEtBQUwsR0FBYSxLQUFiLENBRGtCO0VBQW5COztjQURLOzswQkFJRyxLQUFLO0FBQ1osVUFBTyxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsR0FBZixFQUFvQixJQUFwQixDQUF5QjtXQUFNO0lBQU4sRUFBWTtXQUFNO0lBQU4sQ0FBNUMsQ0FEWTs7OztRQUpSOzs7QUFRTixvQkFBb0IsT0FBcEIsR0FBOEIsQ0FBQyxPQUFELENBQTlCOztBQUdBLE9BQU8sT0FBUCxHQUFpQixtQkFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGFwcCA9IHJlcXVpcmUoJy4vYXBwJyk7XHJcblxyXG5cclxuY2xhc3MgUGxheWxpc3RDb250cm9sbGVyIHtcclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdFBsYXlsaXN0U2VydmljZSxcclxuXHRcdFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlXHJcblx0KSB7XHJcblx0XHR0aGlzLnNlbGVjdGVkSXRlbSA9IG51bGw7XHJcblx0XHR0aGlzLnZpc2libGVQbGF5bGlzdCA9IHRydWU7XHJcblx0XHR0aGlzLnZpc2libGVTZXJpZXNGb3JtID0gZmFsc2U7XHJcblxyXG5cdFx0dGhpcy5QbGF5bGlzdFNlcnZpY2UgPSBQbGF5bGlzdFNlcnZpY2U7XHJcblx0XHR0aGlzLlBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlID0gUGxheWxpc3RJdGVtRm9ybVNlcnZpY2U7XHJcblx0fVxyXG5cdGFkZEl0ZW0oKSB7XHJcblx0XHR0aGlzLlBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLmNsZWFyKCk7XHJcblx0XHR0aGlzLmRpc3BsYXlTZXJpZXNGb3JtKCk7XHJcblx0fVxyXG5cdGVkaXRJdGVtKGl0ZW0pIHtcclxuXHRcdHRoaXMuUGxheWxpc3RJdGVtRm9ybVNlcnZpY2Uuc2V0VmFsdWVzKGl0ZW0pO1xyXG5cdFx0dGhpcy5kaXNwbGF5U2VyaWVzRm9ybSgpO1xyXG5cdH1cclxuXHRnZXRMaXN0SXRlbXMoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5QbGF5bGlzdFNlcnZpY2UubGlzdCgpO1xyXG5cdH1cclxuXHRkaXNwbGF5UGxheWxpc3QoKSB7XHJcblx0XHR0aGlzLnZpc2libGVQbGF5bGlzdCA9IHRydWU7XHJcblx0XHR0aGlzLnZpc2libGVTZXJpZXNGb3JtID0gZmFsc2U7XHJcblx0fVxyXG5cdGRpc3BsYXlTZXJpZXNGb3JtKCkge1xyXG5cdFx0dGhpcy52aXNpYmxlUGxheWxpc3QgPSBmYWxzZTtcclxuXHRcdHRoaXMudmlzaWJsZVNlcmllc0Zvcm0gPSB0cnVlO1xyXG5cdH1cclxufVxyXG5cclxuUGxheWxpc3RDb250cm9sbGVyLiRpbmplY3QgPSBbXHJcblx0J1BsYXlsaXN0U2VydmljZScsXHJcblx0J1BsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlJyxcclxuXTtcclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5bGlzdENvbnRyb2xsZXI7XHJcbiIsInZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcblxyXG5cclxuLy8gRGVmaW5lIHRoZSBBbmd1bGFyIEFwcFxyXG52YXIgZGVwZW5kZW5jaWVzID0gWydtdWknXTtcclxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdQbGF5bGlzdFRyYWNrZXJFeCcsIGRlcGVuZGVuY2llcyk7XHJcblxyXG4vLyBEZWZpbmUgdGhlIENvbnRyb2xsZXJzXHJcbmFwcC5jb250cm9sbGVyKCdQbGF5bGlzdENvbnRyb2xsZXInLCByZXF1aXJlKCcuL1BsYXlsaXN0Q29udHJvbGxlcicpKTtcclxuXHJcbi8vIERlZmluZSB0aGUgU2VydmljZXNcclxuYXBwLnNlcnZpY2UoJ1BsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZScpKTtcclxuYXBwLnNlcnZpY2UoJ1BsYXlsaXN0U2VydmljZScsIHJlcXVpcmUoJy4vc2VydmljZXMvUGxheWxpc3RTZXJ2aWNlJykpO1xyXG5hcHAuc2VydmljZSgnVVJMUGFyc2VyU2VydmljZScsIHJlcXVpcmUoJy4vc2VydmljZXMvVVJMUGFyc2VyU2VydmljZScpKTtcclxuYXBwLnNlcnZpY2UoJ1VSTFZhbGlkYXRvclNlcnZpY2UnLCByZXF1aXJlKCcuL3NlcnZpY2VzL1VSTFZhbGlkYXRvclNlcnZpY2UnKSk7XHJcblxyXG4vLyBEZWZpbmUgdGhlIERpcmVjdGl2ZXNcclxuYXBwLmRpcmVjdGl2ZSgncGxheWxpc3RJdGVtRm9ybScsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9QbGF5bGlzdEl0ZW1Gb3JtJykpO1xyXG5cclxuXHJcbmFuZ3VsYXIuYm9vdHN0cmFwKGRvY3VtZW50LCBbJ1BsYXlsaXN0VHJhY2tlckV4J10pO1xyXG4iLCJjbGFzcyBQbGF5bGlzdEl0ZW1Gb3JtIHtcclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdFBsYXlsaXN0U2VydmljZSxcclxuXHRcdFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLFxyXG5cdFx0VVJMUGFyc2VyU2VydmljZSxcclxuXHRcdFVSTFZhbGlkYXRvclNlcnZpY2VcclxuXHQpIHtcclxuXHRcdHRoaXMucmVzdHJpY3QgPSBcIkVcIjtcclxuXHRcdHRoaXMudGVtcGxhdGVVcmwgPSBcInRlbXBsYXRlcy9wbGF5bGlzdF9pdGVtX2Zvcm0uaHRtbFwiO1xyXG5cdFx0dGhpcy5zY29wZSA9IHt9O1xyXG5cdFx0dGhpcy5yZXBsYWNlID0gdHJ1ZTtcclxuXHRcdHRoaXMubGluayA9IHRoaXMubGluay5iaW5kKHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuUGxheWxpc3RTZXJ2aWNlID0gUGxheWxpc3RTZXJ2aWNlO1xyXG5cdFx0dGhpcy5QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZSA9IFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlO1xyXG5cdFx0dGhpcy5VUkxQYXJzZXJTZXJ2aWNlID0gVVJMUGFyc2VyU2VydmljZTtcclxuXHRcdHRoaXMuVVJMVmFsaWRhdG9yU2VydmljZSA9IFVSTFZhbGlkYXRvclNlcnZpY2U7XHJcblx0fVxyXG5cdGNsZWFyKCkge1xyXG5cdFx0dGhpcy5QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZS5jbGVhcigpO1xyXG5cdH1cclxuXHRzYXZlKCkge1xyXG5cdFx0Y29uc3QgdXJsU3RyaW5nID0gdGhpcy5QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZS51cmw7XHJcblx0XHRjb25zb2xlLmxvZyh0aGlzLlVSTFBhcnNlclNlcnZpY2UuY3JlYXRlVVJMKHVybFN0cmluZykpO1xyXG5cdFx0cmV0dXJuO1xyXG5cdFx0Y29uc3QgaXRlbURhdGEgPSB0aGlzLlBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLmdldFZhbHVlcygpO1xyXG5cdFx0dGhpcy5QbGF5bGlzdFNlcnZpY2Uuc2F2ZUl0ZW0oaXRlbURhdGEpO1xyXG5cdFx0dGhpcy5jbGVhcigpO1xyXG5cdH1cclxuXHRsaW5rKCRzY29wZSkge1xyXG5cdFx0dGhpcy4kc2NvcGUgPSAkc2NvcGU7XHJcblxyXG5cdFx0dGhpcy4kc2NvcGUuaGFzU2Vhc29uID0gZmFsc2U7XHJcblx0XHR0aGlzLiRzY29wZS5oYXNFcGlzb2RlID0gZmFsc2U7XHJcblxyXG5cdFx0dGhpcy4kc2NvcGUuUGxheWxpc3RJdGVtRm9ybVNlcnZpY2UgPSB0aGlzLlBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlO1xyXG5cdFx0dGhpcy4kc2NvcGUuY2xlYXIgPSB0aGlzLmNsZWFyLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLiRzY29wZS5zYXZlID0gdGhpcy5zYXZlLmJpbmQodGhpcyk7XHJcblx0fVxyXG5cdHN0YXRpYyBleHBvcnQoXHJcblx0XHRQbGF5bGlzdFNlcnZpY2UsXHJcblx0XHRQbGF5bGlzdEl0ZW1Gb3JtU2VydmljZSxcclxuXHRcdFVSTFBhcnNlclNlcnZpY2UsXHJcblx0XHRVUkxWYWxpZGF0b3JTZXJ2aWNlXHJcblx0KSB7XHJcblx0XHRyZXR1cm4gbmV3IFBsYXlsaXN0SXRlbUZvcm0oXHJcblx0XHRcdFBsYXlsaXN0U2VydmljZSxcclxuXHRcdFx0UGxheWxpc3RJdGVtRm9ybVNlcnZpY2UsXHJcblx0XHRcdFVSTFBhcnNlclNlcnZpY2UsXHJcblx0XHRcdFVSTFZhbGlkYXRvclNlcnZpY2VcclxuXHRcdCk7XHJcblx0fVxyXG59XHJcblBsYXlsaXN0SXRlbUZvcm0uZXhwb3J0LiRpbmplY3QgPSBbXHJcblx0J1BsYXlsaXN0U2VydmljZScsXHJcblx0J1BsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlJyxcclxuXHQnVVJMUGFyc2VyU2VydmljZScsXHJcblx0J1VSTFZhbGlkYXRvclNlcnZpY2UnLFxyXG5dO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5bGlzdEl0ZW1Gb3JtLmV4cG9ydDtcclxuIiwidmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxuXHJcblxyXG5jbGFzcyBQbGF5bGlzdEl0ZW1Gb3JtU2VydmljZSB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLmlkID0gbnVsbDtcclxuXHRcdHRoaXMubmFtZSA9IG51bGw7XHJcblx0XHR0aGlzLnVybCA9IG51bGw7XHJcblx0fVxyXG5cdGdldFZhbHVlcygpIHtcclxuXHRcdGxldCBpdGVtID0ge307XHJcblx0XHRfLmZvck93bih0aGlzLCAodmFsdWUsIGtleSkgPT4ge1xyXG5cdFx0XHRfLnNldChpdGVtLCBrZXksIHZhbHVlKTtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIGl0ZW07XHJcblx0fVxyXG5cdHNldFZhbHVlcyhpdGVtKSB7XHJcblx0XHRfLmZvck93bihpdGVtLCAodmFsdWUsIGtleSkgPT4ge1xyXG5cdFx0XHRpZiAoXy5oYXModGhpcywga2V5KSkge1xyXG5cdFx0XHRcdF8uc2V0KHRoaXMsIGtleSwgdmFsdWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblx0Y2xlYXIoKSB7XHJcblx0XHRfLmZvck93bih0aGlzLCAodmFsdWUsIGtleSkgPT4ge1xyXG5cdFx0XHRpZiAoa2V5ICE9ICdpZCcpIHtcclxuXHRcdFx0XHRfLnNldCh0aGlzLCBrZXksIG51bGwpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblx0cmVzZXQoKSB7XHJcblx0XHRfLmZvck93bih0aGlzLCAodmFsdWUsIGtleSkgPT4ge1xyXG5cdFx0XHRfLnNldCh0aGlzLCBrZXksIG51bGwpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLiRpbmplY3QgPSBbXTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlO1xyXG4iLCJ2YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG5cclxuXHJcbmNsYXNzIFBsYXlsaXN0SXRlbSB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLmlkID0gbnVsbDtcclxuXHRcdHRoaXMubmFtZSA9IG51bGw7XHJcblx0XHR0aGlzLnVybCA9IG51bGw7XHJcblx0XHR0aGlzLnNlYXNvbiA9IG51bGw7XHJcblx0XHR0aGlzLmVwaXNvZGUgPSBudWxsO1xyXG5cdH1cclxuXHR1cGRhdGUoZGF0YSkge1xyXG5cdFx0Xy5mb3JPd24oZGF0YSwgKHZhbHVlLCBrZXkpID0+IHtcclxuXHRcdFx0aWYgKF8uaGFzKHRoaXMsIGtleSkpIHtcclxuXHRcdFx0XHRfLnNldCh0aGlzLCBrZXksIHZhbHVlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBQbGF5bGlzdFNlcnZpY2Uge1xyXG5cdGNvbnN0cnVjdG9yKCRyb290U2NvcGUpIHtcclxuXHRcdHRoaXMudWlkID0gMTtcclxuXHRcdHRoaXMuaXRlbXMgPSBbXTtcclxuXHRcdHRoaXMubG9hZCgpO1xyXG5cdFx0dGhpcy4kcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuXHR9XHJcblx0bG9hZCgpIHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KCdwbGF5bGlzdCcsIChzdG9yYWdlKSA9PiB7XHJcblx0XHRcdFx0dGhpcy4kcm9vdFNjb3BlLiRhcHBseSgoKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLml0ZW1zID0gSlNPTi5wYXJzZShzdG9yYWdlWydwbGF5bGlzdCddKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9IGNhdGNoKGUpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJGYWlsZWQgbG9hZGluZyBkYXRhLlwiLCBlKTtcclxuXHRcdH1cclxuXHR9XHJcblx0c2F2ZSgpIHtcclxuXHRcdGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHtwbGF5bGlzdDogSlNPTi5zdHJpbmdpZnkodGhpcy5pdGVtcyl9LCAoKSA9PiB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiU2F2ZWQgSXRlbXM6IFwiLCB0aGlzLml0ZW1zKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHRzYXZlSXRlbShpdGVtRGF0YSkge1xyXG5cdFx0aWYgKGl0ZW1EYXRhLmlkKSB7XHJcblx0XHRcdGNvbnN0IGl0ZW0gPSB0aGlzLmdldEl0ZW0oaXRlbURhdGEuaWQpO1xyXG5cdFx0XHRpdGVtLnVwZGF0ZShpdGVtRGF0YSk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGNvbnN0IGl0ZW0gPSBuZXcgUGxheWxpc3RJdGVtKCk7XHJcblx0XHRpdGVtRGF0YS5pZCA9IHRoaXMudWlkKys7XHJcblx0XHRpdGVtLnVwZGF0ZShpdGVtRGF0YSk7XHJcblx0XHR0aGlzLml0ZW1zLnB1c2goaXRlbSk7XHJcblx0XHR0aGlzLnNhdmUoKTtcclxuXHR9XHJcblx0Z2V0SXRlbShpZCkge1xyXG5cdFx0cmV0dXJuIF8uZmluZCh0aGlzLml0ZW1zLCB7aWQ6IGlkfSk7XHJcblx0fVxyXG5cdGRlbGV0ZUl0ZW0oaWQpIHtcclxuXHRcdF8ucmVtb3ZlKHRoaXMuaXRlbXMsIHtpZDogaWR9KTtcclxuXHRcdHRoaXMuc2F2ZSgpO1xyXG5cdH1cclxuXHRsaXN0KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaXRlbXM7XHJcblx0fVxyXG59XHJcblBsYXlsaXN0U2VydmljZS4kaW5qZWN0ID0gWyckcm9vdFNjb3BlJ107XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5bGlzdFNlcnZpY2U7XHJcbiIsInZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcblxyXG5cclxuY2xhc3MgVVJMIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMuY29tcG9uZW50cyA9IFtdO1xyXG5cdFx0dGhpcy5tYXRjaGVzID0gW107XHJcblx0fVxyXG5cdGFkZENvbXBvbmVudChjb21wb25lbnQpIHtcclxuXHRcdHRoaXMuY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XHJcblx0fVxyXG5cdGFkZE1hdGNoKGNvbXBvbmVudCkge1xyXG5cdFx0dGhpcy5tYXRjaGVzLnB1c2goY29tcG9uZW50KTtcclxuXHR9XHJcblx0aXNNYXRjaChjb21wb25lbnQpIHtcclxuXHRcdHJldHVybiBfLmluY2x1ZGVzKHRoaXMubWF0Y2hlcywgY29tcG9uZW50KTtcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFVSTFBhcnNlclNlcnZpY2Uge1xyXG5cdGNyZWF0ZVVSTChzdHJpbmcpIHtcclxuXHRcdGNvbnN0IHJlZ2V4ID0gLyguKz8pKFxcZCspL2c7XHJcblx0XHRjb25zdCB1cmwgPSBuZXcgVVJMKCk7XHJcblxyXG5cdFx0bGV0IHBpZWNlcztcclxuXHRcdGxldCBsYXN0SW5kZXggPSAwO1xyXG5cdFx0d2hpbGUgKChwaWVjZXMgPSByZWdleC5leGVjKHN0cmluZykpICE9PSBudWxsKSB7XHJcblx0XHRcdGNvbnN0IHBhcnNlZCA9IHBpZWNlc1swXTtcclxuXHRcdFx0Y29uc3QgY29tcG9uZW50ID0gcGllY2VzWzFdO1xyXG5cdFx0XHRjb25zdCBtYXRjaCA9IHBpZWNlc1syXTtcclxuXHRcdFx0bGFzdEluZGV4ID0gcGllY2VzWydpbmRleCddICsgcGFyc2VkLmxlbmd0aDtcclxuXHJcblx0XHRcdHVybC5hZGRDb21wb25lbnQoY29tcG9uZW50KTtcclxuXHRcdFx0dXJsLmFkZENvbXBvbmVudChtYXRjaCk7XHJcblx0XHRcdHVybC5hZGRNYXRjaChtYXRjaCk7XHJcblx0XHR9XHJcblx0XHRpZiAobGFzdEluZGV4IDwgc3RyaW5nLmxlbmd0aCAtIDEpIHtcclxuXHRcdFx0Y29uc3QgcmVtYWluID0gc3RyaW5nLnN1YnN0cmluZyhsYXN0SW5kZXgsIHN0cmluZy5sZW5ndGgpO1xyXG5cdFx0XHR1cmwuYWRkQ29tcG9uZW50KHJlbWFpbik7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdXJsO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBVUkxQYXJzZXJTZXJ2aWNlO1xyXG4iLCJjbGFzcyBVUkxWYWxpZGF0b3JTZXJ2aWNlIHtcclxuXHRjb25zdHJ1Y3RvcigkaHR0cCkge1xyXG5cdFx0dGhpcy4kaHR0cCA9ICRodHRwO1xyXG5cdH1cclxuXHRpc1ZhbGlkKHVybCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuJGh0dHAuZ2V0KHVybCkudGhlbigoKSA9PiB0cnVlLCAoKSA9PiBmYWxzZSk7XHJcblx0fVxyXG59XHJcblVSTFZhbGlkYXRvclNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnXTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFVSTFZhbGlkYXRvclNlcnZpY2U7XHJcbiJdfQ==
