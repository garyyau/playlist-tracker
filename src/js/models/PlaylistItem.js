var _ = require('lodash');
var URL = require('./URL');


class PlaylistItem {
	constructor() {
		this.id = null;
		this.name = null;
		this.url = null;
		this.nextURL = null;
		this.seasonIndex = null;
		this.episodeIndex = null;

		this.hasOne = {
			url: URL,
			nextURL: URL,
		};
	}
	getSeason() {
		if (!this.seasonIndex) {
			 return;
		}
		return this.url.components[this.seasonIndex];
	}
	getEpisode() {
		if (!this.episodeIndex) {
			 return;
		}
		return this.url.components[this.episodeIndex];
	}
	getUpdateOptions() {
		const updateURLComponents = [];
		if (this.episodeIndex) {
			const components = [...this.url.components];
			const currentEpisode = parseInt(this.getEpisode());
			components[this.episodeIndex] = currentEpisode + 1;
			updateURLComponents.push(components);
		}
		if (this.seasonIndex) {
			const components = [...this.url.components];
			const currentSeason = parseInt(this.getSeason());
			components[this.seasonIndex] = currentSeason + 1;
			components[this.episodeIndex] = 1;
			updateURLComponents.push(components);
		}
		return updateURLComponents;
	}
	update(data) {
		_.forOwn(data, (value, key) => {
			let dataValue = value;

			const relation = this.hasOne[key];
			if (relation) {
				dataValue = relation.createFromDataArray(value);
			}
			if (_.has(this, key)) {
				_.set(this, key, dataValue);
			}
		});
	}
	static createFromDataArray(data) {
		const item = new PlaylistItem();
		item.update(data);

		return item;
	}
}

module.exports = PlaylistItem;
