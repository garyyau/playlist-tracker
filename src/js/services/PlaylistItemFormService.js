var _ = require('lodash');


class PlaylistItemFormService {
	constructor(URLParserService) {
		this.data = {};
		this.URLParserService = URLParserService;
	}
	createURL(urlString) {
		if (!urlString || urlString.length == 0) {
			return;
		}
		this.data.url = this.URLParserService.createURL(urlString);
	}
	getValues() {
		return this.data;
	}
	setValues(item) {
		this.reset();
		_.forOwn(item, (value, key) => {
			_.set(this.data, key, value);
		});
	}
	clear() {
		this.data = {
			id: this.id,
		};
	}
	reset() {
		this.data = {};
	}
}
PlaylistItemFormService.$inject = ['URLParserService'];


module.exports = PlaylistItemFormService;
