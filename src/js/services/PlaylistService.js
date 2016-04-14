var _ = require('lodash');
var PlaylistItem = require('./../models/PlaylistItem');


class PlaylistService {
	constructor(
		$q,
		$rootScope,
		URLFactory,
		URLValidatorService
	) {
		this.uid = 1;
		this.items = [];
		this.load();

		this.$q = $q;
		this.$rootScope = $rootScope;
		this.URLFactory = URLFactory;
		this.URLValidatorService = URLValidatorService;
	}
	createFromDataArray(data) {
		_.forEach(data, (itemData) => {
			this.items.push(PlaylistItem.createFromDataArray(itemData));
			this.checkForUpdates();
		});
	}
	load() {
		try {
			chrome.storage.sync.get('playlist', (storage) => {
				if (!storage['playlist']) {
					return;
				}
				this.$rootScope.$apply(() => {
					this.createFromDataArray(JSON.parse(storage['playlist']));
				});
			});
		} catch(e) {
			console.log("Failed loading data.", e);
		}
	}
	save() {
		chrome.storage.sync.set({playlist: JSON.stringify(this.items)}, () => {});
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
		this.save();
	}
	checkForUpdates(callback) {
		_.forEach(this.items, (item) => {
			const updateOptions = item.getUpdateOptions();
			const promises = [];

			_.forEach(updateOptions, (components) => {
				const url = this.URLFactory.createFromComponents(components);
				promises.push(this.URLValidatorService.isValid(url.stringify()));
			});

			this.$q.all(promises).then((values) => {
				const results = _.zip(values, updateOptions);
				_.each(results, (result) => {
					if (result[0]) {
						const url = this.URLFactory.createFromComponents(result[1]);
						item.nextURL = url;
						return false;
					}
					item.nextURL = null;
				});
				this.save();
				if (callback) {
					callback();
				}
			});
		});
	}
	list() {
		return this.items;
	}
}
PlaylistService.$inject = [
	'$q',
	'$rootScope',
	'URLFactory',
	'URLValidatorService',
];


module.exports = PlaylistService;
