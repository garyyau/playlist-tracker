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
app.service('PlaylistService', require('./services/PlaylistService'));
app.service('PlaylistItemFormService', require('./services/PlaylistItemFormService'));
app.service('URLValidatorService', require('./services/URLValidatorService'));

// Define the Directives
app.directive('playlistItemForm', require('./directives/PlaylistItemForm'));

angular.bootstrap(document, ['PlaylistTrackerEx']);

},{"./PlaylistController":1,"./directives/PlaylistItemForm":3,"./services/PlaylistItemFormService":4,"./services/PlaylistService":5,"./services/URLValidatorService":6,"lodash":undefined}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlaylistItemForm = function () {
	function PlaylistItemForm(PlaylistService, PlaylistItemFormService, URLValidatorService) {
		_classCallCheck(this, PlaylistItemForm);

		this.restrict = "E";
		this.templateUrl = "templates/playlist_item_form.html";
		this.scope = {};
		this.replace = true;
		this.link = this.link.bind(this);

		this.PlaylistService = PlaylistService;
		this.PlaylistItemFormService = PlaylistItemFormService;
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
			var url = this.PlaylistItemFormService.url;
			var itemData = this.PlaylistItemFormService.getValues();
			this.PlaylistService.saveItem(itemData);
			this.clear();
		}
	}, {
		key: "link",
		value: function link($scope) {
			this.$scope = $scope;
			this.$scope.PlaylistItemFormService = this.PlaylistItemFormService;
			this.$scope.clear = this.clear.bind(this);
			this.$scope.save = this.save.bind(this);
		}
	}], [{
		key: "export",
		value: function _export(PlaylistService, PlaylistItemFormService, URLValidatorService) {
			return new PlaylistItemForm(PlaylistService, PlaylistItemFormService, URLValidatorService);
		}
	}]);

	return PlaylistItemForm;
}();

