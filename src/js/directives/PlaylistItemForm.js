class PlaylistItemForm {
	constructor(
		PlaylistService,
		PlaylistItemFormService,
		URLParserService,
		URLValidatorService
	) {
		this.restrict = "E";
		this.templateUrl = "templates/playlist_item_form.html";
		this.scope = {};
		this.replace = true;
		this.link = this.link.bind(this);

		this.PlaylistService = PlaylistService;
		this.PlaylistItemFormService = PlaylistItemFormService;
		console.log(this.PlaylistItemFormService.URLParserService);
		this.URLParserService = URLParserService;
		this.URLValidatorService = URLValidatorService;
	}
	clear() {
		this.PlaylistItemFormService.clear();
	}
	save() {
		const urlString = this.PlaylistItemFormService.url;
		console.log(this.URLParserService.createURL(urlString));
		return;
		const itemData = this.PlaylistItemFormService.getValues();
		this.PlaylistService.saveItem(itemData);
		this.clear();
	}
	link($scope) {
		this.$scope = $scope;

		this.$scope.hasSeason = false;
		this.$scope.hasEpisode = false;

		this.$scope.PlaylistItemFormService = this.PlaylistItemFormService;
		this.$scope.clear = this.clear.bind(this);
		this.$scope.save = this.save.bind(this);
	}
	static export(
		PlaylistService,
		PlaylistItemFormService,
		URLParserService,
		URLValidatorService
	) {
		return new PlaylistItemForm(
			PlaylistService,
			PlaylistItemFormService,
			URLParserService,
			URLValidatorService
		);
	}
}
PlaylistItemForm.export.$inject = [
	'PlaylistService',
	'PlaylistItemFormService',
	'URLParserService',
	'URLValidatorService',
];

module.exports = PlaylistItemForm.export;
