/*
 * Librairie pour les fonctions spécifiques au JUG
 */

/*
 * Menu
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
 * Exports
 */
exports.menuShow = menuShow;