var app = require('./app');


class PlaylistController {
	constructor(
		PlaylistService,
		PlaylistItemFormService
	) {
		this.listItems = PlaylistService.list();
		this.selectedItem = null;
		this.visiblePlaylist = true;
		this.visibleSeriesForm = false;

		this.PlaylistItemFormService = PlaylistItemFormService;
	}
	addItem() {
		console.log("Adding new Item");
	}
	editItem(item) {
		this.PlaylistItemFormService.setValues(item);
		this.displaySeriesForm();
	}
	displayPlaylist() {
		this.visiblePlaylist = true;
		this.visibleSeriesForm = false;
	}
	displaySeriesForm() {
		this.visiblePlaylist = false;
		this.visibleSeriesForm = true;
	}
}

PlaylistController.$inject = [
	'PlaylistService',
	'PlaylistItemFormService',
];



module.exports = PlaylistController;
