class PlaylistItemForm {
	constructor(
		PlaylistService,
		PlaylistItemFormService,
		URLFactory,
		URLValidatorService
	) {
		this.restrict = "E";
		this.templateUrl = "templates/playlist_item_form.html";
		this.scope = {};
		this.replace = true;
		this.link = this.link.bind(this);

		this.PlaylistService = PlaylistService;
		this.PlaylistItemFormService = PlaylistItemFormService;
		this.URLFactory = URLFactory;
		this.URLValidatorService = URLValidatorService;
	}
	setSeasonIndex(index) {
		if (this.$scope.selectedSeasonIndex == index) {
			this.$scope.selectedSeasonIndex = null;
			return;
		}
		this.$scope.selectedSeasonIndex = index;
		this.PlaylistItemFormService.data.seasonIndex = index;
	}
	setEpisodeIndex(index) {
		if (this.$scope.selectedEpisodeIndex == index) {
			this.$scope.selectedEpisodeIndex = null;
			return;
		}
		this.$scope.selectedEpisodeIndex = index;
		this.PlaylistItemFormService.data.episodeIndex = index;
	}
	clear() {
		this.PlaylistItemFormService.clear();
	}
	save() {
		const itemData = this.PlaylistItemFormService.getValues();
		this.PlaylistService.saveItem(itemData);
		this.clear();
	}
	link($scope) {
		this.$scope = $scope;

		this.$scope.hasSeason = false;
		this.$scope.hasEpisode = false;
		this.$scope.selectedSeasonIndex = null;
		this.$scope.selectedEpisodeIndex = null;

		this.$scope.PlaylistItemFormService = this.PlaylistItemFormService;
		this.$scope.setSeasonIndex = this.setSeasonIndex.bind(this);
		this.$scope.setEpisodeIndex = this.setEpisodeIndex.bind(this);
		this.$scope.clear = this.clear.bind(this);
		this.$scope.save = this.save.bind(this);
	}
	static export(
		PlaylistService,
		PlaylistItemFormService,
		URLFactory,
		URLValidatorService
	) {
		return new PlaylistItemForm(
			PlaylistService,
			PlaylistItemFormService,
			URLFactory,
			URLValidatorService
		);
	}
}
PlaylistItemForm.export.$inject = [
	'PlaylistService',
	'PlaylistItemFormService',
	'URLFactory',
	'URLValidatorService',
];

module.exports = PlaylistItemForm.export;