PlaylistItemForm.export.$inject = ['PlaylistService', 'PlaylistItemFormService', 'URLValidatorService'];

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
						console.log(_this2.items);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzXFxQbGF5bGlzdENvbnRyb2xsZXIuanMiLCJzcmNcXGpzXFxhcHAuanMiLCJzcmNcXGpzXFxkaXJlY3RpdmVzXFxQbGF5bGlzdEl0ZW1Gb3JtLmpzIiwic3JjXFxqc1xcc2VydmljZXNcXFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLmpzIiwic3JjXFxqc1xcc2VydmljZXNcXFBsYXlsaXN0U2VydmljZS5qcyIsInNyY1xcanNcXHNlcnZpY2VzXFxVUkxWYWxpZGF0b3JTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUEsSUFBSSxNQUFNLFFBQVEsT0FBUixDQUFOOztJQUdFO0FBQ0wsVUFESyxrQkFDTCxDQUNDLGVBREQsRUFFQyx1QkFGRCxFQUdFO3dCQUpHLG9CQUlIOztBQUNELE9BQUssWUFBTCxHQUFvQixJQUFwQixDQURDO0FBRUQsT0FBSyxlQUFMLEdBQXVCLElBQXZCLENBRkM7QUFHRCxPQUFLLGlCQUFMLEdBQXlCLEtBQXpCLENBSEM7O0FBS0QsT0FBSyxlQUFMLEdBQXVCLGVBQXZCLENBTEM7QUFNRCxPQUFLLHVCQUFMLEdBQStCLHVCQUEvQixDQU5DO0VBSEY7O2NBREs7OzRCQVlLO0FBQ1QsUUFBSyx1QkFBTCxDQUE2QixLQUE3QixHQURTO0FBRVQsUUFBSyxpQkFBTCxHQUZTOzs7OzJCQUlELE1BQU07QUFDZCxRQUFLLHVCQUFMLENBQTZCLFNBQTdCLENBQXVDLElBQXZDLEVBRGM7QUFFZCxRQUFLLGlCQUFMLEdBRmM7Ozs7aUNBSUE7QUFDZCxVQUFPLEtBQUssZUFBTCxDQUFxQixJQUFyQixFQUFQLENBRGM7Ozs7b0NBR0c7QUFDakIsUUFBSyxlQUFMLEdBQXVCLElBQXZCLENBRGlCO0FBRWpCLFFBQUssaUJBQUwsR0FBeUIsS0FBekIsQ0FGaUI7Ozs7c0NBSUU7QUFDbkIs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LCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBhcHAgPSByZXF1aXJlKCcuL2FwcCcpO1xyXG5cclxuXHJcbmNsYXNzIFBsYXlsaXN0Q29udHJvbGxlciB7XHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRQbGF5bGlzdFNlcnZpY2UsXHJcblx0XHRQbGF5bGlzdEl0ZW1Gb3JtU2VydmljZVxyXG5cdCkge1xyXG5cdFx0dGhpcy5zZWxlY3RlZEl0ZW0gPSBudWxsO1xyXG5cdFx0dGhpcy52aXNpYmxlUGxheWxpc3QgPSB0cnVlO1xyXG5cdFx0dGhpcy52aXNpYmxlU2VyaWVzRm9ybSA9IGZhbHNlO1xyXG5cclxuXHRcdHRoaXMuUGxheWxpc3RTZXJ2aWNlID0gUGxheWxpc3RTZXJ2aWNlO1xyXG5cdFx0dGhpcy5QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZSA9IFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlO1xyXG5cdH1cclxuXHRhZGRJdGVtKCkge1xyXG5cdFx0dGhpcy5QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZS5jbGVhcigpO1xyXG5cdFx0dGhpcy5kaXNwbGF5U2VyaWVzRm9ybSgpO1xyXG5cdH1cclxuXHRlZGl0SXRlbShpdGVtKSB7XHJcblx0XHR0aGlzLlBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLnNldFZhbHVlcyhpdGVtKTtcclxuXHRcdHRoaXMuZGlzcGxheVNlcmllc0Zvcm0oKTtcclxuXHR9XHJcblx0Z2V0TGlzdEl0ZW1zKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuUGxheWxpc3RTZXJ2aWNlLmxpc3QoKTtcclxuXHR9XHJcblx0ZGlzcGxheVBsYXlsaXN0KCkge1xyXG5cdFx0dGhpcy52aXNpYmxlUGxheWxpc3QgPSB0cnVlO1xyXG5cdFx0dGhpcy52aXNpYmxlU2VyaWVzRm9ybSA9IGZhbHNlO1xyXG5cdH1cclxuXHRkaXNwbGF5U2VyaWVzRm9ybSgpIHtcclxuXHRcdHRoaXMudmlzaWJsZVBsYXlsaXN0ID0gZmFsc2U7XHJcblx0XHR0aGlzLnZpc2libGVTZXJpZXNGb3JtID0gdHJ1ZTtcclxuXHR9XHJcbn1cclxuXHJcblBsYXlsaXN0Q29udHJvbGxlci4kaW5qZWN0ID0gW1xyXG5cdCdQbGF5bGlzdFNlcnZpY2UnLFxyXG5cdCdQbGF5bGlzdEl0ZW1Gb3JtU2VydmljZScsXHJcbl07XHJcblxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGxheWxpc3RDb250cm9sbGVyO1xyXG4iLCJ2YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG5cclxuXHJcbi8vIERlZmluZSB0aGUgQW5ndWxhciBBcHBcclxudmFyIGRlcGVuZGVuY2llcyA9IFsnbXVpJ107XHJcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnUGxheWxpc3RUcmFja2VyRXgnLCBkZXBlbmRlbmNpZXMpO1xyXG5cclxuLy8gRGVmaW5lIHRoZSBDb250cm9sbGVyc1xyXG5hcHAuY29udHJvbGxlcignUGxheWxpc3RDb250cm9sbGVyJywgcmVxdWlyZSgnLi9QbGF5bGlzdENvbnRyb2xsZXInKSk7XHJcblxyXG4vLyBEZWZpbmUgdGhlIFNlcnZpY2VzXHJcbmFwcC5zZXJ2aWNlKCdQbGF5bGlzdFNlcnZpY2UnLCByZXF1aXJlKCcuL3NlcnZpY2VzL1BsYXlsaXN0U2VydmljZScpKTtcclxuYXBwLnNlcnZpY2UoJ1BsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZScpKTtcclxuYXBwLnNlcnZpY2UoJ1VSTFZhbGlkYXRvclNlcnZpY2UnLCByZXF1aXJlKCcuL3NlcnZpY2VzL1VSTFZhbGlkYXRvclNlcnZpY2UnKSk7XHJcblxyXG4vLyBEZWZpbmUgdGhlIERpcmVjdGl2ZXNcclxuYXBwLmRpcmVjdGl2ZSgncGxheWxpc3RJdGVtRm9ybScsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9QbGF5bGlzdEl0ZW1Gb3JtJykpO1xyXG5cclxuXHJcbmFuZ3VsYXIuYm9vdHN0cmFwKGRvY3VtZW50LCBbJ1BsYXlsaXN0VHJhY2tlckV4J10pO1xyXG4iLCJjbGFzcyBQbGF5bGlzdEl0ZW1Gb3JtIHtcclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdFBsYXlsaXN0U2VydmljZSxcclxuXHRcdFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLFxyXG5cdFx0VVJMVmFsaWRhdG9yU2VydmljZVxyXG5cdCkge1xyXG5cdFx0dGhpcy5yZXN0cmljdCA9IFwiRVwiO1xyXG5cdFx0dGhpcy50ZW1wbGF0ZVVybCA9IFwidGVtcGxhdGVzL3BsYXlsaXN0X2l0ZW1fZm9ybS5odG1sXCI7XHJcblx0XHR0aGlzLnNjb3BlID0ge307XHJcblx0XHR0aGlzLnJlcGxhY2UgPSB0cnVlO1xyXG5cdFx0dGhpcy5saW5rID0gdGhpcy5saW5rLmJpbmQodGhpcyk7XHJcblxyXG5cdFx0dGhpcy5QbGF5bGlzdFNlcnZpY2UgPSBQbGF5bGlzdFNlcnZpY2U7XHJcblx0XHR0aGlzLlBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlID0gUGxheWxpc3RJdGVtRm9ybVNlcnZpY2U7XHJcblx0XHR0aGlzLlVSTFZhbGlkYXRvclNlcnZpY2UgPSBVUkxWYWxpZGF0b3JTZXJ2aWNlO1xyXG5cdH1cclxuXHRjbGVhcigpIHtcclxuXHRcdHRoaXMuUGxheWxpc3RJdGVtRm9ybVNlcnZpY2UuY2xlYXIoKTtcclxuXHR9XHJcblx0c2F2ZSgpIHtcclxuXHRcdGNvbnN0IHVybCA9IHRoaXMuUGxheWxpc3RJdGVtRm9ybVNlcnZpY2UudXJsO1xyXG5cdFx0Y29uc3QgaXRlbURhdGEgPSB0aGlzLlBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLmdldFZhbHVlcygpO1xyXG5cdFx0dGhpcy5QbGF5bGlzdFNlcnZpY2Uuc2F2ZUl0ZW0oaXRlbURhdGEpO1xyXG5cdFx0dGhpcy5jbGVhcigpO1xyXG5cdH1cclxuXHRsaW5rKCRzY29wZSkge1xyXG5cdFx0dGhpcy4kc2NvcGUgPSAkc2NvcGU7XHJcblx0XHR0aGlzLiRzY29wZS5QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZSA9IHRoaXMuUGxheWxpc3RJdGVtRm9ybVNlcnZpY2U7XHJcblx0XHR0aGlzLiRzY29wZS5jbGVhciA9IHRoaXMuY2xlYXIuYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuJHNjb3BlLnNhdmUgPSB0aGlzLnNhdmUuYmluZCh0aGlzKTtcclxuXHR9XHJcblx0c3RhdGljIGV4cG9ydChcclxuXHRcdFBsYXlsaXN0U2VydmljZSxcclxuXHRcdFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLFxyXG5cdFx0VVJMVmFsaWRhdG9yU2VydmljZVxyXG5cdCkge1xyXG5cdFx0cmV0dXJuIG5ldyBQbGF5bGlzdEl0ZW1Gb3JtKFxyXG5cdFx0XHRQbGF5bGlzdFNlcnZpY2UsXHJcblx0XHRcdFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLFxyXG5cdFx0XHRVUkxWYWxpZGF0b3JTZXJ2aWNlXHJcblx0XHQpO1xyXG5cdH1cclxufVxyXG5QbGF5bGlzdEl0ZW1Gb3JtLmV4cG9ydC4kaW5qZWN0ID0gW1xyXG5cdCdQbGF5bGlzdFNlcnZpY2UnLFxyXG5cdCdQbGF5bGlzdEl0ZW1Gb3JtU2VydmljZScsXHJcblx0J1VSTFZhbGlkYXRvclNlcnZpY2UnLFxyXG5dO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5bGlzdEl0ZW1Gb3JtLmV4cG9ydDtcclxuIiwidmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxuXHJcblxyXG5jbGFzcyBQbGF5bGlzdEl0ZW1Gb3JtU2VydmljZSB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLmlkID0gbnVsbDtcclxuXHRcdHRoaXMubmFtZSA9IG51bGw7XHJcblx0XHR0aGlzLnVybCA9IG51bGw7XHJcblx0fVxyXG5cdGdldFZhbHVlcygpIHtcclxuXHRcdGxldCBpdGVtID0ge307XHJcblx0XHRfLmZvck93bih0aGlzLCAodmFsdWUsIGtleSkgPT4ge1xyXG5cdFx0XHRfLnNldChpdGVtLCBrZXksIHZhbHVlKTtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIGl0ZW07XHJcblx0fVxyXG5cdHNldFZhbHVlcyhpdGVtKSB7XHJcblx0XHRfLmZvck93bihpdGVtLCAodmFsdWUsIGtleSkgPT4ge1xyXG5cdFx0XHRpZiAoXy5oYXModGhpcywga2V5KSkge1xyXG5cdFx0XHRcdF8uc2V0KHRoaXMsIGtleSwgdmFsdWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblx0Y2xlYXIoKSB7XHJcblx0XHRfLmZvck93bih0aGlzLCAodmFsdWUsIGtleSkgPT4ge1xyXG5cdFx0XHRpZiAoa2V5ICE9ICdpZCcpIHtcclxuXHRcdFx0XHRfLnNldCh0aGlzLCBrZXksIG51bGwpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblx0cmVzZXQoKSB7XHJcblx0XHRfLmZvck93bih0aGlzLCAodmFsdWUsIGtleSkgPT4ge1xyXG5cdFx0XHRfLnNldCh0aGlzLCBrZXksIG51bGwpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLiRpbmplY3QgPSBbXTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlO1xyXG4iLCJ2YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG5cclxuXHJcbmNsYXNzIFBsYXlsaXN0SXRlbSB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLmlkID0gbnVsbDtcclxuXHRcdHRoaXMubmFtZSA9IG51bGw7XHJcblx0XHR0aGlzLnVybCA9IG51bGw7XHJcblx0fVxyXG5cdHVwZGF0ZShkYXRhKSB7XHJcblx0XHRfLmZvck93bihkYXRhLCAodmFsdWUsIGtleSkgPT4ge1xyXG5cdFx0XHRpZiAoXy5oYXModGhpcywga2V5KSkge1xyXG5cdFx0XHRcdF8uc2V0KHRoaXMsIGtleSwgdmFsdWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFBsYXlsaXN0U2VydmljZSB7XHJcblx0Y29uc3RydWN0b3IoJHJvb3RTY29wZSkge1xyXG5cdFx0dGhpcy51aWQgPSAxO1xyXG5cdFx0dGhpcy5pdGVtcyA9IFtdO1xyXG5cdFx0dGhpcy5sb2FkKCk7XHJcblx0XHR0aGlzLiRyb290U2NvcGUgPSAkcm9vdFNjb3BlO1xyXG5cdH1cclxuXHRsb2FkKCkge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoJ3BsYXlsaXN0JywgKHN0b3JhZ2UpID0+IHtcclxuXHRcdFx0XHR0aGlzLiRyb290U2NvcGUuJGFwcGx5KCgpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuaXRlbXMgPSBKU09OLnBhcnNlKHN0b3JhZ2VbJ3BsYXlsaXN0J10pO1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5pdGVtcyk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSBjYXRjaChlKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiRmFpbGVkIGxvYWRpbmcgZGF0YS5cIiwgZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHNhdmUoKSB7XHJcblx0XHRjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7cGxheWxpc3Q6IEpTT04uc3RyaW5naWZ5KHRoaXMuaXRlbXMpfSwgKCkgPT4ge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIlNhdmVkIEl0ZW1zOiBcIiwgdGhpcy5pdGVtcyk7XHJcblx0XHR9KTtcclxuXHR9XHJcblx0c2F2ZUl0ZW0oaXRlbURhdGEpIHtcclxuXHRcdGlmIChpdGVtRGF0YS5pZCkge1xyXG5cdFx0XHRjb25zdCBpdGVtID0gdGhpcy5nZXRJdGVtKGl0ZW1EYXRhLmlkKTtcclxuXHRcdFx0aXRlbS51cGRhdGUoaXRlbURhdGEpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRjb25zdCBpdGVtID0gbmV3IFBsYXlsaXN0SXRlbSgpO1xyXG5cdFx0aXRlbURhdGEuaWQgPSB0aGlzLnVpZCsrO1xyXG5cdFx0aXRlbS51cGRhdGUoaXRlbURhdGEpO1xyXG5cdFx0dGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xyXG5cdFx0dGhpcy5zYXZlKCk7XHJcblx0fVxyXG5cdGdldEl0ZW0oaWQpIHtcclxuXHRcdHJldHVybiBfLmZpbmQodGhpcy5pdGVtcywge2lkOiBpZH0pO1xyXG5cdH1cclxuXHRkZWxldGVJdGVtKGlkKSB7XHJcblx0XHRfLnJlbW92ZSh0aGlzLml0ZW1zLCB7aWQ6IGlkfSk7XHJcblx0fVxyXG5cdGxpc3QoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5pdGVtcztcclxuXHR9XHJcbn1cclxuUGxheWxpc3RTZXJ2aWNlLiRpbmplY3QgPSBbJyRyb290U2NvcGUnXTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXlsaXN0U2VydmljZTtcclxuIiwiY2xhc3MgVVJMVmFsaWRhdG9yU2VydmljZSB7XHJcblx0Y29uc3RydWN0b3IoJGh0dHApIHtcclxuXHRcdHRoaXMuJGh0dHAgPSAkaHR0cDtcclxuXHR9XHJcblx0aXNWYWxpZCh1cmwpIHtcclxuXHRcdHJldHVybiB0aGlzLiRodHRwLmdldCh1cmwpLnRoZW4oKCkgPT4gdHJ1ZSwgKCkgPT4gZmFsc2UpO1xyXG5cdH1cclxufVxyXG5VUkxWYWxpZGF0b3JTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJ107XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBVUkxWYWxpZGF0b3JTZXJ2aWNlO1xyXG4iXX0=
