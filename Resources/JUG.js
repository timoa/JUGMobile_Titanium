function menuShow(_left) {
    var animation = Ti.UI.createAnimation({
        left: _left,
        curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
        duration: 500
    });
    return animation;
}

exports.menuShow = menuShow;