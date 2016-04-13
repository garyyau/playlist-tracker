class PlaylistItemForm {
	constructor(
		PlaylistService,
		PlaylistItemFormService,
		URLValidatorService
	) {
		this.restrict = "E";
		this.templateUrl = "templates/playlist_item_form.html";
		this.scope = {};
		this.replace = true;
		this.link = this.link.bind(this);

		this.PlaylistService = PlaylistService;
		this.PlaylistItemFormService = PlaylistItemFormService;
		this.URLValidatorService = URLValidatorService;
	}
	clear() {
		this.PlaylistItemFormService.clear();
	}
	save() {
		const url = this.PlaylistItemFormService.url;
		this.URLValidatorService.isValid(url).then((valid) => {
			console.log(valid);
			return;
		});
		return;
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
		PlaylistItemFormService,
		URLValidatorService
	) {
		return new PlaylistItemForm(
			PlaylistService,
			PlaylistItemFormService,
			URLValidatorService
		);
	}
}
PlaylistItemForm.export.$inject = [
	'PlaylistService',
	'PlaylistItemFormService',
	'URLValidatorService',
];

module.exports = PlaylistItemForm.export;
