/* Contrôleur MenuRow pour le contrôleur Menu */

// Récupération des arguments envoyés par le contrôleur Menu
var args = arguments[0] || {};

Ti.API.info('[---MenuRow---] args: ' + args.item + ' / ' + args.rowId);

// Patch pour l'icône Twitter qui se trouve dans la police Entypo Social (au lieu de Entypo)
if(args.icon === "") {
	if(OS_IOS || OS_MOBILEWEB) {
		$.icon.font = {
			fontSize: "55dp",
			fontFamily: "Entypo Social"
		};
	} else {
		$.icon.font = {
			fontSize: "55dp",
			fontFamily: "EntypoSocial"
		};
	}	
}

// Mise à jour de l'icône et de l'item
$.icon.text = args.icon;
$.item.text = args.item;

// TODO: Bug Android... Récupération de rowID via title. (e.rowData.title vers e.rowData.rowId)
if(OS_ANDROID) {
	$.menuRow.title = args.rowId;
	$.menuRow.rowId = args.rowId;
} else {
	$.menuRow.rowId = args.rowId;
}