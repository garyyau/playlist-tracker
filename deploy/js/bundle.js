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
var palettes = require('./palettes');

// Define the Angular App
var dependencies = ['ngMaterial'];
var app = angular.module('PlaylistTrackerEx', dependencies);

// Configuration
app.config(function ($mdThemingProvider) {
	_.forOwn(palettes, function (value, key) {
		$mdThemingProvider.definePalette(key, value);
	});

	$mdThemingProvider.theme('default').primaryPalette('turquoise').accentPalette('cloudburst');
});

// Define the Controllers
app.controller('PlaylistController', require('./PlaylistController'));

// Define the Services
app.service('PlaylistService', require('./services/PlaylistService'));
app.service('PlaylistItemFormService', require('./services/PlaylistItemFormService'));
app.service('URLValidatorService', require('./services/URLValidatorService'));

// Define the Directives
app.directive('playlistItemForm', require('./directives/PlaylistItemForm'));

angular.bootstrap(document, ['PlaylistTrackerEx']);

},{"./PlaylistController":1,"./directives/PlaylistItemForm":3,"./palettes":4,"./services/PlaylistItemFormService":5,"./services/PlaylistService":6,"./services/URLValidatorService":7,"lodash":undefined}],3:[function(require,module,exports){
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
			this.URLValidatorService.isValid(url).then(function (valid) {
				console.log(valid);
				return;
			});
			return;
			var itemData = this.PlaylistItemFormService.getValues();
			console.log(itemData);
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

var turquoise = {
	'50': '#ffffff',
	'100': '#c7f4f3',
	'200': '#98ebe9',
	'300': '#5cdfdc',
	'400': '#43dad7',
	'500': '#2ad4d1',
	'600': '#25bab8',
	'700': '#20a19f',
	'800': '#1b8785',
	'900': '#166e6c',
	'A100': '#ffffff',
	'A200': '#c7f4f3',
	'A400': '#43dad7',
	'A700': '#20a19f',
	'contrastDefaultColor': 'light',
	'contrastDarkColors': '50 100 200 300 400 500 600 A100 A200 A400'
};

var cloudburst = {
	'50': '#95b1e1',
	'100': '#5984d0',
	'200': '#3566bc',
	'300': '#254885',
	'400': '#1f3b6d',
	'500': '#182e55',
	'600': '#11213d',
	'700': '#0b1425',
	'800': '#04070d',
	'900': '#000000',
	'A100': '#95b1e1',
	'A200': '#5984d0',
	'A400': '#1f3b6d',
	'A700': '#0b1425',
	'contrastDefaultColor': 'light',
	'contrastDarkColors': '50 A100'
};

module.exports = {
	turquoise: turquoise,
	cloudburst: cloudburst
};

},{}],5:[function(require,module,exports){
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

},{"lodash":undefined}],6:[function(require,module,exports){
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
			console.log(url);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzXFxQbGF5bGlzdENvbnRyb2xsZXIuanMiLCJzcmNcXGpzXFxhcHAuanMiLCJzcmNcXGpzXFxkaXJlY3RpdmVzXFxQbGF5bGlzdEl0ZW1Gb3JtLmpzIiwic3JjXFxqc1xccGFsZXR0ZXMuanMiLCJzcmNcXGpzXFxzZXJ2aWNlc1xcUGxheWxpc3RJdGVtRm9ybVNlcnZpY2UuanMiLCJzcmNcXGpzXFxzZXJ2aWNlc1xcUGxheWxpc3RTZXJ2aWNlLmpzIiwic3JjXFxqc1xcc2VydmljZXNcXFVSTFZhbGlkYXRvclNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSxJQUFJLE1BQU0sUUFBUSxPQUFSLENBQU47O0lBR0U7QUFDTCxVQURLLGtCQUNMLENBQ0MsZUFERCxFQUVDLHVCQUZELEVBR0U7d0JBSkcsb0JBSUg7O0FBQ0QsT0FBSyxTQUFMLEdBQWlCLGdCQUFnQixJQUFoQixFQUFqQixDQURDO0FBRUQsT0FBSyxZQUFMLEdBQW9CLElBQXBCLENBRkM7QUFHRCxPQUFLLGVBQUwsR0FBdUIsSUFBdkIsQ0FIQztBQUlELE9BQUssaUJBQUwsR0FBeUIsS0FBekIsQ0FKQzs7QUFNRCxPQUFLLHVCQUFMLEdBQStCLHVCQUEvQixDQU5DO0VBSEY7O2NBREs7OzRCQVlLO0FBQ1QsUUFBSyx1QkFBTCxDQUE2QixLQUE3QixHQURTO0FBRVQsUUFBSyxpQkFBTCxHQUZTOzs7OzJCQUlELE1BQU07QUFDZCxRQUFLLHVCQUFMLENBQTZCLFNBQTdCLENBQXVDLElBQXZDLEVBRGM7QUFFZCxRQUFLLGlCQUFMLEdBRmM7Ozs7b0NBSUc7QUFDakIsUUFBSyxlQUFMLEdBQXVCLElBQXZCLENBRGlCO0FBRWpCLFFBQUssaUJBQUwsR0FBeUIsS0FBekIsQ0FGaUI7Ozs7c0NBSUU7QUFDbkIsUUFBSyxlQUFMLEdBQXVC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QUssS0FBTCxDQUREOzs7O1FBdEJGOzs7QUEwQk4sZ0JBQWdCLE9BQWhCLEdBQTBCLEVBQTFCOztBQUdBLE9BQU8sT0FBUCxHQUFpQixlQUFqQjs7Ozs7Ozs7O0lDL0NNO0FBQ0wsVUFESyxtQkFDTCxDQUFZLEtBQVosRUFBbUI7d0JBRGQscUJBQ2M7O0FBQ2xCLE9BQUssS0FBTCxHQUFhLEtBQWIsQ0FEa0I7RUFBbkI7O2NBREs7OzBCQUlHLEtBQUs7QUFDWixXQUFRLEdBQVIsQ0FBWSxHQUFaLEVBRFk7QUFFWixVQUFPLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxHQUFmLEVBQW9CLElBQXBCLENBQXlCO1dBQU07SUFBTixFQUFZO1dBQU07SUFBTixDQUE1QyxDQUZZOzs7O1FBSlI7OztBQVNOLG9CQUFvQixPQUFwQixHQUE4QixDQUFDLE9BQUQsQ0FBOUI7O0FBR0EsT0FBTyxPQUFQLEdBQWlCLG1CQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgYXBwID0gcmVxdWlyZSgnLi9hcHAnKTtcclxuXHJcblxyXG5jbGFzcyBQbGF5bGlzdENvbnRyb2xsZXIge1xyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0UGxheWxpc3RTZXJ2aWNlLFxyXG5cdFx0UGxheWxpc3RJdGVtRm9ybVNlcnZpY2VcclxuXHQpIHtcclxuXHRcdHRoaXMubGlzdEl0ZW1zID0gUGxheWxpc3RTZXJ2aWNlLmxpc3QoKTtcclxuXHRcdHRoaXMuc2VsZWN0ZWRJdGVtID0gbnVsbDtcclxuXHRcdHRoaXMudmlzaWJsZVBsYXlsaXN0ID0gdHJ1ZTtcclxuXHRcdHRoaXMudmlzaWJsZVNlcmllc0Zvcm0gPSBmYWxzZTtcclxuXHJcblx0XHR0aGlzLlBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlID0gUGxheWxpc3RJdGVtRm9ybVNlcnZpY2U7XHJcblx0fVxyXG5cdGFkZEl0ZW0oKSB7XHJcblx0XHR0aGlzLlBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLmNsZWFyKCk7XHJcblx0XHR0aGlzLmRpc3BsYXlTZXJpZXNGb3JtKCk7XHJcblx0fVxyXG5cdGVkaXRJdGVtKGl0ZW0pIHtcclxuXHRcdHRoaXMuUGxheWxpc3RJdGVtRm9ybVNlcnZpY2Uuc2V0VmFsdWVzKGl0ZW0pO1xyXG5cdFx0dGhpcy5kaXNwbGF5U2VyaWVzRm9ybSgpO1xyXG5cdH1cclxuXHRkaXNwbGF5UGxheWxpc3QoKSB7XHJcblx0XHR0aGlzLnZpc2libGVQbGF5bGlzdCA9IHRydWU7XHJcblx0XHR0aGlzLnZpc2libGVTZXJpZXNGb3JtID0gZmFsc2U7XHJcblx0fVxyXG5cdGRpc3BsYXlTZXJpZXNGb3JtKCkge1xyXG5cdFx0dGhpcy52aXNpYmxlUGxheWxpc3QgPSBmYWxzZTtcclxuXHRcdHRoaXMudmlzaWJsZVNlcmllc0Zvcm0gPSB0cnVlO1xyXG5cdH1cclxufVxyXG5cclxuUGxheWxpc3RDb250cm9sbGVyLiRpbmplY3QgPSBbXHJcblx0J1BsYXlsaXN0U2VydmljZScsXHJcblx0J1BsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlJyxcclxuXTtcclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5bGlzdENvbnRyb2xsZXI7XHJcbiIsInZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcbnZhciBwYWxldHRlcyA9IHJlcXVpcmUoJy4vcGFsZXR0ZXMnKTtcclxuXHJcblxyXG4vLyBEZWZpbmUgdGhlIEFuZ3VsYXIgQXBwXHJcbnZhciBkZXBlbmRlbmNpZXMgPSBbJ25nTWF0ZXJpYWwnXTtcclxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdQbGF5bGlzdFRyYWNrZXJFeCcsIGRlcGVuZGVuY2llcyk7XHJcblxyXG4vLyBDb25maWd1cmF0aW9uXHJcbmFwcC5jb25maWcoKCRtZFRoZW1pbmdQcm92aWRlcikgPT4ge1xyXG5cdF8uZm9yT3duKHBhbGV0dGVzLCAodmFsdWUsIGtleSkgPT4ge1xyXG5cdFx0JG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoa2V5LCB2YWx1ZSk7XHJcblx0fSk7XHJcblxyXG5cdCRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpXHJcblx0XHRcdFx0XHQgIC5wcmltYXJ5UGFsZXR0ZSgndHVycXVvaXNlJylcclxuXHRcdFx0XHRcdCAgLmFjY2VudFBhbGV0dGUoJ2Nsb3VkYnVyc3QnKTtcclxufSk7XHJcblxyXG4vLyBEZWZpbmUgdGhlIENvbnRyb2xsZXJzXHJcbmFwcC5jb250cm9sbGVyKCdQbGF5bGlzdENvbnRyb2xsZXInLCByZXF1aXJlKCcuL1BsYXlsaXN0Q29udHJvbGxlcicpKTtcclxuXHJcbi8vIERlZmluZSB0aGUgU2VydmljZXNcclxuYXBwLnNlcnZpY2UoJ1BsYXlsaXN0U2VydmljZScsIHJlcXVpcmUoJy4vc2VydmljZXMvUGxheWxpc3RTZXJ2aWNlJykpO1xyXG5hcHAuc2VydmljZSgnUGxheWxpc3RJdGVtRm9ybVNlcnZpY2UnLCByZXF1aXJlKCcuL3NlcnZpY2VzL1BsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlJykpO1xyXG5hcHAuc2VydmljZSgnVVJMVmFsaWRhdG9yU2VydmljZScsIHJlcXVpcmUoJy4vc2VydmljZXMvVVJMVmFsaWRhdG9yU2VydmljZScpKTtcclxuXHJcbi8vIERlZmluZSB0aGUgRGlyZWN0aXZlc1xyXG5hcHAuZGlyZWN0aXZlKCdwbGF5bGlzdEl0ZW1Gb3JtJywgcmVxdWlyZSgnLi9kaXJlY3RpdmVzL1BsYXlsaXN0SXRlbUZvcm0nKSk7XHJcblxyXG5cclxuYW5ndWxhci5ib290c3RyYXAoZG9jdW1lbnQsIFsnUGxheWxpc3RUcmFja2VyRXgnXSk7XHJcbiIsImNsYXNzIFBsYXlsaXN0SXRlbUZvcm0ge1xyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0UGxheWxpc3RTZXJ2aWNlLFxyXG5cdFx0UGxheWxpc3RJdGVtRm9ybVNlcnZpY2UsXHJcblx0XHRVUkxWYWxpZGF0b3JTZXJ2aWNlXHJcblx0KSB7XHJcblx0XHR0aGlzLnJlc3RyaWN0ID0gXCJFXCI7XHJcblx0XHR0aGlzLnRlbXBsYXRlVXJsID0gXCJ0ZW1wbGF0ZXMvcGxheWxpc3RfaXRlbV9mb3JtLmh0bWxcIjtcclxuXHRcdHRoaXMuc2NvcGUgPSB7fTtcclxuXHRcdHRoaXMucmVwbGFjZSA9IHRydWU7XHJcblx0XHR0aGlzLmxpbmsgPSB0aGlzLmxpbmsuYmluZCh0aGlzKTtcclxuXHJcblx0XHR0aGlzLlBsYXlsaXN0U2VydmljZSA9IFBsYXlsaXN0U2VydmljZTtcclxuXHRcdHRoaXMuUGxheWxpc3RJdGVtRm9ybVNlcnZpY2UgPSBQbGF5bGlzdEl0ZW1Gb3JtU2VydmljZTtcclxuXHRcdHRoaXMuVVJMVmFsaWRhdG9yU2VydmljZSA9IFVSTFZhbGlkYXRvclNlcnZpY2U7XHJcblx0fVxyXG5cdGNsZWFyKCkge1xyXG5cdFx0dGhpcy5QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZS5jbGVhcigpO1xyXG5cdH1cclxuXHRzYXZlKCkge1xyXG5cdFx0Y29uc3QgdXJsID0gdGhpcy5QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZS51cmw7XHJcblx0XHR0aGlzLlVSTFZhbGlkYXRvclNlcnZpY2UuaXNWYWxpZCh1cmwpLnRoZW4oKHZhbGlkKSA9PiB7XHJcblx0XHRcdGNvbnNvbGUubG9nKHZhbGlkKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm47XHJcblx0XHRjb25zdCBpdGVtRGF0YSA9IHRoaXMuUGxheWxpc3RJdGVtRm9ybVNlcnZpY2UuZ2V0VmFsdWVzKCk7XHJcblx0XHRjb25zb2xlLmxvZyhpdGVtRGF0YSk7XHJcblx0XHR0aGlzLlBsYXlsaXN0U2VydmljZS5zYXZlKGl0ZW1EYXRhKTtcclxuXHRcdHRoaXMuY2xlYXIoKTtcclxuXHR9XHJcblx0bGluaygkc2NvcGUpIHtcclxuXHRcdHRoaXMuJHNjb3BlID0gJHNjb3BlO1xyXG5cdFx0dGhpcy4kc2NvcGUuUGxheWxpc3RJdGVtRm9ybVNlcnZpY2UgPSB0aGlzLlBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlO1xyXG5cdFx0dGhpcy4kc2NvcGUuY2xlYXIgPSB0aGlzLmNsZWFyLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLiRzY29wZS5zYXZlID0gdGhpcy5zYXZlLmJpbmQodGhpcyk7XHJcblx0fVxyXG5cdHN0YXRpYyBleHBvcnQoXHJcblx0XHRQbGF5bGlzdFNlcnZpY2UsXHJcblx0XHRQbGF5bGlzdEl0ZW1Gb3JtU2VydmljZSxcclxuXHRcdFVSTFZhbGlkYXRvclNlcnZpY2VcclxuXHQpIHtcclxuXHRcdHJldHVybiBuZXcgUGxheWxpc3RJdGVtRm9ybShcclxuXHRcdFx0UGxheWxpc3RTZXJ2aWNlLFxyXG5cdFx0XHRQbGF5bGlzdEl0ZW1Gb3JtU2VydmljZSxcclxuXHRcdFx0VVJMVmFsaWRhdG9yU2VydmljZVxyXG5cdFx0KTtcclxuXHR9XHJcbn1cclxuUGxheWxpc3RJdGVtRm9ybS5leHBvcnQuJGluamVjdCA9IFtcclxuXHQnUGxheWxpc3RTZXJ2aWNlJyxcclxuXHQnUGxheWxpc3RJdGVtRm9ybVNlcnZpY2UnLFxyXG5cdCdVUkxWYWxpZGF0b3JTZXJ2aWNlJyxcclxuXTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGxheWxpc3RJdGVtRm9ybS5leHBvcnQ7XHJcbiIsImNvbnN0IHR1cnF1b2lzZSA9IHtcclxuXHQnNTAnOiAnI2ZmZmZmZicsXHJcblx0JzEwMCc6ICcjYzdmNGYzJyxcclxuXHQnMjAwJzogJyM5OGViZTknLFxyXG5cdCczMDAnOiAnIzVjZGZkYycsXHJcblx0JzQwMCc6ICcjNDNkYWQ3JyxcclxuXHQnNTAwJzogJyMyYWQ0ZDEnLFxyXG5cdCc2MDAnOiAnIzI1YmFiOCcsXHJcblx0JzcwMCc6ICcjMjBhMTlmJyxcclxuXHQnODAwJzogJyMxYjg3ODUnLFxyXG5cdCc5MDAnOiAnIzE2NmU2YycsXHJcblx0J0ExMDAnOiAnI2ZmZmZmZicsXHJcblx0J0EyMDAnOiAnI2M3ZjRmMycsXHJcblx0J0E0MDAnOiAnIzQzZGFkNycsXHJcblx0J0E3MDAnOiAnIzIwYTE5ZicsXHJcblx0J2NvbnRyYXN0RGVmYXVsdENvbG9yJzogJ2xpZ2h0JyxcclxuXHQnY29udHJhc3REYXJrQ29sb3JzJzogJzUwIDEwMCAyMDAgMzAwIDQwMCA1MDAgNjAwIEExMDAgQTIwMCBBNDAwJ1xyXG59O1xyXG5cclxuY29uc3QgY2xvdWRidXJzdCA9IHtcclxuXHQnNTAnOiAnIzk1YjFlMScsXHJcblx0JzEwMCc6ICcjNTk4NGQwJyxcclxuXHQnMjAwJzogJyMzNTY2YmMnLFxyXG5cdCczMDAnOiAnIzI1NDg4NScsXHJcblx0JzQwMCc6ICcjMWYzYjZkJyxcclxuXHQnNTAwJzogJyMxODJlNTUnLFxyXG5cdCc2MDAnOiAnIzExMjEzZCcsXHJcblx0JzcwMCc6ICcjMGIxNDI1JyxcclxuXHQnODAwJzogJyMwNDA3MGQnLFxyXG5cdCc5MDAnOiAnIzAwMDAwMCcsXHJcblx0J0ExMDAnOiAnIzk1YjFlMScsXHJcblx0J0EyMDAnOiAnIzU5ODRkMCcsXHJcblx0J0E0MDAnOiAnIzFmM2I2ZCcsXHJcblx0J0E3MDAnOiAnIzBiMTQyNScsXHJcblx0J2NvbnRyYXN0RGVmYXVsdENvbG9yJzogJ2xpZ2h0JyxcclxuXHQnY29udHJhc3REYXJrQ29sb3JzJzogJzUwIEExMDAnXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHR0dXJxdW9pc2UsXHJcblx0Y2xvdWRidXJzdCxcclxufTtcclxuIiwidmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxuXHJcblxyXG5jbGFzcyBQbGF5bGlzdEl0ZW1Gb3JtU2VydmljZSB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLmlkID0gbnVsbDtcclxuXHRcdHRoaXMubmFtZSA9IG51bGw7XHJcblx0XHR0aGlzLnVybCA9IG51bGw7XHJcblx0fVxyXG5cdGdldFZhbHVlcygpIHtcclxuXHRcdGxldCBpdGVtID0ge307XHJcblx0XHRfLmZvck93bih0aGlzLCAodmFsdWUsIGtleSkgPT4ge1xyXG5cdFx0XHRfLnNldChpdGVtLCBrZXksIHZhbHVlKTtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIGl0ZW07XHJcblx0fVxyXG5cdHNldFZhbHVlcyhpdGVtKSB7XHJcblx0XHRfLmZvck93bihpdGVtLCAodmFsdWUsIGtleSkgPT4ge1xyXG5cdFx0XHRpZiAoXy5oYXModGhpcywga2V5KSkge1xyXG5cdFx0XHRcdF8uc2V0KHRoaXMsIGtleSwgdmFsdWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblx0Y2xlYXIoKSB7XHJcblx0XHRfLmZvck93bih0aGlzLCAodmFsdWUsIGtleSkgPT4ge1xyXG5cdFx0XHRpZiAoa2V5ICE9ICdpZCcpIHtcclxuXHRcdFx0XHRfLnNldCh0aGlzLCBrZXksIG51bGwpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblx0cmVzZXQoKSB7XHJcblx0XHRfLmZvck93bih0aGlzLCAodmFsdWUsIGtleSkgPT4ge1xyXG5cdFx0XHRfLnNldCh0aGlzLCBrZXksIG51bGwpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLiRpbmplY3QgPSBbXTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlO1xyXG4iLCJ2YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG5cclxuXHJcbmNsYXNzIFBsYXlsaXN0SXRlbSB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLmlkID0gbnVsbDtcclxuXHRcdHRoaXMubmFtZSA9IG51bGw7XHJcblx0XHR0aGlzLnVybCA9IG51bGw7XHJcblx0fVxyXG5cdHVwZGF0ZShkYXRhKSB7XHJcblx0XHRfLmZvck93bihkYXRhLCAodmFsdWUsIGtleSkgPT4ge1xyXG5cdFx0XHRpZiAoXy5oYXModGhpcywga2V5KSkge1xyXG5cdFx0XHRcdF8uc2V0KHRoaXMsIGtleSwgdmFsdWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFBsYXlsaXN0U2VydmljZSB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLnVpZCA9IDE7XHJcblx0XHR0aGlzLml0ZW1zID0gW107XHJcblx0fVxyXG5cdHNhdmUoaXRlbURhdGEpIHtcclxuXHRcdGlmIChpdGVtRGF0YS5pZCkge1xyXG5cdFx0XHRjb25zdCBpdGVtID0gdGhpcy5nZXQoaXRlbURhdGEuaWQpO1xyXG5cdFx0XHRpdGVtLnVwZGF0ZShpdGVtRGF0YSk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGNvbnN0IGl0ZW0gPSBuZXcgUGxheWxpc3RJdGVtKCk7XHJcblx0XHRpdGVtRGF0YS5pZCA9IHRoaXMudWlkKys7XHJcblx0XHRpdGVtLnVwZGF0ZShpdGVtRGF0YSk7XHJcblx0XHR0aGlzLml0ZW1zLnB1c2goaXRlbSk7XHJcblx0fVxyXG5cdGdldChpZCkge1xyXG5cdFx0cmV0dXJuIF8uZmluZCh0aGlzLml0ZW1zLCB7aWQ6IGlkfSk7XHJcblx0fVxyXG5cdGRlbGV0ZShpZCkge1xyXG5cdFx0Xy5yZW1vdmUodGhpcy5pdGVtcywge2lkOiBpZH0pO1xyXG5cdH1cclxuXHRsaXN0KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaXRlbXM7XHJcblx0fVxyXG59XHJcblBsYXlsaXN0U2VydmljZS4kaW5qZWN0ID0gW107XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5bGlzdFNlcnZpY2U7XHJcbiIsImNsYXNzIFVSTFZhbGlkYXRvclNlcnZpY2Uge1xyXG5cdGNvbnN0cnVjdG9yKCRodHRwKSB7XHJcblx0XHR0aGlzLiRodHRwID0gJGh0dHA7XHJcblx0fVxyXG5cdGlzVmFsaWQodXJsKSB7XHJcblx0XHRjb25zb2xlLmxvZyh1cmwpO1xyXG5cdFx0cmV0dXJuIHRoaXMuJGh0dHAuZ2V0KHVybCkudGhlbigoKSA9PiB0cnVlLCAoKSA9PiBmYWxzZSk7XHJcblx0fVxyXG59XHJcblVSTFZhbGlkYXRvclNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnXTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFVSTFZhbGlkYXRvclNlcnZpY2U7XHJcbiJdfQ==
