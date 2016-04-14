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
	stringify() {
		return _.join(this.components, '');
	}
	update(data) {
		_.forOwn(data, (value, key) => {
			let dataValue = value;

			if (_.has(this, key)) {
				_.set(this, key, dataValue);
			}
		});
	}
	static createFromDataArray(data) {
		const item = new URL();
		item.update(data);
		return item;
	}
}


module.exports = URL;
