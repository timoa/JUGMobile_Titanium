/* Contrôleur MenuRow pour le contrôleur Menu */

// Récupération des arguments envoyés par le contrôleur Menu
var args = arguments[0] || {};

Ti.API.info('[---EventRow---] args: ' + args.title + ' / ' + args.rowId);

// Mise à jour des labels
$.titleLabel.text = args.title;
$.dateLabel.text = args.date;
$.descLabel.text = args.description;

// TODO: Bug Android... Récupération de rowID via title. (e.rowData.title vers e.rowData.rowId)
if(OS_ANDROID) {
	$.eventRow.title = args.rowId;
	$.eventRow.rowId = args.rowId;
} else {
	$.eventRow.rowId = args.rowId;
}