var PlaylistService = require('./../services/PlaylistService');


class PlaylistItemForm {
	constructor(
		PlaylistService,
		PlaylistItemFormService
	) {
		this.restrict = "E";
		this.templateUrl = "templates/playlist_item_form.html";
		this.scope = {
			item: '=',
		}
		this.replace = true;

		this.PlaylistService = PlaylistService;
		this.PlaylistItemFormService = PlaylistItemFormService;
		this.link = this.link.bind(this);
	}
	reset() {
		this.$scope.id = null;
		this.$scope.name = null;
		this.$scope.url = null;
	}
	save() {
		const itemData = {
			id: this.$scope.id,
			name: this.$scope.name,
			url: this.$scope.url,
		};o
		this.PlaylistService.save(itemData);
		this.reset();
	}
	link($scope) {
		this.$scope = $scope;
		this.$scope.save = this.save.bind(this);

		if (this.scope.item) {
			const item = this.scope.item;
			this.$scope.id = item.id;
			this.$scope.name = item.name;
			this.$scope.url = item.url;
		}
		else {
			this.reset();
		}
	}
	static export(PlaylistService) {
		return new PlaylistItemForm(PlaylistService);
	}
}
PlaylistItemForm.export.$inject = [
	'PlaylistService',
	'PlaylistItemFormService',
];

module.exports = PlaylistItemForm.export;
