var _ = require('lodash');


class PlaylistItem {
	constructor() {
		this.id = null;
		this.name = null;
		this.url = null;
	}
	update(data) {
		_.forOwn(data, (value, key) => {
			if (_.has(this, key)) {
				_.set(this, key, value);
			}
		});
	}
}

class PlaylistService {
	constructor() {
		this.uid = 1;
		this.items = [];
	}
	save(itemData) {
		if (itemData.id) {
			const item = this.get(item.id);
			item.update(itemData);
			return;
		}
		const item = new PlaylistItem();
		itemData.id = this.uid++;
		item.update(itemData);
		this.items.push(item);
	}
	get(id) {
		return _.find(this.items, {id: id});
	}
	delete(id) {
		_.remove(this.items, {id: id});
	}
	list() {
		return this.items;
	}
}
PlaylistService.$inject = [];


module.exports = PlaylistService;
