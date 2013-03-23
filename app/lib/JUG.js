/*
 * Librairie pour les fonctions spécifiques au JUG
 */

/*
 * UI -------------------------------------------
 */

	/*
	 * Menu: menuShow()
	 * 
	 * @left (integer): Valeur pour l'ouverture ou fermeture du menu
	 */
	function menuShow(_left) {
	
		// Create animation
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
	 * @format (string): Format des données (JSON, bin)
	 * @callback(function): Fonction à appeler après réponse du serveur 
	 */
	function httpRequest(_args) {

		// Test si on est en ligne
		if(Ti.Network.online){
			
			// Affichage de l'animation de chargement
			Ti.App.fireEvent('JUG:networkLoadingStart');
			
			// Si une URL est présente
			if(_args.url) {
				
				// Création d'une requête XHR
				var xhr = Ti.Network.createHTTPClient();
				
				// Ajout d'un timeout
				xhr.timeout = 15000;
							
				xhr.onload = function() {
					
					if(_args.format === 'json') {
						var json = JSON.parse(this.responseText);					
	
							Ti.API.info('[---Network---] CODE : ' + this.status + ' - MESSAGE : ' + this.statusText);
							
							// Si la requête est OK
							if(xhr.status === 200) {
								_args.callback(json, this.status, this.statusText);
							}
							
							// End Loading
							Ti.App.fireEvent('JUG:networkLoadingEnd');
					}
					
					// Binaire
					else {
						_args.callback(this.responseData, this.status);
						
						// End Loading
						Ti.App.fireEvent('JUG:networkLoadingEnd');
					}													
				};
				
				// En cas d'erreur
				xhr.onerror = function() {
					Ti.App.fireEvent('JUG:networkError');
	
					Ti.API.info('[---Network---] ERROR!');
					Ti.API.info('[---Network---] CODE: ' + this.status + ' - MESSAGE: ' + this.statusText);
					
				};
				
				// Ouverture de la connexion XHR
				xhr.open("GET", _args.url);
				Ti.API.info('[---Network---] URL : ' + _args.url);
				
				// Ajout des headers HTTP (toujours entre open() et send())
				xhr.setRequestHeader('Content-Type','application/json; charset=utf-8');
				
				// Envoi de la requête XHR
				xhr.send();
				
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
