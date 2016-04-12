class PlaylistItemFormService {
	constructor() {
		this.id = null;
		this.name = null;
		this.url = null;
	}
	setItem(item) {
		_.forOwn(item, (value, key) => {
			if (_.has(this, key)) {
				_.set(this, key, value);
			}
		});
		console.log(this);
	}
	clearItem(item) {
		_.forOwn(this, (value, key) => {
			_.set(this, key, null);
		});
	}
}
PlaylistItemFormService.$inject = [];


module.exports = PlaylistItemFormService;
