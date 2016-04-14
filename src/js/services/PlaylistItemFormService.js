var _ = require('lodash');


class PlaylistItemFormService {
	constructor(URLFactory) {
		this.data = {};
		this.URLFactory = URLFactory;
	}
	createURL(urlString) {
		if (!urlString || urlString.length == 0) {
			return;
		}
		this.data.url = this.URLFactory.createFromString(urlString);
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
PlaylistItemFormService.$inject = ['URLFactory'];


module.exports = PlaylistItemFormService;
