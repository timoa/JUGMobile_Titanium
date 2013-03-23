function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.menuView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#29363e",
        layout: "vertical",
        id: "menuView"
    });
    $.addTopLevelView($.__views.menuView);
    $.__views.headerView = Ti.UI.createView({
        left: 0,
        width: Alloy.CFG.menuWidth,
        height: "50dp",
        backgroundGradient: {
            type: "linear",
            startPoint: {
                x: "50%",
                y: "0%"
            },
            endPoint: {
                x: "50%",
                y: "100%"
            },
            colors: [ {
                color: "#d62e04",
                offset: 0
            }, {
                color: "#781a01",
                offset: 1
            } ]
        },
        id: "headerView"
    });
    $.__views.menuView.add($.__views.headerView);
    $.__views.titleLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        },
        text: L("app_name"),
        id: "titleLabel"
    });
    $.__views.headerView.add($.__views.titleLabel);
    $.__views.menuList = Ti.UI.createTableView({
        left: 0,
        width: Alloy.CFG.menuWidth,
        height: Ti.UI.FILL,
        backgroundColor: "transparent",
        separatorColor: "#1c252b",
        id: "menuList"
    });
    $.__views.menuView.add($.__views.menuList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;