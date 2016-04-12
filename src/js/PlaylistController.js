var app = require('./app');


class PlaylistController {
	constructor(
		PlaylistService,
		PlaylistItemFormService
	) {
		this.listItems = PlaylistService.list();
		this.selectedItem = null;

		this.PlaylistItemFormService = PlaylistItemFormService;
	}
	addItem() {
		console.log("Adding new Item");
	}
	editItem(item) {
		console.log(item);
		this.PlaylistItemFormService.setItem(item);
	}
}

PlaylistController.$inject = [
	'PlaylistService',
	'PlaylistItemFormService',
];



module.exports = PlaylistController;
