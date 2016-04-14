var _ = require('lodash');


class PlaylistItemFormService {
	constructor(URLParserService) {
		this.id = null;
		this.name = null;
		this.url = null;
		this.urlString = null;
		this.URLParserService = URLParserService;
	}
	createURL(urlString) {
		this.url = this.URLParserService.createURL(urlString);
	}
	getValues() {
		let item = {};
		_.forOwn(this, (value, key) => {
			_.set(item, key, value);
		});
		return item;
	}
	setValues(item) {
		_.forOwn(item, (value, key) => {
			if (_.has(this, key)) {
				_.set(this, key, value);
			}
		});
	}
	clear() {
		_.forOwn(this, (value, key) => {
			if (key != 'id') {
				_.set(this, key, null);
			}
		});
	}
	reset() {
		_.forOwn(this, (value, key) => {
			_.set(this, key, null);
		});
	}
}
PlaylistItemFormService.$inject = ['URLParserService'];


module.exports = PlaylistItemFormService;
