/*
 * Librairie pour les fonctions spécifiques au JUG
 */

/*
 * Libs : Chargement des librairies
 */
var XHR = require('xhr');

/*
 * UI -------------------------------------------
 */

	/*
	 * Menu: menuShow()
	 * 
	 * @left (integer): Valeur pour l'ouverture ou fermeture du menu
	 */
	function menuShow(_left) {

		var animation = Ti.UI.createAnimation({
			left: _left,
			curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
			duration: 500
		});
	
		return animation;
	};


/*
 * Network --------------------------------------
 */

	/*
	 * httpRequest()
	 * 
	 * @url (string): URL à appeler
	 * @method (string): Méthode (GET, POST, PUT, etc)
	 * @data (array): POST data
	 * @onSuccessCallback (function): Fonction à appeler en cas de succès
	 * @onErrorCallback (function): Fonction à appeler en cas d'erreur
	 */
	function httpRequest(_args) {

		// Test si on est en ligne
		if(Ti.Network.online){
			
			// Affichage de l'animation de chargement
			Ti.App.fireEvent('JUG:networkLoadingStart');
			
			// Callback en cas de succès
			var onSuccessCallback = function (e) {
				
				// Appel du callback
				_args.onSuccessCallback(e);
				
				// Fin de l'animation de chargement
				Ti.App.fireEvent('JUG:networkLoadingEnd');
			};
			
			// Callback en cas d'erreur
			var onErrorCallback = function (e) {
				
				// Appel du callback
				_args.onErrorCallback(e);
				
				// Fin de l'animation de chargement
				Ti.App.fireEvent('JUG:networkLoadingEnd');
			};
			
			// Création de l'object XHR
			var xhr = new XHR();
			
			// Options par défaut
			if(!_args.options) {
				_args.options = {};
			}
			
			// Lancement de la requête XHR
			if(_args.method === "POST") {
				xhr.post(_args.url, _args.data, _args.onSuccessCallback, _args.onErrorCallback, _args.options);
			}			
			else {
				xhr.get(_args.url, _args.onSuccessCallback, _args.onErrorCallback, _args.options);
			}
			
			
		} // Online
		
		else {
			// Pas de connexion...
			Ti.App.fireEvent('JUG:networkOffline');
		}
	};


/*
 * Utils ----------------------------------------
 */

	/*
	 * cutText()
	 * 
	 * @text (string): Texte à couper
	 * @limit (string): Limite pour la coupe du texte
	 */
	function cutText(_text, _limit) {
		if(_text.length > _limit) {
			return _text.substring(0,(_limit-3)) + '...';
		} else {
			return _text;
		}
	};


/*
 * Exports --------------------------------------
 */
exports.menuShow = menuShow;
exports.httpRequest = httpRequest;
exports.cutText = cutText;
