/*
 * Libs : Chargement des librairies
 */
var JUG = require('JUG');

/*
 * /!\ Temporaire : Test de l'animation du menu en cliquant sur l'évenement courant (view en rouge) /!\
 */
$.currentView.addEventListener("click", function(e) {
	Ti.API.info("[---Event---] Menu click : " + Ti.App.Properties.getBool('menuOpen'));
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