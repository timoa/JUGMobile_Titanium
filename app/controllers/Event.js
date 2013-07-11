/*
 * Libs : Chargement des librairies
 */
var JUG = require('JUG'),
	Moment = require('alloy/moment');

/*
 * Init
 */
if(L('moment_weekdays')) {
	Ti.API.info("[---Event---] Moment Weekdays: " + L('moment_weekdays'));
	Moment.weekdays = L('moment_weekdays').split("_");
}
if(L('moment_months')) {
	Ti.API.info("[---Event---] Moment Months: " + L('moment_months'));
	Moment.months = L('moment_months').split("_");
}
if(L('moment_months_short')) {
	Ti.API.info("[---Event---] Moment Months short: " + L('moment_months_short'));
	Moment.monthsShort = L('moment_months_short').split("_");
}

/*
 * Mise à jour de la liste des événements
 */
function updateEvent(_data) {
	
	var rows = [];
	
	for(dataId in _data) {
		
		// Mise à jour de l'événement courant (currentView)
		if(dataId == 0) {
			
			// Mise à jour du titre (traitement par lot)
			if(_data[dataId].title) {
				$.titleLabel.applyProperties({
					text: _data[dataId].title,
					visible: true
				});
			}
			
			// Mise à jour de la date
			if(_data[dataId].date) {
				$.dateLabel.applyProperties({
					text: Moment(_data[dataId].date).format("dddd DD MMMM YYYY"),
					visible: true
				});
			}
			
			// Mise à jour de la description
			if(_data[dataId].description) {
				$.descLabel.applyProperties({
					text: _data[dataId].description,
					visible: true
				});
			}
		}	
		
		else {
			
			// Test de la date (ou sinon ça plante avec une date vide)
			if(_data[dataId].date) {
				var dateD = Moment(_data[dataId].date).format("DD");
				var dateM = Moment(_data[dataId].date).format("MMM");
				var dateY = Moment(_data[dataId].date).format("YYYY");
				
				// Création d'une ligne pour la liste à partir du contrôleur EventRow
				var row = Alloy.createController('EventRow', {
					date: dateD + '\n' + dateM + '\n' + dateY,
					title: _data[dataId].title,
					description: _data[dataId].description,
					rowId: _data[dataId].id
				}).getView();			
				rows.push(row);
				
				dateD = null;
				dateM = null;
				dateY = null;
				row = null;
			}
		}
	}
	
	// Set the table
	$.eventList.data = rows;
	
	// TODO: Faire une animation sympa pour l'affichage de currentView
	setTimeout(function() {
		
		// Mise à jour de currentView
		$.currentView.applyProperties({
			height: Ti.UI.SIZE,
			visible: true
		});
		
	}, 1000);
};

/*
 * Chargement des événements
 */
if(Ti.Network.online) {
		
	JUG.httpRequest({
		url: Alloy.CFG.JUGApi + "events/all.json",
		onSuccessCallback: function(e) {
			updateEvent(JSON.parse(e.data));
		},
		onErrorCallback: function(e) {
			// Alert
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