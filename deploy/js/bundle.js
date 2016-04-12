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
			console.log(item);
			this.PlaylistItemFormService.setItem(item);
		}
	}]);

	return PlaylistController;
}();

PlaylistController.$inject = ['PlaylistService', 'PlaylistItemFormService'];

module.exports = PlaylistController;

},{"./app":2}],2:[function(require,module,exports){
'use strict';

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

},{"./PlaylistController":1,"./directives/PlaylistItemForm":3,"./services/PlaylistItemFormService":4,"./services/PlaylistService":5,"angular":undefined,"lodash":undefined}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlaylistService = require('./../services/PlaylistService');

var PlaylistItemForm = function () {
	function PlaylistItemForm(PlaylistService, PlaylistItemFormService) {
		_classCallCheck(this, PlaylistItemForm);

		this.restrict = "E";
		this.templateUrl = "templates/playlist_item_form.html";
		this.scope = {
			item: '='
		};
		this.replace = true;

		this.PlaylistService = PlaylistService;
		this.PlaylistItemFormService = PlaylistItemFormService;
		this.link = this.link.bind(this);
	}

	_createClass(PlaylistItemForm, [{
		key: "reset",
		value: function reset() {
			this.$scope.id = null;
			this.$scope.name = null;
			this.$scope.url = null;
		}
	}, {
		key: "save",
		value: function save() {
			var itemData = {
				id: this.$scope.id,
				name: this.$scope.name,
				url: this.$scope.url
			};o;
			this.PlaylistService.save(itemData);
			this.reset();
		}
	}, {
		key: "link",
		value: function link($scope) {
			this.$scope = $scope;
			this.$scope.save = this.save.bind(this);

			if (this.scope.item) {
				var item = this.scope.item;
				this.$scope.id = item.id;
				this.$scope.name = item.name;
				this.$scope.url = item.url;
			} else {
				this.reset();
			}
		}
	}], [{
		key: "export",
		value: function _export(PlaylistService) {
			return new PlaylistItemForm(PlaylistService);
		}
	}]);

	return PlaylistItemForm;
}();

PlaylistItemForm.export.$inject = ['PlaylistService', 'PlaylistItemFormService'];

module.exports = PlaylistItemForm.export;

},{"./../services/PlaylistService":5}],4:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlaylistItemFormService = function () {
	function PlaylistItemFormService() {
		_classCallCheck(this, PlaylistItemFormService);

		this.id = null;
		this.name = null;
		this.url = null;
	}

	_createClass(PlaylistItemFormService, [{
		key: "setItem",
		value: function setItem(item) {
			var _this = this;

			_.forOwn(item, function (value, key) {
				if (_.has(_this, key)) {
					_.set(_this, key, value);
				}
			});
			console.log(this);
		}
	}, {
		key: "clearItem",
		value: function clearItem(item) {
			var _this2 = this;

			_.forOwn(this, function (value, key) {
				_.set(_this2, key, null);
			});
		}
	}]);

	return PlaylistItemFormService;
}();

PlaylistItemFormService.$inject = [];

