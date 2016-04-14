var _ = require('lodash');


class URL {
	constructor() {
		this.components = [];
		this.matches = [];
	}
	addComponent(component) {
		this.components.push(component);
	}
	addMatch(component) {
		this.matches.push(component);
	}
	isMatch(component) {
		return _.includes(this.matches, component);
	}
}

class URLParserService {
	createURL(string) {
		const regex = /(.+?)(\d+)/g;
		const url = new URL();

		let pieces;
		let lastIndex = 0;
		while ((pieces = regex.exec(string)) !== null) {
			const parsed = pieces[0];
			const component = pieces[1];
			const match = pieces[2];
			lastIndex = pieces['index'] + parsed.length;

			url.addComponent(component);
			url.addComponent(match);
			url.addMatch(match);
		}
		if (string.length == 1 || lastIndex < string.length - 1) {
			const remain = string.substring(lastIndex, string.length);
			url.addComponent(remain);
		}
		return url;
	}
}

module.exports = URLParserService;
