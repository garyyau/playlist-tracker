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
			console.log("Adding new Item");
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

// Define the Directives
app.directive('playlistItemForm', require('./directives/PlaylistItemForm'));

angular.bootstrap(document, ['PlaylistTrackerEx']);

},{"./PlaylistController":1,"./directives/PlaylistItemForm":3,"./palettes":4,"./services/PlaylistItemFormService":5,"./services/PlaylistService":6,"lodash":undefined}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlaylistItemForm = function () {
	function PlaylistItemForm(PlaylistService, PlaylistItemFormService) {
		_classCallCheck(this, PlaylistItemForm);

		this.restrict = "E";
		this.templateUrl = "templates/playlist_item_form.html";
		this.scope = {};
		this.replace = true;

		this.PlaylistService = PlaylistService;
		this.PlaylistItemFormService = PlaylistItemFormService;
		this.link = this.link.bind(this);
	}

	_createClass(PlaylistItemForm, [{
		key: "clear",
		value: function clear() {
			this.PlaylistItemFormService.clear();
		}
	}, {
		key: "save",
		value: function save() {
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
		value: function _export(PlaylistService, PlaylistItemFormService) {
			return new PlaylistItemForm(PlaylistService, PlaylistItemFormService);
		}
	}]);

	return PlaylistItemForm;
}();

PlaylistItemForm.export.$inject = ['PlaylistService', 'PlaylistItemFormService'];

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

},{"lodash":undefined}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzXFxQbGF5bGlzdENvbnRyb2xsZXIuanMiLCJzcmNcXGpzXFxhcHAuanMiLCJzcmNcXGpzXFxkaXJlY3RpdmVzXFxQbGF5bGlzdEl0ZW1Gb3JtLmpzIiwic3JjXFxqc1xccGFsZXR0ZXMuanMiLCJzcmNcXGpzXFxzZXJ2aWNlc1xcUGxheWxpc3RJdGVtRm9ybVNlcnZpY2UuanMiLCJzcmNcXGpzXFxzZXJ2aWNlc1xcUGxheWxpc3RTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUEsSUFBSSxNQUFNLFFBQVEsT0FBUixDQUFOOztJQUdFO0FBQ0wsVUFESyxrQkFDTCxDQUNDLGVBREQsRUFFQyx1QkFGRCxFQUdFO3dCQUpHLG9CQUlIOztBQUNELE9BQUssU0FBTCxHQUFpQixnQkFBZ0IsSUFBaEIsRUFBakIsQ0FEQztBQUVELE9BQUssWUFBTCxHQUFvQixJQUFwQixDQUZDO0FBR0QsT0FBSyxlQUFMLEdBQXVCLElBQXZCLENBSEM7QUFJRCxPQUFLLGlCQUFMLEdBQXlCLEtBQXpCLENBSkM7O0FBTUQsT0FBSyx1QkFBTCxHQUErQix1QkFBL0IsQ0FOQztFQUhGOztjQURLOzs0QkFZSztBQUNULFdBQVEsR0FBUixDQUFZLGlCQUFaLEVBRFM7Ozs7MkJBR0QsTUFBTTtBQUNkLFFBQUssdUJBQUwsQ0FBNkIsU0FBN0IsQ0FBdUMsSUFBdkMsRUFEYztBQUVkLFFBQUssaUJBQUwsR0FGYzs7OztvQ0FJRztBQUNqQixRQUFLLGVBQUwsR0FBdUIsSUFBdkIsQ0FEaUI7QUFFakIsUUFBSyxpQkFBTCxHQUF5QixLQUF6QixDQUZpQjs7OztzQ0FJRTtBQUNuQixRQUFLLGVBQUwsR0FBdUIsS0FBdkIsQ0FEbUI7QUFFbkIsUUFBSyxpQkFBTCxHQUF5QixJQUF6QixDQUZtQjs7OztRQXZCZjs7O0FBNkJOLG1C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QUFXLENBQVgsQ0FEYTtBQUViLE9BQUssS0FBTCxHQUFhLEVBQWIsQ0FGYTtFQUFkOztjQURLOzt1QkFLQSxVQUFVO0FBQ2QsT0FBSSxTQUFTLEVBQVQsRUFBYTtBQUNoQixRQUFNLFFBQU8sS0FBSyxHQUFMLENBQVMsU0FBUyxFQUFULENBQWhCLENBRFU7QUFFaEIsVUFBSyxNQUFMLENBQVksUUFBWixFQUZnQjtBQUdoQixXQUhnQjtJQUFqQjtBQUtBLE9BQU0sT0FBTyxJQUFJLFlBQUosRUFBUCxDQU5RO0FBT2QsWUFBUyxFQUFULEdBQWMsS0FBSyxHQUFMLEVBQWQsQ0FQYztBQVFkLFFBQUssTUFBTCxDQUFZLFFBQVosRUFSYztBQVNkLFFBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEIsRUFUYzs7OztzQkFXWCxJQUFJO0FBQ1AsVUFBTyxFQUFFLElBQUYsQ0FBTyxLQUFLLEtBQUwsRUFBWSxFQUFDLElBQUksRUFBSixFQUFwQixDQUFQLENBRE87Ozs7MEJBR0QsSUFBSTtBQUNWLEtBQUUsTUFBRixDQUFTLEtBQUssS0FBTCxFQUFZLEVBQUMsSUFBSSxFQUFKLEVBQXRCLEVBRFU7Ozs7eUJBR0o7QUFDTixVQUFPLEtBQUssS0FBTCxDQUREOzs7O1FBdEJGOzs7QUEwQk4sZ0JBQWdCLE9BQWhCLEdBQTBCLEVBQTFCOztBQUdBLE9BQU8sT0FBUCxHQUFpQixlQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgYXBwID0gcmVxdWlyZSgnLi9hcHAnKTtcclxuXHJcblxyXG5jbGFzcyBQbGF5bGlzdENvbnRyb2xsZXIge1xyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0UGxheWxpc3RTZXJ2aWNlLFxyXG5cdFx0UGxheWxpc3RJdGVtRm9ybVNlcnZpY2VcclxuXHQpIHtcclxuXHRcdHRoaXMubGlzdEl0ZW1zID0gUGxheWxpc3RTZXJ2aWNlLmxpc3QoKTtcclxuXHRcdHRoaXMuc2VsZWN0ZWRJdGVtID0gbnVsbDtcclxuXHRcdHRoaXMudmlzaWJsZVBsYXlsaXN0ID0gdHJ1ZTtcclxuXHRcdHRoaXMudmlzaWJsZVNlcmllc0Zvcm0gPSBmYWxzZTtcclxuXHJcblx0XHR0aGlzLlBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlID0gUGxheWxpc3RJdGVtRm9ybVNlcnZpY2U7XHJcblx0fVxyXG5cdGFkZEl0ZW0oKSB7XHJcblx0XHRjb25zb2xlLmxvZyhcIkFkZGluZyBuZXcgSXRlbVwiKTtcclxuXHR9XHJcblx0ZWRpdEl0ZW0oaXRlbSkge1xyXG5cdFx0dGhpcy5QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZS5zZXRWYWx1ZXMoaXRlbSk7XHJcblx0XHR0aGlzLmRpc3BsYXlTZXJpZXNGb3JtKCk7XHJcblx0fVxyXG5cdGRpc3BsYXlQbGF5bGlzdCgpIHtcclxuXHRcdHRoaXMudmlzaWJsZVBsYXlsaXN0ID0gdHJ1ZTtcclxuXHRcdHRoaXMudmlzaWJsZVNlcmllc0Zvcm0gPSBmYWxzZTtcclxuXHR9XHJcblx0ZGlzcGxheVNlcmllc0Zvcm0oKSB7XHJcblx0XHR0aGlzLnZpc2libGVQbGF5bGlzdCA9IGZhbHNlO1xyXG5cdFx0dGhpcy52aXNpYmxlU2VyaWVzRm9ybSA9IHRydWU7XHJcblx0fVxyXG59XHJcblxyXG5QbGF5bGlzdENvbnRyb2xsZXIuJGluamVjdCA9IFtcclxuXHQnUGxheWxpc3RTZXJ2aWNlJyxcclxuXHQnUGxheWxpc3RJdGVtRm9ybVNlcnZpY2UnLFxyXG5dO1xyXG5cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXlsaXN0Q29udHJvbGxlcjtcclxuIiwidmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxudmFyIHBhbGV0dGVzID0gcmVxdWlyZSgnLi9wYWxldHRlcycpO1xyXG5cclxuXHJcbi8vIERlZmluZSB0aGUgQW5ndWxhciBBcHBcclxudmFyIGRlcGVuZGVuY2llcyA9IFsnbmdNYXRlcmlhbCddO1xyXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ1BsYXlsaXN0VHJhY2tlckV4JywgZGVwZW5kZW5jaWVzKTtcclxuXHJcbi8vIENvbmZpZ3VyYXRpb25cclxuYXBwLmNvbmZpZygoJG1kVGhlbWluZ1Byb3ZpZGVyKSA9PiB7XHJcblx0Xy5mb3JPd24ocGFsZXR0ZXMsICh2YWx1ZSwga2V5KSA9PiB7XHJcblx0XHQkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZShrZXksIHZhbHVlKTtcclxuXHR9KTtcclxuXHJcblx0JG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JylcclxuXHRcdFx0XHRcdCAgLnByaW1hcnlQYWxldHRlKCd0dXJxdW9pc2UnKVxyXG5cdFx0XHRcdFx0ICAuYWNjZW50UGFsZXR0ZSgnY2xvdWRidXJzdCcpO1xyXG59KTtcclxuXHJcbi8vIERlZmluZSB0aGUgQ29udHJvbGxlcnNcclxuYXBwLmNvbnRyb2xsZXIoJ1BsYXlsaXN0Q29udHJvbGxlcicsIHJlcXVpcmUoJy4vUGxheWxpc3RDb250cm9sbGVyJykpO1xyXG5cclxuLy8gRGVmaW5lIHRoZSBTZXJ2aWNlc1xyXG5hcHAuc2VydmljZSgnUGxheWxpc3RTZXJ2aWNlJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9QbGF5bGlzdFNlcnZpY2UnKSk7XHJcbmFwcC5zZXJ2aWNlKCdQbGF5bGlzdEl0ZW1Gb3JtU2VydmljZScsIHJlcXVpcmUoJy4vc2VydmljZXMvUGxheWxpc3RJdGVtRm9ybVNlcnZpY2UnKSk7XHJcblxyXG4vLyBEZWZpbmUgdGhlIERpcmVjdGl2ZXNcclxuYXBwLmRpcmVjdGl2ZSgncGxheWxpc3RJdGVtRm9ybScsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9QbGF5bGlzdEl0ZW1Gb3JtJykpO1xyXG5cclxuXHJcbmFuZ3VsYXIuYm9vdHN0cmFwKGRvY3VtZW50LCBbJ1BsYXlsaXN0VHJhY2tlckV4J10pO1xyXG4iLCJjbGFzcyBQbGF5bGlzdEl0ZW1Gb3JtIHtcclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdFBsYXlsaXN0U2VydmljZSxcclxuXHRcdFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlXHJcblx0KSB7XHJcblx0XHR0aGlzLnJlc3RyaWN0ID0gXCJFXCI7XHJcblx0XHR0aGlzLnRlbXBsYXRlVXJsID0gXCJ0ZW1wbGF0ZXMvcGxheWxpc3RfaXRlbV9mb3JtLmh0bWxcIjtcclxuXHRcdHRoaXMuc2NvcGUgPSB7fTtcclxuXHRcdHRoaXMucmVwbGFjZSA9IHRydWU7XHJcblxyXG5cdFx0dGhpcy5QbGF5bGlzdFNlcnZpY2UgPSBQbGF5bGlzdFNlcnZpY2U7XHJcblx0XHR0aGlzLlBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlID0gUGxheWxpc3RJdGVtRm9ybVNlcnZpY2U7XHJcblx0XHR0aGlzLmxpbmsgPSB0aGlzLmxpbmsuYmluZCh0aGlzKTtcclxuXHR9XHJcblx0Y2xlYXIoKSB7XHJcblx0XHR0aGlzLlBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLmNsZWFyKCk7XHJcblx0fVxyXG5cdHNhdmUoKSB7XHJcblx0XHRjb25zdCBpdGVtRGF0YSA9IHRoaXMuUGxheWxpc3RJdGVtRm9ybVNlcnZpY2UuZ2V0VmFsdWVzKCk7XHJcblx0XHRjb25zb2xlLmxvZyhpdGVtRGF0YSk7XHJcblx0XHR0aGlzLlBsYXlsaXN0U2VydmljZS5zYXZlKGl0ZW1EYXRhKTtcclxuXHRcdHRoaXMuY2xlYXIoKTtcclxuXHR9XHJcblx0bGluaygkc2NvcGUpIHtcclxuXHRcdHRoaXMuJHNjb3BlID0gJHNjb3BlO1xyXG5cdFx0dGhpcy4kc2NvcGUuUGxheWxpc3RJdGVtRm9ybVNlcnZpY2UgPSB0aGlzLlBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlO1xyXG5cdFx0dGhpcy4kc2NvcGUuY2xlYXIgPSB0aGlzLmNsZWFyLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLiRzY29wZS5zYXZlID0gdGhpcy5zYXZlLmJpbmQodGhpcyk7XHJcblx0fVxyXG5cdHN0YXRpYyBleHBvcnQoXHJcblx0XHRQbGF5bGlzdFNlcnZpY2UsXHJcblx0XHRQbGF5bGlzdEl0ZW1Gb3JtU2VydmljZVxyXG5cdCkge1xyXG5cdFx0cmV0dXJuIG5ldyBQbGF5bGlzdEl0ZW1Gb3JtKFxyXG5cdFx0XHRQbGF5bGlzdFNlcnZpY2UsXHJcblx0XHRcdFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlXHJcblx0XHQpO1xyXG5cdH1cclxufVxyXG5QbGF5bGlzdEl0ZW1Gb3JtLmV4cG9ydC4kaW5qZWN0ID0gW1xyXG5cdCdQbGF5bGlzdFNlcnZpY2UnLFxyXG5cdCdQbGF5bGlzdEl0ZW1Gb3JtU2VydmljZScsXHJcbl07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXlsaXN0SXRlbUZvcm0uZXhwb3J0O1xyXG4iLCJjb25zdCB0dXJxdW9pc2UgPSB7XHJcblx0JzUwJzogJyNmZmZmZmYnLFxyXG5cdCcxMDAnOiAnI2M3ZjRmMycsXHJcblx0JzIwMCc6ICcjOThlYmU5JyxcclxuXHQnMzAwJzogJyM1Y2RmZGMnLFxyXG5cdCc0MDAnOiAnIzQzZGFkNycsXHJcblx0JzUwMCc6ICcjMmFkNGQxJyxcclxuXHQnNjAwJzogJyMyNWJhYjgnLFxyXG5cdCc3MDAnOiAnIzIwYTE5ZicsXHJcblx0JzgwMCc6ICcjMWI4Nzg1JyxcclxuXHQnOTAwJzogJyMxNjZlNmMnLFxyXG5cdCdBMTAwJzogJyNmZmZmZmYnLFxyXG5cdCdBMjAwJzogJyNjN2Y0ZjMnLFxyXG5cdCdBNDAwJzogJyM0M2RhZDcnLFxyXG5cdCdBNzAwJzogJyMyMGExOWYnLFxyXG5cdCdjb250cmFzdERlZmF1bHRDb2xvcic6ICdsaWdodCcsXHJcblx0J2NvbnRyYXN0RGFya0NvbG9ycyc6ICc1MCAxMDAgMjAwIDMwMCA0MDAgNTAwIDYwMCBBMTAwIEEyMDAgQTQwMCdcclxufTtcclxuXHJcbmNvbnN0IGNsb3VkYnVyc3QgPSB7XHJcblx0JzUwJzogJyM5NWIxZTEnLFxyXG5cdCcxMDAnOiAnIzU5ODRkMCcsXHJcblx0JzIwMCc6ICcjMzU2NmJjJyxcclxuXHQnMzAwJzogJyMyNTQ4ODUnLFxyXG5cdCc0MDAnOiAnIzFmM2I2ZCcsXHJcblx0JzUwMCc6ICcjMTgyZTU1JyxcclxuXHQnNjAwJzogJyMxMTIxM2QnLFxyXG5cdCc3MDAnOiAnIzBiMTQyNScsXHJcblx0JzgwMCc6ICcjMDQwNzBkJyxcclxuXHQnOTAwJzogJyMwMDAwMDAnLFxyXG5cdCdBMTAwJzogJyM5NWIxZTEnLFxyXG5cdCdBMjAwJzogJyM1OTg0ZDAnLFxyXG5cdCdBNDAwJzogJyMxZjNiNmQnLFxyXG5cdCdBNzAwJzogJyMwYjE0MjUnLFxyXG5cdCdjb250cmFzdERlZmF1bHRDb2xvcic6ICdsaWdodCcsXHJcblx0J2NvbnRyYXN0RGFya0NvbG9ycyc6ICc1MCBBMTAwJ1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0dHVycXVvaXNlLFxyXG5cdGNsb3VkYnVyc3QsXHJcbn07XHJcbiIsInZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcblxyXG5cclxuY2xhc3MgUGxheWxpc3RJdGVtRm9ybVNlcnZpY2Uge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5pZCA9IG51bGw7XHJcblx0XHR0aGlzLm5hbWUgPSBudWxsO1xyXG5cdFx0dGhpcy51cmwgPSBudWxsO1xyXG5cdH1cclxuXHRnZXRWYWx1ZXMoKSB7XHJcblx0XHRsZXQgaXRlbSA9IHt9O1xyXG5cdFx0Xy5mb3JPd24odGhpcywgKHZhbHVlLCBrZXkpID0+IHtcclxuXHRcdFx0Xy5zZXQoaXRlbSwga2V5LCB2YWx1ZSk7XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBpdGVtO1xyXG5cdH1cclxuXHRzZXRWYWx1ZXMoaXRlbSkge1xyXG5cdFx0Xy5mb3JPd24oaXRlbSwgKHZhbHVlLCBrZXkpID0+IHtcclxuXHRcdFx0aWYgKF8uaGFzKHRoaXMsIGtleSkpIHtcclxuXHRcdFx0XHRfLnNldCh0aGlzLCBrZXksIHZhbHVlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cdGNsZWFyKCkge1xyXG5cdFx0Xy5mb3JPd24odGhpcywgKHZhbHVlLCBrZXkpID0+IHtcclxuXHRcdFx0aWYgKGtleSAhPSAnaWQnKSB7XHJcblx0XHRcdFx0Xy5zZXQodGhpcywga2V5LCBudWxsKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cdHJlc2V0KCkge1xyXG5cdFx0Xy5mb3JPd24odGhpcywgKHZhbHVlLCBrZXkpID0+IHtcclxuXHRcdFx0Xy5zZXQodGhpcywga2V5LCBudWxsKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZS4kaW5qZWN0ID0gW107XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5bGlzdEl0ZW1Gb3JtU2VydmljZTtcclxuIiwidmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxuXHJcblxyXG5jbGFzcyBQbGF5bGlzdEl0ZW0ge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5pZCA9IG51bGw7XHJcblx0XHR0aGlzLm5hbWUgPSBudWxsO1xyXG5cdFx0dGhpcy51cmwgPSBudWxsO1xyXG5cdH1cclxuXHR1cGRhdGUoZGF0YSkge1xyXG5cdFx0Xy5mb3JPd24oZGF0YSwgKHZhbHVlLCBrZXkpID0+IHtcclxuXHRcdFx0aWYgKF8uaGFzKHRoaXMsIGtleSkpIHtcclxuXHRcdFx0XHRfLnNldCh0aGlzLCBrZXksIHZhbHVlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBQbGF5bGlzdFNlcnZpY2Uge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy51aWQgPSAxO1xyXG5cdFx0dGhpcy5pdGVtcyA9IFtdO1xyXG5cdH1cclxuXHRzYXZlKGl0ZW1EYXRhKSB7XHJcblx0XHRpZiAoaXRlbURhdGEuaWQpIHtcclxuXHRcdFx0Y29uc3QgaXRlbSA9IHRoaXMuZ2V0KGl0ZW1EYXRhLmlkKTtcclxuXHRcdFx0aXRlbS51cGRhdGUoaXRlbURhdGEpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRjb25zdCBpdGVtID0gbmV3IFBsYXlsaXN0SXRlbSgpO1xyXG5cdFx0aXRlbURhdGEuaWQgPSB0aGlzLnVpZCsrO1xyXG5cdFx0aXRlbS51cGRhdGUoaXRlbURhdGEpO1xyXG5cdFx0dGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xyXG5cdH1cclxuXHRnZXQoaWQpIHtcclxuXHRcdHJldHVybiBfLmZpbmQodGhpcy5pdGVtcywge2lkOiBpZH0pO1xyXG5cdH1cclxuXHRkZWxldGUoaWQpIHtcclxuXHRcdF8ucmVtb3ZlKHRoaXMuaXRlbXMsIHtpZDogaWR9KTtcclxuXHR9XHJcblx0bGlzdCgpIHtcclxuXHRcdHJldHVybiB0aGlzLml0ZW1zO1xyXG5cdH1cclxufVxyXG5QbGF5bGlzdFNlcnZpY2UuJGluamVjdCA9IFtdO1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGxheWxpc3RTZXJ2aWNlO1xyXG4iXX0=