module.exports = PlaylistItemFormService;

},{}],5:[function(require,module,exports){
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
				var _item = this.get(_item.id);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzXFxQbGF5bGlzdENvbnRyb2xsZXIuanMiLCJzcmNcXGpzXFxhcHAuanMiLCJzcmNcXGpzXFxkaXJlY3RpdmVzXFxQbGF5bGlzdEl0ZW1Gb3JtLmpzIiwic3JjXFxqc1xcc2VydmljZXNcXFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLmpzIiwic3JjXFxqc1xcc2VydmljZXNcXFBsYXlsaXN0U2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBLElBQUksTUFBTSxRQUFRLE9BQVIsQ0FBTjs7SUFHRTtBQUNMLFVBREssa0JBQ0wsQ0FDQyxlQURELEVBRUMsdUJBRkQsRUFHRTt3QkFKRyxvQkFJSDs7QUFDRCxPQUFLLFNBQUwsR0FBaUIsZ0JBQWdCLElBQWhCLEVBQWpCLENBREM7QUFFRCxPQUFLLFlBQUwsR0FBb0IsSUFBcEIsQ0FGQzs7QUFJRCxPQUFLLHVCQUFMLEdBQStCLHVCQUEvQixDQUpDO0VBSEY7O2NBREs7OzRCQVVLO0FBQ1QsV0FBUSxHQUFSLENBQVksaUJBQVosRUFEUzs7OzsyQkFHRCxNQUFNO0FBQ2QsV0FBUSxHQUFSLENBQVksSUFBWixFQURjO0FBRWQsUUFBSyx1QkFBTCxDQUE2QixPQUE3QixDQUFxQyxJQUFyQyxFQUZjOzs7O1FBYlY7OztBQW1CTixtQkFBbUIsT0FBbkIsR0FBNkIsQ0FDNUIsaUJBRDRCLEVBRTVCLHlCQUY0QixDQUE3Qjs7QUFPQSxPQUFPLE9BQVAsR0FBaUIsa0JBQWpCOzs7OztBQzdCQSxJQUFJLElBQUksUUFBUSxRQUFSLENBQUo7QUFDSixJQUFJLFVBQVUsUUFBUSxTQUFSLENBQVY7OztBQUlKLElBQUksZUFBZSxFQUFmO0FBQ0osSUFBSSxNQUFNLFFBQVEsTUFBUixDQUFlLG1CQUFmLEVBQW9DLFlBQXBDLENBQU47OztBQUdKLElBQUksVUFBSixD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QU5RO0FBT2QsWUFBUyxFQUFULEdBQWMsS0FBSyxHQUFMLEVBQWQsQ0FQYztBQVFkLFFBQUssTUFBTCxDQUFZLFFBQVosRUFSYztBQVNkLFFBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEIsRUFUYzs7OztzQkFXWCxJQUFJO0FBQ1AsVUFBTyxFQUFFLElBQUYsQ0FBTyxLQUFLLEtBQUwsRUFBWSxFQUFDLElBQUksRUFBSixFQUFwQixDQUFQLENBRE87Ozs7MEJBR0QsSUFBSTtBQUNWLEtBQUUsTUFBRixDQUFTLEtBQUssS0FBTCxFQUFZLEVBQUMsSUFBSSxFQUFKLEVBQXRCLEVBRFU7Ozs7eUJBR0o7QUFDTixVQUFPLEtBQUssS0FBTCxDQUREOzs7O1FBdEJGOzs7QUEwQk4sZ0JBQWdCLE9BQWhCLEdBQTBCLEVBQTFCOztBQUdBLE9BQU8sT0FBUCxHQUFpQixlQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgYXBwID0gcmVxdWlyZSgnLi9hcHAnKTtcclxuXHJcblxyXG5jbGFzcyBQbGF5bGlzdENvbnRyb2xsZXIge1xyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0UGxheWxpc3RTZXJ2aWNlLFxyXG5cdFx0UGxheWxpc3RJdGVtRm9ybVNlcnZpY2VcclxuXHQpIHtcclxuXHRcdHRoaXMubGlzdEl0ZW1zID0gUGxheWxpc3RTZXJ2aWNlLmxpc3QoKTtcclxuXHRcdHRoaXMuc2VsZWN0ZWRJdGVtID0gbnVsbDtcclxuXHJcblx0XHR0aGlzLlBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlID0gUGxheWxpc3RJdGVtRm9ybVNlcnZpY2U7XHJcblx0fVxyXG5cdGFkZEl0ZW0oKSB7XHJcblx0XHRjb25zb2xlLmxvZyhcIkFkZGluZyBuZXcgSXRlbVwiKTtcclxuXHR9XHJcblx0ZWRpdEl0ZW0oaXRlbSkge1xyXG5cdFx0Y29uc29sZS5sb2coaXRlbSk7XHJcblx0XHR0aGlzLlBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLnNldEl0ZW0oaXRlbSk7XHJcblx0fVxyXG59XHJcblxyXG5QbGF5bGlzdENvbnRyb2xsZXIuJGluamVjdCA9IFtcclxuXHQnUGxheWxpc3RTZXJ2aWNlJyxcclxuXHQnUGxheWxpc3RJdGVtRm9ybVNlcnZpY2UnLFxyXG5dO1xyXG5cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXlsaXN0Q29udHJvbGxlcjtcclxuIiwidmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcblxyXG5cclxuLy8gRGVmaW5lIHRoZSBBbmd1bGFyIEFwcFxyXG52YXIgZGVwZW5kZW5jaWVzID0gW107XHJcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnUGxheWxpc3RUcmFja2VyRXgnLCBkZXBlbmRlbmNpZXMpO1xyXG5cclxuLy8gRGVmaW5lIHRoZSBDb250cm9sbGVyc1xyXG5hcHAuY29udHJvbGxlcignUGxheWxpc3RDb250cm9sbGVyJywgcmVxdWlyZSgnLi9QbGF5bGlzdENvbnRyb2xsZXInKSk7XHJcblxyXG4vLyBEZWZpbmUgdGhlIFNlcnZpY2VzXHJcbmFwcC5zZXJ2aWNlKCdQbGF5bGlzdFNlcnZpY2UnLCByZXF1aXJlKCcuL3NlcnZpY2VzL1BsYXlsaXN0U2VydmljZScpKTtcclxuYXBwLnNlcnZpY2UoJ1BsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9QbGF5bGlzdEl0ZW1Gb3JtU2VydmljZScpKTtcclxuXHJcbi8vIERlZmluZSB0aGUgRGlyZWN0aXZlc1xyXG5hcHAuZGlyZWN0aXZlKCdwbGF5bGlzdEl0ZW1Gb3JtJywgcmVxdWlyZSgnLi9kaXJlY3RpdmVzL1BsYXlsaXN0SXRlbUZvcm0nKSk7XHJcblxyXG5cclxuYW5ndWxhci5ib290c3RyYXAoZG9jdW1lbnQsIFsnUGxheWxpc3RUcmFja2VyRXgnXSk7XHJcbiIsInZhciBQbGF5bGlzdFNlcnZpY2UgPSByZXF1aXJlKCcuLy4uL3NlcnZpY2VzL1BsYXlsaXN0U2VydmljZScpO1xyXG5cclxuXHJcbmNsYXNzIFBsYXlsaXN0SXRlbUZvcm0ge1xyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0UGxheWxpc3RTZXJ2aWNlLFxyXG5cdFx0UGxheWxpc3RJdGVtRm9ybVNlcnZpY2VcclxuXHQpIHtcclxuXHRcdHRoaXMucmVzdHJpY3QgPSBcIkVcIjtcclxuXHRcdHRoaXMudGVtcGxhdGVVcmwgPSBcInRlbXBsYXRlcy9wbGF5bGlzdF9pdGVtX2Zvcm0uaHRtbFwiO1xyXG5cdFx0dGhpcy5zY29wZSA9IHtcclxuXHRcdFx0aXRlbTogJz0nLFxyXG5cdFx0fVxyXG5cdFx0dGhpcy5yZXBsYWNlID0gdHJ1ZTtcclxuXHJcblx0XHR0aGlzLlBsYXlsaXN0U2VydmljZSA9IFBsYXlsaXN0U2VydmljZTtcclxuXHRcdHRoaXMuUGxheWxpc3RJdGVtRm9ybVNlcnZpY2UgPSBQbGF5bGlzdEl0ZW1Gb3JtU2VydmljZTtcclxuXHRcdHRoaXMubGluayA9IHRoaXMubGluay5iaW5kKHRoaXMpO1xyXG5cdH1cclxuXHRyZXNldCgpIHtcclxuXHRcdHRoaXMuJHNjb3BlLmlkID0gbnVsbDtcclxuXHRcdHRoaXMuJHNjb3BlLm5hbWUgPSBudWxsO1xyXG5cdFx0dGhpcy4kc2NvcGUudXJsID0gbnVsbDtcclxuXHR9XHJcblx0c2F2ZSgpIHtcclxuXHRcdGNvbnN0IGl0ZW1EYXRhID0ge1xyXG5cdFx0XHRpZDogdGhpcy4kc2NvcGUuaWQsXHJcblx0XHRcdG5hbWU6IHRoaXMuJHNjb3BlLm5hbWUsXHJcblx0XHRcdHVybDogdGhpcy4kc2NvcGUudXJsLFxyXG5cdFx0fTtvXHJcblx0XHR0aGlzLlBsYXlsaXN0U2VydmljZS5zYXZlKGl0ZW1EYXRhKTtcclxuXHRcdHRoaXMucmVzZXQoKTtcclxuXHR9XHJcblx0bGluaygkc2NvcGUpIHtcclxuXHRcdHRoaXMuJHNjb3BlID0gJHNjb3BlO1xyXG5cdFx0dGhpcy4kc2NvcGUuc2F2ZSA9IHRoaXMuc2F2ZS5iaW5kKHRoaXMpO1xyXG5cclxuXHRcdGlmICh0aGlzLnNjb3BlLml0ZW0pIHtcclxuXHRcdFx0Y29uc3QgaXRlbSA9IHRoaXMuc2NvcGUuaXRlbTtcclxuXHRcdFx0dGhpcy4kc2NvcGUuaWQgPSBpdGVtLmlkO1xyXG5cdFx0XHR0aGlzLiRzY29wZS5uYW1lID0gaXRlbS5uYW1lO1xyXG5cdFx0XHR0aGlzLiRzY29wZS51cmwgPSBpdGVtLnVybDtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLnJlc2V0KCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHN0YXRpYyBleHBvcnQoUGxheWxpc3RTZXJ2aWNlKSB7XHJcblx0XHRyZXR1cm4gbmV3IFBsYXlsaXN0SXRlbUZvcm0oUGxheWxpc3RTZXJ2aWNlKTtcclxuXHR9XHJcbn1cclxuUGxheWxpc3RJdGVtRm9ybS5leHBvcnQuJGluamVjdCA9IFtcclxuXHQnUGxheWxpc3RTZXJ2aWNlJyxcclxuXHQnUGxheWxpc3RJdGVtRm9ybVNlcnZpY2UnLFxyXG5dO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5bGlzdEl0ZW1Gb3JtLmV4cG9ydDtcclxuIiwiY2xhc3MgUGxheWxpc3RJdGVtRm9ybVNlcnZpY2Uge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5pZCA9IG51bGw7XHJcblx0XHR0aGlzLm5hbWUgPSBudWxsO1xyXG5cdFx0dGhpcy51cmwgPSBudWxsO1xyXG5cdH1cclxuXHRzZXRJdGVtKGl0ZW0pIHtcclxuXHRcdF8uZm9yT3duKGl0ZW0sICh2YWx1ZSwga2V5KSA9PiB7XHJcblx0XHRcdGlmIChfLmhhcyh0aGlzLCBrZXkpKSB7XHJcblx0XHRcdFx0Xy5zZXQodGhpcywga2V5LCB2YWx1ZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0Y29uc29sZS5sb2codGhpcyk7XHJcblx0fVxyXG5cdGNsZWFySXRlbShpdGVtKSB7XHJcblx0XHRfLmZvck93bih0aGlzLCAodmFsdWUsIGtleSkgPT4ge1xyXG5cdFx0XHRfLnNldCh0aGlzLCBrZXksIG51bGwpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlLiRpbmplY3QgPSBbXTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXlsaXN0SXRlbUZvcm1TZXJ2aWNlO1xyXG4iLCJ2YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG5cclxuXHJcbmNsYXNzIFBsYXlsaXN0SXRlbSB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLmlkID0gbnVsbDtcclxuXHRcdHRoaXMubmFtZSA9IG51bGw7XHJcblx0XHR0aGlzLnVybCA9IG51bGw7XHJcblx0fVxyXG5cdHVwZGF0ZShkYXRhKSB7XHJcblx0XHRfLmZvck93bihkYXRhLCAodmFsdWUsIGtleSkgPT4ge1xyXG5cdFx0XHRpZiAoXy5oYXModGhpcywga2V5KSkge1xyXG5cdFx0XHRcdF8uc2V0KHRoaXMsIGtleSwgdmFsdWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFBsYXlsaXN0U2VydmljZSB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLnVpZCA9IDE7XHJcblx0XHR0aGlzLml0ZW1zID0gW107XHJcblx0fVxyXG5cdHNhdmUoaXRlbURhdGEpIHtcclxuXHRcdGlmIChpdGVtRGF0YS5pZCkge1xyXG5cdFx0XHRjb25zdCBpdGVtID0gdGhpcy5nZXQoaXRlbS5pZCk7XHJcblx0XHRcdGl0ZW0udXBkYXRlKGl0ZW1EYXRhKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0Y29uc3QgaXRlbSA9IG5ldyBQbGF5bGlzdEl0ZW0oKTtcclxuXHRcdGl0ZW1EYXRhLmlkID0gdGhpcy51aWQrKztcclxuXHRcdGl0ZW0udXBkYXRlKGl0ZW1EYXRhKTtcclxuXHRcdHRoaXMuaXRlbXMucHVzaChpdGVtKTtcclxuXHR9XHJcblx0Z2V0KGlkKSB7XHJcblx0XHRyZXR1cm4gXy5maW5kKHRoaXMuaXRlbXMsIHtpZDogaWR9KTtcclxuXHR9XHJcblx0ZGVsZXRlKGlkKSB7XHJcblx0XHRfLnJlbW92ZSh0aGlzLml0ZW1zLCB7aWQ6IGlkfSk7XHJcblx0fVxyXG5cdGxpc3QoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5pdGVtcztcclxuXHR9XHJcbn1cclxuUGxheWxpc3RTZXJ2aWNlLiRpbmplY3QgPSBbXTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXlsaXN0U2VydmljZTtcclxuIl19
