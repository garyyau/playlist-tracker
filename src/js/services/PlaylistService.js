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
	constructor($rootScope) {
		this.uid = 1;
		this.items = [];
		this.load();
		this.$rootScope = $rootScope;
	}
	load() {
		try {
			chrome.storage.sync.get('playlist', (storage) => {
				this.$rootScope.$apply(() => {
					this.items = JSON.parse(storage['playlist']);
					console.log(this.items);
				});
			});
		} catch(e) {
			console.log("Failed loading data.", e);
		}
	}
	save() {
		chrome.storage.sync.set({playlist: JSON.stringify(this.items)}, () => {
			console.log("Saved Items: ", this.items);
		});
	}
	saveItem(itemData) {
		if (itemData.id) {
			const item = this.getItem(itemData.id);
			item.update(itemData);
			return;
		}
		const item = new PlaylistItem();
		itemData.id = this.uid++;
		item.update(itemData);
		this.items.push(item);
		this.save();
	}
	getItem(id) {
		return _.find(this.items, {id: id});
	}
	deleteItem(id) {
		_.remove(this.items, {id: id});
	}
	list() {
		return this.items;
	}
}
PlaylistService.$inject = ['$rootScope'];


module.exports = PlaylistService;
