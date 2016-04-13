(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var app = require('./app');

var PlaylistController = function () {
	function PlaylistController(PlaylistService, PlaylistItemFormService) {
		_classCallCheck(this, PlaylistController);

		this.listItems = PlaylistService.list();
		this.selectedItem = null;
		this.visiblePlaylist = true;
		this.visibleSeriesForm = false;

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
			this.PlaylistService.save(itemData);
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
	function PlaylistService() {
		_classCallCheck(this, PlaylistService);

		this.uid = 1;
		this.items = [];
	}

	_createClass(PlaylistService, [{
		key: 'save',
		value: function save(itemData) {
			if (itemData.id) {
				var _item = this.get(itemData.id);
				_item.update(itemData);
				return;
			}
			var item = new PlaylistItem();
			itemData.id = this.uid++;
			item.update(itemData);
			this.items.push(item);
		}
	}, {
		key: 'get',
		value: function get(id) {
			return _.find(this.items, { id: id });
		}
	}, {
		key: 'delete',
		value: function _delete(id) {
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

PlaylistService.$inject = [];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzXFxQbGF5bGlzdENvbnRyb2xsZXIuanMiLCJzcmNcXGpzXFxhcHAuanMiLCJzcmNcXGpzXFxkaXJlY3RpdmVzXFxQbGF5bGlzdEl0ZW1Gb3JtLmpzIiwic3JjXFxqc1xcc2VydmljZXNcXFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLmpzIiwic3JjXFxqc1xcc2VydmljZXNcXFBsYXlsaXN0U2VydmljZS5qcyIsInNyY1xcanNcXHNlcnZpY2VzXFxVUkxWYWxpZGF0b3JTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUEsSUFBSSxNQUFNLFFBQVEsT0FBUixDQUFOOztJQUdFO0FBQ0wsVUFESyxrQkFDTCxDQUNDLGVBREQsRUFFQyx1QkFGRCxFQUdFO3dCQUpHLG9CQUlIOztBQUNELE9BQUssU0FBTCxHQUFpQixnQkFBZ0IsSUFBaEIsRUFBakIsQ0FEQztBQUVELE9BQUssWUFBTCxHQUFvQixJQUFwQixDQUZDO0FBR0QsT0FBSyxlQUFMLEdBQXVCLElBQXZCLENBSEM7QUFJRCxPQUFLLGlCQUFMLEdBQXlCLEtBQXpCLENBSkM7O0FBTUQsT0FBSyx1QkFBTCxHQUErQix1QkFBL0IsQ0FOQztFQUhGOztjQURLOzs0QkFZSztBQUNULFFBQUssdUJBQUwsQ0FBNkIsS0FBN0IsR0FEUztBQUVULFFBQUssaUJBQUwsR0FGUzs7OzsyQkFJRCxNQUFNO0FBQ2QsUUFBSyx1QkFBTCxDQUE2QixTQUE3QixDQUF1QyxJQUF2QyxFQURjO0FBRWQsUUFBSyxpQkFBTCxHQUZjOzs7O29DQUlHO0FBQ2pCLFFBQUssZUFBTCxHQUF1QixJQUF2QixDQURpQjtBQUVqQixRQUFLLGlCQUFMLEdBQXlCLEtBQXpCLENBRmlCOzs7O3NDQUlFO0FBQ25CLFFBQUssZUFBTCxHQUF1QixLQUF2QixDQURtQjtBQUVuQixRQUFL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QURLOzswQkFJRyxLQUFLO0FBQ1osVUFBTyxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsR0FBZixFQUFvQixJQUFwQixDQUF5QjtXQUFNO0lBQU4sRUFBWTtXQUFNO0lBQU4sQ0FBNUMsQ0FEWTs7OztRQUpSOzs7QUFRTixvQkFBb0IsT0FBcEIsR0FBOEIsQ0FBQyxPQUFELENBQTlCOztBQUdBLE9BQU8sT0FBUCxHQUFpQixtQkFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGFwcCA9IHJlcXVpcmUoJy4vYXBwJyk7XHJcblxyXG5cclxuY2xhc3MgUGxheWxpc3RDb250cm9sbGVyIHtcclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdFBsYXlsaXN0U2VydmljZSxcclxuXHRcdFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlXHJcblx0KSB7XHJcblx0XHR0aGlzLmxpc3RJdGVtcyA9IFBsYXlsaXN0U2VydmljZS5saXN0KCk7XHJcblx0XHR0aGlzLnNlbGVjdGVkSXRlbSA9IG51bGw7XHJcblx0XHR0aGlzLnZpc2libGVQbGF5bGlzdCA9IHRydWU7XHJcblx0XHR0aGlzLnZpc2libGVTZXJpZXNGb3JtID0gZmFsc2U7XHJcblxyXG5cdFx0dGhpcy5QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZSA9IFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlO1xyXG5cdH1cclxuXHRhZGRJdGVtKCkge1xyXG5cdFx0dGhpcy5QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZS5jbGVhcigpO1xyXG5cdFx0dGhpcy5kaXNwbGF5U2VyaWVzRm9ybSgpO1xyXG5cdH1cclxuXHRlZGl0SXRlbShpdGVtKSB7XHJcblx0XHR0aGlzLlBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLnNldFZhbHVlcyhpdGVtKTtcclxuXHRcdHRoaXMuZGlzcGxheVNlcmllc0Zvcm0oKTtcclxuXHR9XHJcblx0ZGlzcGxheVBsYXlsaXN0KCkge1xyXG5cdFx0dGhpcy52aXNpYmxlUGxheWxpc3QgPSB0cnVlO1xyXG5cdFx0dGhpcy52aXNpYmxlU2VyaWVzRm9ybSA9IGZhbHNlO1xyXG5cdH1cclxuXHRkaXNwbGF5U2VyaWVzRm9ybSgpIHtcclxuXHRcdHRoaXMudmlzaWJsZVBsYXlsaXN0ID0gZmFsc2U7XHJcblx0XHR0aGlzLnZpc2libGVTZXJpZXNGb3JtID0gdHJ1ZTtcclxuXHR9XHJcbn1cclxuXHJcblBsYXlsaXN0Q29udHJvbGxlci4kaW5qZWN0ID0gW1xyXG5cdCdQbGF5bGlzdFNlcnZpY2UnLFxyXG5cdCdQbGF5bGlzdEl0ZW1Gb3JtU2VydmljZScsXHJcbl07XHJcblxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGxheWxpc3RDb250cm9sbGVyO1xyXG4iLCJ2YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG5cclxuXHJcbi8vIERlZmluZSB0aGUgQW5ndWxhciBBcHBcclxudmFyIGRlcGVuZGVuY2llcyA9IFsnbXVpJ107XHJcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnUGxheWxpc3RUcmFja2VyRXgnLCBkZXBlbmRlbmNpZXMpO1xyXG5cclxuLy8gRGVmaW5lIHRoZSBDb250cm9sbGVyc1xyXG5hcHAuY29udHJvbGxlcignUGxheWxpc3RDb250cm9sbGVyJywgcmVxdWlyZSgnLi9QbGF5bGlzdENvbnRyb2xsZXInKSk7XHJcblxyXG4vLyBEZWZpbmUgdGhlIFNlcnZpY2VzXHJcbmFwcC5zZXJ2aWNlKCdQbGF5bGlzdFNlcnZpY2UnLCByZXF1aXJlKCcuL3NlcnZpY2VzL1BsYXlsaXN0U2VydmljZScpKTtcclxuYXBwLnNlcnZpY2UoJ1BsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZScpKTtcclxuYXBwLnNlcnZpY2UoJ1VSTFZhbGlkYXRvclNlcnZpY2UnLCByZXF1aXJlKCcuL3NlcnZpY2VzL1VSTFZhbGlkYXRvclNlcnZpY2UnKSk7XHJcblxyXG4vLyBEZWZpbmUgdGhlIERpcmVjdGl2ZXNcclxuYXBwLmRpcmVjdGl2ZSgncGxheWxpc3RJdGVtRm9ybScsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9QbGF5bGlzdEl0ZW1Gb3JtJykpO1xyXG5cclxuXHJcbmFuZ3VsYXIuYm9vdHN0cmFwKGRvY3VtZW50LCBbJ1BsYXlsaXN0VHJhY2tlckV4J10pO1xyXG4iLCJjbGFzcyBQbGF5bGlzdEl0ZW1Gb3JtIHtcclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdFBsYXlsaXN0U2VydmljZSxcclxuXHRcdFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLFxyXG5cdFx0VVJMVmFsaWRhdG9yU2VydmljZVxyXG5cdCkge1xyXG5cdFx0dGhpcy5yZXN0cmljdCA9IFwiRVwiO1xyXG5cdFx0dGhpcy50ZW1wbGF0ZVVybCA9IFwidGVtcGxhdGVzL3BsYXlsaXN0X2l0ZW1fZm9ybS5odG1sXCI7XHJcblx0XHR0aGlzLnNjb3BlID0ge307XHJcblx0XHR0aGlzLnJlcGxhY2UgPSB0cnVlO1xyXG5cdFx0dGhpcy5saW5rID0gdGhpcy5saW5rLmJpbmQodGhpcyk7XHJcblxyXG5cdFx0dGhpcy5QbGF5bGlzdFNlcnZpY2UgPSBQbGF5bGlzdFNlcnZpY2U7XHJcblx0XHR0aGlzLlBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlID0gUGxheWxpc3RJdGVtRm9ybVNlcnZpY2U7XHJcblx0XHR0aGlzLlVSTFZhbGlkYXRvclNlcnZpY2UgPSBVUkxWYWxpZGF0b3JTZXJ2aWNlO1xyXG5cdH1cclxuXHRjbGVhcigpIHtcclxuXHRcdHRoaXMuUGxheWxpc3RJdGVtRm9ybVNlcnZpY2UuY2xlYXIoKTtcclxuXHR9XHJcblx0c2F2ZSgpIHtcclxuXHRcdGNvbnN0IHVybCA9IHRoaXMuUGxheWxpc3RJdGVtRm9ybVNlcnZpY2UudXJsO1xyXG5cdFx0Y29uc3QgaXRlbURhdGEgPSB0aGlzLlBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLmdldFZhbHVlcygpO1xyXG5cdFx0dGhpcy5QbGF5bGlzdFNlcnZpY2Uuc2F2ZShpdGVtRGF0YSk7XHJcblx0XHR0aGlzLmNsZWFyKCk7XHJcblx0fVxyXG5cdGxpbmsoJHNjb3BlKSB7XHJcblx0XHR0aGlzLiRzY29wZSA9ICRzY29wZTtcclxuXHRcdHRoaXMuJHNjb3BlLlBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlID0gdGhpcy5QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZTtcclxuXHRcdHRoaXMuJHNjb3BlLmNsZWFyID0gdGhpcy5jbGVhci5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy4kc2NvcGUuc2F2ZSA9IHRoaXMuc2F2ZS5iaW5kKHRoaXMpO1xyXG5cdH1cclxuXHRzdGF0aWMgZXhwb3J0KFxyXG5cdFx0UGxheWxpc3RTZXJ2aWNlLFxyXG5cdFx0UGxheWxpc3RJdGVtRm9ybVNlcnZpY2UsXHJcblx0XHRVUkxWYWxpZGF0b3JTZXJ2aWNlXHJcblx0KSB7XHJcblx0XHRyZXR1cm4gbmV3IFBsYXlsaXN0SXRlbUZvcm0oXHJcblx0XHRcdFBsYXlsaXN0U2VydmljZSxcclxuXHRcdFx0UGxheWxpc3RJdGVtRm9ybVNlcnZpY2UsXHJcblx0XHRcdFVSTFZhbGlkYXRvclNlcnZpY2VcclxuXHRcdCk7XHJcblx0fVxyXG59XHJcblBsYXlsaXN0SXRlbUZvcm0uZXhwb3J0LiRpbmplY3QgPSBbXHJcblx0J1BsYXlsaXN0U2VydmljZScsXHJcblx0J1BsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlJyxcclxuXHQnVVJMVmFsaWRhdG9yU2VydmljZScsXHJcbl07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXlsaXN0SXRlbUZvcm0uZXhwb3J0O1xyXG4iLCJ2YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG5cclxuXHJcbmNsYXNzIFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMuaWQgPSBudWxsO1xyXG5cdFx0dGhpcy5uYW1lID0gbnVsbDtcclxuXHRcdHRoaXMudXJsID0gbnVsbDtcclxuXHR9XHJcblx0Z2V0VmFsdWVzKCkge1xyXG5cdFx0bGV0IGl0ZW0gPSB7fTtcclxuXHRcdF8uZm9yT3duKHRoaXMsICh2YWx1ZSwga2V5KSA9PiB7XHJcblx0XHRcdF8uc2V0KGl0ZW0sIGtleSwgdmFsdWUpO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gaXRlbTtcclxuXHR9XHJcblx0c2V0VmFsdWVzKGl0ZW0pIHtcclxuXHRcdF8uZm9yT3duKGl0ZW0sICh2YWx1ZSwga2V5KSA9PiB7XHJcblx0XHRcdGlmIChfLmhhcyh0aGlzLCBrZXkpKSB7XHJcblx0XHRcdFx0Xy5zZXQodGhpcywga2V5LCB2YWx1ZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHRjbGVhcigpIHtcclxuXHRcdF8uZm9yT3duKHRoaXMsICh2YWx1ZSwga2V5KSA9PiB7XHJcblx0XHRcdGlmIChrZXkgIT0gJ2lkJykge1xyXG5cdFx0XHRcdF8uc2V0KHRoaXMsIGtleSwgbnVsbCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHRyZXNldCgpIHtcclxuXHRcdF8uZm9yT3duKHRoaXMsICh2YWx1ZSwga2V5KSA9PiB7XHJcblx0XHRcdF8uc2V0KHRoaXMsIGtleSwgbnVsbCk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuUGxheWxpc3RJdGVtRm9ybVNlcnZpY2UuJGluamVjdCA9IFtdO1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGxheWxpc3RJdGVtRm9ybVNlcnZpY2U7XHJcbiIsInZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcblxyXG5cclxuY2xhc3MgUGxheWxpc3RJdGVtIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMuaWQgPSBudWxsO1xyXG5cdFx0dGhpcy5uYW1lID0gbnVsbDtcclxuXHRcdHRoaXMudXJsID0gbnVsbDtcclxuXHR9XHJcblx0dXBkYXRlKGRhdGEpIHtcclxuXHRcdF8uZm9yT3duKGRhdGEsICh2YWx1ZSwga2V5KSA9PiB7XHJcblx0XHRcdGlmIChfLmhhcyh0aGlzLCBrZXkpKSB7XHJcblx0XHRcdFx0Xy5zZXQodGhpcywga2V5LCB2YWx1ZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgUGxheWxpc3RTZXJ2aWNlIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMudWlkID0gMTtcclxuXHRcdHRoaXMuaXRlbXMgPSBbXTtcclxuXHR9XHJcblx0c2F2ZShpdGVtRGF0YSkge1xyXG5cdFx0aWYgKGl0ZW1EYXRhLmlkKSB7XHJcblx0XHRcdGNvbnN0IGl0ZW0gPSB0aGlzLmdldChpdGVtRGF0YS5pZCk7XHJcblx0XHRcdGl0ZW0udXBkYXRlKGl0ZW1EYXRhKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0Y29uc3QgaXRlbSA9IG5ldyBQbGF5bGlzdEl0ZW0oKTtcclxuXHRcdGl0ZW1EYXRhLmlkID0gdGhpcy51aWQrKztcclxuXHRcdGl0ZW0udXBkYXRlKGl0ZW1EYXRhKTtcclxuXHRcdHRoaXMuaXRlbXMucHVzaChpdGVtKTtcclxuXHR9XHJcblx0Z2V0KGlkKSB7XHJcblx0XHRyZXR1cm4gXy5maW5kKHRoaXMuaXRlbXMsIHtpZDogaWR9KTtcclxuXHR9XHJcblx0ZGVsZXRlKGlkKSB7XHJcblx0XHRfLnJlbW92ZSh0aGlzLml0ZW1zLCB7aWQ6IGlkfSk7XHJcblx0fVxyXG5cdGxpc3QoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5pdGVtcztcclxuXHR9XHJcbn1cclxuUGxheWxpc3RTZXJ2aWNlLiRpbmplY3QgPSBbXTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXlsaXN0U2VydmljZTtcclxuIiwiY2xhc3MgVVJMVmFsaWRhdG9yU2VydmljZSB7XHJcblx0Y29uc3RydWN0b3IoJGh0dHApIHtcclxuXHRcdHRoaXMuJGh0dHAgPSAkaHR0cDtcclxuXHR9XHJcblx0aXNWYWxpZCh1cmwpIHtcclxuXHRcdHJldHVybiB0aGlzLiRodHRwLmdldCh1cmwpLnRoZW4oKCkgPT4gdHJ1ZSwgKCkgPT4gZmFsc2UpO1xyXG5cdH1cclxufVxyXG5VUkxWYWxpZGF0b3JTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJ107XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBVUkxWYWxpZGF0b3JTZXJ2aWNlO1xyXG4iXX0=
