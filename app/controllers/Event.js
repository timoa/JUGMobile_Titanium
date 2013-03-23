/*
 * Libs : Chargement des librairies
 */
var JUG = require('JUG'),
	Moment = require('alloy/moment');

/*
 * Init
 */
Moment.weekdays = L('moment_weekdays').split("_");
Moment.months = L('moment_months').split("_");
Moment.monthsShort = L('moment_monthsShort').split("_");

/*
 * Mise à jour de la liste des événements
 */
function updateEvent(_data) {
	
	var rows = [];
	
	for(dataId in _data) {
		
		// Mise à jour de l'événement courant (currentView)
		if(dataId==0) {
			
			// Mise à jour du titre (traitement par lot)
			$.titleLabel.applyProperties({
				text: _data[dataId].title,
				visible: true
			});
			
			// Mise à jour de la date
			$.dateLabel.applyProperties({
				text: Moment(_data[dataId].date).format('dddd DD MMMM YYYY'),
				visible: true
			});
			
			// Mise à jour de la description
			$.descLabel.applyProperties({
				text: JUG.cutText(_data[dataId].description, 100),
				visible: true
			});
			
			// Mise à jour de currentView pour s'adapter à la hauteur du contenu
			$.currentView.animate(JUG.currentViewShow());
		}	
		
		else {
			// Création d'une ligne pour la liste à partir du contrôleur EventRow
			var row = Alloy.createController('EventRow', {
				title: _data[dataId].title,
				date: _data[dataId].date,
				description: JUG.cutText(_data[dataId].description, 45),
				rowId: _data[dataId].id
			}).getView();
			rows.push(row);
			
			row = null;
		}
						
	}
	
	// Set the table
	$.eventList.data = rows;
};

/*
 * Chargement des événements
 */
if(Ti.Network.online) {
		
	JUG.httpRequest({
		url: Alloy.CFG.JUGApi + "events/all.json",
		format: "json",
		callback: function(e) {
			updateEvent(e);
		}
	});	
}


/*
 * /!\ Temporaire : Test de l'animation du menu en cliquant sur l'évenement courant (view en rouge) /!\
 */
$.currentView.addEventListener("click", function(e) {
	Ti.API.info("[---Event---] Menu open : " + Ti.App.Properties.getBool('menuOpen'));
	Ti.App.fireEvent("JUG:menuOpen");
});


/*
 * Menu
 */
Ti.App.addEventListener("JUG:menuOpen", function(e) {
	
	// Fermeture du menu
	if(Ti.App.Properties.getBool('menuOpen')) {
		$.Event.animate(JUG.menuShow(0));
		Ti.App.Properties.setBool('menuOpen', false);
	} 
	
	// Ouverture du menu
	else {		
		$.Event.animate(JUG.menuShow(Alloy.CFG.menuWidth));
		Ti.App.Properties.setBool('menuOpen', true);		
	}
});