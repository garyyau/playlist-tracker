class PlaylistItemForm {
	constructor(
		PlaylistService,
		PlaylistItemFormService
	) {
		this.restrict = "E";
		this.templateUrl = "templates/playlist_item_form.html";
		this.scope = {};
		this.replace = true;

		this.PlaylistService = PlaylistService;
		this.PlaylistItemFormService = PlaylistItemFormService;
		this.link = this.link.bind(this);
	}
	clear() {
		this.PlaylistItemFormService.clear();
	}
	save() {
		const itemData = this.PlaylistItemFormService.getValues();
		console.log(itemData);
		this.PlaylistService.save(itemData);
		this.clear();
	}
	link($scope) {
		this.$scope = $scope;
		this.$scope.PlaylistItemFormService = this.PlaylistItemFormService;
		this.$scope.clear = this.clear.bind(this);
		this.$scope.save = this.save.bind(this);
	}
	static export(
		PlaylistService,
		PlaylistItemFormService
	) {
		return new PlaylistItemForm(
			PlaylistService,
			PlaylistItemFormService
		);
	}
}
PlaylistItemForm.export.$inject = [
	'PlaylistService',
	'PlaylistItemFormService',
];

module.exports = PlaylistItemForm.export;
